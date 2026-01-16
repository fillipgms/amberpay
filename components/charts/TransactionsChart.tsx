import { memo } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { useChartColors } from "@/hooks/useChartColors";
import { data, CHART_MARGIN } from "@/constants/dashboardData";

export const TransactionsChart = memo(() => {
    const chartColors = useChartColors();

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={128}>
            <AreaChart data={data} margin={CHART_MARGIN}>
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="rgb(239, 241, 239)"
                            stopOpacity={0.35}
                        />
                        <stop
                            offset="95%"
                            stopColor={chartColors.gradientStop}
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="month"
                    stroke={chartColors.stroke}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: chartColors.tooltipBg,
                        border: `1px solid ${chartColors.tooltipBorder}`,
                        borderRadius: 8,
                        color: chartColors.tooltipText,
                    }}
                    labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={chartColors.areaStroke}
                    strokeWidth={2.5}
                    fill="url(#colorValue)"
                    dot={false}
                    activeDot={{ r: 6 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
});

TransactionsChart.displayName = "TransactionsChart";
