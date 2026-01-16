"use client";

import CredentialCard from "@/components/CredentialCard";
import { Button } from "@/components/ui/button";
import { usePageAnimations } from "@/hooks/usePageAnimations";
import { useEffect, useState } from "react";

export default function CredentialsPage() {
    const [isLoading, setIsLoading] = useState(true);

    usePageAnimations(isLoading);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 50);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <main className="absolute z-100 left-0 top-0 min-h-svh w-full flex items-center justify-center bg-background">
                <div className="text-primary animate-pulse">Carregando...</div>
            </main>
        );
    }

    return (
        <main>
            <section className="py-8 px-8 border-b-gradient flex items-center justify-between">
                <h1 id="pageTitle" className="font-bold text-2xl">Credenciais</h1>
                <Button id="pageAction">Criar</Button>
            </section>

            <section className="space-y-4 p-8">
                <div className="page-card">
                    <CredentialCard title="Meu Site de Vendas" />
                </div>
            </section>
        </main>
    );
}
