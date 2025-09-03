<script setup lang="ts">
import { type StepperStep } from '~/composables/useStepper';

const props = defineProps<{
  panelInfo: {
    title: string;
    description: string;
  };
  panelSwitcher: {
    tabs: [string, string];
  };
  stepper: {
    steps: StepperStep[];
  };
  panelPrice: {
    totalPrice: string;
    installmentPrice: string;
  };
}>();
const { isMobile } = useBreakpoints()
</script>

<template>
  <BaseControlPanelContainer
      :stepper="{ steps: props.stepper.steps }"
  >
    <template #content="contentProps">
      <BaseControlPanelInfo
          :title="props.panelInfo.title"
          :description="props.panelInfo.description"
      />
      <BaseControlPanelSwitcher
          :is-hide-buttons="isMobile"
          :tabs="props.panelSwitcher.tabs">
        <template #content-tab-1>
          <slot name="panel-switcher-tab-1" :stepper="contentProps.stepper" />
        </template>
        <template #content-tab-2>
          <slot name="panel-switcher-tab-2" :stepper="contentProps.stepper" />
        </template>
      </BaseControlPanelSwitcher>

      <BaseControlPanelPrice
          class="p-7"
          :totalPrice="props.panelPrice.totalPrice"
          :installmentPrice="props.panelPrice.installmentPrice"
      />

      <!-- TODO: split this html to small reusable components -->
<!--      <div class="container-info">-->
<!--        &lt;!&ndash; Desktop navigation &ndash;&gt;-->
<!--        <div class="navigation">-->
<!--          <button-->
<!--              class="btn-nav btn-back"-->
<!--              :disabled="!canGoToPreviousStep"-->
<!--              @click="handleGoBack"-->
<!--              v-if="stepper.getCurrentStep.value?.name !== step.design"-->
<!--          >-->
<!--            Back-->
<!--          </button>-->
<!--          <button-->
<!--              class="btn-nav btn-continue"-->
<!--              :disabled="!canProceedToNextStep"-->
<!--              @click="handleContinue"-->
<!--          >-->
<!--            {{ continueButtonText }}-->
<!--          </button>-->
<!--        </div>-->

<!--        &lt;!&ndash; Desktop Trustpilot &ndash;&gt;-->
<!--        <div class="trustpilot-section">-->
<!--          <img class="mr-3" src="/images/icons/5stars.svg" alt="Trustpilot 5 stars">-->
<!--          <span class="mr-3">Excellent</span>-->
<!--          <span class="mr-3">4.9 out of 5</span>-->
<!--          <img class="mb-1" src="/images/icons/trustpilot.svg" alt="Trustpilot">-->
<!--        </div>-->
<!--      </div>-->

      <!-- mobile only - bottom section -->
<!--      <div class="mobile-bottom-section">-->
<!--        &lt;!&ndash; First step (design) has gray background section &ndash;&gt;-->
<!--        <div v-if="getCurrentStep?.name === step.design" class="mobile-gray-section">-->
<!--          <div class="mobile-price-info">-->
<!--            <p class="price-line">-->
<!--              <span class="price-title">Total £{{ totalPrice }}</span>-->
<!--              <span class="price-subtitle">Free Shipping included</span>-->
<!--            </p>-->
<!--            <p class="payment-line">-->
<!--              or Pay in 3 interest free payments for £{{ installmentPrice }}-->
<!--              <img src="/images/icons/info.svg" alt="info" class="info-icon">-->
<!--            </p>-->
<!--          </div>-->

<!--          &lt;!&ndash; Product features on white background &ndash;&gt;-->
<!--          <div class="mobile-product-features">-->
<!--            <div class="feature-item">-->
<!--              <span class="feature-icon">∞</span>-->
<!--              <span>Lifetime Warranty</span>-->
<!--            </div>-->
<!--            <div class="feature-item">-->
<!--              <span class="feature-icon">↗</span>-->
<!--              <span>Ultra HD Prints</span>-->
<!--            </div>-->
<!--            <div class="feature-item">-->
<!--              <span class="feature-icon">↗</span>-->
<!--              <span>Milky Way +</span>-->
<!--            </div>-->
<!--          </div>-->

<!--          <button-->
<!--              class="btn-nav btn-continue mobile-continue"-->
<!--              :disabled="!canProceedToNextStep"-->
<!--              @click="handleContinue"-->
<!--          >-->
<!--            CHOOSE LOCATION-->
<!--          </button>-->

<!--          <div class="trustpilot-section mobile-trustpilot">-->
<!--            <img src="/images/icons/5stars.svg" alt="5 stars">-->
<!--            <span>Excellent</span>-->
<!--            <span>4.9 out of 5</span>-->
<!--            <img src="/images/icons/trustpilot.svg" alt="Trustpilot">-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Second and third steps (location, choose) &ndash;&gt;-->
<!--        <div v-else class="mobile-white-section">-->
<!--          <button-->
<!--              class="btn-nav btn-continue mobile-continue"-->
<!--              :disabled="!canProceedToNextStep"-->
<!--              @click="handleContinue"-->
<!--          >-->
<!--            CONTINUE-->
<!--          </button>-->

<!--          <div class="trustpilot-section mobile-trustpilot">-->
<!--            <img src="/images/icons/5stars.svg" alt="5 stars">-->
<!--            <span>Excellent</span>-->
<!--            <span>4.9 out of 5</span>-->
<!--            <img src="/images/icons/trustpilot.svg" alt="Trustpilot">-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Free shipping bar only for location and choose steps &ndash;&gt;-->
<!--        <div v-if="getCurrentStep?.name !== step.design" class="free-shipping-bar">-->
<!--          FREE SHIPPING (1-2 DAY)-->
<!--        </div>-->
<!--      </div>-->
    </template>
  </BaseControlPanelContainer>
</template>

<style scoped>

</style>