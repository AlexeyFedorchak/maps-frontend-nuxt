<template>
  <div id="designContent">
    <div>
      <span class="section-title uppercase mr-2">Theme:</span>
      <span class="sub-title">{{ selectedDesign?.name || 'Original-black' }}</span>
    </div>

    <div class="design-grid">
      <div
        v-for="design in designs"
        :key="design.id"
        class="design-option"
        :class="{ selected: selectedDesign?.id === design.id }"
        @click="selectDesign(design)"
      >
        <div class="design-preview">
          <div v-if="design.badge" class="design-badge">{{ design.badge }}</div>
          <img :src="design.preview" :alt="design.name">
        </div>
        <div class="design-name">{{ design.name }}</div>
      </div>
    </div>

    <div class="layout-section">
      <div>
        <span class="section-title uppercase mr-2">Layout:</span>
        <span class="sub-title">{{ selectedLayout?.name || 'Photo' }}</span>
      </div>

      <div class="layout-grid mt-4">
        <div
          v-for="layout in layouts"
          :key="layout.id"
          class="layout-option"
          :class="{ selected: selectedLayout?.id === layout.id }"
          @click="selectLayout(layout)"
        >
          <div class="layout-name flex-c">{{ layout.name }}</div>
        </div>
      </div>

      <div v-if="false" id="colorSelectorContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Design, Layout } from '../../../types'

interface Emits {
  (e: 'design-selected', design: Design): void
  (e: 'layout-selected', layout: Layout): void
}

const emit = defineEmits<Emits>()

const mapStore = useMapStore()
const {
  design: selectedDesign,
  layout: selectedLayout
} = storeToRefs(mapStore)

const designs = ref<Design[]>([
  {
    id: 'style-1',
    name: 'Original Black',
    preview: '/images/layouts/Design1.png',
    full_image: '/images/designs/original-black-full.jpg',
    mapboxStyle: 'mapbox://styles/picturethestars/cla9hyw9400x615mgdh6maidi',
    badge: null,
  },
  {
    id: 'style-2',
    name: 'Modern White',
    preview: '/images/layouts/Design2.png',
    full_image: '/images/designs/modern-white-full.jpg',
    mapboxStyle: 'mapbox://styles/picturethestars/cla9hyyxo000214ny7xj3vejr',
    badge: 'NEW'
  },
  {
    id: 'style-3',
    name: 'Vintage',
    preview: '/images/layouts/Design3.png',
    full_image: '/images/designs/vintage-full.jpg',
    mapboxStyle: 'mapbox://styles/picturethestars/cla9hz69s003t14saymfoel6l',
    badge: null
  },
  {
    id: 'style-4',
    name: 'Minimal',
    preview: '/images/layouts/Design4.png',
    full_image: '/images/designs/minimal-full.jpg',
    mapboxStyle: 'mapbox://styles/picturethestars/cla9hz4fg006515qwu1z4kjh9',
    badge: null
  },
  {
    id: 'style-5',
    name: 'Colorful',
    preview: '/images/layouts/Design5.png',
    full_image: '/images/designs/colorful-full.jpg',
    mapboxStyle: 'mapbox://styles/picturethestars/cla9hz0z000x715mgxs7g6m7d',
    badge: null
  },
  {
    id: 'style-6',
    name: 'Dark Modern',
    preview: '/images/layouts/Design6.png',
    mapboxStyle: 'mapbox://styles/picturethestars/cla9hz2si000r14ohss4vu28q',
    badge: null
   }
])

const layouts = ref<Layout[]>([
  {
    id: 'rectangle',
    name: 'Rectangle',
    shape: 'rectangle',
    preview: '/images/layouts/rectangle.svg'
  },
  {
    id: 'circle',
    name: 'Circle',
    shape: 'circle',
    preview: '/images/layouts/circle.svg'
  },
  {
    id: 'horizontal',
    name: 'Horizontal',
    shape: 'horizontal',
    preview: '/images/layouts/horizontal.svg'
  },
  {
    id: 'full-page',
    name: 'Full Page',
    shape: 'full-page',
    preview: '/images/layouts/full-page.svg'
  }
])

function selectDesign(design: Design) {
  mapStore.setDesign(design)
  emit('design-selected', design)
}

function selectLayout(layout: Layout) {
  mapStore.setLayout(layout)
  emit('layout-selected', layout)
}

onMounted(() => {
  if (!selectedDesign.value && designs.value.length > 0) {
    selectDesign(designs.value[0])
  }
  if (!selectedLayout.value && layouts.value.length > 0) {
    selectLayout(layouts.value[0])
  }
})
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}

.design-grid {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  margin-left: -20px !important;
  padding: 20px 0 20px 20px !important;
  scrollbar-width: none; 
  -ms-overflow-style: none; 
}

.design-grid::-webkit-scrollbar {
  display: none;
}
</style>
