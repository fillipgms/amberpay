"use client";
import { createContext, useContext, useCallback, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface DashboardContextType {
    refreshDashboard: () => void;
    isRefreshing: boolean;
    lastUpdate: number;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within DashboardProvider");
    }
    return context;
};

export const DashboardProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const refreshDashboard = useCallback(() => {
        // Debounce refresh calls to prevent excessive requests
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            setIsRefreshing(true);
            setLastUpdate(Date.now());
            router.refresh();

            // Reset refreshing state after a short delay
            setTimeout(() => {
                setIsRefreshing(false);
            }, 500);
        }, 1000); // Wait 1 second before actually refreshing
    }, [router]);

    // WebSocket setup (ready for when you add WebSocket server)
    useEffect(() => {
        // Check if WebSocket URL is configured
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
        if (!wsUrl) return;

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Listen for balance updates, new transactions, etc.
                if (
                    data.type === "balance_update" ||
                    data.type === "transaction_complete" ||
                    data.type === "deposit_confirmed" ||
                    data.type === "withdrawal_complete"
                ) {
                    refreshDashboard();
                }
            } catch (error) {
                console.error("WebSocket message parse error:", error);
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            ws.close();
        };
    }, [refreshDashboard]);

    return (
        <DashboardContext.Provider
            value={{ refreshDashboard, isRefreshing, lastUpdate }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
