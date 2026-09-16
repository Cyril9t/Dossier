
import { Badge } from "@/components/ui/badge";
import FlipCube from "@/components/originkit/ui/flip-cube";
function Navbar() {
    return (
        <div className="h-15 w-full bg-secondary flex text-foreground/65">
            <div className="grow place-content-center">
                <Badge variant={"outline"} className="p-4 tracking-wider">
                    <span className="rounded-full h-3 w-3 bg-primary"></span> v2.4.0 // <span className="text-chart-2 font-semibold">CONNECTED</span>
                </Badge>
            </div>

            <div className="place-content-center mr-6 tracking-widest">
                <div className="flex gap-1">
                    <div className="h-1 w-12 relative">
                        <div className="">
                            <FlipCube />
                        </div>
                    </div>
                    <div>Remote //
                        <span>
                            {" "} {" "}
                            {new Date().toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "numeric",
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Navbar;