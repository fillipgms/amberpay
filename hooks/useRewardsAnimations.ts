import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const useRewardsAnimations = (isLoading: boolean) => {
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
                "#progressTitle",
                "#progressCard",
                ".milestone-card",
                ".milestone-connector",
                ".achievement-card",
                ".reward-card",
                "#chartGlow",
                ".progress-bar-fill",
                ".progress-text",
            ];

            gsap.set(animatedSelectors, { willChange: "transform, opacity" });

            // Garantir que os cards comecem na posição correta antes da animação
            gsap.set("#progressCard", { y: 0 });
            gsap.set(".milestone-card", { y: 0 });
            gsap.set(".achievement-card, .reward-card", { y: 0 });

            // Title animation
            tl.from("#progressTitle", {
                yPercent: 150,
                opacity: 0,
                duration: 0.8,
                force3D: true,
            })
                // Progress card animation
                .from(
                    "#progressCard",
                    {
                        opacity: 0,
                        y: 30,
                        duration: 0.6,
                        force3D: true,
                    },
                    "-=0.5"
                )
                .to(
                    "#progressCard",
                    {
                        y: 0,
                        duration: 0,
                    },
                    ">"
                )
                // Progress bar fill animation
                .from(
                    ".progress-bar-fill",
                    {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 1.2,
                        ease: "power3.out",
                        force3D: true,
                    },
                    "-=0.4"
                )
                // Progress text animation
                .from(
                    ".progress-text",
                    {
                        opacity: 0,
                        y: 10,
                        duration: 0.5,
                        stagger: 0.1,
                        force3D: true,
                    },
                    "-=0.8"
                )
                // Milestone cards animation
                .from(".milestone-card", {
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                    duration: 0.6,
                    ease: "back.out(1.2)",
                    force3D: true,
                })
                .to(
                    ".milestone-card",
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "back.out(1.2)",
                        force3D: true,
                    },
                    "-=0.6"
                )
                // Milestone connector lines animation (going up)
                .from(
                    ".milestone-connector",
                    {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.4"
                )
                // Achievement and reward cards
                .from(
                    ".achievement-card, .reward-card",
                    {
                        opacity: 0,
                        y: 20,
                        scale: 0.95,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.3"
                )
                .to(
                    ".achievement-card, .reward-card",
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.3"
                )
                // Glow effect
                .from(
                    "#chartGlow",
                    {
                        opacity: 0,
                        scale: 0.5,
                        duration: 1.5,
                        ease: "power1.out",
                        force3D: true,
                    },
                    "-=1.0"
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
