import {cva, type VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot"

import {cn} from "@/lib/utils"
import React from "react";
import {Calendar, Award, Users, Info, TriangleAlert, Hash, EqualNot, CircleCheck, Circle} from "lucide-react"

const showInfoCardVariants = cva(
    "flex flex-col mx-auto w-full justify-center p-6 border bg-feature-card rounded-lg gap-6",
    {
        variants: {
            variant: {},
        },
        defaultVariants: {},
    }
)

export interface ShowInfoCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof showInfoCardVariants> {
    asChild?: boolean
    label?: string
    start: any;
    end: any;
    status: any;
    icon?: "calendar" | "award" | "users" | "info" | "check"
}

const ShowInfoCard = React.forwardRef<HTMLDivElement, ShowInfoCardProps>(
    ({className, variant, asChild = false, icon, label, start, end, status, ...props}, ref) => {
        const Comp = asChild ? Slot : "div"
        return (
            <Comp
                className={cn(showInfoCardVariants({variant, className}))}
                ref={ref}
                {...props}
            >
                <div className="flex flex-col items-start">
                    <h6 className={"m-0 font-semibold"}>Show Information</h6>
                    <p className={"text-card-text-muted"}>Basic show configuration and settings</p>
                </div>
                <div className={"flex w-full justify-between"}>
                    <div className="grid grid-cols-3 w-full justify-between items-center">
                        <div className="flex gap-3 items-start">
                            <Calendar className="size-5 text-pop-purple"/>
                            <div className="flex flex-col items-start ">
                                <p className={"font-medium text-muted-foreground"}>Start Date</p>
                                <p className="text-card-text-muted">{start}</p>
                            </div>
                        </div>
                        <div className={"flex gap-3 items-start"}>
                            <Calendar className="size-5 text-pop-purple"/>
                            <div className="flex flex-col items-start ">
                                <p className={"font-medium text-muted-foreground"}>End Date</p>
                                <p className="text-card-text-muted">{end}</p>
                            </div>
                        </div>
                        <div className={"flex gap-3 items-start"}>
                            <CircleCheck className="size-5 text-pop-green"/>
                            <div className="flex flex-col items-start ">
                                <p className={"font-medium text-muted-foreground"}>Entry Status</p>
                                <p className="text-card-text-muted">{status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Comp>
        )
    }
)
ShowInfoCard.displayName = "ShowInfoCard"

export {ShowInfoCard, showInfoCardVariants}; 