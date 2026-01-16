import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";

export const useAnimatedCounter = (targetValue: number, isLoading: boolean) => {
    const [displayValue, setDisplayValue] = useState("0.000,00");
    const hasAnimated = useRef(false);

    const formatValue = useCallback((value: number) => {
        return value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }, []);

    useEffect(() => {
        if (isLoading || hasAnimated.current) return;

        const timer = setTimeout(() => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            const counter = { value: 0 };

            gsap.to(counter, {
                value: targetValue,
                duration: 1.5,
                ease: "expo.out",
                onUpdate: () => {
                    setDisplayValue(formatValue(counter.value));
                },
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [isLoading, targetValue, formatValue]);

    return displayValue;
};
