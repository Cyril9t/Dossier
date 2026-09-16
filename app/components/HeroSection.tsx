import { Button } from "@/components/ui/button";
import LiveLogTerminal from "./liveCodeLogging";
import { ArrowRight } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

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
        <div>
            <div className="flex gap-2">
                <div>

                    <h1 className="text-foreground/65" >Hi, I'm Cyril </h1>
                </div>
                <div className="place-content-center mt-3">

                    <p className="place-content-center w-6 h-0.5  rounded-2xl bg-primary"></p>
                </div>
            </div>

            <div className="flex gap-0 md:gap-30 flex-col md:flex-row">

                <div className="flex flex-col gap-5 w-full md:w-[50%] ">
                    <p className="text-5xl md:text-7xl text-primary font-bold">
                        <span className="text-foreground">Building</span> Scalable systems <span className="text-foreground">&</span> fluid interfaces.
                    </p>

                    <div>
                        <p className="text-foreground/65">I'm a software & developer who <span className="text-foreground">loves turning</span> ideas into real, usable products. i build <span className="text-foreground">modern</span>  web applications that are fast secure and designed for people.</p>
                    </div>

                    <div className="flex gap-5 w-[40%]">
                        <Button className="bg-foreground rounded-4xl p-5 w-ful grow">Explore Work <ArrowRight /> </Button>
                        <Button variant={"outline"} className="rounded-4xl p-5"> view Github profile
                            <SiGithub />
                        </Button>
                    </div>
                </div>

                <div className="w-full md:w-[40%] flex flex-col-reverse md:flex-row gap-10">
                    <div className="w-full">
                        <LiveLogTerminal />
                    </div>

                    <div className="w-full md:w-[30%] mt-15 gap-5 flex flex-row md:flex-col">
                        {logs.map((c) => {
                            return (
                                <p className="tracking-widest text-primary">{c.code}</p>
                            )
                        })}


                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;