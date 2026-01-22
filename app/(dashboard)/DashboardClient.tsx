"use client";

import { useState, useEffect, useMemo } from "react";
import { useDashboardAnimations } from "@/hooks/useDashboardAnimations";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { DashboardHeader } from "@/components/DashboardHeader";
import { GrowthAreaChart } from "@/components/charts/GrowthAreaChart";
import { OverviewPieChart } from "@/components/charts/OverviewPieChart";
import { TransactionsPieChart } from "@/components/charts/TransactionsPieChart";
import { PortionsBarChart } from "@/components/charts/PortionsBarChart";
import { TimeFilter } from "@/components/TimeFilter";
import { StatCard } from "@/components/StatCard";

const parseBRL = (value: string | number) => {
    if (typeof value === "number") return value;
    return Number(value.replace(".", "").replace(",", "."));
};

const formatBRL = (value: number) => {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};

const parseBRDate = (date: string) => {
    const [day, month, year] = date.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
};

const formatShortDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
    });
};

const DashboardClient = ({ homeData }: { homeData: HomeData }) => {
    const [isLoading, setIsLoading] = useState(true);

    const data = useMemo(() => {
        return {
            ...homeData,
            available_balance: parseBRL(homeData.available_balance),
            blocked_balance: parseBRL(homeData.blocked_balance),
            today_sales: parseBRL(homeData.today_sales),
            today_outflows: parseBRL(homeData.today_outflows),
            sales_count: parseBRL(homeData.sales_count),
            outflows_count: parseBRL(homeData.outflows_count),
            last_7_days:
                homeData.last_7_days?.map((day) => ({
                    ...day,
                    date: parseBRDate(day.date),
                })) || [],
        };
    }, [homeData]);

    const displayValue = useAnimatedCounter(data.available_balance, isLoading);

    useDashboardAnimations(isLoading);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    const chartData = data.last_7_days.map((day) => ({
        month: formatShortDate(day.date),
        value: day.sales,
    }));

    const outflowsChartData = data.last_7_days.map((day) => ({
        month: formatShortDate(day.date),
        value: day.outflows,
    }));

    const totalSales = data.last_7_days.reduce(
        (acc, day) => acc + day.sales,
        0,
    );

    const totalOutflows = data.last_7_days.reduce(
        (acc, day) => acc + day.outflows,
        0,
    );

    if (isLoading) {
        return (
            <main className="absolute z-100 left-0 top-0 min-h-svh w-full flex items-center justify-center bg-background">
                loading...
            </main>
        );
    }

    return (
        <main>
            <DashboardHeader
                displayValue={displayValue}
                blockedBalance={formatBRL(data.blocked_balance)}
            />

            <section className="py-8 px-8 flex md:grid gap-8 flex-col md:grid-cols-3 md:justify-between border-b-gradient">
                <div className="dashboardCard md:col-span-2 border-gradient rounded-md p-4 flex flex-col justify-center gap-4 border relative overflow-hidden">
                    <h3 className="font-semibold text-xl">Crescimentos</h3>
                    <TimeFilter activeItem="7 dias" />
                    <div className="w-full h-64 rounded-xl">
                        <GrowthAreaChart data={chartData} />
                    </div>
                    <div>
                        <h5 className="text-sm">Vendas Totais (7 dias)</h5>
                        <p className="font-semibold text-lg">
                            {formatBRL(totalSales)}
                        </p>
                    </div>
                    <div className="bg-primary/50 size-200 rounded-full blur-3xl absolute -z-10 left-1/5 top-1/3" />
                </div>

                <div className="dashboardCard border-gradient rounded-md p-4 flex flex-col gap-4 border overflow-hidden">
                    <h3 className="font-semibold text-xl">Resumo</h3>
                    <TimeFilter activeItem="7 dias" />
                    <div className="flex gap-2">
                        <OverviewPieChart />
                        <div className="flex-1 flex justify-center gap-2 flex-col">
                            <div>
                                <h5 className="text-sm">Vendas</h5>
                                <h4 className="text-xl font-semibold">
                                    {formatBRL(totalSales)}
                                </h4>
                            </div>
                            <div>
                                <h5 className="text-sm">Estornos</h5>
                                <h4 className="text-xl font-semibold">
                                    {formatBRL(totalOutflows)}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 border-b-gradient" />
                    <h3 className="font-semibold text-xl">Hoje</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h5>Vendas</h5>
                            <p className="font-semibold">
                                {formatBRL(data.today_sales)}
                            </p>
                        </div>
                        <div>
                            <h5>Estornos</h5>
                            <p className="font-semibold">
                                {formatBRL(data.today_outflows)}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8 border-b-gradient py-8 px-8">
                <div className="dashboardCard border-gradient rounded-md p-4 flex flex-col gap-4 border">
                    <h3 className="font-semibold text-xl">
                        Transações (7 dias)
                    </h3>
                    <TimeFilter activeItem="7 dias" />
                    <div className="flex gap-2">
                        <TransactionsPieChart />
                        <div className="flex-1 flex gap-4 flex-wrap">
                            <div>
                                <h5 className="text-sm">Vendas</h5>
                                <h4 className="text-xl font-semibold">
                                    {data.sales_count}
                                </h4>
                            </div>
                            <div>
                                <h5 className="text-sm">Estornos</h5>
                                <h4 className="text-xl font-semibold">
                                    {data.outflows_count}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <StatCard
                        title="Formas de Pagamento"
                        items={[
                            { label: "Cartão de crédito", value: "60%" },
                            { label: "Pix", value: "30%" },
                            { label: "Cartão de débito", value: "10%" },
                        ]}
                    />
                    <StatCard
                        title="Bandeiras Mais Usadas"
                        items={[
                            { label: "Visa", value: "60%" },
                            { label: "Mastercard", value: "30%" },
                            { label: "Outros", value: "10%" },
                        ]}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <StatCard
                        title="Taxa de Recusa"
                        items={[
                            { label: "Banco Emissor", value: "60%" },
                            { label: "Antifraude", value: "30%" },
                            { label: "Outros", value: "10%" },
                        ]}
                    />
                    <StatCard
                        title="Origem das Transações"
                        items={[
                            { label: "Site", value: "60%" },
                            { label: "App", value: "30%" },
                            { label: "Link de Pagamento", value: "10%" },
                        ]}
                    />
                </div>
            </section>

            <section className="gap-8 border-b-gradient py-8 px-8 grid md:grid-cols-3">
                <div className="border p-4 rounded space-y-4">
                    <h3 className="font-semibold text-xl">
                        Quantidades de Parcelas no Cartão
                    </h3>
                    <PortionsBarChart />
                </div>

                <div className="md:col-span-2 border-gradient rounded-md p-4 flex flex-col gap-4 border relative overflow-hidden">
                    <h3 className="font-semibold text-xl">Estornos (7 dias)</h3>
                    <TimeFilter activeItem="7 dias" />
                    <div className="w-full h-64 rounded-xl">
                        <GrowthAreaChart data={outflowsChartData} />
                    </div>
                    <div>
                        <h5 className="text-sm">Estornos Totais (7 dias)</h5>
                        <p className="font-semibold text-lg">
                            {formatBRL(totalOutflows)}
                        </p>
                    </div>
                    <div className="bg-primary/50 size-200 rounded-full blur-3xl absolute -z-10 left-1/5 top-1/3" />
                </div>
            </section>
        </main>
    );
};

export default DashboardClient;
