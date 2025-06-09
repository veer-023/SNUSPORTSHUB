import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Minus, AlertCircle, FileText, Target } from "lucide-react";

interface Game {
  id: string;
  sport: string;
  team_a_name: string;
  team_b_name: string;
  team_a_score: number;
  team_b_score: number;
  current_overs?: number;
  team_a_batsman_outs?: number;
  team_b_batsman_outs?: number;
  team_a_balls_faced?: number;
  team_b_balls_faced?: number;
  team_a_wide_balls?: number;
  team_b_wide_balls?: number;
  team_a_no_balls?: number;
  team_b_no_balls?: number;
  current_innings?: number; // 1 or 2
  status: string;
}

interface CricketTrackerProps {
  game: Game;
  onUpdate: (gameId: string, updates: Partial<Game>) => void;
}

export const CricketTracker = ({ game, onUpdate }: CricketTrackerProps) => {
  const [showReport, setShowReport] = useState(false);
  const [ballsInCurrentOver, setBallsInCurrentOver] = useState(0);

  // Get current batting team
  const getCurrentBattingTeam = () => {
    return (game.current_innings || 1) === 1 ? 'a' : 'b';
  };

  const currentBattingTeam = getCurrentBattingTeam();
  const currentScore = currentBattingTeam === 'a' ? game.team_a_score : game.team_b_score;
  const currentWickets = currentBattingTeam === 'a' ? (game.team_a_batsman_outs || 0) : (game.team_b_batsman_outs || 0);

  const updateScore = (increment: number, addBall: boolean = true) => {
    const team = currentBattingTeam;
    const scoreField = team === 'a' ? 'team_a_score' : 'team_b_score';
    const ballsField = team === 'a' ? 'team_a_balls_faced' : 'team_b_balls_faced';
    
    const updates: Partial<Game> = {
      [scoreField]: Math.max(0, currentScore + increment)
    };

    if (addBall) {
      const currentBalls = team === 'a' ? (game.team_a_balls_faced || 0) : (game.team_b_balls_faced || 0);
      updates[ballsField] = currentBalls + 1;
      
      // Update overs
      const newBalls = currentBalls + 1;
      const overs = Math.floor(newBalls / 6);
      const ballsInOver = newBalls % 6;
      updates.current_overs = parseFloat(`${overs}.${ballsInOver}`);
    }

    onUpdate(game.id, updates);
  };

  const updateWide = (increment: number) => {
    const team = currentBattingTeam;
    const scoreField = team === 'a' ? 'team_a_score' : 'team_b_score';
    const wideField = team === 'a' ? 'team_a_wide_balls' : 'team_b_wide_balls';
    
    onUpdate(game.id, {
      [scoreField]: Math.max(0, currentScore + increment),
      [wideField]: Math.max(0, (team === 'a' ? (game.team_a_wide_balls || 0) : (game.team_b_wide_balls || 0)) + (increment > 0 ? 1 : -1))
    });
  };

  const updateNoBall = (increment: number) => {
    const team = currentBattingTeam;
    const scoreField = team === 'a' ? 'team_a_score' : 'team_b_score';
    const noBallField = team === 'a' ? 'team_a_no_balls' : 'team_b_no_balls';
    
    onUpdate(game.id, {
      [scoreField]: Math.max(0, currentScore + increment),
      [noBallField]: Math.max(0, (team === 'a' ? (game.team_a_no_balls || 0) : (game.team_b_no_balls || 0)) + (increment > 0 ? 1 : -1))
    });
  };

  const updateOuts = (increment: number) => {
    const team = currentBattingTeam;
    const field = team === 'a' ? 'team_a_batsman_outs' : 'team_b_batsman_outs';
    const currentOuts = team === 'a' ? (game.team_a_batsman_outs || 0) : (game.team_b_batsman_outs || 0);
    const newOuts = Math.max(0, Math.min(10, currentOuts + increment));
    
    const updates: Partial<Game> = {
      [field]: newOuts
    };

    // Add ball if getting out
    if (increment > 0) {
      const ballsField = team === 'a' ? 'team_a_balls_faced' : 'team_b_balls_faced';
      const currentBalls = team === 'a' ? (game.team_a_balls_faced || 0) : (game.team_b_balls_faced || 0);
      updates[ballsField] = currentBalls + 1;
      
      const newBalls = currentBalls + 1;
      const overs = Math.floor(newBalls / 6);
      const ballsInOver = newBalls % 6;
      updates.current_overs = parseFloat(`${overs}.${ballsInOver}`);
    }

    onUpdate(game.id, updates);
  };

  const updateOvers = (increment: number) => {
    const newOvers = Math.max(0, Math.min(60, (game.current_overs || 0) + increment));
    onUpdate(game.id, { current_overs: newOvers });
  };

  const switchInnings = () => {
    const newInnings = (game.current_innings || 1) === 1 ? 2 : 1;
    onUpdate(game.id, { 
      current_innings: newInnings,
      current_overs: 0,
      status: newInnings === 2 ? 'active' : 'finished'
    });
  };

  const generateReport = () => {
    return {
      teamA: {
        name: game.team_a_name,
        runs: game.team_a_score || 0,
        wickets: game.team_a_batsman_outs || 0,
        wides: game.team_a_wide_balls || 0,
        noBalls: game.team_a_no_balls || 0,
        ballsFaced: game.team_a_balls_faced || 0,
        overs: Math.floor((game.team_a_balls_faced || 0) / 6) + '.' + ((game.team_a_balls_faced || 0) % 6)
      },
      teamB: {
        name: game.team_b_name,
        runs: game.team_b_score || 0,
        wickets: game.team_b_batsman_outs || 0,
        wides: game.team_b_wide_balls || 0,
        noBalls: game.team_b_no_balls || 0,
        ballsFaced: game.team_b_balls_faced || 0,
        overs: Math.floor((game.team_b_balls_faced || 0) / 6) + '.' + ((game.team_b_balls_faced || 0) % 6)
      }
    };
  };

  const canSwitchInnings = currentWickets >= 10;
  const isSecondInnings = (game.current_innings || 1) === 2;

  return (
    <div className="space-y-6">
      {/* Main Scoreboard */}
      <Card className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/20 to-transparent"></div>
        <div className="absolute top-4 right-4 text-8xl opacity-10">🏏</div>
        
        <CardHeader className="text-center pb-4 relative z-10">
          <CardTitle className="text-3xl font-bold mb-2">🏏 CRICKET MATCH</CardTitle>
          <div className="flex justify-center gap-4">
            <Badge className="bg-white/20 text-white">
              Overs: {Math.floor((game.current_overs || 0))}.{Math.round(((game.current_overs || 0) % 1) * 10)}/60
            </Badge>
            <Badge className="bg-white/20 text-white">
              {isSecondInnings ? "2nd Innings" : "1st Innings"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {currentBattingTeam === 'a' ? game.team_a_name : game.team_b_name} (Batting)
            </h2>
            <div className="text-7xl font-bold mb-2">{currentScore}/{currentWickets}</div>
            <div className="text-lg opacity-90">
              {Math.floor(((currentBattingTeam === 'a' ? game.team_a_balls_faced : game.team_b_balls_faced) || 0) / 6)}.
              {((currentBattingTeam === 'a' ? game.team_a_balls_faced : game.team_b_balls_faced) || 0) % 6} overs
            </div>
          </div>

          {/* Scoring Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-center">Runs</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button onClick={() => updateScore(1)} disabled={game.status !== 'active'} className="bg-white/20 hover:bg-white/30 font-bold">+1</Button>
                <Button onClick={() => updateScore(2)} disabled={game.status !== 'active'} className="bg-white/20 hover:bg-white/30 font-bold">+2</Button>
                <Button onClick={() => updateScore(6)} disabled={game.status !== 'active'} className="bg-white/20 hover:bg-white/30 font-bold">+6</Button>
                <Button onClick={() => updateScore(-1)} disabled={game.status !== 'active'} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">-1</Button>
                <Button onClick={() => updateScore(-2)} disabled={game.status !== 'active'} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">-2</Button>
                <Button onClick={() => updateScore(-6)} disabled={game.status !== 'active'} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">-6</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-center">Extras & Wickets</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => updateWide(1)} disabled={game.status !== 'active'} className="bg-yellow-500/80 hover:bg-yellow-600/80 font-bold">Wide</Button>
                <Button onClick={() => updateNoBall(1)} disabled={game.status !== 'active'} className="bg-red-500/80 hover:bg-red-600/80 font-bold">No Ball</Button>
                <Button onClick={() => updateWide(-1)} disabled={game.status !== 'active'} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs">-Wide</Button>
                <Button onClick={() => updateNoBall(-1)} disabled={game.status !== 'active'} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs">-No Ball</Button>
              </div>
              <Button 
                onClick={() => updateOuts(1)} 
                disabled={game.status !== 'active' || currentWickets >= 10} 
                className="w-full bg-red-600/80 hover:bg-red-700/80 font-bold"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                OUT
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Control */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              Overs Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button onClick={() => updateOvers(-1)} disabled={game.status !== 'active'} variant="outline" size="lg">
                <Minus className="w-5 h-5" />
              </Button>
              <div className="text-3xl font-bold px-6 py-2 bg-green-100 rounded-lg text-green-800">
                {Math.floor(game.current_overs || 0)}.{Math.round(((game.current_overs || 0) % 1) * 10)}
              </div>
              <Button onClick={() => updateOvers(1)} disabled={game.status !== 'active'} variant="outline" size="lg">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-center text-sm text-gray-600">Max 60 overs</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Innings Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {canSwitchInnings && !isSecondInnings && (
              <Button onClick={switchInnings} className="w-full bg-blue-600 hover:bg-blue-700">
                End 1st Innings
              </Button>
            )}
            {isSecondInnings && (
              <Button onClick={() => onUpdate(game.id, { status: 'finished' })} className="w-full bg-green-600 hover:bg-green-700">
                Final
              </Button>
            )}
            <Dialog open={showReport} onOpenChange={setShowReport}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Match Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Match Report</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {(() => {
                    const report = generateReport();
                    return (
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg">{report.teamA.name}</h3>
                          <div className="bg-gray-50 p-3 rounded space-y-1">
                            <div>Runs: <span className="font-bold">{report.teamA.runs}</span></div>
                            <div>Wickets: <span className="font-bold">{report.teamA.wickets}/10</span></div>
                            <div>Overs: <span className="font-bold">{report.teamA.overs}</span></div>
                            <div>Wides: <span className="font-bold">{report.teamA.wides}</span></div>
                            <div>No Balls: <span className="font-bold">{report.teamA.noBalls}</span></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg">{report.teamB.name}</h3>
                          <div className="bg-gray-50 p-3 rounded space-y-1">
                            <div>Runs: <span className="font-bold">{report.teamB.runs}</span></div>
                            <div>Wickets: <span className="font-bold">{report.teamB.wickets}/10</span></div>
                            <div>Overs: <span className="font-bold">{report.teamB.overs}</span></div>
                            <div>Wides: <span className="font-bold">{report.teamB.wides}</span></div>
                            <div>No Balls: <span className="font-bold">{report.teamB.noBalls}</span></div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{game.team_a_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Score:</span>
                <span className="font-bold">{game.team_a_score || 0}/{game.team_a_batsman_outs || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Balls Faced:</span>
                <span>{game.team_a_balls_faced || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Wides:</span>
                <span>{game.team_a_wide_balls || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>No Balls:</span>
                <span>{game.team_a_no_balls || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{game.team_b_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Score:</span>
                <span className="font-bold">{game.team_b_score || 0}/{game.team_b_batsman_outs || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Balls Faced:</span>
                <span>{game.team_b_balls_faced || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Wides:</span>
                <span>{game.team_b_wide_balls || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>No Balls:</span>
                <span>{game.team_b_no_balls || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};