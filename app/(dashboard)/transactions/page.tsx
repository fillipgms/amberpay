"use client";

import {
    Card,
    CardTitle,
    CardBody,
    CardValue,
    CardCompare,
} from "@/components/Card";
import { TransactionsChart } from "@/components/charts/TransactionsChart";
import TransactionsTable from "@/components/tables/TransactionsTable";
import { TimeFilter } from "@/components/TimeFilter";
import { transactionsData } from "@/constants/transacionsData";
import { usePageAnimations } from "@/hooks/usePageAnimations";
import { useEffect, useState } from "react";

export default function TransacionsPage() {
    const [isLoading, setIsLoading] = useState(true);

    usePageAnimations(isLoading);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 50);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <main className="absolute z-100 left-0 top-0 min-h-svh w-full flex items-center justify-center bg-background">
                <div className="text-primary animate-pulse">Carregando...</div>
            </main>
        );
    }

    return (
        <main className="grid md:grid-cols-[2fr_1fr]">
            <div>
                <section className="py-8 px-8 grid md:grid-cols-3 gap-4 border-b-gradient">
                    <Card className="page-card">
                        <CardTitle>Total Processado</CardTitle>
                        <CardBody>
                            <CardValue>R$254.320,00</CardValue>
                            <CardCompare isHigher={false}>32%</CardCompare>
                        </CardBody>
                    </Card>
                    <Card className="page-card">
                        <CardTitle>Vendas Totais</CardTitle>
                        <CardBody>
                            <CardValue>R$40.548,00</CardValue>
                            <CardCompare isHigher={true}>100%</CardCompare>
                        </CardBody>
                    </Card>
                    <Card className="page-card">
                        <CardTitle>Pagamentos Totais</CardTitle>
                        <CardBody>
                            <CardValue>R$ 254.320,00</CardValue>
                            <CardCompare isHigher={false}>32%</CardCompare>
                        </CardBody>
                    </Card>
                </section>

                <section className="py-8 px-8">
                    <div className="page-content">
                        <TransactionsTable transactions={transactionsData} />
                    </div>
                </section>
            </div>
            <div className="p-8">
                <div className="page-card dashboardCard border-gradient rounded-md p-4 flex flex-col justify-center gap-4 border relative overflow-hidden">
                    <h3 id="pageTitle" className="font-semibold text-xl">
                        Transações Mensais
                    </h3>
                    <TimeFilter activeItem="Anual" />
                    <div>
                        <p className="font-semibold text-lg">R$ 15.000,00</p>
                        <p className="text-xs">
                            O crescimento é 4.6% maior que mês passado
                        </p>
                    </div>
                    <div className="w-full h-64 rounded-xl">
                        <TransactionsChart />
                    </div>

                    <div className="bg-primary/50 size-200 rounded-full blur-3xl absolute -z-10 left-1/5 top-1/3"></div>
                </div>
            </div>
        </main>
    );
}
