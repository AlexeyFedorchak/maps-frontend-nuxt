<script setup lang="ts">
import { type ControlPanelTab, useControlPanelStore } from '~/stores';

const emmit = defineEmits<{
  (e: 'tab-changes', tab: ControlPanelTab): void;
}>();

const controlPanelStore = useControlPanelStore();

function changeTab(tab: ControlPanelTab): void {
  controlPanelStore.setActiveTab(tab);
  emmit('tab-changes', tab);
}
</script>

<template>
  <ul class="hidden md:flex border-b border-[#D6D6D6] border-solid" role="tablist">
    <li class="flex-1" role="presentation">
      <div class="p-2 flex h-full rounded-tl-[20px] rounded-tr-[20px]"
           :class="{ 'bg-[#EFEFEF]': controlPanelStore.activeTab === controlPanelStore.tabs[0] }"
           @click="changeTab(controlPanelStore.tabs[0])" role="tab">
        <slot name="btn-tab-1">
          <img class="w-[clamp(20px,5vw,50px)] h-auto" src="/images/icons/print.svg" alt="print">
          <div class="mt-2">
            <p class="font-extrabold black">Create Print</p>
            <p class="text-[#818181]">Capture moments</p>
          </div>
        </slot>
      </div>
    </li>
    <li class="flex-1" role="presentation">
      <div class="p-2 flex h-full rounded-tl-[20px] rounded-tr-[20px]"
           :class="{ 'bg-[#EFEFEF]': controlPanelStore.activeTab === controlPanelStore.tabs[1] }"
           @click="changeTab(controlPanelStore.tabs[1])" role="tab">
        <slot name="btn-tab-2">
          <img class="w-[clamp(20px,5vw,50px)] h-auto" src="/images/icons/jewellery.svg" alt="jewellery">
          <div class="mt-2">
            <p class="font-extrabold black">Create Jewellery</p>
            <p class="text-[#818181]">Wearable memories</p>
          </div>
        </slot>
      </div>
    </li>
  </ul>

  <div class="flex justify-center items-center bg-[#fff] min-h-[33.813rem] px-6">
    <div v-if="controlPanelStore.activeTab === controlPanelStore.tabs[0]" class="fade show active w-full">
      <slot name="content-tab-1"></slot>
    </div>

    <div v-if="controlPanelStore.activeTab === controlPanelStore.tabs[1]" class="fade w-full">
      <div class="text-center py-5">
        <slot name="content-tab-2"></slot>
      </div>
    </div>
  </div>
</template>