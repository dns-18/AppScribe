import React from "react";
import { Button as UiButton } from "./ui/button";
import { cn } from "../lib/utils";

export default function Button({
    children,
    type = "button",
        bgColor,
        textColor,
        variant = "default",
        size = "default",
    className = "",
    ...props
}) {
        const customColorClasses = cn(bgColor, textColor);

    return (
                <UiButton
                    type={type}
                    variant={variant}
                    size={size}
                    className={cn(customColorClasses, className)}
                    {...props}
                >
                    {children}
                </UiButton>
    );
}
