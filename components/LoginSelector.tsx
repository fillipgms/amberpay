"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Squircle } from "@squircle-js/react";
import {
    createContext,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { twMerge } from "tailwind-merge";

const LoginContext = createContext<{
    selectedTab: string;
    setSelectedTab: (value: string) => void;
    registerRef: (value: string, element: HTMLDivElement | null) => void;
    triggerRefs: RefObject<Map<string, HTMLDivElement>>;
    isInitialized: boolean;
} | null>(null);

function LoginSelectorContainer({
    defaultTab,
    children,
}: {
    defaultTab?: string;
    children: ReactNode;
}) {
    const [selectedTab, setSelectedTab] = useState(defaultTab || "login");
    const [isInitialized, setIsInitialized] = useState(false);

    const triggerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const registerRef = (value: string, element: HTMLDivElement | null) => {
        if (element) {
            triggerRefs.current.set(value, element);
            if (!isInitialized) {
                setIsInitialized(true);
            }
        } else {
            triggerRefs.current.delete(value);
        }
    };

    return (
        <LoginContext.Provider
            value={{
                selectedTab,
                setSelectedTab,
                registerRef,
                triggerRefs,
                isInitialized,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

function LoginSelector({
    children,
}: {
    defaultTab?: string;
    children?: ReactNode;
}) {
    const context = useContext(LoginContext);

    if (!context) {
        throw new Error("LoginTrigger must be used within LoginSelector");
    }

    const { selectedTab, triggerRefs, isInitialized } = context;

    const pointerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const selectedElement = triggerRefs.current.get(selectedTab);

        if (selectedElement && pointerRef.current && containerRef.current) {
            const rect = selectedElement.getBoundingClientRect();
            const parentRect = containerRef.current.getBoundingClientRect();

            const x = rect.left - parentRect.left;
            const y = rect.top - parentRect.top;

            gsap.to(pointerRef.current, {
                width: rect.width,
                height: rect.height,
                x,
                y,
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(triggerRefs.current, {});
        }
    }, [selectedTab, children, isInitialized]);

    return (
        <Squircle
            cornerRadius={999}
            cornerSmoothing={1}
            className="w-full border p-2"
        >
            <div ref={containerRef} className="relative flex gap-2">
                <Squircle asChild cornerRadius={999} cornerSmoothing={1}>
                    <div
                        ref={pointerRef}
                        className="absolute bg-primary pointer-events-none -z-10"
                    />
                </Squircle>

                {children}
            </div>
        </Squircle>
    );
}

function LoginTrigger({
    value,
    children,
}: {
    value?: string;
    children?: ReactNode;
}) {
    const context = useContext(LoginContext);

    if (!context) {
        throw new Error("LoginTrigger must be used within LoginSelector");
    }

    const { selectedTab, setSelectedTab, registerRef } = context;
    const isSelected = selectedTab === value;
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) {
            registerRef(value, triggerRef.current);
        }
        return () => {
            if (value) {
                registerRef(value, null);
            }
        };
    }, [value, registerRef]);

    return (
        <div ref={triggerRef} className="flex-1">
            <Squircle
                cornerRadius={999}
                cornerSmoothing={1}
                onClick={() => value && setSelectedTab(value)}
                className={twMerge(
                    "border-none py-1 text-center cursor-pointer relative z-10 transition",
                    isSelected && "text-background"
                )}
            >
                {children}
            </Squircle>
        </div>
    );
}

function LoginContent({
    value,
    children,
}: {
    value?: string;
    children?: ReactNode;
}) {
    const context = useContext(LoginContext);

    if (!context) {
        throw new Error("LoginTrigger must be used within LoginSelector");
    }

    const { selectedTab } = context;
    const isSelected = selectedTab === value;

    return (
        <div className={twMerge("hidden", isSelected && "block")}>
            {children}
        </div>
    );
}

export { LoginSelector, LoginTrigger, LoginContent, LoginSelectorContainer };
