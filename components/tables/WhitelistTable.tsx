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
import { removeIpFromWhitelist } from "@/actions/ip";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface WhitelistEntry {
    id: number;
    user_id: number;
    ip: string;
    created_at: string;
    updated_at: string;
}

export type WhitelistArray = WhitelistEntry[];

const ConfirmateDelete = ({
    onDelete,
    id,
}: {
    onDelete: (id: string) => void;
    id: string;
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className={twMerge(
                        "flex items-center gap-2 justify-center py-1 px-3 rounded text-sm font-medium",
                        "bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors",
                    )}
                >
                    <TrashIcon size={14} />
                    <span>Remover</span>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tem certeza que deseja remover este IP da whitelist?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá remover
                        permanentemente o IP da whitelist.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => onDelete?.(id)}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

const WhitelistTable = ({ whitelist }: { whitelist: WhitelistArray }) => {
    const router = useRouter();

    const onDelete = async (id: string) => {
        removeIpFromWhitelist(Number(id));
        router.refresh();
    };

    const colDefs = useMemo<ColDef[]>(() => {
        return [
            { field: "id", pinned: "left", sortable: false },
            {
                headerName: "Data",
                field: "created_at",
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
                headerName: "Ações",
                field: "actions",
                flex: 1,
                minWidth: 100,
                suppressMovable: true,
                cellRenderer: (p: ICellRendererParams) => {
                    return (
                        <div className="flex items-center justify-center">
                            <ConfirmateDelete
                                onDelete={onDelete}
                                id={p.data.id}
                            />
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
