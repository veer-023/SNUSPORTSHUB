import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Play, Pause, Square, Trophy, Edit } from "lucide-react";

interface Game {
  id: string;
  sport: 'cricket' | 'basketball' | 'football' | 'badminton';
  team_a_name: string;
  team_b_name: string;
  team_a_score: number;
  team_b_score: number;
  status: 'active' | 'paused' | 'finished' | 'break';
  game_clock_minutes: number;
  game_clock_seconds: number;
  clock_running: boolean;
  shot_clock_seconds: number;
  shot_clock_running: boolean;
  current_quarter?: number;
  team_a_fouls?: number;
  team_b_fouls?: number;
  current_half?: number;
  team_a_batsman_outs?: number;
  team_b_batsman_outs?: number;
}

const BasketballAudienceView = ({ game, onBack }: { game: Game; onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-4">
      <div className="relative z-10 w-full">
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="absolute top-4 left-4 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/70"
        >
          ← Operator View
        </Button>
        
        <Card className="w-full max-w-7xl bg-transparent border-0 text-white shadow-none">
          <CardHeader className="text-center border-b-2 border-orange-500/30 p-4">
            <div className="flex justify-between items-center">
              <Badge className="text-3xl sm:text-4xl font-bold bg-gray-800/50 border-gray-600 px-4 py-2">
                Q{game.current_quarter || 1}
              </Badge>
              <div className="flex flex-col items-center">
                <div className="text-lg text-gray-400">SHOT CLOCK</div>
                <div className="text-4xl sm:text-5xl font-mono bg-red-600/80 border-2 border-red-400 px-4 sm:px-6 py-2 rounded-lg shadow-lg">
                  {game.shot_clock_seconds}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="py-8 sm:py-12 px-4">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight uppercase mb-4">
                  {game.team_a_name}
                </h2>
                <div className="text-6xl sm:text-8xl font-bold text-orange-400">
                  {game.team_a_score}
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight uppercase mb-4">
                  {game.team_b_name}
                </h2>
                <div className="text-6xl sm:text-8xl font-bold text-orange-400">
                  {game.team_b_score}
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-5xl sm:text-7xl font-mono font-bold text-white">
                {String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`text-center text-lg sm:text-2xl font-semibold ${(game.team_a_fouls || 0) >= 4 ? 'text-red-500' : 'text-gray-400'}`}>
                Q FOULS: {game.team_a_fouls || 0}
              </div>
              <div className={`text-center text-lg sm:text-2xl font-semibold ${(game.team_b_fouls || 0) >= 4 ? 'text-red-500' : 'text-gray-400'}`}>
                Q FOULS: {game.team_b_fouls || 0}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const BasketballTracker = ({ game, onUpdate, onViewAudience }: { game: Game; onUpdate: (gameId: string, updates: Partial<Game>) => void; onViewAudience: (gameId: string) => void }) => {
  const isPaused = game.status !== 'active';
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [quarterTime, setQuarterTime] = useState(game.game_clock_minutes);

  const updateScore = (team: 'a' | 'b', points: number) => {
    if (isPaused) return;
    const field = team === 'a' ? 'team_a_score' : 'team_b_score';
    const currentScore = team === 'a' ? game.team_a_score : game.team_b_score;
    onUpdate(game.id, { [field]: Math.max(0, currentScore + points) });
    if (points > 0) onUpdate(game.id, { shot_clock_seconds: 24 });
  };

  const updateFouls = (team: 'a' | 'b', increment: number) => {
    if (isPaused) return;
    const field = team === 'a' ? 'team_a_fouls' : 'team_b_fouls';
    onUpdate(game.id, { [field]: Math.max(0, (game[field] || 0) + increment) });
  };

  const updateQuarter = (increment: number) => {
    const newQuarter = Math.max(1, Math.min(6, (game.current_quarter || 1) + increment));
    onUpdate(game.id, { current_quarter: newQuarter, team_a_fouls: 0, team_b_fouls: 0 });
  };

  const handleSetTime = () => {
    const newTime = parseInt(quarterTime.toString(), 10);
    if (newTime >= 1 && newTime <= 30) {
      onUpdate(game.id, { game_clock_minutes: newTime, game_clock_seconds: 0 });
      setIsEditingTime(false);
    }
  };

  return (
    <Card className="mb-4 shadow-lg bg-white/95 border-gray-200/50">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center gap-2">🏀 {game.team_a_name} vs {game.team_b_name}</span>
          <Badge className={game.status === 'active' ? 'bg-green-500 text-white' : game.status === 'finished' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}>
            {game.status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="text-center text-3xl font-bold mb-2">
          {game.team_a_score} - {game.team_b_score}
        </div>
        <div className="text-center text-md text-gray-700 mb-4">
          Q{game.current_quarter} | {String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')} | 
          Fouls: {game.team_a_fouls || 0} - {game.team_b_fouls || 0} | Shot Clock: {game.shot_clock_seconds}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-center">{game.team_a_name}</h4>
            <Button className="w-full" onClick={() => updateScore('a', 1)} disabled={isPaused}>+1 Point</Button>
            <Button className="w-full" onClick={() => updateScore('a', 2)} disabled={isPaused}>+2 Points</Button>
            <Button className="w-full" onClick={() => updateScore('a', 3)} disabled={isPaused}>+3 Points</Button>
            <Button className="w-full" onClick={() => updateScore('a', -1)} disabled={isPaused} variant="outline">-1 Point</Button>
            <Button className="w-full" variant="outline" onClick={() => updateFouls('a', 1)} disabled={isPaused}>+1 Foul</Button>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-center">{game.team_b_name}</h4>
            <Button className="w-full" onClick={() => updateScore('b', 1)} disabled={isPaused}>+1 Point</Button>
            <Button className="w-full" onClick={() => updateScore('b', 2)} disabled={isPaused}>+2 Points</Button>
            <Button className="w-full" onClick={() => updateScore('b', 3)} disabled={isPaused}>+3 Points</Button>
            <Button className="w-full" onClick={() => updateScore('b', -1)} disabled={isPaused} variant="outline">-1 Point</Button>
            <Button className="w-full" variant="outline" onClick={() => updateFouls('b', 1)} disabled={isPaused}>+1 Foul</Button>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button onClick={() => onUpdate(game.id, { status: game.status === 'active' ? 'paused' : 'active', clock_running: game.status !== 'active' })}>
            {game.status === 'active' ? <Pause /> : <Play />}
          </Button>
          <Button onClick={() => updateQuarter(-1)}><Minus /></Button>
          <span className="font-semibold">Quarter {game.current_quarter}</span>
          <Button onClick={() => updateQuarter(1)}><Plus /></Button>
          {isEditingTime ? (
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                value={quarterTime} 
                onChange={(e) => setQuarterTime(parseInt(e.target.value))} 
                className="w-20" 
                min={1} 
                max={30} 
              />
              <Button onClick={handleSetTime}>Set</Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setIsEditingTime(true)}>
              <Edit />
            </Button>
          )}
        </div>
        
        <div className="flex justify-center items-center gap-2 mt-2">
          <Button onClick={() => onUpdate(game.id, { shot_clock_seconds: 24 })}>Reset 24s</Button>
          <Button onClick={() => onUpdate(game.id, { shot_clock_seconds: 14 })}>Reset 14s</Button>
        </div>
        
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={() => onViewAudience(game.id)} variant="outline">Audience View</Button>
          <Button onClick={() => onUpdate(game.id, { status: 'finished', clock_running: false })} variant="destructive">
            <Square /> End Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FootballTracker = ({ game, onUpdate }: { game: Game; onUpdate: (gameId: string, updates: Partial<Game>) => void }) => {
  return (
    <Card className="mb-4 shadow-lg">
      <CardHeader>
        <CardTitle>⚽ {game.team_a_name} vs {game.team_b_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-2xl">{game.team_a_score} - {game.team_b_score}</div>
      </CardContent>
    </Card>
  );
};

const CricketTracker = ({ game, onUpdate }: { game: Game; onUpdate: (gameId: string, updates: Partial<Game>) => void }) => {
  return (
    <Card className="mb-4 shadow-lg">
      <CardHeader>
        <CardTitle>🏏 {game.team_a_name} vs {game.team_b_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-2xl">
          {game.team_a_score}/{game.team_a_batsman_outs} - {game.team_b_score}/{game.team_b_batsman_outs}
        </div>
      </CardContent>
    </Card>
  );
};

const BadmintonTracker = ({ game, onUpdate }: { game: Game; onUpdate: (gameId: string, updates: Partial<Game>) => void }) => {
  return (
    <Card className="mb-4 shadow-lg">
      <CardHeader>
        <CardTitle>🏸 {game.team_a_name} vs {game.team_b_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-2xl">{game.team_a_score} - {game.team_b_score}</div>
      </CardContent>
    </Card>
  );
};

const WinnerPopup = ({ winner, onClose }: { winner: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">🎉 WINNER! 🎉</h2>
        <p className="text-2xl text-gray-800 mb-6">{winner} has won the game!</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

const RealTimeSportsTracker = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState({ teamA: "", teamB: "", sport: "" });
  const [audienceGameId, setAudienceGameId] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  // Centralized timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setGames(prevGames => 
        prevGames.map(game => {
          if (!game.clock_running || game.status !== 'active') {
            return game;
          }
          
          let newGame = {...game};
          
          // Game Clock
          let totalSeconds = newGame.game_clock_minutes * 60 + newGame.game_clock_seconds - 1;
          if (totalSeconds < 0) {
            newGame.clock_running = false;
            totalSeconds = 0;
            if (newGame.current_quarter === 4) {
              newGame.status = 'finished';
              if (newGame.team_a_score > newGame.team_b_score) setWinner(newGame.team_a_name);
              else if (newGame.team_b_score > newGame.team_a_score) setWinner(newGame.team_b_name);
              else setWinner("It's a tie!");
            }
          }
          newGame.game_clock_minutes = Math.floor(totalSeconds / 60);
          newGame.game_clock_seconds = totalSeconds % 60;
          
          // Shot Clock
          if (newGame.sport === 'basketball' && newGame.shot_clock_seconds > 0) {
            newGame.shot_clock_seconds -= 1;
          }
          
          return newGame;
        })
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const createGame = useCallback(async () => {
    if (!newGame.teamA.trim() || !newGame.teamB.trim() || !newGame.sport) return;
    
    const gameId = `game-${Date.now()}`;
    const optimisticGame: Game = {
      id: gameId,
      sport: newGame.sport as Game['sport'],
      team_a_name: newGame.teamA.trim(),
      team_b_name: newGame.teamB.trim(),
      team_a_score: 0,
      team_b_score: 0,
      game_clock_minutes: newGame.sport === 'basketball' || newGame.sport === 'football' ? 12 : 0,
      game_clock_seconds: 0,
      clock_running: false,
      current_quarter: newGame.sport === 'basketball' ? 1 : undefined,
      team_a_fouls: 0,
      team_b_fouls: 0,
      shot_clock_seconds: 24,
      shot_clock_running: false,
      status: 'active',
    };
    
    setGames(prev => [optimisticGame, ...prev]);
    setNewGame({ teamA: "", teamB: "", sport: "" });
  }, [newGame]);

  const updateGame = useCallback((gameId: string, updates: Partial<Game>) => {
    setGames(prev => prev.map(game => game.id === gameId ? { ...game, ...updates } : game));
  }, []);
  
  const audienceGame = games.find(g => g.id === audienceGameId);

  if (audienceGame) {
    return <BasketballAudienceView game={audienceGame} onBack={() => setAudienceGameId(null)} />;
  }
  
  const renderSportTracker = (game: Game) => {
    switch (game.sport) {
      case 'basketball':
        return <BasketballTracker game={game} onUpdate={updateGame} onViewAudience={setAudienceGameId} />;
      case 'football':
        return <FootballTracker game={game} onUpdate={updateGame} />;
      case 'cricket':
        return <CricketTracker game={game} onUpdate={updateGame} />;
      case 'badminton':
        return <BadmintonTracker game={game} onUpdate={updateGame} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {winner && <WinnerPopup winner={winner} onClose={() => setWinner(null)} />}
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Trophy /> Sports Tracker
          </h1>
        </div>
        
        <Card className="mb-8 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Plus className="mr-2" /> Create New Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Sport</label>
                <Select value={newGame.sport} onValueChange={(value) => setNewGame(prev => ({ ...prev, sport: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basketball">🏀 Basketball</SelectItem>
                    <SelectItem value="football">⚽ Football</SelectItem>
                    <SelectItem value="cricket">🏏 Cricket</SelectItem>
                    <SelectItem value="badminton">🏸 Badminton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Team A</label>
                <Input 
                  value={newGame.teamA} 
                  onChange={(e) => setNewGame(prev => ({ ...prev, teamA: e.target.value }))} 
                  placeholder="Team A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Team B</label>
                <Input 
                  value={newGame.teamB} 
                  onChange={(e) => setNewGame(prev => ({ ...prev, teamB: e.target.value }))} 
                  placeholder="Team B"
                />
              </div>
              <Button 
                onClick={createGame} 
                disabled={!newGame.teamA.trim() || !newGame.teamB.trim() || !newGame.sport}
              >
                <Plus className="mr-2 w-4 h-4" /> Create
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          {games.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <p className="text-center text-gray-700">No games created yet.</p>
              </CardContent>
            </Card>
          ) : (
            games.map(game => (
              <div key={game.id}>
                {renderSportTracker(game)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeSportsTracker;