<script setup lang="ts">
import type {IconName} from "~/constants/icons";

const props = defineProps<{
  features: Array<{icon: IconName; text: string}>,
}>();
</script>

<template>
  <div class="md:hidden flex flex-nowrap justify-around items-center gap-1.5 bg-white rounded-[8px] shadow py-2 px-2.5 font-bold w-full">
    <div v-for="feature in props.features"
         class="flex text-center gap-1 font-semibold text-[#333]">
      <UiIcon :name="feature.icon" width="16px"/>
      <span>{{feature.text}}</span>
    </div>
  </div>
</template>
