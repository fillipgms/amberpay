"use client";

import React, { use, useEffect, useState } from "react";
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "./ui/Credenza";
import {
    GearIcon,
    CurrencyCircleDollarIcon,
    ArrowCircleUpIcon,
    ArrowCircleDownIcon,
    CalendarIcon,
    PercentIcon,
} from "@phosphor-icons/react";

import Input from "./Input";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { updateMe } from "@/actions/user";
import { toast } from "sonner";
import { useSession } from "@/contexts/sessionContext";

interface FeeItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    description?: string;
}

const FeeItem = ({ icon, label, value, description }: FeeItemProps) => (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-border/80 transition-colors">
        <div className="shrink-0 mt-0.5 text-foreground/60">{icon}</div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{label}</p>
            {description && (
                <p className="text-xs text-foreground/50 mt-0.5">
                    {description}
                </p>
            )}
        </div>
        <div className="shrink-0 font-semibold text-foreground">{value}</div>
    </div>
);

const ConfigsModal = () => {
    const { user } = useSession();

    console.log(user);

    if (!user) return;

    const [isSaving, setIsSaving] = useState(false);
    const [autoApproveWithdrawals, setAutoApproveWithdrawals] = useState(
        user.auto_approve_withdrawal,
    );

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await updateMe({
                auto_approve_withdrawal: autoApproveWithdrawals,
            });

            if (res.error) {
                toast.error(res.error || "Erro ao salvar configurações.");
            }

            toast.success("Configurações salvas com sucesso.");
        } catch (error) {
            console.error("Failed to save configurations:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <button className="flex items-center gap-2 w-full">
                    <GearIcon className="text-foreground" weight="duotone" />
                    Configurações
                </button>
            </CredenzaTrigger>
            <CredenzaContent className="max-h-[85vh] flex flex-col max-w-4xl">
                <CredenzaHeader className="shrink-0">
                    <CredenzaTitle>Configurações</CredenzaTitle>
                </CredenzaHeader>

                <CredenzaBody className="flex-1 overflow-y-auto">
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-sm font-semibold text-foreground/70 mb-4 pb-2 border-b border-border/50">
                                Informações Pessoais
                            </h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center">
                                    <label
                                        htmlFor="nome"
                                        className="text-sm font-medium text-foreground/70"
                                    >
                                        Nome Completo
                                    </label>
                                    <Input
                                        type="text"
                                        name="nome"
                                        id="nome"
                                        defaultValue={user.name}
                                        readOnly
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-foreground/70"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        defaultValue={user.email}
                                        readOnly
                                    />
                                </div>

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
                                        defaultValue={user.cpfOrCnpj}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-semibold text-foreground/70 mb-4 pb-2 border-b border-border/50">
                                Configurações do Sistema
                            </h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 p-4 rounded-lg border border-border/50 bg-card/30">
                                    <div>
                                        <label
                                            htmlFor="auto_approve_withdrawal"
                                            className="text-sm font-semibold text-foreground"
                                        >
                                            Saque Automático
                                        </label>
                                        <p className="text-xs text-foreground/50 mt-1">
                                            Aprovação automática dos pedidos de
                                            saque sem necessidade de revisão
                                            manual
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Switch
                                            name="auto_approve_withdrawal"
                                            checked={autoApproveWithdrawals}
                                            onCheckedChange={
                                                setAutoApproveWithdrawals
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 p-4 rounded-lg border border-border/50 bg-card/30">
                                    <div>
                                        <label
                                            htmlFor="enabled_withdraw"
                                            className="text-sm font-semibold text-foreground"
                                        >
                                            Saque Liberado
                                        </label>
                                        <p className="text-xs text-foreground/50 mt-1">
                                            Permite que usuários solicitem
                                            saques na plataforma
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Switch
                                            name="enabled_withdraw"
                                            defaultChecked={
                                                user.enabled_withdraw
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 p-4 rounded-lg border border-border/50 bg-card/30">
                                    <div>
                                        <label
                                            htmlFor="enabled_deposit"
                                            className="text-sm font-semibold text-foreground"
                                        >
                                            Depósito Liberado
                                        </label>
                                        <p className="text-xs text-foreground/50 mt-1">
                                            Permite que usuários realizem
                                            depósitos e adicionem saldo
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Switch
                                            name="enabled_deposit"
                                            defaultChecked={
                                                user.enabled_deposit
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-semibold text-foreground/70 mb-4 pb-2 border-b border-border/50 flex items-center gap-2">
                                Taxas e Limites
                            </h3>

                            {/* Withdrawal Limits */}
                            <div className="space-y-4 mb-6">
                                <h4 className="text-xs font-semibold text-foreground/60 flex items-center gap-1.5">
                                    <ArrowCircleUpIcon
                                        size={16}
                                        weight="duotone"
                                    />
                                    Limites de Saque
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <FeeItem
                                        icon={
                                            <CurrencyCircleDollarIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Quantia máxima"
                                        value={`R$ ${user.fee.limit_withdrawal}`}
                                        description="por solicitação"
                                    />
                                    <FeeItem
                                        icon={
                                            <CurrencyCircleDollarIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Quantia mínima"
                                        value={`R$ ${user.fee.minimum_withdrawal}`}
                                        description="por solicitação"
                                    />
                                    <FeeItem
                                        icon={
                                            <CalendarIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Limite diário"
                                        value={user.fee.limit_per_day_withdrawal_user.toString()}
                                        description="via Painel"
                                    />
                                    <FeeItem
                                        icon={
                                            <CalendarIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Limite diário"
                                        value={user.fee.limit_per_day_withdrawal.toString()}
                                        description="via API"
                                    />
                                </div>
                            </div>

                            {/* Deposit Limits */}
                            <div className="space-y-4 mb-6">
                                <h4 className="text-xs font-semibold text-foreground/60 flex items-center gap-1.5">
                                    <ArrowCircleDownIcon
                                        size={16}
                                        weight="duotone"
                                    />
                                    Limites de Depósito
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <FeeItem
                                        icon={
                                            <CurrencyCircleDollarIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Quantia máxima"
                                        value={`R$ ${user.fee.max_deposit}`}
                                        description="por solicitação"
                                    />
                                    <FeeItem
                                        icon={
                                            <CurrencyCircleDollarIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Quantia mínima"
                                        value={`R$ ${user.fee.minimum_deposit}`}
                                        description="por solicitação"
                                    />
                                    <FeeItem
                                        icon={
                                            <CalendarIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Limite diário"
                                        value={user.fee.max_deposit_per_day.toLocaleString(
                                            "pt-BR",
                                        )}
                                        description="via API"
                                    />
                                </div>
                            </div>

                            {/* Fee Structure */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-semibold text-foreground/60 flex items-center gap-1.5">
                                    <PercentIcon size={16} weight="duotone" />
                                    Estrutura de Taxas
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <FeeItem
                                        icon={
                                            <PercentIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Taxa percentual - Depósito"
                                        value={`${user.fee.fee_percent_deposit}%`}
                                        description="acima de R$ 15,00"
                                    />
                                    <FeeItem
                                        icon={
                                            <PercentIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Taxa percentual - Saque"
                                        value={`${user.fee.fee_percent_withdrawal}%`}
                                        description="acima de R$ 30,00"
                                    />
                                    <FeeItem
                                        icon={
                                            <CurrencyCircleDollarIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Taxa fixa - Depósito"
                                        value={`R$ ${user.fee.fee_fixed_deposit}`}
                                        description="menores de R$ 15,00"
                                    />
                                    <FeeItem
                                        icon={
                                            <CurrencyCircleDollarIcon
                                                size={20}
                                                weight="duotone"
                                            />
                                        }
                                        label="Taxa fixa - Saque"
                                        value={`R$ ${user.fee.fee_percent_withdrawal_fixed}`}
                                        description="menores de R$ 30,00"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Save Button */}
                        <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t border-border/50 -mx-6 px-6">
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full"
                            >
                                {isSaving
                                    ? "Salvando..."
                                    : "Salvar Configurações"}
                            </Button>
                        </div>
                    </div>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default ConfigsModal;
