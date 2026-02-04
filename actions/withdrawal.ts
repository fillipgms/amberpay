"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";

export async function getWithdrawl() {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/withdrawal`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return res.data;
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }
    }
}

export async function CancelWithdraw(id: string) {}

export async function getCryptoWallets() {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/wallet_crypto`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status ?? 500,
                data: error.response?.data ?? {
                    status: 0,
                    msg: "Erro inesperado",
                },
            };
        }

        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }

        return {
            status: 500,
            data: {
                status: 0,
                msg: "Erro interno",
            },
        };
    }
}

export async function getCryptoWalletsForWithdrawal() {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/wallet_crypto_withdraw`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status ?? 500,
                data: error.response?.data ?? {
                    status: 0,
                    msg: "Erro inesperado",
                },
            };
        }

        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }

        return {
            status: 500,
            data: {
                status: 0,
                msg: "Erro interno",
            },
        };
    }
}

export async function getCryptoQuote(symbol: string) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/quote?symbol=${symbol}`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status ?? 500,
                data: error.response?.data ?? {
                    status: 0,
                    msg: "Erro inesperado",
                },
            };
        }

        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }

        return {
            status: 500,
            data: {
                status: 0,
                msg: "Erro interno",
            },
        };
    }
}

export async function createCryptoWallet(
    name: string,
    adress: string,
    currency: string,
    type: string,
) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/wallet_crypto`,
            { name, adress, currency, type },
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status ?? 500,
                data: error.response?.data ?? {
                    status: 0,
                    msg: "Erro inesperado",
                },
            };
        }

        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }

        return {
            status: 500,
            data: {
                status: 0,
                msg: "Erro interno",
            },
        };
    }
}

export async function deleteCryptoWallet(id: number) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/wallet_crypto/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status ?? 500,
                data: error.response?.data ?? {
                    status: 0,
                    msg: "Erro inesperado",
                },
            };
        }

        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }

        return {
            status: 500,
            data: {
                status: 0,
                msg: "Erro interno",
            },
        };
    }
}

export async function processCryptoWithdrawal(amount: number, wallet: number) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/transactions/withdrawal/crypto`,
            { amount, wallet },
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status ?? 500,
                data: error.response?.data ?? {
                    status: 0,
                    msg: "Erro inesperado",
                },
            };
        }

        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }

        return {
            status: 500,
            data: {
                status: 0,
                msg: "Erro interno",
            },
        };
    }
}
