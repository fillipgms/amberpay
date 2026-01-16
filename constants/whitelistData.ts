import type { WhitelistEntry } from "@/components/tables/WhitelistTable";

export const whitelistData: WhitelistEntry[] = [
    {
        id: "wl_001",
        date: "2025-01-15",
        ip: "192.168.1.100",
        description: "Office main network",
    },
    {
        id: "wl_002",
        date: "2025-01-14",
        ip: "10.0.0.50",
        description: "Development server",
    },
    {
        id: "wl_003",
        date: "2025-01-13",
        ip: "172.16.0.1",
        description: "VPN gateway",
    },
    {
        id: "wl_004",
        date: "2025-01-12",
        ip: "203.0.113.42",
        description: "Partner API",
    },
    {
        id: "wl_005",
        date: "2025-01-11",
        ip: "198.51.100.89",
        description: "Backup server",
    },
];
