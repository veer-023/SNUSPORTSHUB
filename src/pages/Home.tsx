import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Trophy, BarChart3, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Home = () => {
  const stats = [
    { label: "Active Players", value: "500+", icon: Users },
    { label: "Matches Tracked", value: "150+", icon: Target },
    { label: "Sports Covered", value: "4", icon: Trophy },
    { label: "Live Sessions", value: "12", icon: TrendingUp },
  ];

  const quickActions = [
    {
      title: "Live Sports Tracking",
      description: "Track basketball, cricket, football, and badminton matches in real-time",
      icon: "🔴",
      link: "/features",
      color: "bg-red-50 border-red-200 hover:bg-red-100"
    },
    {
      title: "Performance Analytics",
      description: "Analyze player statistics and team performance with detailed insights",
      icon: "📊",
      link: "/performance",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Register as Player",
      description: "Join the SNU Sports community and participate in tournaments",
      icon: "📝",
      link: "/registration",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "View Awards",
      description: "Celebrate achievements and see player of the week awards",
      icon: "🏆",
      link: "/awards",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
            🎯 Real-Time Sports Tracking Platform
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              SNU Sports Hub
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The comprehensive sports management platform for Shiv Nadar University. 
            Track live matches, analyze performance, and celebrate athletic excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/features">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Explore Features
              </Button>
            </Link>
            
            <Link to="/registration">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="block">
                <Card className={`${action.color} border-2 transition-all duration-300 hover:scale-105 cursor-pointer h-full`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{action.icon}</span>
                      <CardTitle className="text-xl text-gray-800">{action.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700 text-base">
                      {action.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Updates Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Real-Time Sports Tracking
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Experience live match tracking with instant score updates, player statistics, 
            and comprehensive match analytics across all major sports.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              🏀 Basketball
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              🏏 Cricket
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              ⚽ Football
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              🏸 Badminton
            </Badge>
          </div>
          <Link to="/features">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full"
            >
              View Live Tracker
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the SNU Sports community and take your athletic journey to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registration">
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-full"
              >
                Register Now
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-3 text-lg rounded-full"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;