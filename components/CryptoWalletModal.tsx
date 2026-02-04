"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "./ui/Credenza";
import { Button } from "./ui/button";
import { WalletIcon, TrashIcon, PlusIcon } from "@phosphor-icons/react";
import Input from "./Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import {
    getCryptoWallets,
    createCryptoWallet,
    deleteCryptoWallet,
} from "@/actions/withdrawal";
import { ScrollArea } from "./ui/scroll-area";

interface CryptoWallet {
    id: number;
    total_out: string;
    name: string;
    adress: string;
    currency: string;
    type: string;
    created_at: string;
}

const CryptoWalletModal = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const walletOpen = searchParams.get("crypto-wallets") === "true";

    const [wallets, setWallets] = useState<CryptoWallet[]>([]);
    const [loading, setLoading] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Form states
    const [walletName, setWalletName] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [currency, setCurrency] = useState("USDT");
    const [networkType, setNetworkType] = useState("TRC20");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (walletOpen) {
            fetchWallets();
        }
    }, [walletOpen]);

    const fetchWallets = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getCryptoWallets();
            if (response.status === 200 && response.data.status === 1) {
                setWallets(response.data.wallets || []);
            } else {
                setError("Erro ao carregar carteiras");
            }
        } catch (err) {
            setError("Erro ao carregar carteiras");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateWallet = async () => {
        if (!walletName || !walletAddress) {
            setError("Preencha todos os campos");
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await createCryptoWallet(
                walletName,
                walletAddress,
                currency,
                networkType,
            );

            if (response.status === 200 && response.data.status === 1) {
                setSuccess("Carteira criada com sucesso!");
                setWalletName("");
                setWalletAddress("");
                setShowCreateForm(false);
                await fetchWallets();
            } else {
                setError(response.data.msg || "Erro ao criar carteira");
            }
        } catch (err) {
            setError("Erro ao criar carteira");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteWallet = async (id: number) => {
        if (!confirm("Tem certeza que deseja deletar esta carteira?")) {
            return;
        }

        setError(null);
        setSuccess(null);

        try {
            const response = await deleteCryptoWallet(id);
            if (response.status === 200 && response.data.status === 1) {
                setSuccess("Carteira deletada com sucesso!");
                await fetchWallets();
            } else {
                setError(response.data.msg || "Erro ao deletar carteira");
            }
        } catch (err) {
            setError("Erro ao deletar carteira");
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (open) {
            router.push("?crypto-wallets=true");
        } else {
            router.push(window.location.pathname);
            setShowCreateForm(false);
            setError(null);
            setSuccess(null);
        }
    };

    return (
        <Credenza open={walletOpen} onOpenChange={handleOpenChange}>
            <CredenzaTrigger asChild>
                <button className="flex items-center gap-2 w-full">
                    <WalletIcon size={20} weight="duotone" />
                    Carteiras Crypto
                </button>
            </CredenzaTrigger>
            <CredenzaContent className="max-h-[85vh] flex flex-col max-w-2xl">
                <CredenzaHeader className="shrink-0">
                    <CredenzaTitle>Gerenciar Carteiras Crypto</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="flex-1 overflow-y-auto overflow-x-hidden">
                    <ScrollArea>
                        <div className="space-y-6">
                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                                    <p className="text-sm text-destructive font-medium">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {success && (
                                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                                    <p className="text-sm text-green-600 font-medium">
                                        {success}
                                    </p>
                                </div>
                            )}

                            {!showCreateForm && (
                                <Button
                                    onClick={() => setShowCreateForm(true)}
                                    className="w-full gap-2"
                                >
                                    <PlusIcon size={20} weight="bold" />
                                    Adicionar Nova Carteira
                                </Button>
                            )}

                            {showCreateForm && (
                                <section className="space-y-4 p-4 rounded-lg border border-border bg-card/30">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-foreground/70">
                                            Nova Carteira
                                        </h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setShowCreateForm(false);
                                                setError(null);
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-foreground/70 mb-2 block">
                                                Nome da Carteira
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="Ex: Carteira Principal"
                                                value={walletName}
                                                onChange={(e) =>
                                                    setWalletName(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-foreground/70 mb-2 block">
                                                Endereço da Carteira
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="Ex: TYsy2XGVGF6JZeTH3DVJmVefvBtZaBnUw4"
                                                value={walletAddress}
                                                onChange={(e) =>
                                                    setWalletAddress(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-foreground/70 mb-2 block">
                                                    Moeda
                                                </label>
                                                <Select
                                                    value={currency}
                                                    onValueChange={setCurrency}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="USDT">
                                                            USDT
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-foreground/70 mb-2 block">
                                                    Rede
                                                </label>
                                                <Select
                                                    value={networkType}
                                                    onValueChange={
                                                        setNetworkType
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="TRC20">
                                                            TRC20
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleCreateWallet}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        >
                                            {isSubmitting
                                                ? "Criando..."
                                                : "Criar Carteira"}
                                        </Button>
                                    </div>
                                </section>
                            )}

                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-foreground/70 pb-2 border-b border-border/50">
                                    Minhas Carteiras
                                </h3>

                                {loading ? (
                                    <div className="text-center py-8 text-foreground/60">
                                        Carregando...
                                    </div>
                                ) : wallets.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-foreground/60">
                                            Nenhuma carteira cadastrada
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {wallets.map((wallet) => (
                                            <div
                                                key={wallet.id}
                                                className="p-4 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <WalletIcon
                                                                size={20}
                                                                weight="duotone"
                                                                className="text-primary"
                                                            />
                                                            <h4 className="font-semibold text-foreground">
                                                                {wallet.name}
                                                            </h4>
                                                        </div>
                                                        <div className="space-y-1 text-sm">
                                                            <p className="text-foreground/70 break-all">
                                                                <span className="font-medium">
                                                                    Endereço:
                                                                </span>{" "}
                                                                {wallet.adress}
                                                            </p>
                                                            <div className="flex gap-4">
                                                                <p className="text-foreground/70">
                                                                    <span className="font-medium">
                                                                        Moeda:
                                                                    </span>{" "}
                                                                    {
                                                                        wallet.currency
                                                                    }
                                                                </p>
                                                                <p className="text-foreground/70">
                                                                    <span className="font-medium">
                                                                        Rede:
                                                                    </span>{" "}
                                                                    {
                                                                        wallet.type
                                                                    }
                                                                </p>
                                                            </div>
                                                            <p className="text-foreground/70">
                                                                <span className="font-medium">
                                                                    Total de
                                                                    saques:
                                                                </span>{" "}
                                                                {
                                                                    wallet.total_out
                                                                }
                                                            </p>
                                                            <p className="text-foreground/60 text-xs">
                                                                Criada em{" "}
                                                                {
                                                                    wallet.created_at
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDeleteWallet(
                                                                wallet.id,
                                                            )
                                                        }
                                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <TrashIcon
                                                            size={20}
                                                            weight="duotone"
                                                        />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>
                    </ScrollArea>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default CryptoWalletModal;
