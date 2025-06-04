import React from "react";

export type ButtonProps = {
    /** The content to be displayed inside the button. */
    children: React.ReactNode;

    /** Optional additional CSS classes for styling the button. */
    className?: string;

    /** Optional click event handler for the button. */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};