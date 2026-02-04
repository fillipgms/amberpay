"use client";
import { useEffect, useRef, useState } from "react";
import { GetBreakdownData } from "@/actions/dashboard";
import { PortionsBarChart } from "@/components/charts/PortionsBarChart";
import { StatCard } from "@/components/StatCard";
import TimeFilter from "@/components/TimeFilter";
import { useGSAPAnimation, staggerFadeIn } from "@/hooks/useGSAPAnimation";

const breakdown = ({
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
        GetBreakdownData(filter).then(setData);
    }, [filter]);

    // Only animate sections on first load
    useEffect(() => {
        if (!data || !sectionRef.current || hasAnimated.current) return;

        gsapContext.current?.add(() => {
            staggerFadeIn(".breakdown-item", 0.1, 0.6);
        });

        hasAnimated.current = true;
    }, [data, gsapContext]);

    if (!data) return null;

    return (
        <>
            <div
                ref={sectionRef}
                className="border p-4 rounded space-y-4 flex flex-col breakdown-item"
            >
                <h3 className="font-semibold text-xl">
                    Quantidades de Parcelas no Cartão
                </h3>
                <TimeFilter
                    paramKey="breakdown_filter"
                    searchParams={searchParams}
                    baseUrl={"/"}
                    variant={"type"}
                    activeItem={filter}
                />
                <PortionsBarChart data={data.installments} />
            </div>

            <div className="flex flex-col gap-4 md:col-span-2">
                <div className="breakdown-item">
                    <StatCard
                        title="Formas de Pagamento"
                        items={data.payment_methods}
                    />
                </div>
                <div className="breakdown-item">
                    <StatCard
                        title="Bandeiras Mais Usadas"
                        items={data.card_brands}
                    />
                </div>
            </div>
        </>
    );
};

export default breakdown;
