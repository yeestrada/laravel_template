import {Badge} from "@/components/ui/badge.tsx";
import {CircleUser} from "lucide-react";

type Barn = {
    barnId: string;
    id: string;
}

type Operator = {
    firstName: string;
    lastName: string;
    id: string;
}

type OperatorCardProps = {
    operator: Operator;
    barns: Barn[];
}

const OperatorCard = ({operator, barns}: OperatorCardProps) => {
    return (
        <div className="border rounded-lg flex bg-feature-card justify-between align-middle">
            <div className={"flex items-center gap-4"}>
                <div className={"p-4 bg-[#030213]/10"}>
                    <CircleUser/>
                </div>
                <div className={"flex flex-col items-start"}>
                    <p className={"whitespace-nowrap"}>{operator?.firstName ?? "First"} {operator?.lastName ?? "Last"}</p>
                </div>
            </div>
            {barns?.length > 0 &&
                <div className={"mt-2 mr-2"}>
                    <Badge shape={"square"}
                           label={`${barns?.length} barns assigned`}
                           className={"whitespace-nowrap"}></Badge>
                </div>
            }
        </div>
    )
}

export {OperatorCard};