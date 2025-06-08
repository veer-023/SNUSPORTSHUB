import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Plus, Minus } from "lucide-react";

interface Game {
  id: string;
  sport: string;
  team_a_name: string;
  team_b_name: string;
  team_a_score: number;
  team_b_score: number;
  game_clock_minutes: number;
  game_clock_seconds: number;
  clock_running: boolean;
  current_half?: number;
  team_a_fouls?: number;
  team_b_fouls?: number;
  team_a_red_cards?: number;
  team_b_red_cards?: number;
  status: string;
}

interface FootballTrackerProps {
  game: Game;
  onUpdate: (gameId: string, updates: Partial<Game>) => void;
}

export const FootballTracker = ({ game, onUpdate }: FootballTrackerProps) => {
  const [localTime, setLocalTime] = useState({
    minutes: game.game_clock_minutes,
    seconds: game.game_clock_seconds
  });

  useEffect(() => {
    setLocalTime({
      minutes: game.game_clock_minutes,
      seconds: game.game_clock_seconds
    });
  }, [game.game_clock_minutes, game.game_clock_seconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (game.clock_running && game.status === 'active') {
      interval = setInterval(() => {
        setLocalTime(prev => {
          const newSeconds = prev.seconds + 1;
          const newMinutes = prev.minutes + Math.floor(newSeconds / 60);
          const finalSeconds = newSeconds % 60;
          
          // Update database every 5 seconds or when minutes change
          if (finalSeconds % 5 === 0 || finalSeconds === 0) {
            onUpdate(game.id, {
              game_clock_minutes: newMinutes,
              game_clock_seconds: finalSeconds
            });
          }
          
          return {
            minutes: newMinutes,
            seconds: finalSeconds
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [game.clock_running, game.status, game.id, onUpdate]);

  const updateScore = (team: 'a' | 'b', goals: number) => {
    const updates = team === 'a' 
      ? { team_a_score: Math.max(0, game.team_a_score + goals) }
      : { team_b_score: Math.max(0, game.team_b_score + goals) };
    onUpdate(game.id, updates);
  };

  const updateFouls = (team: 'a' | 'b', increment: number) => {
    const field = team === 'a' ? 'team_a_fouls' : 'team_b_fouls';
    const currentFouls = team === 'a' ? (game.team_a_fouls || 0) : (game.team_b_fouls || 0);
    const newFouls = Math.max(0, currentFouls + increment);
    onUpdate(game.id, { [field]: newFouls });
  };

  const updateRedCards = (team: 'a' | 'b', increment: number) => {
    const field = team === 'a' ? 'team_a_red_cards' : 'team_b_red_cards';
    const currentCards = team === 'a' ? (game.team_a_red_cards || 0) : (game.team_b_red_cards || 0);
    const newCards = Math.max(0, currentCards + increment);
    onUpdate(game.id, { [field]: newCards });
  };

  const toggleClock = () => {
    onUpdate(game.id, { clock_running: !game.clock_running });
  };

  const updateHalf = (increment: number) => {
    const newHalf = Math.max(1, Math.min(6, (game.current_half || 1) + increment));
    onUpdate(game.id, { current_half: newHalf });
  };

  return (
    <div className="space-y-6">
      {/* Main Scoreboard */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold">⚽ FOOTBALL MATCH</CardTitle>
          <div className="flex justify-center items-center gap-4">
            <Badge className="bg-white/20 text-white">
              {game.current_half === 1 ? '1st Half' : '2nd Half'}
            </Badge>
            <div className="text-4xl font-mono font-bold">
              {String(localTime.minutes).padStart(2, '0')}:{String(localTime.seconds).padStart(2, '0')}
            </div>
            <Button
              onClick={toggleClock}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              {game.clock_running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            {/* Team A */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{game.team_a_name}</h2>
              <div className="text-6xl font-bold mb-4">{game.team_a_score}</div>
              <div className="space-y-1 mb-4 text-sm">
                <div>Fouls: {game.team_a_fouls || 0}</div>
                <div className="text-red-300">Red Cards: {game.team_a_red_cards || 0}</div>
              </div>
              
              {/* Score Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button
                  onClick={() => updateScore('a', 1)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2"
                >
                  ⚽ +1
                </Button>
                <Button
                  onClick={() => updateScore('a', -1)}
                  disabled={game.status !== 'active'}
                  className="bg-red-500/30 hover:bg-red-500/50 text-white font-bold py-2"
                >
                  -1
                </Button>
              </div>
              
              {/* Foul & Card Controls */}
              <div className="space-y-2">
                <div className="flex gap-2 justify-center items-center">
                  <Button
                    onClick={() => updateFouls('a', -1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="px-3 py-1 bg-white/20 rounded text-xs">Fouls</span>
                  <Button
                    onClick={() => updateFouls('a', 1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <Button
                    onClick={() => updateRedCards('a', -1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-red-500/20 border-red-300/30 text-white hover:bg-red-500/30"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="px-3 py-1 bg-red-500/20 rounded text-xs">Red Cards</span>
                  <Button
                    onClick={() => updateRedCards('a', 1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-red-500/20 border-red-300/30 text-white hover:bg-red-500/30"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Team B */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{game.team_b_name}</h2>
              <div className="text-6xl font-bold mb-4">{game.team_b_score}</div>
              <div className="space-y-1 mb-4 text-sm">
                <div>Fouls: {game.team_b_fouls || 0}</div>
                <div className="text-red-300">Red Cards: {game.team_b_red_cards || 0}</div>
              </div>
              
              {/* Score Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button
                  onClick={() => updateScore('b', 1)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2"
                >
                  ⚽ +1
                </Button>
                <Button
                  onClick={() => updateScore('b', -1)}
                  disabled={game.status !== 'active'}
                  className="bg-red-500/30 hover:bg-red-500/50 text-white font-bold py-2"
                >
                  -1
                </Button>
              </div>
              
              {/* Foul & Card Controls */}
              <div className="space-y-2">
                <div className="flex gap-2 justify-center items-center">
                  <Button
                    onClick={() => updateRedCards('b', -1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="px-3 py-1 bg-white/20 rounded text-xs">Fouls</span>
                  <Button
                    onClick={() => updateFouls('b', 1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <Button
                    onClick={() => updateRedCards('b', -1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-red-500/20 border-red-300/30 text-white hover:bg-red-500/30"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="px-3 py-1 bg-red-500/20 rounded text-xs">Red Cards</span>
                  <Button
                    onClick={() => updateRedCards('b', 1)}
                    disabled={game.status !== 'active'}
                    variant="outline"
                    size="sm"
                    className="bg-red-500/20 border-red-300/30 text-white hover:bg-red-500/30"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Half Control */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Half Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => updateHalf(-1)}
              disabled={game.status !== 'active'}
              variant="outline"
              size="lg"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <div className="text-3xl font-bold px-6 py-2 bg-blue-100 rounded-lg">
              Half {game.current_half || 1}
            </div>
            <Button
              onClick={() => updateHalf(1)}
              disabled={game.status !== 'active'}
              variant="outline"
              size="lg"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Current Half (1-6, editable)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};