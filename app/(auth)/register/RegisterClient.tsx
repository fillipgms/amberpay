"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    IdentificationBadgeIcon,
    MapTrifoldIcon,
    PersonIcon,
    PhoneIcon,
} from "@phosphor-icons/react";
import { Squircle } from "@squircle-js/react";
import { twMerge } from "tailwind-merge";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlaceInfo } from "@/actions/viacep";
import { register } from "@/actions/auth";

const RegisterClient = ({
    defaultName,
    defaultEmail,
    defaultPassword,
}: {
    defaultName: string;
    defaultEmail: string;
    defaultPassword: string;
}) => {
    const params = useSearchParams();

    const paramTab = params.get("tab");

    const [currentTab, setCurrentTab] = useState(paramTab || "personal");
    const [canViewPassword, setCanViewPassword] = useState(false);
    const [name, setName] = useState(defaultName);
    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState(defaultPassword);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tipoPessoa, setTipoPessoa] = useState("fisica");
    const [cpf, setCpf] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [celular, setCelular] = useState("");

    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [number, setNumber] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const [userCanEdit, setUserCanEdit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        setCurrentTab(paramTab || "personal");
    }, [paramTab]);

    useEffect(() => {
        if (!cep) return;

        const timeout = setTimeout(async () => {
            const data = await getPlaceInfo(cep);

            if (!data) {
                setUserCanEdit(true);
                return;
            }

            setLogradouro(data.logradouro);
            setComplemento(data.complemento);
            setBairro(data.bairro);
            setCidade(data.localidade);
            setEstado(data.uf);

            setUserCanEdit(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, [cep]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("tipoPessoa", tipoPessoa);
            formData.append("nomeCompleto", name);
            formData.append("cpf", cpf);
            formData.append("cnpj", cnpj);
            formData.append("dataNascimento", dataNascimento);
            formData.append("celular", celular);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("confirm_password", confirmPassword);
            formData.append("cep", cep);
            formData.append("logradouro", logradouro);
            formData.append("numero", number);
            formData.append("complemento", complemento);
            formData.append("bairro", bairro);
            formData.append("cidade", cidade);
            formData.append("estado", estado);

            const result = await register(formData);

            if (result.success) {
                // Redirect to Veriff if URL is provided
                if (result.veriffUrl) {
                    window.location.href = result.veriffUrl;
                } else {
                    router.push("/dashboard");
                }
            } else {
                setError(result.message || "Erro ao criar conta");
            }
        } catch (err) {
            setError("Erro ao criar conta. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmitPersonal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push("?tab=endereco");
        setCurrentTab("location");
    };

    return (
        <main className="grid min-h-svh md:grid-cols-[250px_1fr]">
            <aside className="border-r md:flex hidden flex-col justify-between p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <div>
                            <CheckCircleIcon
                                weight="fill"
                                className="text-primary"
                            />
                        </div>
                        <div>
                            <h6 className="text-sm font-semibold">
                                Dados Pessoais
                            </h6>
                            <p className="text-xs text-foreground/50">
                                Seus documentos e informaçoes de contato
                            </p>
                        </div>
                    </div>

                    <div
                        className={twMerge(
                            "flex gap-2",
                            currentTab === "personal" ? "opacity-50" : ""
                        )}
                    >
                        <div>
                            <CheckCircleIcon
                                weight={
                                    currentTab === "personal"
                                        ? "regular"
                                        : "fill"
                                }
                                className={twMerge(
                                    currentTab === "personal"
                                        ? ""
                                        : "text-primary"
                                )}
                            />
                        </div>
                        <div>
                            <h6 className="text-sm font-semibold">Endereço</h6>
                            <p className="text-xs text-foreground/50">
                                Para receber recompensas no futuro
                            </p>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-foreground/50 text-center">
                    Amberpay &copy; 2026 Todos os Direitos Reservados
                </p>
            </aside>

            <section className="py-4 px-8 flex flex-col justify-between overflow-hidden relative">
                <div className="bg-primary/20 size-100 rounded-full blur-3xl absolute -top-1/3 -left-1/6 -z-1"></div>

                <div className="">
                    <div className="w-full grid grid-cols-2 gap-8 mb-8 md:hidden">
                        <Squircle
                            cornerRadius={999}
                            cornerSmoothing={1}
                            className="h-2 bg-primary"
                        ></Squircle>
                        <Squircle
                            cornerRadius={999}
                            cornerSmoothing={1}
                            className={twMerge(
                                "h-2",
                                currentTab === "personal"
                                    ? "bg-foreground/20"
                                    : "bg-primary"
                            )}
                        ></Squircle>
                    </div>
                </div>

                {currentTab === "personal" ? (
                    <form
                        onSubmit={onSubmitPersonal}
                        className="grid md:grid-cols-2 gap-4"
                    >
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label htmlFor="email">Nome Completo</label>

                            <Input
                                placeholder="Insira seu Nome"
                                defaultValue={name}
                                onChange={(evt) => setName(evt.target.value)}
                                icon={
                                    <PersonIcon
                                        size={20}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                                    />
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label htmlFor="email">Email</label>

                            <Input
                                placeholder="Insira seu Email"
                                defaultValue={email}
                                onChange={(evt) => setEmail(evt.target.value)}
                                icon={
                                    <EnvelopeIcon
                                        size={20}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                                    />
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Tipo de Pessoa</label>

                            <Select defaultValue="fisica" onValueChange={setTipoPessoa}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o tipo de conta" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="fisica">
                                            Pessoa Física
                                        </SelectItem>

                                        <SelectItem value="juridica">
                                            Pessoa Jurídica
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">CPF</label>

                            <Input
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={(evt) => setCpf(evt.target.value)}
                                icon={
                                    <IdentificationBadgeIcon
                                        size={20}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                                    />
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Data de Nascimento</label>

                            <Input
                                type="date"
                                value={dataNascimento}
                                onChange={(evt) => setDataNascimento(evt.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Celular</label>

                            <Input
                                placeholder="(00) 0000-0000"
                                value={celular}
                                onChange={(evt) => setCelular(evt.target.value)}
                                icon={
                                    <PhoneIcon
                                        size={20}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                                    />
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="login_password">Senha</label>
                            <Input
                                type={canViewPassword ? "text" : "password"}
                                defaultValue={password}
                                onChange={(evt) =>
                                    setPassword(evt.target.value)
                                }
                                icon={
                                    canViewPassword ? (
                                        <EyeSlashIcon
                                            size={20}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                                            onClick={() =>
                                                setCanViewPassword(false)
                                            }
                                        />
                                    ) : (
                                        <EyeIcon
                                            size={20}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                                            onClick={() =>
                                                setCanViewPassword(true)
                                            }
                                        />
                                    )
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="login_password">
                                Repita a senha
                            </label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(evt) =>
                                    setConfirmPassword(evt.target.value)
                                }
                            />
                        </div>

                        {error && (
                            <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-red-500 text-sm">{error}</p>
                            </div>
                        )}

                        <Button className="w-full md:col-span-2 mt-4 cursor-pointer">
                            Continuar
                        </Button>
                    </form>
                ) : (
                    <form
                        onSubmit={onSubmit}
                        className="grid md:grid-cols-6 gap-4"
                    >
                        <div className="flex flex-col gap-2 md:col-span-6">
                            <label htmlFor="email">CEP</label>

                            <Input
                                name="cep"
                                id="cep"
                                placeholder="Insira seu CEP"
                                defaultValue={cep}
                                onChange={(evt) => setCep(evt.target.value)}
                                icon={
                                    <MapTrifoldIcon
                                        size={20}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                                    />
                                }
                            />
                        </div>
                        <div
                            className={twMerge(
                                "flex flex-col gap-2 md:col-span-6",
                                userCanEdit ? "" : "opacity-50"
                            )}
                        >
                            <label htmlFor="email">Logradouro</label>

                            <Input
                                name="logradouro"
                                id="logradouro"
                                placeholder="Rua, Avenida, etc."
                                readOnly={!userCanEdit}
                                defaultValue={logradouro}
                                onChange={(evt) =>
                                    setLogradouro(evt.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-3">
                            <label htmlFor="email">Numero</label>

                            <Input
                                name="numero"
                                id="numero"
                                placeholder="O número de sua residẽncia"
                                defaultValue={number}
                                onChange={(evt) => setNumber(evt.target.value)}
                            />
                        </div>
                        <div
                            className={twMerge(
                                "flex flex-col gap-2 md:col-span-3",
                                userCanEdit ? "" : "opacity-50"
                            )}
                        >
                            <label htmlFor="email">Complemento</label>

                            <Input
                                name="complemento"
                                id="complemento"
                                placeholder="Apto, Sala, etc."
                                readOnly={!userCanEdit}
                                defaultValue={complemento}
                                onChange={(evt) =>
                                    setComplemento(evt.target.value)
                                }
                            />
                        </div>
                        <div
                            className={twMerge(
                                "flex flex-col gap-2 md:col-span-2",
                                userCanEdit ? "" : "opacity-50"
                            )}
                        >
                            <label htmlFor="email">Bairro</label>

                            <Input
                                name="complemento"
                                id="complemento"
                                placeholder="O bairro de sua residẽncia"
                                readOnly
                                defaultValue={bairro}
                                onChange={(evt) => setBairro(evt.target.value)}
                            />
                        </div>
                        <div
                            className={twMerge(
                                "flex flex-col gap-2 md:col-span-2",
                                userCanEdit ? "" : "opacity-50"
                            )}
                        >
                            <label htmlFor="email">Cidade</label>

                            <Input
                                name="cidade"
                                id="cidade"
                                placeholder="A cidade de sua residẽncia"
                                readOnly={!userCanEdit}
                                defaultValue={cidade}
                                onChange={(evt) => setCidade(evt.target.value)}
                            />
                        </div>
                        <div
                            className={twMerge(
                                "flex flex-col gap-2 md:col-span-2",
                                userCanEdit ? "" : "opacity-50"
                            )}
                        >
                            <label htmlFor="email">Estado</label>

                            <Input
                                name="estado"
                                id="estado"
                                placeholder="Sp"
                                readOnly={!userCanEdit}
                                defaultValue={estado}
                                onChange={(evt) => setEstado(evt.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="md:col-span-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-red-500 text-sm">{error}</p>
                            </div>
                        )}

                        <Button
                            className="w-full md:col-span-6 mt-4 cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Criando conta..." : "Criar Conta"}
                        </Button>
                    </form>
                )}

                <div className="w-full hidden grid-cols-2 gap-8 md:grid">
                    <Squircle
                        cornerRadius={999}
                        cornerSmoothing={1}
                        className="h-2 bg-primary"
                    ></Squircle>
                    <Squircle
                        cornerRadius={999}
                        cornerSmoothing={1}
                        className={twMerge(
                            "h-2",
                            currentTab === "personal"
                                ? "bg-foreground/20"
                                : "bg-primary"
                        )}
                    ></Squircle>
                </div>

                <div className="bg-primary/20 size-100 rounded-full blur-3xl absolute -z-1 -bottom-1/3 -right-1/3"></div>
            </section>
        </main>
    );
};

export default RegisterClient;
