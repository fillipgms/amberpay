"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedNumberProps {
    value: number | string;
    className?: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
}

export const AnimatedNumber = ({
    value,
    className = "",
    prefix = "",
    suffix = "",
    decimals = 2,
    duration = 1,
}: AnimatedNumberProps) => {
    const numberRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLSpanElement>(null);
    const prevValueRef = useRef<number>(0);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!numberRef.current || !containerRef.current) return;

        const numValue =
            typeof value === "string"
                ? parseFloat(value.replace(/[^\d.-]/g, ""))
                : value;

        if (isNaN(numValue)) return;

        // Skip animation on first render
        if (isFirstRender.current) {
            prevValueRef.current = numValue;
            numberRef.current.textContent = numValue.toFixed(decimals);
            isFirstRender.current = false;
            return;
        }

        const difference = numValue - prevValueRef.current;
        const isIncrease = difference > 0;
        const hasChanged = Math.abs(difference) > 0.01;

        if (!hasChanged) return;

        const obj = { val: prevValueRef.current };

        // Animate the number counting
        gsap.to(obj, {
            val: numValue,
            duration,
            ease: "power2.out",
            onUpdate: () => {
                if (numberRef.current) {
                    numberRef.current.textContent = obj.val.toFixed(decimals);
                }
            },
        });

        // Animate vertical movement (up if increase, down if decrease)
        gsap.fromTo(
            containerRef.current,
            { y: isIncrease ? 8 : -8, opacity: 0.7 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
            }
        );

        // Add a subtle color flash
        gsap.fromTo(
            containerRef.current,
            {
                color: isIncrease ? "#22c55e" : "#ef4444", // green for increase, red for decrease
                scale: 1.05
            },
            {
                color: "inherit",
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
            }
        );

        prevValueRef.current = numValue;
    }, [value, decimals, duration]);

    return (
        <span className={className}>
            {prefix}
            <span ref={containerRef} className="inline-block">
                <span ref={numberRef}>
                    {typeof value === "string"
                        ? parseFloat(value.replace(/[^\d.-]/g, "")).toFixed(decimals)
                        : value.toFixed(decimals)}
                </span>
            </span>
            {suffix}
        </span>
    );
};
