<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-Time Sports Tracker Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .text-glow-orange {
            text-shadow: 0 0 8px rgba(251, 146, 60, 0.7), 0 0 20px rgba(251, 146, 60, 0.5);
        }
        .text-glow-white {
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
        }
         .foul-flag-red {
            color: #ef4444;
            text-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
        }
        .audience-view-bg {
            background-image: url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            position: relative;
        }
        .audience-view-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1;
        }
        .modal {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.6);
            display: flex; justify-content: center; align-items: center; z-index: 100;
        }
        .modal-content {
            background-color: white; padding: 30px; border-radius: 10px; text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .confetti { position: absolute; width: 10px; height: 10px; background-color: #f00; opacity: 0; }
        @keyframes confetti-fall { 0% { transform: translateY(-100vh); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
    </style>
     <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useCallback, useMemo } = React;

        // --- Simplified UI Components ---
        const Card = ({ children, className }) => <div className={`bg-white border rounded-lg shadow-md ${className}`}>{children}</div>;
        const CardHeader = ({ children, className }) => <div className={`p-4 border-b ${className}`}>{children}</div>;
        const CardTitle = ({ children, className }) => <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
        const CardContent = ({ children, className }) => <div className={`p-4 ${className}`}>{children}</div>;
        const Button = ({ children, onClick, className, disabled, variant }) => {
            const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
            let variantClasses = "border-transparent text-white bg-blue-600 hover:bg-blue-700";
            if (variant === 'destructive') {
                variantClasses = "border-transparent text-white bg-red-600 hover:bg-red-700";
            } else if (variant === 'outline') {
                 variantClasses = "border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100";
            }
            const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
            return <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`} disabled={disabled}>{children}</button>;
        };
        const Input = ({ value, onChange, placeholder, className, type="text", min, max }) => <input type={type} min={min} max={max} value={value} onChange={onChange} placeholder={placeholder} className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} />;
        const Badge = ({ children, className }) => <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>{children}</span>;
        const Select = ({ value, onValueChange, children }) => <select value={value} onChange={(e) => onValueChange(e.target.value)} className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white">{children}</select>;
        const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

        // --- Icon Placeholders ---
        const Plus = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
        const Minus = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
        const Play = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
        const Pause = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>;
        const Square = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>;
        const Trophy = () => <span>🏆</span>;
        const Users = () => <span>👥</span>;
        const Edit = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;


        // --- Audience View Component ---
        const BasketballAudienceView = ({ game, onBack }) => { return ( <div className="min-h-screen audience-view-bg text-white flex flex-col items-center justify-center p-4" style={{ fontFamily: "'Orbitron', sans-serif" }}> <div className="relative z-10 w-full"> <Button onClick={onBack} variant="outline" className="absolute top-0 left-4 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/70"> ← Operator View </Button> <Card className="w-full max-w-7xl bg-transparent border-0 text-white shadow-none"> <CardHeader className="text-center border-b-2 border-orange-500/30 p-4"> <div className="flex justify-between items-center"> <Badge className="text-3xl sm:text-4xl font-bold bg-gray-800/50 border-gray-600 px-4 py-2"> Q{game.current_quarter || 1} </Badge> <div className="flex flex-col items-center"> <div className="text-lg text-gray-400">SHOT CLOCK</div> <div className="text-4xl sm:text-5xl font-mono bg-red-600/80 border-2 border-red-400 px-4 sm:px-6 py-2 rounded-lg shadow-lg text-glow-white"> {game.shot_clock_seconds} </div> </div> </div> </CardHeader> <CardContent className="py-8 sm:py-12 px-4"> <div className="grid grid-cols-2 gap-4 mb-8"> <div className="text-center"> <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight uppercase mb-4">{game.team_a_name}</h2> <div className="text-6xl sm:text-8xl font-bold text-orange-400 text-glow-orange">{game.team_a_score}</div> </div> <div className="text-center"> <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight uppercase mb-4">{game.team_b_name}</h2> <div className="text-6xl sm:text-8xl font-bold text-orange-400 text-glow-orange">{game.team_b_score}</div> </div> </div> <div className="text-center mb-8"> <div className="text-5xl sm:text-7xl font-mono font-bold text-white text-glow-white"> {String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')} </div> </div> <div className="grid grid-cols-2 gap-4"> <div className={`text-center text-lg sm:text-2xl font-semibold ${(game.team_a_fouls || 0) >= 4 ? 'foul-flag-red' : 'text-gray-400'}`}>Q FOULS: {game.team_a_fouls || 0}</div> <div className={`text-center text-lg sm:text-2xl font-semibold ${(game.team_b_fouls || 0) >= 4 ? 'foul-flag-red' : 'text-gray-400'}`}>Q FOULS: {game.team_b_fouls || 0}</div> </div> </CardContent> </Card> </div> </div> ); };
        
        // --- Game Tracker Components ---
        const BasketballTracker = ({ game, onUpdate, onViewAudience }) => { 
            const isPaused = game.status !== 'active';
            const [isEditingTime, setIsEditingTime] = useState(false);
            const [quarterTime, setQuarterTime] = useState(game.game_clock_minutes);

            const updateScore = (team, points) => { if (isPaused) return; const field = team === 'a' ? 'team_a_score' : 'team_b_score'; const currentScore = team === 'a' ? game.team_a_score : game.team_b_score; onUpdate(game.id, { [field]: Math.max(0, currentScore + points) }); if (points > 0) onUpdate(game.id, { shot_clock_seconds: 24 }); }; 
            const updateFouls = (team, increment) => { if (isPaused) return; const field = team === 'a' ? 'team_a_fouls' : 'team_b_fouls'; onUpdate(game.id, { [field]: Math.max(0, (game[field] || 0) + increment) }); }; 
            const updateQuarter = (increment) => { 
                const newQuarter = Math.max(1, Math.min(6, (game.current_quarter || 1) + increment)); 
                onUpdate(game.id, { current_quarter: newQuarter, team_a_fouls: 0, team_b_fouls: 0 }); 
            }; 
            const handleSetTime = () => {
                const newTime = parseInt(quarterTime, 10);
                if(newTime >= 1 && newTime <= 30) {
                    onUpdate(game.id, { game_clock_minutes: newTime, game_clock_seconds: 0 });
                    setIsEditingTime(false);
                }
            }
            return ( <Card className="mb-4 shadow-lg bg-white/95 border-gray-200/50"> <CardHeader> <CardTitle className="flex justify-between items-center"> <span className="flex items-center gap-2">🏀 {game.team_a_name} vs {game.team_b_name}</span> <Badge className={game.status === 'active' ? 'bg-green-500 text-white' : game.status === 'finished' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}>{game.status.toUpperCase()}</Badge> </CardTitle> </CardHeader> <CardContent> <div className="text-center text-3xl font-bold mb-2">{game.team_a_score} - {game.team_b_score}</div> <div className="text-center text-md text-gray-700 mb-4">Q{game.current_quarter} | {String(game.game_clock_minutes).padStart(2, '0')}:{String(game.game_clock_seconds).padStart(2, '0')} | Fouls: {game.team_a_fouls || 0} - {game.team_b_fouls || 0} | Shot Clock: {game.shot_clock_seconds}</div> <div className="grid grid-cols-2 gap-4"> <div className="space-y-2"> <h4 className="font-semibold text-center">{game.team_a_name}</h4> <Button className="w-full" onClick={() => updateScore('a', 1)} disabled={isPaused}>+1 Point</Button> <Button className="w-full" onClick={() => updateScore('a', 2)} disabled={isPaused}>+2 Points</Button> <Button className="w-full" onClick={() => updateScore('a', 3)} disabled={isPaused}>+3 Points</Button> <Button className="w-full" onClick={() => updateScore('a', -1)} disabled={isPaused} variant="outline">-1 Point</Button> <Button className="w-full" variant="outline" onClick={() => updateFouls('a', 1)} disabled={isPaused}>+1 Foul</Button> </div> <div className="space-y-2"> <h4 className="font-semibold text-center">{game.team_b_name}</h4> <Button className="w-full" onClick={() => updateScore('b', 1)} disabled={isPaused}>+1 Point</Button> <Button className="w-full" onClick={() => updateScore('b', 2)} disabled={isPaused}>+2 Points</Button> <Button className="w-full" onClick={() => updateScore('b', 3)} disabled={isPaused}>+3 Points</Button> <Button className="w-full" onClick={() => updateScore('b', -1)} disabled={isPaused} variant="outline">-1 Point</Button> <Button className="w-full" variant="outline" onClick={() => updateFouls('b', 1)} disabled={isPaused}>+1 Foul</Button> </div> </div> <div className="flex justify-center items-center gap-4 mt-4"> <Button onClick={() => onUpdate(game.id, { status: game.status === 'active' ? 'paused' : 'active', clock_running: game.status !== 'active' })}>{game.status === 'active' ? <Pause /> : <Play/>}</Button> <Button onClick={() => updateQuarter(-1)}><Minus/></Button> <span className="font-semibold">Quarter {game.current_quarter}</span> <Button onClick={() => updateQuarter(1)}><Plus/></Button> {isEditingTime ? (<div className="flex items-center gap-2"><Input type="number" value={quarterTime} onChange={(e) => setQuarterTime(e.target.value)} className="w-20" min="1" max="30" /><Button onClick={handleSetTime}>Set</Button></div>) : (<Button variant="ghost" size="sm" onClick={() => setIsEditingTime(true)}><Edit/></Button>)} </div> <div className="flex justify-center items-center gap-2 mt-2"> <Button onClick={() => onUpdate(game.id, { shot_clock_seconds: 24 })}>Reset 24s</Button> <Button onClick={() => onUpdate(game.id, { shot_clock_seconds: 14 })}>Reset 14s</Button> </div> <div className="flex justify-center gap-4 mt-4"> <Button onClick={() => onViewAudience(game.id)} variant="outline">Audience View</Button> <Button onClick={() => onUpdate(game.id, { status: 'finished', clock_running: false })} variant="destructive"><Square /> End Game</Button> </div> </CardContent> </Card> ); };
        const FootballTracker = ({ game, onUpdate }) => { return ( <Card className="mb-4 shadow-lg"><CardHeader><CardTitle>⚽ {game.team_a_name} vs {game.team_b_name}</CardTitle></CardHeader><CardContent><div className="text-center text-2xl">{game.team_a_score} - {game.team_b_score}</div></CardContent></Card> ); };
        const CricketTracker = ({ game, onUpdate }) => { return ( <Card className="mb-4 shadow-lg"><CardHeader><CardTitle>🏏 {game.team_a_name} vs {game.team_b_name}</CardTitle></CardHeader><CardContent><div className="text-center text-2xl">{game.team_a_score}/{game.team_a_batsman_outs} - {game.team_b_score}/{game.team_b_batsman_outs}</div></CardContent></Card> ); };
        const BadmintonTracker = ({ game, onUpdate }) => { return ( <Card className="mb-4 shadow-lg"><CardHeader><CardTitle>🏸 {game.team_a_name} vs {game.team_b_name}</CardTitle></CardHeader><CardContent><div className="text-center text-2xl">{game.team_a_score} - {game.team_b_score}</div></CardContent></Card> ); };
        
        const WinnerPopup = ({ winner, on_close }) => {
            useEffect(() => {
                const confettiContainer = document.getElementById('confetti-container');
                for(let i=0; i<50; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.animation = `confetti-fall ${1 + Math.random() * 2}s linear ${Math.random() * 2}s infinite`;
                    confetti.style.backgroundColor = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'][Math.floor(Math.random() * 6)];
                    confettiContainer.appendChild(confetti);
                }
            }, []);
            return (
                <div id="confetti-container" className="modal">
                    <div className="modal-content">
                        <h2 className="text-3xl font-bold mb-4">🎉 WINNER! 🎉</h2>
                        <p className="text-2xl text-gray-800">{winner} has won the game!</p>
                        <Button onClick={on_close} className="mt-6">Close</Button>
                    </div>
                </div>
            )
        };

        // --- Main Component ---
        const RealTimeSportsTracker = () => {
            const [games, setGames] = useState([]);
            const [newGame, setNewGame] = useState({ teamA: "", teamB: "", sport: "" });
            const [audienceGameId, setAudienceGameId] = useState(null);
            const [winner, setWinner] = useState(null);

            // Centralized timer logic
            useEffect(() => {
                const timer = setInterval(() => {
                    setGames(prevGames => 
                        prevGames.map(game => {
                            if (!game.clock_running || game.status !== 'active') {
                                return game;
                            }
                            
                            let newGame = {...game};
                            
                            // Game Clock
                            let totalSeconds = newGame.game_clock_minutes * 60 + newGame.game_clock_seconds - 1;
                            if (totalSeconds < 0) {
                                newGame.clock_running = false;
                                totalSeconds = 0;
                                if(newGame.current_quarter === 4) { // Or final quarter
                                    newGame.status = 'finished';
                                    if(newGame.team_a_score > newGame.team_b_score) setWinner(newGame.team_a_name);
                                    else if (newGame.team_b_score > newGame.team_a_score) setWinner(newGame.team_b_name);
                                    else setWinner("It's a tie!");
                                }
                            }
                            newGame.game_clock_minutes = Math.floor(totalSeconds / 60);
                            newGame.game_clock_seconds = totalSeconds % 60;
                            
                             // Shot Clock
                            if (newGame.sport === 'basketball') {
                                if (newGame.shot_clock_seconds > 0) {
                                    newGame.shot_clock_seconds -= 1;
                                }
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
                    game_clock_minutes: newGame.sport === 'basketball' || newGame.sport === 'football' ? 12 : 0, game_clock_seconds: 0, clock_running: false,
                    current_quarter: newGame.sport === 'basketball' ? 1 : undefined, team_a_fouls: 0, team_b_fouls: 0, shot_clock_seconds: 24, status: 'active',
                };
                setGames(prev => [optimisticGame, ...prev]);
                setNewGame({ teamA: "", teamB: "", sport: "" });
                await new Promise(resolve => setTimeout(resolve, 200));
                const realId = `game-${Date.now()}`;
                setGames(prev => prev.map(game => game.id === tempId ? { ...game, id: realId } : game));
            }, [newGame]);

            const updateGame = useCallback(async (gameId, updates) => {
                setGames(prev => prev.map(game => game.id === gameId ? { ...game, ...updates } : game));
            }, []);
            
            const audienceGame = games.find(g => g.id === audienceGameId);

            if (audienceGame) {
                return <BasketballAudienceView game={audienceGame} onBack={() => setAudienceGameId(null)} />;
            }
            
            const renderSportTracker = (game) => {
                switch (game.sport) {
                case 'basketball':
                    return <BasketballTracker game={game} onUpdate={updateGame} onViewAudience={setAudienceGameId} />;
                case 'football': return <FootballTracker game={game} onUpdate={updateGame} />;
                case 'cricket': return <CricketTracker game={game} onUpdate={updateGame} />;
                case 'badminton': return <BadmintonTracker game={game} onUpdate={updateGame} />;
                default: return null;
                }
            };

            return (
                <div className="min-h-screen bg-gray-100">
                    {winner && <WinnerPopup winner={winner} on_close={() => setWinner(null)} />}
                    <div className="container mx-auto px-4 py-6 max-w-4xl">
                        <div className="text-center mb-8 pt-4">
                            <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2"> <Trophy /> Sports Tracker</h1>
                        </div>
                        <Card className="mb-8 shadow-xl">
                            <CardHeader><CardTitle className="flex items-center text-xl"><Plus /> Create New Game</CardTitle></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
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
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Team A</label>
                                        <Input value={newGame.teamA} onChange={(e) => setNewGame(prev => ({ ...prev, teamA: e.target.value }))} placeholder="Team A"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Team B</label>
                                        <Input value={newGame.teamB} onChange={(e) => setNewGame(prev => ({ ...prev, teamB: e.target.value }))} placeholder="Team B"/>
                                    </div>
                                    <Button onClick={createGame} disabled={!newGame.teamA.trim() || !newGame.teamB.trim() || !newGame.sport}><Plus /> Create</Button>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="space-y-6">
                            {games.length === 0 ? <Card className="bg-white/80 backdrop-blur-sm"><p className="text-center text-gray-700 p-8">No games created yet.</p></Card> : games.map(game => <div key={game.id}>{renderSportTracker(game)}</div>) }
                        </div>
                    </div>
                </div>
            );
        };

        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<RealTimeSportsTracker />);
    </script>
</body>
</html>
