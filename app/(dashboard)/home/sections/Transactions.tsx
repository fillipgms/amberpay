"use client";
import { useEffect, useRef, useState } from "react";
import { GetTransactionsData } from "@/actions/dashboard";
import { TransactionsPieChart } from "@/components/charts/TransactionsPieChart";
import { StatCard } from "@/components/StatCard";
import TimeFilter from "@/components/TimeFilter";
import formatCurrency from "@/utils/formatCurrency";
import { useGSAPAnimation, scaleIn, staggerFadeIn } from "@/hooks/useGSAPAnimation";

type PeriodType = "today" | "week" | "month" | "year";

const Transactions = ({
    filter,
    searchParams,
}: {
    filter: string;
    searchParams: Record<string, string | string[] | undefined>;
}) => {
    const [data, setData] = useState<any>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const gsapContext = useGSAPAnimation();
    const hasAnimated = useRef(false);

    useEffect(() => {
        GetTransactionsData(filter).then(setData);
    }, [filter]);

    // Only animate sections on first load
    useEffect(() => {
        if (!data || !sectionRef.current || hasAnimated.current) return;

        gsapContext.current?.add(() => {
            staggerFadeIn(".transaction-item", 0.1, 0.6);
        });

        hasAnimated.current = true;
    }, [data, gsapContext]);

    if (!data) return null;

    const periodText: Record<PeriodType, string> = {
        today: "Hoje",
        week: "7 dias",
        month: "31 dias",
        year: "Um Ano",
    };

    const getPeriodText = (type: string): string => {
        return periodText[type as PeriodType] || "Transação";
    };

    return (
        <>
            <div
                ref={sectionRef}
                className="dashboardCard border-gradient rounded-md p-4 flex flex-col gap-4 border md:col-span-2 transaction-item"
            >
                <h3 className="font-semibold text-xl">
                    Transações {`(${getPeriodText(data.filter)})`}
                </h3>
                <TimeFilter
                    paramKey="transactions_filter"
                    searchParams={searchParams}
                    baseUrl={"/"}
                    variant={"type"}
                    activeItem={filter}
                />
                <div className="flex gap-2 flex-1 items-center">
                    <TransactionsPieChart data={data.transaction_status} />
                    <div className="flex-1 flex gap-4 flex-wrap">
                        <div>
                            <div className="flex items-center gap-1">
                                <div className="bg-primary rounded-full size-2"></div>
                                <h5 className="text-sm">Aprovadas</h5>
                            </div>
                            <h4 className="text-xl font-semibold">
                                {data.transaction_status.approved.count}
                            </h4>
                        </div>

                        <div>
                            <div className="flex items-center gap-1">
                                <div className="bg-[#9ca3af] rounded-full size-2"></div>
                                <h5 className="text-sm">Pendentes</h5>
                            </div>
                            <h4 className="text-xl font-semibold">
                                {data.transaction_status.pending.count}
                            </h4>
                        </div>

                        <div>
                            <div className="flex items-center gap-1">
                                <div className="bg-destructive rounded-full size-2"></div>
                                <h5 className="text-sm">Estornadas</h5>
                            </div>
                            <h4 className="text-xl font-semibold">
                                {data.transaction_status.refunded.count}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="transaction-item">
                    <StatCard
                        title="Taxa de Recusa"
                        items={data.refusal_rate.items}
                    />
                </div>
                <div className="transaction-item">
                    <StatCard
                        title="Origem das Transações"
                        items={data.origins.items}
                    />
                </div>
            </div>
        </>
    );
};

export default Transactions;
