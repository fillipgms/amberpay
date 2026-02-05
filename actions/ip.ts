"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";
import { unstable_cache } from "next/cache";

export async function getIpWhitelist() {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        // Cache IP whitelist data for 60 seconds to reduce API calls
        const getCachedIpWhitelist = unstable_cache(
            async (accessToken: string) => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ip`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return res.data;
            },
            ["ip-whitelist"],
            {
                revalidate: 60, // Cache for 60 seconds
                tags: ["ip-whitelist"],
            }
        );

        return await getCachedIpWhitelist(session.accessToken);
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }
    }
}

export async function addIpToWhitelist(ip: string) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/ip`,
            { ip },
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
        return { error: "Erro ao adicionar IP à whitelist." };
    }
}

export async function removeIpFromWhitelist(id: number) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/ip/${id}`,
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
