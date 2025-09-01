import { ref, computed, type Ref } from 'vue'
import type { Design, Layout, ColorScheme } from '../types'

export interface UseMapStylesReturn {
  designs: Ref<Design[]>
  layouts: Ref<Layout[]>
  colorSchemes: Ref<ColorScheme[]>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  loadStyles: () => Promise<void>
  getDesignById: (id: number) => Design | undefined
  getLayoutById: (id: number) => Layout | undefined
  getColorSchemeById: (id: string) => ColorScheme | undefined
}

export function useMapStyles(): UseMapStylesReturn {
  const designs = ref<Design[]>([])
  const layouts = ref<Layout[]>([])
  const colorSchemes = ref<ColorScheme[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const activeDesigns = computed(() => 
    designs.value.filter(design => design.isActive)
  )

  const activeLayouts = computed(() => 
    layouts.value.filter(layout => layout.isActive)
  )

  const activeColorSchemes = computed(() => 
    colorSchemes.value.filter(scheme => scheme.isActive)
  )

  async function loadStyles() {
    isLoading.value = true
    error.value = null

    try {
      designs.value = [
        {
          id: 1,
          name: 'Modern',
          description: 'Modern minimalist design',
          preview: '/images/designs/modern-preview.jpg',
          mapboxStyleId: 'mapbox://styles/picturethestars/cla9hyw9400x615mgdh6maidi',
          isActive: true
        },
        {
          id: 2,
          name: 'Asphalt',
          description: 'Dark urban style',
          preview: '/images/designs/asphalt-preview.jpg',
          mapboxStyleId: 'mapbox://styles/picturethestars/cla9hyyxo000214ny7xj3vejr',
          isActive: true
        },
        {
          id: 3,
          name: 'Nautical',
          description: 'Nautical navigation style',
          preview: '/images/designs/nautical-preview.jpg',
          mapboxStyleId: 'mapbox://styles/picturethestars/cla9hz69s003t14saymfoel6l',
          isActive: true
        }
      ]

      layouts.value = [
        {
          id: 1,
          name: 'Rectangle',
          description: 'Rectangular format',
          dimensions: '40x30 cm',
          shape: 'rectangle',
          preview: '/images/layouts/rectangle.svg',
          isDefault: true,
          isActive: true
        },
        {
          id: 2,
          name: 'Square',
          description: 'Square format',
          dimensions: '30x30 cm', 
          shape: 'rectangle',
          preview: '/images/layouts/square.svg',
          isActive: true
        },
        {
          id: 3,
          name: 'Circle',
          description: 'Circular format',
          dimensions: 'Ø 30 cm',
          shape: 'circle',
          preview: '/images/layouts/circle.svg',
          isActive: true
        }
      ]

      colorSchemes.value = [
        {
          id: 'default',
          name: 'Default',
          description: 'Standard colors',
          colors: {
            water: '#4A90E2',
            land: '#F5F5F5',
            roads: '#FFFFFF',
            text: '#333333'
          },
          preview: 'linear-gradient(45deg, #4A90E2, #F5F5F5)',
          isActive: true
        },
        {
          id: 'dark',
          name: 'Dark',
          description: 'Dark theme',
          colors: {
            water: '#2C3E50',
            land: '#34495E',
            roads: '#7F8C8D',
            text: '#ECF0F1'
          },
          preview: 'linear-gradient(45deg, #2C3E50, #34495E)',
          isActive: true
        },
        {
          id: 'nature',
          name: 'Nature',
          description: 'Natural colors',
          colors: {
            water: '#3498DB',
            land: '#27AE60',
            roads: '#F39C12',
            text: '#2C3E50'
          },
          preview: 'linear-gradient(45deg, #3498DB, #27AE60)',
          isActive: true
        }
      ]

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error loading styles'
      console.error('Load styles error:', err)
    } finally {
      isLoading.value = false
    }
  }

  function getDesignById(id: number): Design | undefined {
    return designs.value.find(design => design.id === id)
  }

  function getLayoutById(id: number): Layout | undefined {
    return layouts.value.find(layout => layout.id === id)
  }

  function getColorSchemeById(id: string): ColorScheme | undefined {
    return colorSchemes.value.find(scheme => scheme.id === id)
  }

  return {
    designs,
    layouts,
    colorSchemes,
    isLoading,
    error,
    loadStyles,
    getDesignById,
    getLayoutById,
    getColorSchemeById
  }
}
