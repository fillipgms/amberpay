"use client";

import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import {
    AllCommunityModule,
    type ColDef,
    ICellRendererParams,
    ModuleRegistry,
} from "ag-grid-community";
import { approveWithdrawal, refuseWithdrawal } from "@/actions/withdrawal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const handleApprove = async (id: number) => {
        setLoadingId(id);
        try {
            const result = await approveWithdrawal(id);

            if (result.data.status === 1) {
                toast.success(result.data.msg || "Saque aprovado com sucesso!");
                router.refresh();
            } else {
                toast.error(result.data.msg || "Erro ao aprovar saque");
            }
        } catch (error) {
            toast.error("Ocorreu um erro interno");
        } finally {
            setLoadingId(null);
        }
    };

    const handleRefuse = async (id: number) => {
        setLoadingId(id);
        try {
            const result = await refuseWithdrawal(id);

            if (result.data.status === 1) {
                toast.success(result.data.msg || "Saque recusado com sucesso!");
                router.refresh();
            } else {
                toast.error(result.data.msg || "Erro ao recusar saque");
            }
        } catch (error) {
            toast.error("Ocorreu um erro interno");
        } finally {
            setLoadingId(null);
        }
    };

    const colDefs = useMemo<ColDef[]>(() => {
        return [
            {
                headerName: "Ações",
                field: "id",
                pinned: "left",
                minWidth: 180,
                maxWidth: 180,
                cellRenderer: (p: ICellRendererParams) => {
                    const isLoading = loadingId === p.value;

                    return (
                        <div className="flex items-center gap-2 h-full w-full">
                            <button
                                onClick={() => handleApprove(p.value)}
                                disabled={isLoading}
                                className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white text-xs font-medium rounded transition-colors"
                            >
                                {isLoading ? "..." : "Aprovar"}
                            </button>
                            <button
                                onClick={() => handleRefuse(p.value)}
                                disabled={isLoading}
                                className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white text-xs font-medium rounded transition-colors"
                            >
                                {isLoading ? "..." : "Recusar"}
                            </button>
                        </div>
                    );
                },
            },
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
    }, [loadingId]);

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
