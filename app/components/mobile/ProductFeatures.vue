<script setup lang="ts">
const props = defineProps<{
  features: Array<{icon: string; text: string}>,
}>();
</script>

<template>
  <div class="md:hidden flex flex-nowrap justify-around items-center gap-1.5 bg-white rounded-[8px] shadow py-2 px-2.5 font-bold text-sm w-full">
    <div v-for="feature in props.features"
         class="flex text-center gap-1 text-sm font-semibold text-[#333]">
      <NuxtImg :src="feature.icon" />
      <span>{{feature.text}}</span>
    </div>
  </div>
</template>
