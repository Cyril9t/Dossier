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
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">

            <div className="rounded-full border border-border p-1 backdrop-blur-md">


                <nav className="flex items-center gap-1 rounded-full bg-background/20 px-3 py-2">
                    {items.map(({ id, label, icon: Icon }) => {
                        const isActive = id === active;
                        return (
                            <Link key={id} href={`#${id}`}>
                                <button

                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => select(id)}
                                    className="relative flex flex-col items-center justify-center rounded-full px-4 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    {/* Icon with spring animation */}
                                    <motion.div
                                        animate={{
                                            scale: isActive ? 1.08 : 1,
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        className={`flex items-center justify-center transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground/70"
                                            }`}
                                    >
                                        <Icon size={18} strokeWidth={2} />
                                    </motion.div>

                                    {/* Label */}
                                    <span
                                        className={`mt-0.5 text-[11px] font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground/70"
                                            }`}
                                    >
                                        {label}
                                    </span>

                                    {/* Active Dot Indicator mapped to --primary */}
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