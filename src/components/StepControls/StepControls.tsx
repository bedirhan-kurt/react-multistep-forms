import React from "react";

type StepControlsProps = {
    /** The child elements to be rendered inside the StepControls container. */
    children: React.ReactNode;

    /** Optional additional CSS classes to style the container. */
    className?: string;
};

/**
 * A container component for step control buttons in a multi-step form.
 *
 * @param {StepControlsProps} props - The props for the StepControls component.
 * @param {React.ReactNode} props.children - The child elements to render inside the container.
 * @param {string} [props.className] - Optional CSS classes for styling the container.
 *
 * @returns {React.ReactElement} A `div` element wrapping the provided children.
 */
export function StepControls({ className, children }: StepControlsProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
};