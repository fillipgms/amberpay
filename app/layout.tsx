import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/contexts/sessionContext";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Emberpay",
    description:
        "Conecte, receba e organize pagamentos instantâneos de forma prática, segura e escalável, além de contar com split nativo",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br" suppressHydrationWarning>
            <body className={`${manrope.variable} antialiased`}>
                <SessionProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        storageKey="amberpay-theme"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
