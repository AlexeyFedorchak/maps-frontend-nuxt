export * from './map'
export * from './api'
export * from './components'

export type Coordinates = [number, number]

export type LocationId = string
export type ThemeId = number
export type LayoutId = number
export type ColorSchemeId = string
export type FontId = number

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export type AppStep = 1 | 2 | 3

export type MapShape = 'rectangle' | 'circle' | 'horizontal' | 'tall' | 'full-page'
export type InputMode = 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined

export interface Location {
    id: LocationId
    name: string
    coords: Coordinates
    zoom: number
    fullName?: string
    country?: string
    region?: string
}

export interface Theme {
    id: ThemeId
    name: string
    description?: string
    badge?: string
    preview: string
    fullImage?: string
    compatibleLayouts?: Layout[]
    mapboxStyle?: string
    mapTilerStyle?: string
    isActive?: boolean
    sortOrder?: number
    bgColor?: string
    fgColor?: string
    stars?: string
    col?: string
    milkyLarge?: string
    milkySmall?: string
}

export interface Layout {
    id: LayoutId
    name: string
    description?: string
    dimensions?: string
    shape: MapShape
    preview: string
    isDefault?: boolean
    isActive?: boolean
    priceModifier?: number
}

export interface StarFeature {
    id: number
    name: string
    isSelected: boolean
}

export interface Frame {
    id: string | number;
    type?: 'frame';
    name: string;
    title?: string;
    subTitle?: string;
    className?: string;
    price: number;
    image?: string;
    backgroundImage?: string;
    thumbnail?: string;
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
    selectedTheme: Theme | null
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

export interface Extra {
    id: number
    name: string
    description: string
    price: number
    isMain: boolean
}


export interface Font {
    id: FontId
    label: string
    fontFamily: string
    preview: string
}

export interface BasketRecommendation {
    id: string;
    type: 'frame' | 'ribbon' | 'default';
    title: string;
    subTitle: string;
    price: number;
}

export interface PrintSize {
    id: string;
    label: string;
    name: string;
    size: string;
    price: number;
}

export interface BasketItem {
    id: number;
    uuid: string;
    slug: string;
    title: string;
    mapTitle?: string | null;
    location: Location;
    date: Date;
    time?: string | null;
    selectedSize: PrintSize;
    price: string;
    frame?: Frame | null;
    hasRibbon: boolean;
    theme?: Theme | null;
    layout?: Layout | null;
    selectedExtras: BasketRecommendation[];
    basicRecommendations: BasketRecommendation[];
    advancedRecommendations: BasketRecommendation[];
    apiProductData: Object | null;
    previewUri: string | null;
}

export interface PopularItem {
    id: number;
    title: string;
    price: number;
    discount: string;
    description: string;
}
