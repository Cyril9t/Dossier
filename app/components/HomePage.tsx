import HeroSection from "./HeroSection";
import Navbar from "./Navbar"
import TechStack from "../components/TechStack"
function Homepage() {
    return (
        <div >
            <Navbar />
            <div className="p-5">
                <HeroSection />
                <TechStack />
            </div>
        </div>);
}

export default Homepage;