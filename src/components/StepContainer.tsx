import React, {type ReactNode} from "react";
import {useMultistepForm} from "../hooks/useMultistepForm";

type StepContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function StepContainer({ children, className }: StepContainerProps) {
  const { currentStepIndex } = useMultistepForm();

  const stepsArray = React.Children.toArray(children);

  const activeStep = stepsArray[currentStepIndex];

  return <div className={className}>{activeStep}</div>;
}