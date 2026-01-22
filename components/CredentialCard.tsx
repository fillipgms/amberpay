"use client";
import {
    ArrowsClockwiseIcon,
    CopySimpleIcon,
    DatabaseIcon,
    EyeIcon,
    EyeSlashIcon,
    GitDiffIcon,
    MedalIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { useState } from "react";
import { set } from "zod";
import { toast } from "sonner";
import { deleteCredential } from "@/actions/credentials";
import { useRouter } from "next/navigation";

const CredentialCard = ({ credential }: { credential: CredentialProps }) => {
    const [canViewClientId, setCanViewClientId] = useState(false);
    const [canViewClientSecret, setCanViewClientSecret] = useState(false);

    const router = useRouter();

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);

            toast.info("Conteúdo copiado para a área de transferência");
        } catch {
            toast.error("Erro ao copiar para a área de transferência");
        }
    };

    const deleteThisCredential = async () => {
        try {
            await deleteCredential(credential.id);
            toast.success("Credencial excluída com sucesso");
            router.refresh();
        } catch {
            toast.error("Erro ao excluir credencial");
        }
    };

    return (
        <div className="border p-4 rounded-md space-y-4 relative overflow-hidden">
            <div className="bg-primary/20 size-100 rounded-full blur-3xl absolute -z-10 -top-1/3 -left-1/6"></div>

            <div className="flex justify-between items-center">
                <h3 className="font-semibold">{credential.description}</h3>
                <Switch />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-background rounded-full p-1">
                            <MedalIcon weight="duotone" />
                        </div>
                        <h6 className="text-sm">Taxa de Sucesso</h6>
                    </div>

                    <div>
                        <p className="text-xl font-semibold">98.5%</p>
                        <span className="text-xs">últimas 24h</span>
                    </div>
                </div>

                <div className="p-4 border rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-background rounded-full p-1">
                            <GitDiffIcon weight="duotone" />
                        </div>
                        <h6 className="text-sm">Chamadas na API</h6>
                    </div>

                    <div>
                        <p className="text-xl font-semibold">3456</p>
                        <span className="text-xs">últimas 24h</span>
                    </div>
                </div>

                <div className="p-4 border rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-background rounded-full p-1">
                            <DatabaseIcon weight="duotone" />
                        </div>
                        <h6 className="text-sm">Limite de Taxa</h6>
                    </div>

                    <div>
                        <p className="text-xl font-semibold">4000</p>
                        <span className="text-xs">últimas 24h</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-[100px_1fr_250px] gap-4">
                    <div className="flex items-center">
                        <p>Id do Cliente</p>
                    </div>
                    <div className="border rounded-md flex items-center justify-between py-4 px-4">
                        <p>
                            {canViewClientId
                                ? credential.client_id
                                : "*".repeat(credential.client_id.length)}
                        </p>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    setCanViewClientId(!canViewClientId)
                                }
                            >
                                {canViewClientId ? (
                                    <EyeIcon size={20} />
                                ) : (
                                    <EyeSlashIcon size={20} />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    copyToClipboard(credential.client_id)
                                }
                            >
                                <CopySimpleIcon size={20} />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Button variant="outline" className="w-full">
                            <ArrowsClockwiseIcon />
                            Gerar Novamente
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-[100px_1fr_250px] gap-4">
                    <div className="flex items-center">
                        <p>Segredo</p>
                    </div>
                    <div className="border rounded-md flex items-center justify-between py-4 px-4">
                        <p>
                            {canViewClientSecret
                                ? credential.client_secret
                                : "*".repeat(credential.client_secret.length)}
                        </p>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    setCanViewClientSecret(!canViewClientSecret)
                                }
                            >
                                {canViewClientSecret ? (
                                    <EyeIcon size={20} />
                                ) : (
                                    <EyeSlashIcon size={20} />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    copyToClipboard(credential.client_secret)
                                }
                            >
                                <CopySimpleIcon size={20} />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Button variant="outline" className="w-full">
                            <ArrowsClockwiseIcon />
                            Gerar Novamente
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={() => deleteThisCredential()}
                    variant="destructive"
                    className="cursor-pointer"
                >
                    Excluir
                </Button>
            </div>

            <div className="bg-primary/20 size-100 rounded-full blur-3xl absolute -z-10 -bottom-1/3 -right-1/3"></div>
        </div>
    );
};

export default CredentialCard;
