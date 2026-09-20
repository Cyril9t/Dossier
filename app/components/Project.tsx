import Image from "next/image";
import zyloo from "../../public/Zyloo.png"
import movieFlex from "../../public/MovieFlex.png"
import attendX from "../../public/AttendX.png"
import vibe from "../../public/Music.png"
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightFromSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function FeaturedProjects() {
    const projects = [
        {
            title: "Zyloo E-commerce",
            category: "Full Stack",
            description: "A modern e-commerce platform with secure payments, user accounts, and real-time order tracking.",
            tags: ["Next.js", "Tailwind", "Prisma", "PostgreSQL"],
            previewType: "zyloo",
            link: "https://zyloo-five.vercel.app/"
        },
        {
            title: "AttendX",
            category: "Full Stack",
            description: "A fullstack QR-based attendance management system built with modern UI component for students, tutors, and administrators.",
            tags: ["Next.js", "TailwindCss", "Prisma", "PostgreSQl"],
            previewType: "AttendX",
            link: "https://attendx-flame.vercel.app/"
        },
        {
            title: "MovieFlex",
            category: "Front-end",
            description: "A modern movie discovery platform that lets users explore movies, view detailed information, search for films, and save their favorite titles for later",
            tags: ["React", "javaScript", "CSS"],
            previewType: "MovieFlex",
            link: "https://moviefle-x-yt8f.vercel.app/"
        },
        {
            title: "Vibe Stream",
            category: "Front-end",
            description: "A modern music streaming web app that lets users discover, record, & download songs, while exploring artists through a clean & responsive interface.",
            tags: ["React", "Node.js", "PostgreSQL", "Chart.js"],
            previewType: "finance",
            link: "https://cyril9t.github.io/Music-app"
        }
    ];

    return (
        <div className="mt-15">

            <div className="">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-10">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-bold tracking-widest">FEATURED PROJECTS</p>
                        <span className="w-7 h-0.5 rounded-2xl bg-primary inline-block"></span>
                    </div>
                    <p className="text-foreground/65 text-sm tracking-wide">Real projects, Real solutions.</p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className=" border border-border rounded-xl p-5 flex flex-col justify-between hover:border-chart-1 transition-all duration-300 group"
                        >
                            <div>
                                <div className="flex flex-col sm:flex-row gap-4 mb-1">


                                    <div className=" border border-border p-1 rounded-sm w-full sm:w-1/2 flex flex-col justify-between h-42 relative overflow-hidden">
                                        {project.previewType === 'zyloo' && (
                                            <>
                                                <Image src={zyloo} alt="" className="w-full object-cover h-full rounded-[5px]" />
                                            </>
                                        )}

                                        {project.previewType === 'AttendX' && (
                                            <>
                                                <Image src={attendX} alt="" className="w-full object-cover h-full rounded-[5px]" />
                                            </>
                                        )}

                                        {project.previewType === 'MovieFlex' && (
                                            <>
                                                <Image src={movieFlex} alt="" className="w-full object-cover h-full rounded-[5px]" />
                                            </>
                                        )}

                                        {project.previewType === 'finance' && (
                                            <>
                                                <Image src={vibe} alt="" className="w-full object-cover h-full rounded-[5px]" />
                                            </>
                                        )}
                                    </div>

                                    {/* Project Details */}
                                    <div className="w-full sm:w-1/2 flex flex-col justify-start gap-1">
                                        <Badge variant={"outline"} className="p-3 rounded-full font-medium text-primary">
                                            {project.category}
                                        </Badge>
                                        <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                                        <p className="text-sm text-foreground/65 leading-relaxed">{project.description}</p>

                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {project.tags.map((tag, tagIdx) => (
                                                <span key={tagIdx} className="bg-[#182622] text-[11px] px-2.5 py-1 rounded border border-[#233832]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div>



                                <a href={project.link} className=" text-primary font-medium ">
                                    <Button variant={"link"}>

                                        View Project <span><ArrowUpRightFromSquare /></span>
                                    </Button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}