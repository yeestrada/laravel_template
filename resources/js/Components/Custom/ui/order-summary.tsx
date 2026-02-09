"use client"

import {Button} from "@/components/ui/button.tsx";
import {Lock, Shield} from "lucide-react"

function OrderSummary({callback}: { callback: () => void }) {
    return (
        <div className={"flex flex-col shadow-md rounded-xl gap-2 p-4 w-full  bg-[#F5EFF3] border border-horse-card-border"}>
            <p className={"text-left font-normal text-xl"}>Order Summary:</p>
            <div className="flex flex-col gap-4">

                <div className={"flex justify-between items-center"}>
                    <p className={"font-normal text-base text-[#364153]"}>Subtotal (3 entries)</p>
                    <p className={"text-lg font-normal"}>$200</p>
                </div>
                <div className={"flex justify-between items-center"}>
                    <p className={"font-normal text-[#364153] text-base"}>Fees:</p>
                    <p className={"text-lg font-normal"}>$150</p>
                </div>
            </div>
            <div className={"flex justify-between border-t-2 pt-6 items-center"}>
                <p className={"font-normal text-xl"}>Total:</p>
                <p className={"text-WEC-Purple text-xl font-normal"}>$350</p>
            </div>
            <div className={"flex flex-col gap-3 justify-between items-center border-b-2 pb-2"}>
                <Button className={"w-full rounded-lg"} variant={"outline"}>Continue Shopping</Button>
                <Button className={"w-full rounded-lg bg-success border-success shadow-md"}
                        variant={"secondary"}
                        onClick={() => {
                            callback()
                        }}>Proceed To Checkout</Button>
            </div>
            <div className="flex">
                <div className={"flex justify-between items-center gap-4 mx-auto text-[#6A7282]"}>
                    <div className={"flex justify-between items-center text-xs gap-1"}>
                        <Lock size={14}/>
                        <p>Secure</p>
                    </div>
                    <div className={"flex justify-between items-center text-xs gap-1"}>
                        <Shield size={14}/>
                        <p>Protected</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export {OrderSummary};