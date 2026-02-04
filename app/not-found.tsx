"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import gsap from "gsap";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !numberRef.current) return;

        const ctx = gsap.context(() => {
            // Animate the 404 number with a glitch effect
            gsap.fromTo(
                numberRef.current,
                { opacity: 0, scale: 0.8, rotateX: -90 },
                {
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                }
            );

            // Stagger animate other content
            gsap.fromTo(
                containerRef.current?.querySelectorAll(".fade-in-up") || [],
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    delay: 0.3,
                    ease: "power2.out",
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 overflow-hidden">
            <div
                ref={containerRef}
                className="max-w-2xl w-full text-center space-y-8 relative"
            >
                {/* Background Glow */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                </div>

                {/* 404 Number */}
                <div
                    ref={numberRef}
                    className="relative"
                    style={{ perspective: "1000px" }}
                >
                    <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Página não encontrada
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-md mx-auto">
                        A página que você está procurando não existe ou foi movida para outro endereço.
                    </p>
                </div>

                {/* Search Suggestions */}
                <div className="bg-card border border-border rounded-lg p-6 text-left max-w-md mx-auto fade-in-up">
                    <h3 className="font-semibold text-foreground mb-3">
                        Você pode:
                    </h3>
                    <ul className="space-y-2 text-foreground/70">
                        <li className="flex items-start">
                            <svg
                                className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <span>Verificar se o endereço está correto</span>
                        </li>
                        <li className="flex items-start">
                            <svg
                                className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <span>Voltar à página inicial</span>
                        </li>
                        <li className="flex items-start">
                            <svg
                                className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <span>Entrar em contato com o suporte</span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 fade-in-up">
                    <Link href="/">
                        <Button size="lg" className="w-full sm:w-auto">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Voltar ao Início
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Voltar
                    </Button>
                </div>

                {/* Footer note */}
                <p className="text-xs text-foreground/40 pt-8 fade-in-up">
                    AmberPay • Pagamentos instantâneos e seguros
                </p>
            </div>
        </div>
    );
}
