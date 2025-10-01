<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { useLocationMapStore } from '~/stores';
import { MAP_ELEMENT_IDS } from '~/constants/mapTypes';
import { useMapTilerVector } from '~/composables/useMapTilerVector';

const locationMapStore = useLocationMapStore();
const { font, frame, getLayoutName, layout, location, hasRibbon, mapTitle, mapMessageLine1, mapMessageLine2, mapSubtitle, theme, getCoordinatesText } = storeToRefs(locationMapStore);
const config = useRuntimeConfig();

const mapContainer = ref<HTMLElement>();

// Mapbox implementation (commented out, keeping for reference)
// const mapInstance = ref<any>(null);

// MapTiler implementation with vector tiles
const {
  map: mapTilerInstance,
  isLoading,
  error,
  initializeMap: initializeMapTiler,
  updateLocation: updateMapTilerLocation,
  updateDesign: updateMapTilerDesign,
  resize: resizeMapTiler
} = useMapTilerVector({
  container: mapContainer,
  initialLocation: location.value,
  initialDesign: theme.value,
  showControls: true,
  interactive: true
});

const showDetails = computed(() => {
  const layoutShape = layout.value?.shape || 'rectangle';
  return layoutShape !== 'full-page';
});

// Mapbox implementation (commented out, keeping for reference)
// async function initializeMap() {
//   if (!mapContainer.value || !window.mapboxgl) return;
//
//   try {
//     window.mapboxgl.accessToken = window.mapboxToken || config.public.mapboxToken;
//
//     mapInstance.value = new window.mapboxgl.Map({
//       container: mapContainer.value,
//       style: theme.value?.mapboxStyle || 'mapbox://styles/mapbox/streets-v11',
//       center: location.value?.coords || [-0.1276, 51.5074],
//       zoom: location.value?.zoom || 12,
//       interactive: true,
//       preserveDrawingBuffer: true,
//     });
//
//     mapInstance.value.addControl(new window.mapboxgl.NavigationControl(), 'top-right');
//
//   } catch (error) {
//     console.error('Error initializing map:', error);
//   }
// }

// Mapbox watchers (commented out, keeping for reference)
// watch(() => location, (newLocation) => {
//   if (mapInstance.value && newLocation) {
//     mapInstance.value.flyTo({
//       center: newLocation.value?.coords,
//       zoom: newLocation.value?.zoom || 12,
//       duration: 1500
//     })
//   }
// }, { deep: true });

// MapTiler watchers
watch(() => location.value, (newLocation) => {
  if (mapTilerInstance.value && newLocation) {
    updateMapTilerLocation(newLocation);
  }
}, { deep: true });

// Watch for errors
watch(error, (newError) => {
  if (newError) {
    console.error('Map error:', newError);
  }
});

// Mapbox theme watcher (commented out, keeping for reference)
// watch(() => theme, (newTheme) => {
//   if (mapInstance.value && newTheme.value?.mapboxStyle) {
//     mapInstance.value.setStyle(newTheme.value?.mapboxStyle)
//     console.log('Map style changed to:', newTheme.value?.name, newTheme.value?.mapboxStyle)
//   }
// }, { deep: true });

watch(() => theme.value, (newTheme) => {
  if (mapTilerInstance.value && newTheme) {
    updateMapTilerDesign(newTheme);
    console.log('Map style changed to:', newTheme?.name);
  }
}, { deep: true });

// Mapbox layout watcher (commented out, keeping for reference)
// watch(layout, () => {
//   nextTick(() => {
//     mapInstance.value.resize();
//   });
// });

watch(layout, () => {
  nextTick(() => {
    resizeMapTiler();
  });
});

watch(theme, (newTheme) => {
  if (newTheme && mapTilerInstance.value) {
    console.log('Theme changed to:', newTheme.name);
    updateMapTilerDesign(newTheme);
  }
});

watch(location, (newLocation) => {
  if (newLocation && mapTilerInstance.value) {
    console.log('Location changed to:', newLocation.name);
    updateMapTilerLocation(newLocation);
  }
});

// Mapbox mount (commented out, keeping for reference)
// onMounted(() => {
//   initializeMap()
// });


</script>

<template>
  <ProductFrameContainer :shape="layout?.shape || 'rectangle'"
                         :frame="frame"
                         :font="font"
                         :location="location.name || ''"
                         :showDetails="showDetails || false"
                         :showDetailsBg="layout?.shape === 'horizontal'"
                         :hasRibbon="hasRibbon || false"
                         :title="mapTitle || ''"
                         :subtitle="mapSubtitle || ''"
                         :customText="mapMessageLine1 || ''"
                         :customText2="mapMessageLine2 || ''"
                         :coordinates="getCoordinatesText"
                         :border="true"
                         :bg="'#FFFFFF'"
                         :fg="'#000000'"
                         :id="MAP_ELEMENT_IDS.LOCATIONMAP_PREVIEW">
    <div ref="mapContainer"
         id="interactiveMap"
         :class="[getLayoutName]">
      <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]">
        Loading map...
      </div>
      <div v-if="error" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] text-red-500">
        {{ error }}
      </div>
    </div>
  </ProductFrameContainer>
</template>
