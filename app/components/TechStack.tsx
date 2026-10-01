"use client";

import {
    SiCloudinary,
    SiDocker,
    SiExpress,
    SiGit,
    SiJavascript,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiReact,
    SiTypescript,
    SiVercel,
} from "@icons-pack/react-simple-icons";

const STACK = {
    Frontend: [
        {
            name: "React",
            icon: <SiReact color="#61DAFB" className="animate-[spin_10s_linear_infinite]" size={35} />,
        },
        {
            name: "TypeScript",
            icon: <SiTypescript color="#3178C6" size={35} />,
        },
        {
            name: "Next.js",
            icon: <SiNextdotjs color="#000000" size={35} />,
        },
        {
            name: "JavaScript",
            icon: <SiJavascript color="#F7DF1E" size={35} />,
        },
    ],

    Backend: [
        {
            name: "Node.js",
            icon: <SiNodedotjs color="#339933" size={35} />,
        },
        {
            name: "Express",
            icon: <SiExpress color="#000000" size={35} />,
        },
        {
            name: "PostgreSQL",
            icon: <SiPostgresql color="#4169E1" size={35} />,
        },
        {
            name: "Prisma",
            icon: <SiPrisma color="#2D3748" size={35} />,
        },
    ],

    "Workflow & Infrastructure": [
        {
            name: "Git",
            icon: <SiGit color="#F05032" size={35} />,
        },
        {
            name: "Docker",
            icon: <SiDocker color="#2496ED" size={35} />,
        },
        {
            name: "Vercel",
            icon: <SiVercel color="#000000" size={35} />,
        },
        {
            name: "Cloudinary",
            icon: <SiCloudinary color="#3448C5" size={35} />,
        },
    ],
};

function TechItem({
    name,
    icon,
    index,
}: {
    name: string;
    icon: React.ReactNode;
    index: number;
}) {
    return (
        <div
            className="tech-item group"
            style={{
                animationDelay: `${index * 140}ms`,
            }}
        >
            <div className="relative flex items-center gap-3">
                <span className="tech-indicator" />

                <div className="flex h-fit w-fit p-1 shrink-0 items-center justify-center border rounded-[9px] border-border/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/50">
                    <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                        {icon}
                    </div>
                </div>

                {/* Name */}
                <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                        {name}
                    </p>

                    <div className="mt-1 h-px w-0 bg-primary/60 transition-all duration-500 group-hover:w-full" />
                </div>
            </div>
        </div>
    );
}

function StackGroup({
    title,
    items,
    startIndex,
}: {
    title: string;
    items: typeof STACK.Frontend;
    startIndex: number;
}) {
    return (
        <div className="stack-group">

            <div className="mb-4 flex items-center gap-3">
                <span className="font-mono  uppercase tracking-[0.2em] text-primary">
                    {title}
                </span>

                <span className="h-px flex-1 bg-border" />
            </div>


            <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
                {items.map((tech, index) => (
                    <TechItem
                        key={tech.name}
                        name={tech.name}
                        icon={tech.icon}
                        index={startIndex + index}
                    />

                ))}

            </div>
        </div>
    );
}

function TechStack() {
    return (
        <section id="techStack" className="mt-24 w-full">

            <div className="mb-10">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ">
                        <div className="flex items-center gap-3">
                            <p className="text-xl font-bold tracking-widest">TECH STACK</p>
                            <span className="w-7 h-0.5 rounded-2xl bg-primary inline-block"></span>
                        </div>
                        <p className="text-foreground/65 text-sm tracking-wide"></p>
                    </div>

                    <p className="max-w-sm text-sm leading-6 text-muted-foreground/70">
                        A focused set of technologies I use to build and ship
                        web applications.
                    </p>
                </div>
            </div>


            <div className="space-y-9">
                <StackGroup
                    title="Frontend"
                    items={STACK.Frontend}
                    startIndex={0}
                />

                <StackGroup
                    title="Backend"
                    items={STACK.Backend}
                    startIndex={4}
                />

                <StackGroup
                    title="Workflow & Infrastructure"
                    items={STACK["Workflow & Infrastructure"]}
                    startIndex={8}
                />
            </div>


            <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/40">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    stack.active
                </div>

                <span className="font-mono text-[9px] text-muted-foreground/30">
                    12 technologies
                </span>
            </div>

            <style jsx>{`
                .tech-item {
                    opacity: 0;
                    transform: translateY(8px);
                    animation: revealTech 600ms
                        cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }

                .tech-indicator {
                    position: absolute;
                    left: -8px;
                    top: 50%;
                    width: 3px;
                    height: 3px;
                    border-radius: 9999px;
                    background: var(--primary);
                    opacity: 0.35;
                    transform: translateY(-50%);
                    transition:
                        height 300ms ease,
                        opacity 300ms ease;
                }

                .tech-item:hover .tech-indicator {
                    height: 18px;
                    opacity: 1;
                    
                }

                @keyframes revealTech {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .tech-item {
                        opacity: 1;
                        transform: none;
                        animation: none;
                    }

                    .tech-indicator {
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
}

export default TechStack;