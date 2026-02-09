import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const buttonVariants = cva(
    "flex h-auto w-fit justify-center items-center gap-1 rounded-xs px-4 py-2 text-base font-normal leading-6 transition duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-WEC-Black border border-WEC-Black text-white shadow-sm hover:bg-btn-primary-hover",
                outline:
                    "bg-transparent border border-WEC-Black text-WEC-Black shadow-sm hover:bg-btn-outline-hover",
                secondary:
                    "bg-WEC-Purple border border-WEC-Purple text-white shadow-sm hover:bg-WEC-Purple-hover",
                table:
                    "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "underline-offset-4 hover:underline p-0",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 px-3 text-xs",
                lg: "h-10 px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export {Button, buttonVariants}
