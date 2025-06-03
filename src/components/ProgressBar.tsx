import React from "react";
import {useMultistepForm} from "../hooks/useMultistepForm";


type ProgressBarProps = {
    type: "dot" | "bar" | "dashed";
    className?: string;

    // Bar + Dashed
    fillColor?: string;
    trackColor?: string;
    height?: string;

    // Dot
    dotColor?: string;
    inactiveDotColor?: string;
    connectorColor?: string;
    dotSize?: string;

    // Dashed
    dashedGap?: string;
    dashedSegmentRadius?: string;
};

export default function ProgressBar({
                                        type,
                                        className = "",

                                        // Common
                                        fillColor = "bg-blue-500",
                                        trackColor = "bg-gray-300",
                                        height = "h-2",

                                        // Dot
                                        dotColor = "bg-blue-500 border-blue-500",
                                        inactiveDotColor = "bg-white border-gray-300",
                                        connectorColor = "bg-gray-300",
                                        dotSize = "w-3 h-3",

                                        // Dashed
                                        dashedGap = "gap-1",
                                        dashedSegmentRadius = "rounded",
                                    }: ProgressBarProps) {
    const {currentStepIndex, steps} = useMultistepForm();
    const progressPercent = steps.length > 1 ? Math.round((currentStepIndex / (steps.length - 1)) * 100) : 0;

    if (type === "bar") {
        return (
            <div className={`w-full ${height} ${trackColor} rounded ${className}`}>
                <div
                    className={`${fillColor} ${height} rounded transition-all duration-300`}
                    style={{width: `${progressPercent}%`}}
                />
            </div>
        );
    }

    if (type === "dot") {
        return (
            <div className={`flex items-center ${className}`}>
                {Array.from({length: steps.length}).map((_, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`rounded-full border-2 transition-all duration-300 ${dotSize} ${
                                index <= currentStepIndex ? dotColor : inactiveDotColor
                            }`}
                        />
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${connectorColor}`}/>
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    if (type === "dashed") {
        return (
            <div className={`flex w-full ${dashedGap} ${className}`}>
                {Array.from({length: steps.length}).map((_, index) => (
                    <div
                        key={index}
                        className={`flex-1 ${height} ${
                            index <= currentStepIndex ? fillColor : trackColor
                        } ${dashedSegmentRadius} transition-all duration-300`}
                    />
                ))}
            </div>
        );
    }

    return null;
}