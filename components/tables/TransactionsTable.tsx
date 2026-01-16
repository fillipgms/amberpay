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

export interface Customer {
    name: string;
    email: string;
}

export interface PaymentMethod {
    type: string;
    brand?: string;
    last4?: string;
}

export interface Transaction {
    id: string;
    date: string;
    customer: Customer;
    paymentMethod: PaymentMethod;
    amount: number;
    currency: string;
    status: string;
    merchant: string;
    fees: number;
}

export type TransactionsArray = Transaction[];

const TransactionsTable = ({
    transactions,
}: {
    transactions: TransactionsArray;
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
                headerName: "Cliente",
                field: "customer",
                suppressMovable: true,

                cellRenderer: (p: ICellRendererParams) => {
                    const { name, email } = p.value;

                    return (
                        <div className="flex flex-col h-full w-full justify-center">
                            <p className="leading-none">{name}</p>
                            <p className="text-xs text-foreground/50 truncate">
                                {email}
                            </p>
                        </div>
                    );
                },
            },
            {
                headerName: "Método de Pagamento",
                field: "paymentMethod",
                suppressMovable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    const { type, brand, last4 } = p.value;

                    return (
                        <div className="flex flex-col h-full w-full justify-center">
                            <p className="leading-none">
                                {type === "credit_card"
                                    ? "Cartão de Crédito"
                                    : type}
                            </p>
                            <p className="text-xs text-foreground/50 truncate">
                                {brand} {last4 && `•••• ${last4}`}
                            </p>
                        </div>
                    );
                },
            },
            {
                headerName: "Valor",
                field: "amount",
                suppressMovable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    return <p>R$ {p.value}</p>;
                },
            },
            {
                headerName: "Status",
                field: "status",
                flex: 1,
                minWidth: 120,
                suppressMovable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    const isSuccess = p.value === "succeeded";
                    const isPending = p.value === "pending";

                    return (
                        <div className="flex items-center justify-center h-full w-full">
                            <div
                                className={twMerge(
                                    "flex items-center gap-1 justify-center max-w-40 py-1 w-full text-center px-3 rounded text-sm font-medium",
                                    isSuccess
                                        ? "bg-primary/20 text-primary"
                                        : isPending
                                        ? "bg-blue-500/20 text-blue-500"
                                        : "bg-destructive/20 text-destructive"
                                )}
                            >
                                {isSuccess ? (
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
                                <p className="truncate">
                                    {isSuccess
                                        ? "Sucesso"
                                        : isPending
                                        ? "Pendente"
                                        : "Erro"}
                                </p>
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
