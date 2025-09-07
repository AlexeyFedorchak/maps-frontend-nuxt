<template>
  <div id="locationContent" :style="isMobile ? 'background-color: #FFFFFF !important' : ''">
    <div class="section-title mb-3">Location map data</div>

    <div class="mb-[12px]">
      <Autocomplete :model-value="searchQuery"
                    static-text="Location"
                    placeholder="Search here..."
                    @location-selected="selectLocation($event)"/>
    </div>

    <div class="mb-[12px]">
      <Input :model-value="mapTitle"
             placeholder="Custom title"
             static-text="Title"
             @update:model-value="emit('update-map-title', ($event as string))"/>
    </div>

    <div>
      <Input :model-value="mapSubtitle"
             static-text="Sub Title"
             placeholder="Type here..."
             @update:model-value="emit('update-map-subtitle', ($event as string))"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Location} from '~/types'
import {Input} from "~/components/ui/input";
import {Autocomplete} from "~/components/ui/autocolplete";

const {isMobile} = useBreakpoints();

const props = defineProps<{
  location: Location | null;
  mapTitle: string | undefined;
  mapSubtitle: string | undefined;
}>();

const emit = defineEmits<{
  (e: 'location-selected', location: Location): void;
  (e: 'update-map-title', value: string | undefined): void;
  (e: 'update-map-subtitle', value: string | undefined): void;
}>()

const searchQuery = ref('');
const mapTitle = ref<string | undefined>('');
const mapSubtitle = ref<string | undefined>('');


function selectLocation(location: Location) {
  mapTitle.value = location.name;
  emit('location-selected', location);
}

watch(() => props.location, (newLocation) => {
  if (newLocation) {
    searchQuery.value = newLocation.name;
    mapTitle.value = newLocation.name;
  }
});

watch(() => props.mapTitle, (newTitle) => {
  mapTitle.value = newTitle;
});

watch(() => props.mapSubtitle, (newSubtitle) => {
  mapSubtitle.value = newSubtitle;
});

if (props.location) {
  searchQuery.value = props.location.name;
}

mapTitle.value = props.mapTitle;
mapSubtitle.value = props.mapSubtitle;
</script>

<style scoped>

</style>
