"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";

export async function getIpWhitelist() {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ip`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        return res.data;
    } catch (error) {}
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
    } catch (error) {}
}
