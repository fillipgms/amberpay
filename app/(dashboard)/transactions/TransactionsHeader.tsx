"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

export default function TransactionsHeader() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const containerRef = useRef(null);
    const filtersRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef(null);

    const [filter, setFilter] = useState(searchParams.get("filter") || "Tudo");
    const [status, setStatus] = useState(searchParams.get("status") || "Todos");
    const [startDate, setStartDate] = useState(
        searchParams.get("start_date") || "",
    );
    const [endDate, setEndDate] = useState(searchParams.get("end_date") || "");
    const [apply, setApply] = useState(searchParams.get("apply") || "Todos");
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (!filtersRef.current) return;

        const el = filtersRef.current;
        const height = el.scrollHeight;

        gsap.to(el, {
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0.5,
            translateY: isExpanded ? 0 : "-40%",
            duration: 0.6,
            ease: "expo.out",
            overflow: "hidden",
            overwrite: "auto",
        });

        gsap.to(containerRef.current, {
            height: isExpanded ? "auto" : "0px",
            delay: 0,
            ease: "expo.out",
            autoRound: false,
        });
    }, [isExpanded]);

    const handleFilterChange = () => {
        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
        });

        const params = new URLSearchParams();
        params.set("page", "1");
        if (filter && filter !== "Tudo") params.set("filter", filter);
        if (status && status !== "Todos") params.set("status", status);
        if (startDate) params.set("start_date", startDate);
        if (endDate) params.set("end_date", endDate);
        if (apply && apply !== "Todos") params.set("apply", apply);
        if (search) params.set("search", search);

        setTimeout(() => {
            router.push(`/transactions?${params.toString()}`);
        }, 200);
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const activeFiltersCount = [
        filter !== "Tudo",
        status !== "Todos",
        startDate,
        endDate,
        apply !== "Todos",
        search,
    ].filter(Boolean).length;

    return (
        <div
            id="filtersContainer"
            className="relative bg-gradient-to-b from-background to-background/95 backdrop-blur-xl"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Filtros
                        </h2>
                        {activeFiltersCount > 0 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                {activeFiltersCount}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={toggleExpanded}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        {isExpanded ? "Ocultar" : "Mostrar"}
                    </button>
                </div>

                {/* Filters Grid */}
                <div ref={containerRef} className="overflow-hidden">
                    <div
                        ref={filtersRef}
                        id="filters"
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {/* Filter Type */}
                            <div className="group">
                                <label className="block text-xs font-medium text-foreground/60 mb-2 tracking-wide uppercase">
                                    Tipo
                                </label>
                                <div className="relative">
                                    <Select
                                        value={filter}
                                        onValueChange={setFilter}
                                    >
                                        <SelectTrigger className="w-full h-11 bg-background/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20 rounded-xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem
                                                value="Tudo"
                                                className="rounded-lg"
                                            >
                                                Tudo
                                            </SelectItem>
                                            <SelectItem
                                                value="Entrada"
                                                className="rounded-lg"
                                            >
                                                Entrada
                                            </SelectItem>
                                            <SelectItem
                                                value="Saída"
                                                className="rounded-lg"
                                            >
                                                Saída
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="group">
                                <label className="block text-xs font-medium text-foreground/60 mb-2 tracking-wide uppercase">
                                    Status
                                </label>
                                <Select
                                    value={status}
                                    onValueChange={setStatus}
                                >
                                    <SelectTrigger className="w-full h-11 bg-background/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem
                                            value="Todos"
                                            className="rounded-lg"
                                        >
                                            Todos
                                        </SelectItem>
                                        <SelectItem
                                            value="Aprovada"
                                            className="rounded-lg"
                                        >
                                            Aprovada
                                        </SelectItem>
                                        <SelectItem
                                            value="Pendente"
                                            className="rounded-lg"
                                        >
                                            Pendente
                                        </SelectItem>
                                        <SelectItem
                                            value="Recusada"
                                            className="rounded-lg"
                                        >
                                            Recusada
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Application */}
                            <div className="group">
                                <label className="block text-xs font-medium text-foreground/60 mb-2 tracking-wide uppercase">
                                    Origem
                                </label>
                                <Select value={apply} onValueChange={setApply}>
                                    <SelectTrigger className="w-full h-11 bg-background/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20 rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem
                                            value="Todos"
                                            className="rounded-lg"
                                        >
                                            Todos
                                        </SelectItem>
                                        <SelectItem
                                            value="API"
                                            className="rounded-lg"
                                        >
                                            API
                                        </SelectItem>
                                        <SelectItem
                                            value="Painel"
                                            className="rounded-lg"
                                        >
                                            Painel
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Start Date */}
                            <div className="group">
                                <label className="block text-xs font-medium text-foreground/60 mb-2 tracking-wide uppercase">
                                    Data Inicial
                                </label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    className="h-11 bg-background/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            {/* End Date */}
                            <div className="group">
                                <label className="block text-xs font-medium text-foreground/60 mb-2 tracking-wide uppercase">
                                    Data Final
                                </label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="h-11 bg-background/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20 rounded-xl"
                                />
                            </div>

                            {/* Search */}
                            <div className="group">
                                <label className="block text-xs font-medium text-foreground/60 mb-2 tracking-wide uppercase">
                                    Buscar
                                </label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Buscar transações..."
                                        className="h-11 pr-10 bg-background/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-200 focus:ring-2 focus:ring-primary/20 rounded-xl"
                                    />
                                    <MagnifyingGlassIcon
                                        size={18}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/30">
                            <button
                                onClick={() => {
                                    setFilter("Tudo");
                                    setStatus("Todos");
                                    setStartDate("");
                                    setEndDate("");
                                    setApply("Todos");
                                    setSearch("");
                                }}
                                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                            >
                                Limpar tudo
                            </button>

                            <Button
                                ref={buttonRef}
                                onClick={handleFilterChange}
                            >
                                Aplicar Filtros
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </div>
    );
}
