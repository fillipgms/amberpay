"use client";
import { memo, useMemo } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    LabelList,
} from "recharts";
import { useChartColors } from "@/hooks/useChartColors";
import { BAR_COLORS } from "@/constants/dashboardData";

interface InstallmentsData {
    label: string;
    count: number;
    percent: number;
}

export const PortionsBarChart = memo(
    ({ data }: { data: InstallmentsData[] }) => {
        const chartColors = useChartColors();

        const chartData = useMemo(() => {
            const formatted = data.map((item) => ({
                label: item.label,
                value: item.count,
            }));

            const hasAnyValue = formatted.some((item) => item.value > 0);

            if (!hasAnyValue) {
                return [{ label: "Sem dados", value: 1 }];
            }

            return formatted;
        }, [data]);

        if (chartData[0].label === "Sem dados") {
            return (
                <div className="flex flex-1 items-center justify-center">
                    Não houve nenhum parcelamento no período selecionado
                </div>
            );
        }

        return (
            <ResponsiveContainer width="100%" height={300} minHeight={300}>
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ left: -50 }}
                    barGap={16}
                >
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={false}
                    />
                    <Bar barSize={42} dataKey="value" radius={[0, 0, 8, 0]}>
                        <LabelList
                            dataKey="label"
                            position="insideLeft"
                            offset={12}
                            fill={chartColors.labelFill}
                            fontSize={14}
                            fontWeight={600}
                        />
                        {chartData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={BAR_COLORS[index]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    },
);

PortionsBarChart.displayName = "PortionsBarChart";
