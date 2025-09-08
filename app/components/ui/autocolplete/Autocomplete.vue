<script setup lang="ts">
import type {HTMLAttributes} from "vue";
import {useVModel} from "@vueuse/core";
import {cn} from "@/lib/utils";
import type {Location} from "~/types";

const props = defineProps<{
  staticText?: string
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes["class"]
}>();
const { searchLocations } = useLocationSearch();

const showResults = ref(false);
const searchResults = ref<Location[]>([]);
const isSearching = ref(false);
const staticTextRef = ref<HTMLElement | null>(null);
const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void
  (e: "location-selected", location: Location): void
}>();

let searchTimeout: ReturnType<typeof setTimeout>;

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const handleSearch = async () => {
  clearTimeout(searchTimeout);

  if (!modelValue.value || modelValue.value.length < 2) {
    searchResults.value = [];
    return;
  }

  searchTimeout = setTimeout(async () => {
    isSearching.value = true;
    try {
      searchResults.value = await searchLocations(modelValue.value || '');
    } catch (error) {
      console.error('Search error:', error);
      searchResults.value = [];
    } finally {
      isSearching.value = false;
    }
    console.log(searchResults.value);
  }, 300);
}

function selectLocation(location: Location) {
  modelValue.value = location.name;
  searchResults.value = [];
  showResults.value = false;
  emits('location-selected', location);
}

function hideResults() {
  setTimeout(() => {
    showResults.value = false;
  }, 200);
}
</script>

<template>
  <div class="relative w-full">
    <span ref="staticTextRef" v-if="staticText"
          class="absolute top-[8px] inline-block pl-[20px] pr-[20px] pt-[7px] pb-[7px] border-r border-input">{{ staticText }}</span>
    <input
        v-model="modelValue"
        data-slot="input"
        @input="handleSearch"
        @focus="showResults = true"
        @blur="hideResults"
        :style="{paddingLeft: `${staticTextRef?.offsetWidth + 18}px`}"
        :class="cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-[50px] w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      props.class,
    )"
    >
    <div
        v-if="showResults && (searchResults.length > 0 || isSearching)"
        class="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] max-h-[200px] overflow-y-auto z-[1000]">
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

</template>

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
</style>
