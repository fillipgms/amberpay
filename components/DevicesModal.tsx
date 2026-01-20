"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "./ui/Credenza";
import {
    DevicesIcon,
    DesktopIcon,
    DeviceMobileIcon,
    QuestionIcon,
    SignOutIcon,
} from "@phosphor-icons/react";

import { devices } from "@/constants/devicesData";
import { cn } from "@/lib/utils";

type DeviceType = "desktop" | "mobile" | "unknown";

interface Device {
    id: number;
    device_name: string;
    ip_address: string;
    address: string;
    user_agent: string;
    last_used_at: string;
}

const DevicesModal = () => {
    const [signingOut, setSigningOut] = useState<number | null>(null);

    const getDeviceType = (deviceName: string, userAgent: string): DeviceType => {
        if (deviceName.includes("Desconhecido")) {
            // Check user agent for mobile indicators
            if (userAgent.toLowerCase().includes("dart")) {
                return "mobile";
            }
            return "unknown";
        }

        if (
            deviceName.includes("macOS") ||
            deviceName.includes("Windows") ||
            deviceName.includes("Desktop")
        ) {
            return "desktop";
        }

        if (
            deviceName.toLowerCase().includes("mobile") ||
            deviceName.toLowerCase().includes("android") ||
            deviceName.toLowerCase().includes("ios") ||
            deviceName.toLowerCase().includes("iphone")
        ) {
            return "mobile";
        }

        return "unknown";
    };

    const getDeviceIcon = (type: DeviceType) => {
        const iconProps = {
            size: 40,
            weight: "duotone" as const,
            className: "text-foreground/70",
        };

        switch (type) {
            case "desktop":
                return <DesktopIcon {...iconProps} />;
            case "mobile":
                return <DeviceMobileIcon {...iconProps} />;
            default:
                return <QuestionIcon {...iconProps} />;
        }
    };

    const getDeviceDisplayName = (deviceName: string): string => {
        const parts = deviceName.split(" - ");
        if (parts.length > 1) {
            return parts[1] === "Desconhecido" ? "Dispositivo Desconhecido" : parts[1];
        }
        return deviceName;
    };

    const relativeTimeFromNow = (dateString: string): string => {
        const [datePart, timePart] = dateString.split(" ");
        const [day, month, year] = datePart.split("/");
        const [hours, minutes] = timePart.split(":");

        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hours),
            Number(minutes),
        );

        if (isNaN(date.getTime())) {
            return "data inválida";
        }

        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();

        if (diffInMs < 0) {
            return "agora mesmo";
        }

        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

        if (diffInMinutes < 1) {
            return "agora mesmo";
        }

        if (diffInMinutes < 60) {
            return `${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"} atrás`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);

        if (diffInHours < 24) {
            return `${diffInHours} ${diffInHours === 1 ? "hora" : "horas"} atrás`;
        }

        const diffInDays = Math.floor(diffInHours / 24);

        return `${diffInDays} ${diffInDays === 1 ? "dia" : "dias"} atrás`;
    };

    const handleSignOut = async (deviceId: number) => {
        setSigningOut(deviceId);

        try {
            // Simulate API call - replace with your actual API endpoint
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // TODO: Implement actual sign out logic
            console.log(`Signing out device ${deviceId}`);

            // After successful sign out, you might want to:
            // - Remove the device from the list
            // - Show a success message
            // - Refresh the devices list
        } catch (error) {
            console.error("Failed to sign out device:", error);
            // TODO: Show error message to user
        } finally {
            setSigningOut(null);
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <button className="flex items-center gap-2 w-full">
                    <DevicesIcon className="text-foreground" weight="duotone" />
                    Dispositivos
                </button>
            </CredenzaTrigger>
            <CredenzaContent className="max-h-[85vh] flex flex-col">
                <CredenzaHeader className="shrink-0">
                    <CredenzaTitle>Gerenciar Dispositivos</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody className="flex-1 overflow-y-auto">
                    <div className="space-y-4">
                        <div className="sticky top-0 bg-background z-10 pb-2">
                            <h5 className="py-2 border-b border-border/50 font-semibold text-sm text-foreground/70">
                                Dispositivos Ativos ({devices.length})
                            </h5>
                        </div>

                        <div className="space-y-3 pb-4">
                            {devices.map((device: Device, index: number) => {
                                const isThisDevice = index === 0;
                                const deviceType = getDeviceType(
                                    device.device_name,
                                    device.user_agent,
                                );
                                const displayName = getDeviceDisplayName(device.device_name);

                                return (
                                    <div
                                        key={device.id}
                                        className={cn(
                                            "rounded-lg bg-card/50 border transition-all duration-200",
                                            "hover:bg-card/80 hover:border-border/80",
                                            "p-4 flex gap-4",
                                            isThisDevice && "border-primary/50 bg-primary/5 hover:bg-primary/10",
                                        )}
                                    >
                                        <div className="shrink-0 flex items-start pt-1">
                                            {getDeviceIcon(deviceType)}
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h6 className="font-semibold text-foreground text-base truncate">
                                                    {displayName}
                                                </h6>
                                                {isThisDevice && (
                                                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 shrink-0">
                                                        Este dispositivo
                                                    </span>
                                                )}
                                            </div>

                                            <div className="space-y-1 text-sm text-foreground/60">
                                                <p className="flex items-center gap-1.5 flex-wrap">
                                                    <span className="font-mono text-xs">
                                                        {device.ip_address}
                                                    </span>
                                                    <span className="text-foreground/30">•</span>
                                                    <span className="truncate">{device.address}</span>
                                                </p>
                                                <p className="text-xs">
                                                    Último acesso: {relativeTimeFromNow(device.last_used_at)}
                                                </p>
                                            </div>

                                            {!isThisDevice && (
                                                <div className="pt-1">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleSignOut(device.id)}
                                                        disabled={signingOut === device.id}
                                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 hover:border-destructive/40"
                                                    >
                                                        <SignOutIcon size={16} weight="bold" />
                                                        {signingOut === device.id
                                                            ? "Encerrando..."
                                                            : "Encerrar sessão"}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};

export default DevicesModal;
