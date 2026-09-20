"use client"
import { useState, useEffect } from "react";

type Entry = { id: number; kind: "line" | "box"; text: string; tone?: "normal" | "success" | "warn" };

const script: Entry[] = [
    { id: 1, kind: "line", text: "CyrilOS Kernel 6.11.2-production-stable // Session initiated // User: Cyril", tone: "normal" },
    { id: 2, kind: "line", text: "cyril@-cyril9t ~/portfolio (git:main) $ cat /etc/engineer.manifesto", tone: "normal" },
    { id: 4, kind: "line", text: "› Core Philosophy: Think before writing code. Automate the boring parts.", tone: "normal" },
    { id: 5, kind: "line", text: "› System Status: READY FOR DEPLOYMENT", tone: "success" },
    { id: 7, kind: "line", text: "[11:10:24] POST /api/v1/auth 200 OK (342ms)", tone: "normal" },
    { id: 8, kind: "line", text: "[11:10:24] GET /api/v1/user/me 200 OK (128ms)", tone: "normal" },
    { id: 9, kind: "line", text: "[11:10:25] Connecting to PostgreSQL... Success", tone: "success" },
    { id: 10, kind: "line", text: "[11:10:25] Redis latency spike (118ms)", tone: "warn" },
    { id: 11, kind: "line", text: "[11:10:26] Server running on port 8000", tone: "normal" },
    { id: 13, kind: "line", text: "✓ utils/formatDate.test.ts (4)", tone: "success" },
    { id: 14, kind: "line", text: "✓ components/ProjectCard.test.tsx (7)", tone: "success" },
    { id: 15, kind: "line", text: "✓ api/routes.test.ts (11)", tone: "success" },
    { id: 16, kind: "line", text: "Test Files 3 passed (3) · Tests 22 passed (22) · 1.84s", tone: "normal" },
];

const toneClass: Record<string, string> = {
    normal: "text-emerald-400",
    success: "text-emerald-300 font-semibold",
    warn: "text-amber-400",
};

const TYPE_SPEED_MS = 18; // per character
const LINE_PAUSE_MS = 260; // pause after a line finishes, before the next starts
const LOOP_PAUSE_MS = 3200; // pause after the whole script finishes, before restarting

export default function DeveloperTerminalAnimated() {
    const [completedLines, setCompletedLines] = useState<Entry[]>([]);
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);

    const currentEntry = lineIdx < script.length ? script[lineIdx] : null;
    const currentText = currentEntry ? currentEntry.text.slice(0, charIdx) : "";

    useEffect(() => {
        // whole script finished — pause, then restart the loop
        if (!currentEntry) {
            const t = setTimeout(() => {
                setCompletedLines([]);
                setLineIdx(0);
                setCharIdx(0);
            }, LOOP_PAUSE_MS);
            return () => clearTimeout(t);
        }

        // still typing the current line, one character at a time
        if (charIdx < currentEntry.text.length) {
            const t = setTimeout(() => setCharIdx((c) => c + 1), TYPE_SPEED_MS);
            return () => clearTimeout(t);
        }

        // current line just finished typing — commit it, then move to the next line
        const t = setTimeout(() => {
            setCompletedLines((prev) => [...prev, currentEntry]);
            setLineIdx((i) => i + 1);
            setCharIdx(0);
        }, LINE_PAUSE_MS);
        return () => clearTimeout(t);
    }, [lineIdx, charIdx, currentEntry]);

    const renderEntry = (entry: Entry, text: string, showCursor: boolean) =>
        entry.kind === "box" ? (
            <div
                key={entry.id}
                className="border border-emerald-900 text-emerald-300 bg-emerald-500/5 rounded-md px-4 py-3 whitespace-pre-wrap my-2"
            >
                {text}
                {showCursor && <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 align-middle animate-pulse" />}
            </div>
        ) : (
            <div key={entry.id} className={toneClass[entry.tone ?? "normal"]}>
                {text}
                {showCursor && <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 align-middle animate-pulse" />}
            </div>
        );

    return (
        <div className="w-full max-w-3xl mx-auto rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-gray-800/60">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-gray-400 text-xs font-medium">engineer.manifesto</div>
                <div className="flex items-center space-x-2 text-emerald-400 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Live</span>
                </div>
            </div>

            {/* Tabs (decorative) */}
            <div className="flex items-center space-x-2 px-4 py-2 border-b border-gray-900 bg-gray-950/60">
                {["git log", "manifesto", "tail -f", "npm test"].map((t) => (
                    <span
                        key={t}
                        className={`text-[11px] px-2.5 py-1 rounded-md border ${t === "manifesto"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-800"
                            : "border-gray-800 text-gray-500"
                            }`}
                    >
                        {t}
                    </span>
                ))}
            </div>

            {/* Body */}
            <div className="p-5 space-y-2 min-h-[200px] max-h-[250px] overflow-scroll flex flex-col scrollbar-thumb-mauve-800">
                <div className="space-y-2 flex-1">
                    {completedLines.map((entry) => renderEntry(entry, entry.text, false))}
                    {currentEntry && renderEntry(currentEntry, currentText, true)}
                </div>

                {/* Live indicator */}
                <div className="pt-4 flex items-center justify-between border-t border-gray-900 mt-4">
                    <div className="flex items-center space-x-2 text-emerald-400">
                        <span>&gt;_</span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-400 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>Live Logs</span>
                    </div>
                </div>
            </div>
        </div>
    );
}