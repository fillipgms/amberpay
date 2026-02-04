"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useGSAPAnimation = () => {
    const contextRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        contextRef.current = gsap.context(() => {});

        return () => {
            contextRef.current?.revert();
        };
    }, []);

    return contextRef;
};

export const fadeInUp = (
    element: gsap.TweenTarget,
    delay: number = 0,
    duration: number = 0.6
) => {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 20,
        },
        {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power2.out",
        }
    );
};

export const staggerFadeIn = (
    elements: gsap.TweenTarget,
    stagger: number = 0.1,
    duration: number = 0.6
) => {
    return gsap.fromTo(
        elements,
        {
            opacity: 0,
            y: 20,
        },
        {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: "power2.out",
        }
    );
};

export const scaleIn = (
    element: gsap.TweenTarget,
    delay: number = 0,
    duration: number = 0.5
) => {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
            scale: 0.95,
        },
        {
            opacity: 1,
            scale: 1,
            duration,
            delay,
            ease: "back.out(1.2)",
        }
    );
};
