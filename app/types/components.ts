import type { MapShape } from './index'

export interface BaseComponentProps {
  readonly class?: string
  readonly style?: string | Record<string, string>
  readonly 'data-testid'?: string
}

export interface MapFrameProps extends BaseComponentProps {
  readonly layout?: MapShape
  readonly locationName?: string
  readonly coordinates?: string
  readonly showDetails?: boolean
  readonly loading?: boolean
  readonly error?: string | null
}

export interface LocationStepProps extends BaseComponentProps {
  readonly onLocationSelect?: (location: Location) => void
  readonly onSearch?: (query: string) => void
  readonly searchResults?: readonly Location[]
  readonly searchLoading?: boolean
}

export interface DesignStepProps extends BaseComponentProps {
  readonly designs?: readonly Design[]
  readonly layouts?: readonly Layout[]
  readonly onDesignSelect?: (design: Design) => void
  readonly onLayoutSelect?: (layout: Layout) => void
}

export interface ChooseStepProps extends BaseComponentProps {
  readonly sizes?: readonly SizeOption[]
  readonly frames?: readonly FrameOption[]
  readonly onSizeSelect?: (size: SizeOption) => void
  readonly onFrameSelect?: (frame: FrameOption) => void
}

export interface MapFrameEmits {
  (e: 'map-ready', mapInstance: unknown): void
  (e: 'map-error', error: Error): void
  (e: 'center-change', center: Coordinates): void
}

export interface LocationStepEmits {
  (e: 'location-selected', location: Location): void
  (e: 'search', query: string): void
  (e: 'validation-complete', result: StepValidation): void
}

export interface SizeOption {
  readonly id: string
  readonly name: string
  readonly dimensions: string
  readonly price: number
  readonly isPopular?: boolean
}

export interface FrameOption {
  readonly id: string
  readonly name: string
  readonly preview: string
  readonly price: number
  readonly description?: string
}

export interface AppLayoutSlots {
  'map-preview'?: () => any
  'controls'?: () => any
  'header'?: () => any
  'footer'?: () => any
}

export interface MapFrameSlots {
  'default'?: () => any
  'loading'?: () => any
  'error'?: (props: { error: string }) => any
}

export type OptionalReadonly<T> = {
  readonly [P in keyof T]?: T[P]
}

export type ExtractComponentProps<T> = T extends new (...args: any) => any
  ? InstanceType<T>['$props']
  : never

export type ExtractComponentEmits<T> = T extends new (...args: any) => any
  ? InstanceType<T>['$emit']
  : never