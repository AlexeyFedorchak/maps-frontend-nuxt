<script setup lang="ts">
import { NavigationDirection, type Stepper } from '~/composables/useStepper';
import { CONTROL_PANEL_STEPPER } from '~/components/shared/control-panel/constants';

/**
 * This component required define provide(CONTROL_PANEL_STEPPER, useStepper(configuration)); in parent component.
 * */
const props = defineProps<{
  // This section display title and description on the top of panel
  panelInfo?: {
    title: string;
    description: string;
  };
  panelPrice?: {
    totalPrice?: string;
    installmentPrice?: string;
    features?: Array<{icon: string; text: string}>;
  };
}>();

const emmit = defineEmits<{
  (e: 'tab-changes', tab: string): void;
}>();

const stepper = inject<Stepper>(CONTROL_PANEL_STEPPER)!;
if (!stepper) {
  throw new Error('[ControlPanel.vue] inject: Stepper is missing. Provide stepper in parent component like: provide(CONTROL_PANEL_STEPPER, useStepper(configuration)));');
}

const defaultFeatures = [
  { text: 'Lifetime Warranty', icon: 'lifetime'},
  { text: 'Ultra HD Prints', icon: 'hd'},
  { text: 'Milky Way +', icon: 'stars'},
];

const defaultPanelInfo = {
  title: 'Custom Location Map',
  description: 'Your special chosen place, captured in the finest detail. High quality archival grade paper. Giclee print to last a lifetime.',
};

const getFeatures = computed(() => {
  return props?.panelPrice?.features || defaultFeatures;
});

const getPanelInfo = computed(() => {
  return props?.panelInfo || defaultPanelInfo;
});

function changeStep(direction: NavigationDirection) {
  if (direction === NavigationDirection.forward) {
    stepper.nextStep();
  } else {
    stepper.prevStep();
  }
}

function tabChanges(tab: string): void {
  emmit('tab-changes', tab);
}
</script>

<template>
  <UiControlPanelContainer>
    <template #content>
      <UiControlPanelInfo
          :title="getPanelInfo.title"
          :description="getPanelInfo.description"
      />
      <UiControlPanelSwitcher
          @tab-changes="tabChanges($event)"
      >
        <template #content-tab-1>
          <slot name="panel-switcher-tab-1" />
        </template>
        <template #content-tab-2>
          <slot name="panel-switcher-tab-2" />
        </template>
      </UiControlPanelSwitcher>
      <div class="p-7">
        <slot name="price-info">
          <UiControlPanelPrice
              v-if="props?.panelPrice?.totalPrice && props?.panelPrice?.installmentPrice"
              class="mb-4"
              :totalPrice="props.panelPrice.totalPrice"
              :installmentPrice="props.panelPrice.installmentPrice"
          />

          <MobileProductFeatures
              class="mb-4"
              :features="getFeatures"
          />
        </slot>

        <slot name="bottom-buttons">
          <div class="flex mb-4 justify-between gap-2">
            <UiButton
                v-for="button of stepper?.getCurrentStep?.value?.buttons"
                class="uppercase min-h-[3.438rem] md:min-h-[4.25rem]"
                size="lg"
                @click="changeStep(button.direction)"
                :class="button.className"
                :disabled="button.isDisabled"
            >
              {{ button.name }}
            </UiButton>
          </div>
        </slot>
      </div>

      <slot name="footer">

      </slot>
    </template>
  </UiControlPanelContainer>
</template>

<style scoped>

</style>
