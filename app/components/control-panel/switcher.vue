<script setup lang="ts">
const props = defineProps<{
  tabs: [string, string];
}>();

const emmit = defineEmits<{
    (e: 'tab-changes', tab: string): void;
}>();

const {isMobile} = useBreakpoints();

const activeTab = ref(props.tabs[0]);

function changeTab(tab: string): void {
    activeTab.value = tab;
    emmit('tab-changes', tab);
}
</script>

<template>
  <ul v-if="!isMobile" class="nav nav-tabs nav-tab-icons flex" id="type-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <div class="nav-link" :class="{ active: activeTab === props.tabs[0] }"
            @click="changeTab(props.tabs[0])" role="tab">
            <slot name="btn-tab-1">
                <img src="/images/icons/print.svg" alt="print">
                <div class="block mt-2">
                <p class="m-0 font-extrabold black">Create Print</p>
                <p class="m-0 sub-title">Capture moments</p>
                </div>
            </slot>
          </div>
        </li>
        <li class="nav-item" role="presentation">
          <div class="nav-link" :class="{ active: activeTab === props.tabs[1] }"
            @click="changeTab(props.tabs[1])" role="tab">
            <slot name="btn-tab-2">
                <img src="/images/icons/jewellery.svg" alt="jewellery">
                <div class="block mt-2">
                    <p class="m-0 font-extrabold black">Create Jewellery</p>
                    <p class="m-0 sub-title">Wearable memories</p>
                </div>
            </slot>
          </div>
        </li>
      </ul>

    <div class="tab-content" id="type-tab-content" :style="isMobile ? 'background-color: #FFFFFF !important' : ''">
        <div v-if="activeTab === props.tabs[0]" class="tab-pane fade show active w-full">
          <Transition name="step" mode="out-in">
            <slot name="content-tab-1"></slot>
          </Transition>
        </div>

        <div v-if="activeTab === props.tabs[1]" class="tab-pane fade w-full">
          <div class="text-center py-5">
            <Transition name="step" mode="out-in">
                <slot name="content-tab-2"></slot>
            </Transition>
          </div>
        </div>
    </div>
</template>

<style scoped>

</style>