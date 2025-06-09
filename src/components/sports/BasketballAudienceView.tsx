import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface BasketballAudienceViewProps {
  game: Game;
  onBack: () => void;
}

export const BasketballAudienceView = ({ game, onBack }: BasketballAudienceViewProps) => {
    return (
        <div className="min-h-screen audience-view-bg text-white flex flex-col items-center justify-center p-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <div className="relative z-10 w-full">
                <Button onClick={onBack} variant="outline" className="absolute top-0 left-4 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/70">
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
                                <div className="text-4xl sm:text-5xl font-mono bg-red-600/80 border-2 border-red-400 px-4 sm:px-6 py-2 rounded-lg shadow-lg text-glow-white">
                                    {game.shot_clock_seconds}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="py-8 sm:py-12 px-4">
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="text-center">
                                <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight uppercase mb-4">{game.team_a_name}</h2>
                                <div className="text-6xl sm:text-8xl font-bold text-orange-400 text-glow-orange">{game.team_a_score}</div>
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight uppercase mb-4">{game.team_b_name}</h2>
                                <div className="text-6xl sm:text-8xl font-bold text-orange-400 text-glow-orange">{game.team_b_score}</div>
                            </div>
                        </div>
                        <div className="text-center mb-8">
                            <div className="text-5xl sm:text-7xl font-mono font-bold text-white text-glow-white">
                                {String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={`text-center text-lg sm:text-2xl font-semibold ${(game.team_a_fouls || 0) >= 4 ? 'foul-flag-red' : 'text-gray-400'}`}>Q FOULS: {game.team_a_fouls || 0}</div>
                            <div className={`text-center text-lg sm:text-2xl font-semibold ${(game.team_b_fouls || 0) >= 4 ? 'foul-flag-red' : 'text-gray-400'}`}>Q FOULS: {game.team_b_fouls || 0}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};