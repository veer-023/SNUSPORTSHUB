
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Target, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";

const LiveLeaderboards = () => {
  const sports = [
    {
      name: "Basketball",
      path: "/basketball",
      icon: Trophy,
      emoji: "🏀",
      color: "from-orange-500 to-orange-600",
      players: [
        { name: "Alex Chen", stat: "28.5 PPG", position: 1 },
        { name: "Maya Patel", stat: "24.2 PPG", position: 2 },
        { name: "Jordan Kim", stat: "22.8 PPG", position: 3 }
      ]
    },
    {
      name: "Cricket",
      path: "/cricket",
      icon: Target,
      emoji: "🏏",
      color: "from-green-500 to-green-600",
      players: [
        { name: "Raj Sharma", stat: "485 runs", position: 1 },
        { name: "Priya Singh", stat: "432 runs", position: 2 },
        { name: "Sam Wilson", stat: "398 runs", position: 3 }
      ]
    },
    {
      name: "Football",
      path: "/football",
      icon: Zap,
      emoji: "⚽",
      color: "from-blue-500 to-blue-600",
      players: [
        { name: "Diego Lopez", stat: "15 goals", position: 1 },
        { name: "Emma Taylor", stat: "12 goals", position: 2 },
        { name: "Ryan Park", stat: "11 goals", position: 3 }
      ]
    },
    {
      name: "Badminton",
      path: "/badminton",
      icon: Star,
      emoji: "🏸",
      color: "from-purple-500 to-purple-600",
      players: [
        { name: "Li Wei", stat: "23-2 W-L", position: 1 },
        { name: "Anna Kumar", stat: "21-3 W-L", position: 2 },
        { name: "Chris Jones", stat: "19-4 W-L", position: 3 }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Live Leaderboards 📈
          </h2>
          <p className="text-xl text-gray-600">Top performers across campus sports</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport) => (
            <Link key={sport.name} to={sport.path}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm cursor-pointer">
                <CardHeader className={`bg-gradient-to-r ${sport.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center justify-center text-xl">
                    <span className="text-2xl mr-2">{sport.emoji}</span>
                    {sport.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {sport.players.map((player) => (
                      <div key={player.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm font-bold rounded-full flex items-center justify-center mr-3">
                            {player.position}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-800">{player.name}</p>
                            <p className="text-sm text-gray-600">{player.stat}</p>
                          </div>
                        </div>
                        {player.position === 1 && <span className="text-lg">👑</span>}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500 hover:text-gray-700">Click to view full leaderboard →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveLeaderboards;
