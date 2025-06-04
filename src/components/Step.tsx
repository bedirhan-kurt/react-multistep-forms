import React from "react";

type StepProps = {
    /** The title of the step, displayed at the top. */
    title?: string;

    /** Indicates whether the step is valid. Defaults to `true`. */
    isValid?: boolean;

    /** The child elements to be rendered inside the step. */
    children: React.ReactNode;

    /** Optional additional CSS classes for styling the step container. */
    className?: string;

    /** If `true`, hides the title of the step. */
    hideTitle?: boolean;
};

/**
 * A component that represents a single step in a multi-step form.
 *
 * - Displays a title (if provided) and optionally hides it based on `hideTitle`.
 * - Shows a validity indicator next to the title based on the `isValid` prop.
 * - Renders the provided child elements inside the step container.
 *
 * @param {StepProps} props - The props for the Step component.
 * @param {string} [props.title] - The title of the step.
 * @param {boolean} [props.isValid=true] - Indicates whether the step is valid.
 * @param {React.ReactNode} props.children - The child elements to render inside the step.
 * @param {string} [props.className] - Optional CSS classes for styling the step container.
 * @param {boolean} [props.hideTitle] - If `true`, hides the title of the step.
 *
 * @returns {React.ReactElement} A `div` element representing the step.
 */
export function Step({ title, hideTitle, isValid = true, children, className }: StepProps) {
    return (
        <div className={className}>
            {title && (
                <div className="mb-2 flex items-center">
                    {!hideTitle ? <h2 className="text-lg font-semibold">{title}</h2> : null}
                    <span className={`ml-2 text-sm ${isValid ? "text-green-600" : "text-red-600"}`}>
                    </span>
                </div>
            )}
            <div>{children}</div>
        </div>
    );
}