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
import { CheckIcon, ClockIcon, XIcon } from "@phosphor-icons/react";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface Transaction {
    id: string;
    id_bank: string;
    userName: string;
    userEmail: string;
    getaway: string;
    type: string; // "Entrada" | "Saída"
    status: string; // "Aprovada" | "Pendente" | "Recusada"
    amount: string;
    fee: string;
    split: string;
    origin: string;
    application: string;
    description: string;
    payer_name: string;
    payer_document: string;
    credential_description: string;
    webhook: string | null;
    created_at: string;
}

export type TransactionsArray = Transaction[];

const TransactionsTable = ({
    transactions,
}: {
    transactions: TransactionsArray;
}) => {
    const colDefs = useMemo<ColDef[]>(() => {
        return [
            {
                headerName: "ID",
                field: "id",
                pinned: "left",
                sortable: false,
                minWidth: 200,
            },
            {
                headerName: "Data",
                field: "created_at",
                suppressMovable: true,
                minWidth: 150,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            {p.value}
                        </div>
                    );
                },
            },
            {
                headerName: "Usuário",
                field: "userName",
                suppressMovable: true,
                minWidth: 200,
                cellRenderer: (p: ICellRendererParams) => {
                    const userName = p.value;
                    const userEmail = p.data.userEmail;

                    return (
                        <div className="flex flex-col h-full w-full justify-center">
                            <p className="leading-none">{userName}</p>
                            <p className="text-xs text-foreground/50 truncate">
                                {userEmail}
                            </p>
                        </div>
                    );
                },
            },
            {
                headerName: "Pagador",
                field: "payer_name",
                suppressMovable: true,
                minWidth: 200,
                cellRenderer: (p: ICellRendererParams) => {
                    const payerName = p.value;
                    const payerDocument = p.data.payer_document;

                    return (
                        <div className="flex flex-col h-full w-full justify-center">
                            <p className="leading-none">{payerName}</p>
                            <p className="text-xs text-foreground/50 truncate">
                                {payerDocument}
                            </p>
                        </div>
                    );
                },
            },
            {
                headerName: "Tipo",
                field: "type",
                suppressMovable: true,
                minWidth: 100,
                cellRenderer: (p: ICellRendererParams) => {
                    const isEntrada = p.value === "Entrada";

                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            <span
                                className={twMerge(
                                    "px-2 py-1 rounded text-xs font-medium",
                                    isEntrada
                                        ? "bg-primary/20 text-primary"
                                        : "bg-orange-500/20 text-orange-500"
                                )}
                            >
                                {p.value}
                            </span>
                        </div>
                    );
                },
            },
            {
                headerName: "Gateway",
                field: "getaway",
                suppressMovable: true,
                minWidth: 120,
            },
            {
                headerName: "Origem",
                field: "origin",
                suppressMovable: true,
                minWidth: 100,
            },
            {
                headerName: "Aplicação",
                field: "application",
                suppressMovable: true,
                minWidth: 100,
            },
            {
                headerName: "Credencial",
                field: "credential_description",
                suppressMovable: true,
                minWidth: 180,
            },
            {
                headerName: "Valor",
                field: "amount",
                suppressMovable: true,
                minWidth: 120,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            <p className="font-semibold">{p.value}</p>
                        </div>
                    );
                },
            },
            {
                headerName: "Taxa",
                field: "fee",
                suppressMovable: true,
                minWidth: 100,
            },
            {
                headerName: "Status",
                field: "status",
                flex: 1,
                minWidth: 120,
                suppressMovable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    const isApproved = p.value === "Aprovada";
                    const isPending = p.value === "Pendente";

                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            <div
                                className={twMerge(
                                    "flex items-center gap-1 justify-center max-w-40 py-1 w-full text-center px-3 rounded text-sm font-medium",
                                    isApproved
                                        ? "bg-primary/20 text-primary"
                                        : isPending
                                        ? "bg-blue-500/20 text-blue-500"
                                        : "bg-destructive/20 text-destructive"
                                )}
                            >
                                {isApproved ? (
                                    <div className="size-fit">
                                        <CheckIcon size={12} />
                                    </div>
                                ) : isPending ? (
                                    <div className="size-fit">
                                        <ClockIcon size={12} />
                                    </div>
                                ) : (
                                    <div className="size-fit">
                                        <XIcon size={12} />
                                    </div>
                                )}
                                <p className="truncate">{p.value}</p>
                            </div>
                        </div>
                    );
                },
            },
        ];
    }, []);

    return (
        <div className="ag-theme-quartz" style={{ height: "auto" }}>
            <AgGridReact
                columnDefs={colDefs}
                domLayout="autoHeight"
                rowData={transactions}
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

export default TransactionsTable;
