
import Hero from "@/components/Hero";
import About from "@/components/About";
import LiveLeaderboards from "@/components/LiveLeaderboards";
import HowItWorks from "@/components/HowItWorks";
import PlayerOfTheWeek from "@/components/PlayerOfTheWeek";
import ClubContact from "@/components/ClubContact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Hero />
      <About />
      <LiveLeaderboards />
      <HowItWorks />
      <PlayerOfTheWeek />
      <ClubContact />
      <Footer />
    </div>
  );
};

export default Index;
