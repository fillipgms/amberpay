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

ModuleRegistry.registerModules([AllCommunityModule]);

export interface Payment {
    id: number;
    amount: string;
    fee: string;
    description: string;
    payer_name: string;
    payer_pix: string;
    payer_type: string;
    credential_description: string;
    created_at: string;
}

export type PaymentsArray = Payment[];

const WithdrawTable = ({ payments }: { payments: PaymentsArray }) => {
    const colDefs = useMemo<ColDef[]>(() => {
        return [
            {
                headerName: "ID",
                field: "id",
                pinned: "left",
                sortable: true,
                minWidth: 100,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center h-full w-full">
                            <span className="font-semibold text-sm">
                                #{p.value}
                            </span>
                        </div>
                    );
                },
            },
            {
                headerName: "Data",
                field: "created_at",
                suppressMovable: true,
                minWidth: 150,
                sortable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            <span className="text-sm">{p.value}</span>
                        </div>
                    );
                },
            },
            {
                headerName: "Pagador",
                field: "payer_name",
                suppressMovable: true,
                minWidth: 240,
                sortable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    const payerName = p.value;
                    const payerPix = p.data.payer_pix;
                    const payerType = p.data.payer_type;

                    return (
                        <div className="flex flex-col h-full w-full justify-center gap-0.5">
                            <p className="leading-none text-sm font-medium truncate">
                                {payerName}
                            </p>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] px-1.5 py-0.5 bg-foreground/10 rounded text-foreground/70 font-semibold">
                                    {payerType}
                                </span>
                                <p className="text-xs text-foreground/50 font-mono truncate">
                                    {payerPix}
                                </p>
                            </div>
                        </div>
                    );
                },
            },
            {
                headerName: "Descrição",
                field: "description",
                suppressMovable: true,
                minWidth: 280,
                flex: 1,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center h-full w-full">
                            <p className="text-sm text-foreground/80 truncate">
                                {p.value || "—"}
                            </p>
                        </div>
                    );
                },
            },
            {
                headerName: "Credencial",
                field: "credential_description",
                suppressMovable: true,
                minWidth: 160,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            <span className="px-2.5 py-1 bg-foreground/5 rounded-md text-xs font-medium text-foreground/70">
                                {p.value}
                            </span>
                        </div>
                    );
                },
            },
            {
                headerName: "Valor",
                field: "amount",
                suppressMovable: true,
                minWidth: 130,
                sortable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center justify-end h-full w-full pr-3">
                            <p className="font-bold text-base text-emerald-600 dark:text-emerald-400">
                                {p.value}
                            </p>
                        </div>
                    );
                },
            },
            {
                headerName: "Taxa",
                field: "fee",
                suppressMovable: true,
                minWidth: 110,
                sortable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center justify-end h-full w-full pr-3">
                            <p className="text-sm text-foreground/60">
                                {p.value}
                            </p>
                        </div>
                    );
                },
            },
        ];
    }, []);

    return (
        <div className="ag-theme-quartz w-full" style={{ height: "auto" }}>
            <AgGridReact
                columnDefs={colDefs}
                domLayout="autoHeight"
                rowData={payments}
                defaultColDef={{
                    cellClass: "bg-background text-foreground",
                    minWidth: 100,
                    headerClass:
                        "bg-background text-foreground/60 font-semibold text-xs uppercase tracking-wide",
                    sortable: false,
                }}
                rowHeight={64}
                animateRows={true}
            />
        </div>
    );
};

export default WithdrawTable;
