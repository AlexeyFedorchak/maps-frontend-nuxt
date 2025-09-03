<script setup lang="ts">
import { type StepperStep, useStepper } from '~/composables/useStepper';
const props = defineProps<{
  stepper: {
    steps: StepperStep[];
  };
}>();
const stepper = useStepper();
stepper.setSteps(props.stepper.steps);

</script>
<template>
  <div class="controls-section">
    <slot name="header">
      <BaseControlPanelHeader logo="/images/logo.svg" alt="Logo"/>
    </slot>
    <div class="content-area">
      <slot name="content" :stepper="stepper" />
    </div>
  </div>
</template>
