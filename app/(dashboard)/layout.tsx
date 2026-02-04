import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardProvider>
            <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <div className="flex-1">
                    <Header />
                    {children}
                    <Toaster />
                </div>
            </SidebarProvider>
        </DashboardProvider>
    );
}
