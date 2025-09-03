<script setup lang="ts">
import { computed } from 'vue';
import { useMapStore } from '~/stores';
import type { FeatureItem } from '~/components/product-frame/Highlights.vue';

interface Props {
  locationName?: string
  coordinates?: string
  layoutShape?: string
  showDetails?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  locationName: 'London, UK',
  coordinates: '51.507°N 0.128°W',
  layoutShape: 'rectangle',
  showDetails: true
})

const mapStore = useMapStore()
const { frame, hasRibbon } = storeToRefs(mapStore)

const icons = ref<FeatureItem[]>([
  {icon: 'water-drop', label: 'Ultra Hd Print'},
  {icon: 'lifetime', label: 'Lifetime Warranty'},
  {icon: 'feather', label: 'Gicelle Art Prints'},
])

const borderClasses = computed(() => {
  const classes = []

  if (frame.value) {
    classes.push(frame.value.borderClass)
  }

  if (hasRibbon.value) {
    classes.push('gift-wrap-active')
  }

  return classes
})
</script>

<template>
  <div class="map-preview-section">
    <ProductFrameHighlights :items="icons"/>
    <LocationMapInteractive/>
    <div v-if="frame" class="map-border" :class="borderClasses"></div>
  </div>
</template>

<style>
:root {
  --map-border-width: 50vmin;
  --map-border-height: 75vmin;
  --map-position-top: 45%;
  --map-position-left: 50%;
}

.map-preview-section {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-image: url(/images/background.jpg);
}

/* Keep background image on mobile */
@media (max-width: 768px) {
  .map-preview-section {
    background-color: transparent !important;
    /* Keep background-image from parent styles */
  }

  :root {
    --map-border-width: 60vw; /* width of border */
    --map-border-height: 70vh; /* height of border */
    --map-scale-width: 0.75; /* Map = 75% from width of border */
    --map-scale-height: 0.70; /* Map = 70% from height of border */
  }

  .map-preview-section .map-frame.rectangle-container {
    width: 55vmin !important;
    height: 70vmin !important;
    padding: 5px !important;
    max-width: none !important;
    max-height: none !important;
    background-color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  /*  (Rectangle) */
  .map-frame.rectangle-container {
    width: 1vmin !important;
    height: 1vmin !important;
  }

  /* Border */
  .map-border {
    width: 60vmin !important;
    height: 90vmin !important;
    right: 10px;
  }

  /* Adaptive size for text */
  .map-frame.rectangle-container .map-details {
    font-size: clamp(8px, 1.5vw, 12px) !important;
    padding: 0.5vh 1vw !important;
    top: 9px;
    align-items: center;
    height: auto;
    min-height: unset;
  }

  .map-frame.rectangle-container .map-title {
    font-size: clamp(9px, 2vw, 14px) !important;
    margin-right: 8px;
  }

  .map-frame.rectangle-container .map-subtitle {
    margin: 0;
    margin-left: 0;
    font-size: clamp(9px, 2vw, 13px);
  }

  .map-frame.rectangle-container .map-coordinates {
    font-size: clamp(8px, 1.5vw, 12px) !important;
    margin-left: auto;
  }

  .map-frame.rectangle-container .map-coordinates-below {
    font-size: clamp(8px, 1.5vw, 12px) !important;
    margin-top: 0 !important;
    line-height: 1.2;
  }

  /* (Circle) */
  .map-frame.circle-container {
    --circle-size: min(60vw, 60vh);
    width: 55vmin !important;
    height: 70vmin !important;
    padding: calc(var(--circle-size) * 0.03) !important;
  }

  .map-frame.circle-container #interactiveMap {
    width: 75%;
    height: 70%;
    border-radius: 30%;
    bottom: 1% !important;
    left: 1px;
  }

  .map-frame.circle-container .map-details {
    margin-top: 5px;
    text-align: center;
    font-size: 12px;
    line-height: 1.4;
    background: transparent;
  }


  .map-frame.horizontal-container {
    max-width: 240px;
    max-height: 290px;
  }

  .map-frame.horizontal-container #interactiveMap {
    width: 220px !important;
    height: 300px !important;
  }

  .map-frame.horizontal-container .map-details {
    bottom: 10px;
    padding: 4px 8px;
    font-size: 8px;
  }

  .map-frame.full-page-container {
    max-width: 260px;
    max-height: 290px;
  }

  .map-frame.full-page-container #interactiveMap {
    width: 220px !important;
    height: 300px !important;
  }

  .map-details {
    font-size: 9px;
    padding: 3px 5px;
  }

  .map-title {
    font-size: 10px;
  }

  .map-coordinates {
    font-size: 9px;
  }

  .map-subtitle {
    font-size: 8px;
  }
}

