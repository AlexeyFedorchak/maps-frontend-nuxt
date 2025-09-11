<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useStarMapStore } from '~/stores';
import type { FeatureItem } from '~/components/product-frame/Highlights.vue';
import { COORDINATES } from '~/constants/star-map/coordinates';
import { CELESTIAL_DEFAULT_CONFIG } from '~/constants/star-map/celestial';

const starMapStore = useStarMapStore();
const {
  frame,
  theme,
  font,
  features,
  hasRibbon,
  mapTitle,
  getCoordinatesText,
  mapMessageLine1,
  mapMessageLine2,
  mapSubtitle,
  mapDate,
  mapTime,
  location,
} = storeToRefs(starMapStore);

const bgColor = computed(function () {
  return features.value[3]?.isSelected ? theme.value?.bg : theme.value?.fg;
});
const fgColor = computed(function () {
  return features.value[3]?.isSelected ? theme.value?.fg : theme.value?.bg;
});

const svgDataUrl = computed(function (): string {
  return "data:image/svg+xml;utf8," + encodeURIComponent(COORDINATES(fgColor.value!));
});
const imageUrl = computed(function () {
  return theme.value?.milkyLarge!;
});
const showDetails = computed(function () {
  return true;
});
const isShowCoordinates = computed(function () {
  return features.value[1]?.isSelected;
});
const isShowBorder = computed(function () {
  return features.value[2]?.isSelected;
});

const icons = ref<FeatureItem[]>([
  {icon: 'lifetime', label: 'Lifetime Warranty'},
  {icon: 'hd', label: 'Ultra Hd Print'},
  {icon: 'stars', label: 'Milky Way+'},
]);

const observer = computed(function () {
  const [lon, lat] = location.value?.coords ?? [0, 0];
  return {lat, lon};
});

const phi = computed(function () {
  return -observer.value.lat * Math.PI / 180;
});
const lambda = computed(function () {
  return -observer.value.lon * Math.PI / 180;
});
const zoom = ref(0.5);
const debouncedRender = useDebounceFn(renderCelestial, 1000);
const preview = ref<HTMLImageElement | null>(null);
const isCalculating = ref(true);

function buildDate(d?: Date, t?: string): Date {
  const date = d ? new Date(d) : new Date();
  let h = 0, m = 0;
  if (t && /^\d{2}:\d{2}$/.test(t)) {
    const [hh, mm] = t.split(':').map(n => parseInt(n, 10));
    h = Math.min(Math.max(hh || 0, 0), 23);
    m = Math.min(Math.max(mm || 0, 0), 59);
  }
  date.setHours(h, m, 0, 0);
  return date;
}

function renderCelestial() {
  const el = document.getElementById('starmap-canvas') as HTMLElement | null;
  const {$celestial} = useNuxtApp();
  const Celestial = $celestial || (window as any).Celestial;
  if (!el || !Celestial) return;

  const cfg = JSON.parse(JSON.stringify(CELESTIAL_DEFAULT_CONFIG));
  const [constellations, , , , gridMap] = features.value;
  if (gridMap?.isSelected) cfg.lines.graticule.show = true;
  if (constellations?.isSelected) {
    cfg.constellations.show = true;
    cfg.constellations.lines = true;
  }

  cfg.geopos = [observer.value.lat, observer.value.lon];
  cfg.follow = 'zenith';
  cfg.background.width = isShowCoordinates.value ? 1 : 700 * 2 / preview.value!.offsetWidth;

  Celestial.clear();
  Celestial.display(cfg);

  const dt = buildDate(mapDate.value, mapTime.value);
  Celestial.date(dt);
  Celestial.redraw?.();
  isCalculating.value = false;
}

watch(() => features.value[0]?.isSelected, () => {
  isCalculating.value = true;
  debouncedRender();
});

watch(() => features.value[4]?.isSelected, () => {
  isCalculating.value = true;
  debouncedRender();
});

watch(location, () => {
  isCalculating.value = true;
  debouncedRender();
}, {deep: true});

watch([mapDate, mapTime], () => {
  isCalculating.value = true;
  const el = document.getElementById('starmap-canvas') as HTMLElement | null;
  const {$celestial} = useNuxtApp();
  const Celestial = $celestial || (window as any).Celestial;
  if (!el || !Celestial) return;
  const dt = buildDate(mapDate.value, mapTime.value);
  Celestial.date(dt);
  Celestial.redraw?.();
  setTimeout(() => isCalculating.value = false, 1000); // small delay added to improve user experience
});

watch(isShowCoordinates, () => {
  isCalculating.value = true;
  debouncedRender();
});

useEventListener(window, 'resize', () => {
  debouncedRender();
});

onMounted(function () {
  debouncedRender();
});
</script>

<template>
  <div
      class="map-preview-section flex-col grow md:h-screen flex items-center p-[27px] md:pt-[27px] md:pb-[27px] pt-[190px] pb-[90px]">
    <ProductFrameHighlights :items="icons"/>
    <ProductFrameContainer
        shape="circle"
        :bg="bgColor"
        :fg="fgColor"
        :frame="frame"
        :font="font!"
        :has-ribbon="hasRibbon"
        :border="isShowBorder"
        :showDetails="showDetails || false"
        :title="mapTitle || ''"
        :location="location?.name || ''"
        :subtitle="mapSubtitle || ''"
        :customText="mapMessageLine1 || ''"
        :customText2="mapMessageLine2 || ''"
        :coordinates="getCoordinatesText">
      <div :style="{ visibility: isCalculating ? 'visible' : 'hidden' }"
           class="star-map-preview w-[84%] aspect-square absolute z-1 top-[8.5%] left-[50%]">
        <span :class="[`text-${fgColor}`, `border-[${fgColor}]`, 'border-2', 'text-[17px]', 'md:text-[28px]',
        'uppercase', 'tracking-[0.05em]', 'rounded-full', 'w-full', 'h-full', 'flex', 'items-center', 'justify-center']">
          Calculating...
        </span>
      </div>
      <div :style="{ visibility: !isCalculating ? 'visible' : 'hidden'}"
           ref="preview"
           class="star-map-preview w-[84%] aspect-square absolute z-1 top-[8.5%] left-[50%]">
        <StarMapBackground
            :class="{ 'scaled-bg': isShowCoordinates }"
            :image-url="imageUrl"
            :phi="phi"
            :lambda="lambda"
            :zoom="zoom"
            :auto-resize="true"/>
        <div id="starmap-canvas" :class="{ 'coordinates-map': isShowCoordinates }"></div>
        <NuxtImg v-if="isShowCoordinates" :src="svgDataUrl" class="absolute top-0 left-0 scale-[1.1] w-full"/>
      </div>
    </ProductFrameContainer>
  </div>
</template>

<style>
#celestial-form {
  display: none !important;
}

#starmap-canvas {
  position: absolute;
  width: calc(100% + 8px) !important;
  height: calc(100% + 8px) !important;
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

.map-preview-section {
  background-image: url('/images/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>