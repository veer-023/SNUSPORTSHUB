
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Badminton = () => {
  const topPlayers = [
    { name: "Li Wei", team: "Purple Dragons", wins: "23", losses: "2", points: "587", streak: "8" },
    { name: "Anna Kumar", team: "White Eagles", wins: "21", losses: "3", points: "542", streak: "5" },
    { name: "Chris Jones", team: "Violet Hawks", wins: "19", losses: "4", points: "498", streak: "3" },
    { name: "Maya Tanaka", team: "Silver Phoenixes", wins: "18", losses: "5", points: "467", streak: "6" },
    { name: "Alex Rivera", team: "Royal Smashers", wins: "17", losses: "6", points: "445", streak: "2" }
  ];

  const recentMatches = [
    { date: "Dec 2", team1: "Purple Dragons", team2: "White Eagles", score1: "21-18, 21-16", score2: "15-21, 18-21" },
    { date: "Nov 30", team1: "Violet Hawks", team2: "Silver Phoenixes", score1: "21-19, 18-21, 21-17", score2: "17-21, 21-18, 19-21" },
    { date: "Nov 28", team1: "Royal Smashers", team2: "Purple Dragons", score1: "12-21, 16-21", score2: "21-12, 21-16" },
    { date: "Nov 26", team1: "White Eagles", team2: "Violet Hawks", score1: "21-15, 21-13", score2: "15-21, 13-21" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center mb-6 text-purple-200 hover:text-white transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              🏸 Badminton Leaderboard
            </h1>
            <p className="text-xl text-purple-100">Campus badminton champions and rankings</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Top Players Table */}
        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardTitle className="flex items-center text-2xl">
              <Trophy className="mr-2" />
              Top Players
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Player</TableHead>
                  <TableHead className="font-semibold">Team</TableHead>
                  <TableHead className="font-semibold">Wins</TableHead>
                  <TableHead className="font-semibold">Losses</TableHead>
                  <TableHead className="font-semibold">Points</TableHead>
                  <TableHead className="font-semibold">Win Streak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPlayers.map((player, index) => (
                  <TableRow key={player.name} className={index === 0 ? "bg-purple-50" : ""}>
                    <TableCell className="font-semibold flex items-center">
                      {index === 0 && <span className="text-lg mr-2">👑</span>}
                      {player.name}
                    </TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell className="font-semibold text-purple-600">{player.wins}</TableCell>
                    <TableCell>{player.losses}</TableCell>
                    <TableCell>{player.points}</TableCell>
                    <TableCell className="text-green-600 font-semibold">{player.streak}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Matches */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Recent Matches 🏸</h2>
          <div className="grid md:grid-cols-1 gap-6">
            {recentMatches.map((match, index) => (
              <Card key={index} className="border-purple-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-3">{match.date}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <p className="font-semibold text-gray-800">{match.team1}</p>
                      <p className="text-sm font-bold text-purple-600">{match.score1}</p>
                    </div>
                    <div className="px-4 text-gray-400 font-bold">VS</div>
                    <div className="text-center flex-1">
                      <p className="font-semibold text-gray-800">{match.team2}</p>
                      <p className="text-sm font-bold text-purple-600">{match.score2}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Player of the Week */}
        <Card className="border-purple-200 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-6xl">🏸</span>
                  </div>
                  <p className="text-lg opacity-90">Player Photo</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Trophy className="text-purple-500 mr-2" size={24} />
                  <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Player of the Week</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Li Wei</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-600">Win-Loss Record</span>
                    <span className="font-semibold text-purple-600">23-2</span>
                  </div>
                  <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-600">Total Points</span>
                    <span className="font-semibold text-purple-600">587</span>
                  </div>
                  <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-600">Current Win Streak</span>
                    <span className="font-semibold text-purple-600">8 matches</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Tracker CTA */}
        <Card className="text-center shadow-lg mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Start Live Tracking 🔴</h3>
            <p className="text-gray-600 mb-6">
              Track your badminton matches in real-time with our live scorer!
            </p>
            <Link to="/live-tracker">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                🏸 Start Live Tracker
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Submit Stats CTA */}
        <div className="text-center bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Smash Your Way to Glory! 🏸</h3>
          <p className="mb-6 text-purple-100">Register your wins, matches, and tournament achievements</p>
          <Link to="/registration">
            <Button className="bg-white text-purple-600 hover:bg-purple-50 font-semibold">
              Submit Your Badminton Form
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Badminton;
