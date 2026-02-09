import {CreditCard} from "lucide-react";
import { Label } from "@/components/baseComponents/label"
import { RadioGroup, RadioGroupItem } from "@/components/baseComponents/radio-group"

function CheckoutPaymentMethodCard() {
    return (
        <div className="flex flex-col flex-start px-4 py-3 border rounded-sm shadow-xs items-start w-full">
            <p className={"text-xl mb-4"}>Payment Method</p>
            <RadioGroup defaultValue="option-one" className={"bg-badge-purple-bg flex flex-col items-stretch gap-2 border-1 border-WEC-Purple rounded-sm p-4 w-full"}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <CreditCard size={20} className={"text-WEC-Purple"} />
                    <Label htmlFor="option-one" className={"font-normal"}>Credit / Debit Card</Label>
                </div>
            </RadioGroup>
            <div className="bg-[#EFF6FF] border-1 border-[#BEDBFF] flex flex-col items-stretch gap-2 rounded-sm p-2 mt-3 w-full">
                <p className={"text-sm text-[#193CB8]"}>💡 You will only be charged a deposit of <span className={"font-semibold"}>$150</span> today. The remaining balance is due before the event.</p>
            </div>
        </div>
    )
}

export {CheckoutPaymentMethodCard}