import { SiCodeberg, SiDevbox } from "@icons-pack/react-simple-icons";
import { Copyright } from "lucide-react";

function Footer() {
    return (
        <div className="flex gap-2 mt-10 border-t py-4 w-full place-content-center">

            <div className="flex gap-2 tracking-widest grow">
                <Copyright />
                <div>
                    {new Date().toLocaleDateString('en-US', {
                        year: "numeric"
                    })}
                </div> <div>Cyril . All right reserved.</div>
            </div>

            <div className="text-primary flex gap-3 font-bold tracking-widest">
                <SiDevbox /> <p className=" text-[17px]">Always Building...</p>
            </div>
        </div>
    );
}

export default Footer;