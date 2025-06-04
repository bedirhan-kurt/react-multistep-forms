import React from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import type { ButtonProps } from "../../types/StepControlButtonType.ts";
import { useFormContext } from "react-hook-form";

/**
 * Renders a button that submits the multi-step form.
 *
 * - If `children` is a string, renders a styled button.
 * - If `children` is a React element, clones it and injects the click handler and className.
 * - If not on the last step, renders nothing.
 *
 * @param {ButtonProps} props - Props for the SubmitButton component.
 * @param {React.ReactNode} props.children - Button content or custom element.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick] - Optional click handler.
 * @returns {React.ReactElement | null} The rendered button or null.
 */
export const SubmitButton = ({ children, className, onClick }: ButtonProps) => {
    const { steps, currentStepIndex, submit } = useMultistepForm();
    const { handleSubmit } = useFormContext();

    /**
     * Handles the click event for the submit button.
     * Executes the optional onClick handler and submits the form.
     *
     * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
     */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick?.(event);
        if (submit) {
            try {
                handleSubmit(submit)();
            } catch (error) {
                console.error("Error during handleSubmit:", error);
            }
        } else {
            console.warn("Submit function is not defined");
        }
    };

    // Do not render if not on the last step
    if (currentStepIndex !== steps.length - 1) return null;

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
                // Önce varsa çocuğun kendi onClick fonksiyonu çalışsın
                childElement.props?.onClick?.(event);
                // Sonra submit fonksiyonu çağrılır
                submit();
            },
            className: [childElement.props.className, className].filter(Boolean).join(" "),
        });
    }

    // Return null if children is not valid
    return null;
};
