<template>
  <div class="design-grid">
   

    <div class="design-grid__container">
      <button
        v-for="design in designs"
        :key="design.id"
        class="design-grid__item"
        :class="{ 'design-grid__item--selected': selectedDesignId === design.id }"
        @click="selectDesign(design)"
      >
        <div class="design-grid__preview">
          <img
            :src="design.preview"
            :alt="design.name"
            class="design-grid__image"
            loading="lazy"
          />
        </div>
        
        <div class="design-grid__info">
          <h4 class="design-grid__name">
            {{ design.name }}
          </h4>
          <p 
            v-if="design.description"
            class="design-grid__description"
          >
            {{ design.description }}
          </p>
        </div>
      </button>
    </div>

    <div 
      v-if="isLoading"
      class="design-grid__loading"
    >
      <div class="design-grid__spinner" />
    </div>

    <div 
      v-if="error"
      class="design-grid__error"
    >
      <AlertCircle class="w-5 h-5" />
      <span>{{ error }}</span>
      <button
        class="design-grid__retry"
        @click="loadDesigns"
      >

      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { AlertCircle } from 'lucide-vue-next'
import { useMapStyles } from '../../composables/useMapStyles'
import type { Design } from '../../types'

interface Props {
  selectedDesignId?: number | null
}

interface Emits {
  (e: 'design-selected', design: Design): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { designs, isLoading, error, loadStyles } = useMapStyles()

const activeDesigns = computed(() =>
  designs.value.filter(design => design.isActive)
)

function selectDesign(design: Design) {
  emit('design-selected', design)
}

async function loadDesigns() {
  await loadStyles()
}

onMounted(() => {
  if (designs.value.length === 0) {
    loadDesigns()
  }
})
</script>

<style scoped>
.design-grid {
  @apply space-y-4;
}

.design-grid__title {
  @apply text-lg font-bold text-gray-900 mb-4;
}

.design-grid__container {
  @apply grid grid-cols-3 gap-4;
}

.design-grid__item {
  @apply relative p-2 rounded-lg border-2 border-transparent;
  @apply hover:border-blue-300 transition-all duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.design-grid__item--selected {
  @apply border-blue-500 bg-blue-50;
}

.design-grid__preview {
  @apply w-full aspect-square rounded-lg overflow-hidden mb-2;
  @apply bg-gray-100 flex items-center justify-center;
}

.design-grid__image {
  @apply w-full h-full object-cover;
}

.design-grid__info {
  @apply text-center;
}

.design-grid__name {
  @apply text-sm font-semibold text-gray-900 mb-1;
}

.design-grid__description {
  @apply text-xs text-gray-600 leading-tight;
}

.design-grid__loading {
  @apply flex items-center justify-center p-8 text-gray-600;
}

.design-grid__spinner {
  @apply w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-3;
}

.design-grid__error {
  @apply flex flex-col items-center p-6 bg-red-50 border border-red-200 rounded-lg;
  @apply text-red-700 text-sm text-center space-y-3;
}

.design-grid__retry {
  @apply px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700;
  @apply transition-colors text-sm font-medium;
}

@media (max-width: 640px) {
  .design-grid__container {
    @apply grid-cols-2;
  }
}

@media (max-width: 480px) {
  .design-grid__container {
    @apply grid-cols-1;
  }
}
</style>
