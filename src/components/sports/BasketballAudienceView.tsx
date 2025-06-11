import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Player {
    id: string;
    name: string;
    number: string;
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    fouls: number;
}

interface Game {
    id: string;
    team_a_name: string;
    team_b_name: string;
    team_a_score: number;
    team_b_score: number;
    team_a_roster: Player[];
    team_b_roster: Player[];
    current_quarter: number;
    game_clock_minutes: number;
    game_clock_seconds: number;
    clock_running: boolean;
    shot_clock_seconds: number;
    team_a_fouls: number;
    team_b_fouls: number;
    quarter_scores: {
        q1: { a: number; b: number };
        q2: { a: number; b: number };
        q3: { a: number; b: number };
        q4: { a: number; b: number };
    };
}

interface BasketballAudienceViewProps {
    game: Game;
    onBack: () => void;
    lastScorer: { name: string; points: number; team: string } | null;
    lastSubstitution: { playerIn: string; playerOut: string; team: string } | null;
    showTopScorerData: { name: string; teamName: string; points: number } | null;
}

export const BasketballAudienceView = ({
    game,
    onBack,
    lastScorer,
    lastSubstitution,
    showTopScorerData
}: BasketballAudienceViewProps) => {
    const [showScorerPopup, setShowScorerPopup] = useState(false);
    const [showSubPopup, setShowSubPopup] = useState(false);
    const [showTopScorerPopup, setShowTopScorerPopup] = useState(false);

    useEffect(() => {
        if (lastScorer) {
            setShowScorerPopup(true);
            const timer = setTimeout(() => setShowScorerPopup(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [lastScorer]);

    useEffect(() => {
        if (lastSubstitution) {
            setShowSubPopup(true);
            const timer = setTimeout(() => setShowSubPopup(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [lastSubstitution]);

    useEffect(() => {
        if (showTopScorerData) {
            setShowTopScorerPopup(true);
            const timer = setTimeout(() => setShowTopScorerPopup(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showTopScorerData]);

    return (
        <div className="min-h-screen audience-view-bg">
            <div className="relative z-10 container mx-auto px-4 py-6">
                <Button onClick={onBack} className="mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Games
                </Button>

                {/* Main Scoreboard */}
                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">🏀 BASKETBALL GAME</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-8">
                            {/* Team A */}
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">{game.team_a_name}</h2>
                                <div className="text-6xl font-bold mb-4">{game.team_a_score}</div>
                            </div>

                            {/* Team B */}
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">{game.team_b_name}</h2>
                                <div className="text-6xl font-bold mb-4">{game.team_b_score}</div>
                            </div>
                        </div>

                        {/* Game Clock */}
                        <div className="text-center mt-4">
                            <div className="text-4xl font-mono font-bold">
                                Q{game.current_quarter} - {String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')}
                            </div>
                            {game.shot_clock_seconds > 0 && (
                                <div className={`text-2xl font-bold mt-2 ${game.shot_clock_seconds <= 5 ? 'text-red-500' : ''}`}>
                                    Shot Clock: {game.shot_clock_seconds}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quarter Scores */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-center">Quarter Scores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-5 gap-4 text-center">
                            <div className="font-bold">Quarter</div>
                            <div className="font-bold">{game.team_a_name}</div>
                            <div className="font-bold">-</div>
                            <div className="font-bold">{game.team_b_name}</div>
                            <div className="font-bold">Total</div>
                            
                            {[1, 2, 3, 4].map((q) => (
                                <>
                                    <div>Q{q}</div>
                                    <div>{game.quarter_scores[`q${q}`].a}</div>
                                    <div>-</div>
                                    <div>{game.quarter_scores[`q${q}`].b}</div>
                                    <div>{game.quarter_scores[`q${q}`].a + game.quarter_scores[`q${q}`].b}</div>
                                </>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Team Stats */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Team A Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">{game.team_a_name} Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Team Fouls:</span>
                                    <span className="foul-flag-red">{game.team_a_fouls}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Top Scorer:</span>
                                    <span>
                                        {game.team_a_roster.reduce((max, player) => 
                                            (player.points || 0) > (max.points || 0) ? player : max
                                        , game.team_a_roster[0])?.name || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Team B Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">{game.team_b_name} Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Team Fouls:</span>
                                    <span className="foul-flag-red">{game.team_b_fouls}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Top Scorer:</span>
                                    <span>
                                        {game.team_b_roster.reduce((max, player) => 
                                            (player.points || 0) > (max.points || 0) ? player : max
                                        , game.team_b_roster[0])?.name || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Popups */}
                {showScorerPopup && lastScorer && (
                    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 scorer-popup">
                        <div className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg text-center">
                            <div className="text-xl font-bold">{lastScorer.name}</div>
                            <div className="text-2xl font-bold text-glow-white">+{lastScorer.points} Points!</div>
                            <div className="text-sm">{lastScorer.team}</div>
                        </div>
                    </div>
                )}

                {showSubPopup && lastSubstitution && (
                    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 sub-popup">
                        <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-center">
                            <div className="text-xl font-bold">Substitution</div>
                            <div className="text-lg">{lastSubstitution.playerIn} IN</div>
                            <div className="text-lg">{lastSubstitution.playerOut} OUT</div>
                            <div className="text-sm">{lastSubstitution.team}</div>
                        </div>
                    </div>
                )}

                {showTopScorerPopup && showTopScorerData && (
                    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 popup-animation">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg shadow-lg text-center">
                            <div className="text-2xl font-bold text-glow-orange">Top Scorer!</div>
                            <div className="text-xl font-bold">{showTopScorerData.name}</div>
                            <div className="text-3xl font-bold text-glow-white">{showTopScorerData.points} Points</div>
                            <div className="text-sm">{showTopScorerData.teamName}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 
