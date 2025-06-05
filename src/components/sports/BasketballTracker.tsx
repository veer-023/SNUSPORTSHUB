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
  current_quarter?: number;
  team_a_fouls?: number;
  team_b_fouls?: number;
  status: string;
}

interface BasketballTrackerProps {
  game: Game;
  onUpdate: (gameId: string, updates: Partial<Game>) => void;
}

export const BasketballTracker = ({ game, onUpdate }: BasketballTrackerProps) => {
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

  const updateScore = (team: 'a' | 'b', points: number) => {
    const updates = team === 'a' 
      ? { team_a_score: Math.max(0, game.team_a_score + points) }
      : { team_b_score: Math.max(0, game.team_b_score + points) };
    onUpdate(game.id, updates);
  };

  const updateFouls = (team: 'a' | 'b', increment: number) => {
    const field = team === 'a' ? 'team_a_fouls' : 'team_b_fouls';
    const currentFouls = team === 'a' ? (game.team_a_fouls || 0) : (game.team_b_fouls || 0);
    const newFouls = Math.max(0, currentFouls + increment);
    onUpdate(game.id, { [field]: newFouls });
  };

  const toggleClock = () => {
    onUpdate(game.id, { clock_running: !game.clock_running });
  };

  const updateQuarter = (increment: number) => {
    const newQuarter = Math.max(1, Math.min(4, (game.current_quarter || 1) + increment));
    onUpdate(game.id, { current_quarter: newQuarter });
  };

  return (
    <div className="space-y-6">
      {/* Main Scoreboard */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold">🏀 BASKETBALL GAME</CardTitle>
          <div className="flex justify-center items-center gap-4">
            <Badge className="bg-white/20 text-white">
              Q{game.current_quarter || 1}
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
              <div className="text-lg mb-4">Fouls: {game.team_a_fouls || 0}</div>
              
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
                  onClick={() => updateScore('a', 2)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +2
                </Button>
                <Button
                  onClick={() => updateScore('a', 3)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +3
                </Button>
              </div>
              
              {/* Foul Controls */}
              <div className="flex gap-1 sm:gap-2 justify-center items-center">
                <Button
                  onClick={() => updateFouls('a', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="px-2 sm:px-3 py-1 bg-white/20 rounded text-xs sm:text-sm">Fouls</span>
                <Button
                  onClick={() => updateFouls('a', 1)}
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
              <div className="text-lg mb-4">Fouls: {game.team_b_fouls || 0}</div>
              
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
                  onClick={() => updateScore('b', 2)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +2
                </Button>
                <Button
                  onClick={() => updateScore('b', 3)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm sm:text-lg font-bold py-2 px-2 sm:px-4"
                >
                  +3
                </Button>
              </div>
              
              {/* Foul Controls */}
              <div className="flex gap-1 sm:gap-2 justify-center items-center">
                <Button
                  onClick={() => updateFouls('b', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="px-2 sm:px-3 py-1 bg-white/20 rounded text-xs sm:text-sm">Fouls</span>
                <Button
                  onClick={() => updateFouls('b', 1)}
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

      {/* Quarter Control */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Quarter Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => updateQuarter(-1)}
              disabled={game.status !== 'active'}
              variant="outline"
              size="lg"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <div className="text-3xl font-bold px-6 py-2 bg-orange-100 rounded-lg">
              Q{game.current_quarter || 1}
            </div>
            <Button
              onClick={() => updateQuarter(1)}
              disabled={game.status !== 'active'}
              variant="outline"
              size="lg"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Current Quarter (1-4)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};