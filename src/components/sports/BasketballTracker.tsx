import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trophy } from "lucide-react";
import { BasketballTracker } from "./sports/BasketballTracker";
import { FootballTracker } from "./sports/FootballTracker";
import { CricketTracker } from "./sports/CricketTracker";
import { BadmintonTracker } from "./sports/BadmintonTracker";
import { BasketballAudienceView } from "./sports/BasketballAudienceView";
import { WinnerPopup } from "./WinnerPopup"; // Assuming you create this component

const RealTimeSportsTracker = () => {
    const [games, setGames] = useState([]);
    const [newGame, setNewGame] = useState({ teamA: "", teamB: "", sport: "", showLeaderboard: false });
    const [audienceGameId, setAudienceGameId] = useState(null);
    const [winner, setWinner] = useState(null);
    const [lastScorer, setLastScorer] = useState(null);
    const [lastSubstitution, setLastSubstitution] = useState(null);
    const [showAudienceTopScorer, setShowAudienceTopScorer] = useState(null);

    const handleShowTopScorer = (gameId) => {
        const game = games.find(g => g.id === gameId);
        if (!game) return;
        const allPlayers = [...(game.team_a_roster || []), ...(game.team_b_roster || [])];
        if (allPlayers.length === 0) return;
        const topScorer = allPlayers.reduce((max, player) => (player.points || 0) > (max.points || 0) ? player : max, allPlayers[0]);
        
        if (topScorer && topScorer.points > 0) {
            const teamName = (game.team_a_roster || []).some(p => p.id === topScorer.id) ? game.team_a_name : game.team_b_name;
            setShowAudienceTopScorer({
                gameId,
                name: topScorer.name,
                teamName: teamName,
                points: topScorer.points,
                timestamp: Date.now() 
            });
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setGames(prevGames => 
                prevGames.map(game => {
                    if (!game.clock_running || game.status !== 'active') {
                        return game;
                    }
                    
                    let newGame = {...game};
                    let totalSeconds = newGame.game_clock_minutes * 60 + newGame.game_clock_seconds - 1;
                    if (totalSeconds < 0) {
                        newGame.clock_running = false;
                        totalSeconds = 0;
                        if(newGame.current_quarter === 4) { 
                            newGame.status = 'finished';
                            if(newGame.team_a_score > newGame.team_b_score) setWinner(newGame.team_a_name);
                            else if (newGame.team_b_score > newGame.team_a_score) setWinner(newGame.team_b_name);
                            else setWinner("It's a tie!");
                        }
                    }
                    newGame.game_clock_minutes = Math.floor(totalSeconds / 60);
                    newGame.game_clock_seconds = totalSeconds % 60;
                    
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
        const optimisticGame = {
            id: tempId, sport: newGame.sport, team_a_name: newGame.teamA.trim(), team_b_name: newGame.teamB.trim(), team_a_score: 0, team_b_score: 0,
            team_a_roster: [], team_b_roster: [], showLeaderboard: newGame.showLeaderboard,
            game_clock_minutes: 12, game_clock_seconds: 0, clock_running: false,
            quarter_length: 12,
            current_quarter: 1, team_a_fouls: 0, team_b_fouls: 0, team_a_blocks: 0, team_b_blocks: 0, team_a_turnovers: 0, team_b_turnovers: 0, shot_clock_seconds: 24, status: 'active',
            quarter_scores: {q1:{a:0, b:0}, q2:{a:0, b:0}, q3:{a:0, b:0}, q4:{a:0, b:0}}
        };
        setGames(prev => [optimisticGame, ...prev]);
        setNewGame({ teamA: "", teamB: "", sport: "", showLeaderboard: false });
    }, [newGame]);

    const updateGame = useCallback(async (gameId, updates) => {
        setGames(prev => prev.map(game => game.id === gameId ? { ...game, ...updates } : game));
    }, []);
    
    const audienceGame = games.find(g => g.id === audienceGameId);

    if (audienceGame) {
        return <BasketballAudienceView game={audienceGame} onBack={() => setAudienceGameId(null)} lastScorer={lastScorer} lastSubstitution={lastSubstitution} showTopScorerData={showAudienceTopScorer} />;
    }
    
    const renderSportTracker = (game) => {
        switch (game.sport) {
        case 'basketball':
            return <BasketballTracker game={game} onUpdate={updateGame} onViewAudience={setAudienceGameId} setLastScorer={setLastScorer} setLastSubstitution={setLastSubstitution} onShowTopScorer={handleShowTopScorer} />;
        // Other cases remain the same
        default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {winner && <WinnerPopup winner={winner} onClose={() => setWinner(null)} />}
            <div className="container mx-auto px-4 py-6 max-w-4xl">
                <div className="text-center mb-8 pt-4">
                    <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2"> <Trophy /> Sports Tracker</h1>
                </div>
                <Card className="mb-8 shadow-xl">
                    <CardHeader><CardTitle className="flex items-center text-xl"><Plus /> Create New Game</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                            <div>
                                <label className="block text-sm font-medium mb-1">Sport</label>
                                <Select value={newGame.sport} onValueChange={(value) => setNewGame(prev => ({ ...prev, sport: value }))}>
                                    <option value="" disabled>Select sport</option>
                                    <SelectItem value="basketball">🏀 Basketball</SelectItem>
                                    <SelectItem value="football">⚽ Football</SelectItem>
                                    <SelectItem value="cricket">🏏 Cricket</SelectItem>
                                    <SelectItem value="badminton">🏸 Badminton</SelectItem>
                                </Select>
                            </div>
                             {newGame.sport === 'basketball' && <div>
                                <label className="block text-sm font-medium mb-1">Enable Live Stats?</label>
                                <div className="flex gap-2">
                                    <Button className={`w-full ${newGame.showLeaderboard ? 'bg-green-600' : 'bg-gray-300'}`} onClick={() => setNewGame(prev => ({...prev, showLeaderboard: true}))}>Yes</Button>
                                    <Button className={`w-full ${!newGame.showLeaderboard ? 'bg-red-600' : 'bg-gray-300'}`} onClick={() => setNewGame(prev => ({...prev, showLeaderboard: false}))}>No</Button>
                                </div>
                            </div>}
                            <div>
                                <label className="block text-sm font-medium mb-1">Team A</label>
                                <Input value={newGame.teamA} onChange={(e) => setNewGame(prev => ({ ...prev, teamA: e.target.value }))} placeholder="Team A"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Team B</label>
                                <Input value={newGame.teamB} onChange={(e) => setNewGame(prev => ({ ...prev, teamB: e.target.value }))} placeholder="Team B"/>
                            </div>
                        </div>
                         <Button onClick={createGame} disabled={!newGame.teamA.trim() || !newGame.teamB.trim() || !newGame.sport} className="w-full mt-4"><Plus /> Create Game</Button>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    {games.length === 0 ? <Card><p className="text-center text-gray-500 p-8">No games created yet.</p></Card> : games.map(game => <div key={game.id}>{renderSportTracker(game)}</div>) }
                </div>
            </div>
        </div>
    );
};
