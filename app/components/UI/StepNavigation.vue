<template>
  <nav class="step-navigation">
    <button
      v-if="canGoBack"
      class="step-navigation__button step-navigation__button--back"
      :disabled="isLoading"
      @click="handleGoBack"
    >
      <ChevronLeft class="w-4 h-4 mr-2" />
      Back
    </button>

    <div v-else class="step-navigation__spacer" />

    <button
      class="step-navigation__button step-navigation__button--continue"
      :disabled="!canContinue || isLoading"
      @click="handleContinue"
    >
      <template v-if="isLoading">
        <div class="step-navigation__spinner" />
        Loading...
      </template>
      
      <template v-else>
        {{ continueButtonText }}
        <ChevronRight class="w-4 h-4 ml-2" />
      </template>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  canGoBack: boolean
  canContinue: boolean
  isLoading?: boolean
  isLastStep?: boolean
}

interface Emits {
  (e: 'go-back'): void
  (e: 'continue'): void
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  isLastStep: false
})

const emit = defineEmits<Emits>()

const continueButtonText = computed(() => {
  if (props.isLastStep) {
    return 'Create map'
  }
  return 'Continue'
})

function handleGoBack() {
  if (!props.isLoading) {
    emit('go-back')
  }
}

function handleContinue() {
  if (props.canContinue && !props.isLoading) {
    emit('continue')
  }
}
</script>

<style scoped>
.step-navigation {
  @apply flex gap-3;
}

.step-navigation__spacer {
  @apply flex-1;
}

.step-navigation__button {
  @apply flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm;
  @apply transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  height: 48px;
  min-width: 120px;
}

.step-navigation__button--back {
  @apply bg-gray-500 text-white hover:bg-gray-600;
  @apply focus:ring-gray-500;
  flex: 1;
}

.step-navigation__button--back:disabled {
  @apply bg-gray-300 cursor-not-allowed;
}

.step-navigation__button--continue {
  @apply bg-black text-white hover:bg-gray-800;
  @apply focus:ring-black;
  flex: 2;
  background: var(--color-primary, #000);
}

.step-navigation__button--continue:disabled {
  @apply bg-gray-300 cursor-not-allowed;
}

.step-navigation__button--continue:hover:not(:disabled) {
  @apply transform -translate-y-0.5;
}

.step-navigation__spinner {
  @apply w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2;
}

@media (max-width: 768px) {
  .step-navigation {
    @apply flex-col;
  }
  
  .step-navigation__button {
    @apply w-full;
  }
  
  .step-navigation__spacer {
    @apply hidden;
  }
}
</style>
