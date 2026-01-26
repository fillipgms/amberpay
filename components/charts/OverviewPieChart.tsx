"use client";

import { memo, useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { PIE_COLORS } from "@/constants/dashboardData";

interface ResumeData {
    inputs: {
        value: number;
        growth_percent: number | null;
    };
    outputs: {
        value: number;
        growth_percent: number | null;
    };
    net: {
        value: number;
    };
}

export const OverviewPieChart = memo(({ data }: { data: ResumeData }) => {
    const chartData = useMemo(() => {
        const realData = [
            {
                name: "Entradas",
                value: data.inputs.value,
            },
            {
                name: "Saídas",
                value: data.outputs.value,
            },
        ].filter((item) => item.value > 0);

        if (realData.length === 0) {
            return [{ name: "Sem dados", value: 1 }];
        }

        return realData;
    }, [data]);

    return (
        <PieChart width={160} height={160}>
            <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                cornerRadius={8}
                paddingAngle={chartData.length > 1 ? 16 : 0}
                stroke="none"
                isAnimationActive={false}
            >
                {chartData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index] ?? "#E5E7EB"} />
                ))}
            </Pie>
        </PieChart>
    );
});

OverviewPieChart.displayName = "OverviewPieChart";
