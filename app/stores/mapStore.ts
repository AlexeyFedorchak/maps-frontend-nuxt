import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { Location, Design, Layout, ColorScheme, Frame, Step, MapState, HistoryEntry } from '../types'

export interface MapStoreState {
  currentStep: Step
  activeTab: 'print' | 'jewellery'
  location: Location | null
  design: Design | null
  layout: Layout | null
  colorScheme: ColorScheme | null
  frame: Frame | null
  hasRibbon: boolean

  mapTitle: string
  mapSubtitle: string

  isLoading: boolean
  error: string | null

  history: HistoryEntry[]
  historyIndex: number
}

const DEFAULT_LOCATION: Location = {
  id: 'london-uk',
  name: 'London, UK',
  coords: [-0.1276, 51.5074],
  zoom: 11,
  country: 'United Kingdom'
}

export const useMapStore = defineStore('map', () => {
  const currentStep = ref<Step>('design')
  const activeTab = ref<'print' | 'jewellery'>('print')
  const location = ref<Location | null>(DEFAULT_LOCATION)
  const design = ref<Design | null>(null)
  const layout = ref<Layout | null>(null)
  const colorScheme = ref<ColorScheme | null>(null)
  const frame = ref<Frame | null>(null)
  const hasRibbon = ref(false)

  const mapTitle = ref(DEFAULT_LOCATION.name)
  const mapSubtitle = ref('')

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const history = ref<HistoryEntry[]>([])
  const historyIndex = ref(-1)

  const coordinatesText = computed(() => {
    if (!location.value) return '51.507°N 0.128°W'

    const [lng, lat] = location.value.coords
    const latDir = lat >= 0 ? 'N' : 'S'
    const lngDir = lng >= 0 ? 'E' : 'W'

    return `${Math.abs(lat).toFixed(3)}°${latDir} ${Math.abs(lng).toFixed(3)}°${lngDir}`
  })

  const canProceedToNextStep = computed(() => {
    switch (currentStep.value) {
      case 'design':
        return !!design.value
      case 'location':
        return !!location.value
      case 'choose':
        return !!layout.value && !!colorScheme.value
      default:
        return false
    }
  })

  const canGoToPreviousStep = computed(() => {
    return currentStep.value !== 'design'
  })

  const completionProgress = computed(() => {
    let progress = 0
    if (design.value) progress += 33
    if (location.value) progress += 33
    if (layout.value && colorScheme.value) progress += 34
    return progress
  })

  const isReadyForExport = computed(() => {
    return !!(location.value && design.value && layout.value && colorScheme.value)
  })

  const currentState = computed<MapState>(() => ({
    step: currentStep.value,
    location: location.value,
    design: design.value,
    layout: layout.value,
    colorScheme: colorScheme.value,
    isLoading: isLoading.value,
    error: error.value
  }))

  function nextStep() {
    if (!canProceedToNextStep.value) return

    switch (currentStep.value) {
      case 'design':
        currentStep.value = 'location'
        break
      case 'location':
        currentStep.value = 'choose'
        break
    }

    saveToHistory()
    console.log(`Moved to step: ${currentStep.value}`)
  }

  function previousStep() {
    if (!canGoToPreviousStep.value) return

    switch (currentStep.value) {
      case 'location':
        currentStep.value = 'design'
        break
      case 'choose':
        currentStep.value = 'location'
        break
    }

    saveToHistory()
    console.log(`Moved back to step: ${currentStep.value}`)
  }

  function goToStep(step: Step) {
    currentStep.value = step
    saveToHistory()
    console.log(`Jumped to step: ${step}`)
  }

  function setCurrentStep(step: Step) {
    currentStep.value = step
    saveToHistory()
    console.log(`Step set to: ${step}`)
  }

  function setActiveTab(tab: 'print' | 'jewellery') {
    activeTab.value = tab
  }

  function setLocation(newLocation: Location) {
    location.value = newLocation
    mapTitle.value = newLocation.name
    saveToHistory()
    console.log(`Location set: ${newLocation.name}`)
  }

  function setDesign(newDesign: Design) {
    design.value = newDesign
    saveToHistory()
    console.log(`Design set: ${newDesign.name}`)
  }

  function setLayout(newLayout: Layout) {
    layout.value = newLayout
    saveToHistory()
    console.log(`Layout set: ${newLayout.name}`)
  }

  function setColorScheme(newColorScheme: ColorScheme) {
    colorScheme.value = newColorScheme
    saveToHistory()
    console.log(`Color scheme set: ${newColorScheme.name}`)
  }

  function setFrame(newFrame: Frame | null) {
    frame.value = newFrame
    saveToHistory()
  }

  function setRibbon(enabled: boolean) {
    hasRibbon.value = enabled
    saveToHistory()
  }

  function setMapTitle(title: string) {
    mapTitle.value = title
    saveToHistory()
  }

  function setMapSubtitle(subtitle: string) {
    mapSubtitle.value = subtitle
    saveToHistory()
  }

  function setLoadingState(loading: boolean) {
    isLoading.value = loading
  }

  function setError(errorMessage: string | null) {
    error.value = errorMessage
    if (errorMessage) {
      console.error(`Error: ${errorMessage}`)
    }
  }

  function clearError() {
    error.value = null
  }

  function saveToHistory() {
    const state: HistoryEntry = {
      step: currentStep.value,
      location: location.value ? { ...location.value } : null,
      design: design.value ? { ...design.value } : null,
      layout: layout.value ? { ...layout.value } : null,
      colorScheme: colorScheme.value ? { ...colorScheme.value } : null,
      mapTitle: mapTitle.value,
      mapSubtitle: mapSubtitle.value,
      timestamp: Date.now()
    }

    if (historyIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, historyIndex.value + 1)
    }

    history.value.push(state)
    historyIndex.value = history.value.length - 1

    if (history.value.length > 50) {
      history.value.shift()
      historyIndex.value--
    }
  }

  function undo() {
    if (historyIndex.value > 0) {
      historyIndex.value--
      const state = history.value[historyIndex.value]
      restoreFromHistory(state)
      console.log('↶ Undo applied')
    }
  }

  function redo() {
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value++
      const state = history.value[historyIndex.value]
      restoreFromHistory(state)
      console.log('↷ Redo applied')
    }
  }

  function restoreFromHistory(state: HistoryEntry) {
    currentStep.value = state.step
    location.value = state.location
    design.value = state.design
    layout.value = state.layout
    colorScheme.value = state.colorScheme
    mapTitle.value = state.mapTitle || ''
    mapSubtitle.value = state.mapSubtitle || ''
  }

  function isStepValid(step: Step): boolean {
    switch (step) {
      case 'design':
        return !!design.value
      case 'location':
        return !!design.value && !!location.value
      case 'choose':
        return !!design.value && !!location.value && !!layout.value && !!colorScheme.value
      default:
        return false
    }
  }

  function reset() {
    currentStep.value = 'design'
    activeTab.value = 'print'
    location.value = DEFAULT_LOCATION
    design.value = null
    layout.value = null
    colorScheme.value = null
    frame.value = null
    hasRibbon.value = false
    mapTitle.value = DEFAULT_LOCATION.name
    mapSubtitle.value = ''
    isLoading.value = false
    error.value = null
    history.value = []
    historyIndex.value = -1

    console.log('Store reset to initial state')
  }

  return {
    currentStep: readonly(currentStep),
    activeTab: readonly(activeTab),
    location: readonly(location),
    design: readonly(design),
    layout: readonly(layout),
    colorScheme: readonly(colorScheme),
    frame: readonly(frame),
    hasRibbon: readonly(hasRibbon),
    mapTitle: readonly(mapTitle),
    mapSubtitle: readonly(mapSubtitle),
    isLoading: readonly(isLoading),
    error: readonly(error),

    coordinatesText,
    canProceedToNextStep,
    canGoToPreviousStep,
    completionProgress,
    isReadyForExport,
    currentState,

    nextStep,
    previousStep,
    goToStep,
    setCurrentStep,
    setActiveTab,
    setLocation,
    setDesign,
    setLayout,
    setColorScheme,
    setFrame,
    setRibbon,
    setMapTitle,
    setMapSubtitle,
    setLoadingState,
    setError,
    clearError,
    reset,
    undo,
    redo,

    isStepValid
  }
})
