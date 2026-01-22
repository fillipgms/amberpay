"use client";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { logIn } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useSession } from "@/contexts/sessionContext";

const LoginForm = () => {
    const [canViewPassword, setCanViewPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string[];
        password?: string[];
    }>({});
    const [generalError, setGeneralError] = useState<string | null>(null);

    const router = useRouter();
    const { refreshSession } = useSession();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setGeneralError(null);

        const formData = new FormData(e.target as HTMLFormElement);
        const result = await logIn(formData);

        if (result.success) {
            if (result.user) {
                localStorage.setItem("user", JSON.stringify(result.user));
            }

            if (result.requiresVerification && result.token) {
                const params = new URLSearchParams({ token: result.token });
                if (result.qrcode) {
                    params.append("qrcode", result.qrcode);
                }
                router.push(`/verify?${params.toString()}`);
            } else {
                refreshSession();
                router.push("/");
            }
        } else {
            if (result.errors) {
                setErrors(result.errors);
            } else {
                setGeneralError(result.message || "Erro ao fazer login.");
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Insira seu Email"
                            className={`w-full py-1 pl-4 pr-8 ${errors.email ? "border-destructive" : ""}`}
                        />
                        <EnvelopeIcon
                            size={20}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-destructive text-sm">
                            {errors.email[0]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Senha</label>
                    <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                        <input
                            type={canViewPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Insira sua Senha"
                            className={`w-full py-1 pl-4 ${errors.password ? "border-destructive" : ""}`}
                        />

                        {canViewPassword ? (
                            <EyeSlashIcon
                                size={20}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50 cursor-pointer"
                                onClick={() => setCanViewPassword(false)}
                            />
                        ) : (
                            <EyeIcon
                                size={20}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50 cursor-pointer"
                                onClick={() => setCanViewPassword(true)}
                            />
                        )}
                    </div>
                    {errors.password && (
                        <p className="text-destructive text-sm">
                            {errors.password[0]}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setRememberMe(!rememberMe)}
                            className="flex gap-2 items-center cursor-pointer"
                        >
                            <div className="rounded-full border-primary border bg-background size-5 relative">
                                {rememberMe && (
                                    <div className="bg-primary rounded-full size-3 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
                                )}
                            </div>
                            <p>Manter Conectado</p>
                        </button>
                    </div>

                    <a className="text-primary" href="#">
                        Esqueceu a Senha?
                    </a>
                </div>
            </div>
            {generalError && (
                <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
                    {generalError}
                </div>
            )}
            <Button className="w-full cursor-pointer">Entrar</Button>
        </form>
    );
};

export default LoginForm;
