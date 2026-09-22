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
const CWD = "~/portfolio (git:main)";

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
                    line.id === id
                        ? {
                            ...line,
                            html,
                        }
                        : line
                )
            );

            scrollDown();
        },
        [scrollDown]
    );

    const promptHtml = useCallback(() => {
        return `
      <span class="text-primary">${escapeHtml(USER)}</span>
      <span class="text-muted-foreground/60">${escapeHtml(CWD)}</span>
      <span class="text-primary"> $ </span>
    `;
    }, []);

    const typeInto = useCallback(
        async (id: number, text: string, speed = 10) => {
            let output = "";

            for (const character of text) {
                if (abortRef.current || !mountedRef.current) {
                    return;
                }

                output += character;

                updateLine(
                    id,
                    `${escapeHtml(
                        output
                    )}<span class="inline-block w-[7px] h-[14px] ml-px align-[-2px] bg-primary animate-[ct-blink_0.9s_steps(1)_infinite]"></span>`
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
        <div class="space-y-1">
          <div class="mb-2 text-primary">Available commands:</div>

          <div>
            <span class="text-foreground">help</span>
            <span class="text-muted-foreground"> — show this list</span>
          </div>

          <div>
            <span class="text-foreground">whoami</span>
            <span class="text-muted-foreground"> — show developer information</span>
          </div>

          <div>
            <span class="text-foreground">cat bio.txt</span>
            <span class="text-muted-foreground"> — read short bio</span>
          </div>

          <div>
            <span class="text-foreground">cat /etc/engineer.manifesto</span>
            <span class="text-muted-foreground"> — read engineering philosophy</span>
          </div>

          <div>
            <span class="text-foreground">git log</span>
            <span class="text-muted-foreground"> — show recent commits</span>
          </div>

          <div>
            <span class="text-foreground">tail -f</span>
            <span class="text-muted-foreground"> — stream activity logs</span>
          </div>

          <div>
            <span class="text-foreground">npm test</span>
            <span class="text-muted-foreground"> — run the test suite</span>
          </div>

          <div>
            <span class="text-foreground">docker ps</span>
            <span class="text-muted-foreground"> — list containers</span>
          </div>

          <div>
            <span class="text-foreground">stack-trace</span>
            <span class="text-muted-foreground"> — display a fun stack trace</span>
          </div>

          <div>
            <span class="text-foreground">contact --open</span>
            <span class="text-muted-foreground"> — open contact channels</span>
          </div>

          <div>
            <span class="text-foreground">ls</span>
            <span class="text-muted-foreground"> — list portfolio files</span>
          </div>

          <div>
            <span class="text-foreground">pwd</span>
            <span class="text-muted-foreground"> — show current directory</span>
          </div>

          <div>
            <span class="text-foreground">clear</span>
            <span class="text-muted-foreground"> — clear the terminal</span>
          </div>
        </div>
      `,

            whoami: () => `
        <span class="text-primary">cyril</span>
        <span class="text-muted-foreground">
          — software & web developer.
        </span>
      `,

            "cat bio.txt": () => `
        <div class="space-y-2">
          <div>
            <span class="text-primary">Cyril</span>
            <span class="text-muted-foreground">
              — software & web developer.
            </span>
          </div>

          <div class="text-muted-foreground">
            I build thoughtful web experiences with modern frontend
            technologies, backend systems, APIs, and clean architecture.
          </div>

          <div>
            <span class="text-primary">Focus:</span>
            <span class="text-muted-foreground">
              reliable software, polished interfaces, useful products.
            </span>
          </div>
        </div>
      `,

            bio: () => `
        <span class="text-primary">Cyril</span>
        <span class="text-muted-foreground">
          — software & web developer focused on building useful digital products.
        </span>
      `,

            ls: () => `
        <span class="text-primary">bio.txt</span>
        <span class="text-muted-foreground">   projects/</span>
        <span class="text-muted-foreground">   experience.md</span>
        <span class="text-muted-foreground">   contact.txt</span>
        <span class="text-muted-foreground">   README.md</span>
      `,

            pwd: () => `
        <span class="text-muted-foreground">
          /home/cyril/portfolio
        </span>
      `,

            "cat /etc/engineer.manifesto": async () => {
                const boxId = addBox("");

                await typeInto(
                    boxId,
                    `"Simplicity is a prerequisite for reliability."
Think before you write code.
Code is cheap. Architecture is leverage.
We don't just ship syntax; we build software
that solves real problems and scales with purpose.`,
                    7
                );

                if (abortRef.current) {
                    return null;
                }

                await sleep(150);

                addLine(`
          <span class="text-primary">›</span>
          <b>Core Philosophy:</b>
          Write clean code. Automate the boring parts. Ship with purpose.
        `);

                await sleep(150);

                addLine(`
          <span class="text-primary">›</span>
          <b>Current Focus:</b>
          Modern web applications, APIs, backend systems, and polished UI.
        `);

                await sleep(150);

                addLine(`
          <span class="text-primary">›</span>
          <b>System Status:</b>
          <span class="text-primary animate-[ct-glowPulse_2.2s_ease-in-out_infinite]">
            READY FOR DEPLOYMENT
          </span>
        `);

                return null;
            },

            "git log": () => `
        <div class="space-y-4">
          <div>
            <span class="text-[#f2c94c]">commit 8f3a1c2</span>
            <span class="text-muted-foreground">
              (HEAD -&gt; main)
            </span>
            <br />

            <span class="text-muted-foreground">
              Author:
            </span>
            Cyril
            <br />

            <span class="ml-4">
              feat: refine interactive portfolio terminal
            </span>
          </div>

          <div>
            <span class="text-[#f2c94c]">commit 5b0e9d4</span>
            <br />

            <span class="text-muted-foreground">
              Author:
            </span>
            Cyril
            <br />

            <span class="ml-4">
              feat: improve project showcase experience
            </span>
          </div>

          <div>
            <span class="text-[#f2c94c]">commit 2a71ffe</span>
            <br />

            <span class="text-muted-foreground">
              Author:
            </span>
            Cyril
            <br />

            <span class="ml-4">
              refactor: simplify application architecture
            </span>
          </div>
        </div>
      `,

            "tail -f": async () => {
                addLine(`
          <span class="text-muted-foreground">
            Streaming activity.log — press Ctrl+C to stop
          </span>
        `);

                const logs = [
                    "[12:03:11] INFO  api      request completed in 42ms",
                    '[12:03:12] INFO  worker   job "portfolio-build" queued',
                    "[12:03:13] WARN  cache    response latency spike (118ms)",
                    '[12:03:14] INFO  worker   job "portfolio-build" completed',
                    "[12:03:15] INFO  api      health check ok",
                ];

                for (const log of logs) {
                    if (abortRef.current) {
                        addLine(`
              <span class="text-[#f2c94c]">^C</span>
              <span class="text-muted-foreground">
                stream terminated
              </span>
            `);

                        return null;
                    }

                    await sleep(320);

                    const className = log.includes("WARN")
                        ? "text-[#f2c94c]"
                        : "text-muted-foreground";

                    addLine(
                        `<span class="${className}">${escapeHtml(log)}</span>`
                    );
                }

                return null;
            },

            "npm test": async () => {
                addLine(`
          <span class="text-muted-foreground">
            &gt; portfolio@1.0.0 test
          </span>
        `);

                addLine(`
          <span class="text-muted-foreground">
            &gt; vitest run
          </span>
        `);

                await sleep(350);

                const suites = [
                    "components/ProjectCard.test.tsx",
                    "components/Terminal.test.tsx",
                    "lib/utils.test.ts",
                ];

                for (const suite of suites) {
                    if (abortRef.current) {
                        return null;
                    }

                    await sleep(280);

                    addLine(`
            <span class="text-primary">✓</span>
            ${escapeHtml(suite)}
            <span class="text-muted-foreground">
              passed
            </span>
          `);
                }

                await sleep(250);

                addLine(`
          <span class="text-primary">Test Files</span>
          <span class="text-muted-foreground">
            3 passed (3)
          </span>

          <br />

          <span class="text-primary">Tests</span>
          <span class="text-muted-foreground">
            22 passed (22)
          </span>

          <br />

          <span class="text-primary">Duration</span>
          <span class="text-muted-foreground">
            1.84s
          </span>
        `);

                return null;
            },

            "docker ps": () => `
        <div class="overflow-x-auto">
          <pre class="text-[11px] leading-6 text-muted-foreground">
CONTAINER ID   IMAGE              STATUS
a1b2c3d4e5f6   portfolio-api      Up 3 hours
b2c3d4e5f6a1   postgres:16        Up 3 hours
c3d4e5f6a1b2   redis:7-alpine     Up 3 hours
          </pre>
        </div>
      `,

            "stack-trace": () => `
        <span class="text-[#ff6b6b]">
          Error: MotivationNotFoundException
        </span>

        <br />

        <span class="text-muted-foreground">
          at Monday.morning (life.js:1:1)
        </span>

        <br />

        <span class="text-muted-foreground">
          at Coffee.brew (kitchen.js:9:4)
        </span>

        <br />

        <span class="text-muted-foreground">
          at Engineer.resume (life.js:2:1)
        </span>

        <br />

        <span class="text-primary">
          Resolved by: caffeine injection ✓
        </span>
      `,

            "contact --open": () => {
                if (typeof window !== "undefined") {
                    window.open(
                        "mailto:cyrilesin214@gmail.com",
                        "_blank",
                        "noopener,noreferrer"
                    );

                    window.open(
                        "https://github.com/Cyril9t",
                        "_blank",
                        "noopener,noreferrer"
                    );

                    window.open(
                        "https://www.linkedin.com/in/cyril-esin-6a9a3934b/",
                        "_blank",
                        "noopener,noreferrer"
                    )
                }

                return `
          <div class="space-y-1">
            <div>
              <span class="text-muted-foreground">
                email
              </span>

              <span class="ml-4 text-primary">
                cyrilesin214@gmail.com
              </span>
            </div>

            <div>
              <span class="text-muted-foreground">
                github
              </span>

              <span class="ml-3 text-primary">
               https://github.com/Cyril9t
              </span>
            </div>

            <div>
              <span class="text-muted-foreground">
                linkedin
              </span>

              <span class="ml-1 text-primary">
               https://www.linkedin.com/in/cyril-esin-6a9a3934b/
              </span>
            </div>
          </div>
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
                addLine(
                    `${promptHtml()} ${escapeHtml(trimmed)}`
                );
            }

            if (!trimmed) {
                return;
            }

            const normalizedCommand = trimmed.toLowerCase();

            if (normalizedCommand === "clear") {
                setHistory([]);
                return;
            }

            const commandFn = COMMANDS[normalizedCommand];

            if (!commandFn) {
                addLine(`
          <span class="text-[#ff6b6b]">
            command not found:
          </span>

          ${escapeHtml(trimmed)}

          <span class="text-muted-foreground">
            — try "help"
          </span>
        `);

                return;
            }

            try {
                const result = await commandFn();

                if (result) {
                    addLine(result);
                }
            } catch (error) {
                console.error(error);

                addLine(`
          <span class="text-[#ff6b6b]">
            Command failed.
          </span>

          <span class="text-muted-foreground">
            Something went wrong while executing
            "${escapeHtml(trimmed)}".
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
                "CyrilOS Kernel 6.11.2-production-stable [ssh 5.9] // Session initiated",
                5
            );

            if (!mountedRef.current) {
                return;
            }

            await sleep(180);

            addLine(`
        <span class="text-muted-foreground">
          User:
        </span>

        ${escapeHtml(USER)}
      `);

            addLine(`
        <span class="text-muted-foreground">
          Environment:
        </span>

        Node.js v20.12.2 LTS
      `);

            addLine("");

            await runCommand(
                "cat /etc/engineer.manifesto",
                false
            );

            if (mountedRef.current) {
                setBusy(false);
            }
        };

        boot();

        return () => {
            mountedRef.current = false;
            abortRef.current = true;
        };
    }, [addLine, runCommand, typeInto]);

    useEffect(() => {
        if (!busy) {
            inputRef.current?.focus();
        }
    }, [busy, history]);

    const execute = async (command: string) => {
        if (busy) {
            return;
        }

        setBusy(true);
        setHistoryIndex(-1);

        const trimmed = command.trim();

        if (trimmed) {
            setCommandHistory((current) => [
                ...current.filter(
                    (item) => item !== trimmed
                ),
                trimmed,
            ]);
        }

        setInput("");

        await runCommand(command);

        if (mountedRef.current) {
            setBusy(false);
        }
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

            addLine(
                `<span class="text-[#f2c94c]">^C</span>`
            );

            return;
        }

        if (event.key === "Enter") {
            event.preventDefault();

            if (busy) {
                return;
            }

            await execute(input);
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            if (!commandHistory.length) {
                return;
            }

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

            if (historyIndex === -1) {
                return;
            }

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
        {
            label: "git log",
            command: "git log",
        },
        {
            label: "manifesto",
            command: "cat /etc/engineer.manifesto",
        },
        {
            label: "stack-trace",
            command: "stack-trace",
        },
        {
            label: "docker ps",
            command: "docker ps",
        },
        {
            label: "clear",
            command: "clear",
        },
    ];

    const quickRuns = [
        "git log",
        "tail -f",
        "npm test",
        "cat bio.txt",
        "contact --open",
    ];

    return (

        <section
            id="terminal"
            className="mt-15 min-h-full bg-background"
        >
            <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-3">
                    <p className="text-xl font-bold tracking-widest">
                        DEVELOPER TERMINAL
                    </p>

                    <span className="inline-block h-0.5 w-7 rounded-full bg-primary" />
                </div>

                <p className="text-sm tracking-wide text-foreground/65">
                    Interactive shell & developer playground.
                </p>
            </div>

            <div
                className="
      w-full
      overflow-hidden
      rounded-xl
      border
      border-border
      bg-secondary/20
      font-mono
      text-[13px]
      shadow-[0_20px_80px_rgba(0,0,0,0.22)]
      animate-ct-flicker
    "
            >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                        </div>

                        <span className="hidden text-xs font-semibold tracking-[0.08em] text-chart-2 sm:inline">
                            DEVELOPER TERMINAL
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground sm:text-[11px]">
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                            node v20.12.2
                        </span>

                        <span className="hidden sm:inline">
                            {USER}
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 border-b border-border px-4 py-2">
                    {tabs.map((tab) => {
                        const isActive =
                            tab.command === "cat /etc/engineer.manifesto";

                        return (
                            <button
                                key={tab.label}
                                type="button"
                                disabled={busy}
                                onClick={() => execute(tab.command)}
                                className={`
              rounded-md
              border
              px-2.5
              py-1
              text-[11px]
              transition-all
              duration-150
              disabled:cursor-not-allowed
              disabled:opacity-40
              ${isActive
                                        ? "border-primary/30 bg-primary/10 text-primary"
                                        : "border-border text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-foreground"
                                    }
            `}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Terminal Screen */}
                <div
                    ref={screenRef}
                    onClick={() => inputRef.current?.focus()}
                    className="
                            h-[56vh]
                            min-h-85
                            overflow-x-auto
                            overflow-y-auto
                            px-4
                            py-5
                            leading-[1.65]
                            scrollbar-none
                            sm:px-5
                        "
                >
                    {history.map((line) => (
                        <div
                            key={line.id}
                            className={` animate-ct-fade ${line.type === "box"
                                ? "my-1 whitespace-pre-wrap rounded-lg border border-primary/20 bg-primary/[0.035] px-4 py-3 text-primary"
                                : "wrap-break-words "
                                }`}
                            dangerouslySetInnerHTML={{
                                __html: line.html,
                            }}

                        />
                    ))}

                    {/* Prompt */}
                    <div className="mt-1 flex min-w-0 items-center gap-2">
                        <span className="shrink-0 text-primary">
                            {USER}
                        </span>

                        <span className="hidden shrink-0 text-muted-foreground/60 sm:inline">
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
                            className="
            min-w-0
            flex-1
            border-none
            bg-transparent
            font-mono
            text-foreground
            outline-none
            placeholder:text-muted-foreground/30
            caret-primary
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                        />

                        {busy && (
                            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 text-[11px] text-muted-foreground">
                            Quick run:
                        </span>

                        {quickRuns.map((command) => (
                            <button
                                key={command}
                                type="button"
                                disabled={busy}
                                onClick={() => execute(command)}
                                className="
              rounded-md
              border
              border-primary/15
              bg-primary/5
              px-2.5
              py-1
              text-[11px]
              text-primary
              transition-all
              hover:border-primary/30
              hover:bg-primary/10
              active:scale-[0.97]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
                            >
                                {command}
                            </button>
                        ))}
                    </div>

                    <div className="text-[10px] text-muted-foreground/60 sm:text-[11px]">
                        ↑ ↓ history · Enter execute · Ctrl+C stop
                    </div>
                </div>
            </div>
        </section>


    );
}