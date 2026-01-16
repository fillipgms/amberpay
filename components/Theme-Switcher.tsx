"use client";
import { useGSAP } from "@gsap/react";
import { MoonStarsIcon, SunDimIcon } from "@phosphor-icons/react";
import gsap from "gsap";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pointerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(() => {
        if (!mounted) return;
        if (!pointerRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const pointer = pointerRef.current;

        gsap.to(pointer, {
            y:
                theme === "light"
                    ? 0
                    : container.clientHeight - pointer.clientHeight,
            rotation: "+=360",
            duration: 0.5,
            ease: "back.out(1.7)",
        });
    }, [theme, mounted]);

    if (!mounted) return null;

    return (
        <div
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex flex-col items-center relative size-fit cursor-pointer"
            ref={containerRef}
        >
            <div ref={pointerRef} className="bg-primary rounded-full p-1.5 z-2">
                {theme === "light" ? (
                    <SunDimIcon
                        weight="fill"
                        size={16}
                        className="text-background"
                    />
                ) : (
                    <MoonStarsIcon
                        weight="fill"
                        size={16}
                        className="text-background"
                    />
                )}
            </div>
            <div
                className={twMerge(
                    "w-5 h-8",
                    theme === "light" ? "rounded-t-full" : "rounded-b-full"
                )}
            />
            <div
                className={twMerge(
                    "w-5 h-full absolute top-0 left-1/2 -translate-x-1/2 z-1 p-px from-background via-background to-foreground/50",
                    theme === "light"
                        ? "rounded-b-full bg-linear-to-b"
                        : "rounded-t-full bg-linear-to-t"
                )}
            >
                <div
                    className={twMerge(
                        "h-full w-full bg-background",
                        theme === "light" ? "rounded-b-full" : "rounded-t-full"
                    )}
                />
            </div>
        </div>
    );
};

export default ThemeSwitcher;
