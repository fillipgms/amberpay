"use server";

import axios from "axios";
import { getSession } from "./auth";
import { redirect } from "next/navigation";

export async function getMe() {
    try {
        const session = await getSession();
        if (!session?.accessToken) {
            return null;
        }

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/me`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }
        return null;
    }
}

export async function getDevicesData() {
    try {
        const session = await getSession();
        if (!session?.accessToken) {
            return null;
        }

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/devices`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }
        return null;
    }
}

export async function deleteDevice(id: number) {
    try {
        const session = await getSession();
        if (!session?.accessToken) {
            return null;
        }

        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/devices/${id}`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        return true;
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }
        return false;
    }
}

export async function updateMe(data: { auto_approve_withdrawal: boolean }) {
    try {
        const session = await getSession();
        if (!session?.accessToken) {
            return null;
        }

        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/me`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return response.data;
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
