"use client";

import { Button } from "@/components/ui/button";
import {
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    PersonIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
    const [canViewPassword, setCanViewPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className="space-y-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Nome Completo</label>
                    <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Insira seu Nome"
                            className="w-full py-1 pl-4 pr-8"
                            defaultValue={name}
                            onChange={(evt) => setName(evt.target.value)}
                        />
                        <PersonIcon
                            size={20}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <div className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background">
                        <input
                            type="text"
                            name="email"
                            id="login_email"
                            placeholder="Insira seu Email"
                            className="w-full py-1 pl-4 pr-8"
                            defaultValue={email}
                            onChange={(evt) => setEmail(evt.target.value)}
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
                            defaultValue={password}
                            onChange={(evt) => setPassword(evt.target.value)}
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
            </div>

            <div className="flex items-center justify-between"></div>

            <Button className="w-full cursor-pointer" asChild>
                <Link
                    href={
                        name !== "" && email !== "" && password !== ""
                            ? `/register?name=${name}&email=${email}&password=${password}`
                            : "#"
                    }
                >
                    Continuar
                </Link>
            </Button>
        </form>
    );
};

export default RegisterForm;
