import { ServerCog } from "lucide-react";
import from "../../components/originkit/ui/neon-border"
import { SiCloudinary, SiDenodeploy, SiDevbox, SiDocker, SiExpress, SiGit, SiJavascript, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPrisma, SiReact, SiTypescript, SiVercel } from "@icons-pack/react-simple-icons";
import RotatingCube from "./Cub";

const STACK = [
    {
        name: "JavaScript",
        icon: <SiJavascript color="#F7DF1E" height={25} />
    },
    {
        name: "TypeScript",
        icon: <SiTypescript color="#3178C6" height={25} />
    },
    {
        name: "React.js",
        icon: <SiReact color="#61DAFB" height={25} />
    },
    {
        name: "Next.js",
        icon: <SiNextdotjs height={25} />
    },
    {
        name: "Node.js",
        icon: <SiNodedotjs color="#339933" height={25} />
    },
]

const items = [
    {
        name: 'PostgreSQL',
        latency: '32ms',
        icon: <SiPostgresql color="#4169E1" />
    },
    {
        name: 'Prisma',
        latency: '18ms',
        icon: <SiPrisma color="#2D3748" />,
    },
    {
        name: 'Express',
        latency: '6ms',
        icon: <SiExpress />
    },
];

const tools = [
    {
        name: 'Docker',
        position: 'top-left',
        icon: <SiDocker color="#2496ED" />
    },
    {
        name: 'Cloudinary',
        position: 'bottom-left',
        icon: <SiCloudinary color="#F05032" />
    },
    {
        name: 'Git',
        position: 'top-right',
        icon: <SiGit color="#3448C5" />
    },
    {
        name: 'Vercel',
        position: 'bottom-right',
        icon: <SiVercel />
    },
];

