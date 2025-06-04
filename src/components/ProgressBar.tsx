import React from "react";
import { useMultistepForm } from "../hooks/useMultistepForm";

type ProgressBarProps = {
    /** The type of progress bar to render. Can be "dot", "bar", or "dashed". */
    type: "dot" | "bar" | "dashed";

    /** Optional additional CSS classes for styling the progress bar container. */
    className?: string;

    /** The fill color for the progress bar or active segments/dots. */
    fillColor?: string;

    /** The track color for the progress bar or inactive segments/dots. */
    trackColor?: string;

    /** The height of the progress bar or dashed segments. */
    height?: string;

    /** The color of active dots in the "dot" type progress bar. */
    dotColor?: string;

    /** The color of inactive dots in the "dot" type progress bar. */
    inactiveDotColor?: string;

    /** The color of the connector between dots in the "dot" type progress bar. */
    connectorColor?: string;

    /** The size of the dots in the "dot" type progress bar. */
    dotSize?: string;

    /** The gap between dashed segments in the "dashed" type progress bar. */
    dashedGap?: string;

    /** The border radius of dashed segments in the "dashed" type progress bar. */
    dashedSegmentRadius?: string;
};

/**
 * A component that renders a progress bar for a multi-step form.
 * Supports three types: "bar", "dot", and "dashed".
 *
 * - "bar": A horizontal bar that fills based on the current step.
 * - "dot": A series of dots connected by lines, with active and inactive states.
 * - "dashed": A series of dashed segments that fill based on the current step.
 *
 * @param {ProgressBarProps} props - The props for the ProgressBar component.
 * @param {"dot" | "bar" | "dashed"} props.type - The type of progress bar to render.
 * @param {string} [props.className] - Optional additional CSS classes for styling.
 * @param {string} [props.fillColor="bg-blue-500"] - The fill color for active elements.
 * @param {string} [props.trackColor="bg-gray-300"] - The color for inactive elements.
 * @param {string} [props.height="h-2"] - The height of the progress bar or segments.
 * @param {string} [props.dotColor="bg-blue-500 border-blue-500"] - The color of active dots.
 * @param {string} [props.inactiveDotColor="bg-white border-gray-300"] - The color of inactive dots.
 * @param {string} [props.connectorColor="bg-gray-300"] - The color of the connector between dots.
 * @param {string} [props.dotSize="w-3 h-3"] - The size of the dots.
 * @param {string} [props.dashedGap="gap-1"] - The gap between dashed segments.
 * @param {string} [props.dashedSegmentRadius="rounded"] - The border radius of dashed segments.
 *
 * @returns {React.ReactElement | null} The rendered progress bar or null if the type is invalid.
 */
export function ProgressBar({
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
    const { currentStepIndex, steps } = useMultistepForm();
    const progressPercent = steps.length > 1 ? Math.round((currentStepIndex / (steps.length - 1)) * 100) : 0;

    if (type === "bar") {
        return (
            <div className={`w-full ${height} ${trackColor} rounded ${className}`}>
                <div
                    className={`${fillColor} ${height} rounded transition-all duration-300`}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        );
    }

    if (type === "dot") {
        return (
            <div className={`flex items-center ${className}`}>
                {Array.from({ length: steps.length }).map((_, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`rounded-full border-2 transition-all duration-300 ${dotSize} ${
                                index <= currentStepIndex ? dotColor : inactiveDotColor
                            }`}
                        />
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${connectorColor}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    if (type === "dashed") {
        return (
            <div className={`flex w-full ${dashedGap} ${className}`}>
                {Array.from({ length: steps.length }).map((_, index) => (
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