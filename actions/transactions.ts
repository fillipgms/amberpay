"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import axios from "axios";

export interface TransactionFilters {
    page?: number;
    filter?: string;
    status?: string;
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
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }

        throw error;
    }
}

export interface CreateTransactionResponse {
    status: number;
    id_transaction: string;
    qrcode: string;
    qrcode_base64: string;
}

export async function createTransaction(
    amount: number,
    document: string,
): Promise<
    | { success: true; data: CreateTransactionResponse }
    | { success: false; error: string; data?: never }
> {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.post<CreateTransactionResponse>(
            "https://teste.emberpay.com.br/api/transactions",
            {
                amount,
                document,
            },
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return { success: true, data: res.data };
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            redirect("/login");
        }

        return {
            success: false,
            error: axios.isAxiosError(error)
                ? error.response?.data?.message || "Erro ao criar transação"
                : "Erro ao criar transação",
        };
    }
}

export async function checkTransactionStatus(transactionId: string) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const res = await axios.get(
            `https://teste.emberpay.com.br/api/transactions/${transactionId}`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            },
        );

        return { approved: res.status === 200 };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                redirect("/login");
            }
            // 500 means the transaction is still pending (not paid yet), not an error
            // Only treat other error codes as actual errors
            if (error.response?.status === 500) {
                return { approved: false };
            }
            return { approved: false, error: true };
        }

        return { approved: false, error: true };
    }
}
