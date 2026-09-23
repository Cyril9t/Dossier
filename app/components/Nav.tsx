"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Folder, Terminal, Layers, Mail, type LucideIcon } from "lucide-react";
import Link from "next/link";

export type NavItem = {
    id: string;
    label: string;
    icon: LucideIcon;
};

export type NavBarProps = {
    items?: NavItem[];
    defaultActive?: string;
    onChange?: (id: string) => void;
};

const NAV_ITEMS: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "terminal", label: "Terminal", icon: Terminal },
    { id: "techStack", label: "Stack", icon: Layers },
    { id: "contact", label: "Contact", icon: Mail },
];

export default function Nav({
    items = NAV_ITEMS,
    defaultActive,
    onChange,
}: NavBarProps) {
    const [active, setActive] = useState<string>(defaultActive ?? items[0]?.id ?? "");

    const select = (id: string) => {
        setActive(id);
        onChange?.(id);
    };

    return (
        <div className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1rem)] max-w-[32rem] -translate-x-1/2 sm:bottom-6">
            <div className="rounded-full border border-border bg-background/70 p-1 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                <nav className="flex items-center justify-between gap-1 rounded-full bg-background/20 px-1.5 py-2 sm:px-3">
                    {items.map(({ id, label, icon: Icon }) => {
                        const isActive = id === active;
                        return (
                            <Link key={id} href={`#${id}`} className="flex-1">
                                <button
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => select(id)}
                                    className="relative flex w-full flex-col items-center justify-center rounded-full px-2 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4"
                                >
                                    <motion.div
                                        animate={{
                                            scale: isActive ? 1.08 : 1,
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        className={`flex items-center justify-center transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground/70"}`}
                                    >
                                        <Icon size={18} strokeWidth={2} />
                                    </motion.div>

                                    <span
                                        className={`mt-0.5 text-[10px] font-medium transition-colors duration-200 sm:text-[11px] ${isActive ? "text-primary" : "text-muted-foreground/70"}`}
                                    >
                                        {label}
                                    </span>

                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active-dot"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                                        />
                                    )}
                                </button>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}