<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="p-7">
        <p class="uppercase tracking-wider font-extrabold">{{ props.title }}</p>
        <p class="text-[#787878] leading-6">
          {{ props.description }}
        </p>
      </div>
</template>

<style scoped>

</style>