import React from "react";
import { pdf } from "@react-pdf/renderer";
import { Transaction } from "@/components/tables/TransactionsTable";
import { TransactionReceipt } from "@/components/pdf/TransactionReceipt";

export const generateTransactionPDF = async (
    transaction: Transaction,
    bankId?: string
) => {
    try {
        // Generate the PDF blob
        const blob = await pdf(
            <TransactionReceipt transaction={transaction} bankId={bankId} />
        ).toBlob();

        // Create a blob URL
        const url = URL.createObjectURL(blob);

        // Open PDF in new tab for review
        const newWindow = window.open(url, "_blank");

        if (!newWindow) {
            throw new Error("Pop-up blocker may have prevented opening the PDF");
        }

        // Clean up the URL after a delay to allow the browser to load it
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);

        return { success: true };
    } catch (error) {
        console.error("Error generating PDF:", error);
        return { success: false, error };
    }
};
