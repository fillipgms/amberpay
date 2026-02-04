"use client";
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "./ui/Credenza";
import { Button } from "./ui/button";
import ArrowsOppositeDirection from "@/public/icons/arrows-opposite-direction";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
    createTransaction,
    checkTransactionStatus,
    CreateTransactionResponse,
} from "@/actions/transactions";
import { toast } from "sonner";
import Image from "next/image";
import gsap from "gsap";
import { useDashboard } from "@/contexts/DashboardContext";

const AddBalanceModal = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const successRef = useRef<HTMLDivElement>(null);
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const { refreshDashboard } = useDashboard();

    const [displayValue, setDisplayValue] = useState("");
    const [floatValue, setFloatValue] = useState(0.0);
    const [document, setDocument] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [transactionData, setTransactionData] =
        useState<CreateTransactionResponse | null>(null);
    const [isPolling, setIsPolling] = useState(false);
    const [pollingStatus, setPollingStatus] = useState<
        "pending" | "approved" | "rejected"
    >("pending");

    const addBalanceOpen = searchParams.get("balance") === "true";

    const handleOpenChange = (open: boolean) => {
        if (open) {
            router.push("?balance=true");
        } else {
            router.push(window.location.pathname);
            // Reset state when closing
            resetForm();
        }
    };

    const resetForm = () => {
        setDisplayValue("");
        setFloatValue(0.0);
        setDocument("");
        setError("");
        setTransactionData(null);
        setIsPolling(false);
        setPollingStatus("pending");
    };

    const formatBRL = (value: string) => {
        const numbers = value.replace(/\D/g, "");

        if (!numbers) {
            setDisplayValue("");
            setFloatValue(0.0);
            return;
        }

        const float = parseFloat(numbers) / 100;
        setFloatValue(parseFloat(float.toFixed(2)));

        const formatted = float.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        setDisplayValue(`R$ ${formatted}`);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formatBRL(e.target.value);
    };

    const handleSubmit = async () => {
        setError("");

        if (floatValue <= 0) {
            setError("O valor deve ser maior que zero");
            return;
        }

        if (!document || document.length < 11) {
            setError("Documento inválido");
            return;
        }

        setIsLoading(true);

        const result = await createTransaction(floatValue, document);

        setIsLoading(false);

        if (!result.success || !result.data) {
            setError(result.error || "Erro ao criar transação");
            return;
        }

        setTransactionData(result.data);
        setIsPolling(true);
    };

    // Animate QR code when it appears
    useEffect(() => {
        if (transactionData && qrCodeRef.current) {
            gsap.fromTo(
                qrCodeRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }
            );
        }
    }, [transactionData]);

    // Animate success message
    useEffect(() => {
        if (pollingStatus === "approved" && successRef.current) {
            gsap.fromTo(
                successRef.current,
                { scale: 0.5, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(2)"
                }
            );
        }
    }, [pollingStatus]);

    // Polling effect - increased interval to reduce API calls
    useEffect(() => {
        if (!isPolling || !transactionData) return;

        const pollInterval = setInterval(async () => {
            const status = await checkTransactionStatus(
                transactionData.id_transaction,
            );

            if (status.approved) {
                setPollingStatus("approved");
                setIsPolling(false);
                toast.success("Pagamento aprovado com sucesso!");

                // Refresh dashboard to show new balance with smooth animation
                refreshDashboard();

                setTimeout(() => {
                    router.push(window.location.pathname);
                    resetForm();
                }, 2000);
            } else if (status.error) {
                setPollingStatus("rejected");
                setIsPolling(false);
                toast.error("Pagamento recusado");
            }
        }, 5000); // Increased from 3s to 5s to reduce API calls

        return () => clearInterval(pollInterval);
    }, [isPolling, transactionData, router, refreshDashboard]);

    const handleCopyQRCode = () => {
        if (transactionData?.qrcode) {
            navigator.clipboard.writeText(transactionData.qrcode);
            toast.success("Código PIX copiado!");
        }
    };

    return (
        <>
            <Credenza open={addBalanceOpen} onOpenChange={handleOpenChange}>
                <CredenzaTrigger asChild>
                    <Button className="action-button" variant="outline">
                        <ArrowsOppositeDirection className="text-foreground" />
                        Adicionar Saldo
                    </Button>
                </CredenzaTrigger>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>Adicionar Saldo</CredenzaTitle>
                    </CredenzaHeader>
                    <CredenzaBody className="flex-1 overflow-y-auto overflow-x-hidden">
                        <ScrollArea>
                            <div className="space-y-6">
                                {!transactionData ? (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="amount">
                                                Valor
                                            </label>
                                            <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                                                <input
                                                    type="text"
                                                    name="amount"
                                                    id="amount"
                                                    value={displayValue}
                                                    onChange={handleValueChange}
                                                    placeholder="R$ 0,00"
                                                    className={`w-full py-1 pl-4 pr-8 ${error && floatValue <= 0 ? "border-destructive" : ""}`}
                                                />
                                            </div>
                                            <p className="text-xs text-foreground/50">
                                                Valor para API:{" "}
                                                {floatValue.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="document">
                                                Documento (CPF/CNPJ)
                                            </label>
                                            <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                                                <input
                                                    type="text"
                                                    name="document"
                                                    id="document"
                                                    value={document}
                                                    onChange={(e) =>
                                                        setDocument(
                                                            e.target.value.replace(
                                                                /\D/g,
                                                                "",
                                                            ),
                                                        )
                                                    }
                                                    placeholder="00000000000"
                                                    className={`w-full py-1 pl-4 pr-8 ${error && document.length < 11 ? "border-destructive" : ""}`}
                                                    maxLength={14}
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <p className="text-destructive text-sm">
                                                {error}
                                            </p>
                                        )}

                                        <div className="flex gap-3 pt-4 border-t border-border">
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    handleOpenChange(false)
                                                }
                                                className="flex-1"
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                onClick={handleSubmit}
                                                className="flex-1"
                                                disabled={isLoading}
                                            >
                                                {isLoading
                                                    ? "Criando..."
                                                    : "Gerar QR Code"}
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-center gap-4">
                                            <div
                                                ref={qrCodeRef}
                                                className="p-4 bg-white rounded-lg"
                                            >
                                                <Image
                                                    src={`data:image/png;base64,${transactionData.qrcode_base64}`}
                                                    alt="QR Code PIX"
                                                    width={300}
                                                    height={300}
                                                />
                                            </div>

                                            <div className="w-full space-y-2">
                                                <p className="text-sm text-foreground/70">
                                                    ID da Transação:
                                                </p>
                                                <p className="font-mono text-sm font-medium">
                                                    {
                                                        transactionData.id_transaction
                                                    }
                                                </p>
                                            </div>

                                            <div className="w-full space-y-2">
                                                <p className="text-sm text-foreground/70">
                                                    Código PIX Copia e Cola:
                                                </p>
                                                <div className="p-3 bg-muted rounded-lg break-all text-xs font-mono">
                                                    {transactionData.qrcode}
                                                </div>
                                            </div>

                                            {isPolling && (
                                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                                    <p>
                                                        Aguardando confirmação
                                                        do pagamento...
                                                    </p>
                                                </div>
                                            )}

                                            {pollingStatus === "approved" && (
                                                <div
                                                    ref={successRef}
                                                    className="text-sm text-green-600 font-medium"
                                                >
                                                    ✓ Pagamento aprovado!
                                                </div>
                                            )}

                                            {pollingStatus === "rejected" && (
                                                <div className="text-sm text-destructive font-medium">
                                                    ✗ Pagamento recusado
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-3 pt-4 border-t border-border">
                                            <Button
                                                variant="outline"
                                                onClick={handleCopyQRCode}
                                                className="flex-1"
                                            >
                                                Copiar Código
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleOpenChange(false)
                                                }
                                                className="flex-1"
                                            >
                                                Fechar
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </ScrollArea>
                    </CredenzaBody>
                </CredenzaContent>
            </Credenza>
        </>
    );
};

export default AddBalanceModal;
