"use client";

import { Card, CardBody, CardTitle, CardValue } from "@/components/Card";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import WhitelistTable from "@/components/tables/WhitelistTable";
import { whitelistData } from "@/constants/whitelistData";

export default function IpWhitelistPage() {
    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality
        console.log("Delete whitelist entry:", id);
    };

    return (
        <main>
            <section className="py-8 px-8 border-b-gradient flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="font-bold text-2xl">Ip Whitelist</h1>
                <div className="md:flex-1 grid md:grid-cols-[1fr_200px] grid-cols-[1fr_100px] gap-4">
                    <Input placeholder="120.0.0.1" />
                    <Button>Criar</Button>
                </div>
            </section>

            <section className="py-8 px-8">
                <WhitelistTable
                    whitelist={whitelistData}
                    onDelete={handleDelete}
                />
            </section>
        </main>
    );
}
