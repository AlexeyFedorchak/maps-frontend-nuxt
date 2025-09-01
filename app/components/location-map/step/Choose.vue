<template>
  <div id="chooseContent" :style="isMobile ? 'background-color: #FFFFFF !important' : ''">
    <div class="mb-3">
      <span class="section-title uppercase mr-2">Size:</span>
      <span class="sub-title">{{ selectedSize?.name || 'A4' }} ({{ selectedSize?.dimensions || '21x29.7cm' }}) + £{{ selectedSize?.price || '21.99' }}</span>
    </div>

    <div class="option-section">
      <div
        v-for="size in sizes"
        :key="size.id"
        class="option mr-4"
        :class="{ active: selectedSize?.id === size.id }"
        @click="selectSize(size)"
      >
        <div>{{ size.label }}</div>
      </div>
    </div>

    <div class="mt-5 mb-3">
      <span class="section-title uppercase mr-2">Frame & Mount:</span>
      <span class="sub-title">
        {{ selectedFrame ? `${selectedFrame.name} + £${getFramePrice(selectedFrame)}` : 'No Frame' }}
        {{ selectedRibbon ? ` & Ribbon + £${ribbonPrice}` : '' }}
      </span>
    </div>

    <div class="option-section">
      <div
        class="option mr-4"
        :class="{ active: !selectedFrame }"
        @click="selectFrame(null)"
      >
        <div class="sub-title">X</div>
      </div>

      <div
        v-for="frame in frames"
        :key="frame.id"
        class="option mr-4"
        :class="{ active: selectedFrame?.id === frame.id }"
        @click="selectFrame(frame)"
      >
        <div :class="frame.className"></div>
      </div>

      <p class="plus-sign">+</p>

      <div
        class="option flex-c"
        :class="{ active: selectedRibbon }"
        @click="toggleRibbon"
      >
        <div class="ribbon"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

interface Size {
  id: string
  label: string
  name: string
  dimensions: string
  price: string
  numericPrice: number
}

interface Frame {
  id: string
  name: string
  className: string
  borderClass: string
}

interface Emits {
  (e: 'layout-selected', layout: any): void
  (e: 'color-scheme-selected', colorScheme: any): void
  (e: 'total-updated', total: number): void
}

const emit = defineEmits<Emits>()

const mapStore = useMapStore()
const {
  frame: selectedFrame,
  hasRibbon: selectedRibbon
} = storeToRefs(mapStore)

const selectedSize = ref<Size | null>(null)

const ribbonPrice = '2.49'

const sizes = ref<Size[]>([
  { id: 'a4', label: 'A4', name: 'A4', dimensions: '21x29.7cm', price: '21.99', numericPrice: 21.99 },
  { id: 's', label: 'S', name: 'S', dimensions: '21x29.7cm', price: '27.99', numericPrice: 27.99 },
  { id: 'm', label: 'M', name: 'M', dimensions: '30x40cm', price: '31.99', numericPrice: 31.99 },
  { id: 'l', label: 'L', name: 'L', dimensions: '40x50cm', price: '39.99', numericPrice: 39.99 },
  { id: 'xl', label: 'XL', name: 'XL', dimensions: '50x70cm', price: '69.99', numericPrice: 69.99 }
])

const frames = ref<Frame[]>([
  { id: 'black', name: 'Black Frame', className: 'black-frame', borderClass: 'map-border-black' },
  { id: 'white', name: 'White Frame', className: 'white-frame', borderClass: 'map-border-white' },
  { id: 'natural', name: 'Natural Frame', className: 'natural-frame', borderClass: 'map-border-wood' }
])

const framePrices: Record<string, Record<string, string>> = {
  a4: { black: '14.99', white: '14.99', natural: '14.99' },
  s: { black: '19.99', white: '19.99', natural: '19.99' },
  m: { black: '24.99', white: '24.99', natural: '24.99' },
  l: { black: '34.99', white: '34.99', natural: '34.99' },
  xl: { black: '49.99', white: '49.99', natural: '49.99' }
}

const framePricesNumeric: Record<string, Record<string, number>> = {
  a4: { black: 14.99, white: 14.99, natural: 14.99 },
  s: { black: 19.99, white: 19.99, natural: 19.99 },
  m: { black: 24.99, white: 24.99, natural: 24.99 },
  l: { black: 34.99, white: 34.99, natural: 34.99 },
  xl: { black: 49.99, white: 49.99, natural: 49.99 }
}

const getFramePrice = (frame: Frame): string => {
  if (!selectedSize.value || !frame) return '0.00'
  return framePrices[selectedSize.value.id]?.[frame.id] || '0.00'
}

const getFramePriceNumeric = (frame: Frame): number => {
  if (!selectedSize.value || !frame) return 0
  return framePricesNumeric[selectedSize.value.id]?.[frame.id] || 0
}

const totalPrice = computed((): number => {
  let total = 0
  
  if (selectedSize.value) {
    total += selectedSize.value.numericPrice
  }
  
  if (selectedFrame.value && selectedSize.value) {
    total += getFramePriceNumeric(selectedFrame.value)
  }
  
  if (selectedRibbon.value) {
    total += 2.49
  }
  
  return Math.round(total * 100) / 100
})

function selectSize(size: Size): void {
  selectedSize.value = size
}


function selectFrame(frame: Frame | null): void {
  mapStore.setFrame(frame)
  
  if (frame && selectedSize.value) {
    const price = getFramePrice(frame)
  } else {
    console.log('Frame removed')
  }
}

function toggleRibbon(): void {
  mapStore.setRibbon(!selectedRibbon.value)
}

watch(totalPrice, (newTotal) => {
  emit('total-updated', newTotal)
}, { immediate: true })

watch(selectedSize, (newSize, oldSize) => {
  if (newSize && oldSize && newSize.id !== oldSize.id) {

    if (selectedFrame.value) {
      const newFramePrice = getFramePrice(selectedFrame.value)
    }
  }
})

watch(selectedFrame, (newFrame, oldFrame) => {
  if ((newFrame?.id !== oldFrame?.id) && selectedSize.value) {
    if (newFrame) {
      const price = getFramePrice(newFrame)
    } else {
      console.log('Frame removed')
    }
  }
})

watch(selectedRibbon, (newRibbon) => {
  console.log(`Ribbon ${newRibbon ? 'added' : 'removed'} - £${ribbonPrice}`)
})

onMounted(() => {
  if (!selectedSize.value && sizes.value.length > 0) {
    selectedSize.value = sizes.value[0]
    emit('total-updated', totalPrice.value)
  }
  
  if (selectedFrame.value) {
    mapStore.setFrame(null)
  }
  if (selectedRibbon.value) {
    mapStore.setRibbon(false)
  }
})
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}

.mt-5 {
  margin-top: 2rem;
}

.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
