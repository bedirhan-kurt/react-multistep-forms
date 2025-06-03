import { useContext } from "react";
import { MultistepFormContext } from "../context/MultistepFormContext";

export function useMultistepForm() {
    const context = useContext(MultistepFormContext);
    if (!context) {
        throw new Error("useMultistepForm must be used within a MultistepFormProvider");
    }
    return context;
}