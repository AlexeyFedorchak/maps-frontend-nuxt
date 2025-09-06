<script setup lang="ts"> import {ref, onMounted, computed} from 'vue';
import {useStarMapStore} from '~/stores';
import type {FeatureItem} from '~/components/product-frame/Highlights.vue';
import {COORDINATES} from '~/constants/star-map/coordinates';
import {CELESTIAL_DEFAULT_CONFIG} from "~/constants/star-map/celestial";

const starMapStore = useStarMapStore();
const {frame, theme, features, hasRibbon, getMapTitle, getCoordinatesText, mapSubtitle} = storeToRefs(starMapStore);
const bgColor = computed(() => features.value[3]?.isSelected ? theme.value?.bg : theme.value?.fg);
const fgColor = computed(() => features.value[3]?.isSelected ? theme.value?.fg : theme.value?.bg);
const svgDataUrl = computed<string>(() => {
  return "data:image/svg+xml;utf8," + encodeURIComponent(COORDINATES(fgColor.value!));
});
const imageUrl = computed(() => theme.value?.milkyLarge!);
const showDetails = computed(() => {
  return true;
});
const isShowCoordinates = computed(() => features.value[1]?.isSelected);
const isShowBorder = computed(() => features.value[2]?.isSelected);
const icons = ref<FeatureItem[]>([{icon: 'lifetime', label: 'Lifetime Warranty'}, {
  icon: 'hd',
  label: 'Ultra Hd Print'
}, {icon: 'stars', label: 'Milky Way+'},]);

const phi = -0.872699499130249;
const lambda = -2.132190227508545;
const zoom = 0.5;

const borderClasses = computed(() => {
  const classes = [];

  if (frame.value) {
    classes.push(frame.value.borderClass);
  }

  if (hasRibbon.value) {
    classes.push('gift-wrap-active');
  }

  return classes
});

const renderCelestial = () => {
  const el = document.getElementById('starmap-canvas') as HTMLElement | null;
  const {$celestial} = useNuxtApp();
  const Celestial = $celestial || (window as any).Celestial;
  if (!el || !Celestial) return;
  const [constellations, , , , gridMap] = features.value;
  const cfg = JSON.parse(JSON.stringify(CELESTIAL_DEFAULT_CONFIG));
  if (gridMap?.isSelected) cfg.lines.graticule.show = true;
  if (constellations?.isSelected) {
    cfg.constellations.show = true;
    cfg.constellations.lines = true;
  }
  Celestial.clear();
  Celestial.display(cfg);
}

watch(() => features.value[0]?.isSelected, () => {
  renderCelestial();
});

watch(() => features.value[4]?.isSelected, () => {
  renderCelestial();
});

onMounted(() => {
  renderCelestial();
});
</script>

<template>
  <div class="map-preview-section flex-col grow h-screen flex items-center p-[27px]">
    <ProductFrameHighlights :items="icons"/>
    <ProductFrameContainer shape="circle" :bg="bgColor" :fg="fgColor" :border="isShowBorder"
                           :showDetails="showDetails || false" :title="getMapTitle || ''" :subtitle="mapSubtitle || ''"
                           :customText="'The night our adventure started'" :coordinates="getCoordinatesText">
      <div class="star-map-preview w-[74%] aspect-square absolute z-1 top-[8.5%] left-[50%]">
        <StarMapBackground :class="{'scaled-bg': isShowCoordinates}" :image-url="imageUrl" :phi="phi" :lambda="lambda"
                           :zoom="zoom" :auto-resize="true"/>
        <div id="starmap-canvas" :class="{'coordinates-map': isShowCoordinates}"></div>
        <NuxtImg v-if="isShowCoordinates" :src="svgDataUrl" class="absolute top-0 left-0 scale-[1.1]"/>
      </div>
    </ProductFrameContainer>
    <div v-if="frame" class="map-border" :class="borderClasses"></div>
  </div>

</template>

<style>
#celestial-form {
  display: none !important;
}

#starmap-canvas {
  position: absolute;
  width: calc(100% + 4px) !important;
  height: calc(100% + 4px) !important;
  top: -4px;
  left: -4px;
  aspect-ratio: 1/1;
}

#starmap-canvas.coordinates-map {
  width: 95% !important;
  height: 95% !important;
  left: calc(2.5% - 2px);
  top: calc(2.5% + 1px);
}

#starmap-canvas canvas {
  width: 100%;
  height: 100%;
}

.scaled-bg {
  transform: scale(0.93) translate(-2px, 1px);
}

.star-map-preview {
  transform: translate(-50%, 0);
}
</style>