import { GetTransactionsData } from "@/actions/dashboard";
import { TransactionsPieChart } from "@/components/charts/TransactionsPieChart";
import { StatCard } from "@/components/StatCard";
import TimeFilter from "@/components/TimeFilter";
import formatCurrency from "@/utils/formatCurrency";

export const dynamic = "force-dynamic";

type PeriodType = "today" | "week" | "month" | "year";

const Transactions = async ({
    filter,
    searchParams,
}: {
    filter: string;
    searchParams: Record<string, string | string[] | undefined>;
}) => {
    const data = await GetTransactionsData(filter);

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
            <div className="dashboardCard border-gradient rounded-md p-4 flex flex-col gap-4 border md:col-span-2">
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
                <StatCard
                    title="Taxa de Recusa"
                    items={data.refusal_rate.items}
                />
                <StatCard
                    title="Origem das Transações"
                    items={data.origins.items}
                />
            </div>
        </>
    );
};

export default Transactions;
