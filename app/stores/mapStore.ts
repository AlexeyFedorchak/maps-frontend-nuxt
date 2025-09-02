import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Frame, Step, MapState, HistoryEntry } from '~/types'

export const useMapStore = defineStore('map', () => {
  const frame = ref<Frame | null>(null)
  const hasRibbon = ref(false)

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // const history = ref<HistoryEntry[]>([])
  // const historyIndex = ref(-1)



  const canProceedToNextStep = computed(() => {
    // switch (currentStep.value) {
    //   // case 'design':
    //   //   return !!design.value
    //   // TODO: move it to other store
    //   // case 'location':
    //   //   return !!location.value
    //   // case 'choose':
    //   //   return !!layout.value && !!colorScheme.value
    //   default:
    //     return false
    // }
    return true; /* return true for now */
  })

  const canGoToPreviousStep = computed(() => {
    return '' //currentStep.value !== 'design'
  })

  const completionProgress = computed(() => {
    let progress = 0
    // if (design.value) progress += 33
    // TODO: move it to other store
    // if (location.value) progress += 33
    // if (layout.value && colorScheme.value) progress += 34
    return progress
  })

  const isReadyForExport = computed(() => {
    // TODO: move it to other place
    return false //!!(location.value && design.value && layout.value && colorScheme.value)
  })

  const currentState = computed<MapState>(() => ({
    isLoading: isLoading.value,
    error: error.value
  }))

  function nextStep() {
    // if (!canProceedToNextStep.value) return
    //
    // switch (currentStep.value) {
    //   case 'design':
    //     currentStep.value = 'location'
    //     break
    //   case 'location':
    //     currentStep.value = 'choose'
    //     break
    // }

    saveToHistory()
    // console.log(`Moved to step: ${currentStep.value}`)
  }

  function previousStep() {
    if (!canGoToPreviousStep.value) return

    // switch (currentStep.value) {
    //   case 'location':
    //     currentStep.value = 'design'
    //     break
    //   case 'choose':
    //     currentStep.value = 'location'
    //     break
    // }

    saveToHistory()
    // console.log(`Moved back to step: ${currentStep.value}`)
  }

  function goToStep(step: Step) {
    // currentStep.value = step
    saveToHistory()
    console.log(`Jumped to step: ${step}`)
  }

  function setCurrentStep(step: Step) {
    // currentStep.value = step
    saveToHistory()
    console.log(`Step set to: ${step}`)
  }

  function setFrame(newFrame: Frame | null) {
    frame.value = newFrame
    saveToHistory()
  }

  function setRibbon(enabled: boolean) {
    hasRibbon.value = enabled
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
    // TODO: investigate why we need this?
    // const state: HistoryEntry = {
    //   step: currentStep.value,
    //   location: location.value ? { ...location.value } : null,
    //   design: design.value ? { ...design.value } : null,
    //   layout: layout.value ? { ...layout.value } : null,
    //   colorScheme: colorScheme.value ? { ...colorScheme.value } : null,
    //   mapTitle: mapTitle.value,
    //   mapSubtitle: mapSubtitle.value,
    //   timestamp: Date.now()
    // }
    //
    // if (historyIndex.value < history.value.length - 1) {
    //   history.value = history.value.slice(0, historyIndex.value + 1)
    // }
    //
    // history.value.push(state)
    // historyIndex.value = history.value.length - 1
    //
    // if (history.value.length > 50) {
    //   history.value.shift()
    //   historyIndex.value--
    // }
  }

  function undo() {
    // if (historyIndex.value > 0) {
    //   historyIndex.value--
    //   const state = history.value[historyIndex.value]
    //   restoreFromHistory(state)
    //   console.log('↶ Undo applied')
    // }
  }

  function redo() {
    // if (historyIndex.value < history.value.length - 1) {
    //   historyIndex.value++
    //   const state = history.value[historyIndex.value]
    //   restoreFromHistory(state)
    //   console.log('↷ Redo applied')
    // }
  }

  function restoreFromHistory(state: HistoryEntry) {
    // currentStep.value = state.step
    // location.value = state.location
    // design.value = state.design
    // layout.value = state.layout
    // colorScheme.value = state.colorScheme
    // mapTitle.value = state.mapTitle || ''
    // mapSubtitle.value = state.mapSubtitle || ''
  }

  function isStepValid(step: Step): boolean {
    switch (step) {
      // case 'design':
      //   return !!design.value
      // case 'location':
      //   return !!design.value && !!location.value
      // case 'choose':
      //   return !!design.value && !!location.value && !!layout.value && !!colorScheme.value
      default:
        return false
    }
  }

  function reset() {
    // currentStep.value = 'design'
    // location.value = DEFAULT_LOCATION
    // design.value = null
    // layout.value = null
    // colorScheme.value = null
    // frame.value = null
    // hasRibbon.value = false
    // mapTitle.value = DEFAULT_LOCATION.name
    // mapSubtitle.value = ''
    // isLoading.value = false
    // error.value = null
    // history.value = []
    // historyIndex.value = -1

    console.log('Store reset to initial state')
  }

  return {
    // State
    // currentStep,
    frame,
    hasRibbon,
    isLoading,
    error,
    // Getters
    canProceedToNextStep,
    canGoToPreviousStep,
    completionProgress,
    isReadyForExport,
    currentState,
    // Actions
    nextStep,
    previousStep,
    setFrame,
    setRibbon,
  }
});
