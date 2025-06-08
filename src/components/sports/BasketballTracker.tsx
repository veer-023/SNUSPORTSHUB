import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  const [shotClock, setShotClock] = useState(24);
  const [shotClockRunning, setShotClockRunning] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [editTimeValue, setEditTimeValue] = useState(game.game_clock_minutes);

  useEffect(() => {
    setLocalTime({
      minutes: game.game_clock_minutes,
      seconds: game.game_clock_seconds
    });
  }, [game.game_clock_minutes, game.game_clock_seconds]);

  // Game clock countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (game.clock_running && game.status === 'active') {
      interval = setInterval(() => {
        setLocalTime(prev => {
          if (prev.minutes === 0 && prev.seconds === 0) {
            onUpdate(game.id, { clock_running: false });
            return prev;
          }
          
          const totalSeconds = prev.minutes * 60 + prev.seconds - 1;
          const newMinutes = Math.floor(totalSeconds / 60);
          const newSeconds = totalSeconds % 60;
          
          // Update database every 5 seconds
          if (totalSeconds % 5 === 0) {
            onUpdate(game.id, {
              game_clock_minutes: newMinutes,
              game_clock_seconds: newSeconds
            });
          }
          
          return {
            minutes: newMinutes,
            seconds: newSeconds
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [game.clock_running, game.status, game.id, onUpdate]);

  // Shot clock countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (shotClockRunning && game.clock_running && game.status === 'active') {
      interval = setInterval(() => {
        setShotClock(prev => {
          if (prev <= 1) {
            setShotClockRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [shotClockRunning, game.clock_running, game.status]);

  const updateScore = (team: 'a' | 'b', points: number) => {
    const updates = team === 'a' 
      ? { team_a_score: Math.max(0, game.team_a_score + points) }
      : { team_b_score: Math.max(0, game.team_b_score + points) };
    onUpdate(game.id, updates);
    
    // Reset shot clock on score
    if (points > 0) {
      setShotClock(24);
      setShotClockRunning(true);
    }
  };

  const updateFouls = (team: 'a' | 'b', increment: number) => {
    const field = team === 'a' ? 'team_a_fouls' : 'team_b_fouls';
    const currentFouls = team === 'a' ? (game.team_a_fouls || 0) : (game.team_b_fouls || 0);
    const newFouls = Math.max(0, currentFouls + increment);
    onUpdate(game.id, { [field]: newFouls });
  };

  const toggleClock = () => {
    onUpdate(game.id, { clock_running: !game.clock_running });
    if (!game.clock_running) {
      setShotClockRunning(true);
    } else {
      setShotClockRunning(false);
    }
  };

  const updateQuarter = (increment: number) => {
    const newQuarter = Math.max(1, Math.min(6, (game.current_quarter || 1) + increment));
    onUpdate(game.id, { current_quarter: newQuarter });
  };

  const resetShotClock = (seconds: number) => {
    setShotClock(seconds);
    setShotClockRunning(true);
  };

  const updateGameTime = () => {
    if (editTimeValue >= 1 && editTimeValue <= 30) {
      onUpdate(game.id, { 
        game_clock_minutes: editTimeValue, 
        game_clock_seconds: 0 
      });
      setEditingTime(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Scoreboard */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="text-[20rem] font-bold text-center pt-8">🏀</div>
        </div>
        <CardHeader className="text-center pb-4 relative z-10">
          <CardTitle className="text-3xl font-bold">🏀 BASKETBALL GAME</CardTitle>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Badge className="bg-white/20 text-white">
              Q{game.current_quarter || 1}/6
            </Badge>
            <div className="flex items-center gap-2">
              {editingTime ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    value={editTimeValue}
                    onChange={(e) => setEditTimeValue(Number(e.target.value))}
                    className="w-16 h-8 text-black text-center"
                  />
                  <Button size="sm" onClick={updateGameTime} className="bg-white/20 hover:bg-white/30">
                    ✓
                  </Button>
                  <Button size="sm" onClick={() => setEditingTime(false)} className="bg-white/20 hover:bg-white/30">
                    ✕
                  </Button>
                </div>
              ) : (
                <div 
                  className="text-4xl font-mono font-bold cursor-pointer hover:bg-white/10 px-2 py-1 rounded"
                  onClick={() => setEditingTime(true)}
                >
                  {String(localTime.minutes).padStart(2, '0')}:{String(localTime.seconds).padStart(2, '0')}
                </div>
              )}
            </div>
            <Button
              onClick={toggleClock}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              {game.clock_running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
          
          {/* Shot Clock */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${shotClock <= 5 ? 'bg-red-500' : 'bg-white/20'}`}>
              Shot Clock: {shotClock}
            </div>
            <Button
              onClick={() => resetShotClock(24)}
              size="sm"
              className="bg-white/20 hover:bg-white/30"
            >
              24s
            </Button>
            <Button
              onClick={() => resetShotClock(14)}
              size="sm"
              className="bg-white/20 hover:bg-white/30"
            >
              14s
            </Button>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 gap-8">
            {/* Team A */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{game.team_a_name}</h2>
              <div className="text-6xl font-bold mb-4">{game.team_a_score}</div>
              <div className="space-y-2 mb-4">
                <div className="text-lg">Team Fouls: {game.team_a_fouls || 0}</div>
                <div className="text-sm">Foul Outs: 0</div>
              </div>
              
              {/* Score Buttons */}
              <div className="grid grid-cols-4 gap-1 mb-4">
                <Button
                  onClick={() => updateScore('a', 1)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2"
                >
                  +1
                </Button>
                <Button
                  onClick={() => updateScore('a', 2)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2"
                >
                  +2
                </Button>
                <Button
                  onClick={() => updateScore('a', 3)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2"
                >
                  +3
                </Button>
                <Button
                  onClick={() => updateScore('a', -1)}
                  disabled={game.status !== 'active'}
                  className="bg-red-500/30 hover:bg-red-500/50 text-white font-bold py-2"
                >
                  -1
                </Button>
              </div>
              
              {/* Foul Controls */}
              <div className="flex gap-2 justify-center items-center">
                <Button
                  onClick={() => updateFouls('a', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1 bg-white/20 rounded text-sm">Fouls</span>
                <Button
                  onClick={() => updateFouls('a', 1)}
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
                <div className="text-lg">Team Fouls: {game.team_b_fouls || 0}</div>
                <div className="text-sm">Foul Outs: 0</div>
              </div>
              
              {/* Score Buttons */}
              <div className="grid grid-cols-4 gap-1 mb-4">
                <Button
                  onClick={() => updateScore('b', 1)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2"
                >
                  +1
                </Button>
                <Button
                  onClick={() => updateScore('b', 2)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2"
                >
                  +2
                </Button>
                <Button
                  onClick={() => updateScore('b', 3)}
                  disabled={game.status !== 'active'}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2"
                >
                  +3
                </Button>
                <Button
                  onClick={() => updateScore('b', -1)}
                  disabled={game.status !== 'active'}
                  className="bg-red-500/30 hover:bg-red-500/50 text-white font-bold py-2"
                >
                  -1
                </Button>
              </div>
              
              {/* Foul Controls */}
              <div className="flex gap-2 justify-center items-center">
                <Button
                  onClick={() => updateFouls('b', -1)}
                  disabled={game.status !== 'active'}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1 bg-white/20 rounded text-sm">Fouls</span>
                <Button
                  onClick={() => updateFouls('b', 1)}
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
            Current Quarter (1-6)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};