.map-frame {
  position: absolute;
  top: var(--map-position-top);
  left: var(--map-position-left);
  transform: translate(-50%, -50%);
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-frame.circle-container {
  background-color: #FFF;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  align-items: center;
}

.map-frame.rectangle-container #interactiveMap {
  flex-grow: 1;
  flex: 1 !important;
  height: 85% !important;
  width: 100% !important;
}

.map-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 6px 10px;
  text-align: center;
  font-size: 10px;
  border-top: 1px solid #eee;
}

.map-frame.rectangle-container .map-details {
  width: 100%;
  position: relative;
  flex-shrink: 0;
  background: transparent;
  border-top: none;
  padding: 5px 0;
  text-align: left;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  min-height: 35px;
  height: 35px;
}

.map-frame.rectangle-container .map-title {
  margin-bottom: 0;
  font-weight: 600;
  font-size: 13px;
}

.map-frame.rectangle-container .map-coordinates {
  font-weight: 500;
  font-size: 12px;
  margin-left: auto;
}

.map-frame.rectangle-container .map-subtitle {
  font-weight: 400;
  font-size: 10px;
  margin-left: auto;
}

.map-frame.rectangle-container .map-coordinates-below {
  font-weight: 500;
  font-size: 12px;
  width: 100%;
  margin-top: 2px;
}


.map-frame.circle-container .map-details {
  position: relative;
  bottom: auto;
  left: auto;
  right: auto;
  border-top: none;
  padding: 16px 0;
  flex-shrink: 0;
  background-color: #fff;
  width: 100%;
  text-align: center;
}

.map-frame.circle-container .map-coordinates {
  text-align: center;
  width: 100%;
  margin: 0 auto;
  display: block;
  letter-spacing: 0.5px;
}

.map-frame.horizontal-container .map-details {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  background-color: #fff;
  color: #333;
  padding: 6px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-top: none;
  z-index: 10;
}

#interactiveMap .mapboxgl-ctrl-group {
  opacity: 0;
  transition: opacity 0.3s ease;
}

#interactiveMap:hover .mapboxgl-ctrl-group {
  opacity: 1;
}

#interactiveMap .mapboxgl-ctrl-container {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}

#interactiveMap .mapboxgl-ctrl-container.controls-visible {
  opacity: 1;
  pointer-events: auto;
}

.map-frame.full-page-container .map-details {
  display: none;
}

.map-frame.horizontal-container .map-details {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  background-color: #fff;
  color: #333;
  padding: 6px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-top: none;
  right: auto;
}

.map-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 6px 10px;
  text-align: center;
  font-size: 10px;
  border-top: 1px solid #eee;
}

.layout-option[data-shape="circle"] .layout-preview img {
  border-radius: 50%;
}

.map-title {
  font-size: 10px;
  font-weight: 700;
  color: #333;
  margin-bottom: 3px;
  font-family: var(--font-family-secondary);
}

.map-coordinates {
  font-size: 11px;
  font-family: var(--font-family-secondary);
}

.map-subtitle {
  font-size: 10px;
  font-weight: 500;
  color: #333;
  font-family: var(--font-family-secondary);
  margin-top: 2px;
}

#interactiveMap.circle-layout .mapboxgl-canvas {
  border-radius: 100%;
}

#interactiveMap.circle-layout .mapboxgl-ctrl-top-right {
  top: 40px;
  right: 40px;
  transition: top 0.3s ease, right 0.3s ease;
}

.map-frame.rectangle-container {
  background-color: white;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.map-border {
  position: absolute;
  top: var(--map-position-top, 45%);
  left: var(--map-position-left, 50%);
  transform: translate(-50%, -50%);
  width: var(--map-border-width, 50vmin);
  height: var(--map-border-height, 65vmin);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 2;
}

.gift-wrap-active {
  background-image: url('/images/frames/giftwrap_large_red.png');
}

.map-border-black {
  background-image: url('/images/frames/frame-black.webp');
}

.map-border-black.gift-wrap-active {
  background-image: url('/images/frames/giftwrap_large_red.png'),
  url('/images/frames/frame-black.webp');
}

.map-border-wood {
  background-image: url('/images/frames/frame-wood.webp');
}

.map-border-wood.gift-wrap-active {
  background-image: url('/images/frames/giftwrap_large_red.png'),
  url('/images/frames/frame-wood.webp');
}

.map-border-white {
  background-image: url('/images/frames/frame-white.webp');
}

.map-border-white.gift-wrap-active {
  background-image: url('/images/frames/giftwrap_large_red.png'),
  url('/images/frames/frame-white.webp');
}

</style>

<style scoped>
.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #6c757d;
  font-size: 1rem;
}
</style>