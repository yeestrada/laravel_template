import {cva, type VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot"

import {cn} from "@/lib/utils"
import React from "react";

const badgeVariants = cva(
    "flex items-center justify-center px-2.5 py-0.5 border-1 text-xs font-medium",
    {
        variants: {
            variant: {
                success: "border-success bg-stall-status-selected text-success",
                info: "border-info-border bg-info text-info-border",
                warning: "border-warning-300 bg-warning-50 text-warning-300",
                error: "border-error-300 bg-error-50 text-error-300",
                purple: "bg-badge-purple-bg text-WEC-Purple font-normal px-2 py-1.5"
            },
            shape: {
                rounded: "rounded-full",
                square: "rounded-none",
            }
        },
        defaultVariants: {
            variant: "success",
            shape: "rounded",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {
    asChild?: boolean
    label?: string
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({className, variant, shape, asChild = false, label, ...props}, ref) => {
        const Comp = asChild ? Slot : "span"
        return (
            <Comp
                className={cn(badgeVariants({variant, shape, className}))}
                ref={ref}
                {...props}
            >
                {label ? label : "No Stall Selected"}
            </Comp>
        )
    }
)
Badge.displayName = "Badge"

export {Badge, badgeVariants}; 