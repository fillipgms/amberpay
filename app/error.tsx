"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        }
    }, []);

    const handleRefresh = () => {
        reset();
    };

    const handleGoHome = () => {
        window.location.href = "/";
    };

    // Check if it's a rate limit error
    const isRateLimitError = error.message?.includes("429") ||
                            error.message?.toLowerCase().includes("rate limit") ||
                            error.message?.toLowerCase().includes("too many requests");

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <div
                ref={containerRef}
                className="max-w-md w-full text-center space-y-6"
            >
                {/* Error Icon */}
                <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl"></div>
                    <div className="relative w-full h-full bg-destructive/10 rounded-full flex items-center justify-center border-2 border-destructive/30">
                        <svg
                            className="w-12 h-12 text-destructive"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Error Title */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">
                        {isRateLimitError ? "Muitas requisições" : "Algo deu errado"}
                    </h1>
                    <p className="text-foreground/60">
                        {isRateLimitError
                            ? "Detectamos muitas solicitações. Por favor, aguarde um momento antes de tentar novamente."
                            : "Ocorreu um erro inesperado. Não se preocupe, você pode tentar novamente."}
                    </p>
                </div>

                {/* Error Details (only in development) */}
                {process.env.NODE_ENV === "development" && (
                    <div className="p-4 bg-muted rounded-lg text-left">
                        <p className="text-xs font-mono text-foreground/70 break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs font-mono text-foreground/50 mt-2">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                        onClick={handleRefresh}
                        className="flex-1"
                        variant="default"
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
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Tentar Novamente
                    </Button>
                    <Button
                        onClick={handleGoHome}
                        className="flex-1"
                        variant="outline"
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
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Voltar ao Início
                    </Button>
                </div>

                {/* Help Text */}
                <p className="text-xs text-foreground/50 pt-4">
                    Se o problema persistir, entre em contato com o suporte.
                </p>
            </div>
        </div>
    );
}
