import React from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { useFormContext } from "react-hook-form";
import type { ButtonProps } from "../../types/StepControlButtonType";

export const NextButton = ({ children, className = "", onClick }: ButtonProps) => {
    const { currentStepIndex, currentStepKey, nextStep, stepFields, steps } = useMultistepForm();
    const { trigger } = useFormContext();

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const fields = stepFields[currentStepKey] || [];
        const valid = await trigger(fields);
        if (valid) {
            onClick?.(event);
            nextStep();
        }
    };

    if (currentStepIndex === steps.length - 1) return null;

    if (typeof children === "string") {
        const defaultClassName = "px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition";

        return (
            <button onClick={handleClick} className={`${defaultClassName} ${className || ""}`}>
                {children}
            </button>
        );
    }

    if (React.isValidElement(children)) {
        const childElement = children as React.ReactElement<React.HTMLAttributes<HTMLButtonElement>>;

        return React.cloneElement(childElement, {
            onClick: handleClick,
            className: [childElement.props.className, className].filter(Boolean).join(" "),
        });
    }

    return null;
};