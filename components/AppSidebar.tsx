"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import ThemeSwitcher from "./Theme-Switcher";
import ArrowDoorOut from "@/public/icons/arrow-door-out";
import Link from "next/link";
import GridIcon from "@/public/icons/grid";
import { usePathname } from "next/navigation";
import StarIcon from "@/public/icons/star";
import {
    ArrowsDownUpIcon,
    KeyIcon,
    LockKeyIcon,
    UserIcon,
} from "@phosphor-icons/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    CaretUpIcon,
    DevicesIcon,
    GearIcon,
} from "@phosphor-icons/react/dist/ssr";

const items = [
    { title: "Dashboard", url: "/", icon: GridIcon },
    { title: "Recompensas", url: "/rewards", icon: StarIcon },
    { title: "Transações", url: "/transactions", icon: ArrowsDownUpIcon },
    { title: "Credenciais", url: "/credentials", icon: KeyIcon },
    { title: "Ip WhiteList", url: "/whitelist", icon: LockKeyIcon },
];

const AppSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="sr-only">
                        Main Nav
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const active = item.url === pathname;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            className={
                                                active
                                                    ? "bg-primary rounded-md text-background hover:bg-primary/50 hover:text-background"
                                                    : ""
                                            }
                                            asChild
                                        >
                                            <Link href={item.url}>
                                                <item.icon
                                                    weight={
                                                        active
                                                            ? "fill"
                                                            : "regular"
                                                    }
                                                />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <ThemeSwitcher />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <UserIcon /> Username
                                    <CaretUpIcon className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span className="flex items-center gap-2">
                                        <GearIcon className="text-foreground" />
                                        Configurações
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span className="flex items-center gap-2">
                                        <DevicesIcon className="text-foreground" />
                                        Dispositivos
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span className="flex items-center gap-2">
                                        <ArrowDoorOut className="text-foreground" />
                                        Sair
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;
