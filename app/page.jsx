import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

const Homepage = () => {
  return (
    <div className="p-8">
        <LandingNavbar/>
        <LandingHero/>
    </div>
  );
};

export default Homepage;
