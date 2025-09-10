<template>
  <div id="locationContent">
    <div class="font-extrabold uppercase mb-3">Star map data</div>

    <div class="mb-[12px]">
      <Autocomplete :model-value="searchQuery"
                    static-text="Location"
                    placeholder="Search here..."
                    @location-selected="selectLocation($event)"/>
    </div>

    <div class="w-full flex flex-col lg:flex-row lg:items-stretch gap-3">
      <DatePicker class="w-full lg:flex-1" :model-value="date" @update:model-value="emit('date-selected', $event)"/>
      <TimePicker class="w-full lg:flex-1" :model-value="time" @update:model-value="emit('time-selected', $event)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Location} from '~/types';
import {Autocomplete} from "~/components/ui/autocolplete";
import {DatePicker} from "~/components/ui/date-picker";
import {TimePicker} from "~/components/ui/time-picker";

const props = defineProps<{
  location: Location | null;
  date?: Date;
  time?: string;
}>();

const emit = defineEmits<{
  (e: 'location-selected', location: Location): void;
  (e: 'date-selected', date: Date): void;
  (e: 'time-selected', time: string): void;
}>()

const searchQuery = ref('');
const showResults = ref(false);

const selectLocation = (location: Location) => {
  showResults.value = false;
  emit('location-selected', location);
}

watch(() => props.location, (newLocation) => {
  if (newLocation) {
    searchQuery.value = newLocation.name;
  }
});

if (props.location) {
  searchQuery.value = props.location.name;
}
</script>

<style scoped>

</style>
