
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Football = () => {
  const topPlayers = [
    { name: "Diego Lopez", team: "Blue Tigers", goals: "15", assists: "8", matches: "12", minutes: "1080" },
    { name: "Emma Taylor", team: "Silver Wolves", goals: "12", assists: "10", matches: "11", minutes: "990" },
    { name: "Ryan Park", team: "Storm Eagles", goals: "11", assists: "6", matches: "13", minutes: "1170" },
    { name: "Sofia Martinez", team: "Lightning FC", goals: "9", assists: "12", matches: "10", minutes: "900" },
    { name: "Kai Johnson", team: "Thunder United", goals: "8", assists: "7", matches: "11", minutes: "1045" }
  ];

  const recentMatches = [
    { date: "Dec 1", team1: "Blue Tigers", team2: "Silver Wolves", score1: 3, score2: 1 },
    { date: "Nov 29", team1: "Storm Eagles", team2: "Lightning FC", score1: 2, score2: 2 },
    { date: "Nov 27", team1: "Thunder United", team2: "Blue Tigers", score1: 0, score2: 4 },
    { date: "Nov 25", team1: "Silver Wolves", team2: "Storm Eagles", score1: 1, score2: 3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-gray-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center mb-6 text-blue-200 hover:text-white transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              ⚽ Football Leaderboard
            </h1>
            <p className="text-xl text-blue-100">Campus football stats and match results</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Top Players Table */}
        <Card className="border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
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
                  <TableHead className="font-semibold">Goals</TableHead>
                  <TableHead className="font-semibold">Assists</TableHead>
                  <TableHead className="font-semibold">Matches</TableHead>
                  <TableHead className="font-semibold">Minutes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPlayers.map((player, index) => (
                  <TableRow key={player.name} className={index === 0 ? "bg-blue-50" : ""}>
                    <TableCell className="font-semibold flex items-center">
                      {index === 0 && <span className="text-lg mr-2">👑</span>}
                      {player.name}
                    </TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell className="font-semibold text-blue-600">{player.goals}</TableCell>
                    <TableCell>{player.assists}</TableCell>
                    <TableCell>{player.matches}</TableCell>
                    <TableCell>{player.minutes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Matches */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Recent Matches ⚽</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recentMatches.map((match, index) => (
              <Card key={index} className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-3">{match.date}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <p className="font-semibold text-gray-800">{match.team1}</p>
                      <p className="text-2xl font-bold text-blue-600">{match.score1}</p>
                    </div>
                    <div className="px-4 text-gray-400 font-bold">VS</div>
                    <div className="text-center flex-1">
                      <p className="font-semibold text-gray-800">{match.team2}</p>
                      <p className="text-2xl font-bold text-blue-600">{match.score2}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Player of the Week */}
        <Card className="border-blue-200 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-600 to-gray-700 text-white p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-6xl">⚽</span>
                  </div>
                  <p className="text-lg opacity-90">Player Photo</p>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Trophy className="text-blue-500 mr-2" size={24} />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Player of the Week</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Diego Lopez</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-600">Goals Scored</span>
                    <span className="font-semibold text-blue-600">15</span>
                  </div>
                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-600">Assists</span>
                    <span className="font-semibold text-blue-600">8</span>
                  </div>
                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-600">Matches Played</span>
                    <span className="font-semibold text-blue-600">12</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Stats CTA */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Submit Your Football Stats! ⚽</h3>
          <p className="mb-6 text-blue-100">Track goals, assists, and match performance</p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
            <ExternalLink className="mr-2" size={20} />
            Submit Stats via Google Form
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Football;
