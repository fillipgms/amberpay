"use client";

import Image from "next/image";
import placeholderImage from "@/public/bg-placeholder.png";
import { Squircle } from "@squircle-js/react";
import VerifyForm from "./VerifyForm";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, Suspense } from "react";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";

function VerifyPageContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (containerRef.current && headerRef.current) {
            const tl = gsap.timeline();

            tl.from(headerRef.current.children, {
                y: -30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
            });
        }
    }, []);

    return (
        <main className="relative min-h-svh max-h-svh grid md:grid-cols-2 overflow-hidden">
            <div className="bg-primary/50 size-100 rounded-full blur-3xl absolute z-10 -top-1/3 -left-1/6"></div>
            <div className="-z-1 bg-background/90 size-10 bottom-0 left-0 absolute"></div>
            <div className="-z-1 bg-background/90 size-10 top-0 left-0 absolute"></div>

            <Squircle
                cornerRadius={24}
                cornerSmoothing={1}
                className="bg-background/90 backdrop-blur-lg p-4 flex justify-center items-center relative border-r"
            >
                <div ref={containerRef} className="md:min-w-md space-y-6">
                    <div ref={headerRef} className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheckIcon
                                size={32}
                                className="text-primary"
                                weight="duotone"
                            />
                            <h2 className="text-2xl font-bold">Amberpay</h2>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">
                                Autenticação de Dois Fatores
                            </h1>
                            <p className="text-foreground/50">
                                Proteja sua conta com segurança adicional
                            </p>
                        </div>
                    </div>

                    <VerifyForm />
                </div>

                <div className="bg-primary/50 size-100 rounded-full blur-3xl absolute z-10 -bottom-1/3 -right-1/3"></div>
            </Squircle>

            <div className="pb-16 flex items-end justify-center">
                <div className="bg-background/20 p-4 rounded backdrop-blur-lg font-semibold border">
                    Amberpay &copy; 2026 Todos os Direitos Reservados
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Image
                    src={placeholderImage.src}
                    alt="background image"
                    sizes="(max-width: 768px) 100svw"
                    fill
                />
            </div>
        </main>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <VerifyPageContent />
        </Suspense>
    );
}
