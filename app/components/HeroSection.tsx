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
        <section className="w-full py-6 sm:py-8" id="home">
            <div className="mb-8 flex items-center gap-3">
                <h1 className="text-2xl font-medium text-foreground/65">Hi, I&apos;m Cyril</h1>
                <span className="inline-block h-0.5 w-7 rounded-2xl bg-primary" />
            </div>

            <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12 lg:gap-20">
                <div className="w-full md:w-[55%]">
                    <p className="text-4xl font-bold leading-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                        <span className="text-foreground">Building</span> scalable systems <span className="text-foreground">&amp;</span> fluid interfaces.
                    </p>

                    <div className="mt-6 max-w-xl">
                        <p className="text-base leading-relaxed text-foreground/65 sm:text-lg">
                            I&apos;m a software developer who <span className="font-medium text-foreground">loves turning</span> ideas into real, usable products. I build <span className="font-medium text-foreground">modern</span> web applications that are fast, secure, and designed for people.
                        </p>
                    </div>

                    <div className="mt-6 flex w-full flex-col gap-4 pt-2 sm:flex-row">
                        <Button className="flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-4 font-medium text-background hover:bg-foreground/90">
                            Explore Work <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center gap-2 rounded-full px-4 py-4 font-medium">
                            View GitHub Profile
                            <SiGithub className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="relative mt-2 w-full md:mt-0 md:w-[45%]">
                    <div className="hidden h-56 w-full md:block">
                        <InteractiveHeroCanvas lineWidth={1} />
                    </div>

                    <div className="flex w-full md:absolute md:-top-16  flex-col-reverse md:flex-row md:items-start md:gap-8">
                        <div className="mt-2 w-full md:mt-12 md:w-[70%] md:rotate-2">
                            <LiveLogTerminal />
                        </div>
                        <div className="mt-3 flex w-full flex-row justify-start gap-1 md:gap-3 md:mt-12 md:w-[30%] md:flex-col md:items-start">
                            {logs.map((c) => (
                                <div key={c.code} className="font-mono text-sm tracking-tight md:tracking-wide text-primary">
                                    <p>{c.code}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;