import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
});

export const verifySchema = z.object({
    code: z.string().min(6, "O código deve ter 6 dígitos"),
    token: z.string(),
});
