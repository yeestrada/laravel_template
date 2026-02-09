import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx"
import {useState} from "react";

type AssignBarnToOperatorProps = {
    barns: Barn[];
    operators: Operator[];
    callback: (userId: string, barnId: string) => void;
}

type Operator = {
    firstName: string;
    lastName: string;
    id: string;
}

type Barn = {
    barnId: string;
    id: string;
}

const AssignBarnToOperator = ({barns, operators, callback}: AssignBarnToOperatorProps) => {
    const [selectedBarn, setSelectedBarn] = useState("")
    const [selectedOperator, setSelectedOperator] = useState("");

    return (
        <div className="flex flex-col p-6 border rounded-lg bg-white">
            <div className="flex flex-col items-start">
                <p className="mb-7 font-semibold">Assign Barn To Operator</p>
                <p className="text-card-text-muted">Select a barn and assign it to an available operator</p>
            </div>
            <div className="flex gap-4 mt-2 mb-4">
                <div className="flex flex-col w-full">
                    <p className="text-left font-medium">Select A Barn</p>
                    <Select onValueChange={(value: string) => {
                        setSelectedBarn(value)
                    }}>
                        <SelectTrigger className="bg-WEC-White dark:bg-WEC-grey-700">
                            <SelectValue placeholder="Select a Barn"/>
                        </SelectTrigger>
                        <SelectContent>
                            {barns?.map((barn) => (
                                <SelectItem key={barn.id} value={barn?.id?.toString()}>
                                    {barn.barnId}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col w-full">
                    <p className="text-left font-medium">Select Operator</p>
                    <Select onValueChange={(value: string) => {
                        setSelectedOperator(value)
                    }}>
                        <SelectTrigger className="bg-WEC-White dark:bg-WEC-grey-700">
                            <SelectValue placeholder="Select a Operator"/>
                        </SelectTrigger>
                        <SelectContent>
                            {operators?.map((operator) => (
                                <SelectItem key={operator.id} value={operator?.id?.toString()}>
                                    {operator.firstName} {operator.lastName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button onClick={() => callback(selectedOperator,selectedBarn)}>Assign Barn </Button>
        </div>
    )
}

export {AssignBarnToOperator};
