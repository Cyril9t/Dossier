"use client";

import { useEffect, useState } from "react";

type Entry = {
    id: number;
    kind: "line" | "box";
    text: string;
    tone?: "normal" | "success" | "warn";
};

const script: Entry[] = [
    {
        id: 1,
        kind: "line",
        text: "cyril@portfolio ~/developer $ cat about.txt",
        tone: "normal",
    },
    {
        id: 2,
        kind: "line",
        text: "› Build useful things. Keep the code clean. Keep learning.",
        tone: "normal",
    },
    {
        id: 3,
        kind: "line",
        text: "› Turning ideas into thoughtful web experiences.",
        tone: "normal",
    },
    {
        id: 4,
        kind: "line",
        text: "› React · Next.js · TypeScript · Node.js",
        tone: "normal",
    },
    {
        id: 5,
        kind: "line",
        text: "› Always building. Always improving.",
        tone: "success",
    },
    {
        id: 6,
        kind: "line",
        text: "✓ Open to meaningful opportunities.",
        tone: "success",
    },
];

const toneClass: Record<string, string> = {
    normal: "text-foreground",
    success: "text-primary font-semibold",
    warn: "text-destructive",
};

const TYPE_SPEED_MS = 18;
const LINE_PAUSE_MS = 240;
const LOOP_PAUSE_MS = 3200;

export default function DeveloperTerminalAnimated() {
    const [completedLines, setCompletedLines] = useState<Entry[]>([]);
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);

    const currentEntry =
        lineIdx < script.length ? script[lineIdx] : null;

    const currentText = currentEntry
        ? currentEntry.text.slice(0, charIdx)
        : "";

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
            const timeout = setTimeout(() => {
                setCharIdx((value) => value + 1);
            }, TYPE_SPEED_MS);

            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setCompletedLines((previous) => [
                ...previous,
                currentEntry,
            ]);

            setLineIdx((value) => value + 1);
            setCharIdx(0);
        }, LINE_PAUSE_MS);

        return () => clearTimeout(timeout);
    }, [lineIdx, charIdx, currentEntry]);

    const renderEntry = (
        entry: Entry,
        text: string,
        showCursor: boolean
    ) =>
        entry.kind === "box" ? (
            <div
                key={entry.id}
                className="my-2 whitespace-pre-wrap rounded-xl border border-border bg-secondary px-4 py-3 text-secondary-foreground"
            >
                {text}

                {showCursor && (
                    <span className="ml-1 inline-block h-4 w-2 align-middle animate-pulse bg-primary" />
                )}
            </div>
        ) : (
            <div
                key={entry.id}
                className={`${toneClass[entry.tone ?? "normal"]} leading-relaxed`}
            >
                {text}

                {showCursor && (
                    <span className="ml-1 inline-block h-4 w-2 align-middle animate-pulse bg-primary" />
                )}
            </div>
        );

    return (
        <div className="relative mx-auto w-full overflow-hidden rounded-[22px] border border-border bg-background font-mono text-[12px]">
            <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                        <span className="h-2.5 w-2.5 rounded-full bg-secondary-foreground" />
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>

                    <div className="text-[12px] uppercase tracking-widest text-foreground">
                        about.md
                    </div>

                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">
                        <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
                        <span>live</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 border-b border-border bg-secondary/20 px-4 py-2.5">
                    {["git log", "manifesto", "tail -f", "npm test"].map(
                        (tab) => (
                            <span
                                key={tab}
                                className={`rounded-md border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${tab === "manifesto"
                                    ? "border-border bg-secondary text-primary"
                                    : "border-border bg-transparent text-muted-foreground"
                                    }`}
                            >
                                {tab}
                            </span>
                        )
                    )}
                </div>

                {/* Animated output */}
                <div className="p-4">
                    <div className="flex flex-col gap-2">
                        {completedLines.map((entry) =>
                            renderEntry(entry, entry.text, false)
                        )}

                        {currentEntry &&
                            renderEntry(
                                currentEntry,
                                currentText,
                                true
                            )}
                    </div>

                    {/* Status */}
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10px] uppercase tracking-[0.18em] text-primary">
                        <span className="text-primary">
                            &gt;_
                        </span>

                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
                            <span>Live logs</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}