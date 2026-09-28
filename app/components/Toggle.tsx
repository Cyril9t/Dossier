"use client";


import { Button } from "@/components/ui/button";
import { Lightbulb, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const nextDark = !dark;

        document.documentElement.classList.toggle("dark", nextDark);

        localStorage.setItem(
            "theme",
            nextDark ? "dark" : "light"
        );

        setDark(nextDark);
    };

    return (
        <Button
            variant={"outline"}
            onClick={toggleTheme}
            aria-label="Toggle theme"

        >
            {dark ? <Sun /> : <Moon />}
        </Button>
    );
}