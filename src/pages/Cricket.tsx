
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Cricket = () => {
  const topPlayers = [
    { name: "Raj Sharma", team: "Green Eagles", runs: "485", average: "52.3", wickets: "12", economy: "4.2" },
    { name: "Priya Singh", team: "Royal Warriors", runs: "432", average: "48.0", wickets: "8", economy: "3.9" },
    { name: "Sam Wilson", team: "Thunder Bolts", runs: "398", average: "44.2", wickets: "15", economy: "4.8" },
    { name: "Arjun Patel", team: "Lightning Kings", runs: "367", average: "40.8", wickets: "10", economy: "4.1" },
    { name: "Kavya Reddy", team: "Storm Riders", runs: "324", average: "36.0", wickets: "18", economy: "3.7" }
  ];

  const recentMatches = [
    { date: "Dec 2", team1: "Green Eagles", team2: "Royal Warriors", score1: "187/8", score2: "182/9" },
    { date: "Nov 30", team1: "Thunder Bolts", team2: "Lightning Kings", score1: "205/6", score2: "201/7" },
    { date: "Nov 28", team1: "Storm Riders", team2: "Green Eagles", score1: "156/10", score2: "159/4" },
    { date: "Nov 26", team1: "Royal Warriors", team2: "Thunder Bolts", score1: "178/9", score2: "175/8" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center mb-6 text-green-200 hover:text-white transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              🏏 Cricket Leaderboard
            </h1>
            <p className="text-xl text-green-100">Campus cricket stats and achievements</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Top Players Table */}
        <Card className="border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
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
                  <TableHead className="font-semibold">Runs</TableHead>
                  <TableHead className="font-semibold">Average</TableHead>
                  <TableHead className="font-semibold">Wickets</TableHead>
                  <TableHead className="font-semibold">Economy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPlayers.map((player, index) => (
                  <TableRow key={player.name} className={index === 0 ? "bg-green-50" : ""}>
                    <TableCell className="font-semibold flex items-center">
                      {index === 0 && <span className="text-lg mr-2">👑</span>}
                      {player.name}
                    </TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell className="font-semibold text-green-600">{player.runs}</TableCell>
                    <TableCell>{player.average}</TableCell>
                    <TableCell>{player.wickets}</TableCell>
                    <TableCell>{player.economy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Matches */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Recent Matches 🏏</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recentMatches.map((match, index) => (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-3">{match.date}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <p className="font-semibold text-gray-800">{match.team1}</p>
                      <p className="text-lg font-bold text-green-600">{match.score1}</p>
                    </div>
                    <div className="px-4 text-gray-400 font-bold">VS</div>
                    <div className="text-center flex-1">
                      <p className="font-semibold text-gray-800">{match.team2}</p>
                      <p className="text-lg font-bold text-green-600">{match.score2}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Player of the Week */}
        <Card className="border-green-200 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-6xl">🏏</span>
                  </div>
                  <p className="text-lg opacity-90">Player Photo</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Trophy className="text-green-500 mr-2" size={24} />
                  <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Player of the Week</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Raj Sharma</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-600">Total Runs</span>
                    <span className="font-semibold text-green-600">485</span>
                  </div>
                  <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-600">Batting Average</span>
                    <span className="font-semibold text-green-600">52.3</span>
                  </div>
                  <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-600">Wickets Taken</span>
                    <span className="font-semibold text-green-600">12</span>
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
              Track your cricket matches in real-time with our live scorer!
            </p>
            <Link to="/live-tracker">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                🏏 Start Live Tracker
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Submit Stats CTA */}
        <div className="text-center bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Hit it Out of the Park! 🏏</h3>
          <p className="mb-6 text-green-100">Register your runs, wickets, and bowling stats now</p>
          <Link to="/registration">
            <Button className="bg-white text-green-600 hover:bg-green-50 font-semibold">
              Submit Your Cricket Form
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cricket;
