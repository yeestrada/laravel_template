"use client"

// TODO: Write docs for creating columns for, and using this component. Need to include information about columns.

import {
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/baseComponents/table"
import {Input} from "@/components/ui/input"
import {useState} from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    callback: (row: TData) => any;
    selectedRequest?: StallRequest;
}

export type StallRequest = {
    id: string
    horseShowId: string
    exhibitor: Exhibitor
    numberOfStallsRequested: number
    numberOfStallsProvisioned: number
    numberOfTackRoomsRequested: number
    numberOfTackRoomsProvisioned: number
    provisionedStallIds: string[]
}

export type Exhibitor = {
    firstName: string
    lastName: string
    email: string
}

function DataTable<TData, TValue>({
                                      columns,
                                      data,
                                      callback,
                                      selectedRequest
                                  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    function formatStallsWithRanges(stalls: string[]): string {
        if (!stalls || stalls.length === 0) return '';

        const sortedStalls = [...stalls].sort((a, b) => {
            const aMatch = a.match(/^([A-Za-z]+)(\d+)$/);
            const bMatch = b.match(/^([A-Za-z]+)(\d+)$/);

            if (!aMatch || !bMatch) {
                return a.localeCompare(b);
            }

            const [, aPrefix, aNumber] = aMatch;
            const [, bPrefix, bNumber] = bMatch;

            if (aPrefix !== bPrefix) {
                return aPrefix.localeCompare(bPrefix);
            }

            return parseInt(aNumber, 10) - parseInt(bNumber, 10);
        });

        const result: string[] = [];
        let i = 0;

        while (i < sortedStalls.length) {
            const currentStall = sortedStalls[i];
            const match = currentStall.match(/^([A-Za-z]+)(\d+)$/);

            if (!match) {
                result.push(currentStall);
                i++;
                continue;
            }

            const [, prefix, numberStr] = match;
            const startNumber = parseInt(numberStr, 10);
            let endNumber = startNumber;
            let j = i + 1;

            while (j < sortedStalls.length) {
                const nextStall = sortedStalls[j];
                const nextMatch = nextStall.match(/^([A-Za-z]+)(\d+)$/);

                if (!nextMatch) break;

                const [, nextPrefix, nextNumberStr] = nextMatch;
                const nextNumber = parseInt(nextNumberStr, 10);

                if (nextPrefix === prefix && nextNumber === endNumber + 1) {
                    endNumber = nextNumber;
                    j++;
                } else {
                    break;
                }
            }

            if (endNumber > startNumber) {
                result.push(`${prefix}${startNumber}-${prefix}${endNumber}`);
            } else {
                result.push(currentStall);
            }

            i = j;
        }

        return result.join(', ');
    }

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter exhibitors..."
                    value={(table.getColumn("exhibitor_lastName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("exhibitor_lastName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm shadow-sm shadow-WEC-Black/10 bg-WEC-White dark:bg-WEC-grey-700 inset-shadow-xs inset-shadow-WEC-Black/20"
                />
            </div>
            <div className="overflow-hidden rounded-sm border border-WEC-Purple/20 shadow-sm shadow-WEC-Black/10">
                <div className="max-h-[400px] overflow-y-auto">
                    <Table className="w-full justify-between gap-4 p-4 rounded-sm dark:bg-WEC-grey-700 glass-panel-gray">
                        <TableHeader className="sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="text-center p-0 sticky top-0 z-10 dark:bg-WEC-grey-700"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => {
                                    const isSelected = selectedRequest?.id === (row.original as any).id;
                                    return (
                                        <TableRow
                                            className="text-center data-[is-selected=true]:bg-WEC-Purple/30"
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            {...(isSelected && {"data-is-selected": "true"})}
                                            onDoubleClick={(): any => {
                                                callback?.(row.original)
                                            }}
                                        >
                                            <TableCell colSpan={columns.length} className="p-0">
                                                <div className="flex flex-col">
                                                    <div className="flex">
                                                        {row.getVisibleCells().map((cell) => (
                                                            <div key={cell.id} className="flex-1 p-2">
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {(row.original as any).provisionedStallIds.length > 0 && (
                                                        <div className="border-gray-200 p-2">
                                                            <p className="text-left text-sm mb-1 italic">Assigned Stalls:</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {formatStallsWithRanges((row.original as any).provisionedStallIds)}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export {DataTable};
export type {DataTableProps};