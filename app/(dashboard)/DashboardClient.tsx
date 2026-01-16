"use client";

import { useState, useEffect } from "react";
import { useDashboardAnimations } from "@/hooks/useDashboardAnimations";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { DashboardHeader } from "@/components/DashboardHeader";
import { GrowthAreaChart } from "@/components/charts/GrowthAreaChart";
import { OverviewPieChart } from "@/components/charts/OverviewPieChart";
import { TransactionsPieChart } from "@/components/charts/TransactionsPieChart";
import { PortionsBarChart } from "@/components/charts/PortionsBarChart";
import { TimeFilter } from "@/components/TimeFilter";
import { StatCard } from "@/components/StatCard";

const DashboardClient = () => {
    const [isLoading, setIsLoading] = useState(true);
    const displayValue = useAnimatedCounter(1500, isLoading);

    useDashboardAnimations(isLoading);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <main className="absolute z-100 left-0 top-0 min-h-svh w-full flex items-center justify-center bg-background">
                loading...
            </main>
        );
    }

    return (
        <main>
            <DashboardHeader displayValue={displayValue} />

            <section className="py-8 px-8 flex md:grid gap-8 flex-col md:grid-cols-3 md:justify-between border-b-gradient">
                <div className="dashboardCard md:col-span-2 border-gradient rounded-md p-4 flex flex-col justify-center gap-4 border relative overflow-hidden">
                    <h3 id="growthTitle" className="font-semibold text-xl">
                        Crescimentos
                    </h3>
                    <TimeFilter activeItem="Anual" />
                    <div className="w-full h-64 rounded-xl">
                        <GrowthAreaChart />
                    </div>
                    <div id="growthOverview">
                        <h5 className="text-sm">Ganhos Totais</h5>
                        <p className="font-semibold text-lg">R$ 15.000,00</p>
                    </div>
                    <div
                        id="chartGlow"
                        className="bg-primary/50 size-200 rounded-full blur-3xl absolute -z-10 left-1/5 top-1/3"
                    ></div>
                </div>

                <div
                    id="overview"
                    className="dashboardCard border-gradient rounded-md p-4 flex flex-col gap-4 border overflow-hidden"
                >
                    <h3 id="overviewTitle" className="font-semibold text-xl">
                        Resumo
                    </h3>
                    <TimeFilter />
                    <div className="flex gap-2">
                        <OverviewPieChart />
                        <div className="flex-1 flex justify-center gap-2 flex-col">
                            <div className="overviewLegend">
                                <div className="flex items-center gap-1">
                                    <div className="bg-primary size-2 rounded-full"></div>
                                    <h5 className="text-sm">Entradas</h5>
                                </div>
                                <h4 className="text-xl font-semibold">
                                    R$ 17.000,00
                                </h4>
                            </div>
                            <div className="overviewLegend">
                                <div className="flex items-center gap-1">
                                    <div className="bg-[#9ca3af] size-2 rounded-full"></div>
                                    <h5 className="text-sm">Saídas</h5>
                                </div>
                                <h4 className="text-xl font-semibold">
                                    R$ 2.000,00
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 border-b-gradient"></div>
                    <h3 className="font-semibold text-xl">Médias</h3>
                    <div className="flex flex-wrap justify-between md:grid md:grid-cols-3  gap-4">
                        <div className="metrics">
                            <h5>Diário</h5>
                            <p className="font-semibold">R$ 15,00</p>
                        </div>
                        <div className="metrics">
                            <h5>Semanal</h5>
                            <p className="font-semibold">R$ 15,00</p>
                        </div>
                        <div className="metrics">
                            <h5>Mensal</h5>
                            <p className="font-semibold">R$ 15,00</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8 border-b-gradient py-8 px-8">
                <div className="dashboardCard border-gradient rounded-md p-4 flex flex-col gap-4 border">
                    <h3 className="font-semibold text-xl">
                        Status das Transações
                    </h3>
                    <TimeFilter />
                    <div className="flex gap-2">
                        <TransactionsPieChart />
                        <div className="flex-1 flex items-center gap-4 flex-wrap">
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="bg-primary size-2 rounded-full"></div>
                                    <h5 className="text-sm">Aprovadas</h5>
                                </div>
                                <h4 className="text-xl font-semibold">1.150</h4>
                            </div>
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="bg-[#9ca3af] size-2 rounded-full"></div>
                                    <h5 className="text-sm">Pendente</h5>
                                </div>
                                <h4 className="text-xl font-semibold">240</h4>
                            </div>
                            <div>
                                <div className="flex gap-1 items-center">
                                    <div className="bg-destructive size-2 rounded-full"></div>
                                    <h5 className="text-sm">Estornadas</h5>
                                </div>
                                <h4 className="text-xl font-semibold">200</h4>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 border-b-gradient"></div>
                    <h3 className="font-semibold text-xl">Médias</h3>
                    <div className="flex flex-wrap justify-between md:grid md:grid-cols-3 gap-4">
                        <div>
                            <h5>Diário</h5>
                            <p className="font-semibold">R$ 15,00</p>
                        </div>
                        <div>
                            <h5>Semanal</h5>
                            <p className="font-semibold">R$ 15,00</p>
                        </div>
                        <div>
                            <h5>Mensal</h5>
                            <p className="font-semibold">R$ 15,00</p>
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
                        title="Origem das TransaÃ§Ãµes"
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

                <div className="md:col-span-2 border-gradient rounded-md p-4 flex flex-col justify-center gap-4 border relative overflow-hidden">
                    <h3 className="font-semibold text-xl">Crescimentos</h3>
                    <TimeFilter />
                    <div className="w-full h-64 rounded-xl">
                        <GrowthAreaChart />
                    </div>
                    <div>
                        <h5 className="text-sm">Ganhos Totais</h5>
                        <p className="font-semibold text-lg">R$ 15.000,00</p>
                    </div>
                    <div className="bg-primary/50 size-200 rounded-full blur-3xl absolute -z-10 left-1/5 top-1/3"></div>
                </div>
            </section>
        </main>
    );
};

export default DashboardClient;
