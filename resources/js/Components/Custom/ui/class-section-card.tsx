import {cva, type VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot"
import {cn} from "@/lib/utils"
import React from "react";
import {Button} from "./button";

const classSectionCardVariants = cva(
    "flex p-3 border bg-frosted-grey rounded-sm justify-between gap-6",
    {
        variants: {
            variant: {},
        },
        defaultVariants: {},
    }
)

export interface ClassSectionCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof classSectionCardVariants> {
    asChild?: boolean
    label?: string
    data: any;
    onAdd?: () => void
    onRemove?: () => void;
}

const ClassSectionCard = React.forwardRef<HTMLDivElement, ClassSectionCardProps>(
    ({className, variant, asChild = false, label, data, onAdd, onRemove, ...props}, ref) => {
        const Comp = asChild ? Slot : "div"
        return (
            <Comp
                className={cn(classSectionCardVariants({variant, className}))}
                ref={ref}
                {...props}
            >
                <div className={"flex flex-col gap-4"}>
                    <div className="flex flex-col items-start">
                        <p>{data?.name}</p>
                        <p className="text-card-text-muted text-sm">{data?.classCode}</p>
                    </div>
                    <div>
                        {data?.defaultFee ?
                            <p>Entry Fee:<span className="text-WEC-Black font-medium ml-2">${data.defaultFee}</span>
                            </p> :
                            <p>No Fees</p>}
                    </div>
                </div>
                {onAdd &&
                    <Button size={"sm"} onClick={() => onAdd()}>Add</Button>
                }
                {onRemove &&
                    <Button size={"sm"} onClick={() => onRemove()}>Remove</Button>
                }
            </Comp>
        )
    }
)
ClassSectionCard.displayName = "ClassSectionCard"

export {ClassSectionCard, classSectionCardVariants}; 