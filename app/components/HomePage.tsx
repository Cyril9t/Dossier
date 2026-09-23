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
        <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
            <Navbar />
            <div className="mx-auto w-full max-w-7xl px-4 pb-28 pt-4 sm:px-6 lg:px-8">
                <HeroSection />
                <TechStack />
                <Project />
                <DeveloperTerminal />
                <ContactMe />
                <Footer />
            </div>
            <Nav />
        </div>);
}

export default Homepage;