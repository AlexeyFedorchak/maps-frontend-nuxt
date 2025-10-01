import { ref, onMounted, onBeforeUnmount, watch, type Ref } from 'vue';
import type { Location, Design, ColorScheme } from '~/types';

export interface UseMapTilerVectorOptions {
  container: Ref<HTMLElement | null>
  initialLocation?: Location
  initialDesign?: Design
  initialColorScheme?: ColorScheme
  showControls?: boolean
  interactive?: boolean
}

export interface UseMapTilerVectorReturn {
  map: Ref<any | null>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  initializeMap: () => Promise<void>
  updateLocation: (location: Location) => void
  updateDesign: (design: Design) => void
  updateColorScheme: (colorScheme: ColorScheme) => void
  destroyMap: () => void
  resize: () => void
}

export function useMapTilerVector(options: UseMapTilerVectorOptions): UseMapTilerVectorReturn {
  const map = ref<any | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  let currentLocation = ref<Location | null>(options.initialLocation || null)
  let currentDesign = ref<Design | null>(options.initialDesign || null)
  let currentColorScheme = ref<ColorScheme | null>(options.initialColorScheme || null)
  const config = useRuntimeConfig();

  const MAPTILER_TOKEN = config.public.mapTilerToken;

  if (!MAPTILER_TOKEN) {
    console.error('MapTiler token not found in environment variables');
  }

  function validateMapTiler(): boolean {
    if (typeof window === 'undefined') {
      error.value = 'MapTiler cannot be initialized on the server'
      console.error('Server environment detected')
      return false
    }

    // Check for MapTiler SDK
    if (!window.maptilersdk) {
      error.value = 'MapTiler SDK is not loaded'
      console.error('MapTiler SDK not found on window object')
      return false
    }

    if (!MAPTILER_TOKEN) {
      error.value = 'MapTiler token not found'
      console.error('MapTiler token is missing')
      return false
    }

    return true
  }

  async function initializeMap(): Promise<void> {

    if (!validateMapTiler()) {
      console.error('Validation failed')
      return
    }

    if (!options.container.value) {
      console.error('Container not available')
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const maptilersdk = window.maptilersdk

      // Wait a moment for container to be ready
      await new Promise(resolve => setTimeout(resolve, 100))

      // Initialize the map
      const center = currentLocation.value?.coords || [-0.128, 51.507]
      const zoom = currentLocation.value?.zoom || 12


      // Set the API key
      maptilersdk.config.apiKey = MAPTILER_TOKEN;

      // Get the appropriate style URL based on current design
      let styleUrl = 'https://api.maptiler.com/maps/streets-v2-dark/style.json'

      // Check if design has a custom mapTilerStyle URL
      if (currentDesign.value?.mapTilerStyle) {
        styleUrl = currentDesign.value.mapTilerStyle
        // Add API key if not present
        if (!styleUrl.includes('key=')) {
          styleUrl = styleUrl + (styleUrl.includes('?') ? '&' : '?') + `key=${MAPTILER_TOKEN}`
        }
      }


      const mapInstance = new maptilersdk.Map({
        container: options.container.value,
        style: styleUrl,
        center: center,
        zoom: zoom,
        navigationControl: options.showControls === true ? 'top-right' : false,
        geolocateControl: false,
        scaleControl: false,
        fullscreenControl: false,
        interactive: options.interactive !== false,
        preserveDrawingBuffer: true,
      })

      mapInstance.on('load', () => {
        isLoading.value = false
      })

      mapInstance.on('error', (e: any) => {
        console.error('MapTiler map error:', e)
        error.value = e.error?.message || 'Error loading map'
      })

      map.value = mapInstance

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error initializing map'
      isLoading.value = false
      console.error('Error initializing map:', err)
    }
  }

  function updateLocation(location: Location) {
    if (!map.value) return

    currentLocation.value = location

    map.value.flyTo({
      center: location.coords,
      zoom: location.zoom,
      duration: 2000,
    })

  }

  function updateDesign(design: Design) {
    if (!map.value) return

    currentDesign.value = design

    // Get the appropriate style URL
    let styleUrl = 'https://api.maptiler.com/maps/streets-v2-dark/style.json'

    if (design.mapTilerStyle) {
      styleUrl = design.mapTilerStyle
      // Add API key if not present
      if (!styleUrl.includes('key=')) {
        styleUrl = styleUrl + (styleUrl.includes('?') ? '&' : '?') + `key=${MAPTILER_TOKEN}`
      }
    }

    // Update the map style
    map.value.setStyle(styleUrl)

  }

  function updateColorScheme(colorScheme: ColorScheme) {
    if (!map.value) return

    currentColorScheme.value = colorScheme
  }

  function destroyMap() {
    if (map.value) {
      map.value.remove()
      map.value = null
    }
  }

  function resize() {
    if (map.value) {
      setTimeout(() => {
        map.value?.resize()
      }, 100)
    }
  }

  let initializationPromise: Promise<void> | null = null
  let isInitializing = false

  watch(
    () => options.container.value,
    (newContainer) => {
      if (newContainer && !map.value && !isInitializing) {
        isInitializing = true
        initializationPromise = initializeMap().finally(() => {
          isInitializing = false
        })
      } else if (newContainer && map.value) {
        resize()
      }
    }
  )

  onMounted(() => {
    if (options.container.value && !map.value && !isInitializing) {
      isInitializing = true
      initializationPromise = initializeMap().finally(() => {
        isInitializing = false
      })
    }
  })

  onBeforeUnmount(() => {
    destroyMap()
  })

  return {
    map: readonly(map),
    isLoading: readonly(isLoading),
    error: readonly(error),
    initializeMap,
    updateLocation,
    updateDesign,
    updateColorScheme,
    destroyMap,
    resize
  }
}
