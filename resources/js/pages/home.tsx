import AboutOne from "@/components/sections/about/aboutOne";
import HeroOne from "@/components/sections/heros/heroOne";
import TestimonialOne from "@/components/sections/testimonials/testimonialOne";
import LogoMarquee from "@/components/sections/marques/LogoMarquee";
import ServicesOne from "@/components/sections/servicesOne";
import AchievementOne from "@/components/sections/achievements/achievementOne";
import Projects from "@/components/sections/projects/projects";
import NewsLetter from "@/components/sections/newsLetter";
const Home = () => {
    return (
        <div>
              <HeroOne /> 
            {/* <AboutOne /> */}
            <ServicesOne />
            <AchievementOne />
            <LogoMarquee />
            <Projects />
            <TestimonialOne />
            <NewsLetter />
        </div>
    );
};

export default Home;
