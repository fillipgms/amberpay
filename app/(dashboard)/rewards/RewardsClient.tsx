"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { achvements, data, milestones } from "@/constants/rewardsData";
import { GiftIcon, MedalIcon, SparkleIcon } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useRewardsAnimations } from "@/hooks/useRewardsAnimations";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

const RewardsClient = () => {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const milestoneRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const progressPercentage = (data.progress / data.milestone) * 100;
    const animatedProgress = useAnimatedCounter(
        Math.round(progressPercentage),
        isLoading
    );
    // For progress number, we'll animate it separately since useAnimatedCounter formats as currency
    const [displayProgress, setDisplayProgress] = useState("0");

    useEffect(() => {
        if (isLoading) return;
        const counter = { value: 0 };
        const animation = gsap.to(counter, {
            value: data.progress,
            duration: 1.5,
            ease: "expo.out",
            onUpdate: () => {
                setDisplayProgress(
                    Math.round(counter.value).toLocaleString("pt-BR")
                );
            },
        });
        return () => {
            animation.kill();
        };
    }, [isLoading, data.progress]);

    useRewardsAnimations(isLoading);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const el = milestoneRefs.current[data.currentLevel];
        const container = containerRef.current;

        if (!el || !container) return;

        const elCenter = el.offsetLeft + el.offsetWidth / 2;
        const containerCenter = container.offsetWidth / 2;

        container.scrollTo({
            left: elCenter - containerCenter,
            behavior: "smooth",
        });
    }, [data.currentLevel]);

    // Animate border fills for completed items
    useEffect(() => {
        if (isLoading) return;

        const completedCards = document.querySelectorAll(
            ".milestone-card.completed, .achievement-card.completed, .reward-card.completed"
        );

        completedCards.forEach((card) => {
            gsap.fromTo(
                card,
                {
                    borderImageSlice: 0,
                },
                {
                    borderImageSlice: 1,
                    duration: 1.5,
                    ease: "power2.out",
                }
            );
        });
    }, [isLoading]);

    if (isLoading) {
        return (
            <main className="absolute z-100 left-0 top-0 min-h-svh w-full flex items-center justify-center bg-background">
                <div className="text-primary animate-pulse">Carregando...</div>
            </main>
        );
    }

    return (
        <main>
            <section className="border-b-gradient space-y-4 h-fit py-8 px-8">
                <h2 id="progressTitle" className="font-bold text-2xl">
                    Seu Progresso na Plataforma
                </h2>
                <div
                    id="progressCard"
                    className="dashboardCard border-gradient rounded-md p-6 space-y-6 relative overflow-hidden border"
                >
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-4 justify-between items-center">
                            <div className="space-y-1">
                                <p className="text-sm text-foreground/70">
                                    Nível Atual
                                </p>
                                <p className="font-bold text-3xl text-primary">
                                    Nível {data.currentLevel}
                                </p>
                            </div>

                            <div className="text-right space-y-1">
                                <p className="text-sm text-foreground/70">
                                    Próxima Recompensa
                                </p>
                                <p className="font-semibold text-lg flex items-center gap-2">
                                    <SparkleIcon className="text-primary" />
                                    {data.nextReward}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-foreground/10 w-full h-3 rounded-full overflow-hidden relative">
                                <div
                                    className="progress-bar-fill h-full bg-primary rounded-full relative overflow-hidden"
                                    style={{
                                        width: `${progressPercentage}%`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 justify-between items-center">
                                <div className="flex text-base gap-1 progress-text">
                                    <p className="text-primary font-bold">
                                        {displayProgress}
                                    </p>
                                    <p className="text-foreground/60">/</p>
                                    <p className="text-foreground/60">
                                        {data.milestone.toLocaleString("pt-BR")}
                                    </p>
                                </div>

                                <p className="text-foreground/70 progress-text font-semibold">
                                    {animatedProgress}% completo
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        id="chartGlow"
                        className="bg-primary/50 size-200 rounded-full blur-3xl absolute -z-10 left-1/5 top-1/3"
                    ></div>
                </div>
            </section>

            <section className="relative py-8 px-8 max-w-svw border-b-gradient">
                <h3 className="font-semibold text-2xl mb-6">
                    Marcos da Jornada
                </h3>
                <div
                    ref={containerRef}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    className="relative flex overflow-x-auto pb-4"
                >
                    {milestones
                        .map((milestone) => {
                            const isCompleted =
                                data.currentLevel >= milestone.level;
                            const isCurrent =
                                data.currentLevel + 1 === milestone.level;
                            const isLocked =
                                data.currentLevel < milestone.level - 1;

                            return (
                                <div
                                    key={milestone.level}
                                    ref={(el) => {
                                        milestoneRefs.current[milestone.level] =
                                            el;
                                    }}
                                    className={twMerge(
                                        "milestone-card opacity-0 min-w-32 sm:min-w-36 shrink-0 snap-center flex flex-col items-center border-gradient rounded-lg px-4 sm:px-5 py-4 gap-2 transition-all relative overflow-hidden border",
                                        isCompleted
                                            ? "completed border-primary"
                                            : isCurrent
                                            ? "border-primary/50"
                                            : "border-foreground/20 opacity-60"
                                    )}
                                >
                                    {isCompleted && (
                                        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
                                    )}
                                    <div
                                        className={twMerge(
                                            "relative z-10 flex flex-col items-center gap-1",
                                            isCompleted && "text-primary"
                                        )}
                                    >
                                        <h6 className="text-sm sm:text-base font-semibold">
                                            Nível {milestone.level}
                                        </h6>
                                        <p className="font-bold text-lg sm:text-xl">
                                            {milestone.requiredPoints.toLocaleString(
                                                "pt-BR"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                        .reduce<React.ReactNode[]>((acc, curr, index) => {
                            if (index === 0) return [curr];

                            const isCompleted = data.currentLevel >= index + 1;
                            const isCurrent =
                                data.currentLevel + 1 === index + 1;
                            const progressWidth = isCurrent
                                ? progressPercentage
                                : isCompleted
                                ? 100
                                : 0;

                            return [
                                ...acc,
                                <div
                                    key={`spacer-${index}`}
                                    className="milestone-connector min-w-12 sm:min-w-16 flex items-center"
                                >
                                    <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden relative">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out relative"
                                            style={{
                                                width: `${progressWidth}%`,
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                        </div>
                                    </div>
                                </div>,
                                curr,
                            ];
                        }, [])}
                </div>
            </section>

            <section className="py-8 px-8 border-b-gradient">
                <Tabs defaultValue="achievments">
                    <TabsList className="mb-6">
                        <TabsTrigger value="achievments" className="gap-2">
                            <MedalIcon size={18} />
                            Conquistas
                        </TabsTrigger>
                        <TabsTrigger value="rewards" className="gap-2">
                            <GiftIcon size={18} />
                            Recompensas
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="achievments">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {achvements.map((achvement) => (
                                <div
                                    key={achvement.name}
                                    className={twMerge(
                                        "achievement-card opacity-0 border-gradient rounded-lg py-6 px-5 transition-all relative overflow-hidden group border",
                                        achvement.completed
                                            ? "completed border-primary opacity-100"
                                            : "border-foreground/20 opacity-100"
                                    )}
                                >
                                    <div className="relative z-10">
                                        <h5
                                            className={twMerge(
                                                "font-semibold text-lg mb-2",
                                                achvement.completed &&
                                                    "text-primary"
                                            )}
                                        >
                                            {achvement.name}
                                        </h5>
                                        <p className="text-foreground/70 text-sm leading-relaxed">
                                            {achvement.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="rewards">
                        <div className="flex flex-col gap-4">
                            {milestones.map((milestone) => {
                                const isUnlocked =
                                    data.progress >= milestone.requiredPoints;

                                return (
                                    <div
                                        key={milestone.requiredPoints}
                                        className={twMerge(
                                            "reward-card opacity-0 border-gradient rounded-lg py-6 px-5 transition-all relative overflow-hidden group border",
                                            isUnlocked
                                                ? "completed border-primary opacity-100"
                                                : "border-foreground/20 opacity-60"
                                        )}
                                    >
                                        <div className="relative z-10 flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h5
                                                    className={twMerge(
                                                        "font-semibold text-lg mb-2",
                                                        isUnlocked &&
                                                            "text-primary"
                                                    )}
                                                >
                                                    Nível {milestone.level}
                                                </h5>
                                                <p className="text-foreground/70 text-sm leading-relaxed">
                                                    {milestone.reward}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {data.milestone >
                                                    milestone.requiredPoints &&
                                                    milestone.level !== 1 && (
                                                        <Button>
                                                            <GiftIcon weight="fill" />
                                                            Resgatar
                                                        </Button>
                                                    )}
                                                <div className="text-right">
                                                    <p className="text-xs text-foreground/50 mb-1">
                                                        Requer
                                                    </p>
                                                    <p className="font-bold text-sm">
                                                        {milestone.requiredPoints.toLocaleString(
                                                            "pt-BR"
                                                        )}{" "}
                                                        pts
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    );
};

export default RewardsClient;
