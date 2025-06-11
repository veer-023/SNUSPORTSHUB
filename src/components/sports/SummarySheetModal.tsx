import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
    team_a_name: string;
    team_b_name: string;
    team_a_score: number;
    team_b_score: number;
    team_a_roster: Player[];
    team_b_roster: Player[];
    quarter_scores: {
        q1: { a: number; b: number };
        q2: { a: number; b: number };
        q3: { a: number; b: number };
        q4: { a: number; b: number };
    };
}

interface SummarySheetModalProps {
    game: Game;
    onClose: () => void;
}

export const SummarySheetModal = ({ game, onClose }: SummarySheetModalProps) => {
    const renderTeamStats = (roster: Player[], teamName: string) => {
        const totalPoints = roster.reduce((sum, player) => sum + (player.points || 0), 0);
        const totalRebounds = roster.reduce((sum, player) => sum + (player.rebounds || 0), 0);
        const totalAssists = roster.reduce((sum, player) => sum + (player.assists || 0), 0);
        const totalSteals = roster.reduce((sum, player) => sum + (player.steals || 0), 0);
        const totalBlocks = roster.reduce((sum, player) => sum + (player.blocks || 0), 0);
        const totalFouls = roster.reduce((sum, player) => sum + (player.fouls || 0), 0);

        return (
            <div className="space-y-4">
                <h3 className="text-xl font-bold">{teamName}</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Total Points:</span>
                            <span className="font-bold">{totalPoints}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Rebounds:</span>
                            <span className="font-bold">{totalRebounds}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Assists:</span>
                            <span className="font-bold">{totalAssists}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Total Steals:</span>
                            <span className="font-bold">{totalSteals}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Blocks:</span>
                            <span className="font-bold">{totalBlocks}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Fouls:</span>
                            <span className="font-bold">{totalFouls}</span>
                        </div>
                    </div>
                </div>

                {/* Player Stats Table */}
                <div className="mt-4">
                    <h4 className="font-bold mb-2">Player Statistics</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">#</th>
                                    <th className="p-2 text-left">Player</th>
                                    <th className="p-2 text-center">PTS</th>
                                    <th className="p-2 text-center">REB</th>
                                    <th className="p-2 text-center">AST</th>
                                    <th className="p-2 text-center">STL</th>
                                    <th className="p-2 text-center">BLK</th>
                                    <th className="p-2 text-center">FLS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roster.map(player => (
                                    <tr key={player.id} className="border-b">
                                        <td className="p-2">{player.number}</td>
                                        <td className="p-2">{player.name}</td>
                                        <td className="p-2 text-center">{player.points || 0}</td>
                                        <td className="p-2 text-center">{player.rebounds || 0}</td>
                                        <td className="p-2 text-center">{player.assists || 0}</td>
                                        <td className="p-2 text-center">{player.steals || 0}</td>
                                        <td className="p-2 text-center">{player.blocks || 0}</td>
                                        <td className="p-2 text-center">{player.fouls || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="modal">
            <div className="modal-content" style={{ maxWidth: '90vw', width: '1000px' }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Game Summary</span>
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <X className="w-4 h-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* Final Score */}
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-2">Final Score</h2>
                                <div className="text-4xl font-bold">
                                    {game.team_a_name} {game.team_a_score} - {game.team_b_score} {game.team_b_name}
                                </div>
                            </div>

                            {/* Quarter Scores */}
                            <div>
                                <h3 className="text-xl font-bold mb-4">Quarter Scores</h3>
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
                            </div>

                            {/* Team Stats */}
                            <div className="grid grid-cols-2 gap-8">
                                {renderTeamStats(game.team_a_roster, game.team_a_name)}
                                {renderTeamStats(game.team_b_roster, game.team_b_name)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}; 
