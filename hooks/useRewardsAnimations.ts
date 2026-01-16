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

            tl.from("#progressTitle", {
                y: 30,
                opacity: 0,
                duration: 0.5,
                force3D: true,
            })
                .from(
                    "#progressCard",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.4,
                        force3D: true,
                    },
                    "-=0.3",
                )
                .from(
                    ".progress-bar-fill",
                    {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 0.8,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.2",
                )
                .from(
                    ".progress-text",
                    {
                        opacity: 0,
                        duration: 0.3,
                        stagger: 0.05,
                        force3D: true,
                    },
                    "-=0.5",
                )
                .from(
                    ".milestone-card",
                    {
                        opacity: 0,
                        y: 15,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.2",
                )
                .to(".milestone-card", {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    ease: "power2.out",
                    force3D: true,
                })
                .from(
                    ".milestone-connector",
                    {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 0.5,
                        stagger: 0.05,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.3",
                )
                .from(
                    ".achievement-card, .reward-card",
                    {
                        opacity: 0,
                        y: 15,
                        duration: 0.4,
                        stagger: 0.04,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.2",
                )
                .to(".achievement-card, .reward-card", {
                    opacity: 1,
                    y: 0,
                    stagger: 0.04,
                    ease: "power2.out",
                    force3D: true,
                })
                .from(
                    "#chartGlow",
                    {
                        opacity: 0,
                        duration: 0.6,
                        ease: "power1.out",
                        force3D: true,
                    },
                    "-=0.5",
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
