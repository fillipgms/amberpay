"use client";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

const LoginForm = () => {
    const [canViewPassword, setCanViewPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                            className="w-full py-1 pl-4 pr-8"
                        />
                        <EnvelopeIcon
                            size={20}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="login_password">Senha</label>
                    <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                        <input
                            type={canViewPassword ? "text" : "password"}
                            name="login_password"
                            id="login_password"
                            placeholder="Insira sua Senha"
                            className="w-full py-1 pl-4"
                        />

                        {canViewPassword ? (
                            <EyeSlashIcon
                                size={20}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                                onClick={() => setCanViewPassword(false)}
                            />
                        ) : (
                            <EyeIcon
                                size={20}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                                onClick={() => setCanViewPassword(true)}
                            />
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setRememberMe(!rememberMe);
                            }}
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
            <Button className="w-full cursor-pointer">Entrar</Button>
        </form>
    );
};

export default LoginForm;
