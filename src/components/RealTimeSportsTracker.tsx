import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Pause, Square, Minus, Trophy, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BasketballTracker } from "./sports/BasketballTracker";
import { FootballTracker } from "./sports/FootballTracker";
import { CricketTracker } from "./sports/CricketTracker";
import { BadmintonTracker } from "./sports/BadmintonTracker";

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
  current_half?: number;
  current_set?: number;
  current_overs?: number;
  team_a_fouls?: number;
  team_b_fouls?: number;
  team_a_red_cards?: number;
  team_b_red_cards?: number;
  team_a_batsman_outs?: number;
  team_b_batsman_outs?: number;
  team_a_sets?: number;
  team_b_sets?: number;
  team_a_games_current_set?: number;
  team_b_games_current_set?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

const RealTimeSportsTracker = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState({ teamA: "", teamB: "", sport: "" });
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time updates for demo
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      setIsConnected(prev => Math.random() > 0.1 ? true : prev);
    }, 5000);
    return () => clearInterval(connectionInterval);
  }, []);

  const createGame = useCallback(async () => {
    if (!newGame.teamA.trim() || !newGame.teamB.trim() || !newGame.sport) {
      alert("Please enter both team names and select a sport");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const optimisticGame: Game = {
      id: tempId,
      sport: newGame.sport,
      team_a_name: newGame.teamA.trim(),
      team_b_name: newGame.teamB.trim(),
      team_a_score: 0,
      team_b_score: 0,
      game_clock_minutes: newGame.sport === 'basketball' || newGame.sport === 'football' ? 12 : 0,
      game_clock_seconds: 0,
      clock_running: false,
      current_quarter: newGame.sport === 'basketball' ? 1 : undefined,
      current_half: newGame.sport === 'football' ? 1 : undefined,
      current_set: newGame.sport === 'badminton' ? 1 : undefined,
      current_overs: newGame.sport === 'cricket' ? 0 : undefined,
      team_a_fouls: newGame.sport === 'basketball' || newGame.sport === 'football' ? 0 : undefined,
      team_b_fouls: newGame.sport === 'basketball' || newGame.sport === 'football' ? 0 : undefined,
      team_a_red_cards: newGame.sport === 'football' ? 0 : undefined,
      team_b_red_cards: newGame.sport === 'football' ? 0 : undefined,
      team_a_batsman_outs: newGame.sport === 'cricket' ? 0 : undefined,
      team_b_batsman_outs: newGame.sport === 'cricket' ? 0 : undefined,
      team_a_sets: newGame.sport === 'badminton' ? 0 : undefined,
      team_b_sets: newGame.sport === 'badminton' ? 0 : undefined,
      team_a_games_current_set: newGame.sport === 'badminton' ? 0 : undefined,
      team_b_games_current_set: newGame.sport === 'badminton' ? 0 : undefined,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setGames(prev => [optimisticGame, ...prev]);
    setNewGame({ teamA: "", teamB: "", sport: "" });

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const realId = `game-${Date.now()}`;
      setGames(prev => prev.map(game => 
        game.id === tempId ? { ...game, id: realId } : game
      ));
    } catch (error) {
      setGames(prev => prev.filter(game => game.id !== tempId));
      alert("Failed to create game");
    }
  }, [newGame]);

  const updateGame = useCallback(async (gameId: string, updates: Partial<Game>) => {
    setGames(prev => prev.map(game => 
      game.id === gameId 
        ? { ...game, ...updates, updated_at: new Date().toISOString() }
        : game
    ));

    try {
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error('Game update failed:', error);
    }
  }, []);

  const gameStats = useMemo(() => {
    const active = games.filter(g => g.status === 'active').length;
    const finished = games.filter(g => g.status === 'finished').length;
    const total = games.length;
    return { active, finished, total };
  }, [games]);

  const renderSportTracker = (game: Game) => {
    switch (game.sport) {
      case 'basketball':
        return <BasketballTracker game={game} onUpdate={updateGame} />;
      case 'football':
        return <FootballTracker game={game} onUpdate={updateGame} />;
      case 'cricket':
        return <CricketTracker game={game} onUpdate={updateGame} />;
      case 'badminton':
        return <BadmintonTracker game={game} onUpdate={updateGame} />;
      default:
        return <div>Unknown sport</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-base sm:text-lg text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
            Real-Time Sports Tracker
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 mb-2">Professional live scoring for all sports</p>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs sm:text-sm text-gray-500">
              {isConnected ? 'Connected' : 'Reconnecting...'}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold">{gameStats.active}</div>
              <div className="text-xs sm:text-sm opacity-90">Active</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold">{gameStats.finished}</div>
              <div className="text-xs sm:text-sm opacity-90">Finished</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold">{gameStats.total}</div>
              <div className="text-xs sm:text-sm opacity-90">Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Create New Game */}
        <Card className="mb-6 sm:mb-8 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Plus className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Create New Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
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
                  placeholder="Enter team A name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Team B</label>
                <Input
                  value={newGame.teamB}
                  onChange={(e) => setNewGame(prev => ({ ...prev, teamB: e.target.value }))}
                  placeholder="Enter team B name"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={createGame} 
                  className="bg-blue-600 hover:bg-blue-700 w-full h-10"
                  disabled={!newGame.teamA.trim() || !newGame.teamB.trim() || !newGame.sport}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Games List */}
        <div className="space-y-6">
          {games.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="text-center py-8 sm:py-12">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-base sm:text-lg">No games yet. Create your first game above!</p>
              </CardContent>
            </Card>
          ) : (
            games.map((game) => (
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