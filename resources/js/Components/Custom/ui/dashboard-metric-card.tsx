"use client"
import { Hash, TriangleAlert, EqualNot } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

function DashboardMetricCard({label, icon, value, className, loading}: {label?: string, icon?: "hash" | "alert" | "discrepancy", value?: string | number, className?: string, loading?: boolean}) {
    return (
        <div className={`bg-WEC-White rounded-sm p-4 pb-8 flex flex-col w-full ${className}`}>
            <div className="flex justify-between w-full items-center">
                <p className="font-semibold">{label}</p>
                {icon === "alert" ? <TriangleAlert className="size-4 text-WEC-Purple"/> : null}
                {icon === "hash" ? <Hash className="size-4 text-WEC-Purple"/> : null}
                {icon === "discrepancy" ? <EqualNot className="size-4 text-WEC-Purple"/> : null}
            </div>
            <div className="text-xl font-bold text-WEC-Purple">{loading ? <Spinner className={"size-6 text-WEC-Purple"}/> : value }</div>
            {/*<div className="text-sm font-light text-WEC-grey-600">100% Remaining</div>*/}
        </div>
    )
}

export { DashboardMetricCard };