<template>
  <div id="locationContent" :style="isMobile ? 'background-color: #FFFFFF !important' : ''">
    <div class="section-title mb-3">Location map data</div>

    <div class="input-field">
      <div class="input-group flex-nowrap">
        <span class="input-group-text border-radius-l" id="location">
          <span>Location</span>
        </span>
        <input
          id="locationSearch"
          v-model="searchQuery"
          @input="handleSearch"
          @focus="showResults = true"
          @blur="hideResults"
          type="text"
          class="form-control border-radius-r"
          placeholder="Search here..."
          aria-label="Search Here"
          aria-describedby="location"
          autocomplete="off"
        >
      </div>

      <div
        v-if="showResults && (searchResults.length > 0 || isSearching)"
        id="searchResults"
        style="position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ddd; border-radius: 20px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); max-height: 200px; overflow-y: auto; z-index: 1000;"
      >
        <div v-if="isSearching" class="search-result-item">
          Searching...
        </div>
        <div
          v-for="result in searchResults"
          :key="result.id"
          @mousedown="selectLocation(result)"
          class="search-result-item"
        >
          {{ result.name }}
          <span v-if="result.country" class="search-result-country">{{ result.country }}</span>
        </div>
      </div>
    </div>

    <div class="input-field">
      <div class="input-group flex-nowrap">
        <span class="input-group-text border-radius-l" id="title">
          <span>Title</span>
        </span>
        <input
          v-model="mapTitle"
          @input="emit('update-map-title', ($event?.target as HTMLInputElement)?.value)"
          type="text"
          class="form-control border-radius-r"
          placeholder="Custom title"
          aria-label="Custom title"
          aria-describedby="title"
          autocomplete="off"
        >
      </div>
    </div>

    <div class="input-field">
      <div class="input-group flex-nowrap">
        <span class="input-group-text border-radius-l" id="subtitle">
          <span>Sub Title</span>
        </span>
        <input
          v-model="mapSubtitle"
          @input="emit('update-map-subtitle', ($event?.target as HTMLInputElement)?.value)"
          type="text"
          class="form-control border-radius-r"
          placeholder="Type here..."
          aria-label="Subtitle"
          aria-describedby="subtitle"
          autocomplete="off"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Location } from '~/types'

const { isMobile } = useBreakpoints();

const props = defineProps<{
  location: Location | null;
  mapTitle: string | undefined;
  mapSubtitle: string | undefined;
}>();

const emit = defineEmits<{
  (e: 'location-selected', location: Location): void;
  (e: 'update-map-title', value: string | undefined): void;
  (e: 'update-map-subtitle', value: string | undefined): void;
}>()

const searchQuery = ref('');
const mapTitle = ref<string | undefined>('');
const mapSubtitle = ref<string | undefined>('');
const showResults = ref(false);
const searchResults = ref<Location[]>([]);
const isSearching = ref(false);

const { searchLocations } = useLocationSearch();

let searchTimeout: ReturnType<typeof setTimeout>;

async function handleSearch() {
  clearTimeout(searchTimeout);

  if (searchQuery.value.length < 2) {
    searchResults.value = [];
    return;
  }

  searchTimeout = setTimeout(async () => {
    isSearching.value = true;
    try {
      searchResults.value = await searchLocations(searchQuery.value);
    } catch (error) {
      console.error('Search error:', error)
      searchResults.value = [];
    } finally {
      isSearching.value = false;
    }
  }, 300)
}

function selectLocation(location: Location) {
  searchQuery.value = location.name;
  searchResults.value = [];
  showResults.value = false;
  mapTitle.value = location.name;
  emit('location-selected', location);
}

function hideResults() {
  setTimeout(() => {
    showResults.value = false;
  }, 200);
}

watch(() => props.location, (newLocation) => {
  if (newLocation) {
    searchQuery.value = newLocation.name;
    mapTitle.value = newLocation.name;
  }
});

watch(() => props.mapTitle, (newTitle) => {
  mapTitle.value = newTitle;
});

watch(() => props.mapSubtitle, (newSubtitle) => {
  mapSubtitle.value = newSubtitle;
});

if (props.location) {
  searchQuery.value = props.location.name;
}

mapTitle.value = props.mapTitle;
mapSubtitle.value = props.mapSubtitle;
</script>

<style scoped>
.search-result-item {
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: #f8f9fa;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-country {
  color: #6c757d;
  font-size: 0.9em;
  margin-left: 5px;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
