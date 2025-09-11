<script setup lang="ts">
import { NavigationDirection, useStepper } from '~/composables/useStepper';
import { useStarMapStore } from '~/stores/starMapStore';
import { CONTROL_PANEL_STEPPER } from '~/components/shared/control-panel/constants';

const starMapStore = useStarMapStore();
const step = {
  location: 'location',
  design: 'design',
  message: 'message',
  choose: 'choose',
};
const stepper = useStepper([
  {
    name: step.design,
    buttons: [
      {
        name: 'Choose Location',
        isDisabled: ref(false),
        direction: NavigationDirection.forward,
        className: 'w-full',
      }
    ],
  },
  {
    name: step.location,
    buttons: [
      {
        name: 'back',
        isDisabled: ref(false),
        direction: NavigationDirection.backward,
        className: 'w-[34%] bg-[#A5A5A5]',
      },
      {
        name: 'CONTINUE',
        isDisabled: ref(false),
        direction: NavigationDirection.forward,
        className: 'w-[64%]',
      },
    ],
  },
  {
    name: step.message,
    buttons: [
      {
        name: 'back',
        isDisabled: ref(false),
        direction: NavigationDirection.backward,
        className: 'w-[34%] bg-[#A5A5A5]',
      },
      {
        name: 'CONTINUE',
        isDisabled: ref(false),
        direction: NavigationDirection.forward,
        className: 'w-[64%]',
      },
    ],
  },
  {
    name: step.choose,
    buttons: [
      {
        name: 'back',
        isDisabled: ref(false),
        direction: NavigationDirection.backward,
        className: 'w-[34%] bg-[#A5A5A5]',
      },
      {
        name: 'ADD TO BASKET',
        isDisabled: ref(false),
        direction: NavigationDirection.forward,
        className: 'w-[64%]',
      },
    ],
  },
]);
provide(CONTROL_PANEL_STEPPER, stepper);

const dynamicTotal = ref(21.99);

function handleTotalUpdate(newTotal: number): void {
  dynamicTotal.value = newTotal;
}

const totalPrice = computed(() => {
  return dynamicTotal.value.toFixed(2)
});

const installmentPrice = computed(() => {
  return (dynamicTotal.value / 3).toFixed(2)
});
</script>

<template>
  <SharedControlPanel
      :panel-price="{
      totalPrice: totalPrice,
      installmentPrice: installmentPrice,
    }"
  >
    <template #panel-switcher-tab-1>
      <Transition name="step" mode="out-in">
        <!-- Step: Design -->
        <StarMapStepDesign
            v-if="stepper.getCurrentStep.value?.name === step.design"
            key="design"
            :features="starMapStore.features"
            :theme="starMapStore.theme"
            @theme-selected="starMapStore.setTheme($event)"
            @feature-selected="starMapStore.setFeature($event)"
        />

        <!-- Step: Location -->
        <StarMapStepLocation
            v-else-if="stepper.getCurrentStep.value?.name === step.location"
            key="location"
            :location="starMapStore.location"
            :date="starMapStore.mapDate!"
            :time="starMapStore.mapTime!"
            @location-selected="starMapStore.setLocation($event)"
            @date-selected="starMapStore.setMapDate($event)"
            @time-selected="starMapStore.setMapTime($event)"
        />

        <!-- Step: Message -->
        <StarMapStepMessage
            v-else-if="stepper.getCurrentStep.value?.name === step.message"
            key="message"
            :line1="starMapStore.mapMessageLine1"
            :line2="starMapStore.mapMessageLine2"
            :font="starMapStore.font"
            :mapTitle="starMapStore.mapTitle"
            :location="starMapStore.location!"
            @update-line1="starMapStore.setMapMessageLine1($event)"
            @update-line2="starMapStore.setMapMessageLine2($event)"
            @update-font="starMapStore.setFont($event)"
            @update-title="starMapStore.setMapTitle($event)"
            @update-location-text="starMapStore.setLocationCustomText($event)"
            @update-lat="starMapStore.setLatitude($event)"
            @update-long="starMapStore.setLongitude($event)"
            @update-lat-hem="starMapStore.setLatHem($event)"
            @update-long-hem="starMapStore.setLonHem($event)"
        />

        <!-- Step: Choose -->
        <LocationMapStepChoose
            v-else-if="stepper.getCurrentStep.value?.name === step.choose"
            key="choose"
            @set-frame="starMapStore.setFrame($event)"
            @select-ribbon="starMapStore.setRibbon($event)"
            @total-updated="handleTotalUpdate"
        />
      </Transition>
    </template>

    <template #panel-switcher-tab-2>
      Jewellery options coming soon...
    </template>
  </SharedControlPanel>
</template>

<style scoped>
</style>
