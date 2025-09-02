<script setup lang="ts">
import { useLocationMapStore, useMapStore } from '~/stores';
import { useStepper } from '~/composables/useStepper';
import { LOCATION_MAP_TAB } from '~/constants/location-map/tabs';

const locationMapStore = useLocationMapStore();
const { setSteps, getCurrentStep, prevStep, nextStep } = useStepper();
const { isMobile } = useBreakpoints()
const mapStore = useMapStore()
const {
  canProceedToNextStep,
  canGoToPreviousStep,
} = storeToRefs(mapStore);
const dynamicTotal = ref(21.99);
const step = {
  location: 'location',
  design: 'design',
  choose: 'choose',
};

 setSteps([
    { name: step.design },
    { name: step.location },
    { name: step.choose },
  ]);

function handleTotalUpdate(newTotal: number): void {
  dynamicTotal.value = newTotal;
}

// TODO: Refactor:
const continueButtonText = computed(() => {
  switch(getCurrentStep.value?.name) {
    case step.design:
      return 'Choose Location'
    case step.location:
      return 'Continue'
    case step.choose:
      return 'Add to Cart'
    default:
      return 'Continue'
  }
});

const totalPrice = computed(() => {
  return dynamicTotal.value.toFixed(2)
});

const installmentPrice = computed(() => {
  return (dynamicTotal.value / 3).toFixed(2)
})

function handleGoBack() {
  prevStep();
};

function handleContinue() {
  if (getCurrentStep.value?.name === step.choose) {
  } else {
    nextStep();
  }
}
</script>

<template>
  <ControlPanelContainer>
    <template #content>
      <ControlPanelInfo
        title="Custom Location Map"
        description="Your special chosen place, captured in the finest detail. High quality archival grade paper. Giclee print to last a lifetime."
      />
      <ControlPanelSwitcher
       :tabs="[LOCATION_MAP_TAB.print, LOCATION_MAP_TAB.jewellery]">
        <template #content-tab-1>
          <!-- TODO: implement switch steps -->
          <!-- Step: Location -->
          <LocationMapStepLocation 
            v-if="getCurrentStep?.name === step.location"
            key="location"
            :location="locationMapStore.location"
            :map-subtitle="locationMapStore.mapSubtitle"
            :map-title="locationMapStore.mapTitle" 
            @location-selected="locationMapStore.setLocation($event)"
            @update-map-title="locationMapStore.setMapTitle($event)"
            @update-map-subtitle="locationMapStore.setMapSubtitle($event)"
          />

          <!-- Step: Design -->
          <LocationMapStepDesign 
            v-else-if="getCurrentStep?.name === step.design"
            key="design"
            :layout="locationMapStore.layout"
            :design="locationMapStore.design"
            @layout-selected="locationMapStore.setLayout($event)" 
            @design-selected="locationMapStore.setDesign($event)"
          />

           <!-- Step: Choose -->
          <LocationMapStepChoose
            v-else-if="getCurrentStep?.name === step.choose" 
            key="choose"
            @layout-selected="locationMapStore.setLayout($event)"
            @color-scheme-selected="locationMapStore.setColorScheme($event)" 
            @total-updated="handleTotalUpdate" 
          />
        </template>
        <template #content-tab-2>
            Jewellery options coming soon...
        </template>
      </ControlPanelSwitcher>

      <!-- TODO: split this html to small reusable components -->
       <!-- Desktop price display -->
      <div v-if="!isMobile" class="container-info">
        <p class="black mb-1">
          <span class="price-title mr-2">Total £{{ totalPrice }}</span>
          Free Shipping
        </p>
        <p class="sub-title sub-title-spacing">
          <span class="mr-2">or Pay in 3 interest free payments for £{{ installmentPrice }}</span>
          <img class="mb-1" src="/images/icons/info.svg" alt="info">
        </p>

        <!-- Desktop navigation -->
        <div v-if="!isMobile" class="navigation">
          <button
            class="btn-nav btn-back"
            :disabled="!canGoToPreviousStep"
            @click="handleGoBack"
            v-if="getCurrentStep?.name !== step.design"
          >
            Back
          </button>
          <button
            class="btn-nav btn-continue"
            :disabled="!canProceedToNextStep"
            @click="handleContinue"
          >
            {{ continueButtonText }}
          </button>
        </div>

        <!-- Desktop Trustpilot -->
        <div v-if="!isMobile" class="trustpilot-section">
          <img class="mr-3" src="/images/icons/5stars.svg" alt="Trustpilot 5 stars">
          <span class="mr-3">Excellent</span>
          <span class="mr-3">4.9 out of 5</span>
          <img class="mb-1" src="/images/icons/trustpilot.svg" alt="Trustpilot">
        </div>
      </div>
      
      <!-- mobile only - bottom section -->
      <div v-else class="mobile-bottom-section">
        <!-- First step (design) has gray background section -->
        <div v-if="getCurrentStep?.name === step.design" class="mobile-gray-section">
          <div class="mobile-price-info">
            <p class="price-line">
              <span class="price-title">Total £{{ totalPrice }}</span>
              <span class="price-subtitle">Free Shipping included</span>
            </p>
            <p class="payment-line">
              or Pay in 3 interest free payments for £{{ installmentPrice }}
              <img src="/images/icons/info.svg" alt="info" class="info-icon">
            </p>
          </div>
          
          <!-- Product features on white background -->
          <div class="mobile-product-features">
            <div class="feature-item">
              <span class="feature-icon">∞</span>
              <span>Lifetime Warranty</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">↗</span>
              <span>Ultra HD Prints</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">↗</span>
              <span>Milky Way +</span>
            </div>
          </div>
          
          <button
            class="btn-nav btn-continue mobile-continue"
            :disabled="!canProceedToNextStep"
            @click="handleContinue"
          >
            CHOOSE LOCATION
          </button>
          
          <div class="trustpilot-section mobile-trustpilot">
            <img src="/images/icons/5stars.svg" alt="5 stars">
            <span>Excellent</span>
            <span>4.9 out of 5</span>
            <img src="/images/icons/trustpilot.svg" alt="Trustpilot">
          </div>
        </div>
        
        <!-- Second and third steps (location, choose) -->
        <div v-else class="mobile-white-section">
          <button
            class="btn-nav btn-continue mobile-continue"
            :disabled="!canProceedToNextStep"
            @click="handleContinue"
          >
            CONTINUE
          </button>
          
          <div class="trustpilot-section mobile-trustpilot">
            <img src="/images/icons/5stars.svg" alt="5 stars">
            <span>Excellent</span>
            <span>4.9 out of 5</span>
            <img src="/images/icons/trustpilot.svg" alt="Trustpilot">
          </div>
        </div>
        
        <!-- Free shipping bar only for location and choose steps -->
        <div v-if="getCurrentStep?.name !== step.design" class="free-shipping-bar">
          FREE SHIPPING (1-2 DAY)
        </div>
      </div>
    </template>
  </ControlPanelContainer>
