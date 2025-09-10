<script setup lang="ts">
const emmit = defineEmits<{
  (e: 'edit'): void;
  (e: 'remove'): void;
}>();
</script>

<template>
  <div class="flex gap-2 items-center">
    <span class="text-sm text-blue-600 cursor-pointer" @click="emmit('edit')">EDIT</span> |
    <span class="text-sm text-gray-400 cursor-pointer"  @click="emmit('remove')">REMOVE</span>
  </div>
</template>
