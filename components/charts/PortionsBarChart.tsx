import { memo } from "react";
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
import { portionsData, BAR_COLORS } from "@/constants/dashboardData";

export const PortionsBarChart = memo(() => {
    const chartColors = useChartColors();

    return (
        <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <BarChart
                data={portionsData}
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
                    {portionsData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={BAR_COLORS[index]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
});

PortionsBarChart.displayName = "PortionsBarChart";
