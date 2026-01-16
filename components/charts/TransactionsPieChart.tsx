import { memo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
    transactionsData,
    TRANSACTION_COLORS,
} from "@/constants/dashboardData";

export const TransactionsPieChart = memo(() => (
    <PieChart width={160} height={160}>
        <Pie
            data={transactionsData}
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
            {transactionsData.map((_, index) => (
                <Cell key={index} fill={TRANSACTION_COLORS[index]} />
            ))}
        </Pie>
    </PieChart>
));

TransactionsPieChart.displayName = "TransactionsPieChart";
