import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Star, Crown, Target, Calendar, TrendingUp, Award } from "lucide-react";

const AwardsPage = () => {
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const playerOfTheWeek = {
    name: "Arjun Sharma",
    sport: "Basketball",
    achievement: "Averaged 28.5 points per game this week",
    image: "🏀",
    stats: {
      "Points Per Game": "28.5",
      "Field Goal %": "58.3%",
      "Assists": "6.2",
      "Rebounds": "8.1"
    }
  };

  const recentAwards = [
    {
      id: 1,
      title: "Player of the Week",
      recipient: "Arjun Sharma",
      sport: "Basketball",
      date: "2024-01-15",
      badge: "🥇",
      description: "Outstanding performance with 28.5 PPG average"
    },
    {
      id: 2,
      title: "Best Bowling Figures",
      recipient: "Priya Patel",
      sport: "Cricket",
      date: "2024-01-14",
      badge: "🏏",
      description: "Took 5 wickets for 23 runs in the inter-college match"
    },
    {
      id: 3,
      title: "Tournament Winner",
      recipient: "Tech Tigers",
      sport: "Football",
      date: "2024-01-13",
      badge: "🏆",
      description: "Won the Annual Football Championship 2024"
    },
    {
      id: 4,
      title: "Perfect Game",
      recipient: "Sneha Gupta",
      sport: "Badminton",
      date: "2024-01-12",
      badge: "🏸",
      description: "Won all matches without dropping a single set"
    }
  ];

  const achievementCategories = [
    {
      title: "Performance Awards",
      icon: Target,
      awards: [
        "Player of the Week",
        "Most Valuable Player",
        "Best Performance",
        "Perfect Game",
        "Hat-trick Hero"
      ]
    },
    {
      title: "Tournament Awards",
      icon: Trophy,
      awards: [
        "Tournament Winner",
        "Tournament Runner-up",
        "Fair Play Award",
        "Best Team Spirit",
        "Championship Title"
      ]
    },
    {
      title: "Milestone Awards",
      icon: Star,
      awards: [
        "100 Matches Played",
        "50 Wins Achievement",
        "Highest Scorer",
        "Consistent Performer",
        "Leadership Award"
      ]
    },
    {
      title: "Special Recognition",
      icon: Crown,
      awards: [
        "Sportsmanship Award",
        "Most Improved Player",
        "Rookie of the Year",
        "Veteran Achievement",
        "Community Champion"
      ]
    }
  ];

  const hallOfFame = [
    {
      name: "Rajesh Kumar",
      sport: "Cricket",
      achievement: "Highest Run Scorer All-Time",
      record: "2,847 Runs",
      year: "2020-2024"
    },
    {
      name: "Ananya Singh",
      sport: "Badminton",
      achievement: "Most Tournament Wins",
      record: "15 Championships",
      year: "2019-2024"
    },
    {
      name: "Mohammed Ali",
      sport: "Football",
      achievement: "Most Goals in a Season",
      record: "34 Goals",
      year: "2023"
    },
    {
      name: "Kavya Reddy",
      sport: "Basketball",
      achievement: "Highest Career Average",
      record: "24.8 PPG",
      year: "2021-2024"
    }
  ];

  const leaderboards = {
    basketball: [
      { name: "Arjun Sharma", stat: "28.5 PPG", rank: 1 },
      { name: "Vikram Singh", stat: "8.2 APG", rank: 2 },
      { name: "Rohit Gupta", stat: "12.1 RPG", rank: 3 }
    ],
    cricket: [
      { name: "Priya Patel", stat: "45.8 Average", rank: 1 },
      { name: "Sameer Khan", stat: "3.2 Wickets/Match", rank: 2 },
      { name: "Anil Kumar", stat: "89.4 Strike Rate", rank: 3 }
    ],
    football: [
      { name: "Sneha Gupta", stat: "12 Goals", rank: 1 },
      { name: "Ravi Sharma", stat: "8 Assists", rank: 2 },
      { name: "Deepak Singh", stat: "5 Clean Sheets", rank: 3 }
    ],
    badminton: [
      { name: "Meera Joshi", stat: "92% Win Rate", rank: 1 },
      { name: "Kartik Verma", stat: "15 Straight Wins", rank: 2 },
      { name: "Pooja Nair", stat: "8 Tournament Wins", rank: 3 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-yellow-100 text-yellow-800 border-yellow-200">
            🏆 Awards & Recognition
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Celebrating Athletic
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
              Excellence & Achievement
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Recognize outstanding performances, celebrate milestones, and honor the champions 
            who embody the spirit of SNU Sports.
          </p>
        </div>
      </section>

      {/* Player of the Week Spotlight */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">🌟 Player of the Week</h2>
          </div>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="text-6xl mb-4">{playerOfTheWeek.image}</div>
                  <h3 className="text-3xl font-bold mb-2">{playerOfTheWeek.name}</h3>
                  <Badge className="bg-white/20 text-white border-white/30 mb-4">
                    {playerOfTheWeek.sport}
                  </Badge>
                  <p className="text-xl mb-6 opacity-90">{playerOfTheWeek.achievement}</p>
                  <Button className="bg-white text-yellow-600 hover:bg-gray-100">
                    <Trophy className="w-4 h-4 mr-2" />
                    View Full Profile
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(playerOfTheWeek.stats).map(([key, value]) => (
                    <div key={key} className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">{value}</div>
                      <div className="text-sm opacity-80">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Awards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Recent Awards</h2>
            <div className="flex gap-2">
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="cricket">Cricket</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="badminton">Badminton</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentAwards.map((award) => (
              <Card key={award.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{award.badge}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{award.title}</h3>
                        <Badge variant="outline">{award.sport}</Badge>
                      </div>
                      <p className="font-semibold text-blue-600 mb-1">{award.recipient}</p>
                      <p className="text-gray-600 text-sm mb-2">{award.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(award.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Award Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Award Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievementCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <category.icon className="w-10 h-10 mx-auto mb-3 text-yellow-600" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.awards.map((award, awardIndex) => (
                      <div key={awardIndex} className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-sm text-gray-600">{award}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hall of Fame */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              🏛️ Hall of Fame
            </h2>
            <p className="text-lg text-gray-600">
              Honoring the greatest achievements in SNU Sports history
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hallOfFame.map((legend, index) => (
              <Card key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">👑</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-800">{legend.name}</h3>
                      <Badge className="bg-yellow-100 text-yellow-800 mb-2">{legend.sport}</Badge>
                      <p className="text-gray-700 font-semibold">{legend.achievement}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-2xl font-bold text-orange-600">{legend.record}</span>
                        <span className="text-sm text-gray-500">{legend.year}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Leaderboards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Current Season Leaderboards
          </h2>

          <Tabs defaultValue="basketball" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basketball">🏀 Basketball</TabsTrigger>
              <TabsTrigger value="cricket">🏏 Cricket</TabsTrigger>
              <TabsTrigger value="football">⚽ Football</TabsTrigger>
              <TabsTrigger value="badminton">🏸 Badminton</TabsTrigger>
            </TabsList>

            {Object.entries(leaderboards).map(([sport, leaders]) => (
              <TabsContent key={sport} value={sport} className="mt-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {leaders.map((leader, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                              leader.rank === 1 ? 'bg-yellow-500' : 
                              leader.rank === 2 ? 'bg-gray-400' : 'bg-orange-500'
                            }`}>
                              {leader.rank}
                            </div>
                            <span className="font-semibold">{leader.name}</span>
                          </div>
                          <Badge variant="outline" className="font-mono">
                            {leader.stat}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Earn Your Recognition?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the competition and start your journey towards athletic excellence and awards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full"
            >
              <Award className="w-5 h-5 mr-2" />
              Start Competing
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-full"
            >
              View All Records
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;