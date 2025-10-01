<script setup lang="ts">
const props = defineProps<{
  logo: string;
  alt: string;
}>();
</script>

<template>
  <div class="w-full py-5 bg-[#25282D] flex justify-center border-b-1 border-[#eee] border-solid">
    <img :src="props.logo" :alt="props.alt">
  </div>
</template>
