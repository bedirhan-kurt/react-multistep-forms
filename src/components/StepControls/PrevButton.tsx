import React from "react";

import type {ButtonProps} from "../../types/StepControlButtonType.ts";
import {useMultistepForm} from "../../hooks/useMultistepForm";

export const PrevButton = ({ children, className, onClick }: ButtonProps) => {
    const { currentStepIndex, prevStep } = useMultistepForm();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick?.(event);
        prevStep();
    };

    if (currentStepIndex === 0) return null;

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
                prevStep();
            },
            className: [childElement.props.className, className].filter(Boolean).join(" "),
        });
    }

    return null;
};