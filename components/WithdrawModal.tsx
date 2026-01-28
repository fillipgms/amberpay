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
import { twMerge } from "tailwind-merge";
import { initilizePix } from "@/actions/pix";
import PixModal from "./PixModal";

type WithdrawMethod = "pix" | "crypto";
type PixKeyType = "cpf" | "cnpj" | "phone" | "email" | "random" | "unknown";

interface PixResponse {
    deposit_minim: number;
    document: string;
    endId: string;
    fee_fixed: number;
    fee_percent: number;
    nome: string;
    pix_key: string;
    pix_type: string;
    status: number;
}

const WithdrawModal = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL state determines which modal is open
    const withdrawOpen = searchParams.get("withdraw") === "true";
    const pixKey = searchParams.get("pix");

    const [withdrawMethod, setWithdrawMethod] = useState<WithdrawMethod>("pix");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pixKeyInput, setPixKeyInput] = useState("");
    const [pixType, setPixType] = useState<PixKeyType>("unknown");
    const [cryptoNetwork, setCryptoNetwork] = useState("");
    const [cryptoAddress, setCryptoAddress] = useState("");
    const [cryptoAmount, setCryptoAmount] = useState("");
    const [pixError, setPixError] = useState<string | null>(null);
    const [pixResponse, setPixResponse] = useState<PixResponse | null>(null);

    // Validation functions
    const isValidCPF = (cpf: string): boolean => {
        const clean = cpf.replace(/\D/g, "");
        if (clean.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(clean)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(clean.charAt(i)) * (10 - i);
        }
        let checkDigit = 11 - (sum % 11);
        if (checkDigit >= 10) checkDigit = 0;
        if (checkDigit !== parseInt(clean.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(clean.charAt(i)) * (11 - i);
        }
        checkDigit = 11 - (sum % 11);
        if (checkDigit >= 10) checkDigit = 0;
        if (checkDigit !== parseInt(clean.charAt(10))) return false;

        return true;
    };

    const isValidCNPJ = (cnpj: string): boolean => {
        const clean = cnpj.replace(/\D/g, "");
        if (clean.length !== 14) return false;
        if (/^(\d)\1{13}$/.test(clean)) return false;

        let length = clean.length - 2;
        let numbers = clean.substring(0, length);
        const digits = clean.substring(length);
        let sum = 0;
        let pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += parseInt(numbers.charAt(length - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(0))) return false;

        length = length + 1;
        numbers = clean.substring(0, length);
        sum = 0;
        pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += parseInt(numbers.charAt(length - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(1))) return false;

        return true;
    };

    const detectPixKey = (value: string): PixKeyType => {
        const clean = value.replace(/\s/g, "").replace(/[.\-/()\s]/g, "");

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            return "email";
        }

        if (
            /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                clean,
            )
        ) {
            return "random";
        }

        if (/^[0-9]+$/.test(clean)) {
            const length = clean.length;

            if (length === 14) {
                if (isValidCNPJ(clean)) {
                    return "cnpj";
                }
                return "unknown";
            }

            if (length === 11) {
                if (isValidCPF(clean)) {
                    return "cpf";
                }
                if (clean[2] === "9") {
                    return "phone";
                }
                return "unknown";
            }

            if (length === 10) {
                return "phone";
            }

            if (length > 0 && length < 10) {
                return "unknown";
            }

            if (length > 14) {
                return "unknown";
            }
        }

        return "unknown";
    };

    const formatPixKey = (value: string, type: PixKeyType): string => {
        if (type === "email" || type === "random") {
            return value;
        }

        const clean = value.replace(/\D/g, "");

        switch (type) {
            case "cpf":
                if (clean.length <= 11) {
                    return clean
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                }
                return clean
                    .substring(0, 11)
                    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

            case "cnpj":
                if (clean.length <= 14) {
                    return clean
                        .replace(/^(\d{2})(\d)/, "$1.$2")
                        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                        .replace(/\.(\d{3})(\d)/, ".$1/$2")
                        .replace(/(\d{4})(\d)/, "$1-$2");
                }
                return clean
                    .substring(0, 14)
                    .replace(
                        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                        "$1.$2.$3/$4-$5",
                    );

            case "phone":
                if (clean.length <= 11) {
                    if (clean.length <= 10) {
                        return clean
                            .replace(/^(\d{2})(\d)/, "($1) $2")
                            .replace(/(\d{4})(\d)/, "$1-$2");
                    } else {
                        return clean
                            .replace(/^(\d{2})(\d)/, "($1) $2")
                            .replace(/(\d{5})(\d)/, "$1-$2");
                    }
                }
                return clean
                    .substring(0, 11)
                    .replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

            default:
                return value;
        }
    };

    const getPixKeyLabel = (type: PixKeyType): string => {
        switch (type) {
            case "cpf":
                return "CPF detectado";
            case "cnpj":
                return "CNPJ detectado";
            case "phone":
                return "Telefone detectado";
            case "email":
                return "E-mail detectado";
            case "random":
                return "Chave aleatória detectada";
            default:
                return "";
        }
    };

    const handlePixChange = (value: string) => {
        const detectedType = detectPixKey(value);
        const formattedValue = formatPixKey(value, detectedType);
        setPixError(null);
        setPixType(detectedType);
        setPixKeyInput(formattedValue);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (withdrawMethod === "pix") {
                const res = await initilizePix(pixType, pixKeyInput);
                if (res && res.status === 200) {
                    const cleanPixKey = pixKeyInput.replace(
                        /[^a-zA-Z0-9@]/g,
                        "",
                    );
                    setPixResponse(res.data);
                    // Navigate to pix confirmation step
                    router.push(`?pix=${cleanPixKey}`);
                } else {
                    setPixType("unknown");
                    setPixError(res.data.message);
                }
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

    const handleOpenChange = (open: boolean) => {
        if (open) {
            router.push("?withdraw=true");
        } else {
            router.push(window.location.pathname);
        }
    };

    return (
        <>
            <Credenza open={withdrawOpen} onOpenChange={handleOpenChange}>
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
                    <CredenzaBody className="flex-1 overflow-y-auto overflow-x-hidden">
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
                                        onClick={() =>
                                            setWithdrawMethod("crypto")
                                        }
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
                                        <div className="space-y-2">
                                            <Input
                                                type="text"
                                                name="pixKey"
                                                id="pixKey"
                                                placeholder="CPF, CNPJ, celular, e-mail ou chave aleatória"
                                                value={pixKeyInput}
                                                onChange={(e) =>
                                                    handlePixChange(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {pixType !== "unknown" && (
                                                <p className="text-xs text-primary font-medium pl-1">
                                                    ✓ {getPixKeyLabel(pixType)}
                                                </p>
                                            )}
                                            {pixError && (
                                                <p className="text-xs text-destructive font-medium pl-1">
                                                    {pixError}
                                                </p>
                                            )}
                                        </div>

                                        <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t border-border/50 -mx-6 px-6">
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={
                                                    isSubmitting ||
                                                    pixType === "unknown"
                                                }
                                                className={twMerge(
                                                    "w-full",
                                                    pixType !== "unknown" &&
                                                        "cursor-pointer",
                                                )}
                                            >
                                                {isSubmitting
                                                    ? "Processando..."
                                                    : "Prosseguir com PIX"}
                                            </Button>
                                        </div>
                                    </div>
                                </section>
                            )}
                            {withdrawMethod === "crypto" && (
                                <>
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
                                                    onValueChange={
                                                        setCryptoNetwork
                                                    }
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
                                                        setCryptoAddress(
                                                            e.target.value,
                                                        )
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
                                                        defaultValue={
                                                            cryptoAmount
                                                        }
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
                                    <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t border-border/50 -mx-6 px-6">
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="w-full cursor-pointer"
                                        >
                                            {isSubmitting
                                                ? "Processando..."
                                                : "Confirmar Saque"}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </CredenzaBody>
                </CredenzaContent>
            </Credenza>

            {pixKey && pixResponse && (
                <PixModal pixKey={pixKey} response={pixResponse} />
            )}
        </>
    );
};

export default WithdrawModal;
