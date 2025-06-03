
import Hero from "@/components/Hero";
import About from "@/components/About";
import LiveLeaderboards from "@/components/LiveLeaderboards";
import StatsDashboard from "@/components/StatsDashboard";
import PlayerComparison from "@/components/PlayerComparison";
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
      <StatsDashboard />
      <PlayerComparison />
      <HowItWorks />
      <PlayerOfTheWeek />
      <ClubContact />
      <Footer />
    </div>
  );
};

export default Index;
