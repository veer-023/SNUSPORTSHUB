import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Pause, Plus, Minus, Square, Edit } from "lucide-react";

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
  shot_clock_seconds?: number;
  status: string;
}

interface BasketballTrackerProps {
  game: Game;
  onUpdate: (gameId: string, updates: Partial<Game>) => void;
  onViewAudience: (gameId: string) => void;
}

export const BasketballTracker = ({ game, onUpdate, onViewAudience }: BasketballTrackerProps) => {
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
        const newQuarter = Math.max(1, Math.min(4, (game.current_quarter || 1) + increment));
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
        <Card className="mb-4 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
             <div className="absolute -bottom-20 -right-20 w-48 h-48 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.866 8.23 6.839 9.54"></path><path d="M22 12a10 10 0 0 0-10-10c-4.42 0-8.23 2.866-9.54 6.839"></path><path d="M2 12h20"></path></svg>
            </div>
            <div className="relative z-10 p-4">
                <div className="text-center space-y-2 mb-4">
                    <h3 className="text-xl font-bold">🏀 BASKETBALL GAME</h3>
                    <div className="flex justify-center items-center gap-4">
                        <span className="font-semibold">Q{game.current_quarter || 1}/4</span>
                        <span className="text-2xl font-mono">{String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')}</span>
                        <Button variant="ghost" className="p-2 h-auto" onClick={() => onUpdate(game.id, { status: game.status === 'active' ? 'paused' : 'active', clock_running: game.status !== 'active' })}>
                            {game.status === 'active' ? <Pause /> : <Play />}
                        </Button>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <span className="font-semibold">Shot Clock: {game.shot_clock_seconds}</span>
                        <Button size="sm" variant="outline" className="text-xs h-6 bg-white/20 border-white/50 text-white" onClick={() => onUpdate(game.id, { shot_clock_seconds: 24 })}>24s</Button>
                        <Button size="sm" variant="outline" className="text-xs h-6 bg-white/20 border-white/50 text-white" onClick={() => onUpdate(game.id, { shot_clock_seconds: 14 })}>14s</Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <h4 className="font-bold text-2xl">{game.team_a_name}</h4>
                        <p className="text-6xl font-bold my-2">{game.team_a_score}</p>
                        <p>Team Fouls: {game.team_a_fouls || 0}</p>
                        <p className="text-xs">Foul Outs: 0</p>
                        <div className="mt-4 space-x-1">
                            <Button size="sm" className="bg-white/20" onClick={() => updateScore('a', 1)} disabled={isPaused}>+1</Button>
                            <Button size="sm" className="bg-white/20" onClick={() => updateScore('a', 2)} disabled={isPaused}>+2</Button>
                            <Button size="sm" className="bg-white/20" onClick={() => updateScore('a', 3)} disabled={isPaused}>+3</Button>
                            <Button size="sm" className="bg-red-500/50" onClick={() => updateScore('a', -1)} disabled={isPaused}>-1</Button>
                        </div>
                        <div className="mt-2 flex justify-center items-center gap-2">
                            <Button size="sm" variant="outline" className="p-2 h-auto bg-white/20 border-white/50" onClick={() => updateFouls('a', -1)} disabled={isPaused}><Minus /></Button>
                            <span>Fouls</span>
                            <Button size="sm" variant="outline" className="p-2 h-auto bg-white/20 border-white/50" onClick={() => updateFouls('a', 1)} disabled={isPaused}><Plus /></Button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-2xl">{game.team_b_name}</h4>
                        <p className="text-6xl font-bold my-2">{game.team_b_score}</p>
                        <p>Team Fouls: {game.team_b_fouls || 0}</p>
                        <p className="text-xs">Foul Outs: 0</p>
                        <div className="mt-4 space-x-1">
                            <Button size="sm" className="bg-white/20" onClick={() => updateScore('b', 1)} disabled={isPaused}>+1</Button>
                            <Button size="sm" className="bg-white/20" onClick={() => updateScore('b', 2)} disabled={isPaused}>+2</Button>
                            <Button size="sm" className="bg-white/20" onClick={() => updateScore('b', 3)} disabled={isPaused}>+3</Button>
                            <Button size="sm" className="bg-red-500/50" onClick={() => updateScore('b', -1)} disabled={isPaused}>-1</Button>
                        </div>
                        <div className="mt-2 flex justify-center items-center gap-2">
                            <Button size="sm" variant="outline" className="p-2 h-auto bg-white/20 border-white/50" onClick={() => updateFouls('b', -1)} disabled={isPaused}><Minus /></Button>
                            <span>Fouls</span>
                            <Button size="sm" variant="outline" className="p-2 h-auto bg-white/20 border-white/50" onClick={() => updateFouls('b', 1)} disabled={isPaused}><Plus /></Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <Button variant="ghost" className="p-2 h-auto" onClick={() => updateQuarter(-1)}><Minus /></Button>
                    <span className="font-semibold">Quarter {game.current_quarter}</span>
                    <Button variant="ghost" className="p-2 h-auto" onClick={() => updateQuarter(1)}><Plus /></Button>
                    {isEditingTime ? (<div className="flex items-center gap-2"><Input type="number" value={quarterTime} onChange={(e) => setQuarterTime(Number(e.target.value))} className="w-20 text-black" min="1" max="30" /><Button onClick={handleSetTime}>Set</Button></div>) : (<Button variant="ghost" size="sm" onClick={() => setIsEditingTime(true)}><Edit /></Button>)}
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <Button onClick={() => onViewAudience(game.id)} variant="outline" className="bg-white/20 border-white/50">Audience View</Button>
                    <Button onClick={() => onUpdate(game.id, { status: 'finished', clock_running: false })} variant="destructive"><Square /> End Game</Button>
                </div>
            </div>
        </Card>
    );
};