"use client";
import { useEffect, useRef, useState } from "react";
import { GetSummaryData } from "@/actions/dashboard";
import { OverviewPieChart } from "@/components/charts/OverviewPieChart";
import TimeFilter from "@/components/TimeFilter";
import formatCurrency from "@/utils/formatCurrency";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { useGSAPAnimation, scaleIn, staggerFadeIn } from "@/hooks/useGSAPAnimation";

const Summary = ({
    filter,
    searchParams,
}: {
    filter: string;
    searchParams: Record<string, string | string[] | undefined>;
}) => {
    const [data, setData] = useState<any>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const gsapContext = useGSAPAnimation();
    const hasAnimated = useRef(false);

    useEffect(() => {
        GetSummaryData(filter).then(setData);
    }, [filter]);

    // Only animate sections on first load
    useEffect(() => {
        if (!data || !cardRef.current || hasAnimated.current) return;

        gsapContext.current?.add(() => {
            scaleIn(cardRef.current, 0.3);
            staggerFadeIn(".summary-item", 0.08, 0.5);
        });

        hasAnimated.current = true;
    }, [data, gsapContext]);

    if (!data) return null;

    return (
        <div
            ref={cardRef}
            className="dashboardCard border-gradient rounded-md p-4 flex flex-col gap-4 border overflow-hidden"
        >
            <h3 className="font-semibold text-xl summary-item">Resumo</h3>
            <div className="summary-item">
                <TimeFilter
                    paramKey="summary_filter"
                    searchParams={searchParams}
                    baseUrl={"/"}
                    variant={"type"}
                    activeItem={filter}
                />
            </div>
            <div className="flex gap-2 summary-item">
                <OverviewPieChart data={data.resume} />
                <div className="flex-1 flex justify-center gap-2 flex-col">
                    <div>
                        <div className="flex items-center gap-1">
                            <div className="bg-primary rounded-full size-2"></div>
                            <h5 className="text-sm">Entradas</h5>
                        </div>
                        <h4 className="text-xl font-semibold">
                            R${" "}
                            <AnimatedNumber
                                value={data.resume.inputs.value}
                                decimals={2}
                                duration={1.2}
                            />
                        </h4>
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <div className="bg-[#9ca3af] rounded-full size-2"></div>
                            <h5 className="text-sm">Saídas</h5>
                        </div>
                        <h4 className="text-xl font-semibold">
                            R${" "}
                            <AnimatedNumber
                                value={data.resume.outputs.value}
                                decimals={2}
                                duration={1.2}
                            />
                        </h4>
                    </div>
                </div>
            </div>
            <div className="h-1 border-b-gradient summary-item" />
            <h3 className="font-semibold text-xl summary-item">Médias</h3>
            <div className="grid grid-cols-3 gap-4 summary-item">
                <div>
                    <h5 className="text-sm text-foreground/50">Diário</h5>
                    <p className="font-semibold">R$ {data.averages.daily}</p>
                </div>
                <div>
                    <h5 className="text-sm text-foreground/50">Semanal</h5>
                    <p className="font-semibold">R$ {data.averages.weekly}</p>
                </div>
                <div>
                    <h5 className="text-sm text-foreground/50">Mensal</h5>
                    <p className="font-semibold">R$ {data.averages.monthly}</p>
                </div>
            </div>
        </div>
    );
};

export default Summary;
