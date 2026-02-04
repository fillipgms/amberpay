"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";

export async function initilizePix(pix_type: string, pix_key: string) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const pix = pix_key.replace(/[^a-zA-Z0-9@]/g, "");

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/transactions/withdrawal/init`,
            { pix_type, pix_key: pix },
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

export async function ConfirmPix(
    amount: number,
    document: string,
    endId: string,
    description = "tst",
) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/transactions/withdrawal`,
            { amount, description, document, endId },
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
