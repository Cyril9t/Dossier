import { Button } from "@/components/ui/button";
import LiveLogTerminal from "./liveCodeLogging";
import { ArrowRight } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import InteractiveHeroCanvas from "@/components/originkit/ui/wave-arcs";

const logs = [
    {
        code: "<code />"
    },
    {
        code: "<build />"
    },
    {
        code: "<deploy />"
    },
    {
        code: "<repeat />"
    },
]

function HeroSection() {
    return (
        <div className="w-full" id="home">

            <div className="flex items-center gap-3 mb-8">
                <h1 className="text-foreground/65 text-2xl font-medium">Hi, I'm Cyril</h1>
                <span className="w-7 h-0.5 rounded-2xl bg-primary inline-block"></span>
            </div>


            <div className="flex gap-12 md:gap-20 flex-col md:flex-row items-start">


                <div className="flex flex-col gap-6 w-full md:w-[55%]">
                    <p className="text-4xl sm:text-5xl md:text-7xl text-primary font-bold leading-tight">
                        <span className="text-foreground">Building</span> scalable systems <span className="text-foreground">&</span> fluid interfaces.
                    </p>

                    <div className="max-w-xl">
                        <p className="text-foreground/65 text-base sm:text-lg leading-relaxed">
                            I'm a software developer who <span className="text-foreground font-medium">loves turning</span> ideas into real, usable products. I build <span className="text-foreground font-medium">modern</span> web applications that are fast, secure, and designed for people.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
                        <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-4 py-4 flex items-center justify-center gap-2 font-medium">
                            Explore Work <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="rounded-full px-4 py-4 flex items-center justify-center gap-2 font-medium">
                            View GitHub Profile
                            <SiGithub className="w-4 h-4" />
                        </Button>
                    </div>
                </div>


                <div className="relative w-full md:w-[45%] mt-6 md:mt-0">
                    <div className="w-full h-56 hidden md:block">
                        <InteractiveHeroCanvas lineWidth={1} />
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8  block md:absolute top-0 md:-top-16 w-full">
                        <div className="w-full rotate-0 md:rotate-6 mt-2 md:mt-12 transition-transform">
                            <LiveLogTerminal />
                        </div>
                        <div className="w-full md:w-[35%] mt-4 md:mt-12 gap-3 flex flex-row md:flex-col justify-start">
                            {logs.map((c) => {
                                return (
                                    <div key={c.code} className="tracking-widest text-primary font-mono text-sm">
                                        <p>{c.code}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeroSection;