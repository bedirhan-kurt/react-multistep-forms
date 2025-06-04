import React from "react";

type MultistepFormProps = {
    /** The child elements to be rendered inside the MultistepForm container. */
    children?: React.ReactNode;

    /** Optional additional CSS classes to style the container. */
    className?: string;
};

/**
 * A container component for rendering a multi-step form.
 *
 * @param {MultistepFormProps} props - The props for the MultistepForm component.
 * @param {React.ReactNode} [props.children] - The child elements to render inside the container.
 * @param {string} [props.className] - Optional CSS classes for styling the container.
 *
 * @returns {React.ReactElement} A `div` element wrapping the provided children.
 */
export function MultistepForm({ children, className }: MultistepFormProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}