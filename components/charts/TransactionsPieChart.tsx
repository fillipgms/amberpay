"use client";

import { memo, useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { TRANSACTION_COLORS } from "@/constants/dashboardData";

interface ResumeData {
    approved: {
        count: number;
        percent: number;
    };
    pending: {
        count: number;
        percent: number;
    };
    refunded: {
        count: number;
        percent: number;
    };
}

export const TransactionsPieChart = memo(({ data }: { data: ResumeData }) => {
    const chartData = useMemo(() => {
        const realData = [
            {
                name: "Aprovadas",
                value: data.approved.count,
            },
            {
                name: "Pendentes",
                value: data.pending.count,
            },
            {
                name: "Estornadas",
                value: data.refunded.count,
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
                innerRadius={55}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                cornerRadius={999}
                paddingAngle={chartData.length > 1 ? 16 : 0}
                stroke="none"
            >
                {chartData.map((_, index) => (
                    <Cell key={index} fill={TRANSACTION_COLORS[index]} />
                ))}
            </Pie>
        </PieChart>
    );
});

TransactionsPieChart.displayName = "TransactionsPieChart";
