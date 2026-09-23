import { Badge } from "@/components/ui/badge";
import FlipCube from "@/components/originkit/ui/flip-cube";

function Navbar() {
    return (
        <nav className="h-16 w-full bg-secondary px-6 flex items-center justify-between text-foreground/65 border-b border-border/40">

            <div className="flex items-center">
                <Badge variant="outline" className="p-2 md:p-4 tracking-tight md:tracking-wider flex items-center gap-1 md:gap-2.5 font-normal">
                    <span className="rounded-full h-2 w-2 bg-primary animate-pulse inline-block"></span>
                    <span className="font-mono text-xs">v2.4.0</span>
                    <span className="text-foreground/40">//</span>
                    <span className="text-chart-2 font-semibold tracking-wide text-xs">CONNECTED</span>
                </Badge>
            </div>


            <div className="flex items-center gap-3 tracking-tight md:tracking-widest text-xs sm:text-sm">
                <div className="flex items-center gap-0 md:gap-2">
                    <div className="w-6 h-6 relative flex items-center justify-center">
                        <FlipCube />
                    </div>
                    <span className="text-foreground/80 font-medium">Remote</span>
                    <span className="text-foreground/40">//</span>
                    <span className="font-mono text-primary font-medium">
                        {new Date().toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "numeric",
                        })}
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;