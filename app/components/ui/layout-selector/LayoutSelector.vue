<template>
  <div class="layout-selector">
   

    <div class="layout-selector__grid">
      <button
        v-for="layout in activeLayouts"
        :key="layout.id"
        class="layout-selector__item"
        :class="{ 'layout-selector__item--selected': selectedLayoutId === layout.id }"
        @click="selectLayout(layout)"
      >
        <div class="layout-selector__preview">
          <img
            v-if="layout.preview"
            :src="layout.preview"
            :alt="layout.name"
            class="layout-selector__image"
          />
          <div 
            v-else
            class="layout-selector__placeholder"
            :class="`layout-selector__placeholder--${layout.shape}`"
          />
        </div>
        
        <div class="layout-selector__info">
          <h4 class="layout-selector__name">
            {{ layout.name }}
          </h4>
          <p class="layout-selector__dimensions">
            {{ layout.dimensions }}
          </p>
          <p 
            v-if="layout.description"
            class="layout-selector__description"
          >
            {{ layout.description }}
          </p>
        </div>

        <div 
          v-if="layout.isDefault"
          class="layout-selector__badge"
        >
        </div>
      </button>
    </div>

    <div 
      v-if="isLoading"
      class="layout-selector__loading"
    >
      <div class="layout-selector__spinner" />
    </div>

    <div 
      v-if="error"
      class="layout-selector__error"
    >
      <AlertCircle class="w-5 h-5" />
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { AlertCircle } from 'lucide-vue-next'
import { useMapStyles } from '~/composables/useMapStyles'
import type { Layout } from '~/types'

interface Props {
  selectedLayoutId?: number | null
}

interface Emits {
  (e: 'layout-selected', layout: Layout): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { layouts, isLoading, error, loadStyles } = useMapStyles()

const activeLayouts = computed(() =>
  layouts.value.filter(layout => layout.isActive)
)

function selectLayout(layout: Layout) {
  emit('layout-selected', layout)
}

onMounted(() => {
  if (layouts.value.length === 0) {
    loadStyles()
  }
})
</script>

<style scoped>
.layout-selector {
  @apply space-y-4;
}

.layout-selector__title {
  @apply text-lg font-bold text-gray-900;
}

.layout-selector__grid {
  @apply grid grid-cols-2 gap-4;
}

.layout-selector__item {
  @apply relative p-4 border-2 border-gray-200 rounded-lg;
  @apply hover:border-blue-300 transition-all duration-200 text-left;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.layout-selector__item--selected {
  @apply border-blue-500 bg-blue-50;
}

.layout-selector__preview {
  @apply w-16 h-16 mx-auto mb-3 flex items-center justify-center;
}

.layout-selector__image {
  @apply w-full h-full object-contain;
}

.layout-selector__placeholder {
  @apply border-2 border-gray-300;
}

.layout-selector__placeholder--rectangle {
  @apply w-12 h-8;
}

.layout-selector__placeholder--circle {
  @apply w-12 h-12 rounded-full;
}

.layout-selector__placeholder--horizontal {
  @apply w-16 h-6;
}

.layout-selector__placeholder--tall {
  @apply w-8 h-12;
}

.layout-selector__info {
  @apply text-center;
}

.layout-selector__name {
  @apply text-sm font-semibold text-gray-900 mb-1;
}

.layout-selector__dimensions {
  @apply text-xs text-blue-600 font-medium mb-1;
}

.layout-selector__description {
  @apply text-xs text-gray-500 leading-tight;
}

.layout-selector__badge {
  @apply absolute top-2 right-2 px-2 py-1 bg-green-100 text-green-800;
  @apply text-xs font-medium rounded-full;
}

.layout-selector__loading {
  @apply flex items-center justify-center p-8 text-gray-600;
}

.layout-selector__spinner {
  @apply w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-3;
}

.layout-selector__error {
  @apply flex items-center p-4 bg-red-50 border border-red-200 rounded-lg;
  @apply text-red-700 text-sm;
}

@media (max-width: 480px) {
  .layout-selector__grid {
    @apply grid-cols-1;
  }
}
</style>
