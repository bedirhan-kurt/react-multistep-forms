import React from "react";

import type {ButtonProps} from "../../types/StepControlButtonType.ts";
import {useMultistepForm} from "../../hooks/useMultistepForm";

/**
 * Renders a button that navigates to the previous step in a multi-step form.
 *
 * - If `children` is a string, renders a styled button.
 * - If `children` is a React element, clones it and injects the click handler and className.
 * - If on the first step, renders nothing.
 *
 * @param {ButtonProps} props - Props for the PrevButton component.
 * @param {React.ReactNode} props.children - Button content or custom element.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick] - Optional click handler.
 * @returns {React.ReactElement | null} The rendered button or null.
 */
export const PrevButton = ({ children, className, onClick }: ButtonProps) => {
    const { currentStepIndex, prevStep } = useMultistepForm();

    /**
     * Handles the click event for the previous button.
     * Executes the optional onClick handler and navigates to the previous step.
     *
     * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
     */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick?.(event);
        prevStep();
    };

    // Do not render if on the first step
    if (currentStepIndex === 0) return null;

    // Render a styled button if children is a string
    if (typeof children === "string") {
        const defaultClassName = "px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition";

        return (
            <button onClick={handleClick} className={`${defaultClassName} ${className || ""}`}>
                {children}
            </button>
        );
    }

    // Clone and enhance the child element if it's a valid React element
    if (React.isValidElement(children)) {
        const childElement = children as React.ReactElement<
            React.HTMLAttributes<HTMLButtonElement>
        >;

        return React.cloneElement(childElement, {
            onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                childElement.props?.onClick?.(event);
                prevStep();
            },
            className: [childElement.props.className, className].filter(Boolean).join(" "),
        });
    }

    // Return null if children is not valid
    return null;
};
