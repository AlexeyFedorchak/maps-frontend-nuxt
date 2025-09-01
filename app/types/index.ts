export * from './map'
export * from './api'
export * from './components'
export * from './ui'

export type Coordinates = [number, number]

export type LocationId = string
export type DesignId = number
export type LayoutId = number
export type ColorSchemeId = string

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export type AppStep = 1 | 2 | 3

export type MapShape = 'rectangle' | 'circle' | 'horizontal' | 'tall' | 'full-page'

export interface Location {
  id: LocationId
  name: string
  coords: Coordinates
  zoom: number
  fullName?: string
  country?: string
  region?: string
}

export interface Design {
  id: DesignId
  name: string
  description?: string
  badge?: string
  preview: string
  fullImage: string
  compatibleLayouts?: Layout[]
  mapboxStyle?: string
  isActive: boolean
  sortOrder: number
}

export interface Layout {
  id: LayoutId
  name: string
  description?: string
  dimensions: string
  shape: MapShape
  preview: string
  isDefault?: boolean
  isActive: boolean
  priceModifier?: number
}

export interface Frame {
  id: string
  name: string
  className: string
  price: string
  borderClass: string
}

export interface ColorScheme {
  id: ColorSchemeId
  name: string
  description?: string
  colors: {
    water: string
    land: string
    roads: string
    text: string
    background?: string
  }
  preview: string
  isNew?: boolean
  isActive: boolean
}

export interface MapState {
  currentStep: AppStep
  selectedLocation: Location | null
  selectedDesign: Design | null
  selectedLayout: Layout | null
  selectedColorScheme: ColorScheme | null
  loadingState: LoadingState
  error: string | null
}

export interface StepValidation {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface MapExportOptions {
  format: 'png' | 'pdf' | 'svg' | 'html'
  quality: number
  size: {
    width: number
    height: number
  }
  dpi: number
  includeDetails: boolean
}

export interface MapExportResult {
  downloadUrl: string
  filename: string
  fileSize: number
  mimeType: string
}