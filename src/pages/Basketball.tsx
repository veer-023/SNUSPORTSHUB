
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Basketball = () => {
  const topPlayers = [
    { name: "Alex Chen", team: "Thunder Hawks", ppg: "28.5", rebounds: "11.2", assists: "6.8", fg: "67.8%" },
    { name: "Maya Patel", team: "Storm Eagles", ppg: "24.2", rebounds: "8.9", assists: "9.1", fg: "61.4%" },
    { name: "Jordan Kim", team: "Fire Lions", ppg: "22.8", rebounds: "10.5", assists: "5.2", fg: "58.9%" },
    { name: "Sam Rodriguez", team: "Ice Wolves", ppg: "21.3", rebounds: "7.8", assists: "7.9", fg: "63.2%" },
    { name: "Taylor Johnson", team: "Wind Tigers", ppg: "20.9", rebounds: "9.4", assists: "4.6", fg: "55.1%" }
  ];

  const recentMatches = [
    { date: "Dec 1", team1: "Thunder Hawks", team2: "Storm Eagles", score1: 87, score2: 82 },
    { date: "Nov 29", team1: "Fire Lions", team2: "Ice Wolves", score1: 94, score2: 89 },
    { date: "Nov 27", team1: "Wind Tigers", team2: "Thunder Hawks", score1: 76, score2: 91 },
    { date: "Nov 25", team1: "Storm Eagles", team2: "Fire Lions", score1: 83, score2: 79 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center mb-6 text-orange-200 hover:text-white transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              🏀 Basketball Leaderboard
            </h1>
            <p className="text-xl text-orange-100">Campus basketball excellence tracked live</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Top Players Table */}
        <Card className="border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
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
                  <TableHead className="font-semibold">PPG</TableHead>
                  <TableHead className="font-semibold">Rebounds</TableHead>
                  <TableHead className="font-semibold">Assists</TableHead>
                  <TableHead className="font-semibold">FG%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPlayers.map((player, index) => (
                  <TableRow key={player.name} className={index === 0 ? "bg-orange-50" : ""}>
                    <TableCell className="font-semibold flex items-center">
                      {index === 0 && <span className="text-lg mr-2">👑</span>}
                      {player.name}
                    </TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell className="font-semibold text-orange-600">{player.ppg}</TableCell>
                    <TableCell>{player.rebounds}</TableCell>
                    <TableCell>{player.assists}</TableCell>
                    <TableCell>{player.fg}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Matches */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Recent Matches 🔥</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recentMatches.map((match, index) => (
              <Card key={index} className="border-orange-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-3">{match.date}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <p className="font-semibold text-gray-800">{match.team1}</p>
                      <p className="text-2xl font-bold text-orange-600">{match.score1}</p>
                    </div>
                    <div className="px-4 text-gray-400 font-bold">VS</div>
                    <div className="text-center flex-1">
                      <p className="font-semibold text-gray-800">{match.team2}</p>
                      <p className="text-2xl font-bold text-orange-600">{match.score2}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Player of the Week */}
        <Card className="border-orange-200 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-6xl">🏀</span>
                  </div>
                  <p className="text-lg opacity-90">Player Photo</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Trophy className="text-orange-500 mr-2" size={24} />
                  <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Player of the Week</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Alex Chen</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-600">Average Points</span>
                    <span className="font-semibold text-orange-600">31.2 PPG</span>
                  </div>
                  <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-600">Field Goal %</span>
                    <span className="font-semibold text-orange-600">67.8%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-600">Games Won</span>
                    <span className="font-semibold text-orange-600">4/5</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Stats CTA */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Submit Your Basketball Stats! 📊</h3>
          <p className="mb-6 text-orange-100">Help us track campus basketball excellence</p>
          <Button className="bg-white text-orange-600 hover:bg-orange-50 font-semibold">
            <ExternalLink className="mr-2" size={20} />
            Submit Stats via Google Form
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Basketball;
