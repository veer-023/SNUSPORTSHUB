import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, Play, Pause, Square, Edit3, RotateCcw, Clock, 
  Users, Target, Award, Calendar, Timer, Zap, Trophy,
  Minus, Flag, AlertTriangle, CheckCircle, Circle
} from "lucide-react";

interface BaseGame {
  id: string;
  sport: 'basketball' | 'football' | 'cricket' | 'badminton';
  team_a_name: string;
  team_b_name: string;
  status: 'active' | 'finished' | 'paused' | 'halftime';
  created_at: string;
}

interface BasketballGame extends BaseGame {
  sport: 'basketball';
  team_a_score: number;
  team_b_score: number;
  shot_clock: number;
  quarter: number;
  game_time: number; // in seconds
  team_a_fouls: number;
  team_b_fouls: number;
  team_a_foul_outs: number;
  team_b_foul_outs: number;
}

interface FootballGame extends BaseGame {
  sport: 'football';
  team_a_score: number;
  team_b_score: number;
  half: number;
  game_time: number;
  team_a_fouls: number;
  team_b_fouls: number;
  team_a_red_cards: number;
  team_b_red_cards: number;
}

interface CricketGame extends BaseGame {
  sport: 'cricket';
  team_a_runs: number;
  team_a_wickets: number;
  team_b_runs: number;
  team_b_wickets: number;
  current_over: number;
  balls_in_over: number;
  max_overs: number;
  innings: 1 | 2;
  batting_team: 'a' | 'b';
}

interface BadmintonGame extends BaseGame {
  sport: 'badminton';
  team_a_score: number;
  team_b_score: number;
  current_set: number;
  max_sets: number;
  max_games: number;
  sets_won_a: number;
  sets_won_b: number;
}

type Game = BasketballGame | FootballGame | CricketGame | BadmintonGame;

