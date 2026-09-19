import HeroSection from "./HeroSection";
import Navbar from "./Navbar"
import TechStack from "../components/TechStack"
import Project from "./Project";
function Homepage() {
    return (
        <div >
            <Navbar />
            <div className="p-5">
                <HeroSection />
                <TechStack />
                <Project />
            </div>
        </div>);
}

export default Homepage;