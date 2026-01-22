import { memo } from "react";
import { Button } from "@/components/ui/button";
import ArrowsOppositeDirection from "@/public/icons/arrows-opposite-direction";
import WithdrawModal from "./WithdrawModal";

interface DashboardHeaderProps {
    displayValue: string;
    blockedBalance?: string;
}

export const DashboardHeader = memo(
    ({ displayValue, blockedBalance }: DashboardHeaderProps) => (
        <section className="py-8 px-8 flex gap-8 flex-col md:flex-row md:justify-between border-b-gradient">
            <div className="space-y-1">
                <h2 id="saldo" className="font-bold text-4xl text-primary">
                    R$ {displayValue}
                </h2>
                <p id="saldoBloqueado" className="text-sm">
                    Saldo Bloqueado:{" "}
                    <span className="font-bold">R$ {blockedBalance}</span>
                </p>
                <p id="ultimaTransacao" className="text-xs">
                    Última transação: Você recebeu • R$ 150,00 de Marcos • Há
                    2min.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <div className="stat-card">
                        <p className="text-sm">Volume Transacionado</p>
                        <h3 className="font-bold text-xl">R$ 441.521,17</h3>
                    </div>
                    <div className="stat-card">
                        <p className="text-sm">Ticket Médio</p>
                        <h3 className="font-bold text-xl">R$ 6,27</h3>
                    </div>
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                    <WithdrawModal />
                    <Button
                        className="action-button"
                        variant="outline"
                        disabled
                    >
                        <ArrowsOppositeDirection className="text-foreground" />
                        Adicionar Saldo
                    </Button>
                </div>
            </div>
        </section>
    ),
);

DashboardHeader.displayName = "DashboardHeader";
