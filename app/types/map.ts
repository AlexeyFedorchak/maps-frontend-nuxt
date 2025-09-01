import type { Design, Location, Layout, ColorScheme } from '~/types/index';

export type Step = 'location' | 'design' | 'choose'

export interface HistoryEntry {
  step: Step
  location: Location | null
  design: Design | null
  layout: Layout | null
  colorScheme: ColorScheme | null
  mapTitle?: string
  mapSubtitle?: string
  timestamp: number
}
