"use client"
import { useState, useRef, useEffect, useCallback, type KeyboardEvent, type ChangeEvent } from "react";

const USER = "cyril@-cyril9t";
const CWD = "~/portfolio (git:main)";

type LineType = "line" | "box";
interface HistoryLine {
    id: number;
    type: LineType;
    html: string;
}
type CommandFn = () => string | null | Promise<string | null | void>;

function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

export default function DeveloperTerminal() {
    const [history, setHistory] = useState<HistoryLine[]>([]);
    const [input, setInput] = useState("");
    const [busy, setBusy] = useState(true);

    const idRef = useRef(0);
    const screenRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const newId = () => (idRef.current += 1);

    const scrollDown = useCallback(() => {
        requestAnimationFrame(() => {
            if (screenRef.current) screenRef.current.scrollTop = screenRef.current.scrollHeight;
        });
    }, []);

    const addLine = useCallback(
        (html: string) => {
            const id = newId();
            setHistory((h) => [...h, { id, type: "line", html }]);
            scrollDown();
            return id;
        },
        [scrollDown]
    );

    const addBox = useCallback(
        (html: string) => {
            const id = newId();
            setHistory((h) => [...h, { id, type: "box", html }]);
            scrollDown();
            return id;
        },
        [scrollDown]
    );

    const updateLine = useCallback(
        (id: number, html: string) => {
            setHistory((h) => h.map((l) => (l.id === id ? { ...l, html } : l)));
            scrollDown();
        },
        [scrollDown]
    );

    const promptHtml = () =>
        `<span class="text-primary">${USER}</span> <span class="text-[#f2c94c]">${CWD}</span> $ `;

    async function typeInto(id: number, text: string, speed = 14) {
        let acc = "";
        for (let i = 0; i < text.length; i++) {
            acc += text[i];
            updateLine(
                id,
                escapeHtml(acc) +
                '<span class="inline-block w-[7px] h-[13px]  ml-px align-[-2px] animate-[ct-blink_0.9s_steps(1)_infinite]"></span>'
            );
            await sleep(speed);
        }
        updateLine(id, escapeHtml(acc));
    }

    const COMMANDS: Record<string, CommandFn> = {
        help: () => `<span class="text-secondary">Available commands:</span>
  help                          show this list
  cat /etc/engineer.manifesto   print the engineer's manifesto
  cat bio.txt                   short bio
  git log                       recent commits
  tail -f                       tail the live activity log
  npm test                      run the test suite
  docker ps                     list running containers
  stack-trace                   a lighthearted stack trace
  whoami                        who's typing this
  contact --open                open contact info
  clear                         clear the screen`,

        "cat /etc/engineer.manifesto": async () => {
            const boxId = addBox("");
            await typeInto(
                boxId,
                '"Simplicity is a prerequisite for reliability."\n\nCode is cheap. Architecture is leverage.\nWe don\'t just ship syntax; we engineer fault-tolerant\ndigital infrastructure that scales silently under load.',
                8
            );
            await sleep(150);
            addLine(
                `<span class="text-primary">›</span> <b>Core Philosophy:</b> Write clean code. Automate the boring parts. Ship relentlessly.`
            );
            await sleep(200);
            addLine(
                `<span class="text-primary">›</span> <b>Current Focus:</b> Distributed systems, high-concurrency APIs, and fluid UI choreography.`
            );
            await sleep(200);
            addLine(
                `<span class="text-primary">›</span> <b>System Status:</b> <span class="text-primary animate-[ct-glowPulse_2.2s_ease-in-out_infinite]">READY FOR DEPLOYMENT</span>   TTY: /dev/ttys004`
            );
            return null;
        },

        "cat bio.txt": () => `Cyril — Full-Stack Engineer.
5+ years building products end to end: React/Vue front ends,
Node/Go services, Postgres at the core. Likes small diffs,
boring infrastructure, and fast feedback loops.`,

        "git log": () => `<span class="text-[#f2c94c]">commit 8f3a1c2</span> (HEAD -&gt; main, origin/main)
Author: Cyril &lt;cyril@portfolio.dev&gt;
    fix: eliminate race condition in job queue retry logic

<span class="text-[#f2c94c]">commit 5b0e9d4</span>
Author: Cyril &lt;cyril@portfolio.dev&gt;
    feat: add optimistic UI updates to dashboard

<span class="text-[#f2c94c]">commit 2a71ffe</span>
Author: Cyril &lt;cyril@portfolio.dev&gt;
    perf: cut p95 API latency from 420ms to 110ms`,

        "tail -f": async () => {
            addLine(
                '<span class="text-[#5a7a68]">Streaming activity.log (Ctrl+C to stop, here: just press Enter)</span>'
            );
            const logs = [
                "[12:03:11] INFO  api      request completed in 42ms",
                '[12:03:12] INFO  worker   job "email-digest" queued',
                "[12:03:13] WARN  cache    redis latency spike (118ms)",
                '[12:03:14] INFO  worker   job "email-digest" completed',
                "[12:03:15] INFO  api      health check ok",
            ];
            for (const l of logs) {
                await sleep(320);
                const cls = l.includes("WARN") ? "text-[#f2c94c]" : "text-[#5a7a68]";
                addLine(`<span class="${cls}">${escapeHtml(l)}</span>`);
            }
            return null;
        },

        "npm test": async () => {
            addLine("> portfolio@1.0.0 test\n> vitest run");
            await sleep(300);
            addLine("");
            const suites = [
                "utils/formatDate.test.ts (4)",
                "components/ProjectCard.test.tsx (7)",
                "api/routes.test.ts (11)",
            ];
            for (const s of suites) {
                await sleep(280);
                addLine(` <span class="text-primary">✓</span> ${s}`);
            }
            await sleep(250);
            addLine("");
            addLine(" Test Files  3 passed (3)\n      Tests  22 passed (22)\n   Duration  1.84s");
            return null;
        },

        "docker ps": () => `CONTAINER ID   IMAGE            STATUS          PORTS
a1b2c3d4e5f6   portfolio-api    Up 3 hours      0.0.0.0:4000->4000/tcp
b2c3d4e5f6a1   postgres:16      Up 3 hours      5432/tcp
c3d4e5f6a1b2   redis:7-alpine   Up 3 hours      6379/tcp`,

        "stack-trace": () => `<span class="text-[#ff6b6b]">Error: MotivationNotFoundException</span>
    at Monday.morning (life.js:1:1)
    at Coffee.brew (kitchen.js:9:4)
    <span class="text-[#5a7a68]">at CoffeeCup.refill (kitchen.js:14:2)</span>
    at Engineer.resume (life.js:2:1)
<span class="text-primary">Resolved by: caffeine injection ✓</span>`,

        whoami: () => `cyril — full-stack engineer, currently reading your terminal history.`,

        "contact --open": () => `Opening contact channels...
  email    cyril@portfolio.dev
  github   github.com/cyril
  linkedin linkedin.com/in/cyril
<span class="text-[#5a7a68]">(this is a demo — links aren't wired up)</span>`,

        ls: () => `bio.txt   projects/   experience.md   contact.txt   README.md`,
    };

    const runCommand = useCallback(
        async (cmd: string, echo = true) => {
            const trimmed = cmd.trim();
            if (echo) addLine(promptHtml() + escapeHtml(cmd));
            if (trimmed === "") return;
            if (trimmed === "clear") {
                setHistory([]);
                return;
            }
            const fn = COMMANDS[trimmed];
            if (fn) {
                const out = await fn();
                if (out) addLine(out);
            } else {
                addLine(
                    `<span class="text-[#5a7a68]">command not found:</span> ${escapeHtml(
                        trimmed
                    )} <span class="text-[#5a7a68]">— try "help"</span>`
                );
            }
        },
        [addLine]
    );

    useEffect(() => {
        (async () => {
            const bootId = addLine("");
            await typeInto(
                bootId,
                "CyrilOS Kernel 6.11.2-production-stable [ssh 5.9] // Session initiated // User: Cyril (Full-Stack Engineer)",
                6
            );
            addLine("");
            await runCommand("cat /etc/engineer.manifesto", false);
            setBusy(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!busy) inputRef.current?.focus();
    }, [busy, history]);

    async function handleQuickRun(cmd: string) {
        if (busy) return;
        setBusy(true);
        await runCommand(cmd);
        setBusy(false);
    }

    async function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && !busy) {
            const val = input;
            setInput("");
            setBusy(true);
            await runCommand(val);
            setBusy(false);
        }
    }

    const tabs: { label: string; cmd: string; active?: boolean }[] = [
        { label: "git log", cmd: "git log" },
        { label: "manifesto", cmd: "cat /etc/engineer.manifesto", active: true },
        { label: "stack-trace", cmd: "stack-trace" },
        { label: "docker ps", cmd: "docker ps" },
        { label: "clear", cmd: "clear" },
    ];
    const quickRuns = ["git log", "tail -f", "npm test", "cat bio.txt", "contact --open"];

    return (
        <div className="bg-background min-h-full mt-15">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-10">
                <div className="flex items-center gap-3">
                    <p className="text-xl font-bold tracking-widest">DEVELOPER TERMINAL</p>
                    <span className="w-7 h-0.5 rounded-2xl bg-primary inline-block"></span>
                </div>
                <p className="text-foreground/65 text-sm tracking-wide">Interactive shell & developer playground.</p>
            </div>


            <style>{`
        @keyframes ct-fade{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}
        @keyframes ct-blink{50%{opacity:0;}}
        @keyframes ct-glowPulse{0%,100%{text-shadow:0 0 0 rgba(61,220,132,0);}50%{text-shadow:0 0 8px rgba(61,220,132,.7);}}
        @keyframes ct-flicker{0%,96%,100%{opacity:1;}97%{opacity:.86;}98%{opacity:1;}99%{opacity:.9;}}
      `}</style>

            <div className="w-full font-mono text-[13px] border border-border rounded-[10px] overflow-hidden bg-[#0b0f0c] animate-[ct-flicker_7s_linear_infinite] scrollbar-none">
                <div className="flex justify-between items-center px-4 py-2.5 border-b  flex-wrap gap-2">
                    <div className="text-chart-2 font-bold tracking-[0.08em] text-xs">
                        DEVELOPER TERMINAL <span className="text-primary font-normal ml-2">— Interactive shell &amp; developer playground.</span>
                    </div>
                    <div className="text-[#5a7a68] text-[11px] flex gap-3.5 items-center flex-wrap">
                        <span>
                            <span className="w-1.75 h-1.75 rounded-full bg-primary inline-block mr-1.5" />
                            node: v20.12.2 LTS
                        </span>
                        <span>
                            {USER}: {CWD}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center px-4 py-2 border-b border-[#1c2621] flex-wrap gap-2">
                    <div className="flex gap-1.5">
                        <i className="w-2.5 h-2.5 rounded-full inline-block bg-[#ff5f57]" />
                        <i className="w-2.5 h-2.5 rounded-full inline-block bg-[#febc2e]" />
                        <i className="w-2.5 h-2.5 rounded-full inline-block bg-[#28c840]" />
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                        {tabs.map((t) => (
                            <div
                                key={t.label}
                                onClick={() => handleQuickRun(t.cmd)}
                                className={`text-[11px] px-2.5 py-1 rounded-[5px] border cursor-pointer transition-colors duration-150 ${t.active
                                    ? "bg-[#12291d] text-primary border-[#1f4a34]"
                                    : "border-[#1c2621] text-[#5a7a68] hover:text-[#c9e8d6]"
                                    }`}
                            >
                                {t.label}
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={screenRef} className="px-5 py-[18px] h-[56vh] min-h-[340px] overflow-x-auto leading-[1.55] scrollbar-none">
                    {history.map((l) => (
                        <div
                            key={l.id}
                            className={
                                l.type === "box"
                                    ? "border border-[#1f4a34] text-primary px-4 py-3 rounded-md my-2.5 bg-[#0c1712] whitespace-pre-wrap animate-[ct-fade_0.22s_ease_both]"
                                    : "whitespace-pre-wrap break-words animate-[ct-fade_0.22s_ease_both]"
                            }
                            dangerouslySetInnerHTML={{ __html: l.html }}
                        />
                    ))}

                    <div className="flex items-center gap-2 animate-[ct-fade_0.22s_ease_both]">
                        <span className="text-primary">{USER}</span>{" "}
                        <span className="text-[#f2c94c]">{CWD}</span> $
                        <input
                            ref={inputRef}
                            value={input}
                            disabled={busy}
                            autoComplete="off"
                            spellCheck={false}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none  font-mono caret-primary disabled:opacity-60"
                        />
                    </div>
                </div>

                <div className="border-t border-border px-4 py-2.5 flex justify-between items-center flex-wrap gap-2">
                    <div className="flex gap-2 flex-wrap items-center">
                        <span className="text-[#5a7a68] text-[11px]">Quick run:</span>
                        {quickRuns.map((c) => (
                            <span
                                key={c}
                                onClick={() => handleQuickRun(c)}
                                className="text-[11px] px-2.5 py-[5px] rounded-md bg-[#12291d] text-primary border border-[#1f4a34] cursor-pointer active:scale-[0.96] transition-transform duration-100"
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                    <div className="text-[#5a7a68] text-[11px]">Click a tab/chip or type · Enter to execute</div>
                </div>
            </div>
        </div>
    );
}