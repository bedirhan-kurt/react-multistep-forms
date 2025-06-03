import React from "react";

type StepProps = {
    title?: string;
    isValid?: boolean;
    children: React.ReactNode;
    className?: string;
    hideTitle?: boolean;
};

export default function Step({title, hideTitle, isValid = true, children, className}: StepProps) {
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