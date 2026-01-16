"use client";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY < 10) {
                setShow(true);
            } else if (window.scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar);
            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [lastScrollY]);

    useGSAP(() => {
        gsap.to("#main-header", {
            translateY: show ? "0" : "-100%",
            duration: 0.2,
        });
    }, [show]);

    return (
        <header
            id="main-header"
            className={twMerge(
                "py-5 px-8 flex items-center justify-between w-full border-b-gradient sticky! top-0 left-0 bg-background z-50"
            )}
        >
            <div className="flex gap-4">
                <SidebarTrigger />
                <p>William Bowery</p>
            </div>
            <Button>Chamar Gerente</Button>
        </header>
    );
};

export default Header;
