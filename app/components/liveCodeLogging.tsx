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
    normal: "text-emerald-300",
    success: "text-emerald-200 font-semibold",
    warn: "text-amber-300",
};

const TYPE_SPEED_MS = 18;
const LINE_PAUSE_MS = 240;
const LOOP_PAUSE_MS = 3200;

export default function DeveloperTerminalAnimated() {
    const [completedLines, setCompletedLines] = useState<Entry[]>([]);
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);

    const currentEntry = lineIdx < script.length ? script[lineIdx] : null;
    const currentText = currentEntry ? currentEntry.text.slice(0, charIdx) : "";

    useEffect(() => {
        if (!currentEntry) {
            const timeout = setTimeout(() => {
                setCompletedLines([]);
                setLineIdx(0);
                setCharIdx(0);
            }, LOOP_PAUSE_MS);
            return () => clearTimeout(timeout);
        }

        if (charIdx < currentEntry.text.length) {
            const timeout = setTimeout(() => setCharIdx((value) => value + 1), TYPE_SPEED_MS);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setCompletedLines((previous) => [...previous, currentEntry]);
            setLineIdx((value) => value + 1);
            setCharIdx(0);
        }, LINE_PAUSE_MS);

        return () => clearTimeout(timeout);
    }, [lineIdx, charIdx, currentEntry]);

    const renderEntry = (entry: Entry, text: string, showCursor: boolean) =>
        entry.kind === "box" ? (
            <div
                key={entry.id}
                className="my-2 whitespace-pre-wrap rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-emerald-200"
            >
                {text}
                {showCursor && <span className="ml-1 inline-block h-4 w-2 align-middle bg-emerald-400 animate-pulse" />}
            </div>
        ) : (
            <div key={entry.id} className={`${toneClass[entry.tone ?? "normal"]} leading-relaxed`}>
                {text}
                {showCursor && <span className="ml-1 inline-block h-4 w-2 align-middle bg-emerald-400 animate-pulse" />}
            </div>
        );

    return (
        <div className="relative mx-auto w-full overflow-hidden rounded-[22px] border border-border  font-mono text-[12px] bg-background scrollbar-none">
            {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),transparent_56%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-25 " /> */}

            <div className="relative">
                <div className="flex items-center justify-between border-b border-border px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 " />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 " />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 " />
                    </div>

                    <div className="text-[12px] uppercase tracking-widest text-white">
                        engineer.manifesto
                    </div>

                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">
                        <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
                        <span>live</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 border-b border-border bg-secondary/26 px-4 py-2.5 ">
                    {['git log', 'manifesto', 'tail -f', 'npm test'].map((tab) => (
                        <span
                            key={tab}
                            className={`rounded-md border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${tab === 'manifesto'
                                ? 'border-border bg-secondary text-primary shadow-[inset_0_1px_0_rgba(16,185,129,0.15)]'
                                : 'border-emerald-500/10 bg-transparent text-emerald-100/45'}
                            `}
                        >
                            {tab}
                        </span>
                    ))}
                </div>

                <div className="flex min-h-45 max-h-40 flex-col gap-2 overflow-y-auto p-4 scrollbar-none">
                    <div className="flex flex-1 flex-col gap-2">
                        {completedLines.map((entry) => renderEntry(entry, entry.text, false))}
                        {currentEntry && renderEntry(currentEntry, currentText, true)}
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-emerald-500/10 pt-3 text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                        <span className="text-emerald-200">&gt;_</span>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                            <span>Live logs</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}