function TechStack() {
    return (
        <div id="techStack" className="mt-20 w-full">

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-10">
                <div className="flex items-center gap-3">
                    <p className="text-xl font-bold tracking-widest">MY TECH STACK</p>
                    <span className="w-7 h-0.5 rounded-2xl bg-primary inline-block"></span>
                </div>
                <p className="text-foreground/65 text-sm tracking-wide">Tools I use to build, ship, and scale</p>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch justify-self-center w-full p-1 overflow-hidden">


                <div className="w-full flex">
                    <div className="w-full">
                        < >
                            <div className="flex flex-col h-full gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-emerald-950/20  border border-border text-primary rounded-[14px] flex items-center justify-center">
                                        <SiDevbox />
                                    </div>
                                    <div>
                                        <p className="tracking-wide font-medium">Core Stack</p>
                                        <small className="text-foreground/65 tracking-wide">Frontend & Runtime</small>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3 w-full">
                                    {STACK.map((S) => {
                                        return (
                                            <div key={S.name} className="flex flex-col items-center text-center ">
                                                <div className="w-[50%] bg-emerald-950/10 p-3 rounded-[14px] border border-border flex items-center justify-center aspect-square">
                                                    {S.icon}
                                                </div>
                                                <p className="text-[10px] text-foreground/65 tracking-wider mt-2">{S.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/40">
                                    <span className="text-xs text-foreground/65 tracking-wide">Primary daily drivers</span>
                                    <span className="flex items-center gap-1.5 text-xs font-mono text-primary">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                        {STACK.length}/5
                                    </span>
                                </div>
                            </div>
                        </ >
                    </div>
                </div>


                <div className="w-full flex">
                    <div className="w-full">
                        < >
                            <div className="flex flex-col h-full gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-emerald-950/20 font-bold border border-border text-primary rounded-[14px] flex items-center justify-center">
                                        <ServerCog className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="tracking-wide font-medium">Database & Backend</p>
                                        <small className="text-foreground/65 tracking-wide">APIs, databases, ORM & caching</small>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 flex-1">
                                    {items.map((S) => {
                                        return (
                                            <div
                                                key={S.name}
                                                className="flex items-center justify-between py-2 border-b border-border/40 last:border-none gap-4"
                                            >
                                                <div className="flex items-center gap-3 min-w-30">
                                                    <div className="flex bg-emerald-950/10 p-2 items-center justify-center rounded-[10px] border border-border">
                                                        {S.icon}
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {S.name}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                                    <span className="text-xs font-mono text-primary">
                                                        {S.latency}
                                                    </span>
                                                </div>

                                                <div className="h-6 flex items-end w-[25%]">
                                                    <svg className="w-full h-full text-primary overflow-visible" viewBox="0 0 100 30" fill="none">
                                                        <path
                                                            d="M0 22 Q 10 8, 20 18 T 40 12 T 60 20 T 80 10 T 100 15"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M0 22 Q 10 8, 20 18 T 40 12 T 60 20 T 80 10 T 100 15 L 100 30 L 0 30 Z"
                                                            fill="url(#emerald-gradient)"
                                                            opacity="0.15"
                                                        />
                                                        <defs>
                                                            <linearGradient id="emerald-gradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor="#10b981" />
                                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/40">
                                    <span className="text-xs text-foreground/65 tracking-wide">Avg. response time</span>
                                    <span className="flex items-center gap-1.5 text-xs font-mono text-primary">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                        ~19ms
                                    </span>
                                </div>
                            </div>
                        </ >
                    </div>
                </div>


                <div className="w-full flex">
                    <div className="w-full">
                        < >
                            <div className="flex flex-col h-full gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-emerald-950/20 font-bold border border-border text-primary rounded-[14px] flex items-center justify-center">
                                        <SiDenodeploy className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="tracking-wide font-medium">DevOps & Tools</p>
                                        <small className="text-foreground/65 tracking-wide">Deploy, Monitor, & Integrate</small>
                                    </div>
                                </div>

                                <div className="relative flex-1 flex items-center justify-center w-full min-h-45">
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-chart-1" strokeWidth="1.5" fill="none">
                                        <line x1="25%" y1="28%" x2="40%" y2="40%" strokeDasharray="4 4" className="animate-pulse" />
                                        <line x1="75%" y1="31%" x2="60%" y2="45%" />
                                        <line x1="25%" y1="72%" x2="40%" y2="60%" />
                                        <line x1="75%" y1="72%" x2="60%" y2="60%" strokeDasharray="4 4" className="animate-pulse" />
                                    </svg>

                                    <div className="absolute left-2 top-4 flex flex-col items-center group cursor-pointer">
                                        <div className="p-2.5 border border-border bg-emerald-950/10 rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105">
                                            {tools[0].icon}
                                        </div>
                                        <span className="text-xs mt-1.5 text-foreground/80">{tools[0].name}</span>
                                    </div>

                                    <div className="absolute right-2 top-4 flex flex-col items-center group cursor-pointer">
                                        <div className="p-2.5 border border-border bg-emerald-950/10 rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105">
                                            {tools[2].icon}
                                        </div>
                                        <span className="text-xs mt-1.5 text-foreground/80">{tools[2].name}</span>
                                    </div>

                                    <div className="absolute left-2 bottom-4 flex flex-col items-center group cursor-pointer">
                                        <div className="p-2.5 border border-border bg-emerald-950/10 rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105">
                                            {tools[1].icon}
                                        </div>
                                        <span className="text-xs mt-1.5 text-foreground/80">{tools[1].name}</span>
                                    </div>

                                    <div className="absolute right-2 bottom-4 flex flex-col items-center group cursor-pointer">
                                        <div className="p-2.5 border border-border bg-emerald-950/10 rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105">
                                            {tools[3].icon}
                                        </div>
                                        <span className="text-xs mt-1.5 font-medium text-foreground/80">{tools[3].name}</span>
                                    </div>

                                    <div className="relative perspective-1000 flex items-center justify-center bg-black/50 rounded-2xl h-19 w-19">
                                        <div className="w-24 h-24 relative flex items-center justify-center">
                                            <RotatingCube size={38} color="#0c1a15" />
                                        </div>

                                        <span className="absolute -bottom-6 text-xs text-primary" >workflow</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/40">
                                    <span className="text-xs text-foreground/65 tracking-wide">Connected services</span>
                                    <span className="flex items-center gap-1.5 text-xs font-mono text-primary">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                        {tools.length} active
                                    </span>
                                </div>
                            </div>
                        </ >
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TechStack;