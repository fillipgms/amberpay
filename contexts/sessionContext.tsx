"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getMe } from "@/actions/user";

interface SessionContextType {
    sessionData: string | null;
    setSessionData: (data: string | null) => void;
    user: MeProps | null;
    session: SessionPayload | null;
    loading: boolean;
    error: string | null;
    refreshSession: () => Promise<void>;
}

export const SessionContext = React.createContext<SessionContextType>({
    sessionData: null,
    setSessionData: () => {},
    user: null,
    session: null,
    loading: true,
    error: null,
    refreshSession: async () => {},
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<MeProps | null>(null);
    const [session, setSession] = useState<SessionPayload | null>(null);
    const [sessionData, setSessionData] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const refreshSession = useCallback(async () => {
        if (!mounted) return;

        setLoading(true);
        setError(null);
        try {
            const userData = await getMe();

            if (!userData) {
                setUser(null);
                setSession(null);
                return;
            }

            setUser(userData);
        } catch (err) {
            if (
                err instanceof Error &&
                err.message.includes("Sessão expirada")
            ) {
                setUser(null);
                setSession(null);
                setError(null);
                router.push("/login");
                return;
            }

            setError("Erro ao carregar sessão");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [mounted, router]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            refreshSession();
        }
    }, [mounted, refreshSession]);

    useEffect(() => {
        if (!mounted) return;

        const interval = setInterval(() => {
            refreshSession();
        }, 10000);

        return () => clearInterval(interval);
    }, [mounted, refreshSession]);

    return (
        <SessionContext.Provider
            value={{
                sessionData,
                setSessionData,
                user,
                session,
                loading,
                error,
                refreshSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => React.useContext(SessionContext);
