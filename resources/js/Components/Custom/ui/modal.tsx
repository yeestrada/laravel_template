"use client"
import {Button} from "@/components/ui/button";
import {PageHeader} from "@/components/ui/PageHeader.tsx";
import * as React from "react";

export type ModalProps = {
    children?: React.ReactNode
    onSubmit?: Function
    onCancel?: Function
    heading?: string
    btnText?: string
    description?: string
}

function Modal({children, onCancel, onSubmit, heading, btnText, description}: ModalProps) {

    return (
        <div className="flex justify-center items-center z-50 bg-WEC-Black/80 fixed inset-0" >
            <div
                className="bg-WEC-White p-6 gap-6 flex flex-col rounded-xl min-w-sm max-w-3xl shadow-lg overflow-hidden relative shadow-WEC-Black/30 border-btn-primary-hover border-2 z-50" >
                <PageHeader className={"mb-0!"} title={heading ? heading : ""} description={description ? description : ""} />
                <div className="flex justify-between gap-4 relative z-50 items-baseline-last" >
                    {children}
                </div >
                <div className="mt-8 flex items-center justify-end gap-3 border-t pt-6" >
                    <Button className="border-danger text-danger" variant={"link"}  onClick={() => {
                        if (onCancel) onCancel()
                    }} >Cancel</Button >
                    <Button variant={"secondary"} onClick={() => {
                        if (onSubmit) onSubmit()
                    }} >{btnText}</Button >
                </div >
            </div >
        </div >
    );
}

export {Modal}
