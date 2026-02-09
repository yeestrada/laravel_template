import {Warehouse} from "lucide-react";
import {Button} from "./button";


type Operator = {
    firstName: string;
    lastName: string;
    id: string;
}

type Barn = {
    barnId: string;
    id: string;
}

type BarnCardProps = {
    operator: Operator;
    barn: Barn,
    unassignBarn: (userId: string, barnId: string) => void
}
const BarnCard = ({operator, barn, unassignBarn}: BarnCardProps) => {
    return (
        <div className="border rounded-sm flex items-center justify-center p-2 w-full">
            <div className="flex gap-2  w-full">
                <Warehouse className="size-5"/>
                <p>Barn {barn.barnId}</p>
            </div>
            <Button onClick={() => unassignBarn(operator.id, barn.id)} size={"sm"} variant="link">Remove</Button>
        </div>
    )
}

export {BarnCard}; 
