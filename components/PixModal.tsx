"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
} from "./ui/Credenza";
import { ConfirmPix } from "@/actions/pix";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";

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

interface PixModalProps {
    pixKey: string;
    response: PixResponse;
}

const PixModal = ({ pixKey, response }: PixModalProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for formatted display value and actual float value
    const [displayValue, setDisplayValue] = useState("");
    const [floatValue, setFloatValue] = useState(0.0);
    const [description, setDescription] = useState("");
    const [document_PLACEHOLDER, setDocument_PLACEHOLDER] = useState("");
    const [isThePerson, setIsThePerson] = useState(false);
    const [error, setError] = useState("");

    const isOpen = searchParams.get("pix") === pixKey;

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

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // Go back to withdraw modal
            router.push("?withdraw=true");
        }
    };

    const handleConfirm = async () => {
        const res = await ConfirmPix(
            floatValue,
            document_PLACEHOLDER,
            response.endId,
            description,
        );

        if (res.status !== 200) {
            setError(res.data.message || res.data.msg);
        } else {
            toast.success("Pagamento Realizado com Sucesso");
        }

        router.replace(window.location.pathname);
    };

    const handleCancel = () => {
        router.push("?withdraw=true");
    };

    return (
        <Credenza open={isOpen} onOpenChange={handleOpenChange}>
            <CredenzaContent className="max-w-2xl">
                <CredenzaHeader>
                    <CredenzaTitle>Realizando Transaferência Pix</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody>
                    <ScrollArea>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="col-span-2">
                                            <p className="text-foreground/70 mb-1">
                                                Nome
                                            </p>
                                            <p className="capitalize font-medium">
                                                {response.nome}
                                            </p>
                                        </div>
                                        {!isThePerson && (
                                            <>
                                                <div>
                                                    <p className="text-foreground/70 mb-1">
                                                        Tipo de Chave
                                                    </p>
                                                    <p className="font-medium">
                                                        {response.pix_type.toUpperCase()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-foreground/70 mb-1">
                                                        Chave PIX
                                                    </p>
                                                    <p className="font-medium break-all">
                                                        {response.pix_key}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-foreground/70 mb-1">
                                                        Documento
                                                    </p>
                                                    <p className="font-medium">
                                                        {response.document}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-foreground/70 mb-1">
                                                        Valor Mínimo
                                                    </p>
                                                    <p className="font-medium">
                                                        R${" "}
                                                        {response.deposit_minim.toFixed(
                                                            2,
                                                        )}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="text-sm text-foreground/70 p-3 rounded-lg bg-muted/30">
                                    <p>
                                        ⚠️ Verifique todos os dados antes de
                                        confirmar a transferência. Esta ação não
                                        pode ser desfeita.
                                    </p>
                                </div>

                                {!isThePerson && (
                                    <p className="font-bold text-lg">
                                        Essa é a pessoa que você quer pagar?
                                    </p>
                                )}
                            </div>

                            {isThePerson ? (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="pixValue">
                                            Quanto quer pagar
                                        </label>
                                        <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                                            <input
                                                type="text"
                                                name="pixValue"
                                                id="pixValue"
                                                value={displayValue}
                                                onChange={handleValueChange}
                                                placeholder="R$ 0,00"
                                                className={`w-full py-1 pl-4 pr-8 ${false ? "border-destructive" : ""}`}
                                            />
                                        </div>
                                        {/* Hidden debug info - remove in production */}
                                        <p className="text-xs text-foreground/50">
                                            Valor para API:{" "}
                                            {floatValue.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="descriptio">
                                            Descrição {"(opcional)"}
                                        </label>
                                        <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                                            <input
                                                type="text"
                                                name="descriptio"
                                                id="descriptio"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Estou lhe enviando o pagamento referente..."
                                                className={`w-full py-1 pl-4 pr-8 ${false ? "border-destructive" : ""}`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="descriptio">
                                            Documento do Destinatário
                                        </label>
                                        <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                                            <input
                                                type="number"
                                                name="document_PLACEHOLDER"
                                                id="document_PLACEHOLDER"
                                                value={document_PLACEHOLDER}
                                                onChange={(e) =>
                                                    setDocument_PLACEHOLDER(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Estou lhe enviando o pagamento referente..."
                                                className={`w-full py-1 pl-4 pr-8 ${false ? "border-destructive" : ""}`}
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <p className="text-destructive">
                                            Erro: {error}
                                        </p>
                                    )}

                                    <div className="flex gap-3 pt-4 border-t border-border">
                                        <Button
                                            variant="outline"
                                            onClick={handleCancel}
                                            className="flex-1"
                                        >
                                            Voltar
                                        </Button>
                                        <Button
                                            onClick={handleConfirm}
                                            className="flex-1"
                                        >
                                            Confirmar PIX
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex gap-3 pt-4 border-t border-border">
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        className="flex-1"
                                    >
                                        Não, Voltar
                                    </Button>
                                    <Button
                                        onClick={() => setIsThePerson(true)}
                                        className="flex-1"
                                    >
                                        Sim
                                    </Button>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default PixModal;
