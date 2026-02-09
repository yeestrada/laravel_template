import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/baseComponents/accordion"
import {CheckoutShowEntryCard} from "@/components/ui/checkout-show-entry-card.tsx";
import {CalendarDays, MapPin} from "lucide-react"

export default function CheckoutShowContainer({show}: {
    show: { name: string, date: string, location: string, entries?: [] }
}) {
    return (
        <div className={"flex flex-col shadow-sm w-full"}>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className={"group px-6 py-4"}>
                        <div className="flex items-baseline justify-between w-full flex-wrap">
                            <div className="flex flex-col gap-2">
                                <p className={"text-xl font-normal group-hover:underline"}>{show.name}</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <div className={"flex items-center gap-2 no-underline"}>
                                        <CalendarDays size={14}/>
                                        <p className={"text-sm text-card-text-muted whitespace-nowrap"}>{show.date}</p>
                                    </div>
                                    <div className={"flex items-center gap-2 no-underline"}>
                                        <MapPin size={14}/>
                                        <p className={"text-sm text-card-text-muted whitespace-nowrap"}>{show.location}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 items-baseline">
                                <p className={"text-sm whitespace-nowrap"}>3 Items</p>
                                <p className={"text-WEC-Purple font-normal text-lg"}>$350.00</p>
                            </div>
                        </div>

                    </AccordionTrigger>
                    <AccordionContent className={"px-6"}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-3">
                            {/*entries.map(entry =><CheckoutShowEntryCard entry={{horseName: "Horseface Junior", fee: "$100"}})/>*/}
                            <CheckoutShowEntryCard entry={{horseName: "Horseface Junior", fee: "$100"}}/>
                            <CheckoutShowEntryCard entry={{horseName: "Horseface Junior", fee: "$100"}}/>
                            <CheckoutShowEntryCard entry={{horseName: "Horseface Junior", fee: "$100"}}/>
                            <CheckoutShowEntryCard entry={{horseName: "Horseface Junior", fee: "$100"}}/>
                            <CheckoutShowEntryCard entry={{horseName: "Horseface Junior", fee: "$100"}}/>
                            <CheckoutShowEntryCard entry={{horseName: "Horseface Junior", fee: "$100"}}/>
                            <CheckoutShowEntryCard entry={{horseName: "Horseface Junior", fee: "$100"}}/>
                            <CheckoutShowEntryCard entry={{horseName: "Horseface Junior", fee: "$100"}}/>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export {CheckoutShowContainer}