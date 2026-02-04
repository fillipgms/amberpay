"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";

export async function getCredentialsList({ page = 1 }: { page: number }) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/credentials?page=${page}`,
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

export async function deleteCredential(id: number) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/credentials/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }
    }
}

export async function createCredential(data: { descricao: string }) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/credentials`,
            data,
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

        return {
            error:
                error instanceof Error
                    ? error.message
                    : "Houve um erro ao criar credencial",
        };
    }
}
