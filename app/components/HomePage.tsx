import HeroSection from "./HeroSection";
import Navbar from "./Navbar"
import LiveLogTerminal from "./liveCodeLogging"
function Homepage() {
    return (
        <div >
            <Navbar />
            <div className="p-5">
                <HeroSection />
            </div>
        </div>);
}

export default Homepage;