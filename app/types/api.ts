import type { Location, Design, Layout, ColorScheme, Coordinates } from './index'

export interface ApiResponse<TData = unknown> {
  success: boolean
  data: TData
  message?: string
  status?: number
  meta?: Record<string, unknown>
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  status: number
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<TData> {
  data: TData[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface LocationSearchRequest {
  query: string
  limit?: number
  types?: string[]
  country?: string
  language?: string
}

export interface LocationSearchResult {
  id: string
  placeName: string
  center: Coordinates
  placeType: string[]
  relevance: number
  properties?: Record<string, unknown>
  geometry?: {
    type: string
    coordinates: Coordinates
  }
}

export interface LocationSearchResponse {
  features: LocationSearchResult[]
  query: string[]
  attribution?: string
}

export interface MapDataRequest {
  location: Location
  designId?: number
  layoutId?: number
  colorSchemeId?: string
}

export interface StaticMapRequest {
  center: Coordinates
  zoom: number
  size: {
    width: number
    height: number
  }
  styleId: string
  accessToken: string
  retina?: boolean
  format?: 'png' | 'jpg' | 'webp'
}

export interface DesignConfig {
  designs: Design[]
  layouts: Layout[]
  colorSchemes: ColorScheme[]
  defaults: {
    designId: number
    layoutId: number
    colorSchemeId: string
  }
}

export interface MapExportRequest {
  mapConfig: MapDataRequest
  exportOptions: {
    format: 'png' | 'pdf' | 'html' | 'svg'
    quality?: number
    size?: {
      width: number
      height: number
    }
    dpi?: number
  }
  metadata?: {
    title?: string
    description?: string
    author?: string
  }
}

export interface MapExportResponse {
  downloadUrl: string
  filename: string
  fileSize: number
  mimeType: string
  expiresAt: string
}

export interface HttpClientConfig {
  baseURL: string
  timeout: number
  headers?: Record<string, string>
  csrfToken?: string
  retry?: {
    attempts: number
    delay: number
  }
}

export interface HttpRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  params?: Record<string, unknown>
  data?: unknown
  headers?: Record<string, string>
  timeout?: number
  signal?: AbortSignal
}

export interface WebSocketMessage<TPayload = unknown> {
  type: string
  payload: TPayload
  timestamp: number
  id?: string
}

export interface ExportProgressMessage {
  taskId: string
  progress: number
  status: 'started' | 'processing' | 'completed' | 'failed'
  message?: string
}

export interface PriceCalculationProduct {
  slug: string
  sizeId: number
  extraIds?: number[]
  frameId?: number
}

export interface PriceCalculationRequest {
  products: PriceCalculationProduct[]
}

export interface ProductPriceDetail {
  product: {
    id: number
    name: string
    slug: string
    [key: string]: any
  }
  total: number
}

export interface PriceCalculationResponse {
  data: ProductPriceDetail[]
  [key: string]: any
}