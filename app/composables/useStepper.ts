export const NavigationDirection = {
    backward: 'backward',
    forward: 'forward',
};

export type NavigationDirection = typeof NavigationDirection[keyof typeof NavigationDirection];

export interface StepperStepButton {
    name: string;
    isDisabled: Ref<boolean>;
    direction: NavigationDirection;
    className: string;
}

export interface StepperStep {
    name: string;
    buttons?: Array<StepperStepButton>;
}

export const useStepper = (steps: StepperStep[]) => {
    const _steps = ref<StepperStep[]>(steps);
    const _currentStep = ref<StepperStep>(steps[0]!);

    const getAllSteps = computed(() => _steps.value);

    const getCurrentStep = computed(() => {
        return _currentStep.value;
    });

    const isClickOnLastStep = ref(false);

    function disableButton(index: number) {
        if (_currentStep.value?.buttons?.[index]) {
            _currentStep.value.buttons[index].isDisabled = true;
        }
    }

    function enableButton(index: number) {
        if (_currentStep.value?.buttons?.[index]) {
            _currentStep.value.buttons[index].isDisabled = false;
        }
    }

    function setActiveStep(index: number) {
        if (_steps.value[index]) {
            _currentStep.value = _steps.value[index];
        }
    }

    function nextStep() {
        const currentStep = _steps.value.findIndex(step => step.name === _currentStep.value?.name);

        if (currentStep === -1) {
            return;
        }

        const nextStep = currentStep + 1;
        if (nextStep >= _steps.value.length) {
            return;
        } else {
            isClickOnLastStep.value = true;
        }

        _currentStep.value = _steps.value[nextStep]!;
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

        _currentStep.value = _steps.value[prevStep]!;
    }

    return {
        getCurrentStep,
        getAllSteps,
        setActiveStep,
        isClickOnLastStep,
        nextStep,
        prevStep,
    };
};

export type Stepper = ReturnType<typeof useStepper>;
