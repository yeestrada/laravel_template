import {cva, type VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot"
import {cn} from "@/lib/utils"
import React from "react";
import {Calendar, Award, Users, Info, Grid3X3} from "lucide-react"

const showDetailsMetricCardVariants = cva(
    "p-6 border bg-feature-card rounded-lg w-full",
    {
        variants: {
            variant: {},
        },
        defaultVariants: {},
    }
)

export interface ShowDetailsMetricCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof showDetailsMetricCardVariants> {
    asChild?: boolean
    label?: string
    data: any;
    icon?: "calendar" | "award" | "users" | "info" | "grid"
}

const ShowDetailsMetricCard = React.forwardRef<HTMLDivElement, ShowDetailsMetricCardProps>(
    ({className, variant, asChild = false, icon, label, data, ...props}, ref) => {
        const Comp = asChild ? Slot : "div"
        return (
            <Comp
                className={cn(showDetailsMetricCardVariants({variant, className}))}
                ref={ref}
                {...props}
            >
                <div className={"flex gap-3"}>
                    <div className="flex flex-col items-center justify-center w-9 h-9 p-2 dark:bg-[#262626]/10 rounded-sm">
                        {icon === "calendar" ? <Calendar className="size-5 text-pop-purple"/> : null}
                        {icon === "grid" ? <Grid3X3 className="size-5 text-pop-red"/> : null}
                        {icon === "award" ? <Award className="size-5 text-pop-blue"/> : null}
                        {icon === "users" ? <Users className="size-5 text-pop-green]"/> : null}
                        {icon === "info" ? <Info className="size-5 text-pop-yellow"/> : null}
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <p className={"text-sm text-muted-foreground"}>{label}</p>
                        <p className="text-card-text-muted font-bold">{data}</p>
                    </div>

                </div>
            </Comp>
        )
    }
)
ShowDetailsMetricCard.displayName = "ShowDetailsMetricCard"

export {ShowDetailsMetricCard, showDetailsMetricCardVariants}; 