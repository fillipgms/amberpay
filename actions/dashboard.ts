"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";
import { unstable_cache } from "next/cache";

export async function GetDashboardData() {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        console.log(`Bearer ${session.accessToken}`);

        // Cache dashboard data for 30 seconds to reduce API calls
        const getCachedDashboardData = unstable_cache(
            async (accessToken: string) => {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                return res.data;
            },
            ["dashboard-main"],
            {
                revalidate: 30, // Cache for 30 seconds
                tags: ["dashboard"],
            }
        );

        return await getCachedDashboardData(session.accessToken);
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

        // Cache growth data for 60 seconds per period
        const getCachedGrowthData = unstable_cache(
            async (accessToken: string, periodParam: string) => {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/growth?period=${periodParam}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                return res.data;
            },
            [`dashboard-growth-${period}`],
            {
                revalidate: 60,
                tags: ["dashboard", `growth-${period}`],
            }
        );

        return await getCachedGrowthData(session.accessToken, period);
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

        // Cache summary data for 60 seconds per filter
        const getCachedSummaryData = unstable_cache(
            async (accessToken: string, filterParam: string) => {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary?filter=${filterParam}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                return res.data;
            },
            [`dashboard-summary-${filter}`],
            {
                revalidate: 60,
                tags: ["dashboard", `summary-${filter}`],
            }
        );

        return await getCachedSummaryData(session.accessToken, filter);
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

        // Cache transactions data for 60 seconds per filter
        const getCachedTransactionsData = unstable_cache(
            async (accessToken: string, filterParam: string) => {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/overview?filter=${filterParam}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                return res.data;
            },
            [`dashboard-transactions-${filter}`],
            {
                revalidate: 60,
                tags: ["dashboard", `transactions-${filter}`],
            }
        );

        return await getCachedTransactionsData(session.accessToken, filter);
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

        // Cache breakdown data for 60 seconds per filter
        const getCachedBreakdownData = unstable_cache(
            async (accessToken: string, filterParam: string) => {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/breakdown?filter=${filterParam}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                return res.data;
            },
            [`dashboard-breakdown-${filter}`],
            {
                revalidate: 60,
                tags: ["dashboard", `breakdown-${filter}`],
            }
        );

        return await getCachedBreakdownData(session.accessToken, filter);
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
