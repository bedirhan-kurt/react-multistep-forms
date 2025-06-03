import React from "react";

type MultistepFormProps = {
    children?: React.ReactNode;
    className?: string;
};

export default function MultistepForm({ children, className}: MultistepFormProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}