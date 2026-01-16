import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const useDashboardAnimations = (isLoading: boolean) => {
    const hasAnimated = useRef(false);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (isLoading || hasAnimated.current) return;

        const timer = setTimeout(() => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            const tl = gsap.timeline({
                defaults: {
                    ease: "power2.out",
                    force3D: true,
                },
            });

            const animatedSelectors = [
                "#saldo",
                "#saldoBloqueado",
                "#ultimaTransacao",
                ".stat-card",
                ".dashboardCard",
                "#growthTitle",
                "#overviewTitle",
                "#growthOverview",
                ".overviewLegend",
                "#chartGlow",
                ".metrics",
            ];

            gsap.set(animatedSelectors, { willChange: "transform, opacity" });

            // Garantir que os cards comecem na posição correta antes da animação
            gsap.set(".dashboardCard", { y: 0 });

            tl.from("#saldo", {
                yPercent: 150,
                opacity: 0,
                duration: 0.8,
                force3D: true,
            })
                .from(
                    "#saldoBloqueado",
                    { opacity: 0, y: 30, duration: 0.5, force3D: true },
                    "-=0.5"
                )
                .from(
                    "#ultimaTransacao",
                    { opacity: 0, y: 20, duration: 0.4, force3D: true },
                    "-=0.3"
                )
                .from(
                    ".stat-card",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        stagger: 0.15,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.4"
                )
                .from(
                    ".dashboardCard",
                    {
                        opacity: 0,
                        y: 30,
                        stagger: 0.12,
                        duration: 0.6,
                        force3D: true,
                    },
                    "-=0.3"
                )
                .to(
                    ".dashboardCard",
                    {
                        y: 0,
                        duration: 0,
                    },
                    ">"
                )
                .from(
                    "#growthTitle, #overviewTitle",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.4,
                        stagger: 0.1,
                        force3D: true,
                    },
                    "-=0.5"
                )
                .from(
                    "#growthOverview",
                    { opacity: 0, y: 20, duration: 0.5, force3D: true },
                    "-=0.3"
                )
                .from(
                    ".overviewLegend",
                    {
                        opacity: 0,
                        y: 20,
                        stagger: 0.15,
                        duration: 0.5,
                        force3D: true,
                    },
                    "-=0.4"
                )
                .from(
                    ".metrics",
                    {
                        x: -30,
                        opacity: 0,
                        stagger: 0.1,
                        duration: 0.4,
                        force3D: true,
                    },
                    "-=0.3"
                )
                .set(animatedSelectors, { willChange: "auto" }, "-=0.1");

            timelineRef.current = tl;
        }, 16);

        return () => {
            clearTimeout(timer);
            timelineRef.current?.kill();
        };
    }, [isLoading]);

    return timelineRef;
};
