import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

type StepKey = string;

type MultistepFormContextType = {
    currentStepIndex: number;
    currentStepKey: StepKey;
    stepFields: Record<StepKey, string[]>;
    setStepFields: React.Dispatch<React.SetStateAction<Record<StepKey, string[]>>>;
    nextStep: () => void;
    prevStep: () => void;
    submit: () => void;
    steps: StepKey[]; // derive from stepFields
};

export const MultistepFormContext = createContext<MultistepFormContextType | undefined>(undefined);

export function MultistepFormProvider({
                                          stepFieldsMap,
                                          onSubmit,
                                          children,
                                      }: {
    stepFieldsMap: Record<StepKey, string[]>;
    onSubmit?: () => void;
    children: ReactNode;
}) {
    const [stepFields, setStepFields] = useState<Record<StepKey, string[]>>(stepFieldsMap);

    const steps = Object.keys(stepFields);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const currentStepKey = steps[currentStepIndex] || "";

    const nextStep = () => {
        setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prevStep = () => {
        setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
    };

    const submit = () => {
        onSubmit?.();
    };

    return (
        <MultistepFormContext.Provider
            value={{
                currentStepIndex,
                currentStepKey,
                stepFields,
                setStepFields,
                nextStep,
                prevStep,
                submit,
                steps,
            }}
        >
            {children}
        </MultistepFormContext.Provider>
    );
}