"use client";

import Link from "next/link";

const TimeFilter = ({
    activeItem,
    paramKey,
    baseUrl,
    searchParams,
    variant = "period",
}: {
    activeItem?: string;
    paramKey: string;
    searchParams: Record<string, string | string[] | undefined>;
    baseUrl: string;
    variant?: "period" | "type";
}) => {
    const buildHref = (val: string) => {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value) {
                if (Array.isArray(value)) {
                    value.forEach((v) => params.append(key, v));
                } else {
                    params.set(key, value);
                }
            }
        });
        params.set(paramKey, val);
        return `${baseUrl}?${params.toString()}`;
    };

    const OPTIONS = {
        period: [
            { value: "daily", label: "Diário" },
            { value: "weekly", label: "Semanal" },
            { value: "monthly", label: "Mensal" },
            { value: "annual", label: "Anual" },
        ],
        type: [
            { value: "today", label: "Hoje" },
            { value: "week", label: "Essa Semana" },
            { value: "month", label: "Esse Mês" },
            { value: "year", label: "Esse Ano" },
        ],
    } as const;

    return (
        <ul className="flex items-center gap-4 text-sm">
            {OPTIONS[variant].map((item) => (
                <li
                    key={item.value}
                    className={
                        activeItem === item.value
                            ? "text-primary font-semibold"
                            : "cursor-pointer"
                    }
                >
                    <Link href={buildHref(item.value)}>{item.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default TimeFilter;
