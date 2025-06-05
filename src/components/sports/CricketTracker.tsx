import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";

interface Game {
  id: string;
  sport: string;
  team_a_name: string;
  team_b_name: string;
  team_a_score: number;
  team_b_score: number;
  current_overs?: number;
  team_a_batsman_outs?: number;
  team_b_batsman_outs?: number;
  status: string;
}

interface CricketTrackerProps {
  game: Game;
  onUpdate: (gameId: string, updates: Partial<Game>) => void;
}

export const CricketTracker = ({ game, onUpdate }: CricketTrackerProps) => {
  const updateScore = (team: 'a' | 'b', increment: number) => {
    const updates = team === 'a' 
      ? { team_a_score: Math.max(0, game.team_a_score + increment) }
      : { team_b_score: Math.max(0, game.team_b_score + increment) };
    onUpdate(game.id, updates);
  };

  const updateOvers = (increment: number) => {
    const newOvers = Math.max(0, (game.current_overs || 0) + increment);
    onUpdate(game.id, { current_overs: newOvers });
  };

  const updateOuts = (team: 'a' | 'b', increment: number) => {
    const field = team === 'a' ? 'team_a_batsman_outs' : 'team_b_batsman_outs';
    const currentOuts = team === 'a' ? (game.team_a_batsman_outs || 0) : (game.team_b_batsman_outs || 0);
    const newOuts = Math.max(0, Math.min(10, currentOuts + increment));
    onUpdate(game.id, { [field]: newOuts });
  };

  return (
    <div className="space-y-6">
      {/* Main Scoreboard */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold">🏏 CRICKET MATCH</CardTitle>
          <Badge className="bg-white/20 text-white mx-auto">
            Overs: {(game.current_overs || 0).toFixed(1)}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            {/* Team A */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{game.team_a_name}</h2>
              <div className="text-6xl font-bold mb-4">{game.team_a_score}</div>
              <div className="text-lg mb-4">Wickets: {game.team_a_batsman_outs || 0}/10</div>
              
              {/* Score Buttons */}
              <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-4">
                <Button
                  onClick={() => updateScore('a', 1)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +1
                </Button>
                <Button
                  onClick={() => updateScore('a', 4)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +4
                </Button>
                <Button
                  onClick={() => updateScore('a', 6)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +6
                </Button>
              </div>
              
              {/* Wicket Controls */}
              <div className="flex gap-1 sm:gap-2 justify-center items-center">
                <Button
                  onClick={() => updateOuts('a', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="px-2 sm:px-3 py-1 bg-white/20 rounded text-xs sm:text-sm">Wickets</span>
                <Button
                  onClick={() => updateOuts('a', 1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* Team B */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{game.team_b_name}</h2>
              <div className="text-6xl font-bold mb-4">{game.team_b_score}</div>
              <div className="text-lg mb-4">Wickets: {game.team_b_batsman_outs || 0}/10</div>
              
              {/* Score Buttons */}
              <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-4">
                <Button
                  onClick={() => updateScore('b', 1)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +1
                </Button>
                <Button
                  onClick={() => updateScore('b', 4)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +4
                </Button>
                <Button
                  onClick={() => updateScore('b', 6)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +6
                </Button>
              </div>
              
              {/* Wicket Controls */}
              <div className="flex gap-1 sm:gap-2 justify-center items-center">
                <Button
                  onClick={() => updateOuts('b', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="px-2 sm:px-3 py-1 bg-white/20 rounded text-xs sm:text-sm">Wickets</span>
                <Button
                  onClick={() => updateOuts('b', 1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overs Control */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Overs Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => updateOvers(-0.1)}
              disabled={game.status !== 'active'}
              variant="outline"
              size="lg"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <div className="text-3xl font-bold px-6 py-2 bg-green-100 rounded-lg">
              {(game.current_overs || 0).toFixed(1)}
            </div>
            <Button
              onClick={() => updateOvers(0.1)}
              disabled={game.status !== 'active'}
              variant="outline"
              size="lg"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Click to increment/decrement by 0.1 overs
          </p>
        </CardContent>
      </Card>
    </div>
  );
};