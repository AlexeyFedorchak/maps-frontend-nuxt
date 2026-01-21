<script setup lang="ts">
import { CONTROL_PANEL_TAB, type ControlPanelTab, useControlPanelStore } from '~/stores';

const controlPanelStore = useControlPanelStore();

function clickOnTab(tab: ControlPanelTab) {
  controlPanelStore.setActiveTab(tab);
}
</script>

<template>
  <div class="md:hidden">
    <div class="w-2xs relative inline-flex bg-white rounded-full p-1">
      <button
          class="tab w-1/2 flex items-center relative z-1 px-4 py-1 font-bold"
          :class="{ active: controlPanelStore.activeTab === CONTROL_PANEL_TAB.TAB_1 }"
          data-index="0"
          @click="clickOnTab(CONTROL_PANEL_TAB.TAB_1)"
      >
        <NuxtImg class="w-9" src="/images/icons/print.svg" alt="print" />
        <span>PRINT</span>
      </button>
      <button
          class="tab w-1/2 flex items-center relative z-1 px-4 py-1 font-bold"
          data-index="1"
          :class="{ active: controlPanelStore.activeTab === CONTROL_PANEL_TAB.TAB_2 }"
          @click="clickOnTab(CONTROL_PANEL_TAB.TAB_2)"
      >
        <NuxtImg src="/images/icons/jewellery.svg" alt="jewellery" />
        <span>JEWELLERY</span>
      </button>
      <span class="indicator absolute top-0 bottom-0 left-0 w-1/2 bg-[#E4E3DB] rounded-full transition-[left] duration-300"></span>
    </div>
  </div>
</template>

<style scoped>
.tab.active ~ .indicator {
  left: 0;
}

.tab[data-index="1"].active ~ .indicator {
  left: 50%;
}
</style>
