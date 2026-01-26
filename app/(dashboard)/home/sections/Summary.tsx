import { GetSummaryData } from "@/actions/dashboard";
import { OverviewPieChart } from "@/components/charts/OverviewPieChart";
import TimeFilter from "@/components/TimeFilter";
import formatCurrency from "@/utils/formatCurrency";

export const dynamic = "force-dynamic";

const Summary = async ({
    filter,
    searchParams,
}: {
    filter: string;
    searchParams: Record<string, string | string[] | undefined>;
}) => {
    const data = await GetSummaryData(filter);

    return (
        <div className="dashboardCard border-gradient rounded-md p-4 flex flex-col gap-4 border overflow-hidden">
            <h3 className="font-semibold text-xl">Resumo</h3>
            <TimeFilter
                paramKey="summary_filter"
                searchParams={searchParams}
                baseUrl={"/"}
                variant={"type"}
                activeItem={filter}
            />
            <div className="flex gap-2">
                <OverviewPieChart data={data.resume} />
                <div className="flex-1 flex justify-center gap-2 flex-col">
                    <div>
                        <div className="flex items-center gap-1">
                            <div className="bg-primary rounded-full size-2"></div>
                            <h5 className="text-sm">Entradas</h5>
                        </div>
                        <h4 className="text-xl font-semibold">
                            R$ {formatCurrency(data.resume.inputs.value)}
                        </h4>
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <div className="bg-[#9ca3af] rounded-full size-2"></div>
                            <h5 className="text-sm">Saídas</h5>
                        </div>
                        <h4 className="text-xl font-semibold">
                            R$ {formatCurrency(data.resume.outputs.value)}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="h-1 border-b-gradient" />
            <h3 className="font-semibold text-xl">Médias</h3>
            <div className="grid grid-cols-3 gap-4">
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
