import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Settings, 
  Edit, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Volume2, 
  Coffee,
  RefreshCw,
  Clock
} from "lucide-react";

interface Game {
  id: string;
  team_a_name: string;
  team_b_name: string;
  status: string;
  live_updates: boolean;
  shot_clock_seconds: number;
  shot_clock_running: boolean;
}

interface CommonControlsProps {
  game: Game;
  onUpdate: (gameId: string, updates: Partial<Game>) => void;
}

export const CommonControls = ({ game, onUpdate }: CommonControlsProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedNames, setEditedNames] = useState({
    teamA: game.team_a_name,
    teamB: game.team_b_name
  });

  const playBuzzer = () => {
    const audio = new Audio();
    audio.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAadTuS3PLNOBkNT6XkxTlKHgdE";
    audio.play();
  };

  const playWhistle = () => {
    const audio = new Audio();
    audio.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAadTuS3PLNOBkNT6XkxTlKHgdE";
    audio.play();
  };

  const updateStatus = (status: string) => {
    onUpdate(game.id, { status });
  };

  const toggleLiveUpdates = () => {
    onUpdate(game.id, { live_updates: !game.live_updates });
  };

  const resetGame = () => {
    onUpdate(game.id, { 
      status: 'active'
    });
  };

  const saveEdits = () => {
    onUpdate(game.id, {
      team_a_name: editedNames.teamA,
      team_b_name: editedNames.teamB
    });
    setIsEditMode(false);
  };

  const toggleShotClock = () => {
    onUpdate(game.id, { shot_clock_running: !game.shot_clock_running });
  };

  const resetShotClock = () => {
    onUpdate(game.id, { shot_clock_seconds: 24, shot_clock_running: false });
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
      {/* Live Indicator */}
      <Badge 
        variant={game.live_updates ? "default" : "secondary"}
        className={`cursor-pointer text-xs sm:text-sm ${game.live_updates ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}
        onClick={toggleLiveUpdates}
      >
        {game.live_updates ? '🔴 LIVE' : '⏸️ OFFLINE'}
      </Badge>

      {/* Game Status Controls */}
      <div className="flex gap-1">
        {game.status === 'active' ? (
          <>
            <Button
              onClick={() => updateStatus('paused')}
              size="sm"
              variant="outline"
              className="flex items-center gap-1 h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
            >
              <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              onClick={() => updateStatus('break')}
              size="sm"
              variant="outline"
              className="flex items-center gap-1 h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
            >
              <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </>
        ) : game.status === 'paused' ? (
          <Button
            onClick={() => updateStatus('active')}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
          >
            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        ) : game.status === 'break' ? (
          <Button
            onClick={() => updateStatus('active')}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
          >
            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        ) : null}

        <Button
          onClick={() => updateStatus('finished')}
          size="sm"
          variant="outline"
          className="flex items-center gap-1 h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
        >
          <Square className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>

      {/* Shot Clock */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-1 sm:px-2 py-1">
        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm font-mono">{game.shot_clock_seconds}s</span>
        <Button
          onClick={toggleShotClock}
          size="sm"
          variant="ghost"
          className="p-1 h-6 w-6"
        >
          {game.shot_clock_running ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </Button>
        <Button
          onClick={resetShotClock}
          size="sm"
          variant="ghost"
          className="p-1 h-6 w-6"
        >
          <RotateCcw className="w-3 h-3" />
        </Button>
      </div>

      {/* Sound Controls */}
      <div className="flex gap-1">
        <Button
          onClick={playBuzzer}
          size="sm"
          variant="outline"
          className="flex items-center gap-1 h-8 px-2 sm:h-9 sm:px-3"
        >
          <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Buzzer</span>
        </Button>
        <Button
          onClick={playWhistle}
          size="sm"
          variant="outline"
          className="flex items-center gap-1 h-8 px-2 sm:h-9 sm:px-3"
        >
          <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Whistle</span>
        </Button>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditMode} onOpenChange={setIsEditMode}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="flex items-center gap-1 h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3">
            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Names</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Team A Name</label>
              <Input
                value={editedNames.teamA}
                onChange={(e) => setEditedNames(prev => ({ ...prev, teamA: e.target.value }))}
                placeholder="Enter team A name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Team B Name</label>
              <Input
                value={editedNames.teamB}
                onChange={(e) => setEditedNames(prev => ({ ...prev, teamB: e.target.value }))}
                placeholder="Enter team B name"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsEditMode(false)}>
                Cancel
              </Button>
              <Button onClick={saveEdits}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Button */}
      <Button
        onClick={resetGame}
        size="sm"
        variant="outline"
        className="flex items-center gap-1 text-red-600 hover:text-red-700 h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
      >
        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
    </div>
  );
};