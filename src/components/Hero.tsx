
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-orange-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="text-6xl">🏆</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Campus Sports.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-400">
            Tracked.
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
            Celebrated.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Real-time leaderboards, player stats, and campus athletic excellence—all in one dynamic platform ⚡
        </p>
        
        {/* Sport Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          <Link to="/basketball" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-2">🏀</div>
              <p className="text-sm font-semibold">Basketball</p>
            </div>
          </Link>
          
          <Link to="/cricket" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-2">🏏</div>
              <p className="text-sm font-semibold">Cricket</p>
            </div>
          </Link>
          
          <Link to="/football" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-2">⚽</div>
              <p className="text-sm font-semibold">Football</p>
            </div>
          </Link>
          
          <Link to="/badminton" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-2">🏸</div>
              <p className="text-sm font-semibold">Badminton</p>
            </div>
          </Link>
        </div>
        
        <Link to="/basketball">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            View Leaderboards 🎯
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
