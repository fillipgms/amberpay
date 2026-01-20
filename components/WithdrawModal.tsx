"use client";

import { useState } from "react";
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "./ui/Credenza";
import { Button } from "./ui/button";
import ArrowsBoldOpositeDirection from "@/public/icons/arrows-bold-opposite-direction";
import {
    CurrencyCircleDollarIcon,
    PixLogoIcon,
    CurrencyBtcIcon,
} from "@phosphor-icons/react";
import Input from "./Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

type WithdrawMethod = "pix" | "crypto";
type PixKeyType = "cpf" | "cnpj" | "email" | "phone" | "random";

const WithdrawModal = () => {
    const [withdrawMethod, setWithdrawMethod] = useState<WithdrawMethod>("pix");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [cpfOrCnpj, setCpfOrCnpj] = useState("");
    const [pixKeyType, setPixKeyType] = useState<PixKeyType>("cpf");
    const [pixKey, setPixKey] = useState("");
    const [pixAmount, setPixAmount] = useState("");

    const [cryptoNetwork, setCryptoNetwork] = useState("");
    const [cryptoAddress, setCryptoAddress] = useState("");
    const [cryptoAmount, setCryptoAmount] = useState("");

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (withdrawMethod === "pix") {
                console.log("PIX Withdrawal:", {
                    cpfOrCnpj,
                    pixKeyType,
                    pixKey,
                    amount: pixAmount,
                });
            } else {
                console.log("Crypto Withdrawal:", {
                    network: cryptoNetwork,
                    address: cryptoAddress,
                    amount: cryptoAmount,
                });
            }
        } catch (error) {
            console.error("Failed to process withdrawal:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button className="action-button">
                    <ArrowsBoldOpositeDirection className="text-background size-7!" />
                    Realizar Transferencia
                </Button>
            </CredenzaTrigger>
            <CredenzaContent className="max-h-[85vh] flex flex-col max-w-2xl">
                <CredenzaHeader className="shrink-0">
                    <CredenzaTitle>Realizar Saque</CredenzaTitle>
                </CredenzaHeader>

                <CredenzaBody className="flex-1 overflow-y-auto">
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-sm font-semibold text-foreground/70 mb-4 pb-2 border-b border-border/50">
                                Método de Saque
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setWithdrawMethod("pix")}
                                    className={cn(
                                        "p-4 rounded-lg border-2 transition-all duration-200",
                                        "flex flex-col items-center gap-3",
                                        "hover:border-primary/50 hover:bg-primary/5",
                                        withdrawMethod === "pix"
                                            ? "border-primary bg-primary/10"
                                            : "border-border/50 bg-card/30",
                                    )}
                                >
                                    <PixLogoIcon
                                        size={32}
                                        weight="duotone"
                                        className={cn(
                                            "transition-colors",
                                            withdrawMethod === "pix"
                                                ? "text-primary"
                                                : "text-foreground/60",
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            "font-semibold text-sm",
                                            withdrawMethod === "pix"
                                                ? "text-foreground"
                                                : "text-foreground/70",
                                        )}
                                    >
                                        PIX
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setWithdrawMethod("crypto")}
                                    className={cn(
                                        "p-4 rounded-lg border-2 transition-all duration-200",
                                        "flex flex-col items-center gap-3",
                                        "hover:border-primary/50 hover:bg-primary/5",
                                        withdrawMethod === "crypto"
                                            ? "border-primary bg-primary/10"
                                            : "border-border/50 bg-card/30",
                                    )}
                                >
                                    <CurrencyBtcIcon
                                        size={32}
                                        weight="duotone"
                                        className={cn(
                                            "transition-colors",
                                            withdrawMethod === "crypto"
                                                ? "text-primary"
                                                : "text-foreground/60",
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            "font-semibold text-sm",
                                            withdrawMethod === "crypto"
                                                ? "text-foreground"
                                                : "text-foreground/70",
                                        )}
                                    >
                                        Crypto
                                    </span>
                                </button>
                            </div>
                        </section>

                        {withdrawMethod === "pix" && (
                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-foreground/70 mb-4 pb-2 border-b border-border/50">
                                    Dados do PIX
                                </h3>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center">
                                        <label
                                            htmlFor="cpfOrCnpj"
                                            className="text-sm font-medium text-foreground/70"
                                        >
                                            CPF / CNPJ
                                        </label>
                                        <Input
                                            type="text"
                                            name="cpfOrCnpj"
                                            id="cpfOrCnpj"
                                            placeholder="000.000.000-00"
                                            defaultValue={cpfOrCnpj}
                                            onChange={(e) =>
                                                setCpfOrCnpj(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center">
                                        <label
                                            htmlFor="pixKeyType"
                                            className="text-sm font-medium text-foreground/70"
                                        >
                                            Tipo da Chave
                                        </label>
                                        <Select
                                            value={pixKeyType}
                                            onValueChange={(value) =>
                                                setPixKeyType(
                                                    value as PixKeyType,
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="pixKeyType"
                                                className="w-full"
                                            >
                                                <SelectValue placeholder="Selecione o tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cpf">
                                                    CPF
                                                </SelectItem>
                                                <SelectItem value="cnpj">
                                                    CNPJ
                                                </SelectItem>
                                                <SelectItem value="email">
                                                    E-mail
                                                </SelectItem>
                                                <SelectItem value="phone">
                                                    Telefone
                                                </SelectItem>
                                                <SelectItem value="random">
                                                    Chave Aleatória
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center">
                                        <label
                                            htmlFor="pixKey"
                                            className="text-sm font-medium text-foreground/70"
                                        >
                                            Chave PIX
                                        </label>
                                        <Input
                                            type="text"
                                            name="pixKey"
                                            id="pixKey"
                                            placeholder="Digite a chave PIX"
                                            defaultValue={pixKey}
                                            onChange={(e) =>
                                                setPixKey(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center">
                                        <label
                                            htmlFor="pixAmount"
                                            className="text-sm font-medium text-foreground/70"
                                        >
                                            Valor
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                name="pixAmount"
                                                id="pixAmount"
                                                placeholder="0,00"
                                                defaultValue={pixAmount}
                                                onChange={(e) =>
                                                    setPixAmount(e.target.value)
                                                }
                                                icon={
                                                    <CurrencyCircleDollarIcon
                                                        size={20}
                                                        weight="duotone"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50"
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 rounded-lg bg-background/50 border border-border/50">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-foreground/70">
                                            Taxa de saque
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            R$ 0,00
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-border/30">
                                        <span className="font-medium text-foreground/70">
                                            Você receberá
                                        </span>
                                        <span className="font-bold text-foreground text-base">
                                            R${" "}
                                            {pixAmount
                                                ? parseFloat(
                                                      pixAmount.replace(
                                                          ",",
                                                          ".",
                                                      ),
                                                  ).toFixed(2)
                                                : "0,00"}
                                        </span>
                                    </div>
                                </div>
                            </section>
                        )}

                        {withdrawMethod === "crypto" && (
                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-foreground/70 mb-4 pb-2 border-b border-border/50">
                                    Dados da Crypto
                                </h3>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center">
                                        <label
                                            htmlFor="cryptoNetwork"
                                            className="text-sm font-medium text-foreground/70"
                                        >
                                            Rede
                                        </label>
                                        <Select
                                            value={cryptoNetwork}
                                            onValueChange={setCryptoNetwork}
                                        >
                                            <SelectTrigger
                                                id="cryptoNetwork"
                                                className="w-full"
                                            >
                                                <SelectValue placeholder="Selecione a rede" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="btc">
                                                    Bitcoin (BTC)
                                                </SelectItem>
                                                <SelectItem value="eth">
                                                    Ethereum (ETH)
                                                </SelectItem>
                                                <SelectItem value="usdt-trc20">
                                                    USDT (TRC20)
                                                </SelectItem>
                                                <SelectItem value="usdt-erc20">
                                                    USDT (ERC20)
                                                </SelectItem>
                                                <SelectItem value="bnb">
                                                    BNB (BEP20)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center">
                                        <label
                                            htmlFor="cryptoAddress"
                                            className="text-sm font-medium text-foreground/70"
                                        >
                                            Endereço
                                        </label>
                                        <Input
                                            type="text"
                                            name="cryptoAddress"
                                            id="cryptoAddress"
                                            placeholder="Endereço da carteira"
                                            defaultValue={cryptoAddress}
                                            onChange={(e) =>
                                                setCryptoAddress(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center">
                                        <label
                                            htmlFor="cryptoAmount"
                                            className="text-sm font-medium text-foreground/70"
                                        >
                                            Valor
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                name="cryptoAmount"
                                                id="cryptoAmount"
                                                placeholder="0,00"
                                                defaultValue={cryptoAmount}
                                                onChange={(e) =>
                                                    setCryptoAmount(
                                                        e.target.value,
                                                    )
                                                }
                                                icon={
                                                    <CurrencyCircleDollarIcon
                                                        size={20}
                                                        weight="duotone"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50"
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 rounded-lg bg-background/50 border border-border/50">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-foreground/70">
                                            Taxa de rede
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            R$ 0,00
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-border/30">
                                        <span className="font-medium text-foreground/70">
                                            Você receberá
                                        </span>
                                        <span className="font-bold text-foreground text-base">
                                            R${" "}
                                            {cryptoAmount
                                                ? parseFloat(
                                                      cryptoAmount.replace(
                                                          ",",
                                                          ".",
                                                      ),
                                                  ).toFixed(2)
                                                : "0,00"}
                                        </span>
                                    </div>
                                </div>
                            </section>
                        )}

                        <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t border-border/50 -mx-6 px-6">
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting
                                    ? "Processando..."
                                    : "Confirmar Saque"}
                            </Button>
                        </div>
                    </div>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default WithdrawModal;
