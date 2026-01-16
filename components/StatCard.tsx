import { memo } from "react";

export const StatCard = memo(
    ({
        title,
        items,
    }: {
        title: string;
        items: Array<{ label: string; value: string }>;
    }) => (
        <div className="dashboardCard p-4 rounded border flex-1 flex flex-col justify-center gap-4">
            <h2 className="font-semibold text-lg">{title}</h2>
            {items.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                    <p>{label}</p>
                    <span>{value}</span>
                </div>
            ))}
        </div>
    )
);
StatCard.displayName = "StatCard";
