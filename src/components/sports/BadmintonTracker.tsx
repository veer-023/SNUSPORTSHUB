import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, Square, Trophy } from "lucide-react";

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
  total_sets?: number; // 3, 5, or 7
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
    const maxSets = Math.ceil((game.total_sets || 3) / 2); // Best of X sets
    const newSets = Math.max(0, Math.min(maxSets, currentSets + increment));
    onUpdate(game.id, { [field]: newSets });
  };

  const updateCurrentSet = (increment: number) => {
    const newSet = Math.max(1, Math.min((game.total_sets || 3), (game.current_set || 1) + increment));
    onUpdate(game.id, { current_set: newSet });
  };

  const updateTotalSets = (totalSets: number) => {
    onUpdate(game.id, { total_sets: totalSets });
  };

  const endGame = () => {
    onUpdate(game.id, { status: 'finished' });
  };

  return (
    <div className="space-y-6">
      {/* Main Scoreboard */}
      <Card className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-transparent"></div>
        <div className="absolute top-4 right-4 text-8xl opacity-10">🏸</div>
        
        <CardHeader className="text-center pb-4 relative z-10">
          <CardTitle className="text-3xl font-bold mb-2">🏸 BADMINTON MATCH</CardTitle>
          <div className="flex justify-center gap-4">
            <Badge className="bg-white/20 text-white">
              Set {game.current_set || 1} of {game.total_sets || 3}
            </Badge>
            <Badge className="bg-white/20 text-white">
              Best of {game.total_sets || 3}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 gap-8">
            {/* Team A */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{game.team_a_name}</h2>
              <div className="text-7xl font-bold mb-4">{game.team_a_score}</div>
              <div className="text-lg mb-6">Sets Won: {game.team_a_sets || 0}</div>
              
              {/* Score Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => updateScore('a', 1)}
                    disabled={game.status !== 'active'}
                    className="bg-white/20 hover:bg-white/30 text-white text-lg font-bold px-6 py-3"
                  >
                    +1
                  </Button>
                  <Button
                    onClick={() => updateScore('a', -1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg font-bold px-6 py-3"
                  >
                    -1
                  </Button>
                </div>
                
                {/* Sets Control */}
                <div className="flex gap-2 justify-center items-center">
                  <Button
                    onClick={() => updateSets('a', -1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-3 py-1 bg-white/20 rounded text-sm">Sets</span>
                  <Button
                    onClick={() => updateSets('a', 1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Team B */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{game.team_b_name}</h2>
              <div className="text-7xl font-bold mb-4">{game.team_b_score}</div>
              <div className="text-lg mb-6">Sets Won: {game.team_b_sets || 0}</div>
              
              {/* Score Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => updateScore('b', 1)}
                    disabled={game.status !== 'active'}
                    className="bg-white/20 hover:bg-white/30 text-white text-lg font-bold px-6 py-3"
                  >
                    +1
                  </Button>
                  <Button
                    onClick={() => updateScore('b', -1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg font-bold px-6 py-3"
                  >
                    -1
                  </Button>
                </div>
                
                {/* Sets Control */}
                <div className="flex gap-2 justify-center items-center">
                  <Button
                    onClick={() => updateSets('b', -1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-3 py-1 bg-white/20 rounded text-sm">Sets</span>
                  <Button
                    onClick={() => updateSets('b', 1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Control */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Match Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Total Sets (Best of)</label>
              <Select 
                value={(game.total_sets || 3).toString()} 
                onValueChange={(value) => updateTotalSets(parseInt(value))}
                disabled={game.status !== 'active'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Best of 3</SelectItem>
                  <SelectItem value="5">Best of 5</SelectItem>
                  <SelectItem value="7">Best of 7</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={endGame} 
              disabled={game.status !== 'active'}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <Square className="w-4 h-4 mr-2" />
              End Game
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              Set Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                onClick={() => updateCurrentSet(-1)}
                disabled={game.status !== 'active'}
                variant="outline"
                size="lg"
              >
                <Minus className="w-5 h-5" />
              </Button>
              <div className="text-3xl font-bold px-6 py-2 bg-purple-100 rounded-lg text-purple-800">
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
            <p className="text-center text-sm text-gray-600">
              Current Set (1-{game.total_sets || 3})
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Game Summary */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Game Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">{game.team_a_name}</h3>
              <div className="bg-gray-50 p-3 rounded space-y-1">
                <div>Current Points: <span className="font-bold text-purple-600">{game.team_a_score}</span></div>
                <div>Sets Won: <span className="font-bold text-purple-600">{game.team_a_sets || 0}</span></div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">{game.team_b_name}</h3>
              <div className="bg-gray-50 p-3 rounded space-y-1">
                <div>Current Points: <span className="font-bold text-purple-600">{game.team_b_score}</span></div>
                <div>Sets Won: <span className="font-bold text-purple-600">{game.team_b_sets || 0}</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};