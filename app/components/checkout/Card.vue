<script setup lang="ts">
import CardRemoveEdit from '~/components/checkout/CardRemoveEdit.vue';

const props = defineProps<{
  title: string;
  location: string;
  date: string;
  printSize: string;
  price: string;
}>();
const emmit = defineEmits<{
  (e: 'edit'): void;
  (e: 'remove'): void;
}>();
const {isMobile} = useBreakpoints();
</script>

<template>
  <div class="mb-2 md:mb-0 bg-white rounded-lg shadow p-4 sm:p-6 flex flex-col md:flex-row gap-6">
    <!--  Left side  -->
    <div class="md:w-1/2 flex justify-center">
      <img src="https://i.ibb.co/3N5dhz3/starmap.png" alt="map" class="rounded-lg shadow-lg max-h-[450px] w-auto">
    </div>

    <!--  Right side  -->
    <div class="md:w-1/2 flex flex-col justify-between">
      <!-- Main content -->
      <div class="space-y-4">
        <!--    Main content Title    -->
        <div class="flex">
          <h2 class="font-semibold mr-2">{{ props.title }}</h2>
          <CardRemoveEdit v-if="!isMobile"
                          @edit="emmit('edit')"
                          @remove="emmit('remove')"
          />
        </div>
        <div v-if="isMobile" class="flex flex-col">
          <span class="text-sm text-gray-600">{{props.location}}</span>
          <span class="text-sm text-gray-600">{{props.date}}</span>
          <span class="text-sm text-gray-600">{{props.printSize}}</span>
          <div class="flex justify-between">
            <CardRemoveEdit @edit="emmit('edit')"
                            @remove="emmit('remove')"
            />
            <p class="font-semibold mt-1">{{props.price}}</p>
          </div>
        </div>
        <div v-else class="flex flex-col">
          <span class="text-sm text-gray-600">{{props.location}}, {{props.date}}</span>
          <div class="flex justify-between">
            <p class="text-sm text-gray-600">{{props.printSize}}</p>
            <p class="font-semibold mt-1">{{props.price}}</p>
          </div>
        </div>
      </div>

      <!-- Recommended extras -->
      <div v-if="!isMobile">
        <slot name="extras"/>
      </div>
    </div>
  </div>

  <!-- Recommended extras -->
  <div v-if="isMobile">
    <div class="bg-white rounded-lg shadow p-4 sm:p-6 flex flex-col gap-6">
      <slot name="extras"/>
    </div>
  </div>
</template>

<style scoped>

</style>