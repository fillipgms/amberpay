import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const usePageAnimations = (isLoading: boolean) => {
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
                "#pageTitle",
                "#pageHeader",
                ".page-card",
                ".page-content",
                "#pageAction",
            ];

            gsap.set(animatedSelectors, { willChange: "transform, opacity" });

            tl.from("#pageTitle", {
                y: 20,
                opacity: 0,
                duration: 0.4,
                force3D: true,
            })
                .from(
                    "#pageAction",
                    {
                        opacity: 0,
                        y: 15,
                        duration: 0.3,
                        force3D: true,
                    },
                    "-=0.2"
                )
                .from(
                    ".page-card",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.4,
                        stagger: 0.08,
                        ease: "power2.out",
                        force3D: true,
                    },
                    "-=0.2"
                )
                .from(
                    ".page-content",
                    {
                        opacity: 0,
                        y: 15,
                        duration: 0.4,
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
