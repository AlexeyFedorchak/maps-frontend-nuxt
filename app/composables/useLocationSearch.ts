import { ref, computed, type Ref } from 'vue'
import type { Location } from '../types'
import {MOCK_LOCATIONS} from "~/constants/mock/location";

export interface UseLocationSearchOptions {
  minQueryLength?: number
  debounceMs?: number
}

export interface UseLocationSearchReturn {
  query: Ref<string>
  results: Ref<Location[]>
  isSearching: Ref<boolean>
  searchError: Ref<string | null>
  showResults: Ref<boolean>
  searchLocations: (query: string) => Promise<Location[]>
  clearResults: () => void
  selectLocation: (location: Location) => void
}

export function useLocationSearch(
  options: UseLocationSearchOptions = {}
): UseLocationSearchReturn {
  const { 
    minQueryLength = 2, 
    debounceMs = 300 
  } = options

  const query = ref('')
  const results = ref<Location[]>([])
  const isSearching = ref(false)
  const searchError = ref<string | null>(null)
  const showResults = ref(false)

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  const canSearch = computed(() => 
    query.value.length >= minQueryLength
  )

  async function searchLocations(searchQuery: string): Promise<Location[]> {
    if (!searchQuery || searchQuery.length < minQueryLength) {
      clearResults()
      return []
    }

    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    return new Promise((resolve) => {
      debounceTimer = setTimeout(async () => {
        isSearching.value = true
        searchError.value = null
        showResults.value = false

        try {
          const response = await fetch('/search-locations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query: searchQuery })
          })

          const data = await response.json()
          
          if (data.success && data.features) {
            const locations: Location[] = data.features.map((feature: any) => ({
              id: feature.id,
              name: feature.text || feature.place_name.split(',')[0],
              coords: feature.center,
              zoom: 12,
              fullName: feature.place_name,
              country: feature.place_name.split(',').pop()?.trim()
            }))
            
            results.value = locations
            showResults.value = true
            resolve(locations)
          } else {
            const mockResults: Location[] = MOCK_LOCATIONS.filter(location =>
              location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              location.country?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            
            results.value = mockResults
            showResults.value = true
            resolve(mockResults)
          }
          
        } catch (error) {
          console.error('Search error:', error)
          
          const mockResults: Location[] = MOCK_LOCATIONS.filter(location =>
            location.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          
          results.value = mockResults
          showResults.value = true
          searchError.value = 'Error searching locations'
          resolve(mockResults)
        } finally {
          isSearching.value = false
        }
      }, debounceMs)
    })
  }

  function clearResults() {
    results.value = []
    showResults.value = false
    searchError.value = null
  }

  function selectLocation(location: Location) {
    query.value = location.name
    clearResults()
  }

  return {
    query,
    results,
    isSearching,
    searchError,
    showResults,
    searchLocations,
    clearResults,
    selectLocation
  }
}
