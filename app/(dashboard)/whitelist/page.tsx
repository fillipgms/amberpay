"use client";

import { Card, CardBody, CardTitle, CardValue } from "@/components/Card";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import WhitelistTable from "@/components/tables/WhitelistTable";
import { whitelistData } from "@/constants/whitelistData";
import { usePageAnimations } from "@/hooks/usePageAnimations";
import { useEffect, useState } from "react";

export default function IpWhitelistPage() {
    const [isLoading, setIsLoading] = useState(true);

    usePageAnimations(isLoading);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality
        console.log("Delete whitelist entry:", id);
    };

    if (isLoading) {
        return (
            <main className="absolute z-100 left-0 top-0 min-h-svh w-full flex items-center justify-center bg-background">
                <div className="text-primary animate-pulse">Carregando...</div>
            </main>
        );
    }

    return (
        <main>
            <section id="pageHeader" className="py-8 px-8 border-b-gradient flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 id="pageTitle" className="font-bold text-2xl">Ip Whitelist</h1>
                <div id="pageAction" className="md:flex-1 grid md:grid-cols-[1fr_200px] grid-cols-[1fr_100px] gap-4">
                    <Input placeholder="120.0.0.1" />
                    <Button>Criar</Button>
                </div>
            </section>

            <section className="py-8 px-8">
                <div className="page-content">
                    <WhitelistTable
                        whitelist={whitelistData}
                        onDelete={handleDelete}
                    />
                </div>
            </section>
        </main>
    );
}
