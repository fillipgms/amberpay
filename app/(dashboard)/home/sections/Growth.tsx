import { GetGrowthData } from "@/actions/dashboard";
import { GrowthAreaChart } from "@/components/charts/GrowthAreaChart";
import TimeFilter from "@/components/TimeFilter";
import formatCurrency from "@/utils/formatCurrency";

type PeriodType = "daily" | "weekly" | "monthly" | "annual";

export const dynamic = "force-dynamic";

const Growth = async ({
    period,
    searchParams,
}: {
    period: string;
    searchParams: Record<string, string | string[] | undefined>;
}) => {
    const data = await GetGrowthData(period);

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
        <div className="dashboardCard md:col-span-2 border-gradient rounded-md p-4 flex flex-col justify-center gap-4 border relative overflow-hidden">
            <h3 className="font-semibold text-xl">Crescimentos</h3>
            <TimeFilter
                activeItem={period}
                paramKey="growth_period"
                searchParams={searchParams}
                baseUrl="/"
            />
            <div className="w-full h-64 rounded-xl">
                <GrowthAreaChart data={data} />
            </div>
            <div>
                <h5 className="text-sm">
                    Vendas Totais {`(${getPeriodText(period)})`}
                </h5>
                <p className="font-semibold text-lg">
                    {formatCurrency(data.total)}
                </p>
            </div>
            <div className="bg-primary/50 size-200 rounded-full blur-3xl absolute -z-10 left-1/5 top-1/3" />
        </div>
    );
};

export default Growth;
