import ArrowTrendDown from "@/public/icons/arrow-trend-down";
import ArrowTrendUp from "@/public/icons/arrow-trend-up";
import React from "react";
import { twMerge } from "tailwind-merge";

const Card = ({ children }: { children?: React.ReactNode }) => {
    return <div className="border rounded-md p-4 space-y-4">{children}</div>;
};

const CardTitle = ({ children }: { children?: React.ReactNode }) => {
    return <h6 className="text-sm">{children}</h6>;
};

const CardBody = ({ children }: { children?: React.ReactNode }) => {
    return <div className="flex flex-col gap-2">{children}</div>;
};

const CardValue = ({ children }: { children?: React.ReactNode }) => {
    return <h5 className="font-semibold text-xl">{children}</h5>;
};

const CardCompare = ({
    children,
    isHigher,
}: {
    children?: React.ReactNode;
    isHigher?: boolean;
}) => {
    return (
        <div className="flex items-center justify-between text-sm">
            <p className="text-foreground/50">vs mês passado</p>
            <span
                className={twMerge(
                    "flex items-center justify-between gap-1",
                    isHigher ? "text-primary" : "text-destructive"
                )}
            >
                {isHigher ? <ArrowTrendUp /> : <ArrowTrendDown />}
                {children}
            </span>
        </div>
    );
};

export { Card, CardTitle, CardBody, CardValue, CardCompare };
