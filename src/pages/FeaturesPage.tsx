import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Play, 
  BarChart3, 
  Users, 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Calendar,
  Zap,
  Eye,
  Settings,
  Database
} from "lucide-react";

const FeaturesPage = () => {
  const [activeDemo, setActiveDemo] = useState("tracker");

  const coreFeatures = [
    {
      icon: Play,
      title: "Live Sports Tracking",
      description: "Real-time score updates and match progress tracking across all major sports",
      benefits: ["Instant score updates", "Live commentary", "Match timeline", "Real-time stats"],
      color: "bg-red-50 border-red-200"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive player and team statistics with detailed insights",
      benefits: ["Player comparisons", "Performance trends", "Advanced metrics", "Custom reports"],
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: Users,
      title: "Player Management",
      description: "Complete player profiles with registration and performance tracking",
      benefits: ["Player profiles", "Performance history", "Achievements", "Team assignments"],
      color: "bg-green-50 border-green-200"
    },
    {
      icon: Trophy,
      title: "Tournament System",
      description: "End-to-end tournament management from registration to awards",
      benefits: ["Tournament brackets", "Team registration", "Scheduling", "Results tracking"],
      color: "bg-yellow-50 border-yellow-200"
    }
  ];

  const liveTrackerFeatures = [
    {
      sport: "Basketball",
      icon: "🏀",
      features: ["Live score tracking", "Shot clock management", "Player stats", "Foul tracking", "Quarter/game management"]
    },
    {
      sport: "Cricket",
      icon: "🏏",
      features: ["Over-by-over scoring", "Batting/bowling stats", "Run rate tracking", "Wicket details", "Match commentary"]
    },
    {
      sport: "Football",
      icon: "⚽",
      features: ["Real-time scoring", "Match timeline", "Player positions", "Cards tracking", "Substitutions"]
    },
    {
      sport: "Badminton",
      icon: "🏸",
      features: ["Set-wise scoring", "Rally tracking", "Match duration", "Player statistics", "Tournament progress"]
    }
  ];

  const analyticsFeatures = [
    {
      title: "Player Comparison",
      description: "Side-by-side comparison of player statistics and performance metrics",
      icon: Target
    },
    {
      title: "Performance Trends",
      description: "Track improvement over time with detailed trend analysis",
      icon: TrendingUp
    },
    {
      title: "Team Analytics",
      description: "Comprehensive team performance insights and strategy analysis",
      icon: Users
    },
    {
      title: "Match History",
      description: "Complete archive of all matches with searchable statistics",
      icon: Database
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200">
            ⚡ Platform Features
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Powerful Features for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Complete Sports Management
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Discover all the tools and features that make SNU Sports Hub the ultimate 
            platform for campus athletics management and performance tracking.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Core Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className={`${feature.color} hover:shadow-lg transition-shadow duration-300`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Tracker Details */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              🔴 Live Sports Tracker
            </h2>
            <p className="text-lg text-gray-600">
              Real-time tracking capabilities for all major sports with sport-specific features
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="basketball">🏀</TabsTrigger>
              <TabsTrigger value="cricket">🏏</TabsTrigger>
              <TabsTrigger value="football">⚽</TabsTrigger>
              <TabsTrigger value="badminton">🏸</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {liveTrackerFeatures.map((sport, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{sport.icon}</div>
                      <CardTitle>{sport.sport}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {sport.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <Zap className="w-3 h-3 text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/basketball">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    <Play className="w-5 h-5 mr-2" />
                    Try Live Tracker
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {["basketball", "cricket", "football", "badminton"].map((sport) => (
              <TabsContent key={sport} value={sport} className="mt-8">
                <Card className="bg-gradient-to-br from-blue-50 to-green-50">
                  <CardContent className="pt-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {liveTrackerFeatures.find(s => s.sport.toLowerCase() === sport)?.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 capitalize">{sport} Tracker</h3>
                      <p className="text-gray-600 mb-6">
                        Experience real-time {sport} tracking with all the features you need
                      </p>
                      <Link to={`/${sport}`}>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                          <Eye className="w-5 h-5 mr-2" />
                          View {sport.charAt(0).toUpperCase() + sport.slice(1)} Tracker
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Analytics Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              📊 Performance Analytics
            </h2>
            <p className="text-lg text-gray-600">
              Advanced analytics tools for comprehensive performance insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analyticsFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <feature.icon className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/performance">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <BarChart3 className="w-5 h-5 mr-2" />
                Explore Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Additional Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-bold text-lg mb-2">Match Scheduling</h3>
                <p className="text-gray-600">Automated scheduling and calendar integration</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 text-center">
                <Settings className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <h3 className="font-bold text-lg mb-2">Admin Controls</h3>
                <p className="text-gray-600">Comprehensive administrative tools and settings</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className="font-bold text-lg mb-2">Awards System</h3>
                <p className="text-gray-600">Automated recognition and achievement tracking</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the SNU Sports community and start using these powerful tools today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registration">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full"
              >
                Get Started Now
              </Button>
            </Link>
            <Link to="/basketball">
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-full"
              >
                Try Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;