const MultiSportTracker = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedSport, setSelectedSport] = useState<'basketball' | 'football' | 'cricket' | 'badminton'>('basketball');
  const [newGame, setNewGame] = useState({ teamA: "", teamB: "" });
  const [editingScore, setEditingScore] = useState<{gameId: string, team: 'a' | 'b', value: string} | null>(null);

  // Timer effects for active games
  useEffect(() => {
    const interval = setInterval(() => {
      setGames(prev => prev.map(game => {
        if (game.status !== 'active') return game;
        
        if (game.sport === 'basketball') {
          const bGame = game as BasketballGame;
          return {
            ...bGame,
            shot_clock: bGame.shot_clock > 0 ? bGame.shot_clock - 1 : 0,
            game_time: bGame.game_time > 0 ? bGame.game_time - 1 : 0
          };
        }
        
        if (game.sport === 'football') {
          const fGame = game as FootballGame;
          return {
            ...fGame,
            game_time: fGame.game_time > 0 ? fGame.game_time - 1 : 0
          };
        }
        
        return game;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createGame = useCallback(() => {
    if (!newGame.teamA.trim() || !newGame.teamB.trim()) {
      alert("Please enter both team names");
      return;
    }

    const baseGame = {
      id: `game-${Date.now()}`,
      team_a_name: newGame.teamA.trim(),
      team_b_name: newGame.teamB.trim(),
      status: 'active' as const,
      created_at: new Date().toISOString(),
    };

    let game: Game;
    
    switch (selectedSport) {
      case 'basketball':
        game = {
          ...baseGame,
          sport: 'basketball',
          team_a_score: 0,
          team_b_score: 0,
          shot_clock: 24,
          quarter: 1,
          game_time: 12 * 60, // 12 minutes in seconds
          team_a_fouls: 0,
          team_b_fouls: 0,
          team_a_foul_outs: 0,
          team_b_foul_outs: 0,
        };
        break;
      case 'football':
        game = {
          ...baseGame,
          sport: 'football',
          team_a_score: 0,
          team_b_score: 0,
          half: 1,
          game_time: 12 * 60,
          team_a_fouls: 0,
          team_b_fouls: 0,
          team_a_red_cards: 0,
          team_b_red_cards: 0,
        };
        break;
      case 'cricket':
        game = {
          ...baseGame,
          sport: 'cricket',
          team_a_runs: 0,
          team_a_wickets: 0,
          team_b_runs: 0,
          team_b_wickets: 0,
          current_over: 0,
          balls_in_over: 0,
          max_overs: 20,
          innings: 1,
          batting_team: 'a',
        };
        break;
      case 'badminton':
        game = {
          ...baseGame,
          sport: 'badminton',
          team_a_score: 0,
          team_b_score: 0,
          current_set: 1,
          max_sets: 3,
          max_games: 3,
          sets_won_a: 0,
          sets_won_b: 0,
        };
        break;
    }

    setGames(prev => [game, ...prev]);
    setNewGame({ teamA: "", teamB: "" });
  }, [newGame, selectedSport]);

  const updateScore = useCallback((gameId: string, team: 'a' | 'b', points: number) => {
    setGames(prev => prev.map(game => {
      if (game.id !== gameId) return game;
      
      if (game.sport === 'basketball' || game.sport === 'football') {
        const scoreKey = `team_${team}_score` as const;
        return {
          ...game,
          [scoreKey]: Math.max(0, (game as any)[scoreKey] + points)
        };
      }
      
      if (game.sport === 'cricket') {
        const cGame = game as CricketGame;
        if (cGame.batting_team === team) {
          return {
            ...cGame,
            [`team_${team}_runs`]: Math.max(0, cGame[`team_${team}_runs` as keyof CricketGame] as number + points)
          };
        }
      }
      
      if (game.sport === 'badminton') {
        const scoreKey = `team_${team}_score` as const;
        return {
          ...game,
          [scoreKey]: Math.max(0, (game as any)[scoreKey] + points)
        };
      }
      
      return game;
    }));
  }, []);

  const resetShotClock = useCallback((gameId: string, seconds: number) => {
    setGames(prev => prev.map(game => 
      game.id === gameId && game.sport === 'basketball' 
        ? { ...game, shot_clock: seconds }
        : game
    ));
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSportConfig = (sport: string) => {
    const configs = {
      basketball: {
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-gradient-to-br from-orange-50 via-orange-100 to-red-50',
        icon: '🏀',
        name: 'Basketball'
      },
      football: {
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-gradient-to-br from-green-50 via-green-100 to-emerald-50',
        icon: '⚽',
        name: 'Football'
      },
      cricket: {
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-gradient-to-br from-blue-50 via-blue-100 to-sky-50',
        icon: '🏏',
        name: 'Cricket'
      },
      badminton: {
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-gradient-to-br from-purple-50 via-purple-100 to-pink-50',
        icon: '🏸',
        name: 'Badminton'
      }
    };
    return configs[sport as keyof typeof configs];
  };

  const renderBasketballGame = (game: BasketballGame) => (
    <div className="space-y-4">
      {/* Score and Timer */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="text-center">
          <h3 className="font-bold text-xl mb-2">{game.team_a_name}</h3>
          <div className="text-4xl font-bold text-orange-600 mb-2">{game.team_a_score}</div>
          <div className="flex gap-2 justify-center mb-2">
            <Button size="sm" onClick={() => updateScore(game.id, 'a', 1)} className="bg-orange-500">+1</Button>
            <Button size="sm" onClick={() => updateScore(game.id, 'a', 2)} className="bg-orange-500">+2</Button>
            <Button size="sm" onClick={() => updateScore(game.id, 'a', 3)} className="bg-orange-500">+3</Button>
          </div>
          <div className="text-sm space-y-1">
            <div>Fouls: {game.team_a_fouls}</div>
            <div>Foul Outs: {game.team_a_foul_outs}</div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="text-2xl font-bold">Q{game.quarter}</div>
          <div className="text-lg font-mono">{formatTime(game.game_time)}</div>
          <div className="bg-red-100 p-2 rounded">
            <div className="text-2xl font-bold text-red-600">{game.shot_clock}</div>
            <div className="text-xs">Shot Clock</div>
          </div>
          <div className="flex gap-1 justify-center">
            <Button size="sm" onClick={() => resetShotClock(game.id, 24)}>24s</Button>
            <Button size="sm" onClick={() => resetShotClock(game.id, 14)}>14s</Button>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-bold text-xl mb-2">{game.team_b_name}</h3>
          <div className="text-4xl font-bold text-orange-600 mb-2">{game.team_b_score}</div>
          <div className="flex gap-2 justify-center mb-2">
            <Button size="sm" onClick={() => updateScore(game.id, 'b', 1)} className="bg-orange-500">+1</Button>
            <Button size="sm" onClick={() => updateScore(game.id, 'b', 2)} className="bg-orange-500">+2</Button>
            <Button size="sm" onClick={() => updateScore(game.id, 'b', 3)} className="bg-orange-500">+3</Button>
          </div>
          <div className="text-sm space-y-1">
            <div>Fouls: {game.team_b_fouls}</div>
            <div>Foul Outs: {game.team_b_foul_outs}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFootballGame = (game: FootballGame) => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="text-center">
          <h3 className="font-bold text-xl mb-2">{game.team_a_name}</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">{game.team_a_score}</div>
          <div className="flex gap-2 justify-center mb-2">
            <Button size="sm" onClick={() => updateScore(game.id, 'a', -1)} variant="outline">-1</Button>
            <Button size="sm" onClick={() => updateScore(game.id, 'a', 1)} className="bg-green-500">+1</Button>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Flag className="w-3 h-3" />
              Fouls: {game.team_a_fouls}
            </div>
            <div className="flex items-center justify-center gap-1">
              <Square className="w-3 h-3 text-red-500" />
              Red Cards: {game.team_a_red_cards}
            </div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="text-2xl font-bold">Half {game.half}</div>
          <div className="text-lg font-mono">{formatTime(game.game_time)}</div>
          {game.status === 'halftime' && (
            <Badge className="bg-yellow-500">Half Time</Badge>
          )}
        </div>

        <div className="text-center">
          <h3 className="font-bold text-xl mb-2">{game.team_b_name}</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">{game.team_b_score}</div>
          <div className="flex gap-2 justify-center mb-2">
            <Button size="sm" onClick={() => updateScore(game.id, 'b', -1)} variant="outline">-1</Button>
            <Button size="sm" onClick={() => updateScore(game.id, 'b', 1)} className="bg-green-500">+1</Button>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Flag className="w-3 h-3" />
              Fouls: {game.team_b_fouls}
            </div>
            <div className="flex items-center justify-center gap-1">
              <Square className="w-3 h-3 text-red-500" />
              Red Cards: {game.team_b_red_cards}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCricketGame = (game: CricketGame) => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Badge className={`${game.innings === 1 ? 'bg-blue-500' : 'bg-purple-500'} text-white`}>
          {game.innings === 1 ? '1st Innings' : '2nd Innings'}
        </Badge>
        <div className="text-sm mt-1">
          Over: {game.current_over}.{game.balls_in_over} / {game.max_overs}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className={`text-center p-4 rounded-lg ${game.batting_team === 'a' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}`}>
          <h3 className="font-bold text-xl mb-2">{game.team_a_name}</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {game.team_a_runs}/{game.team_a_wickets}
          </div>
          {game.batting_team === 'a' && (
            <div className="space-y-2">
              <div className="flex gap-1 justify-center">
                <Button size="sm" onClick={() => updateScore(game.id, 'a', 1)} className="bg-blue-500">1</Button>
                <Button size="sm" onClick={() => updateScore(game.id, 'a', 2)} className="bg-blue-500">2</Button>
                <Button size="sm" onClick={() => updateScore(game.id, 'a', 4)} className="bg-blue-500">4</Button>
                <Button size="sm" onClick={() => updateScore(game.id, 'a', 6)} className="bg-blue-500">6</Button>
              </div>
              <div className="flex gap-1 justify-center">
                <Button size="sm" variant="outline" className="text-xs">Wide</Button>
                <Button size="sm" variant="outline" className="text-xs">No Ball</Button>
                <Button size="sm" variant="destructive" className="text-xs">OUT</Button>
              </div>
            </div>
          )}
        </div>

        <div className={`text-center p-4 rounded-lg ${game.batting_team === 'b' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}`}>
          <h3 className="font-bold text-xl mb-2">{game.team_b_name}</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {game.team_b_runs}/{game.team_b_wickets}
          </div>
          {game.batting_team === 'b' && (
            <div className="space-y-2">
              <div className="flex gap-1 justify-center">
                <Button size="sm" onClick={() => updateScore(game.id, 'b', 1)} className="bg-blue-500">1</Button>
                <Button size="sm" onClick={() => updateScore(game.id, 'b', 2)} className="bg-blue-500">2</Button>
                <Button size="sm" onClick={() => updateScore(game.id, 'b', 4)} className="bg-blue-500">4</Button>
                <Button size="sm" onClick={() => updateScore(game.id, 'b', 6)} className="bg-blue-500">6</Button>
              </div>
              <div className="flex gap-1 justify-center">
                <Button size="sm" variant="outline" className="text-xs">Wide</Button>
                <Button size="sm" variant="outline" className="text-xs">No Ball</Button>
                <Button size="sm" variant="destructive" className="text-xs">OUT</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {game.innings === 1 && (
        <div className="text-center">
          <Button className="bg-purple-600 hover:bg-purple-700">
            End 1st Innings
          </Button>
        </div>
      )}
    </div>
  );

  const renderBadmintonGame = (game: BadmintonGame) => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="text-lg font-bold">Set {game.current_set} of {game.max_games}</div>
        <div className="text-sm">Sets Won: {game.team_a_name} {game.sets_won_a} - {game.sets_won_b} {game.team_b_name}</div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <h3 className="font-bold text-xl mb-2">{game.team_a_name}</h3>
          <div className="text-4xl font-bold text-purple-600 mb-2">{game.team_a_score}</div>
          <div className="flex gap-2 justify-center">
            <Button size="sm" onClick={() => updateScore(game.id, 'a', -1)} variant="outline">-1</Button>
            <Button size="sm" onClick={() => updateScore(game.id, 'a', 1)} className="bg-purple-500">+1</Button>
          </div>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <h3 className="font-bold text-xl mb-2">{game.team_b_name}</h3>
          <div className="text-4xl font-bold text-purple-600 mb-2">{game.team_b_score}</div>
          <div className="flex gap-2 justify-center">
            <Button size="sm" onClick={() => updateScore(game.id, 'b', -1)} variant="outline">-1</Button>
            <Button size="sm" onClick={() => updateScore(game.id, 'b', 1)} className="bg-purple-500">+1</Button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button variant="outline" className="border-purple-500 text-purple-600">
          End Set
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-500" />
            Multi-Sport Live Tracker
          </h1>
          <p className="text-lg text-gray-600">Professional real-time scoring for all sports</p>
        </div>

        {/* Sport Selection */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {(['basketball', 'football', 'cricket', 'badminton'] as const).map((sport) => {
            const config = getSportConfig(sport);
            return (
              <Button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`${selectedSport === sport ? `bg-gradient-to-r ${config.color} text-white` : 'bg-white text-gray-600 hover:bg-gray-50'} border-2 transition-all`}
              >
                <span className="mr-2 text-lg">{config.icon}</span>
                {config.name}
              </Button>
            );
          })}
        </div>

        {/* Create New Game */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className={`bg-gradient-to-r ${getSportConfig(selectedSport).color} text-white`}>
            <CardTitle className="flex items-center">
              <Plus className="mr-2" />
              Create New {getSportConfig(selectedSport).name} Game
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Team A</label>
                <Input
                  value={newGame.teamA}
                  onChange={(e) => setNewGame(prev => ({ ...prev, teamA: e.target.value }))}
                  placeholder="Enter team A name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Team B</label>
                <Input
                  value={newGame.teamB}
                  onChange={(e) => setNewGame(prev => ({ ...prev, teamB: e.target.value }))}
                  placeholder="Enter team B name"
                />
              </div>
              <div className="sm:flex sm:items-end">
                <Button 
                  onClick={createGame} 
                  className={`bg-gradient-to-r ${getSportConfig(selectedSport).color} hover:opacity-90 w-full sm:w-auto`}
                  disabled={!newGame.teamA.trim() || !newGame.teamB.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Game
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Games List */}
        <div className="space-y-6">
          {games.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">{getSportConfig(selectedSport).icon}</div>
                <p className="text-gray-500 text-lg">No {getSportConfig(selectedSport).name.toLowerCase()} games yet. Create your first game above!</p>
              </CardContent>
            </Card>
          ) : (
            games
              .filter(game => game.sport === selectedSport)
              .map((game) => {
                const config = getSportConfig(game.sport);
                return (
                  <Card key={game.id} className={`overflow-hidden shadow-xl hover:shadow-2xl transition-shadow ${config.bgColor}`}>
                    <CardHeader className={`bg-gradient-to-r ${config.color} text-white`}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl flex items-center">
                          <span className="text-2xl mr-2">{config.icon}</span>
                          Live {config.name} Match
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge 
                            variant={game.status === 'active' ? 'default' : 'secondary'}
                            className={game.status === 'active' ? 'bg-green-500' : ''}
                          >
                            {game.status.toUpperCase()}
                          </Badge>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      {game.sport === 'basketball' && renderBasketballGame(game as BasketballGame)}
                      {game.sport === 'football' && renderFootballGame(game as FootballGame)}
                      {game.sport === 'cricket' && renderCricketGame(game as CricketGame)}
                      {game.sport === 'badminton' && renderBadmintonGame(game as BadmintonGame)}
                      
                      {/* Game Controls */}
                      <div className="mt-6 pt-4 border-t flex justify-center gap-2">
                        {game.status === 'active' ? (
                          <>
                            <Button size="sm" variant="outline">
                              <Pause className="w-4 h-4 mr-1" />
                              Pause
                            </Button>
                            <Button size="sm" variant="outline">
                              <Square className="w-4 h-4 mr-1" />
                              End Game
                            </Button>
                          </>
                        ) : game.status === 'paused' ? (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Play className="w-4 h-4 mr-1" />
                            Resume
                          </Button>
                        ) : null}
                      </div>

                      {/* Game Info */}
                      <div className="mt-4 text-center text-sm text-gray-500">
                        Started: {new Date(game.created_at).toLocaleString()}
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

export default MultiSportTracker;
