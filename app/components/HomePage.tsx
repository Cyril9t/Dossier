import HeroSection from "./HeroSection";
import Navbar from "./Navbar"
import TechStack from "../components/TechStack"
import Project from "./Project";
import DeveloperTerminal from "./Terminal";
import ContactMe from "./contact";
import Footer from "./footer";
import Nav from "./Nav";
import ThemeToggle from "./Toggle";
function Homepage() {
    return (
        <div className=" min-h-screen overflow-x-hidden bg-background text-foreground">
            <Navbar />
            <div className="relative mx-auto w-full max-w-7xl px-4 pb-28 pt-4 sm:px-6 lg:px-8">
                <HeroSection />
                <TechStack />
                <Project />
                <DeveloperTerminal />
                <ContactMe />
                <Footer />

                <div className="fixed bottom-30 right-4 sm:bottom-30 sm:right-6 lg:bottom-40 lg:right-20 z-50">
                    <ThemeToggle />
                </div>
            </div>
            <Nav />
        </div>);
}

export default Homepage;