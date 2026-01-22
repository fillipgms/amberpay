"use client";

import { addIpToWhitelist } from "@/actions/ip";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IpWhitelistHeader = () => {
    const [ipValue, setIpValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const addToWhitelist = async () => {
        setError(null);
        setGeneralError(null);

        const ipRegex =
            /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        if (!ipValue.trim()) {
            setError("O endereço IP é obrigatório");
            return;
        }

        if (!ipRegex.test(ipValue.trim())) {
            setError("Formato de IP inválido. Use o formato: 192.168.1.1");
            return;
        }

        setLoading(true);

        try {
            const res = await addIpToWhitelist(ipValue.trim());

            if (res.error) {
                setGeneralError(res.error);
                return;
            }

            router.refresh();

            setIpValue("");
        } catch (err) {
            setGeneralError(
                "Erro ao adicionar IP à whitelist. Tente novamente.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addToWhitelist();
        }
    };

    return (
        <>
            <section
                id="pageHeader"
                className="py-8 px-8 border-b-gradient flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <h1 id="pageTitle" className="font-bold text-2xl">
                    Ip Whitelist
                </h1>
                <div
                    id="pageAction"
                    className="md:flex-1 grid md:grid-cols-[1fr_200px] grid-cols-[1fr_100px] gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <Input
                            name="addIp"
                            id="addIp"
                            placeholder="120.0.0.1"
                            value={ipValue}
                            onChange={(e) => setIpValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={error ? "border-destructive" : ""}
                        />
                        {error && (
                            <p className="text-destructive text-sm">{error}</p>
                        )}
                    </div>
                    <Button
                        onClick={addToWhitelist}
                        disabled={loading}
                        className="cursor-pointer"
                    >
                        {loading ? "Adicionando..." : "Add to Whitelist"}
                    </Button>
                </div>
            </section>

            {generalError && (
                <div className="mx-8 mt-4 bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
                    {generalError}
                </div>
            )}
        </>
    );
};

export default IpWhitelistHeader;
