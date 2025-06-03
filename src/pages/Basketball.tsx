import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { Trophy, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Basketball = () => {
  const topPlayers = [
    { rank: 1, name: "Alex Chen", team: "Phoenix", points: 28.5, rebounds: 8.2, assists: 6.1, games: 12 },
    { rank: 2, name: "Maya Patel", team: "Eagles", points: 24.2, rebounds: 9.8, assists: 7.3, games: 11 },
    { rank: 3, name: "Jordan Kim", team: "Lions", points: 22.8, rebounds: 6.5, assists: 8.9, games: 12 },
    { rank: 4, name: "Sam Rodriguez", team: "Tigers", points: 21.4, rebounds: 7.1, assists: 5.8, games: 10 },
    { rank: 5, name: "Taylor Johnson", team: "Hawks", points: 20.9, rebounds: 8.8, assists: 6.4, games: 11 }
  ];

  const recentMatches = [
    { date: "Dec 1", team1: "Phoenix", team2: "Eagles", score1: 78, score2: 72 },
    { date: "Nov 29", team1: "Lions", team2: "Tigers", score1: 85, score2: 81 },
    { date: "Nov 27", team1: "Hawks", team2: "Phoenix", score1: 69, score2: 74 },
    { date: "Nov 25", team1: "Eagles", team2: "Lions", score1: 88, score2: 92 }
  ];

  const playerTrends = [
    { game: "Game 1", alex: 25, maya: 22, jordan: 20 },
    { game: "Game 2", alex: 31, maya: 26, jordan: 24 },
    { game: "Game 3", alex: 28, maya: 24, jordan: 26 },
    { game: "Game 4", alex: 33, maya: 28, jordan: 22 },
    { game: "Game 5", alex: 29, maya: 25, jordan: 25 }
  ];

  const teamStats = [
    { team: "Phoenix", wins: 8, losses: 2, avg: 76.5 },
    { team: "Lions", wins: 7, losses: 3, avg: 78.2 },
    { team: "Eagles", wins: 6, losses: 4, avg: 74.8 },
    { team: "Tigers", wins: 5, losses: 5, avg: 72.1 },
    { team: "Hawks", wins: 4, losses: 6, avg: 69.3 }
  ];

  const chartConfig = {
    alex: { label: "Alex Chen", color: "#f97316" },
    maya: { label: "Maya Patel", color: "#3b82f6" },
    jordan: { label: "Jordan Kim", color: "#22c55e" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-black/5">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Link to="/">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 flex items-center justify-center">
              🏀 Basketball Leaderboard
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Track the hottest players and teams dominating the court
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Performance Trends Chart */}
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              📈 Top Player Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={playerTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="alex" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="maya" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="jordan" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Top Players Table */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Trophy className="mr-2" size={20} />
                Top Players
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>PPG</TableHead>
                    <TableHead>RPG</TableHead>
                    <TableHead>APG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPlayers.map((player) => (
                    <TableRow key={player.rank} className="hover:bg-orange-50">
                      <TableCell className="font-bold">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
                          player.rank === 1 ? 'bg-yellow-500' : 
                          player.rank === 2 ? 'bg-gray-400' : 
                          player.rank === 3 ? 'bg-orange-400' : 'bg-gray-300'
                        }`}>
                          {player.rank}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell>{player.team}</TableCell>
                      <TableCell className="font-semibold text-orange-600">{player.points}</TableCell>
                      <TableCell>{player.rebounds}</TableCell>
                      <TableCell>{player.assists}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Team Standings Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Team Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-64">
                <BarChart data={teamStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="team" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="wins" fill="#22c55e" />
                  <Bar dataKey="losses" fill="#ef4444" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Matches */}
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Matches 🔥</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentMatches.map((match, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border">
                  <div className="text-sm text-gray-600 mb-2">{match.date}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="font-semibold">{match.team1}</div>
                      <div className={`text-2xl font-bold ${match.score1 > match.score2 ? 'text-green-600' : 'text-gray-600'}`}>
                        {match.score1}
                      </div>
                    </div>
                    <div className="text-gray-400 font-bold">VS</div>
                    <div className="text-center">
                      <div className="font-semibold">{match.team2}</div>
                      <div className={`text-2xl font-bold ${match.score2 > match.score1 ? 'text-green-600' : 'text-gray-600'}`}>
                        {match.score2}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Player of the Week */}
        <Card className="mb-12 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🏀</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Player of the Week</h3>
                  <div className="text-lg opacity-90">Alex Chen</div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-600">Average Points</span>
                    <span className="font-bold text-orange-600">31.2 PPG</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-600">Field Goal %</span>
                    <span className="font-bold text-orange-600">67.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-600">Games Won</span>
                    <span className="font-bold text-orange-600">4/4</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-6 italic">
                  "Incredible shooting performance this week! Alex led Phoenix to 4 straight victories." 🔥
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stat Submission CTA */}
        <Card className="text-center shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Submit Your Stats 📊</h3>
            <p className="text-gray-600 mb-6">
              Got game stats to share? Help us keep the leaderboard updated!
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              onClick={() => window.open('https://forms.google.com/basketball-stats', '_blank')}
            >
              Submit Basketball Stats 🏀
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Basketball;
