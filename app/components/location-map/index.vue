<script setup lang="ts">
import { computed } from 'vue';
import { useLocationMapStore } from '~/stores';
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
  showDetails: true,
});

const locationMapStore = useLocationMapStore();
const { frame, hasRibbon } = storeToRefs(locationMapStore);

const icons = ref<FeatureItem[]>([
  {icon: 'water-drop', label: 'Ultra Hd Print'},
  {icon: 'lifetime', label: 'Lifetime Warranty'},
  {icon: 'feather', label: 'Gicelle Art Prints'},
]);

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
  <div class="map-preview-section flex-col grow md:h-screen flex items-center p-[27px] md:pt-[27px] md:pb-[27px] pt-[190px] pb-[90px]">
    <ProductFrameHighlights :items="icons"/>
    <LocationMapInteractive/>
    <div v-if="frame" class="map-border" :class="borderClasses"></div>
  </div>
</template>

<style scoped>
.map-preview-section {
  background-image: url('/images/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>