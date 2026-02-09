import {Badge} from "@/components/ui/badge.tsx";

function CheckoutShowEntryCard({entry}: { entry: { horseName: string; fee: string } }) {
    return (
        <div className="flex flex-col justify-center p-4 border rounded-md shadow-xs group-hover:border-WEC-Purple">
            <div className="flex w-full justify-between">
                <Badge label={"Entry"} shape={"square"} variant={"purple"}/>
                <p className={"font-normal"}>{entry.fee}</p>
            </div>
            <div className="flex">
                <p className={"font-normal"}>{entry.horseName}</p>

            </div>
        </div>
    )
}

export {CheckoutShowEntryCard}