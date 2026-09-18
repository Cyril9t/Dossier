import { BookX, Box, Cpu, Cuboid, Server, ServerCog } from "lucide-react";
import NeonBorder from "../../components/originkit/ui/neon-border"
import { SiCloudinary, SiDocker, SiExpress, SiGit, SiJavascript, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPrisma, SiReact, SiTypescript, SiVercel } from "@icons-pack/react-simple-icons";

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
        icon: <SiDocker />
    },
    {
        name: 'Cloudinary',
        position: 'bottom-left',
        icon: <SiCloudinary />
    },
    {
        name: 'Git',
        position: 'top-right',
        icon: <SiGit />
    },
    {
        name: 'Vercel',
        position: 'bottom-right',
        icon: <SiVercel />
    },
];


function TechStack() {
    return (
        <div className="mt-20">

            <div className=" tracking-widest flex gap-1 mb-10">
                <p className="text-xl font-bold">MY TECH STACK</p>
                <div className="place-content-center mt-3">

                    <p className="place-content-center w-7 h-0.5  rounded-2xl bg-primary"></p>
                </div>
                <p className="text-foreground/65 text-[14px] place-content-center tracking-widest">Tools i used to build, ship and scale</p>
            </div>

            <div className="flex gap-10 ">

                <div className="w-fit">
                    <NeonBorder >
                        <div className="flex flex-col gap-10">
                            <div className="flex gap-4">

                                <div className="p-2 bg-emerald-950/20 font-bold place-content-center border-2 border-border text-primary rounded-[14px]">
                                    {"</>"}
                                </div>

                                <div className="line-high">
                                    <p className="tracking-wide">Core Stack</p>
                                    <small className="text-foreground/65 tracking-wide">Fronted & Runtime</small>
                                </div>
                            </div>


                            <div className="grid grid-cols-5 gap-4 w-full justify-self-center">
                                {STACK.map((S) => {
                                    return (
                                        <div key={S.name} className="w-full text-center">
                                            <div className="w-fit bg-emerald-950/10 p-3 rounded-[14px] border border-border flex text-center justify-self-center">

                                                {S.icon}

                                            </div>
                                            <p className="text-[10px] text-foreground/65 tracking-wider">{S.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </NeonBorder>
                </div>

                <div className="w-fit">
                    <NeonBorder>
                        <div className="flex flex-col gap-5">

                            <div className="flex gap-4">
                                <div className="p-2 bg-emerald-950/20 font-bold place-content-center border-2 border-border text-primary rounded-[14px]">
                                    <ServerCog />
                                </div>
                                <div className="line-high">
                                    <p className="tracking-wide">Database & Backend</p>
                                    <small className="text-foreground/65 tracking-wide">APIs, databases, ORM & caching </small>
                                </div>
                            </div>

                            <div>
                                {items.map((S) => {
                                    return (
                                        <div
                                            key={S.name} className="flex gap-20 items-center justify-between py-1 border-b border-gray-900 last:border-none" >

                                            <div className="flex  items-center gap-3 w-full">
                                                <div className="flex bg-emerald-950/10 p-2 items-center rounded-[10px] border border-border">
                                                    {S.icon}
                                                </div>
                                                <span className="text-sm">
                                                    {S.name}
                                                </span>
                                            </div>


                                            <div className="flex items-center gap-2 ">
                                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                                <span className="text-xs font-mono text-primary">
                                                    {S.latency}
                                                </span>
                                            </div>


                                            <div className="h-8 flex items-end w-[60%]">
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
                        </div>
                    </NeonBorder>
                </div>

                <div className="w-fit">
                    <NeonBorder >
                        <div className="flex gap-4">
                            <div className="p-2 bg-emerald-950/20 font-bold place-content-center border-2 border-border text-primary rounded-[14px]">
                                <ServerCog />
                            </div>
                            <div className="line-high">
                                <p className="tracking-wide">DevOps & Tools</p>
                                <small className="text-foreground/65 tracking-wide">Deploy, Monitor, & Integrate </small>
                            </div>
                        </div>

                        <div className="relative h-64 flex items-center justify-center ">


                            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-chart-1" strokeWidth="1.5" fill="none">
                                <line x1="25%" y1="28%" x2="40%" y2="40%" strokeDasharray="4 4" className="animate-pulse" />
                                <line x1="75%" y1="31%" x2="60%" y2="45%" />
                                <line x1="25%" y1="72%" x2="40%" y2="60%" />
                                <line x1="75%" y1="72%" x2="60%" y2="60%" strokeDasharray="4 4" className="animate-pulse" />
                            </svg>


                            <div className="absolute left-3 top-10 flex flex-col items-center group cursor-pointer">
                                <div className="p-2 border border-border rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105">
                                    {tools[0].icon}
                                </div>
                                <span className="text-xs mt-1.5 ">{tools[0].name}</span>
                            </div>


                            <div className="absolute right-4 top-10 flex flex-col items-center group cursor-pointer">
                                <div className="p-2 border border-border rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105">
                                    {tools[2].icon}
                                </div>
                                <span className="text-xs mt-1.5">{tools[2].name}</span>
                            </div>


                            <div className="absolute left-2 bottom-11 flex flex-col items-center group cursor-pointer">
                                <div className="p-2 border border-border rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105">
                                    {tools[1].icon}
                                </div>
                                <span className="text-xs  mt-1.5">{tools[1].name}</span>
                            </div>


                            <div className="absolute right-5 bottom-12 flex flex-col items-center group cursor-pointer">
                                <div className="p-2 border border-border rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105">
                                    {tools[3].icon}
                                </div>
                                <span className="text-xs mt-1.5 font-medium">{tools[3].name}</span>
                            </div>


                            <div className="perspective-1000 flex items-center justify-center">

                                <div className="w-24 h-24 relative ">


                                    <div className=" flex items-center justify-center ">
                                        <Box size={55} className="text-primary absolute top-5 animate-spin-slow  bottom-0 " />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </NeonBorder>
                </div>

            </div>

        </div >
    );
}

export default TechStack;