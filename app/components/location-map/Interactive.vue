<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { useLocationMapStore } from '~/stores';

const locationMapStore = useLocationMapStore();
const { getLayoutName, layout, location, getMapTitle, getCoordinatesText, mapSubtitle, design } = storeToRefs(locationMapStore);
const config = useRuntimeConfig();

const mapContainer = ref<HTMLElement>()

const mapInstance = ref<any>(null)

const showDetails = computed(() => {
  const layoutShape = layout.value?.shape || 'rectangle';
  return layoutShape !== 'full-page';
});

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

<template>
  <ProductFrameContainer :shape="layout?.shape || 'rectangle'"
                         :showDetails="showDetails || false"
                         :title="getMapTitle || ''"
                         :subtitle="mapSubtitle || ''"
                         :coordinates="getCoordinatesText" >
    <div ref="mapContainer"
         id="interactiveMap"
         :class="[getLayoutName]">
    </div>
  </ProductFrameContainer>
</template>

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
