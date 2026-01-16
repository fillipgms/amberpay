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

            tl.from("#saldo", {
                y: 30,
                opacity: 0,
                duration: 0.5,
                force3D: true,
            })
                .from(
                    "#saldoBloqueado",
                    { opacity: 0, y: 20, duration: 0.4, force3D: true },
                    "-=0.3"
                )
                .from(
                    "#ultimaTransacao",
                    { opacity: 0, y: 15, duration: 0.3, force3D: true },
                    "-=0.2"
                )
                .from(
                    ".stat-card",
                    {
                        opacity: 0,
                        y: 15,
                        duration: 0.4,
                        stagger: 0.08,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.2"
                )
                .from(
                    ".dashboardCard",
                    {
                        opacity: 0,
                        y: 20,
                        stagger: 0.06,
                        duration: 0.4,
                        force3D: true,
                    },
                    "-=0.2"
                )
                .from(
                    "#growthTitle, #overviewTitle",
                    {
                        opacity: 0,
                        y: 15,
                        duration: 0.3,
                        stagger: 0.05,
                        force3D: true,
                    },
                    "-=0.3"
                )
                .from(
                    "#growthOverview",
                    { opacity: 0, y: 15, duration: 0.3, force3D: true },
                    "-=0.2"
                )
                .from(
                    ".overviewLegend",
                    {
                        opacity: 0,
                        y: 15,
                        stagger: 0.08,
                        duration: 0.3,
                        force3D: true,
                    },
                    "-=0.2"
                )
                .from(
                    ".metrics",
                    {
                        x: -20,
                        opacity: 0,
                        stagger: 0.05,
                        duration: 0.3,
                        force3D: true,
                    },
                    "-=0.2"
                )
                .set(animatedSelectors, { willChange: "auto" });

            timelineRef.current = tl;
        }, 16);

        return () => {
            clearTimeout(timer);
            timelineRef.current?.kill();
        };
    }, [isLoading]);

    return timelineRef;
};
