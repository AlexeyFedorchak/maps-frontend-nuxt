<template>
  <div :class="['map-frame', `${layout?.shape}-container`]">
    <div ref="mapContainer"
         id="interactiveMap"
         :class="mapClasses">
    </div>
    <div class="map-details" v-if="showDetails">
      <template v-if="layout?.shape === 'rectangle' && displaySubtitle">
        <div class="map-title">{{ displayTitle }}</div>
        <div class="map-subtitle">{{ displaySubtitle }}</div>
        <div class="map-coordinates-below">{{ coordinates }}</div>
      </template>
      <template v-else>
        <div class="map-title">{{ displayTitle }}</div>
        <div class="map-subtitle" v-if="displaySubtitle">{{ displaySubtitle }}</div>
        <div class="map-coordinates">{{ coordinates }}</div>
      </template>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useMapStore } from '../../stores/mapStore';

const mapStore = useMapStore();
const { mapTitle, mapSubtitle, coordinatesText, location, layout, design } = storeToRefs(mapStore)
const config = useRuntimeConfig();

const mapContainer = ref<HTMLElement>()

const mapInstance = ref<any>(null)

const mapClasses = computed(() => {
  const classes = []
  if (layout.value) {
    switch (layout.value.shape) {
      case 'circle':
        classes.push('circle-layout')
        break
      case 'horizontal':
        classes.push('horizontal-layout')
        break
      case 'full-page':
        classes.push('full-page-layout')
        break
      default:
        classes.push('rectangle-layout')
    }
  } else {
    classes.push('rectangle-layout')
  }
  return classes
})

const showDetails = computed(() => {
  const layoutShape = mapStore.layout?.shape || 'rectangle';
  return layoutShape !== 'full-page';
});

const displayTitle = computed(() => {
  return mapTitle.value || location.value?.name
})

const displaySubtitle = computed(() => {
  return mapSubtitle.value || null
})

const coordinates = computed(() => {
  return coordinatesText.value
})

async function initializeMap() {
  if (!mapContainer.value || !window.mapboxgl) return;

  try {
    window.mapboxgl.accessToken = window.mapboxToken || config.public.mapboxToken;

    mapInstance.value = new window.mapboxgl.Map({
      container: mapContainer.value,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: location.value?.coords || [-0.1276, 51.5074],
      zoom: location.value?.zoom || 12,
      interactive: true
    })

    mapInstance.value.addControl(new window.mapboxgl.NavigationControl(), 'top-right')

  } catch (error) {
    console.error('Error initializing map:', error)
  }
}

watch(() => location, (newLocation) => {
  if (mapInstance.value && newLocation) {
    mapInstance.value.flyTo({
      center: newLocation.value?.coords,
      zoom: newLocation.value?.zoom || 12,
      duration: 1500
    })
  }
}, { deep: true })

watch(() => design, (newDesign) => {
  if (mapInstance.value && newDesign.value?.mapboxStyle) {
    mapInstance.value.setStyle(newDesign.value?.mapboxStyle)
    console.log('Map style changed to:', newDesign.value?.name, newDesign.value?.mapboxStyle)
  }
}, { deep: true })

watch(layout, () => {
  nextTick(() => {
    setTimeout(() => {
      if (mapInstance.value) {
        mapInstance.value.resize()
      }
    }, 300)
  })
})

onMounted(() => {
  initializeMap()
})
</script>

<style scoped>
#interactiveMap {
  width: 100%;
  height: 100%;
  background: #FFFAFA;
  border: none;
  box-shadow: none;
  position: relative;
}

#interactiveMap.circle-layout {
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  width: 83%;
  height: auto;
  object-fit: cover;
  margin: 10%;
}
</style>
