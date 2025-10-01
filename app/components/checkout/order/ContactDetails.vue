<script setup lang="ts">
import {useField} from 'vee-validate'
import type {CheckoutFormContext} from "~/types/checkout";

const {loginWithApi, forgotPasswordWithApi, getUser: getAuthUser} = useAuth();

interface Props {
  form: CheckoutFormContext
}

const props = defineProps<Props>();

const {isMobile} = useBreakpoints();
const createAccount = ref(false);
const lostPassword = ref(false);
const loggedIn = ref(false);
const activeTab = ref('guest');
const user = ref(null);

const {
  value: loginEmail,
  validate: validateLoginEmail,
} = useField('loginEmail')

const {
  value: loginPassword,
  validate: validateLoginPassword,
} = useField('loginPassword', {})

const {value: rememberMe} = useField<boolean>('rememberMe');

async function onLogin() {
  const emailValidation = await validateLoginEmail();
  const passwordValidation = await validateLoginPassword();

  if (!emailValidation.valid || !passwordValidation.valid) {
    return;
  }

  await loginWithApi(loginEmail.value, loginPassword.value);
  getUser();
}

async function forgotPassword() {
  const emailValidation = await validateLoginEmail();

  if (!emailValidation.valid) {
    return;
  }

  await forgotPasswordWithApi(loginEmail.value);
  lostPassword.value = false;
}

function getUser() {
  user.value = getAuthUser();
  loggedIn.value = !!user.value;

  if (!loggedIn.value) {
    return;
  }

  props.form.setFieldValue('email', user.value?.email || '');
  props.form.setFieldValue('phone', user.value?.phone || '');
}

watch(loggedIn, (val) => {
  if (val) activeTab.value = 'guest';
})

onMounted(() => {
  getUser();
});
</script>

<template>
  <UiTabs default-value="guest" v-model="activeTab" class="w-full">
    <UiTabsList class="grid w-full grid-cols-2 p-0">
      <UiTabsTrigger @click="activeTab = 'guest'" value="guest"
                     class="data-[state=active]:bg-white font-extrabold rounded-none shadow-none p-3.5">Guest Checkout
      </UiTabsTrigger>
      <UiTabsTrigger @click="activeTab = 'signin'" v-if="!loggedIn" value="signin"
                     class="data-[state=active]:bg-white font-extrabold rounded-none shadow-none p-3.5">Sign in
      </UiTabsTrigger>
    </UiTabsList>

    <div class="p-4 md:px-6 md:py-10 bg-white">

      <UiTabsContent value="guest" class="space-y-4">
        <div class="mb-3 md:mb-8">
          <h2 class="font-extrabold mb-2">Contact Details</h2>
          <span class="text-[#787878]">Email used for receipts and your order</span>
        </div>
        <div class="mb-4 flex flex-col md:flex-row gap-6">
          <UiFormField v-slot="{ componentField }" type="email" name="email">
            <UiFormItem class="w-full">
              <UiFormControl>
                <UiInput class="rounded-sm" placeholder="Email Address" v-bind="componentField"/>
                <UiFormMessage/>
              </UiFormControl>
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" type="text" name="phone">
            <UiFormItem class="w-full">
              <UiFormControl>
                <UiInput class="rounded-sm" placeholder="Phone (optional)" v-bind="componentField"/>
              </UiFormControl>
            </UiFormItem>
          </UiFormField>
        </div>
        <div class="mb-6 md:mb-0">
          <div class="flex items-center space-x-2">
            <UiFormField v-if="!loggedIn" v-slot="{ value, handleChange }" type="checkbox" name="createAnAccount">
              <UiFormItem class="flex items-center space-x-2">
                <UiFormControl>
                  <UiCheckbox :model-value="value"
                              @update:model-value="(newValue) => { handleChange(newValue); createAccount = newValue; }"/>
                </UiFormControl>
                <UiFormLabel>Create an account?</UiFormLabel>
              </UiFormItem>
            </UiFormField>
          </div>
        </div>

        <div v-if="createAccount" class="my-4">
          <UiFormField v-slot="{ componentField }" type="password" name="accountPassword">
            <UiFormItem class="w-full">
              <UiFormControl>
                <UiInput class="rounded-sm" type="password" placeholder="Password" v-bind="componentField"/>
                <UiFormMessage/>
              </UiFormControl>
            </UiFormItem>
          </UiFormField>
        </div>
      </UiTabsContent>

      <UiTabsContent v-if="!loggedIn" value="signin" class="space-y-4">
        <template v-if="!lostPassword">
          <div class="mb-4 flex flex-col gap-4">
            <UiFormField v-slot="{ componentField }" type="email" name="loginEmail">
              <UiFormItem class="w-full">
                <UiFormControl>
                  <UiInput class="rounded-sm" placeholder="Email Address" v-bind="componentField"/>
                  <UiFormMessage/>
                </UiFormControl>
              </UiFormItem>
            </UiFormField>
            <UiFormField v-slot="{ componentField }" type="password" name="loginPassword">
              <UiFormItem class="w-full">
                <UiFormControl>
                  <UiInput class="rounded-sm" type="password" placeholder="Password" v-bind="componentField"/>
                  <UiFormMessage/>
                </UiFormControl>
              </UiFormItem>
            </UiFormField>
          </div>

          <div class="mb-4">
            <div class="flex items-center space-x-2">
              <UiFormField v-slot="{ value, handleChange }" type="checkbox" name="rememberMe">
                <UiFormItem class="flex items-center space-x-2">
                  <UiFormControl>
                    <UiCheckbox :model-value="value" @update:model-value="handleChange"/>
                  </UiFormControl>
                  <UiFormLabel>Remember me</UiFormLabel>
                </UiFormItem>
              </UiFormField>
            </div>
          </div>

          <div class="mb-4">
            <UiButton type="button" @click="onLogin" class="w-full rounded-sm" size="lg">
              Login
            </UiButton>
          </div>

          <div class="text-center">
            <a @click="lostPassword = true" class="text-sm cursor-pointer text-primary hover:underline">Lost your password?</a>
          </div>
        </template>
        <template v-else>
          <div class="mb-4 flex flex-col gap-4">
            <UiFormField v-slot="{ componentField }" type="email" name="loginEmail">
              <UiFormItem class="w-full">
                <UiFormControl>
                  <UiInput class="rounded-sm" placeholder="Email Address" v-bind="componentField"/>
                  <UiFormMessage/>
                </UiFormControl>
              </UiFormItem>
            </UiFormField>
          </div>
          <div class="mb-4">
            <UiButton type="button" @click="forgotPassword" class="w-full rounded-sm" size="lg">
              Send new password
            </UiButton>
          </div>
        </template>
      </UiTabsContent>
    </div>
  </UiTabs>
</template>

<style scoped>

</style>
