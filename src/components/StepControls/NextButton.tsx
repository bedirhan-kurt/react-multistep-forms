import React from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { useFormContext } from "react-hook-form";
import type { ButtonProps } from "../../types/StepControlButtonType";

/**
 * A button component that navigates to the next step in a multi-step form.
 *
 * @param {ButtonProps} props - The props for the NextButton component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} [props.className=""] - Additional CSS classes to style the button.
 * @param {function} [props.onClick] - Optional click handler to execute custom logic.
 *
 * @returns {React.ReactElement | null} - A button element or null if the current step is the last step.
 */
export const NextButton = ({ children, className = "", onClick }: ButtonProps) => {
    // Extracting necessary values and functions from the custom hook and form context
    const { currentStepIndex, currentStepKey, nextStep, stepFields, steps } = useMultistepForm();
    const { trigger } = useFormContext();

    /**
     * Handles the button click event.
     * Validates the current step's fields and proceeds to the next step if valid.
     *
     * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
     */
    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const fields = stepFields[currentStepKey];
        if (!fields || fields.length === 0) {
            console.warn(`No fields found for step: ${currentStepKey}`);
            return;
        }
        try {
            const valid = await trigger(fields);
            if (valid) {
                onClick?.(event);
                nextStep();
            }
        } catch (error) {
            console.error("Error during trigger validation:", error);
        }
    };

    // If the current step is the last step, do not render the button
    if (currentStepIndex === steps.length - 1) return null;

    // Render a button with default styling if children is a string
    if (typeof children === "string") {
        const defaultClassName = "px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition";

        return (
            <button onClick={handleClick} className={`${defaultClassName} ${className || ""}`}>
                {children}
            </button>
        );
    }

    // If children is a valid React element, clone it and add the onClick and className props
    if (React.isValidElement(children)) {
        const childElement = children as React.ReactElement<React.HTMLAttributes<HTMLButtonElement>>;

        return React.cloneElement(childElement, {
            onClick: async (event) => {
                event.preventDefault();

                const fields = stepFields[currentStepKey];
                if (!fields || fields.length === 0) {
                    console.warn(`No fields found for step: ${currentStepKey}`);
                    return;
                }

                const valid = await trigger(fields);
                if (valid) {
                    childElement.props.onClick?.(event);
                    nextStep();
                }
            },
            className: [childElement.props.className, className].filter(Boolean).join(" "),
        });
    }

    // Return null if children is neither a string nor a valid React element
    return null;
};
