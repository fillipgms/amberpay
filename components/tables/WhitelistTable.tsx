"use client";

import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import {
    AllCommunityModule,
    type ColDef,
    ICellRendererParams,
    ModuleRegistry,
} from "ag-grid-community";
import { twMerge } from "tailwind-merge";
import { TrashIcon } from "@phosphor-icons/react";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface WhitelistEntry {
    id: string;
    date: string;
    ip: string;
    description: string;
}

export type WhitelistArray = WhitelistEntry[];

const WhitelistTable = ({
    whitelist,
    onDelete,
}: {
    whitelist: WhitelistArray;
    onDelete?: (id: string) => void;
}) => {
    const colDefs = useMemo<ColDef[]>(() => {
        return [
            { field: "id", pinned: "left", sortable: false },
            {
                headerName: "Data",
                field: "date",
                suppressMovable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    const date = new Date(p.value);

                    if (isNaN(date.getTime())) return "—";

                    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    }).format(date);

                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            {formattedDate}
                        </div>
                    );
                },
            },
            {
                headerName: "IP",
                field: "ip",
                suppressMovable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            <p className="font-mono text-sm">{p.value}</p>
                        </div>
                    );
                },
            },
            {
                headerName: "Descrição",
                field: "description",
                suppressMovable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center h-full w-full">
                            <p className="truncate">{p.value || "—"}</p>
                        </div>
                    );
                },
            },
            {
                headerName: "Ações",
                field: "actions",
                flex: 1,
                minWidth: 100,
                suppressMovable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            <button
                                onClick={() => onDelete?.(p.data.id)}
                                className={twMerge(
                                    "flex items-center gap-2 justify-center py-1 px-3 rounded text-sm font-medium",
                                    "bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                                )}
                            >
                                <TrashIcon size={14} />
                                <span>Remover</span>
                            </button>
                        </div>
                    );
                },
            },
        ];
    }, [onDelete]);

    return (
        <div className="ag-theme-quartz" style={{ height: "auto" }}>
            <AgGridReact
                columnDefs={colDefs}
                domLayout="autoHeight"
                rowData={whitelist}
                defaultColDef={{
                    flex: 1,
                    cellClass: "bg-background text-foreground",
                    minWidth: 100,
                    headerClass:
                        "bg-background text-foreground/50 font-semibold",
                }}
            />
        </div>
    );
};

export default WhitelistTable;
