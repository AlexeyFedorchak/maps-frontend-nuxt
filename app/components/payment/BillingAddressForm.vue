<script setup lang="ts">
import type { CheckoutFormContext } from '@/types/checkout'

interface Props {
  form: CheckoutFormContext
}

const props = defineProps<Props>();

// Countries data
const countries = [
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' }
];
</script>

<template>
  <!-- Billing Address Section -->
  <div class="mb-8">
    <div class="mb-5.5">
    <span class="text-sm font-semibold uppercase tracking-wide">
      Billing/Shipping Details
    </span>
    </div>

    <div class="space-y-5">
      <div class="grid grid-cols-2 gap-6">
        <UiFormField v-slot="{ componentField }" name="firstName">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="First Name"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="lastName">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="Last Name"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UiFormField v-slot="{ componentField }" name="addressLine1">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="Address Line 1"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="addressLine2">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="Address Line 2 (optional)"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UiFormField v-slot="{ componentField }" name="city">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="City / Country"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="zipCode">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="ZIP Code"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="country">
          <UiFormItem>
            <UiFormControl>
              <UiSelect v-bind="componentField">
                <UiSelectTrigger class="w-full  min-h-12 bg-[#FFFFFF] rounded-sm">
                  <UiSelectValue placeholder="United Kingdom" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="country in countries" :key="country.value" :value="country.value">
                    {{ country.label }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
    </div>
  </div>

  <!-- Checkboxes Section -->
  <div class="flex-col items-start gap-4 flex md:flex-row md:items-center md:space-x-8 ">
    <div class="flex items-center space-x-2">
      <UiFormField v-slot="{ value, handleChange }" name="shipToDifferentAddress">
        <UiFormItem class="flex items-center space-x-2">
          <UiFormControl>
            <UiCheckbox
              class="bg-[#FFFFFF] rounded-sm"
              :model-value="value"
              @update:model-value="handleChange"
            />
          </UiFormControl>
          <UiFormLabel class="text-sm font-medium">
            Ship to a different address?
          </UiFormLabel>
        </UiFormItem>
      </UiFormField>
    </div>
    <div class="flex items-center space-x-2">
      <UiFormField v-slot="{ value, handleChange }" name="addDeliveryNotes">
        <UiFormItem class="flex items-center space-x-2">
          <UiFormControl>
            <UiCheckbox
              class="bg-[#FFFFFF] rounded-sm"
              :model-value="value"
              @update:model-value="handleChange"
            />
          </UiFormControl>
          <UiFormLabel class="text-sm font-medium">
            Add deliver notes?
          </UiFormLabel>
        </UiFormItem>
      </UiFormField>
    </div>
  </div>

  <!-- Shipping Address Section (Conditional) -->
  <div v-if="props.form.values.shipToDifferentAddress" class="mt-8">
    <div class="mb-5.5">
      <span class="text-sm font-semibold uppercase tracking-wide">
        SHIPPING ADDRESS
      </span>
    </div>

    <div class="space-y-5">
      <div class="grid grid-cols-2 gap-6">
        <UiFormField v-slot="{ componentField }" name="shippingFirstName">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="First Name"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="shippingLastName">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="Last Name"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UiFormField v-slot="{ componentField }" name="shippingAddressLine1">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="Address Line 1"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="shippingAddressLine2">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="Address Line 2 (optional)"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3  gap-6">
        <UiFormField v-slot="{ componentField }" name="shippingCity">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="City / Country"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="shippingZipCode">
          <UiFormItem>
            <UiFormControl>
              <UiInput
                class="bg-[#FFFFFF] rounded-sm"
                placeholder="ZIP Code"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="shippingCountry">
          <UiFormItem>
            <UiFormControl>
              <UiSelect v-bind="componentField">
                <UiSelectTrigger class="w-full  min-h-12 bg-[#FFFFFF] rounded-sm">
                  <UiSelectValue placeholder="United Kingdom" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="country in countries" :key="country.value" :value="country.value">
                    {{ country.label }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
    </div>
  </div>

  <!-- Delivery Notes Section (Conditional) -->
  <div v-if="props.form.values.addDeliveryNotes" class="mt-8">
    <div class="mb-5.5">
      <span class="text-sm font-semibold uppercase tracking-wide">
        DELIVERY NOTES
      </span>
    </div>

    <UiFormField v-slot="{ componentField }" name="deliveryNotes">
      <UiFormItem>
        <UiFormControl>
          <textarea
            class="w-full min-h-24 bg-[#FFFFFF] rounded-sm border border-gray-300 px-3 py-2 resize-none"
            placeholder="Add any special delivery instructions..."
            v-bind="componentField"
          ></textarea>
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
  </div>
</template>

<style scoped>

</style>
