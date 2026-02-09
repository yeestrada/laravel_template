import {OperatorCard} from "@/components/ui/operator-card.tsx";
import {BarnCard} from "./barn-card";
import {Warehouse} from "lucide-react";

type Operator = {
    firstName: string;
    lastName: string;
    id: string;
};

type Barn = {
    barnId: string;
    id: string;
};

type BarnAssignment = {
    user: Operator;
    barns: Barn[];
};

type OperatorAssignmentsProps = {
    operator: Operator;
    barnAssignments: BarnAssignment[];
    unassignBarn: (userId: string, barnId: string) => void;
};

const OperatorAssignments = ({
                                 operator,
                                 barnAssignments,
                                 unassignBarn,
                                 className = "",
                             }: OperatorAssignmentsProps & { className?: string }) => {

    // Debug logging
    console.log("operator.id:", operator?.id, typeof operator?.id);
    console.log("barnAssignments:", barnAssignments);
    barnAssignments?.forEach((a) => {
        console.log("assignment user.id:", a?.user?.id, typeof a?.user?.id);
    });


    const assignmentForOperator = barnAssignments?.find(
        (a) => a?.user?.id === operator.id
    );

    const barns = assignmentForOperator?.barns ?? [];

    return (
        <div className={`border rounded-lg flex flex-col p-2 ${className}`}>
            <div className="mb-6">
                <OperatorCard operator={operator} barns={barns}/>
            </div>
            <div className="flex flex-col gap-2">
                {barns?.map((barn: Barn, index: number) => (
                        <BarnCard
                            key={barn.id ?? index}
                            operator={operator}
                            barn={barn}
                            unassignBarn={() => unassignBarn(operator.id, barn.id)}
                        />
                ))}
            </div>

            {barns.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <Warehouse className="size-8 text-card-text-muted"/>
                    <p className={"text-card-text-muted"}>No barns assigned yet.</p>
                </div>
            )}
        </div>
    );
};

export {OperatorAssignments};