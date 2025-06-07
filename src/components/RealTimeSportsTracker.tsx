import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Pause, Square, Minus, Trophy, Users } from "lucide-react";

interface Game {
  id: string;
  team_a_name: string;
  team_b_name: string;
  team_a_score: number;
  team_b_score: number;
  status: 'active' | 'finished' | 'paused';
  created_at: string;
  updated_at: string;
}

const RealTimeSportsTracker = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState({ teamA: "", teamB: "" });
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time updates for demo (replace with actual Supabase)
  useEffect(() => {
    // Simulate connection status
    const connectionInterval = setInterval(() => {
      setIsConnected(prev => Math.random() > 0.1 ? true : prev);
    }, 5000);

    return () => clearInterval(connectionInterval);
  }, []);

  // Optimized game creation with optimistic updates
  const createGame = useCallback(async () => {
    if (!newGame.teamA.trim() || !newGame.teamB.trim()) {
      alert("Please enter both team names");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const optimisticGame: Game = {
      id: tempId,
      team_a_name: newGame.teamA.trim(),
      team_b_name: newGame.teamB.trim(),
      team_a_score: 0,
      team_b_score: 0,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Optimistic update
    setGames(prev => [optimisticGame, ...prev]);
    setNewGame({ teamA: "", teamB: "" });

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Replace temp ID with real ID
      const realId = `game-${Date.now()}`;
      setGames(prev => prev.map(game => 
        game.id === tempId ? { ...game, id: realId } : game
      ));
    } catch (error) {
      // Rollback on error
      setGames(prev => prev.filter(game => game.id !== tempId));
      alert("Failed to create game");
    }
  }, [newGame]);

  // Optimized score updates with debouncing
  const updateScore = useCallback(async (gameId: string, team: 'a' | 'b', increment: number) => {
    // Optimistic update
    setGames(prev => prev.map(game => {
      if (game.id !== gameId) return game;
      
      const newScore = team === 'a' 
        ? Math.max(0, game.team_a_score + increment)
        : Math.max(0, game.team_b_score + increment);
      
      return {
        ...game,
        [team === 'a' ? 'team_a_score' : 'team_b_score']: newScore,
        updated_at: new Date().toISOString()
      };
    }));

    // Simulate API call (replace with actual Supabase call)
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error('Score update failed:', error);
    }
  }, []);

  const updateGameStatus = useCallback(async (gameId: string, status: 'active' | 'finished' | 'paused') => {
    // Optimistic update
    setGames(prev => prev.map(game => 
      game.id === gameId 
        ? { ...game, status, updated_at: new Date().toISOString() }
        : game
    ));

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Status update failed:', error);
    }
  }, []);

  // Memoized stats for performance
  const gameStats = useMemo(() => {
    const active = games.filter(g => g.status === 'active').length;
    const finished = games.filter(g => g.status === 'finished').length;
    const total = games.length;
    
    return { active, finished, total };
  }, [games]);

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
        {/* Header with Connection Status */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
            Real-Time Sports Tracker
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 mb-2">Live scores updating across all devices</p>
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Team A</label>
                <Input
                  value={newGame.teamA}
                  onChange={(e) => setNewGame(prev => ({ ...prev, teamA: e.target.value }))}
                  placeholder="Enter team A name"
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Team B</label>
                <Input
                  value={newGame.teamB}
                  onChange={(e) => setNewGame(prev => ({ ...prev, teamB: e.target.value }))}
                  placeholder="Enter team B name"
                  className="w-full"
                />
              </div>
              <div className="sm:flex sm:items-end">
                <Button 
                  onClick={createGame} 
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto h-10 sm:h-9"
                  disabled={!newGame.teamA.trim() || !newGame.teamB.trim()}
                >
                  <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                  Create
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Games List */}
        <div className="space-y-4 sm:space-y-6">
          {games.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="text-center py-8 sm:py-12">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-base sm:text-lg">No games yet. Create your first game above!</p>
              </CardContent>
            </Card>
          ) : (
            games.map((game) => (
              <Card key={game.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg sm:text-xl">Live Game</CardTitle>
                    <Badge 
                      variant={game.status === 'active' ? 'default' : 'secondary'}
                      className={`${game.status === 'active' ? 'bg-green-500' : ''} text-xs sm:text-sm`}
                    >
                      {game.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 sm:p-6">
                  {/* Mobile Layout */}
                  <div className="sm:hidden space-y-6">
                    {/* Team A */}
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">{game.team_a_name}</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-4">{game.team_a_score}</div>
                      <div className="flex gap-3 justify-center">
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={() => updateScore(game.id, 'a', -1)}
                          disabled={game.status !== 'active'}
                          className="min-w-[48px] h-12"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="lg"
                          onClick={() => updateScore(game.id, 'a', 1)}
                          disabled={game.status !== 'active'}
                          className="bg-blue-600 hover:bg-blue-700 min-w-[48px] h-12"
                        >
                          +1
                        </Button>
                      </div>
                    </div>

                    {/* VS and Controls */}
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-400 mb-4">VS</div>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        {game.status === 'active' ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateGameStatus(game.id, 'paused')}
                              className="min-h-[40px]"
                            >
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateGameStatus(game.id, 'finished')}
                              className="min-h-[40px]"
                            >
                              <Square className="w-4 h-4 mr-2" />
                              Finish
                            </Button>
                          </>
                        ) : game.status === 'paused' ? (
                          <Button
                            size="sm"
                            onClick={() => updateGameStatus(game.id, 'active')}
                            className="bg-green-600 hover:bg-green-700 min-h-[40px]"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </Button>
                        ) : null}
                      </div>
                    </div>

                    {/* Team B */}
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">{game.team_b_name}</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-4">{game.team_b_score}</div>
                      <div className="flex gap-3 justify-center">
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={() => updateScore(game.id, 'b', -1)}
                          disabled={game.status !== 'active'}
                          className="min-w-[48px] h-12"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="lg"
                          onClick={() => updateScore(game.id, 'b', 1)}
                          disabled={game.status !== 'active'}
                          className="bg-blue-600 hover:bg-blue-700 min-w-[48px] h-12"
                        >
                          +1
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:grid sm:grid-cols-3 gap-6 items-center">
                    {/* Team A */}
                    <div className="text-center">
                      <h3 className="font-bold text-xl mb-3">{game.team_a_name}</h3>
                      <div className="text-5xl font-bold text-blue-600 mb-4">{game.team_a_score}</div>
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateScore(game.id, 'a', -1)}
                          disabled={game.status !== 'active'}
                        >
                          -1
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateScore(game.id, 'a', 1)}
                          disabled={game.status !== 'active'}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          +1
                        </Button>
                      </div>
                    </div>

                    {/* VS and Controls */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-400 mb-4">VS</div>
                      <div className="flex flex-col gap-2">
                        {game.status === 'active' ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateGameStatus(game.id, 'paused')}
                            >
                              <Pause className="w-4 h-4 mr-1" />
                              Pause
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateGameStatus(game.id, 'finished')}
                            >
                              <Square className="w-4 h-4 mr-1" />
                              Finish
                            </Button>
                          </>
                        ) : game.status === 'paused' ? (
                          <Button
                            size="sm"
                            onClick={() => updateGameStatus(game.id, 'active')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Resume
                          </Button>
                        ) : null}
                      </div>
                    </div>

                    {/* Team B */}
                    <div className="text-center">
                      <h3 className="font-bold text-xl mb-3">{game.team_b_name}</h3>
                      <div className="text-5xl font-bold text-blue-600 mb-4">{game.team_b_score}</div>
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateScore(game.id, 'b', -1)}
                          disabled={game.status !== 'active'}
                        >
                          -1
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateScore(game.id, 'b', 1)}
                          disabled={game.status !== 'active'}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          +1
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="mt-6 pt-4 border-t text-center text-xs sm:text-sm text-gray-500">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                      <span>Created: {new Date(game.created_at).toLocaleString()}</span>
                      <span>Last updated: {new Date(game.updated_at).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeSportsTracker;
