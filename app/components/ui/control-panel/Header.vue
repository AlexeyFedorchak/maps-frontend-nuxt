<script setup lang="ts">
const props = defineProps<{
  logo: string;
  alt: string;
}>();
</script>

<template>
  <div class="py-5 px-7 bg-[#25282D] text-center border-b-1 border-[#eee] border-solid">
    <img :src="props.logo" :alt="props.alt">
  </div>
</template>
