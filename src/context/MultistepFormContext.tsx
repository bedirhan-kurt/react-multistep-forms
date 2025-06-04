import React, {createContext, useEffect, useState} from "react";
import type { ReactNode } from "react";

type StepKey = string;

type MultistepFormContextType = {
    /** The index of the current step in the multistep form. */
    currentStepIndex: number;

    /** The key of the current step in the multistep form. */
    currentStepKey: StepKey;

    /** A mapping of step keys to their associated field names. */
    stepFields: Record<StepKey, string[]>;

    /** A function to update the mapping of step keys to field names. */
    setStepFields: React.Dispatch<React.SetStateAction<Record<StepKey, string[]>>>;

    /** Advances to the next step in the multistep form. */
    nextStep: () => void;

    /** Moves to the previous step in the multistep form. */
    prevStep: () => void;

    /** Submits the multistep form. */
    submit: () => void;

    /** An array of step keys derived from the `stepFields` mapping. */
    steps: StepKey[];
};

/**
 * A React context for managing the state and behavior of a multistep form.
 * Provides the current step, navigation functions, and step field mappings.
 */
export const MultistepFormContext = createContext<MultistepFormContextType | undefined>(undefined);

/**
 * A provider component for the `MultistepFormContext`.
 *
 * - Manages the state of the multistep form, including the current step and step fields.
 * - Provides functions for navigating between steps and submitting the form.
 *
 * @param {Object} props - The props for the `MultistepFormProvider` component.
 * @param {Record<StepKey, string[]>} props.stepFieldsMap - A mapping of step keys to their associated field names.
 * @param {() => void} [props.onSubmit] - An optional callback function to execute on form submission.
 * @param {ReactNode} props.children - The child elements to render within the provider.
 *
 * @returns {React.ReactElement} The `MultistepFormContext.Provider` wrapping the provided children.
 */
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

    /**
     * Advances to the next step in the multistep form.
     * Ensures the index does not exceed the total number of steps.
     */
    const nextStep = () => {
        setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    };

    /**
     * Moves to the previous step in the multistep form.
     * Ensures the index does not go below zero.
     */
    const prevStep = () => {
        setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
    };

    /**
     * Submits the multistep form by invoking the optional `onSubmit` callback.
     */
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