import {cva, type VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot"
import {cn} from "@/lib/utils"
import React from "react";

const showInfoClassSectionCardVariants = cva(
    "flex p-3 border bg-feature-card rounded-sm justify-between gap-6",
    {
        variants: {
            variant: {},
        },
        defaultVariants: {},
    }
)

export interface ShowInfoClassSectionCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof showInfoClassSectionCardVariants> {
    asChild?: boolean
    data?: any
}

const ShowInfoClassSectionCard = React.forwardRef<HTMLDivElement, ShowInfoClassSectionCardProps>(
    ({className, variant, asChild = false, data, ...props}, ref) => {
        const Comp = asChild ? Slot : "div"
        return (
            <Comp
                className={cn(showInfoClassSectionCardVariants({variant, className}))}
                ref={ref}
                {...props}
            >
                <div className={"flex flex-col gap-2"}>
                    <div className="flex flex-col items-start">
                        <p className={"font-medium"}>{data?.name}</p>
                        <p className="text-card-text-muted text-sm">{data?.code}</p>
                    </div>
                    <div>
                        {data?.defaultFee ?
                            <p className={"text-sm"}>Entry Fee:<span className="text-WEC-Black font-medium ml-2">${data.defaultFee}</span>
                            </p> :
                            <p>No Fees</p>}
                    </div>
                </div>
            </Comp>
        )
    }
)
ShowInfoClassSectionCard.displayName = "ShowInfoClassSectionCard"

export {ShowInfoClassSectionCard, showInfoClassSectionCardVariants}; 