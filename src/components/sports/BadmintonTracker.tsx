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
  team_a_sets?: number;
  team_b_sets?: number;
  current_set?: number;
  team_a_games_current_set?: number;
  team_b_games_current_set?: number;
  status: string;
}

interface BadmintonTrackerProps {
  game: Game;
  onUpdate: (gameId: string, updates: Partial<Game>) => void;
}

export const BadmintonTracker = ({ game, onUpdate }: BadmintonTrackerProps) => {
  const updateScore = (team: 'a' | 'b', increment: number) => {
    const updates = team === 'a' 
      ? { team_a_score: Math.max(0, game.team_a_score + increment) }
      : { team_b_score: Math.max(0, game.team_b_score + increment) };
    onUpdate(game.id, updates);
  };

  const updateSets = (team: 'a' | 'b', increment: number) => {
    const field = team === 'a' ? 'team_a_sets' : 'team_b_sets';
    const currentSets = team === 'a' ? (game.team_a_sets || 0) : (game.team_b_sets || 0);
    const newSets = Math.max(0, Math.min(3, currentSets + increment));
    onUpdate(game.id, { [field]: newSets });
  };

  const updateCurrentSetGames = (team: 'a' | 'b', increment: number) => {
    const field = team === 'a' ? 'team_a_games_current_set' : 'team_b_games_current_set';
    const currentGames = team === 'a' ? (game.team_a_games_current_set || 0) : (game.team_b_games_current_set || 0);
    const newGames = Math.max(0, currentGames + increment);
    onUpdate(game.id, { [field]: newGames });
  };

  const updateCurrentSet = (increment: number) => {
    const newSet = Math.max(1, Math.min(5, (game.current_set || 1) + increment));
    onUpdate(game.id, { current_set: newSet });
  };

  return (
    <div className="space-y-6">
      {/* Main Scoreboard */}
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold">🏸 BADMINTON MATCH</CardTitle>
          <Badge className="bg-white/20 text-white mx-auto">
            Set {game.current_set || 1} of 3
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            {/* Team A */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{game.team_a_name}</h2>
              <div className="text-6xl font-bold mb-4">{game.team_a_score}</div>
              <div className="space-y-2 mb-4">
                <div className="text-lg">Sets Won: {game.team_a_sets || 0}</div>
                <div className="text-sm">Games in Current Set: {game.team_a_games_current_set || 0}</div>
              </div>
              
              {/* Score Buttons */}
              <div className="mb-4">
                <Button
                  onClick={() => updateScore('a', 1)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-lg font-bold px-8 py-3"
                >
                  +1 Point
                </Button>
              </div>
              
              {/* Sets Control */}
              <div className="flex gap-2 justify-center mb-2">
                <Button
                  onClick={() => updateSets('a', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1 bg-white/20 rounded text-sm">Sets</span>
                <Button
                  onClick={() => updateSets('a', 1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Games Control */}
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => updateCurrentSetGames('a', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1 bg-white/20 rounded text-sm">Games</span>
                <Button
                  onClick={() => updateCurrentSetGames('a', 1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Team B */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{game.team_b_name}</h2>
              <div className="text-6xl font-bold mb-4">{game.team_b_score}</div>
              <div className="space-y-2 mb-4">
                <div className="text-lg">Sets Won: {game.team_b_sets || 0}</div>
                <div className="text-sm">Games in Current Set: {game.team_b_games_current_set || 0}</div>
              </div>
              
              {/* Score Buttons */}
              <div className="mb-4">
                <Button
                  onClick={() => updateScore('b', 1)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-lg font-bold px-8 py-3"
                >
                  +1 Point
                </Button>
              </div>
              
              {/* Sets Control */}
              <div className="flex gap-2 justify-center mb-2">
                <Button
                  onClick={() => updateSets('b', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1 bg-white/20 rounded text-sm">Sets</span>
                <Button
                  onClick={() => updateSets('b', 1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Games Control */}
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => updateCurrentSetGames('b', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1 bg-white/20 rounded text-sm">Games</span>
                <Button
                  onClick={() => updateCurrentSetGames('b', 1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Set Control */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Set Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => updateCurrentSet(-1)}
              disabled={game.status !== 'active'}
              variant="outline"
              size="lg"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <div className="text-3xl font-bold px-6 py-2 bg-purple-100 rounded-lg">
              Set {game.current_set || 1}
            </div>
            <Button
              onClick={() => updateCurrentSet(1)}
              disabled={game.status !== 'active'}
              variant="outline"
              size="lg"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Current Set (1-5, best of 3 or 5)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};