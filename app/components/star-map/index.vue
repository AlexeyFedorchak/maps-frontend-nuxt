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
  features,
  hasRibbon,
  getMapTitle,
  getCoordinatesText,
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
  { icon: 'lifetime', label: 'Lifetime Warranty' },
  { icon: 'hd', label: 'Ultra Hd Print' },
  { icon: 'stars', label: 'Milky Way+' },
]);

const observer = computed(function () {
  const [lon, lat] = location.value?.coords ?? [0, 0];
  return { lat, lon };
});

const phi = computed(function () {
  return -observer.value.lat * Math.PI / 180;
});
const lambda = computed(function () {
  return -observer.value.lon * Math.PI / 180;
});
const zoom = ref(0.5);

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
  const { $celestial } = useNuxtApp();
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

  Celestial.clear();
  Celestial.display(cfg);

  const dt = buildDate(mapDate.value, mapTime.value);
  Celestial.date(dt);
  Celestial.redraw?.();
}

watch(function () { return features.value[0]?.isSelected; }, function () {
  renderCelestial();
});

watch(function () { return features.value[4]?.isSelected; }, function () {
  renderCelestial();
});

watch(location, function () {
  renderCelestial();
}, { deep: true });

watch([mapDate, mapTime], function () {
  const el = document.getElementById('starmap-canvas') as HTMLElement | null;
  const { $celestial } = useNuxtApp();
  const Celestial = $celestial || (window as any).Celestial;
  if (!el || !Celestial) return;
  const dt = buildDate(mapDate.value, mapTime.value);
  Celestial.date(dt);
  Celestial.redraw?.();
});

onMounted(function () {
  renderCelestial();
});
</script>

<template>
  <div class="map-preview-section flex-col grow h-screen flex items-center p-[27px]">
    <ProductFrameHighlights :items="icons" />
    <ProductFrameContainer
        shape="circle"
        :bg="bgColor"
        :fg="fgColor"
        :frame="frame"
        :has-ribbon="hasRibbon"
        :border="isShowBorder"
        :showDetails="showDetails || false"
        :title="getMapTitle || ''"
        :subtitle="mapSubtitle || ''"
        :customText="'The night our adventure started'"
        :coordinates="getCoordinatesText"
    >
      <div class="star-map-preview w-[74%] aspect-square absolute z-1 top-[8.5%] left-[50%]">
        <StarMapBackground
            :class="{ 'scaled-bg': isShowCoordinates }"
            :image-url="imageUrl"
            :phi="phi"
            :lambda="lambda"
            :zoom="zoom"
            :auto-resize="true"
        />
        <div id="starmap-canvas" :class="{ 'coordinates-map': isShowCoordinates }"></div>
        <NuxtImg v-if="isShowCoordinates" :src="svgDataUrl" class="absolute top-0 left-0 scale-[1.1]" />
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