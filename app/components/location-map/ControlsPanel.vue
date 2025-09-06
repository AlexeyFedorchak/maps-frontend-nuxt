<script setup lang="ts">
import { useLocationMapStore } from '~/stores';
import { useStepper, NavigationDirection } from '~/composables/useStepper';
import { CONTROL_PANEL_STEPPER } from '~/components/shared/control-panel/constants';

const locationMapStore = useLocationMapStore();
const step = {
  location: 'location',
  design: 'design',
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
        className: 'max-w-[200px] w-[40%] md:w-[162.5px] bg-[#A5A5A5]',
      },
      {
        name: 'CONTINUE',
        isDisabled: ref(false),
        direction: NavigationDirection.forward,
        className: 'max-w-[490px] w-[50%] md:w-[282.5px]',
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
        className: 'w-[162.5px] bg-[#A5A5A5]',
      },
      {
        name: 'Add to Cart',
        isDisabled: ref(false),
        direction: NavigationDirection.forward,
        className: 'w-[282.5px]',
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
        <!-- Step: Location -->
        <LocationMapStepLocation
            v-if="stepper.getCurrentStep.value?.name === step.location"
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
            v-else-if="stepper.getCurrentStep.value?.name === step.design"
            key="design"
            :layout="locationMapStore.layout"
            :theme="locationMapStore.theme"
            @layout-selected="locationMapStore.setLayout($event)"
            @theme-selected="locationMapStore.setTheme($event)"
        />

        <!-- Step: Choose -->
        <LocationMapStepChoose
            v-else-if="stepper.getCurrentStep.value?.name === step.choose"
            key="choose"
            @color-scheme-selected="locationMapStore.setColorScheme($event)"
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
    .container-info {
      margin: 12px 16px;
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
