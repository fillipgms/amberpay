import Image from "next/image";

import placeholderImage from "@/public/bg-placeholder.png";
import { Button } from "@/components/ui/button";
import { Squircle } from "@squircle-js/react";
import {
    LoginContent,
    LoginSelector,
    LoginSelectorContainer,
    LoginTrigger,
} from "@/components/LoginSelector";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginPage() {
    return (
        <main className="relative min-h-svh max-h-svh grid md:grid-cols-2 overflow-hidden">
            <div className="bg-primary/50 size-100 rounded-full blur-3xl absolute z-10 -top-1/3 -left-1/6"></div>
            <div className="-z-1 bg-background/90 size-10 bottom-0 left-0 absolute"></div>
            <div className="-z-1 bg-background/90 size-10 top-0 left-0 absolute"></div>

            <Squircle
                cornerRadius={24}
                cornerSmoothing={1}
                className="bg-background/90 backdrop-blur-lg p-4 flex justify-center items-center relative border-r"
            >
                <div className="md:min-w-md space-y-4">
                    <div className="">
                        <h2 className="text-2xl font-bold">Amberpay</h2>
                    </div>
                    <div>
                        <h1 className="text-xl">Boas Vindas de Volta!</h1>
                        <p className="text-foreground/50">Bem Te Ver Denono</p>
                    </div>

                    <LoginSelectorContainer>
                        <LoginSelector defaultTab="login">
                            <LoginTrigger value="login">Entrar</LoginTrigger>
                            <LoginTrigger value="register">
                                Criar Conta
                            </LoginTrigger>
                        </LoginSelector>

                        <LoginContent value="login">
                            <LoginForm />
                        </LoginContent>
                        <LoginContent value="register">
                            <RegisterForm />
                        </LoginContent>
                    </LoginSelectorContainer>
                </div>

                <div className="bg-primary/50 size-100 rounded-full blur-3xl absolute z-10 -bottom-1/3 -right-1/3"></div>
            </Squircle>
            <div className="pb-16 flex items-end justify-center">
                <div className="bg-background/20 p-4 rounded backdrop-blur-lg  font-semibold border">
                    Amberpay &copy; 2026 Todos os Direitos Reservados
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Image
                    src={placeholderImage.src}
                    alt="background image"
                    sizes="(max-width: 768px) 100svw"
                    fill
                />
            </div>
        </main>
    );
}
