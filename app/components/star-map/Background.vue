<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onBeforeUnmount, ref, watch, computed, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  imageUrl: string
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

function setRendererSize() {
  if (!renderer) return
  const w = cssWidth.value
  const h = cssHeight.value
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

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
  ;(renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace ?? (renderer as any).outputEncoding
  renderer.setClearColor(0x000000, 0)
  hostRef.value.innerHTML = ''
  hostRef.value.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, -1, 1, -1, 1)

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
    uniform sampler2D u_tex;
    uniform float u_phi1;
    uniform float u_lambda0;
    uniform float u_zoom;
    void main() {
      float x = TAU * (vUv.s - 0.5) * u_zoom;
      float y = -TAU * (vUv.t - 0.5) * u_zoom;
      float c = sqrt(x*x + y*y);
      float safeC = max(c, 1e-6);
      float phi = asin( cos(c)*sin(u_phi1) + y*sin(c)*cos(u_phi1)/safeC );
      float lambda = u_lambda0 + atan( x*sin(c), (safeC*cos(u_phi1)*cos(c) - y*sin(u_phi1)*sin(c) ) );
      float s = (lambda / TAU) + 0.5;
      float t = (phi / PI) + 0.5;
      gl_FragColor = texture2D(u_tex, vec2(s, t));
    }
  `

  uniforms = {
    u_tex: { value: null },
    u_phi1: { value: props.phi },
    u_lambda0: { value: props.lambda },
    u_zoom: { value: props.zoom ?? 1 }
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true
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
          ;(texture as any).colorSpace = (THREE as any).SRGBColorSpace ?? undefined
          texture.flipY = false
          texture.wrapS = THREE.RepeatWrapping
          texture.wrapT = THREE.RepeatWrapping
          texture.minFilter = THREE.NearestFilter
          texture.magFilter = THREE.LinearFilter
          uniforms!.u_tex.value = texture
          resolve()
        },
        undefined,
        (err) => reject(err)
    )
  })

  setRendererSize()
  renderOnce()
}

function destroy() {
  disposed = true
  try {
    texture?.dispose()
    ;(mesh?.material as THREE.Material)?.dispose?.()
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
  if (props.autoResize) window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  if (props.autoResize) window.removeEventListener('resize', handleResize)
  destroy()
})

function handleResize() {
  if (!renderer) return
  setRendererSize()
  renderOnce()
}

watch(() => props.imageUrl, async (url) => {
  if (!uniforms) return
  const loader = new THREE.TextureLoader()
  const tex = await new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject)
  })
  texture?.dispose()
  texture = tex
  texture.flipY = false
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.LinearFilter
  uniforms.u_tex.value = texture
  renderOnce()
})

watch(() => props.phi, (v) => { if (uniforms) { uniforms.u_phi1.value = v; renderOnce() } })
watch(() => props.lambda, (v) => { if (uniforms) { uniforms.u_lambda0.value = v; renderOnce() } })
watch(() => props.zoom, (v) => { if (uniforms) { uniforms.u_zoom.value = v; renderOnce() } })
watch([() => props.width, () => props.height], () => { if (renderer) { setRendererSize(); renderOnce() } })
</script>

<template>
  <div ref="hostRef" class="mw-host w-full h-full"></div>
</template>

<style scoped>
.mw-host {
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.mw-host canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
