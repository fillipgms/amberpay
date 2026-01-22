"use server";

import { createSession, deleteSession } from "@/lib/session";
import { loginSchema, verifySchema } from "@/schemas";
import axios from "axios";
import { cookies, headers } from "next/headers";

export async function logIn(formData: FormData) {
    try {
        const validationResult = loginSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (!validationResult.success) {
            return {
                success: false,
                message: "Por favor, corrija os erros abaixo:",
                errors: validationResult.error.flatten().fieldErrors,
            };
        }

        const { email, password } = validationResult.data;
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
                email,
                password,
            },
        );

        // Check if response indicates successful login (status: true or status: 200)
        if (
            (res.status === 200 && res.data.token) ||
            (res.data.status && res.data.token)
        ) {
            // Case 1: First time 2FA setup (has QR code)
            if (res.data.qrcode && res.data.qrcode !== null) {
                return {
                    success: true,
                    requiresVerification: true,
                    qrcode: res.data.qrcode,
                    token: res.data.token,
                    user: res.data.user,
                    message: "Verificação de 2FA necessária.",
                };
            }

            // Case 2: 2FA is already set up, just needs code verification
            if (res.data.msg === "login_not_passed") {
                return {
                    success: true,
                    requiresVerification: true,
                    token: res.data.token,
                    user: res.data.user ?? null,
                    message: "Digite o código do seu autenticador.",
                };
            }

            if (res.data.token) {
                const { token, user } = res.data;
                await createSession(token);

                return {
                    success: true,
                    requiresVerification: false,
                    user,
                    message: "Login realizado com sucesso.",
                };
            }
        }

        return {
            success: false,
            message: "Resposta inesperada do servidor.",
        };
    } catch (error) {
        console.error("Login failed:", error);

        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                message:
                    error.response.data?.message || "Email ou Senha inválidos.",
            };
        }

        return {
            success: false,
            message: "Erro ao conectar com o servidor.",
        };
    }
}

export async function verify2FA(formData: FormData) {
    try {
        const validationResult = verifySchema.safeParse({
            code: formData.get("code"),
            token: formData.get("token"),
        });

        if (!validationResult.success) {
            return {
                success: false,
                message: "Por favor, corrija os erros abaixo:",
                errors: validationResult.error.flatten().fieldErrors,
            };
        }

        const { code, token } = validationResult.data;

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/2fa/verify`,
            {
                "2fa_code": code,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (res.status === 200 && res.data.token) {
            const { token: accessToken, user } = res.data;
            await createSession(accessToken);
            return {
                success: true,
                user,
                message: "Autenticação concluída com sucesso.",
            };
        }

        return {
            success: false,
            message: "Resposta inesperada do servidor.",
        };
    } catch (error) {
        console.error("2FA verification failed:", error);

        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                message: error.response.data?.message || "Código inválido.",
            };
        }

        return {
            success: false,
            message: "Erro ao conectar com o servidor.",
        };
    }
}

export async function getSession() {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) {
        return null;
    }

    try {
        const session = JSON.parse(cookie) as SessionPayload;

        const expires = new Date(session.expires);
        if (expires < new Date()) {
            await clearExpiredSession();
            return null;
        }

        return session;
    } catch (error: unknown) {
        console.error("Failed to get session:", error);
        await clearExpiredSession();
        return null;
    }
}

export async function clearExpiredSession() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("token");
}

export async function logOut() {
    try {
        const session = await getSession();

        if (!session?.accessToken) {
            await deleteSession();
            return {
                success: true,
                message: "No active session found. Cleared local session.",
            };
        }

        const response = await axios.post(
            "https://api.playfivers.com/api/auth/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
            },
        );

        if (response.status === 200) {
            await deleteSession();
            return {
                success: true,
                message: "Logout successful",
            };
        }

        return {
            success: false,
            message: "Unexpected response from server",
        };
    } catch (error) {
        console.error("Error in logout:", error);
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                await deleteSession();
                return {
                    success: true,
                    message: "Session expired. Cleared local session.",
                };
            }

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to logout from server",
            };
        }

        const apiMessage = (error as { response?: { data?: { msg?: string } } })
            ?.response?.data?.msg;
        return {
            success: false,
            message: apiMessage || "An unexpected error occurred during logout",
        };
    }
}

export async function VerifySession() {
    try {
        const session = await getSession();

        const data = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/verify`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            },
        );

        if (data.status === 200 && data.data.status === 1) {
            return {
                valid: true,
            };
        }

        return {
            valid: false,
        };
    } catch (error) {}
}

export async function register(formData: FormData) {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/register`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        if (res.status === 200 || res.status === 201) {
            // Check if the response contains a Veriff URL
            const veriffUrl = res.data?.veriff_url || res.data?.veriffUrl;

            return {
                success: true,
                message: "Conta criada com sucesso!",
                veriffUrl: veriffUrl,
                data: res.data,
            };
        }

        return {
            success: false,
            message: "Resposta inesperada do servidor.",
        };
    } catch (error) {
        console.error("Registration failed:", error);

        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                message:
                    error.response.data?.message ||
                    error.response.data?.msg ||
                    "Erro ao criar conta. Verifique os dados e tente novamente.",
            };
        }

        return {
            success: false,
            message: "Erro ao conectar com o servidor.",
        };
    }
}
