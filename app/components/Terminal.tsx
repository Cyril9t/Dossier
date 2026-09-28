"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
} from "react";

const USER = "cyril@cyril9t";
const CWD = "~/portfolio";
const EMAIL = "cyrilesin214@gmail.com";
const GITHUB = "https://github.com/Cyril9t";
const LINKEDIN = "https://www.linkedin.com/in/cyril-esin-6a9a3934b/";

type LineType = "line" | "box";

interface HistoryLine {
    id: number;
    type: LineType;
    html: string;
}

type CommandFn = () => string | null | Promise<string | null | void>;

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function DeveloperTerminal() {
    const [history, setHistory] = useState<HistoryLine[]>([]);
    const [input, setInput] = useState("");
    const [busy, setBusy] = useState(true);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const idRef = useRef(0);
    const screenRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const mountedRef = useRef(true);
    const abortRef = useRef(false);

    const newId = useCallback(() => {
        idRef.current += 1;
        return idRef.current;
    }, []);

    const scrollDown = useCallback(() => {
        requestAnimationFrame(() => {
            if (screenRef.current) {
                screenRef.current.scrollTop = screenRef.current.scrollHeight;
            }
        });
    }, []);

    const addLine = useCallback(
        (html: string) => {
            const id = newId();

            setHistory((current) => [
                ...current,
                {
                    id,
                    type: "line",
                    html,
                },
            ]);

            scrollDown();
            return id;
        },
        [newId, scrollDown]
    );

    const addBox = useCallback(
        (html: string) => {
            const id = newId();

            setHistory((current) => [
                ...current,
                {
                    id,
                    type: "box",
                    html,
                },
            ]);

            scrollDown();
            return id;
        },
        [newId, scrollDown]
    );

    const updateLine = useCallback(
        (id: number, html: string) => {
            setHistory((current) =>
                current.map((line) =>
                    line.id === id ? { ...line, html } : line
                )
            );

            scrollDown();
        },
        [scrollDown]
    );

    const promptHtml = useCallback(() => {
        return `
            <span class="text-primary">${escapeHtml(USER)}</span>
            <span class="text-muted-foreground/50">${escapeHtml(CWD)}</span>
            <span class="text-primary"> $ </span>
        `;
    }, []);

    const typeInto = useCallback(
        async (id: number, text: string, speed = 8) => {
            let output = "";

            for (const character of text) {
                if (abortRef.current || !mountedRef.current) return;

                output += character;

                updateLine(
                    id,
                    `${escapeHtml(
                        output
                    )}<span class="inline-block w-[7px] h-[14px] ml-px align-[-2px] bg-primary terminal-cursor"></span>`
                );

                await sleep(speed);
            }

            updateLine(id, escapeHtml(output));
        },
        [updateLine]
    );

    const COMMANDS: Record<string, CommandFn> = useMemo(
        () => ({
            help: () => `
                <div class="space-y-1.5">
                    <div class="mb-3 text-primary">Available commands</div>

                    <div><span class="text-foreground">help</span><span class="text-muted-foreground"> - show available commands</span></div>
                    <div><span class="text-foreground">whoami</span><span class="text-muted-foreground"> - developer profile</span></div>
                    <div><span class="text-foreground">cat bio.txt</span><span class="text-muted-foreground"> - short introduction</span></div>
                    <div><span class="text-foreground">ls</span><span class="text-muted-foreground"> - explore portfolio files</span></div>
                    <div><span class="text-foreground">cat projects.md</span><span class="text-muted-foreground"> - selected projects</span></div>
                    <div><span class="text-foreground">cat movieflex.md</span><span class="text-muted-foreground"> - inspect MovieFlex</span></div>
                    <div><span class="text-foreground">stack</span><span class="text-muted-foreground"> - technologies I work with</span></div>
                    <div><span class="text-foreground">git log</span><span class="text-muted-foreground"> - selected development milestones</span></div>
                    <div><span class="text-foreground">cat principles.md</span><span class="text-muted-foreground"> - how I approach development</span></div>
                    <div><span class="text-foreground">contact</span><span class="text-muted-foreground"> - contact information</span></div>
                    <div><span class="text-foreground">contact --open</span><span class="text-muted-foreground"> - open email contact</span></div>
                    <div><span class="text-foreground">clear</span><span class="text-muted-foreground"> - clear terminal output</span></div>
                </div>
            `,

            whoami: () => `
                <div class="space-y-1.5">
                    <div>
                        <span class="text-primary">cyril</span>
                        <span class="text-muted-foreground"> - software & web developer.</span>
                    </div>
                    <div class="text-muted-foreground">
                        I build responsive web applications, APIs, and practical digital products.
                    </div>
                </div>
            `,

            "cat bio.txt": () => `
                <div class="space-y-3">
                    <div>
                        <span class="text-primary">Cyril Esin</span>
                        <span class="text-muted-foreground"> - software & web developer</span>
                    </div>

                    <div class="text-muted-foreground">
                        I enjoy turning ideas into useful web experiences with clean interfaces,
                        maintainable code, and thoughtful user flows.
                    </div>

                    <div>
                        <span class="text-primary">Focus:</span>
                        <span class="text-muted-foreground">
                            frontend development, backend APIs, databases, and product-focused web applications.
                        </span>
                    </div>

                    <div>
                        <span class="text-primary">Currently:</span>
                        <span class="text-muted-foreground">
                            building projects, improving my engineering skills, and teaching web development.
                        </span>
                    </div>
                </div>
            `,

            ls: () => `
                <div class="grid gap-1 sm:grid-cols-2">
                    <span class="text-primary">bio.txt</span>
                    <span class="text-muted-foreground">projects.md</span>
                    <span class="text-muted-foreground">movieflex.md</span>
                    <span class="text-muted-foreground">stack.txt</span>
                    <span class="text-muted-foreground">principles.md</span>
                    <span class="text-muted-foreground">contact.txt</span>
                </div>
            `,

            "cat projects.md": () => `
                <div class="space-y-4">
                    <div>
                        <span class="text-primary">01</span>
                        <span class="ml-3 text-foreground">Zyloo</span>
                        <div class="ml-7 mt-1 text-muted-foreground">
                            E-commerce platform with product discovery, cart, checkout,
                            authentication, payments, orders, and media management.
                        </div>
                    </div>

                    <div>
                        <span class="text-primary">02</span>
                        <span class="ml-3 text-foreground">AttendX</span>
                        <div class="ml-7 mt-1 text-muted-foreground">
                            QR-based attendance application designed to simplify attendance
                            tracking and management.
                        </div>
                    </div>

                    <div>
                        <span class="text-primary">03</span>
                        <span class="ml-3 text-foreground">MovieFlex</span>
                        <div class="ml-7 mt-1 text-muted-foreground">
                            Movie discovery experience with search, watchlists, movie details,
                            cast and crew information, production details, and behind-the-scenes content.
                        </div>
                    </div>

                    <div>
                        <span class="text-primary">04</span>
                        <span class="ml-3 text-foreground">Vibe Stream</span>
                        <div class="ml-7 mt-1 text-muted-foreground">
                            Music-focused web application for discovering, recommending,
                            and downloading sounds.
                        </div>
                    </div>
                </div>
            `,

            "cat movieflex.md": () => `
                <div class="space-y-3">
                    <div>
                        <span class="text-primary">MovieFlex</span>
                        <span class="text-muted-foreground"> - movie discovery web application</span>
                    </div>

                    <div class="text-muted-foreground">
                        Browse and search for films, explore detailed movie information,
                        and save favorites to a personal watchlist.
                    </div>

                    <div>
                        <span class="text-primary">Explore:</span>
                        <span class="text-muted-foreground">
                            cast & crew, movie budgets, production details, and behind-the-scenes content.
                        </span>
                    </div>

                    <div>
                        <span class="text-primary">Goal:</span>
                        <span class="text-muted-foreground">
                            make movie discovery feel informative, simple, and enjoyable.
                        </span>
                    </div>
                </div>
            `,

            stack: () => `
                <div class="space-y-3">
                    <div>
                        <span class="text-primary">frontend</span>
                        <span class="text-muted-foreground"> - React / TypeScript / Next.js / JavaScript</span>
                    </div>
                    <div>
                        <span class="text-primary">backend</span>
                        <span class="text-muted-foreground"> - Node.js / Express / PostgreSQL / Prisma</span>
                    </div>
                    <div>
                        <span class="text-primary">workflow</span>
                        <span class="text-muted-foreground"> - Git / Docker / Vercel / Cloudinary</span>
                    </div>
                </div>
            `,

            "git log": () => `
                <div class="space-y-3">
                    <div>
                        <span class="text-primary">milestone</span>
                        <span class="text-muted-foreground"> - portfolio terminal experience</span>
                    </div>
                    <div>
                        <span class="text-primary">milestone</span>
                        <span class="text-muted-foreground"> - e-commerce workflow and payment integration</span>
                    </div>
                    <div>
                        <span class="text-primary">milestone</span>
                        <span class="text-muted-foreground"> - authentication, APIs, and database workflows</span>
                    </div>
                    <div>
                        <span class="text-primary">milestone</span>
                        <span class="text-muted-foreground"> - reusable frontend components and responsive interfaces</span>
                    </div>
                    <div class="pt-1 text-muted-foreground/60">
                        This is a portfolio summary, not a live repository history.
                    </div>
                </div>
            `,

            "cat principles.md": async () => {
                const boxId = addBox("");

                await typeInto(
                    boxId,
                    `"Build for people, not just for the codebase."
Keep interfaces clear.
Prefer simple solutions when they solve the problem.
Learn from every project.
Ship, review, improve.`,
                    10
                );

                if (abortRef.current) return null;

                await sleep(150);

                addLine(`
                    <span class="text-primary">></span>
                    <b>Approach:</b>
                    <span class="text-muted-foreground">
                        understand the problem, build deliberately, then improve from feedback.
                    </span>
                `);

                await sleep(150);

                addLine(`
                    <span class="text-primary">></span>
                    <b>Priority:</b>
                    <span class="text-muted-foreground">
                        useful products, clear UI, maintainable code, and continuous learning.
                    </span>
                `);

                return null;
            },

            contact: () => `
                <div class="space-y-1.5">
                    <div>
                        <span class="text-muted-foreground">email</span>
                        <span class="ml-4 text-primary">${EMAIL}</span>
                    </div>
                    <div>
                        <span class="text-muted-foreground">github</span>
                        <span class="ml-3 text-primary">${GITHUB}</span>
                    </div>
                    <div>
                        <span class="text-muted-foreground">linkedin</span>
                        <span class="ml-1 text-primary">${LINKEDIN}</span>
                    </div>
                </div>
            `,

            "contact --open": () => {
                if (typeof window !== "undefined") {
                    window.location.href = `mailto:${EMAIL}`;
                }

                return `
                    <span class="text-primary">Opening email contact...</span>
                `;
            },

            clear: () => {
                setHistory([]);
                return null;
            },
        }),
        [addBox, addLine, typeInto]
    );

    const runCommand = useCallback(
        async (command: string, echo = true) => {
            const trimmed = command.trim();

            abortRef.current = false;

            if (echo && trimmed) {
                addLine(`${promptHtml()} ${escapeHtml(trimmed)}`);
            }

            if (!trimmed) return;

            const normalizedCommand = trimmed.toLowerCase();

            if (normalizedCommand === "clear") {
                setHistory([]);
                return;
            }

            const commandFn = COMMANDS[normalizedCommand];

            if (!commandFn) {
                addLine(`
                    <span class="text-destructive">command not found:</span>
                    ${escapeHtml(trimmed)}
                    <span class="text-muted-foreground"> - try "help"</span>
                `);
                return;
            }

            try {
                const result = await commandFn();

                if (result) addLine(result);
            } catch (error) {
                console.error(error);

                addLine(`
                    <span class="text-destructive">Command failed.</span>
                    <span class="text-muted-foreground">
                        Something went wrong while executing "${escapeHtml(trimmed)}".
                    </span>
                `);
            }
        },
        [COMMANDS, addLine, promptHtml]
    );

    useEffect(() => {
        mountedRef.current = true;

        const boot = async () => {
            const bootId = addLine("");

            await typeInto(
                bootId,
                "portfolio-shell // session initiated",
                12
            );

            if (!mountedRef.current) return;

            await sleep(180);

            addLine(`
                <span class="text-muted-foreground">User:</span>
                ${escapeHtml(USER)}
            `);

            addLine(`
                <span class="text-muted-foreground">Environment:</span>
                portfolio mode
            `);

            addLine(`
                <span class="text-muted-foreground">Status:</span>
                <span class="text-primary">ready</span>
            `);

            await sleep(180);

            addLine(`
                <span class="text-muted-foreground">
                    Type
                </span>
                <span class="text-primary"> help </span>
                <span class="text-muted-foreground">
                    to explore the portfolio.
                </span>
            `);

            if (mountedRef.current) setBusy(false);
        };

        boot();

        return () => {
            mountedRef.current = false;
            abortRef.current = true;
        };
    }, [addLine, typeInto]);



    const execute = async (command: string) => {
        if (busy) return;

        setBusy(true);
        setHistoryIndex(-1);

        const trimmed = command.trim();

        if (trimmed) {
            setCommandHistory((current) => [
                ...current.filter((item) => item !== trimmed),
                trimmed,
            ]);
        }

        setInput("");
        await runCommand(command);

        if (mountedRef.current) setBusy(false);
    };

    const handleKeyDown = async (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "c"
        ) {
            event.preventDefault();

            abortRef.current = true;
            setInput("");
            setHistoryIndex(-1);
            setBusy(false);

            addLine(`<span class="text-muted-foreground">^C</span>`);
            return;
        }

        if (event.key === "Enter") {
            event.preventDefault();

            if (busy) return;

            await execute(input);
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            if (!commandHistory.length) return;

            const nextIndex =
                historyIndex === -1
                    ? commandHistory.length - 1
                    : Math.max(historyIndex - 1, 0);

            setHistoryIndex(nextIndex);
            setInput(commandHistory[nextIndex] ?? "");
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();

            if (historyIndex === -1) return;

            const nextIndex = historyIndex + 1;

            if (nextIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                setInput("");
            } else {
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex] ?? "");
            }

            return;
        }

        if (event.key === "Escape") {
            setInput("");
            setHistoryIndex(-1);
        }
    };

    const tabs = [
        { label: "help", command: "help" },
        { label: "projects", command: "cat projects.md" },
        { label: "stack", command: "stack" },
        { label: "principles", command: "cat principles.md" },
        { label: "contact", command: "contact" },
    ];

    const quickRuns = [
        "cat bio.txt",
        "cat movieflex.md",
        "git log",
        "contact",
    ];

    return (
        <section
            id="terminal"
            className="mt-12 min-h-full sm:mt-16"
        >
            <div className="mb-6 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-3">
                    <p className="text-lg font-bold tracking-widest sm:text-xl">
                        DEVELOPER TERMINAL
                    </p>

                    <span className="inline-block h-0.5 w-7 rounded-full bg-primary" />
                </div>

                <p className="text-xs tracking-wide text-foreground/65 sm:text-sm">
                    Explore the developer behind the projects.
                </p>
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-border bg-secondary/20 font-mono text-xs sm:text-[13px]">
                {/* Terminal header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-3 py-3 sm:px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                            <span className="h-2.5 w-2.5 rounded-full bg-secondary-foreground" />
                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        </div>

                        <span className="hidden text-[10px] font-semibold tracking-[0.08em] text-primary sm:inline sm:text-xs">
                            cyril@portfolio
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground sm:gap-3 sm:text-[10px]">
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            session ready
                        </span>

                        <span className="hidden sm:inline">
                            {USER}
                        </span>
                    </div>
                </div>

                {/* Terminal tabs */}
                <div className="flex flex-wrap items-center gap-1.5 border-b border-border px-3 py-2 sm:px-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.label}
                            type="button"
                            disabled={busy}
                            onClick={() => execute(tab.command)}
                            className="rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground transition-colors duration-150 hover:border-primary/30 hover:bg-primary/5 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 sm:px-2.5 sm:text-[11px]"
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Terminal screen */}
                <div
                    ref={screenRef}
                    onClick={() => inputRef.current?.focus()}
                    className="h-[46vh] min-h-[240px] overflow-x-auto overflow-y-auto px-3 py-4 leading-[1.65] sm:h-[56vh] sm:min-h-[340px] sm:px-5 scrollbar-none"
                >
                    {history.map((line) => (
                        <div
                            key={line.id}
                            className={
                                line.type === "box"
                                    ? "my-1 whitespace-pre-wrap rounded-lg border border-primary/20 px-3 py-2 text-primary sm:px-4 sm:py-3"
                                    : "break-words"
                            }
                            dangerouslySetInnerHTML={{
                                __html: line.html,
                            }}
                        />
                    ))}

                    {/* Command input */}
                    <div className="mt-1 flex min-w-0 items-center gap-2">
                        <span className="shrink-0 text-primary">
                            {USER}
                        </span>

                        <span className="hidden shrink-0 text-muted-foreground/50 sm:inline">
                            {CWD}
                        </span>

                        <span className="shrink-0 text-primary">
                            $
                        </span>

                        <input
                            ref={inputRef}
                            value={input}
                            disabled={busy}
                            autoComplete="off"
                            autoCapitalize="off"
                            spellCheck={false}
                            aria-label="Terminal command input"
                            placeholder={
                                busy
                                    ? "initializing..."
                                    : 'type "help" to begin'
                            }
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>
                            ) => {
                                setInput(event.target.value);
                                setHistoryIndex(-1);
                            }}
                            onKeyDown={handleKeyDown}
                            className="min-w-0 flex-1 border-none bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground/30 caret-primary disabled:cursor-not-allowed disabled:opacity-50 sm:text-[13px]"
                        />

                        {busy && (
                            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
                        )}
                    </div>
                </div>

                {/* Quick commands */}
                <div className="flex flex-col gap-3 border-t border-border px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 text-[10px] text-muted-foreground sm:text-[11px]">
                            Quick run:
                        </span>

                        {quickRuns.map((command) => (
                            <button
                                key={command}
                                type="button"
                                disabled={busy}
                                onClick={() => execute(command)}
                                className="rounded-md border border-primary/15 bg-primary/5 px-2 py-1 text-[10px] text-primary transition-colors hover:border-primary/30 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40 sm:px-2.5 sm:text-[11px]"
                            >
                                {command}
                            </button>
                        ))}
                    </div>

                    <div className="text-[9px] text-muted-foreground/60 sm:text-[11px]">
                        Arrow keys history / Enter execute / Ctrl+C stop
                    </div>
                </div>
            </div>
        </section>
    );
}
