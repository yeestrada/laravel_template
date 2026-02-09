"use client"
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/baseComponents/hover-card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/baseComponents/popover.tsx";
import {StallAuditWidget} from "@/components/ui/stall-audit-widget";
import {useMemo, useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {cn} from "@/lib/utils";

// TODO: This may require some info on how to use/modify it.

type BarnMapProps = {
    passedBarn?: { barnId: string; stalls: Array<any> };
    stallReport?: { barnId: string; stallAudits: Array<any> };
    reportClosed?: boolean;
    selectedRequest?: StallRequest;
    onStallUpdated: ({}, id: string) => void;
    isSummary?: boolean;
    callback?: (stallId: string) => void;
    clickedStalls?: string[];
    loading?: boolean;
    className?: string;
};

type StallRequest = {
    id: string
    horseShowId: string
    exhibitor: Exhibitor
    numberOfStallsRequested: number
    numberOfStallsProvisioned: number
    numberOfTackRoomsRequested: number
    numberOfTackRoomsProvisioned: number
    provisionedStallIds: string[]
}

type Exhibitor = {
    firstName: string
    lastName: string
    email: string
}

function BarnMap({
                     passedBarn,
                     stallReport,
                     reportClosed,
                     isSummary = false,
                     onStallUpdated,
                     selectedRequest,
                     clickedStalls,
                     callback,
                     loading,
                     className
                 }: BarnMapProps) {
    const [selectedStall, setSelectedStall] = useState<any>();
    const stalls = stallReport?.stallAudits || passedBarn?.stalls || [];
    let barn: { barnId: string; stalls: Array<any> } | undefined = passedBarn;
    const columnToIndex = (col: string) => {
        let n = 0;
        const up = col.toUpperCase();
        for (let i = 0; i < up.length; i++) {
            n = n * 26 + (up.charCodeAt(i) - 64);
        }
        return n;
    };

    const maxCols = useMemo(() => {
        if (!stalls?.length) return 1;
        return stalls.reduce(
            (max: number, s: { column: string }) => Math.max(max, columnToIndex(s.column)),
            1
        );
    }, [stalls]);

    const maxRows = useMemo(() => {
        if (!stalls?.length) return 1;
        return stalls.reduce(
            (max: number, s: { row: number }) => Math.max(max, s.row),
            1
        );
    }, [stalls]);

    // Determine which columns have stalls (occupied) vs empty (hallways)
    const occupiedCols = useMemo(() => {
        const cols = new Set<number>();
        stalls.forEach((s: { column: string }) => cols.add(columnToIndex(s.column)));
        return cols;
    }, [stalls]);

    // Determine which rows have stalls (occupied) vs empty (hallways)
    const occupiedRows = useMemo(() => {
        const rows = new Set<number>();
        stalls.forEach((s: { row: number }) => rows.add(s.row));
        return rows;
    }, [stalls]);

    // Hallway size - provides visual separation between stall groups
    // This is the size for a single hallway gap (consecutive empty rows/cols are collapsed)
    const hallwaySize = '12px';

    // Build gridTemplateColumns: occupied columns get minmax(44px, 80px)
    // For empty columns: first empty in a consecutive group gets hallwaySize, rest get 0px
    const gridTemplateColumns = useMemo(() => {
        const colSizes: string[] = [];
        for (let col = 1; col <= maxCols; col++) {
            if (occupiedCols.has(col)) {
                colSizes.push('minmax(44px, 80px)');
            } else {
                // Check if previous column was also empty (consecutive)
                const prevWasEmpty = col > 1 && !occupiedCols.has(col - 1);
                colSizes.push(prevWasEmpty ? '0px' : hallwaySize);
            }
        }
        return colSizes.join(' ');
    }, [maxCols, occupiedCols]);

    // Build gridTemplateRows: occupied rows get auto
    // For empty rows: first empty in a consecutive group gets hallwaySize, rest get 0px
    const gridTemplateRows = useMemo(() => {
        const rowSizes: string[] = [];
        for (let row = 1; row <= maxRows; row++) {
            if (occupiedRows.has(row)) {
                rowSizes.push('auto');
            } else {
                // Check if previous row was also empty (consecutive)
                const prevWasEmpty = row > 1 && !occupiedRows.has(row - 1);
                rowSizes.push(prevWasEmpty ? '0px' : hallwaySize);
            }
        }
        return rowSizes.join(' ');
    }, [maxRows, occupiedRows]);

    const exhibitorsEqual = (a?: any, b?: any) => {
        if (!a || !b) return false;
        if (a.email && b.email) {
            return String(a.email).toLowerCase() === String(b.email).toLowerCase();
        }
        const nameA = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim().toLowerCase();
        const nameB = `${b.firstName ?? ""} ${b.lastName ?? ""}`.trim().toLowerCase();
        return !!nameA && nameA === nameB;
    };

    const highlightedStallIds = useMemo(() => {
        const ids = new Set<string>();
        const req = selectedRequest;

        if (!req || !barn?.stalls) return ids;

        // 1) Highlight explicitly provisioned stallIds on the request
        (req.provisionedStallIds ?? []).forEach(id => ids.add(id));

        // 2) Also highlight stalls that currently show the same exhibitor
        if (req.exhibitor) {
            for (const stall of barn.stalls) {
                if (exhibitorsEqual(stall?.exhibitor, req.exhibitor)) {
                    ids.add(stall.stallId);
                }
            }
        }

        return ids;
    }, [selectedRequest, barn]);

    function getStatusClasses(isSelected: boolean,
                              hasHorseStatus: boolean,
                              hasBeddedStatus: boolean,
                              hasTackStatus: boolean) {
        if (isSelected) return selectedClasses;
        if (hasHorseStatus) return horseClasses;
        if (hasBeddedStatus) return beddedClasses;
        if (hasTackStatus) return tackClasses;
        return greyClasses;
    }

    function getPassedBarnClasses(isAssigned: boolean, isProvisioned: boolean, isAvailable: boolean) {
        if (isAssigned) return greenClasses;
        if (isProvisioned) return blueClasses;
        return isAvailable ? greyClasses : unavailableClasses;
    }

    const baseClasses =
        "flex items-center justify-center p-4 rounded-xs text-sm font-semibold shadow-md border-2 border-transparent cursor-pointer transition";
    const greyClasses =
        "bg-stall-available text-WEC-White dark:text-WEC-Black hover:bg-WEC-White hover:text-stall-available hover:border-2 hover:border-stall-available";
    const selectedClasses =
        "bg-WEC-White border-2 !border-WEC-Black text-WEC-Black hover:bg-WEC-White hover:text-WEC-Black hover:border-2 hover:border-WEC-Black";
    const greenClasses =
        "bg-success text-WEC-White dark:text-WEC-Black hover:bg-WEC-White hover:text-success hover:border-2 hover:border-success";
    const blueClasses =
        "bg-stall-provisioned text-WEC-White hover:bg-WEC-White hover:text-stall-provisioned hover:border-2 hover:border-stall-provisioned";
    const redClasses =
        "bg-danger text-WEC-White dark:text-WEC-Black hover:bg-WEC-White hover:text-danger hover:border-2 hover:border-danger";
    const unavailableClasses =
        "bg-stall-unavailable border-stall-unavailable-border text-stall-unavailable-text hover:bg-WEC-White hover:text-stall-unavailable-text hover:border-2 hover:border-stall-unavailable-text";
    const horseClasses =
        "bg-stall-status-horse text-WEC-White dark:text-WEC-Black hover:bg-WEC-White hover:text-stall-status-horse hover:border-2 hover:border-stall-status-horse";
    const beddedClasses =
        "bg-stall-status-bedded text-WEC-White dark:text-WEC-Black hover:bg-WEC-White hover:text-stall-status-bedded hover:border-2 hover:border-stall-status-bedded";
    const tackClasses =
        "bg-stall-status-tack text-WEC-White dark:text-WEC-Black hover:bg-WEC-White hover:text-stall-status-tack hover:border-2 hover:border-stall-status-tack";

    return (
        <div className={cn("flex flex-row items-start justify-center w-full", className)}>
            {loading ? (
                <Spinner className={"size-11 text-WEC-Purple"}/>
            ) : stalls && (
                <div
                    className="grid gap-2 p-4 rounded-sm overflow-x-auto overflow-y-auto max-h-[1000px]"
                    style={{
                        gridTemplateColumns: gridTemplateColumns,
                        gridTemplateRows: gridTemplateRows,
                    }}
                >
                    {stalls.map((stall: any) => {
                        const isSelected = selectedStall?.stallId === stall.stallId;
                        const hasBeenAudited = stall?.auditState !== "Unchanged";
                        const isProvisioned = stall?.status === "Provisioned";
                        const isAssigned = stall?.status === "Assigned";
                        const isAvailable = stall?.status === "Available";
                        const hasDiscrepancy = stall.assignmentStatus === "Unassigned" &&
                            (stall.status === "Tack" ||
                                stall.status === "Bedded" ||
                                stall.status === "Standing" ||
                                stall.status === "Laying" ||
                                stall.status === "Braider");
                        const isHighlighted = highlightedStallIds.has(stall.stallId);
                        const hasHorseStatus = stall?.status === "Standing" || stall?.status === "Laying" || stall?.status === "Braider";
                        const hasBeddedStatus = stall?.status === "Bedded";
                        const hasTackStatus = stall?.status === "Tack";
                        const isAClickedStall = clickedStalls?.includes(stall.stallId);
                        
                        let classes;

                        if (isSummary || stallReport) {
                            classes = getStatusClasses(isSelected, hasHorseStatus, hasBeddedStatus, hasTackStatus);
                        } else if (passedBarn) {
                            classes = getPassedBarnClasses(isAssigned, isProvisioned, isAvailable);
                        } else {
                            classes = greyClasses;
                        }

                        return stallReport ? (
                            <Popover key={`${stall.stallId}`}>
                                <PopoverTrigger asChild>
                                    <div
                                        className={`${baseClasses} ${classes}`}
                                        style={{
                                            gridColumn: columnToIndex(stall.column),
                                            gridRow: stall.row,
                                        }}
                                        aria-selected={isSelected}
                                        data-stall-id={stall.stallId}
                                        data-has-been-audited={hasBeenAudited}
                                        data-has-discrepancy={hasDiscrepancy}
                                        data-has-horse-status={hasHorseStatus}
                                        data-has-bedded-status={hasBeddedStatus}
                                        data-has-tack-status={hasTackStatus}
                                        onClick={() => setSelectedStall(stall)}
                                    >
                                        {stall.stallId}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent side="left" sideOffset={55} className="popoverContent">
                                    <StallAuditWidget
                                        stallData={selectedStall}
                                        reportClosed={reportClosed}
                                        onStallUpdated={onStallUpdated}
                                    />
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <HoverCard key={`${stall.stallId}`}>
                                <HoverCardTrigger asChild>
                                    <div
                                        className={`highlightStall ${baseClasses} ${classes}`}
                                        style={{
                                            gridColumn: columnToIndex(stall.column),
                                            gridRow: stall.row,
                                        }}
                                        aria-selected={isSelected}
                                        data-stall-id={stall.stallId}
                                        data-has-been-audited={hasBeenAudited}
                                        data-exhibitors-match={isHighlighted ? "true" : "false"}
                                        data-is-available={isAvailable ? "true" : "false"}
                                        data-has-discrepancy={hasDiscrepancy}
                                        data-is-clicked-stall={isAClickedStall ? "true" : "false"}
                                        onClick={() => {
                                            setSelectedStall(stall)
                                            if (callback) {
                                                callback(stall.stallId);
                                            }
                                        }}
                                    >
                                        {stall.stallId}
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <ul>
                                        <li>{stall.stallId}</li>
                                        <li>
                                            <i>{stall.status}</i>
                                        </li>
                                        <li>{stall.exhibitor && stall.exhibitor.lastName}</li>
                                        <li>{stall.exhibitor && stall.exhibitor.email}</li>
                                    </ul>
                                </HoverCardContent>
                            </HoverCard>
                        );

                    })}
                </div>
            )}
        </div>
    );
}

export {BarnMap};
export type {BarnMapProps};