import { Warehouse, ChartBarStacked, Users } from "lucide-react";

type AdminMetricCardProps = {
    headerLabel: string;
    data: string;
    dataLabel: string;
    icon: "warehouse" | "users" | "reports"
}

const AdminMetricCard = ({headerLabel, data, dataLabel, icon}: AdminMetricCardProps ) => {
    return (
        <div className="flex flex-col p-6 rounded-lg gap-5 border bg-white w-full">
            <div className="flex justify-between items-center">
                <p>{headerLabel}</p>
              {icon === "warehouse" ? <Warehouse className="size-5 text-pop-blue"/> : null}
                {icon === "users" ? <Users className="size-5 text-pop-purple"/> : null}
                {icon === "reports" ? <ChartBarStacked className="size-4 text-pop-orange"/> : null}

            </div>
            <div className="flex flex-col self-start gap-1">
                <p className="text-left text-2xl font-bold">{data}</p>
                <p className="text-xs font-light text-card-text-muted"># {dataLabel}</p>
            </div>
        </div>
    )
}

export { AdminMetricCard };
