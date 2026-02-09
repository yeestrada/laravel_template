import {Badge} from "./badge";
import horseHeadBlack from "../../assets/WEC_Horsehead Only_Black.png";

function EntryCard({show, horse, rider, classes}: { horse: any, rider: any, classes: any, show: any}) {
    return (
        <div className={"flex flex-col shadow-sm rounded-xl p-6 w-fit bg-WEC-White border border-horse-card-border"}>
            <p className={"text-lg mb-4"}>{show}</p>
            <div className="flex gap-2 items-center mb-2">
                <img src={horseHeadBlack} alt="" height={20} width={20}/>
                <span className={"text-base"}>{horse}</span>
            </div>
            <p className={"text-left text-card-text-muted italic text-sm mb-3"}>{rider}</p>
            <div className="flex flex-col items-start text-card-text-muted mb-4">
                <p className={"text-xs"}>Classes:</p>
                <p className={"text-sm"}>{classes}</p>
            </div>
            <Badge variant={"info"} shape={"square"} label={"Reserving Stalls"} />
        </div>
    )
}

export {EntryCard}