</template>

<style scoped>
.step-enter-active,
.step-leave-active {
  transition: all 0.3s ease;
}

.step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.text-center {
  text-align: center;
}

.py-5 {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

.m-0 {
  margin: 0;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.block {
  display: block;
}

.flex {
  display: flex;
}

.uppercase {
  text-transform: uppercase;
}

.mobile-product-features {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  background-color: #F7F7F7;
  border-radius: 8px;
  box-shadow: 0 2px 8px 2px #E4E3DB;
  padding: 8px 10px;
  margin: 12px 0 16px;
  font-weight: 700;
  font-size: 11px;
  width: 100%;
  flex-wrap: nowrap;
}

.mobile-product-features .flex-c {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.mobile-product-features .icons {
  display: inline-block;
  background-color: #E4E3DB;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
  flex-shrink: 0;
}

.mobile-product-features .icons.water-drop {
  background-image: url("/images/water-drop.svg");
}

.mobile-product-features .icons.feather {
  background-image: url("/images/feather.svg");
}

.mobile-product-features .icons.lifetime {
  background-image: url("/images/lifetime.svg");
}

.mobile-product-features span {
  font-size: 9px;
  color: #000;
  white-space: nowrap;
}

.mobile-product-features img {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
}

/* mobile specific styles */
@media (max-width: 768px) {
  .controls-section {
    padding-bottom: 0px;
    background-color: #FFFFFF !important;
  }

  .controls-section .content-area {
    padding: 0px;
    padding-bottom: 0;
    background-color: #FFFFFF !important;
  }

  .container-info {
    margin: 12px 16px;
  }

  .product-title {
    margin-top: 8px;
  }

  .controls-section .tab-content {
    min-height: auto;
    padding: 16px 16px 8px;
    background-color: #FFFFFF !important;
  }

  .controls-section .tab-pane,
  .controls-section .w-full {
    background-color: #FFFFFF !important;
  }

  .mobile-bottom-section {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .mobile-gray-section {
    background: #F7F7F7;
    padding: 16px;
  }

  .mobile-price-info {
    margin-bottom: 16px;
  }

  .price-line {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
    display: flex;
    align-items: baseline;
    gap: 12px;
  }

  .price-title {
    font-size: 24px;
    font-weight: 700;
    color: #000;
  }

  .price-subtitle {
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }

  .payment-line {
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .info-icon {
    width: 14px;
    height: 14px;
  }

  .mobile-product-features {
    background: #FFFFFF;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 8px;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    color: #333;
  }

  .feature-icon {
    font-size: 14px;
  }

  /* Second/third steps white section */
  .mobile-white-section {
    background: #FFFFFF;
    padding: 16px;
  }

  .mobile-continue {
    width: 100%;
    height: 50px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.8px;
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  .mobile-trustpilot {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #333;
  }

  .mobile-trustpilot img {
    height: 14px;
    width: auto;
  }

  .free-shipping-bar {
    background: #F7F7F7;
    color: #808080;
    text-align: center;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin: 0;
  }

  .navigation {
    display: none;
  }

  .trustpilot-section:not(.mobile-trustpilot) {
    display: none;
  }
}

@media (max-width: 480px) {
  .mobile-product-features {
    gap: 4px;
    padding: 6px 8px;
    font-size: 10px;
  }

  .mobile-product-features .icons {
    width: 16px;
    height: 16px;
  }

  .mobile-product-features span {
    font-size: 8px;
  }

  .mobile-product-features img {
    width: 8px;
    height: 8px;
  }

  /* TODO: we need rewrite all css code below to tailwind css */
  .step-enter-active,
.step-leave-active {
  transition: all 0.3s ease;
}

.step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.text-center {
  text-align: center;
}

.py-5 {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

.m-0 {
  margin: 0;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.block {
  display: block;
}

.flex {
  display: flex;
}

.uppercase {
  text-transform: uppercase;
}

.mobile-product-features {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  background-color: #F7F7F7;
  border-radius: 8px;
  box-shadow: 0 2px 8px 2px #E4E3DB;
  padding: 8px 10px;
  margin: 12px 0 16px;
  font-weight: 700;
  font-size: 11px;
  width: 100%;
  flex-wrap: nowrap;
}

.mobile-product-features .flex-c {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.mobile-product-features .icons {
  display: inline-block;
  background-color: #E4E3DB;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
  flex-shrink: 0;
}

.mobile-product-features .icons.water-drop {
  background-image: url("/images/water-drop.svg");
}

.mobile-product-features .icons.feather {
  background-image: url("/images/feather.svg");
}

.mobile-product-features .icons.lifetime {
  background-image: url("/images/lifetime.svg");
}

.mobile-product-features span {
  font-size: 9px;
  color: #000;
  white-space: nowrap;
}

.mobile-product-features img {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
}

/* mobile specific styles */
@media (max-width: 768px) {
  .controls-section {
    padding-bottom: 0px;
    background-color: #FFFFFF !important;
  }
  
  .controls-section .content-area {
    padding: 0px;
    padding-bottom: 0;
    background-color: #FFFFFF !important;
  }
  
  .container-info {
    margin: 12px 16px;
  }
  
  .product-title {
    margin-top: 8px;
  }
  
  .controls-section .tab-content {
    min-height: auto;
    padding: 16px 16px 8px;
    background-color: #FFFFFF !important;
  }
  
  .controls-section .tab-pane,
  .controls-section .w-full {
    background-color: #FFFFFF !important;
  }
  
  .mobile-bottom-section {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  
  .mobile-gray-section {
    background: #F7F7F7;
    padding: 16px;
  }
  
  .mobile-price-info {
    margin-bottom: 16px;
  }
  
  .price-line {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
    display: flex;
    align-items: baseline;
    gap: 12px;
  }
  
  .price-title {
    font-size: 24px;
    font-weight: 700;
    color: #000;
  }
  
  .price-subtitle {
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }
  
  .payment-line {
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .info-icon {
    width: 14px;
    height: 14px;
  }
  
  .mobile-product-features {
    background: #FFFFFF;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 8px;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    color: #333;
  }
  
  .feature-icon {
    font-size: 14px;
  }
  
  /* Second/third steps white section */
  .mobile-white-section {
    background: #FFFFFF;
    padding: 16px;
  }
  
  .mobile-continue {
    width: 100%;
    height: 50px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.8px;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
  
  .mobile-trustpilot {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #333;
  }
  
  .mobile-trustpilot img {
    height: 14px;
    width: auto;
  }
  
  .free-shipping-bar {
    background: #F7F7F7;
    color: #808080;
    text-align: center;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin: 0;
  }
  
  .navigation {
    display: none;
  }
  
  .trustpilot-section:not(.mobile-trustpilot) {
    display: none;
  }
}

@media (max-width: 480px) {
  .mobile-product-features {
    gap: 4px;
    padding: 6px 8px;
    font-size: 10px;
  }
  
  .mobile-product-features .icons {
    width: 16px;
    height: 16px;
  }
  
  .mobile-product-features span {
    font-size: 8px;
  }
  
  .mobile-product-features img {
    width: 8px;
    height: 8px;
  }
}
}
</style>
