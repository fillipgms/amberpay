"use client";
import { useEffect, useRef, useState } from "react";
import { GetGrowthData } from "@/actions/dashboard";
import { GrowthAreaChart } from "@/components/charts/GrowthAreaChart";
import TimeFilter from "@/components/TimeFilter";
import formatCurrency from "@/utils/formatCurrency";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { useGSAPAnimation, fadeInUp, scaleIn } from "@/hooks/useGSAPAnimation";

type PeriodType = "daily" | "weekly" | "monthly" | "annual";

const Growth = ({
    period,
    searchParams,
}: {
    period: string;
    searchParams: Record<string, string | string[] | undefined>;
}) => {
    const [data, setData] = useState<any>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const gsapContext = useGSAPAnimation();
    const hasAnimated = useRef(false);

    useEffect(() => {
        GetGrowthData(period).then(setData);
    }, [period]);

    // Only animate sections on first load
    useEffect(() => {
        if (!data || !cardRef.current || hasAnimated.current) return;

        gsapContext.current?.add(() => {
            scaleIn(cardRef.current, 0.2);
            fadeInUp(".growth-item", 0.4, 0.5);
        });

        hasAnimated.current = true;
    }, [data, gsapContext]);

    if (!data) return null;

    const periodText: Record<PeriodType, string> = {
        daily: "Hoje",
        weekly: "7 dias",
        monthly: "31 dias",
        annual: "Um Ano",
    };

    const getPeriodText = (type: string): string => {
        return periodText[type as PeriodType] || "Transação";
    };

    return (
        <div
            ref={cardRef}
            className="dashboardCard md:col-span-2 border-gradient rounded-md p-4 flex flex-col justify-center gap-4 border relative overflow-hidden"
        >
            <h3 className="font-semibold text-xl growth-item">Crescimentos</h3>
            <div className="growth-item">
                <TimeFilter
                    activeItem={period}
                    paramKey="growth_period"
                    searchParams={searchParams}
                    baseUrl="/"
                />
            </div>
            <div className="w-full h-64 rounded-xl growth-item">
                <GrowthAreaChart data={data} />
            </div>
            <div className="growth-item">
                <h5 className="text-sm">
                    Vendas Totais {`(${getPeriodText(period)})`}
                </h5>
                <p className="font-semibold text-lg">
                    <AnimatedNumber
                        value={data.total}
                        prefix="R$ "
                        decimals={2}
                        duration={1.2}
                    />
                </p>
            </div>
            <div className="bg-primary/50 size-200 rounded-full blur-3xl absolute -z-10 left-1/5 top-1/3" />
        </div>
    );
};

export default Growth;
