"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";
import { unstable_cache } from "next/cache";

export async function getCredentialsList({ page = 1 }: { page: number }) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        // Cache credentials list for 60 seconds per page to reduce API calls
        const getCachedCredentials = unstable_cache(
            async (accessToken: string, pageNum: number) => {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/credentials?page=${pageNum}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                return res.data;
            },
            [`credentials-list-${page}`],
            {
                revalidate: 60, // Cache for 60 seconds
                tags: ["credentials", `credentials-page-${page}`],
            }
        );

        return await getCachedCredentials(session.accessToken, page);
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
