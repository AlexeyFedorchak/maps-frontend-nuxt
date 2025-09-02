interface Step {
    name: string;
    isDisabled?: boolean;
}

export const useStepper = () => {
    const _steps = ref<Step[]>([]);
    const _currentStep = ref<Step | undefined>(undefined);

    const getCurrentStep = computed(() => {
        return _currentStep.value;
    });

    const isCurrentStepDisabled = computed(() => {
        return _currentStep.value?.isDisabled;
    });

    function setSteps(steps: Step[], initialStep?: Step) {
        _steps.value = steps;

        if (initialStep) {
            _currentStep.value = initialStep;
            return;
        }

        if (steps.length) {
            _currentStep.value = steps[0];
        }
    }

    function nextStep() {
        const currentStep = _steps.value.findIndex(step => step.name === _currentStep.value?.name);

        if (currentStep === -1) {
            return;
        }

        const nextStep = currentStep + 1;
        if (nextStep > _steps.value.length) {
            return;
        }

        _currentStep.value = _steps.value[nextStep];
    }

    function prevStep() {
        const currentStep = _steps.value.findIndex(step => step.name === _currentStep.value?.name);

        if (currentStep === -1) {
            return;
        }

        const prevStep = currentStep - 1;
        if (prevStep < 0) {
            return;
        }

        _currentStep.value = _steps.value[prevStep];
    }

    function disableAllSteps() {
        _steps.value = _steps.value.map(step => {
            return {
                ...step,
                isDisabled: true,
            };
        });
    }

    function enableAllSteps() {
        _steps.value = _steps.value.map(step => {
            return {
                ...step,
                isDisabled: false,
            };
        });
    }

    function disableCurrentStep() {
        if (_currentStep.value) {
            _currentStep.value = {
                ..._currentStep.value,
                isDisabled: true,
            }
        }
    }

    function enableCurrentStep() {
        if (_currentStep.value) {
            _currentStep.value = {
                ..._currentStep.value,
                isDisabled: false,
            }
        }
    }

    return {
        getCurrentStep,
        setSteps,
        nextStep,
        prevStep,
        isCurrentStepDisabled,
        disableAllSteps,
        enableAllSteps,
        disableCurrentStep,
        enableCurrentStep,
    }
};
