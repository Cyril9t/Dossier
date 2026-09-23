import { SiCodeberg, SiDevbox } from "@icons-pack/react-simple-icons";
import { Copyright } from "lucide-react";

function Footer() {
    return (
        <div className="flex gap-2 mt-10 border-t py-4 w-full place-content-center">

            <div className="flex gap-1 text-[10px] tracking-widest grow">
                <Copyright size={17} />
                <div>
                    {new Date().toLocaleDateString('en-US', {
                        year: "numeric"
                    })}
                </div>
                <div>Cyril . All right reserved.</div>
            </div>

            <div className="text-primary flex gap-1 md:gap-3 font-bold tracking-wide">
                <SiDevbox size={18} /> <p className="text-[11px] md:text-[17px]">Always Building...</p>
            </div>
        </div>
    );
}

export default Footer;