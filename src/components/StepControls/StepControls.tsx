import React from "react";

type StepControlsProps = {
    children: React.ReactNode;
    className?: string;
}

export default function StepControls({className, children}: StepControlsProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
};