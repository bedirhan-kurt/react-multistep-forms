import { useContext } from "react";
import { MultistepFormContext } from "../context/MultistepFormContext";

/**
 * A custom hook for accessing the `MultistepFormContext`.
 *
 * - Provides access to the current step, navigation functions, and step field mappings.
 * - Ensures that the hook is used within a `MultistepFormProvider`.
 *
 * @throws {Error} If the hook is used outside of a `MultistepFormProvider`.
 *
 * @returns {MultistepFormContextType} The context value containing the multi-step form state and functions.
 */
export function useMultistepForm() {
    const context = useContext(MultistepFormContext);
    if (!context) {
        throw new Error("useMultistepForm must be used within a MultistepFormProvider");
    }
    return context;
}