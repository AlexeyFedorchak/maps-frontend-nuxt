<script setup lang="ts">
/**
 * MilkywayCanvas
 * - Renders a WebGL canvas using a shader that samples a texture with (phi, lambda, zoom)
 * - Props:
 *    imageUrl: string (required) — path to the texture (e.g. milky way map)
 *    width, height: number | undefined — CSS size of the canvas area (px); if omitted, fits parent
 *    phi, lambda: number (radians) — center latitude/longitude
 *    zoom: number — scale factor
 *    autoResize: boolean — if true, re-fit on window resize
 */

import * as THREE from 'three'
import { onMounted, onBeforeUnmount, ref, watch, computed, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  imageUrl: string
  width?: number
  height?: number
  phi?: number
  lambda?: number
  zoom?: number
  autoResize?: boolean
}>(), {
  phi: 0,
  lambda: 0,
  zoom: 1,
  autoResize: true
})

const hostRef = ref<HTMLDivElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.OrthographicCamera | null = null
let uniforms: Record<string, any> | null = null
let mesh: THREE.Mesh | null = null
let texture: THREE.Texture | null = null
let disposed = false

const cssWidth = computed(() => props.width ?? hostRef.value?.clientWidth ?? 512)
const cssHeight = computed(() => props.height ?? hostRef.value?.clientHeight ?? 512)

function setRendererSize(w: number, h: number) {
  if (!renderer || !hostRef.value) return
  renderer.domElement.style.width = `${w}px`
  renderer.domElement.style.height = `${h}px`
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3))
  renderer.setPixelRatio(dpr)
  renderer.setSize(w, h, false)
}

function renderOnce() {
  if (!renderer || !scene || !camera) return
  renderer.render(scene, camera)
}

async function init() {
  if (!hostRef.value) return
  disposed = false

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  })
  renderer.setClearColor(0x000000, 0) // transparent
  hostRef.value.innerHTML = ''
  hostRef.value.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const geometry = new THREE.PlaneGeometry(2, 2)

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    precision highp float;
    #define PI  3.1415926535897931
    #define TAU 6.2831853071795862

    varying vec2 vUv;
    uniform sampler2D u_texture1;
    uniform float u_phi1;
    uniform float u_lambda0;
    uniform float u_zoom;

    void main() {
      float x = TAU * (vUv.s - 0.5) * u_zoom;
      float y = TAU * (vUv.t - 0.5) * u_zoom;

      float c = sqrt(x*x + y*y);
      float safeC = max(c, 1e-6);

      float phi = asin(cos(c) * sin(u_phi1) + y * sin(c) * cos(u_phi1) / safeC);
      float lambda = u_lambda0 + atan(x * sin(c), (safeC * cos(u_phi1) * cos(c) - y * sin(u_phi1) * sin(c)));

      float s = (lambda / TAU) + 0.5; // -pi..pi -> 0..1
      float t = (phi / PI) + 0.5;     // -pi/2..pi/2 -> 0..1

      gl_FragColor = texture2D(u_texture1, vec2(s, t));
    }
  `

  uniforms = {
    u_texture1: { value: null as THREE.Texture | null },
    u_phi1: { value: props.phi },
    u_lambda0: { value: props.lambda },
    u_zoom: { value: props.zoom }
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const loader = new THREE.TextureLoader()
  await new Promise<void>((resolve, reject) => {
    loader.load(
        props.imageUrl,
        (tex) => {
          if (disposed) { tex.dispose(); return resolve() }
          texture = tex
          texture.wrapS = THREE.RepeatWrapping
          texture.wrapT = THREE.RepeatWrapping
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter
          uniforms!.u_texture1.value = texture
          resolve()
        },
        undefined,
        (err) => reject(err)
    )
  })

  setRendererSize(cssWidth.value, cssHeight.value)
  renderOnce()
}

function destroy() {
  disposed = true
  try {
    texture?.dispose()
    ;(mesh?.material as THREE.Material | undefined)?.dispose?.()
    mesh?.geometry?.dispose?.()
    scene?.clear()
    renderer?.dispose()
  } catch {}
  texture = null
  mesh = null
  uniforms = null
  scene = null
  camera = null
  renderer = null
}

onMounted(async () => {
  await nextTick()
  await init()

  if (props.autoResize) {
    window.addEventListener('resize', handleResize, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (props.autoResize) {
    window.removeEventListener('resize', handleResize)
  }
  destroy()
})

function handleResize() {
  if (!renderer) return
  setRendererSize(cssWidth.value, cssHeight.value)
  renderOnce()
}

watch(() => props.imageUrl, async (url) => {
  if (!scene) return
  const loader = new THREE.TextureLoader()
  const tex = await new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject)
  })
  texture?.dispose()
  texture = tex
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  uniforms!.u_texture1.value = texture
  renderOnce()
})

watch(() => props.phi, (v) => {
  if (!uniforms) return
  uniforms.u_phi1.value = v
  renderOnce()
})

watch(() => props.lambda, (v) => {
  if (!uniforms) return
  uniforms.u_lambda0.value = v
  renderOnce()
})

watch(() => props.zoom, (v) => {
  if (!uniforms) return
  uniforms.u_zoom.value = v
  renderOnce()
})

watch([() => props.width, () => props.height], () => {
  if (!renderer) return
  setRendererSize(cssWidth.value, cssHeight.value)
  renderOnce()
})
</script>

<template>
  <div ref="hostRef" class="mw-host" />
</template>

<style scoped>
.mw-host {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  border-radius: 50%;
  overflow: hidden;
}
</style>
