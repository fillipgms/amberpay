import { memo } from "react";

export const TimeFilter = memo(({ activeItem }: { activeItem?: string }) => (
    <ul className="flex items-center gap-4 text-sm">
        <li
            className={
                activeItem === "Diário" ? "text-primary font-semibold" : ""
            }
        >
            Diário
        </li>
        <li
            className={
                activeItem === "Semanal" ? "text-primary font-semibold" : ""
            }
        >
            Semanal
        </li>
        <li
            className={
                activeItem === "Mensal" ? "text-primary font-semibold" : ""
            }
        >
            Mensal
        </li>
        <li
            className={
                activeItem === "Anual" ? "text-primary font-semibold" : ""
            }
        >
            Anual
        </li>
    </ul>
));
TimeFilter.displayName = "TimeFilter";
