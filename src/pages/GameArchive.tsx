import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Game {
  id: string;
  sport: string;
  team_a_name: string;
  team_b_name: string;
  team_a_score: number;
  team_b_score: number;
  status: string;
  created_at: string;
}

const GameArchive = () => {
  const [finishedGames, setFinishedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const sportColors = {
    cricket: "from-green-500 to-green-600",
    basketball: "from-orange-500 to-orange-600", 
    football: "from-blue-500 to-blue-600",
    badminton: "from-purple-500 to-purple-600"
  };

  useEffect(() => {
    fetchFinishedGames();
  }, []);

  const fetchFinishedGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('status', 'finished')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFinishedGames((data || []) as Game[]);
    } catch (error) {
      console.error('Error fetching finished games:', error);
      toast({
        title: "Error",
        description: "Failed to fetch game archive",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getWinner = (game: Game) => {
    if (game.team_a_score > game.team_b_score) {
      return {
        winner: game.team_a_name,
        loser: game.team_b_name,
        winnerScore: game.team_a_score,
        loserScore: game.team_b_score,
        margin: game.team_a_score - game.team_b_score
      };
    } else if (game.team_b_score > game.team_a_score) {
      return {
        winner: game.team_b_name,
        loser: game.team_a_name,
        winnerScore: game.team_b_score,
        loserScore: game.team_a_score,
        margin: game.team_b_score - game.team_a_score
      };
    } else {
      return {
        winner: "Tie",
        loser: "",
        winnerScore: game.team_a_score,
        loserScore: game.team_b_score,
        margin: 0
      };
    }
  };

  const getSportEmoji = (sport: string) => {
    switch (sport) {
      case 'basketball': return '🏀';
      case 'football': return '⚽';
      case 'cricket': return '🏏';
      case 'badminton': return '🏸';
      default: return '🏆';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading game archive...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link to="/live-tracker">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Tracker
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
              <Trophy className="w-10 h-10" />
              Game Archive
            </h1>
            <div></div>
          </div>
          <p className="text-lg text-gray-600">Complete history of finished games</p>
        </div>

        {/* Games Archive */}
        <div className="grid gap-6">
          {finishedGames.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="text-center py-12">
                <p className="text-gray-500 text-lg">No finished games yet. Complete some games to see them here!</p>
              </CardContent>
            </Card>
          ) : (
            finishedGames.map((game) => {
              const result = getWinner(game);
              return (
                <Card key={game.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className={`bg-gradient-to-r ${sportColors[game.sport]} text-white`}>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {getSportEmoji(game.sport)}
                        {game.sport.toUpperCase()} MATCH
                      </CardTitle>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        FINISHED
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      {/* Team A */}
                      <div className="text-center">
                        <h3 className={`font-bold text-lg mb-2 ${result.winner === game.team_a_name ? 'text-green-600' : 'text-gray-600'}`}>
                          {game.team_a_name}
                          {result.winner === game.team_a_name && ' 🏆'}
                        </h3>
                        <div className={`text-4xl font-bold mb-2 ${result.winner === game.team_a_name ? 'text-green-600' : 'text-gray-500'}`}>
                          {game.team_a_score}
                        </div>
                      </div>

                      {/* VS and Result */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400 mb-2">VS</div>
                        {result.winner !== "Tie" ? (
                          <div className="text-sm text-gray-600">
                            <div className="font-semibold text-green-600">{result.winner} wins</div>
                            <div>by {result.margin} point{result.margin !== 1 ? 's' : ''}</div>
                          </div>
                        ) : (
                          <div className="text-sm font-semibold text-gray-600">TIE GAME</div>
                        )}
                      </div>

                      {/* Team B */}
                      <div className="text-center">
                        <h3 className={`font-bold text-lg mb-2 ${result.winner === game.team_b_name ? 'text-green-600' : 'text-gray-600'}`}>
                          {game.team_b_name}
                          {result.winner === game.team_b_name && ' 🏆'}
                        </h3>
                        <div className={`text-4xl font-bold mb-2 ${result.winner === game.team_b_name ? 'text-green-600' : 'text-gray-500'}`}>
                          {game.team_b_score}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Completed: {new Date(game.created_at).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GameArchive;