<template>
  <div class="step-indicator">
    <div class="step-indicator__progress-bar">
      <div 
        class="step-indicator__progress-fill"
        :style="{ width: `${completionProgress}%` }"
      />
    </div>

    <div class="step-indicator__steps">
      <div 
        v-for="step in steps"
        :key="step.id"
        class="step-indicator__step"
        :class="getStepClasses(step.id)"
      >
        <div class="step-indicator__step-icon">
          <component 
            :is="step.icon"
            class="w-5 h-5"
          />
        </div>
        <span class="step-indicator__step-title">
          {{ step.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Palette, Settings } from 'lucide-vue-next'
import type { Step } from '../../types'

interface StepDefinition {
  id: Step
  title: string
  icon: any
}

interface Props {
  currentStep: Step
  completionProgress: number
}

const props = defineProps<Props>()

const steps: StepDefinition[] = [
  {
    id: 'location',
    title: 'Location',
    icon: MapPin
  },
  {
    id: 'design', 
    title: 'Design',
    icon: Palette
  },
  {
    id: 'choose',
    title: 'Settings',
    icon: Settings
  }
]

function getStepClasses(stepId: Step) {
  const stepIndex = steps.findIndex(s => s.id === stepId)
  const currentIndex = steps.findIndex(s => s.id === props.currentStep)
  
  return {
    'step-indicator__step--active': stepId === props.currentStep,
    'step-indicator__step--completed': stepIndex < currentIndex,
    'step-indicator__step--pending': stepIndex > currentIndex
  }
}
</script>

<style scoped>
.step-indicator {
  @apply w-full;
}

.step-indicator__progress-bar {
  @apply w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden;
}

.step-indicator__progress-fill {
  @apply h-full bg-blue-600 transition-all duration-500 ease-out;
  background: var(--color-primary, #000);
}

.step-indicator__steps {
  @apply flex justify-between;
}

.step-indicator__step {
  @apply flex flex-col items-center text-center flex-1;
}

.step-indicator__step-icon {
  @apply w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300;
  @apply bg-gray-200 text-gray-400;
}

.step-indicator__step--active .step-indicator__step-icon {
  @apply bg-blue-600 text-white;
  background: var(--color-primary, #000);
}

.step-indicator__step--completed .step-indicator__step-icon {
  @apply bg-green-500 text-white;
}

.step-indicator__step-title {
  @apply text-sm font-medium text-gray-500 transition-colors duration-300;
}

.step-indicator__step--active .step-indicator__step-title {
  @apply text-blue-600;
  color: var(--color-primary, #000);
}

.step-indicator__step--completed .step-indicator__step-title {
  @apply text-green-600;
}
</style>
