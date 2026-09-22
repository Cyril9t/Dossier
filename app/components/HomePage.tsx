import HeroSection from "./HeroSection";
import Navbar from "./Navbar"
import TechStack from "../components/TechStack"
import Project from "./Project";
import DeveloperTerminal from "./Terminal";
import ContactMe from "./contact";
import Footer from "./footer";
import Nav from "./Nav";
function Homepage() {
    return (
        <div >
            <Navbar />
            <div className="p-5">
                <HeroSection />
                <TechStack />
                <Project />
                <DeveloperTerminal />
                <ContactMe />
                <Nav />
                <Footer />
            </div>
        </div>);
}

export default Homepage;