"use client";

import { KeyIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { verify2FA } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/contexts/sessionContext";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const VerifyForm = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const codeInputsRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const { refreshSession } = useSession();

    const qrcode = searchParams.get("qrcode");
    const token = searchParams.get("token");

    useGSAP(() => {
        if (qrCodeRef.current && codeInputsRef.current) {
            const tl = gsap.timeline();

            tl.from(qrCodeRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
            }).from(
                codeInputsRef.current.children,
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.3"
            );
        }
    }, [qrcode]);

    useEffect(() => {
        if (!qrcode || !token) {
            router.push("/login");
        }
    }, [qrcode, token, router]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);
        setError(null);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newCode = [...code];
        pastedData.split("").forEach((char, i) => {
            if (i < 6) newCode[i] = char;
        });
        setCode(newCode);

        const nextEmptyIndex = newCode.findIndex((c) => !c);
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const codeString = code.join("");
        if (codeString.length !== 6) {
            setError("Por favor, insira o código completo");
            return;
        }

        if (!token) {
            setError("Token inválido");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("code", codeString);
            formData.append("token", token);

            const result = await verify2FA(formData);

            if (result.success) {
                if (result.user) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                }

                await refreshSession();

                gsap.to(formRef.current, {
                    scale: 0.95,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        router.push("/");
                    },
                });
            } else {
                setError(result.message || "Código inválido");
                setCode(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();

                if (codeInputsRef.current) {
                    gsap.fromTo(
                        codeInputsRef.current,
                        { x: -10 },
                        {
                            x: 10,
                            duration: 0.1,
                            repeat: 3,
                            yoyo: true,
                            ease: "power1.inOut",
                            onComplete: () => {
                                gsap.set(codeInputsRef.current, { x: 0 });
                            },
                        }
                    );
                }
            }
        } catch (err) {
            console.error(err);
            setError("Erro ao verificar o código");
            setCode(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    if (!qrcode || !token) {
        return null;
    }

    return (
        <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
            {qrcode && (
                <div
                    ref={qrCodeRef}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="bg-white p-4 rounded-lg">
                        <Image
                            src={`data:image/png;base64,${qrcode}`}
                            alt="QR Code para autenticação"
                            width={200}
                            height={200}
                            className="rounded"
                        />
                    </div>
                    <p className="text-sm text-foreground/70 text-center">
                        Escaneie o código QR com seu aplicativo autenticador
                    </p>
                </div>
            )}

            <div ref={codeInputsRef} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="code-0"
                        className="text-center font-medium"
                    >
                        Digite o código de 6 dígitos
                    </label>
                    <div className="flex justify-center gap-2">
                        {code.map((digit, index) => (
                            <div
                                key={index}
                                className="relative after:absolute after:left-0 after:block after:h-px after:w-full after:-bottom-1 after:bg-linear-to-r after:from-primary after:to-background"
                            >
                                <input
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    id={`code-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    disabled={loading}
                                    className="w-12 h-14 text-center text-2xl font-bold bg-transparent border-none focus:outline-none disabled:opacity-50"
                                    autoComplete="off"
                                />
                            </div>
                        ))}
                    </div>
                    {error && (
                        <p className="text-destructive text-sm text-center mt-2">
                            {error}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <KeyIcon size={16} className="text-primary" />
                    <p>
                        Use seu aplicativo autenticador para gerar o código
                    </p>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={loading || code.some((c) => !c)}
            >
                {loading ? "Verificando..." : "Verificar"}
            </Button>

            <button
                type="button"
                onClick={() => router.push("/login")}
                className="w-full text-center text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
                Voltar ao Login
            </button>
        </form>
    );
};

export default VerifyForm;
