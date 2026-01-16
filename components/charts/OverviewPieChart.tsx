import { memo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { pieData, PIE_COLORS } from "@/constants/dashboardData";

export const OverviewPieChart = memo(() => (
    <PieChart width={160} height={160}>
        <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={70}
            startAngle={90}
            endAngle={-270}
            cornerRadius={999}
            paddingAngle={0}
            stroke="none"
        >
            {pieData.map((_, index) => (
                <Cell key={index} fill={PIE_COLORS[index]} />
            ))}
        </Pie>
    </PieChart>
));

OverviewPieChart.displayName = "OverviewPieChart";
