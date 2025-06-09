import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CricketTracker } from "./CricketTracker";
import { BasketballTracker } from "./BasketballTracker";
import { FootballTracker } from "./FootballTracker";
import { BadmintonTracker } from "./BadmintonTracker";
import { CommonControls } from "./CommonControls";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";

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
  live_updates: boolean;
  current_overs?: number;
  team_a_batsman_outs?: number;
  team_b_batsman_outs?: number;
  current_quarter?: number;
  team_a_fouls?: number;
  team_b_fouls?: number;
  current_half?: number;
  team_a_sets?: number;
  team_b_sets?: number;
  current_set?: number;
  team_a_games_current_set?: number;
  team_b_games_current_set?: number;
  created_at: string;
  updated_at: string;
}

const SportsTracker = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [newGame, setNewGame] = useState({ 
    sport: 'basketball' as const, 
    teamA: "", 
    teamB: "" 
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const sportColors = {
    cricket: "from-green-500 to-green-600",
    basketball: "from-orange-500 to-orange-600", 
    football: "from-blue-500 to-blue-600",
    badminton: "from-purple-500 to-purple-600"
  };

  // Fetch games and set up real-time subscription
  useEffect(() => {
    fetchGames();
    
    const channel = supabase
      .channel('games-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'games' 
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setGames(prev => [payload.new as Game, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setGames(prev => prev.map(game => 
            game.id === payload.new.id ? payload.new as Game : game
          ));
          if (selectedGame?.id === payload.new.id) {
            setSelectedGame(payload.new as Game);
          }
        } else if (payload.eventType === 'DELETE') {
          setGames(prev => prev.filter(game => game.id !== payload.old.id));
          if (selectedGame?.id === payload.old.id) {
            setSelectedGame(null);
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedGame?.id]);

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
      const { data, error } = await supabase
        .from('games')
        .insert({
          sport: newGame.sport,
          team_a_name: newGame.teamA.trim(),
          team_b_name: newGame.teamB.trim(),
        })
        .select()
        .single();

      if (error) throw error;

      setNewGame({ sport: newGame.sport, teamA: "", teamB: "" });
      setSelectedGame(data as Game);
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

  const updateGame = async (gameId: string, updates: Partial<Game>) => {
    try {
      const { error } = await supabase
        .from('games')
        .update(updates)
        .eq('id', gameId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating game:', error);
      toast({
        title: "Error",
        description: "Failed to update game",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading SNU Sports Hub...</p>
        </div>
      </div>
    );
  }

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              onClick={() => setSelectedGame(null)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">SNU Sports Hub</h1>
              <Badge className={`bg-gradient-to-r ${sportColors[selectedGame.sport]} text-white`}>
                {selectedGame.sport.toUpperCase()} LIVE
              </Badge>
            </div>
            <CommonControls game={selectedGame} onUpdate={updateGame} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4">
          {selectedGame.sport === 'cricket' && (
            <CricketTracker game={selectedGame} onUpdate={updateGame} />
          )}
          {selectedGame.sport === 'basketball' && (
            <BasketballTracker game={selectedGame} onUpdate={updateGame} onViewAudience={() => {}} />
          )}
          {selectedGame.sport === 'football' && (
            <FootballTracker game={selectedGame} onUpdate={updateGame} />
          )}
          {selectedGame.sport === 'badminton' && (
            <BadmintonTracker game={selectedGame} onUpdate={updateGame} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">🏆 SNU Sports Hub</h1>
            <div></div>
          </div>
          <p className="text-lg text-gray-600">Professional Live Sports Tracking for Shiv Nadar University</p>
        </div>

        {/* Create New Game */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Plus className="mr-2" />
              Create New Game Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">Select Sport</label>
                <Select value={newGame.sport} onValueChange={(value: any) => setNewGame(prev => ({ ...prev, sport: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cricket">🏏 Cricket</SelectItem>
                    <SelectItem value="basketball">🏀 Basketball</SelectItem>
                    <SelectItem value="football">⚽ Football</SelectItem>
                    <SelectItem value="badminton">🏸 Badminton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Team A</label>
                <input
                  type="text"
                  value={newGame.teamA}
                  onChange={(e) => setNewGame(prev => ({ ...prev, teamA: e.target.value }))}
                  placeholder="Enter team A name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Team B</label>
                <input
                  type="text"
                  value={newGame.teamB}
                  onChange={(e) => setNewGame(prev => ({ ...prev, teamB: e.target.value }))}
                  placeholder="Enter team B name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button 
                onClick={createGame} 
                className={`bg-gradient-to-r ${sportColors[newGame.sport]} hover:opacity-90 text-white font-semibold py-2 px-6`}
              >
                Start Game
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Games List */}
        <div className="grid gap-6">
          {games.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="text-center py-12">
                <p className="text-gray-500 text-lg">No games yet. Create your first game above!</p>
              </CardContent>
            </Card>
          ) : (
            games.map((game) => (
              <Card key={game.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelectedGame(game)}>
                <CardHeader className={`bg-gradient-to-r ${sportColors[game.sport]} text-white`}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl flex items-center gap-2">
                      {game.sport === 'cricket' && '🏏'}
                      {game.sport === 'basketball' && '🏀'}
                      {game.sport === 'football' && '⚽'}
                      {game.sport === 'badminton' && '🏸'}
                      {game.sport.toUpperCase()} MATCH
                    </CardTitle>
                    <Badge 
                      variant={game.status === 'active' ? 'default' : 'secondary'}
                      className={game.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'}
                    >
                      {game.live_updates && game.status === 'active' ? '🔴 LIVE' : game.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">{game.team_a_name}</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-2">{game.team_a_score}</div>
                      {game.sport === 'badminton' && (
                        <div className="text-sm text-gray-600">Sets: {game.team_a_sets}</div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-400 mb-2">VS</div>
                      {(game.sport === 'basketball' || game.sport === 'football') && (
                        <div className="text-sm text-gray-600">
                          {String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')}
                        </div>
                      )}
                      {game.sport === 'cricket' && (
                        <div className="text-sm text-gray-600">Overs: {game.current_overs}</div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">{game.team_b_name}</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-2">{game.team_b_score}</div>
                      {game.sport === 'badminton' && (
                        <div className="text-sm text-gray-600">Sets: {game.team_b_sets}</div>
                      )}
                    </div>
                  </div>
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

export default SportsTracker;