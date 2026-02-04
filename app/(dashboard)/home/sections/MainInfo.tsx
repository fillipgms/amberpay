"use client";
import { useEffect, useRef, useState } from "react";
import { GetDashboardData } from "@/actions/dashboard";
import AddBalanceModal from "@/components/AddBalanceModal";
import CryptoWalletModal from "@/components/CryptoWalletModal";
import { Button } from "@/components/ui/button";
import WithdrawModal from "@/components/WithdrawModal";
import ArrowsOppositeDirection from "@/public/icons/arrows-opposite-direction";
import formatCurrency from "@/utils/formatCurrency";
import getRelativeTime from "@/utils/getRelativeTime";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { useGSAPAnimation, staggerFadeIn } from "@/hooks/useGSAPAnimation";
import { useDashboard } from "@/contexts/DashboardContext";

type TransactionType = "income" | "outcome" | "refund" | "transfer";

const MainInfo = () => {
    const [data, setData] = useState<dashboardDataProps | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const gsapContext = useGSAPAnimation();
    const { lastUpdate } = useDashboard();
    const hasAnimated = useRef(false);

    useEffect(() => {
        GetDashboardData().then((result) => {
            setData(result as dashboardDataProps);
        });
    }, [lastUpdate]);

    // Only animate sections on first load
    useEffect(() => {
        if (!data || !sectionRef.current || hasAnimated.current) return;

        gsapContext.current?.add(() => {
            staggerFadeIn(".main-info-item", 0.08);
        });

        hasAnimated.current = true;
    }, [data, gsapContext]);

    if (!data) return null;

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
        <section
            ref={sectionRef}
            className="py-8 px-8 flex gap-8 flex-col md:flex-row md:justify-between border-b-gradient"
        >
            <div className="space-y-1">
                <h2
                    id="saldo"
                    className="font-bold text-4xl text-primary main-info-item"
                >
                    R${" "}
                    <AnimatedNumber
                        value={data.available_balance}
                        decimals={2}
                        duration={1.2}
                    />
                </h2>
                <p id="saldoBloqueado" className="text-sm main-info-item">
                    Saldo Bloqueado:{" "}
                    <span className="font-bold">R$ {data.blocked_balance}</span>
                </p>
                {data.last_transaction && (
                    <p id="ultimaTransacao" className="text-xs main-info-item">
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
                    <div className="stat-card main-info-item">
                        <p className="text-sm">Volume Transacionado</p>
                        <h3 className="font-bold text-xl">
                            R${" "}
                            <AnimatedNumber
                                value={data.volume_transaction.value}
                                decimals={2}
                                duration={1.2}
                            />
                        </h3>
                    </div>
                    <div className="stat-card main-info-item">
                        <p className="text-sm">Ticket Médio</p>
                        <h3 className="font-bold text-xl">
                            R${" "}
                            <AnimatedNumber
                                value={data.ticket_medio}
                                decimals={2}
                                duration={1.2}
                            />
                        </h3>
                    </div>
                </div>
                <div className="flex gap-4 flex-col md:flex-row main-info-item">
                    <WithdrawModal />
                    <AddBalanceModal />
                </div>
            </div>
        </section>
    );
};

export default MainInfo;
