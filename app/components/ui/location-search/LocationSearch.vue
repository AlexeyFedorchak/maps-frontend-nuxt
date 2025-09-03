<template>
  <div class="location-search">
    <div class="location-search__field">
      <div class="location-search__input-group">
        <label class="location-search__label">
          <MapPin class="w-4 h-4" />
          Location
        </label>
        
        <input
          ref="inputRef"
          v-model="query"
          class="location-search__input"
          type="text"
          autocomplete="off"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
        />
      </div>

      <Transition name="dropdown">
        <div 
          v-if="showResults && (results.length > 0 || isSearching)"
          class="location-search__results"
        >
          <div 
            v-if="isSearching"
            class="location-search__loading"
          >
            <div class="location-search__spinner" />
            <span>Searching locations...</span>
          </div>

          <template v-else>
            <button
              v-for="(location, index) in results"
              :key="location.id"
              class="location-search__result"
              :class="{ 'location-search__result--highlighted': index === highlightedIndex }"
              @click="selectLocation(location)"
            >
              <div class="location-search__result-content">
                <div class="location-search__result-name">
                  {{ location.name }}
                </div>
                <div class="location-search__result-details">
                  {{ location.fullName || formatCoordinates(location.coords) }}
                </div>
              </div>
            </button>

            <div 
              v-if="results.length === 0"
              class="location-search__no-results"
            >
              <Search class="w-5 h-5 text-gray-400" />
              <span>No results found</span>
            </div>
          </template>
        </div>
      </Transition>

      <Transition name="fade">
        <div 
          v-if="searchError"
          class="location-search__error"
        >
          <AlertCircle class="w-4 h-4" />
          {{ searchError }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { MapPin, Search, AlertCircle } from 'lucide-vue-next'
import { useLocationSearch } from '~/composables/useLocationSearch'
import type { Location, Coordinates } from '~/types'

interface Emits {
  (e: 'location-selected', location: Location): void
}

const emit = defineEmits<Emits>()

const {
  query,
  results,
  isSearching,
  searchError,
  showResults,
  searchLocations,
  clearResults,
  selectLocation: selectLocationFromComposable
} = useLocationSearch()

const inputRef = ref<HTMLInputElement>()
const highlightedIndex = ref(-1)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  highlightedIndex.value = -1
  
  if (value.length >= 3) {
    searchLocations(value)
  } else {
    clearResults()
  }
}

function handleFocus() {
  if (query.value.length >= 3) {
    searchLocations(query.value)
  }
}

function handleBlur() {
  setTimeout(() => {
    clearResults()
  }, 200)
}

function handleKeydown(event: KeyboardEvent) {
  if (!showResults.value || results.value.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = Math.min(
        highlightedIndex.value + 1,
        results.value.length - 1
      )
      break
      
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1)
      break
      
    case 'Enter':
      event.preventDefault()
      if (highlightedIndex.value >= 0 && highlightedIndex.value < results.value.length) {
        selectLocation(results.value[highlightedIndex.value])
      }
      break
      
    case 'Escape':
      event.preventDefault()
      clearResults()
      inputRef.value?.blur()
      break
  }
}

function selectLocation(location: Location) {
  selectLocationFromComposable(location)
  emit('location-selected', location)
  highlightedIndex.value = -1
}

function formatCoordinates(coords: Coordinates): string {
  const [lng, lat] = coords
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
}

onMounted(() => {
  nextTick(() => {
    inputRef.value?.focus()
  })
})
</script>

<style scoped>
.location-search {
  @apply relative;
}

.location-search__field {
  @apply relative;
}

.location-search__input-group {
  @apply flex h-12 border border-gray-300 rounded-lg overflow-hidden;
  @apply focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500;
}

.location-search__label {
  @apply flex items-center px-4 bg-gray-50 border-r border-gray-300;
  @apply text-sm font-medium text-gray-700 whitespace-nowrap;
  min-width: 100px;
}

.location-search__input {
  @apply flex-1 px-4 py-3 bg-white text-sm;
  @apply focus:outline-none placeholder-gray-500;
}

.location-search__results {
  @apply absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200;
  @apply rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto;
}

.location-search__loading {
  @apply flex items-center p-4 text-sm text-gray-600;
}

.location-search__spinner {
  @apply w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-3;
}

.location-search__result {
  @apply w-full p-3 text-left hover:bg-gray-50 transition-colors;
  @apply border-b border-gray-100 last:border-b-0;
}

.location-search__result--highlighted {
  @apply bg-blue-50;
}

.location-search__result-content {
  @apply space-y-1;
}

.location-search__result-name {
  @apply font-medium text-gray-900;
}

.location-search__result-details {
  @apply text-sm text-gray-500;
}

.location-search__no-results {
  @apply flex items-center justify-center p-4 text-sm text-gray-500;
}

.location-search__error {
  @apply flex items-center mt-2 p-3 bg-red-50 border border-red-200 rounded-lg;
  @apply text-sm text-red-700;
}

.location-search__error .lucide {
  @apply mr-2 flex-shrink-0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
