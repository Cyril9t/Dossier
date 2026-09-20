import HeroSection from "./HeroSection";
import Navbar from "./Navbar"
import TechStack from "../components/TechStack"
import Project from "./Project";
import DeveloperTerminal from "./Therminal";
function Homepage() {
    return (
        <div >
            <Navbar />
            <div className="p-5">
                <HeroSection />
                <TechStack />
                <Project />
                <DeveloperTerminal />
            </div>
        </div>);
}

export default Homepage;