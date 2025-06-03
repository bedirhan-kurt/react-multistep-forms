import React from "react";
import {useMultistepForm} from "../../hooks/useMultistepForm";
import type {ButtonProps} from "../../types/StepControlButtonType.ts";
import {useFormContext} from "react-hook-form";


export const SubmitButton = ({ children, className, onClick }: ButtonProps) => {
    const { steps, currentStepIndex, submit } = useMultistepForm();

    const { handleSubmit } = useFormContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick?.(event);
        handleSubmit(submit!)();
    };

    if ( currentStepIndex !== steps.length - 1) return null;

    if (typeof children === "string") {
        const defaultClassName = "px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition";

        return (
            <button onClick={handleClick} className={`${defaultClassName} ${className || ""}`}>
                {children}
            </button>
        );
    }

    if (React.isValidElement(children)) {
        const childElement = children as React.ReactElement<
            React.HTMLAttributes<HTMLButtonElement>
        >;

        const existingOnClick = childElement.props?.onClick;

        return React.cloneElement(childElement, {
            onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                existingOnClick?.(event);
            },
            className: [childElement.props.className, className].filter(Boolean).join(" "),
        });
    }

    return null;
};