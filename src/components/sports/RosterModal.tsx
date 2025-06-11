import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface Player {
    id: string;
    name: string;
    number: string;
}

interface RosterModalProps {
    teamName: string;
    roster: Player[];
    onClose: () => void;
    onSave: (roster: Player[]) => void;
}

export const RosterModal = ({ teamName, roster, onClose, onSave }: RosterModalProps) => {
    const [players, setPlayers] = useState<Player[]>(roster);
    const [newPlayer, setNewPlayer] = useState({ name: "", number: "" });

    const addPlayer = () => {
        if (newPlayer.name.trim() && newPlayer.number.trim()) {
            setPlayers([...players, { id: Date.now().toString(), ...newPlayer }]);
            setNewPlayer({ name: "", number: "" });
        }
    };

    const removePlayer = (id: string) => {
        setPlayers(players.filter(p => p.id !== id));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>{teamName} Roster</span>
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <X className="w-4 h-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Add New Player */}
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Player Name"
                                    value={newPlayer.name}
                                    onChange={(e) => setNewPlayer(prev => ({ ...prev, name: e.target.value }))}
                                />
                                <Input
                                    placeholder="Number"
                                    value={newPlayer.number}
                                    onChange={(e) => setNewPlayer(prev => ({ ...prev, number: e.target.value }))}
                                    className="w-24"
                                />
                                <Button onClick={addPlayer}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Player List */}
                            <div className="space-y-2">
                                {players.map(player => (
                                    <div key={player.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                                        <span className="font-medium">#{player.number} {player.name}</span>
                                        <Button variant="ghost" size="sm" onClick={() => removePlayer(player.id)}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {/* Save Button */}
                            <Button className="w-full" onClick={() => onSave(players)}>
                                Save Roster
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}; 
