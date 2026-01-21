<template>
  <div class="color-scheme-selector">


    <div class="color-scheme-selector__grid">
      <button
        v-for="scheme in activeColorSchemes"
        :key="scheme.id"
        class="color-scheme-selector__item"
        :class="{ 'color-scheme-selector__item--selected': selectedSchemeId === scheme.id }"
        @click="selectColorScheme(scheme)"
      >
        <div
          class="color-scheme-selector__preview"
          :style="{ background: scheme.preview }"
        >
          <div class="color-scheme-selector__colors">
            <div
              v-for="(color, key) in scheme.colors"
              :key="key"
              class="color-scheme-selector__color"
              :style="{ backgroundColor: color }"
              :title="`${key}: ${color}`"
            />
          </div>
        </div>

        <div class="color-scheme-selector__info">
          <h4 class="color-scheme-selector__name">
            {{ scheme.name }}
          </h4>
          <p
            v-if="scheme.description"
            class="color-scheme-selector__description"
          >
            {{ scheme.description }}
          </p>
        </div>
      </button>
    </div>

    <div
      v-if="selectedScheme"
      class="color-scheme-selector__details"
    >
      <h4 class="color-scheme-selector__details-title">
         "{{ selectedScheme.name }}"
      </h4>

      <div class="color-scheme-selector__color-details">
        <div
          v-for="(color, key) in selectedScheme.colors"
          :key="key"
          class="color-scheme-selector__color-item"
        >
          <div
            class="color-scheme-selector__color-swatch"
            :style="{ backgroundColor: color }"
          />
          <div class="color-scheme-selector__color-info">
            <span class="color-scheme-selector__color-label">
              {{ getColorLabel(key) }}
            </span>
            <span class="color-scheme-selector__color-value">
              {{ color }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="color-scheme-selector__loading"
    >
      <div class="color-scheme-selector__spinner" />
    </div>

    <div
      v-if="error"
      class="color-scheme-selector__error"
    >
      <AlertCircle class="w-5 h-5" />
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { AlertCircle } from 'lucide-vue-next'
import { useMapStyles } from '../../composables/useMapStyles'
import type { ColorScheme } from '~/types'

interface Props {
  selectedSchemeId?: string | null
}

interface Emits {
  (e: 'color-scheme-selected', scheme: ColorScheme): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()


const { colorSchemes, isLoading, error, loadStyles, getColorSchemeById } = useMapStyles()


const activeColorSchemes = computed(() =>
  colorSchemes.value.filter(scheme => scheme.isActive)
)


const selectedScheme = computed(() =>
  props.selectedSchemeId ? getColorSchemeById(props.selectedSchemeId) : null
)


function selectColorScheme(scheme: ColorScheme) {
  emit('color-scheme-selected', scheme)
}

function getColorLabel(key: string): string {
  const labels: Record<string, string> = {
    water: 'Water',
    land: 'Land',
    roads: 'roads',
    text: 'Text',
    background: 'Background'
  }
  return labels[key] || key
}


onMounted(() => {
  if (colorSchemes.value.length === 0) {
    loadStyles()
  }
})
</script>

<style scoped>
.color-scheme-selector {
  @apply space-y-6;
}

.color-scheme-selector__title {
  @apply text-base font-bold text-gray-900;
}

.color-scheme-selector__grid {
  @apply grid grid-cols-2 gap-4;
}

.color-scheme-selector__item {
  @apply relative p-3 border-2 border-gray-200 rounded-lg;
  @apply hover:border-blue-300 transition-all duration-200 text-left;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.color-scheme-selector__item--selected {
  @apply border-blue-500 bg-blue-50;
}

.color-scheme-selector__preview {
  @apply w-full h-16 rounded-md mb-3 relative overflow-hidden;
}

.color-scheme-selector__colors {
  @apply absolute inset-0 flex;
}

.color-scheme-selector__color {
  @apply flex-1 h-full;
}

.color-scheme-selector__info {
  @apply text-center;
}

.color-scheme-selector__name {
  @apply font-semibold text-gray-900 mb-1;
}

.color-scheme-selector__description {
  @apply text-xs text-gray-600 leading-tight;
}

.color-scheme-selector__details {
  @apply p-4 bg-gray-50 rounded-lg border border-gray-200;
}

.color-scheme-selector__details-title {
  @apply text-sm font-semibold text-gray-900 mb-3;
}

.color-scheme-selector__color-details {
  @apply space-y-2;
}

.color-scheme-selector__color-item {
  @apply flex items-center space-x-3;
}

.color-scheme-selector__color-swatch {
  @apply w-6 h-6 rounded border border-gray-300 flex-shrink-0;
}

.color-scheme-selector__color-info {
  @apply flex-1 min-w-0;
}

.color-scheme-selector__color-label {
  @apply block text-sm font-medium text-gray-700;
}

.color-scheme-selector__color-value {
  @apply block text-xs text-gray-500 font-mono;
}

.color-scheme-selector__loading {
  @apply flex items-center justify-center p-8 text-gray-600;
}

.color-scheme-selector__spinner {
  @apply w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-3;
}

.color-scheme-selector__error {
  @apply flex items-center p-4 bg-red-50 border border-red-200 rounded-lg;
  @apply text-red-700 text-sm;
}

@media (max-width: 480px) {
  .color-scheme-selector__grid {
    @apply grid-cols-1;
  }
}
</style>
