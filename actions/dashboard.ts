"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";

export async function GetDashboardData() {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        console.log(`Bearer ${session.accessToken}`);

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
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

        throw error;
    }
}

export async function GetGrowthData(period = "annual") {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/dashboard/growth?period=${period}`,
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

        throw error;
    }
}

export async function GetSummaryData(filter = "year") {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary?filter=${filter}`,
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

        throw error;
    }
}

export async function GetTransactionsData(filter = "year") {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/dashboard/overview?filter=${filter}`,
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
        throw error;
    }
}

export async function GetBreakdownData(filter = "year") {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/dashboard/breakdown?filter=${filter}`,
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

        throw error;
    }
}
