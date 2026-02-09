import {Palette, VenusAndMars, CalendarClock} from "lucide-react"
function HorseCard({horse} : { horse: any}) {
    return (
        <div className={"shadow-sm rounded-xl p-6 w-fit bg-WEC-White border border-horse-card-border"}>
            <div className="flex flex-col text-left gap-2 mb-2">
                <p className={"text-lg"}>{horse.name}</p>
                <p className={"text-sm text-card-text-muted"}>USEF ID: {horse.usefId}</p>
            </div>
            <div className="flex gap-4">
                <div className="flex items-center gap-1 text-card-text-muted">
                    <Palette className={"size-4"} />
                    <span>{horse.color}</span>
                </div>
                <div className="flex items-center gap-1 text-card-text-muted">
                    <VenusAndMars className={"size-4"}/>
                    <span>{horse.gender}</span>
                </div>
                <div className="flex items-center gap-1 text-card-text-muted">
                    <CalendarClock className={"size-4"}/>
                    <span>{horse.age}</span>
                </div>
            </div>
        </div>
    )
}

export { HorseCard };