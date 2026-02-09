import {Trash2} from "lucide-react"
import {Button} from "@/components/ui/button"

function CartItemCard({show, entries}: { show: { name: string, date: string }, entries: any }) {
    return (
        <div className="border border-horse-card-border w-full rounded-lg p-6 shadow-sm">
            <div className="flex justify-between align-top gap-4 font-WEC-Primary pb-4 border-b">
                <div className="flex flex-col">
                    <p className="font-normal text-xl whitespace-nowrap">{show.name}</p>
                    <p className={"text-sm text-left"}>{show.date}</p>
                    {/*<p className={"text-xs"}>World Equestrian Center - Ocala</p>*/}
                </div>
                <div className={"flex text-danger items-top gap-2"}>
                    <Trash2 size={16}/>
                    <Button className={"hidden lg:block text-danger text-xs p-0 h-fit"}
                            variant={"link"}>Remove Entry</Button>
                </div>
            </div>
            <div>
                <div className="flex flex-col sm:flex-row items-start w-full gap-1 p-4">
                    <p className="whitespace-nowrap">Entry |</p>
                    <div className="flex sm:flex-row w-full justify-between">
                        <p className={"font-normal"}>Horseface Junior</p>
                        <p className={"font-normal"}>$50</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start w-full gap-1 p-4">
                    <p className="whitespace-nowrap">Entry |</p>
                    <div className="flex sm:flex-row w-full justify-between">
                        <p className={"font-normal"}>Horseface Junior</p>
                        <p className={"font-normal"}>$50</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start w-full gap-1 p-4">
                    <p className="whitespace-nowrap">Entry |</p>
                    <div className="flex sm:flex-row w-full justify-between">
                        <p className={"font-normal"}>Horseface Junior</p>
                        <p className={"font-normal"}>$50</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between py-4">
                <p className={"font-normal"}>Event Subtotal:</p>
                <p className={"font-normal text-WEC-Purple"}>$100</p>
            </div>
        </div>
    )
}

export {CartItemCard};
