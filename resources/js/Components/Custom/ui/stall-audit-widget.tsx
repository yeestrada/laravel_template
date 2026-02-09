"use client";

import {useEffect, useState} from "react";
import {Label} from "@/components/baseComponents/label";
import {Textarea} from "@/components/baseComponents/textarea";
import {ToggleGroup, ToggleGroupItem} from "@/components/baseComponents/toggle-group";
import {Badge} from "@/components/ui/badge";
import { Switch } from "../baseComponents/switch";

function StallAuditWidget({stallData, reportClosed, onStallUpdated}: {
    stallData?: any;
    reportClosed?: boolean;
    onStallUpdated: ({}, id: string) => void;
}) {
    const [status, setStatus] = useState(stallData?.status || "Empty");
    const [issue, setIssue] = useState(stallData?.issue || "");
    const [isDirty, setIsDirty] = useState(stallData?.isDirty || false);

    useEffect(() => {
        if (reportClosed) return;

        const payload = {
            barnReportId: stallData.barnReportId,
            issue: issue,
            status: status,
            isDirty: (status === "Tack" && isDirty)
                || (status !== "Tack" && status !== "Empty"),
        };

        try {
            onStallUpdated(payload, stallData.id);
        } catch (error) {
            console.error("Error saving stall audit:", error);
        }
    }, [issue, status, isDirty])

    const onStatusChange = (value: string | undefined) => {
        if (reportClosed) return;
        if (value) {
            setStatus(value)
        }
    };

    return (
        <div className="stallAuditWidget">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#AE2988]">
                    {stallData?.stallId ?? "StallID"}
                </h3>
                <Badge label={stallData?.assignmentStatus}/>
            </div>

            <div className="flex flex-col gap-4">
                <ToggleGroup
                    type="single"
                    value={status}
                    onValueChange={onStatusChange}
                    className="grid grid-cols-3 gap-2 w-full mx-auto"
                    aria-label="Stall status"
                    disabled={reportClosed}
                >
                    <ToggleGroupItem key={"Standing"}
                                     value={"Standing"}
                                     className="statusButton"
                                     aria-label={"Standing"}>
                        Standing
                    </ToggleGroupItem>
                    <ToggleGroupItem key={"Laying"} value={"Laying"} className="statusButton" aria-label={"Laying"}>
                        Laying
                    </ToggleGroupItem>
                    <ToggleGroupItem key={"Braider"} value={"Braider"} className="statusButton" aria-label={"Braider"}>
                        Braider
                    </ToggleGroupItem>
                    <ToggleGroupItem key={"Tack"} value={"Tack"} className="statusButton" aria-label={"Tack"}>
                        Tack
                    </ToggleGroupItem>
                    <ToggleGroupItem key={"Bedded"} value={"Bedded"} className="statusButton" aria-label={"Bedded"}>
                        Bedded
                    </ToggleGroupItem>
                    <ToggleGroupItem key={"Empty"} value={"Empty"} className="statusButton" aria-label={"Empty"}>
                        Empty
                    </ToggleGroupItem>
                </ToggleGroup>

                <div className="grid w-full gap-3">
                    <Label htmlFor="message">Notes:</Label>
                    <Textarea
                        id="message"
                        placeholder="Type your message here."
                        className="bg-WEC-White"
                        onBlur={(e) => setIssue(e.target.value)}
                        defaultValue={issue}
                        maxLength={280}
                        disabled={reportClosed}
                    />
                </div>
                {status === "Tack" && (
                    <div className="flex items-center gap-2">
                        <Switch
                            id="stallIsDirty"
                            checked={isDirty}
                            onCheckedChange={setIsDirty}
                            disabled={reportClosed}
                        />
                        <Label htmlFor="stallIsDirty">Stall is Dirty</Label>
                    </div>
                )}
                <div className="flex justify-end">
                    {reportClosed ? (
                        <p className="text-md italic text-WEC-grey-600 mx-auto transition-all">
                            Report is closed. No changes can be made.
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export {StallAuditWidget};
