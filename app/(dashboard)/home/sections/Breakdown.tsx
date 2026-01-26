import { GetBreakdownData } from "@/actions/dashboard";
import { PortionsBarChart } from "@/components/charts/PortionsBarChart";
import { StatCard } from "@/components/StatCard";
import TimeFilter from "@/components/TimeFilter";
import React from "react";

const breakdown = async ({
    filter,
    searchParams,
}: {
    filter: string;
    searchParams: Record<string, string | string[] | undefined>;
}) => {
    const data = await GetBreakdownData(filter);

    return (
        <>
            <div className="border p-4 rounded space-y-4 flex flex-col">
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
                <StatCard
                    title="Formas de Pagamento"
                    items={data.payment_methods}
                />
                <StatCard
                    title="Bandeiras Mais Usadas"
                    items={data.card_brands}
                />
            </div>
        </>
    );
};

export default breakdown;
