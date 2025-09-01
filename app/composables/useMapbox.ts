import { ref, onMounted, onBeforeUnmount, watch, type Ref } from 'vue';
import type { Map as MapboxMap } from 'mapbox-gl';
import type { Location, Design, ColorScheme } from '../types';

export interface UseMapboxOptions {
  container: Ref<HTMLElement | null>
  initialLocation?: Location
  initialDesign?: Design
  initialColorScheme?: ColorScheme
  showControls?: boolean
  interactive?: boolean
}

export interface UseMapboxReturn {
  map: Ref<MapboxMap | null>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  initializeMap: () => Promise<void>
  updateLocation: (location: Location) => void
  updateDesign: (design: Design) => void
  updateColorScheme: (colorScheme: ColorScheme) => void
  destroyMap: () => void
  resize: () => void
  getStaticMapUrl: (options?: {
    width?: number
    height?: number
    zoom?: number
    format?: 'png' | 'jpg' | 'webp'
  }) => string
}

export function useMapbox(options: UseMapboxOptions): UseMapboxReturn {
  const map = ref<MapboxMap | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  let currentLocation = ref<Location | null>(options.initialLocation || null)
  let currentDesign = ref<Design | null>(options.initialDesign || null)
  let currentColorScheme = ref<ColorScheme | null>(options.initialColorScheme || null)
  const config = useRuntimeConfig();

  const MAPBOX_TOKEN = config.public.mapboxToken || window.mapboxToken
  
  const DEFAULT_STYLE = 'mapbox://styles/picturethestars/cla9hyw9400x615mgdh6maidi'
  
  const DESIGN_STYLES: Record<number, string> = {
    1: 'mapbox://styles/picturethestars/cla9hyw9400x615mgdh6maidi',
    2: 'mapbox://styles/picturethestars/cla9hyyxo000214ny7xj3vejr',
    3: 'mapbox://styles/picturethestars/cla9hz69s003t14saymfoel6l',
    4: 'mapbox://styles/picturethestars/cla9hz4fg006515qwu1z4kjh9',
    5: 'mapbox://styles/picturethestars/cla9hz0z000x715mgxs7g6m7d',
    6: 'mapbox://styles/picturethestars/cla9hz2si000r14ohss4vu28q',
    7: 'mapbox://styles/mapbox/light-v11',
    8: 'mapbox://styles/mapbox/satellite-streets-v12',
    9: 'mapbox://styles/mapbox/streets-v12',
    10: 'mapbox://styles/mapbox/outdoors-v12',
    11: 'mapbox://styles/mapbox/light-v11',
    12: 'mapbox://styles/mapbox/light-v11'
  }

  function validateMapboxGL(): boolean {
    if (typeof window === 'undefined') {
      error.value = 'Mapbox cannot be initialized on the server'
      return false
    }
    
    if (!window.mapboxgl) {
      error.value = 'Mapbox GL JS is not loaded'
      return false
    }
    
    if (!MAPBOX_TOKEN) {
      error.value = 'Mapbox token not found'
      return false
    }
    
    return true
  }
  
  function hideMapLabels(mapInstance: MapboxMap) {
    mapInstance.on('styledata', () => {
      const layers = mapInstance.getStyle().layers
      
      layers?.forEach((layer) => {
        if (layer.type === 'symbol') {
          mapInstance.setLayoutProperty(layer.id, 'visibility', 'none')
        }
      })
    })
  }
  
  function applyColorSchemeToMap(mapInstance: MapboxMap, colorScheme: ColorScheme) {
    if (!mapInstance.isStyleLoaded()) {
      mapInstance.once('styledata', () => {
        applyColorSchemeToMap(mapInstance, colorScheme)
      })
      return
    }
    
    try {
      const { colors } = colorScheme
      
      if (mapInstance.getLayer('water')) {
        mapInstance.setPaintProperty('water', 'fill-color', colors.water)
      }
      
      if (mapInstance.getLayer('landuse')) {
        mapInstance.setPaintProperty('landuse', 'fill-color', colors.land)
      }
      
      const roadLayers = ['road-primary', 'road-secondary', 'road-street', 'road-highway', 'road']
      roadLayers.forEach(layerId => {
        if (mapInstance.getLayer(layerId)) {
          mapInstance.setPaintProperty(layerId, 'line-color', colors.roads)
        }
      })
      
      const textLayers = ['place-city-label', 'place-town-label', 'road-label']
      textLayers.forEach(layerId => {
        if (mapInstance.getLayer(layerId)) {
          mapInstance.setPaintProperty(layerId, 'text-color', colors.text)
        }
      })
      
      console.log(`Color scheme '${colorScheme.name}' applied to map`)
    } catch (err) {
      console.error('Error applying color scheme:', err)
    }
  }

  async function initializeMap(): Promise<void> {
    if (!validateMapboxGL() || !options.container.value) {
      return
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      window.mapboxgl.accessToken = MAPBOX_TOKEN
      
      const mapStyle = currentDesign.value 
        ? DESIGN_STYLES[currentDesign.value.id] || DEFAULT_STYLE
        : DEFAULT_STYLE
      
      const center = currentLocation.value?.coords || [-0.128, 51.507]
      const zoom = currentLocation.value?.zoom || 12
      
      const mapInstance = new window.mapboxgl.Map({
        container: options.container.value,
        style: mapStyle,
        center,
        zoom,
        interactive: options.interactive !== false,
        attributionControl: false,
        logoPosition: 'bottom-right'
      })
      
      if (options.showControls) {
        mapInstance.addControl(new window.mapboxgl.NavigationControl(), 'top-right')
      }
      
      mapInstance.on('load', () => {
        hideMapLabels(mapInstance)
        
        if (currentColorScheme.value) {
          applyColorSchemeToMap(mapInstance, currentColorScheme.value)
        }
        
        isLoading.value = false
        console.log('Mapbox map initialized')
      })
      
      mapInstance.on('error', (e) => {
        error.value = `Map load error: ${e.error?.message || 'Unknown error'}`
        isLoading.value = false
        console.error(' Mapbox error:', e)
      })
      
      map.value = mapInstance
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error initializing map'
      isLoading.value = false
      console.error(' Error initializing map:', err)
    }
  }
  
  function updateLocation(location: Location) {
    if (!map.value) return
    
    currentLocation.value = location
    
    map.value.flyTo({
      center: location.coords,
      zoom: location.zoom,
      duration: 2000,
      essential: true
    })
    
    console.log(`Map location updated to ${location.name}`)
  }
  
  function updateDesign(design: Design) {
    if (!map.value) return
    
    currentDesign.value = design
    
    const newStyle = DESIGN_STYLES[design.id] || DEFAULT_STYLE
    const currentCenter = map.value.getCenter()
    const currentZoom = map.value.getZoom()
    
    map.value.setStyle(newStyle)
    
    map.value.once('styledata', () => {
      map.value?.setCenter(currentCenter)
      map.value?.setZoom(currentZoom)
      
      hideMapLabels(map.value!)
      
      if (currentColorScheme.value) {
        setTimeout(() => {
          applyColorSchemeToMap(map.value!, currentColorScheme.value!)
        }, 500)
      }
    })
    
    console.log(`Map design updated to ${design.name}`)
  }
  
  function updateColorScheme(colorScheme: ColorScheme) {
    if (!map.value) return
    
    currentColorScheme.value = colorScheme
    applyColorSchemeToMap(map.value, colorScheme)
  }
  
  function destroyMap() {
    if (map.value) {
      map.value.remove()
      map.value = null
      console.log(' Map destroyed')
    }
  }
  
  function resize() {
    if (map.value) {
      setTimeout(() => {
        map.value?.resize()
      }, 100)
    }
  }
  
  function getStaticMapUrl(options: {
    width?: number
    height?: number
    zoom?: number
    format?: 'png' | 'jpg' | 'webp'
  } = {}): string {
    if (!currentLocation.value || !MAPBOX_TOKEN) {
      return ''
    }
    
    const {
      width = 800,
      height = 1000,
      zoom = currentLocation.value.zoom,
      format = 'png'
    } = options
    
    const [lng, lat] = currentLocation.value.coords
    const styleId = currentDesign.value 
      ? DESIGN_STYLES[currentDesign.value.id]?.replace('mapbox://styles/', '') || 'mapbox/streets-v12'
      : 'mapbox/streets-v12'
    
    return `https://api.mapbox.com/styles/v1/${styleId}/static/${lng},${lat},${zoom}/${width}x${height}@2x?access_token=${MAPBOX_TOKEN}`
  }

  watch(
    () => options.container.value,
    (newContainer) => {
      if (newContainer && map.value) {
        resize()
      }
    }
  )

  onMounted(() => {
    if (options.container.value) {
      initializeMap()
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
    resize,
    getStaticMapUrl
  }
}