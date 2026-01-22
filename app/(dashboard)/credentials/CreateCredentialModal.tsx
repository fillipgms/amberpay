"use client";
import { createCredential } from "@/actions/credentials";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateCredentialModal = () => {
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const handleCreateCredential = async () => {
        setError(null);
        setGeneralError(null);

        if (!description.trim()) {
            setError("A descrição é obrigatória");
            return;
        }

        if (description.trim().length < 3) {
            setError("A descrição deve ter pelo menos 3 caracteres");
            return;
        }

        setLoading(true);

        try {
            const res = await createCredential({
                descricao: description.trim(),
            });

            if (!res) {
                setGeneralError("Erro ao criar credencial. Tente novamente.");
                return;
            }

            if (res.error) {
                setGeneralError(res.error);
                return;
            }

            router.refresh();

            setDescription("");
            setOpen(false);
        } catch (err) {
            setGeneralError("Erro ao criar credencial. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCreateCredential();
        }
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            // Reset form when closing
            setDescription("");
            setError(null);
            setGeneralError(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    Criar Nova Credencial
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Criar Nova Credencial</DialogTitle>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="description">Descrição</label>
                        <Input
                            id="description"
                            name="description"
                            placeholder="Para o que é essa credencial?"
                            value={description}
                            onChange={(evt) => setDescription(evt.target.value)}
                            onKeyPress={handleKeyPress}
                            className={error ? "border-destructive" : ""}
                        />
                        {error && (
                            <p className="text-destructive text-sm">{error}</p>
                        )}
                    </div>

                    {generalError && (
                        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
                            {generalError}
                        </div>
                    )}

                    <Button
                        onClick={handleCreateCredential}
                        disabled={loading}
                        className="w-full cursor-pointer"
                    >
                        {loading ? "Criando..." : "Criar Credencial"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCredentialModal;
