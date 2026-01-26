"use client";
import { memo, useMemo } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { useChartColors } from "@/hooks/useChartColors";
import { CHART_MARGIN } from "@/constants/dashboardData";

interface ChartDataResponse {
    status: number;
    period: string;
    range: {
        start: string;
        end: string;
    };
    labels: string[];
    series: number[];
    total: number;
    growth_percent: number | null;
}

interface GrowthAreaChartProps {
    data?: ChartDataResponse;
}

export const GrowthAreaChart = memo(({ data }: GrowthAreaChartProps) => {
    const chartColors = useChartColors();

    const chartData = useMemo(() => {
        if (!data || !data.labels || !data.series) {
            return [];
        }

        return data.labels.map((label, index) => ({
            month: label,
            value: data.series[index] || 0,
        }));
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <AreaChart data={chartData} margin={CHART_MARGIN}>
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
                <CartesianGrid
                    vertical
                    horizontal={false}
                    stroke={chartColors.grid}
                    strokeOpacity={0.5}
                />
                <XAxis
                    dataKey="month"
                    stroke={chartColors.stroke}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
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

GrowthAreaChart.displayName = "GrowthAreaChart";
