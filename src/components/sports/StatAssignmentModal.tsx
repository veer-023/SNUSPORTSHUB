import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface StatAssignmentModalProps {
    teamName: string;
    roster: Player[];
    onClose: () => void;
    onSave: (playerId: string, statType: string, value: number) => void;
}

export const StatAssignmentModal = ({ teamName, roster, onClose, onSave }: StatAssignmentModalProps) => {
    const [selectedPlayer, setSelectedPlayer] = useState<string>("");
    const [selectedStat, setSelectedStat] = useState<string>("");
    const [value, setValue] = useState<number>(1);

    const statTypes = [
        { value: "points", label: "Points" },
        { value: "rebounds", label: "Rebounds" },
        { value: "assists", label: "Assists" },
        { value: "steals", label: "Steals" },
        { value: "blocks", label: "Blocks" },
        { value: "fouls", label: "Fouls" }
    ];

    const handleSave = () => {
        if (selectedPlayer && selectedStat) {
            onSave(selectedPlayer, selectedStat, value);
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Assign Stats - {teamName}</span>
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <X className="w-4 h-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Player Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Player</label>
                                <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose player" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roster.map(player => (
                                            <SelectItem key={player.id} value={player.id}>
                                                #{player.number} {player.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Stat Type Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Stat</label>
                                <Select value={selectedStat} onValueChange={setSelectedStat}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose stat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statTypes.map(stat => (
                                            <SelectItem key={stat.value} value={stat.value}>
                                                {stat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Value Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Value</label>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setValue(Math.max(1, value - 1))}
                                    >
                                        -
                                    </Button>
                                    <div className="flex-1 text-center py-2 bg-gray-100 rounded">
                                        {value}
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => setValue(value + 1)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            {/* Save Button */}
                            <Button
                                className="w-full"
                                onClick={handleSave}
                                disabled={!selectedPlayer || !selectedStat}
                            >
                                Save Stats
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}; 
