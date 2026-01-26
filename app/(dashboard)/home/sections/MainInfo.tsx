import { GetDashboardData } from "@/actions/dashboard";
import { Button } from "@/components/ui/button";
import WithdrawModal from "@/components/WithdrawModal";
import ArrowsOppositeDirection from "@/public/icons/arrows-opposite-direction";
import formatCurrency from "@/utils/formatCurrency";
import getRelativeTime from "@/utils/getRelativeTime";

type TransactionType = "income" | "outcome" | "refund" | "transfer";

export const dynamic = "force-dynamic";

const MainInfo = async () => {
    const data = (await GetDashboardData()) as dashboardDataProps;

    const transactionText: Record<TransactionType, string> = {
        income: "Você recebeu",
        outcome: "Você enviou",
        refund: "Você recebeu um reembolso de",
        transfer: "Você transferiu para",
    };

    const getTransactionText = (type: string): string => {
        return transactionText[type as TransactionType] || "Transação";
    };

    return (
        <section className="py-8 px-8 flex gap-8 flex-col md:flex-row md:justify-between border-b-gradient">
            <div className="space-y-1">
                <h2 id="saldo" className="font-bold text-4xl text-primary">
                    R$ {formatCurrency(data.available_balance)}
                </h2>
                <p id="saldoBloqueado" className="text-sm">
                    Saldo Bloqueado:{" "}
                    <span className="font-bold">R$ {data.blocked_balance}</span>
                </p>
                {data.last_transaction && (
                    <p id="ultimaTransacao" className="text-xs">
                        Última transação:{" "}
                        {getTransactionText(data.last_transaction.type)} • R${" "}
                        {formatCurrency(data.last_transaction.value)} de{" "}
                        {data.last_transaction.name} •{" "}
                        {getRelativeTime(data.last_transaction.created_at)}.
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <div className="stat-card">
                        <p className="text-sm">Volume Transacionado</p>
                        <h3 className="font-bold text-xl">
                            R$ {formatCurrency(data.volume_transaction.value)}
                        </h3>
                    </div>
                    <div className="stat-card">
                        <p className="text-sm">Ticket Médio</p>
                        <h3 className="font-bold text-xl">
                            R$ {formatCurrency(data.ticket_medio)}
                        </h3>
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
    );
};

export default MainInfo;
