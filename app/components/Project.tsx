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
            category: "Full-Stack",
            description: "Zyloo is an e-commerce platform where users can browse products, manage their carts, securely complete payments, and track their orders. I built the application to bring the shopping experience and order workflow together in one platform.",
            tags: ["Next.js", "Tailwind", "Prisma", "PostgreSQL"],
            previewType: "zyloo",
            link: "https://zyloo-five.vercel.app/"
        },
        {
            title: "AttendX",
            category: "Full-Stack",
            description: "AttendX is a QR-based attendance management system designed for students, tutors, and administrators. It helps simplify attendance recording and management through a web-based workflow.",
            tags: ["Next.js", "TailwindCss", "Prisma", "PostgreSQl"],
            previewType: "AttendX",
            link: "https://attendx-flame.vercel.app/"
        },
        {
            title: "MovieFlex",
            category: "Front-end",
            description: "MovieFlex is a movie discovery web application that allows users to browse and search for movies, explore detailed movie information, and save their favorite films to a personal watchlist. Users can also watch behind-the-scenes content, view movie budgets and other production details, and explore detailed information about the cast and crew.",
            tags: ["React", "javaScript", "CSS"],
            previewType: "MovieFlex",
            link: "https://moviefle-x-yt8f.vercel.app/"
        },
        {
            title: "Vibe Stream",
            category: "Front-end",
            description: "Vibe Stream is a music web application where users can discover songs, explore artists, user can record their sound audio, and download music and their recordings. It combines music discovery with additional audio features in a responsive interface.",
            tags: ["React", "Node.js", "PostgreSQL", "Chart.js"],
            previewType: "finance",
            link: "https://cyril9t.github.io/Music-app"
        }
    ];

    return (
        <div className="mt-15" id="projects">

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
                            className="border border-border bg-card rounded-xl p-2 flex flex-col justify-between hover:border-primary transition-all duration-300 group"
                        >
                            <div>
                                <div className="flex flex-col gap-4 mb-1 w-full">


                                    <div className=" border border-border p-1 rounded-sm w-full flex flex-col justify-between h-50 relative overflow-hidden">
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


                                    <div className="w-full  flex flex-col justify-start gap-1">
                                        <div className="flex gap-2 ">

                                            <h3 className="font-semibold text-lg ">{project.title}</h3>

                                            <Badge variant={"outline"} className="p-2 rounded-full font-medium text-primary mt-auto mb-auto tracking-wide">
                                                {project.category}
                                            </Badge>


                                        </div>
                                        <p className="text-sm text-foreground/65 leading-relaxed tracking-wider">{project.description}</p>

                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {project.tags.map((tag, tagIdx) => (
                                                <span key={tagIdx} className="bg-secondary text-secondary-foreground text-[11px] px-2.5 py-1 rounded border border-border">
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