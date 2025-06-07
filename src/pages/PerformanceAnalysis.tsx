import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, Target, Users, Calendar, Trophy } from "lucide-react";

const PerformanceAnalysis = () => {
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const sports = [
    { value: "all", label: "All Sports" },
    { value: "basketball", label: "Basketball" },
    { value: "cricket", label: "Cricket" },
    { value: "football", label: "Football" },
    { value: "badminton", label: "Badminton" }
  ];

  const periods = [
    { value: "week", label: "Last Week" },
    { value: "month", label: "Last Month" },
    { value: "semester", label: "This Semester" },
    { value: "year", label: "This Year" }
  ];

  const performanceMetrics = [
    {
      title: "Average Points Per Game",
      value: "24.8",
      change: "+12%",
      trend: "up",
      icon: Target
    },
    {
      title: "Win Rate",
      value: "68%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp
    },
    {
      title: "Player Participation",
      value: "456",
      change: "+23",
      trend: "up",
      icon: Users
    },
    {
      title: "Matches Played",
      value: "89",
      change: "-3",
      trend: "down",
      icon: Calendar
    }
  ];

  const topPerformers = [
    {
      rank: 1,
      name: "Arjun Sharma",
      sport: "Basketball",
      score: "28.5 PPG",
      badge: "🥇"
    },
    {
      rank: 2,
      name: "Priya Patel",
      sport: "Badminton",
      score: "92% Win Rate",
      badge: "🥈"
    },
    {
      rank: 3,
      name: "Rohit Kumar",
      sport: "Cricket",
      score: "45.8 Average",
      badge: "🥉"
    },
    {
      rank: 4,
      name: "Sneha Gupta",
      sport: "Football",
      score: "12 Goals",
      badge: "⭐"
    },
    {
      rank: 5,
      name: "Vikram Singh",
      sport: "Basketball",
      score: "8.2 Assists",
      badge: "⭐"
    }
  ];

  const recentMatches = [
    {
      id: 1,
      sport: "Basketball",
      teams: "Tech Tigers vs Code Crushers",
      score: "78-65",
      date: "Today",
      status: "Completed"
    },
    {
      id: 2,
      sport: "Cricket",
      teams: "Wildcats vs Storm",
      score: "156/7 vs 142/9",
      date: "Yesterday",
      status: "Completed"
    },
    {
      id: 3,
      sport: "Football",
      teams: "Eagles vs Lions",
      score: "2-1",
      date: "2 days ago",
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              📊 Performance Analytics
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              Performance Analysis Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive insights into player performance, team statistics, and match analytics 
              across all sports at SNU.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport.value} value={sport.value}>
                    {sport.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Performance Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className="w-8 h-8 text-blue-600" />
                    <Badge 
                      variant={metric.trend === "up" ? "default" : "secondary"}
                      className={metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {metric.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers and Recent Matches */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Top Performers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer) => (
                    <div key={performer.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{performer.badge}</span>
                        <div>
                          <div className="font-semibold text-gray-800">{performer.name}</div>
                          <div className="text-sm text-gray-600">{performer.sport}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {performer.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span>Recent Matches</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <div key={match.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{match.sport}</Badge>
                        <span className="text-sm text-gray-500">{match.date}</span>
                      </div>
                      <div className="font-semibold text-gray-800 mb-1">{match.teams}</div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-lg text-blue-600">{match.score}</span>
                        <Badge className="bg-green-100 text-green-800">{match.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Analytics */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Advanced Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="font-bold text-lg mb-2">Trend Analysis</h3>
                <p className="text-gray-600">Performance trends over time with predictive insights</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-lg mb-2">Player Comparison</h3>
                <p className="text-gray-600">Head-to-head statistics and performance benchmarks</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-bold text-lg mb-2">Team Analytics</h3>
                <p className="text-gray-600">Comprehensive team performance and strategy insights</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PerformanceAnalysis;