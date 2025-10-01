<script setup lang="ts">
import { useBasketStore } from '~/stores/basketStore';

const basketStore = useBasketStore();

onMounted(async () => {
  await basketStore.calculatePricesFromApi();
});

const props = withDefaults(defineProps<{
  options: Array<{ value: string }>;
  text?: string;
  total?: string;
  info?: string;
  isHideInfoSection?: boolean;
}>(), {
  text: 'Order within 3 hours 55 minutes for same day dispatch',
  total: '£0.00',
  info: 'or Pay in 3 interest free payments',
  isHideInfoSection: false,
});

const displayTotal = computed(() => {
  const total = basketStore.basketTotal;
  return `£${total.toFixed(2)}`;
});

const installmentPrice = computed(() => {
  const total = basketStore.basketTotal;
  const installment = total / 3;
  return `£${installment.toFixed(2)}`;
});

const showCouponInput = ref(false);
const couponCode = ref('');

const toggleCouponInput = () => {
  showCouponInput.value = !showCouponInput.value;
  if (!showCouponInput.value) {
    couponCode.value = '';
  }
};

const applyCoupon = () => {
  if (couponCode.value.trim()) {
    // TODO: Implement coupon application logic
    console.log('Applying coupon:', couponCode.value);
  }
};
</script>

<template>
  <!-- Shipping -->
  <h2 class="font-semibold text-lg">Shipping</h2>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5 md:mb-12">
    <div>
      <p class="text-[#0F822F] mt-2">
        {{ props.text }}
      </p>
    </div>
    <div class="w-full md:w-2/3 lg:w-2/5">
      <UiFormField v-slot="{ componentField }" name="shipping">
        <UiFormItem>
          <UiSelect v-bind="componentField">
            <UiSelectTrigger class="w-full min-h-12">
              <UiSelectValue/>
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem v-for="option in props.options" :key="option.value" :value="option.value">
                  {{ option.value }}
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </UiFormItem>
      </UiFormField>
    </div>
  </div>

  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
    <div class="w-full md:w-1/3">
      <p
        class="font-semibold cursor-pointer hover:text-blue-600 transition-colors mb-2"
        @click="toggleCouponInput"
      >
        Coupon Code
      </p>

      <div v-if="showCouponInput" class="flex flex-col sm:flex-row gap-2 items-center">
        <UiInput
          v-model="couponCode"
          placeholder="Enter coupon code"
          class="flex-1 min-w-0"
        />
        <UiButton
          @click.prevent="applyCoupon"
          :disabled="!couponCode.trim()"
          variant="outline"
          size="sm"
          class="w-full sm:w-auto sm:min-w-[80px]"
        >
          Apply
        </UiButton>
      </div>
    </div>

    <div class="w-full md:w-auto md:text-right">
      <p class="font-semibold text-lg">Total {{ displayTotal }}</p>
      <div v-if="!props.isHideInfoSection" class="flex gap-1 justify-start md:justify-end">
        <p class="text-sm text-[#928585]">or Pay in 3 interest free payments for {{ installmentPrice }}</p>
        <div class="w-5 h-auto flex items-end">
          <NuxtImg src="/images/icons/info.svg" alt="info" width="20px" height="20px"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
