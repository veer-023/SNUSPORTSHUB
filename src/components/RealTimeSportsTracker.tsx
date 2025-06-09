import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trophy, Users, Archive } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BasketballTracker } from "./sports/BasketballTracker";
import { FootballTracker } from "./sports/FootballTracker";
import { CricketTracker } from "./sports/CricketTracker";
import { BadmintonTracker } from "./sports/BadmintonTracker";
import { BasketballAudienceView } from "./sports/BasketballAudienceView"; // Import the new component

// Define the WinnerPopup component here or import it
const WinnerPopup = ({ winner, onClose }) => {
    useEffect(() => {
        const confettiContainer = document.getElementById('confetti-container');
        if (confettiContainer) {
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animation = `confetti-fall ${1 + Math.random() * 2}s linear ${Math.random() * 2}s infinite`;
                confetti.style.backgroundColor = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'][Math.floor(Math.random() * 6)];
                confettiContainer.appendChild(confetti);
            }
        }
    }, []);
    return (
        <div id="confetti-container" className="modal">
            <div className="modal-content">
                <h2 className="text-3xl font-bold mb-4">🎉 WINNER! 🎉</h2>
                <p className="text-2xl text-gray-800">{winner} has won the game!</p>
                <Button onClick={onClose} className="mt-6">Close</Button>
            </div>
        </div>
    )
};

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
  shot_clock_seconds?: number;
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
    const [audienceGameId, setAudienceGameId] = useState(null);
    const [winner, setWinner] = useState(null);

    // Centralized timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setGames(prevGames =>
                prevGames.map(game => {
                    if (!game.clock_running || game.status !== 'active') {
                        return game;
                    }

                    let newGame = { ...game };

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
        if (!newGame.teamA.trim() || !newGame.teamB.trim() || !newGame.sport) { return; }
        const tempId = `temp-${Date.now()}`;
        const optimisticGame: Game = {
            id: tempId, sport: newGame.sport, team_a_name: newGame.teamA.trim(), team_b_name: newGame.teamB.trim(), team_a_score: 0, team_b_score: 0,
            game_clock_minutes: newGame.sport === 'basketball' || newGame.sport === 'football' ? 12 : 0, game_clock_seconds: 0, clock_running: false,
            current_quarter: newGame.sport === 'basketball' ? 1 : undefined, team_a_fouls: 0, team_b_fouls: 0, shot_clock_seconds: 24, status: 'active',
            team_a_batsman_outs: 0, team_b_batsman_outs: 0, team_a_sets: 0, team_b_sets: 0,
            created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        };
        setGames(prev => [optimisticGame, ...prev]);
        setNewGame({ teamA: "", teamB: "", sport: "" });
        await new Promise(resolve => setTimeout(resolve, 200));
        const realId = `game-${Date.now()}`;
        setGames(prev => prev.map(game => game.id === tempId ? { ...game, id: realId } : game));
    }, [newGame]);

    const updateGame = useCallback(async (gameId: string, updates: Partial<Game>) => {
        setGames(prev => prev.map(game => game.id === gameId ? { ...game, ...updates } : game));
    }, []);

    const audienceGame = games.find(g => g.id === audienceGameId);

    if (audienceGame) {
        return <BasketballAudienceView game={audienceGame} onBack={() => setAudienceGameId(null)} />;
    }

    const renderSportTracker = (game) => {
        switch (game.sport) {
            case 'basketball':
                return <BasketballTracker game={game} onUpdate={updateGame} onViewAudience={setAudienceGameId} />;
            case 'football': return <FootballTracker game={game} onUpdate={updateGame} />;
            case 'cricket': return <CricketTracker game={game} onUpdate={updateGame} />;
            case 'badminton': return <BadmintonTracker game={game} onUpdate={updateGame} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {winner && <WinnerPopup winner={winner} onClose={() => setWinner(null)} />}
            <div className="container mx-auto px-4 py-6 max-w-4xl">
                <div className="text-center mb-8 pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <div></div>
                        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2"> <Trophy /> Sports Tracker</h1>
                        <Link to="/game-archive">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Archive className="w-4 h-4" />
                                Archive
                            </Button>
                        </Link>
                    </div>
                </div>
                <Card className="mb-8 shadow-xl">
                    <CardHeader><CardTitle className="flex items-center text-xl"><Plus /> Create New Game</CardTitle></CardHeader>
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
                                <Input value={newGame.teamA} onChange={(e) => setNewGame(prev => ({ ...prev, teamA: e.target.value }))} placeholder="Team A" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Team B</label>
                                <Input value={newGame.teamB} onChange={(e) => setNewGame(prev => ({ ...prev, teamB: e.target.value }))} placeholder="Team B" />
                            </div>
                            <Button onClick={createGame} disabled={!newGame.teamA.trim() || !newGame.teamB.trim() || !newGame.sport}><Plus /> Create</Button>
                        </div>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    {games.length === 0 ? <Card><p className="text-center text-gray-500 p-8">No games created yet.</p></Card> : games.map(game => <div key={game.id}>{renderSportTracker(game)}</div>)}
                </div>
            </div>
        </div>
    );
};

export default RealTimeSportsTracker;