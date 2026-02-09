import {Truck, Shield} from "lucide-react"

function LegalDisclaimerCard() {
    return (
        <div className={"flex flex-col shadow-md rounded-xl gap-2 w-full border border-horse-card-border"}>
            <div className="flex flex-col">
                <div className={"flex items-start p-4 gap-4 hover: bg-card-"}>
                    <Truck className={"text-WEC-Purple shrink-0"} size={24}/>
                    <div className="flex flex-col text-left">
                        <p className={"font-normal"}>Event Information</p>
                        <p className={"text-[#4A5565] text-sm font-normal "}>All entries are confirmed upon payment. You'll receive a confirmation email within 24 hours.</p>
                    </div>
                </div>
                <div className={"flex items-start p-4 gap-4 hover: bg-card-"}>
                    <Shield className={"text-WEC-Purple shrink-0"} size={24}/>
                    <div className="flex flex-col text-left">
                        <p className={"font-normal"}>Event Information</p>
                        <p className={"text-[#4A5565] text-sm font-normal "}>Free cancellation up to 7 days before the event. 50% refund within 3 days.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {LegalDisclaimerCard};