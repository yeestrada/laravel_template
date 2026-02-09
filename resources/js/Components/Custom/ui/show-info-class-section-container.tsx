import {ShowInfoClassSectionCard} from "@/components/ui/show-info-class-section-card.tsx";
import {cva, type VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot"
import {cn} from "@/lib/utils"
import React from "react";
import {Grid3X3, Award} from "lucide-react"

const showInfoClassSectionContainerVariants = cva(
    "flex flex-col mx-auto w-full items-stretch p-6 border bg-feature-card rounded-lg gap-6",
    {
        variants: {
            variant: {},
        },
        defaultVariants: {},
    }
)

export interface ShowInfoClassSectionContainerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof showInfoClassSectionContainerVariants> {
    asChild?: boolean
    label?: string
    data?: any;
    icon?: "grid" | "award"
}

const ShowInfoClassSectionContainer = React.forwardRef<HTMLDivElement, ShowInfoClassSectionContainerProps>(
    ({className, variant, asChild = false, icon, label, data, ...props}, ref) => {
        const Comp = asChild ? Slot : "div"
        return (
            <Comp
                className={cn(showInfoClassSectionContainerVariants({variant, className}))}
                ref={ref}
                {...props}
            >
                <div className="flex justify-between items-center gap-6 self-start">
                    <div className="flex gap-2 items-center">
                        {icon === "award" ? <Award className="size-5 text-pop-blue"/> : null}
                        {icon === "grid" ? <Grid3X3 className="size-5 text-pop-purple"/> : null}
                        <p className={"font-semibold"}>{label}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-start">
                    {data?.map((s: any) => (
                        <ShowInfoClassSectionCard key={s.id} data={{
                            name: s.name,
                            classCode: s.code,
                            defaultFee: s.defaultFee,
                        }}/>
                    ))}
                </div>
            </Comp>
        )
    }
)
ShowInfoClassSectionContainer.displayName = "ShowInfoClassSectionContainer"

export {ShowInfoClassSectionContainer, showInfoClassSectionContainerVariants}; 