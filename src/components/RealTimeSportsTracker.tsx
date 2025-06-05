import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Pause, Square } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch initial games
  useEffect(() => {
    fetchGames();
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('games-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setGames(prev => [...prev, payload.new as Game]);
          } else if (payload.eventType === 'UPDATE') {
            setGames(prev => prev.map(game => 
              game.id === payload.new.id ? payload.new as Game : game
            ));
          } else if (payload.eventType === 'DELETE') {
            setGames(prev => prev.filter(game => game.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGames((data || []) as Game[]);
    } catch (error) {
      console.error('Error fetching games:', error);
      toast({
        title: "Error",
        description: "Failed to fetch games",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createGame = async () => {
    if (!newGame.teamA.trim() || !newGame.teamB.trim()) {
      toast({
        title: "Error",
        description: "Please enter both team names",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('games')
        .insert({
          sport: 'basketball',
          team_a_name: newGame.teamA.trim(),
          team_b_name: newGame.teamB.trim(),
        });

      if (error) throw error;

      setNewGame({ teamA: "", teamB: "" });
      toast({
        title: "Success",
        description: "New game created!",
      });
    } catch (error) {
      console.error('Error creating game:', error);
      toast({
        title: "Error",
        description: "Failed to create game",
        variant: "destructive",
      });
    }
  };

  const updateScore = async (gameId: string, team: 'a' | 'b', increment: number) => {
    try {
      const game = games.find(g => g.id === gameId);
      if (!game) return;

      const updates = team === 'a' 
        ? { team_a_score: Math.max(0, game.team_a_score + increment) }
        : { team_b_score: Math.max(0, game.team_b_score + increment) };

      const { error } = await supabase
        .from('games')
        .update(updates)
        .eq('id', gameId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating score:', error);
      toast({
        title: "Error",
        description: "Failed to update score",
        variant: "destructive",
      });
    }
  };

  const updateGameStatus = async (gameId: string, status: 'active' | 'finished' | 'paused') => {
    try {
      const { error } = await supabase
        .from('games')
        .update({ status })
        .eq('id', gameId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating game status:', error);
      toast({
        title: "Error",
        description: "Failed to update game status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Real-Time Sports Tracker</h1>
          <p className="text-lg text-gray-600">Live scores updating across all devices</p>
        </div>

        {/* Create New Game */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2" />
              Create New Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
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
              <Button onClick={createGame} className="bg-blue-600 hover:bg-blue-700">
                Create Game
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Games List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {games.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 text-lg">No games yet. Create your first game above!</p>
              </CardContent>
            </Card>
          ) : (
            games.map((game) => (
              <Card key={game.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Live Game</CardTitle>
                    <Badge 
                      variant={game.status === 'active' ? 'default' : 'secondary'}
                      className={game.status === 'active' ? 'bg-green-500' : ''}
                    >
                      {game.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    {/* Team A */}
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">{game.team_a_name}</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-4">{game.team_a_score}</div>
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
                      <h3 className="font-bold text-lg mb-2">{game.team_b_name}</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-4">{game.team_b_score}</div>
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
                  <div className="mt-4 pt-4 border-t text-center text-sm text-gray-500">
                    Created: {new Date(game.created_at).toLocaleString()}
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