import { useMemo } from "react";
import { useTheme } from "next-themes";

export const useChartColors = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return useMemo(
        () => ({
            stroke: isDark ? "rgb(239, 241, 239)" : "rgb(9, 9, 11)",
            grid: isDark ? "rgba(239, 241, 239, 0.1)" : "rgba(9, 9, 11, 0.1)",
            gradientStop: isDark ? "rgb(239, 241, 239)" : "rgb(9, 9, 11)",
            tooltipBg: isDark
                ? "oklch(0.2382 0.0082 153.2802)"
                : "oklch(1 0 0)",
            tooltipBorder: isDark
                ? "oklch(0.3755 0.0166 159.1825)"
                : "oklch(0.9288 0.0126 255.5078)",
            tooltipText: isDark
                ? "oklch(0.9561 0.0034 145.5489)"
                : "oklch(0.1408 0.0044 285.8229)",
            areaStroke: "oklch(0.7413 0.1526 151.6784)",
            labelFill: isDark
                ? "oklch(0.2382 0.0082 153.2802)"
                : "oklch(1 0 0)",
        }),
        [isDark]
    );
};
