"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";

export interface TransactionFilters {
    page?: number;
    filter?: string; // "Tudo", etc
    status?: string; // "Todos", "Aprovada", "Pendente"
    start_date?: string;
    end_date?: string;
    apply?: string;
    search?: string;
}

export async function getTransactions(filters: TransactionFilters = {}) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const params = new URLSearchParams();

        if (filters.page) params.set("page", filters.page.toString());
        if (filters.filter) params.set("filter", filters.filter);
        if (filters.status) params.set("status", filters.status);
        if (filters.start_date) params.set("start_date", filters.start_date);
        if (filters.end_date) params.set("end_date", filters.end_date);
        if (filters.apply) params.set("apply", filters.apply);
        if (filters.search) params.set("search", filters.search);

        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions${queryString ? `?${queryString}` : ""}`;

        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        return res.data;
    } catch (error) {
        throw error;
    }
}
