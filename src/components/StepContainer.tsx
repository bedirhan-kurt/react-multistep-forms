import React, { type ReactNode } from "react";
import { useMultistepForm } from "../hooks/useMultistepForm";

type StepContainerProps = {
  /** The child elements representing the steps in the multi-step form. */
  children: ReactNode;

  /** Optional additional CSS classes for styling the container. */
  className?: string;
};

/**
 * A container component for rendering the active step in a multi-step form.
 *
 * - Uses the `useMultistepForm` hook to determine the current step index.
 * - Renders only the active step based on the current step index.
 *
 * @param {StepContainerProps} props - The props for the StepContainer component.
 * @param {React.ReactNode} props.children - The child elements representing the steps.
 * @param {string} [props.className] - Optional CSS classes for styling the container.
 *
 * @returns {React.ReactElement} A `div` element containing the active step.
 */
export function StepContainer({ children, className }: StepContainerProps) {
  const { currentStepIndex } = useMultistepForm();

  const stepsArray = React.Children.toArray(children);

  const activeStep = stepsArray[currentStepIndex];

  return <div className={className}>{activeStep}</div>;
}