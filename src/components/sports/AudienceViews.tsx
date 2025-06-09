import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

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
  current_half?: number;
  team_a_red_cards?: number;
  team_b_red_cards?: number;
  current_overs?: number;
  team_a_batsman_outs?: number;
  team_b_batsman_outs?: number;
  team_a_balls_faced?: number;
  team_b_balls_faced?: number;
  current_innings?: number;
  status: string;
}

interface AudienceViewProps {
  game: Game;
  onBackToOperator: () => void;
}

export const BasketballAudienceView = ({ game, onBackToOperator }: AudienceViewProps) => {
  // Calculate Quarter Fouls (reset each quarter)
  const quarterFoulsA = (game.team_a_fouls || 0) % 10; // Assuming max 10 fouls per quarter
  const quarterFoulsB = (game.team_b_fouls || 0) % 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-black text-white relative overflow-hidden">
      {/* Basketball court background */}
      <div className="absolute inset-0 opacity-10">
        <div className="text-[30rem] font-bold text-center pt-20">🏀</div>
      </div>
      
      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <Button 
          onClick={onBackToOperator}
          variant="outline"
          className="bg-black/50 border-orange-400 text-white hover:bg-orange-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Operator View
        </Button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-orange-400">BASKETBALL</h1>
          <Badge className="text-2xl px-6 py-2 bg-orange-600">
            Q{game.current_quarter || 1}
          </Badge>
        </div>

        {/* Main Display */}
        <div className="w-full max-w-7xl">
          {/* Score and Clock Layout */}
          <div className="grid grid-cols-3 gap-8 items-center mb-12">
            {/* Team A */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 text-orange-300">{game.team_a_name}</h2>
              <div className="text-8xl font-bold mb-6 text-white">{game.team_a_score}</div>
              <div className={`text-3xl font-semibold ${quarterFoulsA >= 4 ? 'text-red-400' : 'text-gray-300'}`}>
                Q FOULS: {quarterFoulsA}
              </div>
            </div>

            {/* Clock */}
            <div className="text-center">
              <div className="text-9xl font-mono font-bold text-orange-400 mb-4">
                {String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')}
              </div>
              <div className="text-4xl font-bold text-white">
                SHOT CLOCK: <span className={`${(game.shot_clock_seconds || 0) <= 5 ? 'text-red-400' : 'text-green-400'}`}>
                  {game.shot_clock_seconds || 24}
                </span>
              </div>
            </div>

            {/* Team B */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 text-orange-300">{game.team_b_name}</h2>
              <div className="text-8xl font-bold mb-6 text-white">{game.team_b_score}</div>
              <div className={`text-3xl font-semibold ${quarterFoulsB >= 4 ? 'text-red-400' : 'text-gray-300'}`}>
                Q FOULS: {quarterFoulsB}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FootballAudienceView = ({ game, onBackToOperator }: AudienceViewProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-black text-white relative overflow-hidden">
      {/* Football field background */}
      <div className="absolute inset-0 opacity-10">
        <div className="text-[30rem] font-bold text-center pt-20">⚽</div>
      </div>
      
      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <Button 
          onClick={onBackToOperator}
          variant="outline"
          className="bg-black/50 border-green-400 text-white hover:bg-green-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Operator View
        </Button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-green-400">FOOTBALL</h1>
        </div>

        {/* Main Display */}
        <div className="w-full max-w-7xl">
          {/* Score and Clock Layout */}
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Team A */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 text-green-300">{game.team_a_name}</h2>
              <div className="text-8xl font-bold text-white">{game.team_a_score}</div>
            </div>

            {/* Clock and Half Info */}
            <div className="text-center">
              <div className="text-9xl font-mono font-bold text-green-400 mb-4">
                {String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')}
              </div>
              <div className="text-3xl font-bold text-white">
                {game.current_half === 1 ? '1st Half' : game.current_half === 2 ? '2nd Half' : `Half ${game.current_half || 1}`}
              </div>
            </div>

            {/* Team B */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 text-green-300">{game.team_b_name}</h2>
              <div className="text-8xl font-bold text-white">{game.team_b_score}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CricketAudienceView = ({ game, onBackToOperator }: AudienceViewProps) => {
  const currentBattingTeam = (game.current_innings || 1) === 1 ? 'a' : 'b';
  const currentScore = currentBattingTeam === 'a' ? game.team_a_score : game.team_b_score;
  const currentWickets = currentBattingTeam === 'a' ? (game.team_a_batsman_outs || 0) : (game.team_b_batsman_outs || 0);
  const isSecondInnings = (game.current_innings || 1) === 2;
  const target = isSecondInnings ? (game.team_a_score || 0) + 1 : null;

  // Calculate current over summary
  const currentBalls = currentBattingTeam === 'a' ? (game.team_a_balls_faced || 0) : (game.team_b_balls_faced || 0);
  const oversCompleted = Math.floor(currentBalls / 6);
  const ballsInCurrentOver = currentBalls % 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-black text-white relative overflow-hidden">
      {/* Cricket field background */}
      <div className="absolute inset-0 opacity-10">
        <div className="text-[30rem] font-bold text-center pt-20">🏏</div>
      </div>
      
      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <Button 
          onClick={onBackToOperator}
          variant="outline"
          className="bg-black/50 border-green-400 text-white hover:bg-green-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Operator View
        </Button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-green-400">CRICKET</h1>
          <Badge className="text-2xl px-6 py-2 bg-green-600">
            {isSecondInnings ? "2nd Innings" : "1st Innings"}
          </Badge>
        </div>

        {/* Main Display */}
        <div className="w-full max-w-6xl text-center">
          {/* Current Batting Team */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-green-300">
              {currentBattingTeam === 'a' ? game.team_a_name : game.team_b_name}
            </h2>
            <div className="text-9xl font-bold text-white mb-4">
              {currentScore}/{currentWickets}
            </div>
            <div className="text-3xl text-green-300">
              {oversCompleted}.{ballsInCurrentOver} overs
            </div>
          </div>

          {/* Target Display for 2nd Innings */}
          {target && (
            <div className="mb-8 p-6 bg-green-800/50 rounded-lg">
              <div className="text-2xl text-green-300 mb-2">TARGET</div>
              <div className="text-6xl font-bold text-yellow-400">{target}</div>
            </div>
          )}

          {/* Current Over Summary */}
          <div className="bg-black/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Current Over</h3>
            <div className="text-xl text-gray-300">
              Over {oversCompleted + 1}: {ballsInCurrentOver} balls
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};