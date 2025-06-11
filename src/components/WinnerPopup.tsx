import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface WinnerPopupProps {
    winner: string;
    onClose: () => void;
}

export const WinnerPopup = ({ winner, onClose }: WinnerPopupProps) => {
    const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string }>>([]);

    useEffect(() => {
        // Create confetti
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
        const newConfetti = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setConfetti(newConfetti);

        // Auto close after 5 seconds
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="modal">
            <div className="modal-content popup-animation">
                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
                            <Trophy className="w-8 h-8" /> Game Over!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="text-4xl font-bold mb-4 text-glow-white">
                            {winner === "It's a tie!" ? "It's a Tie!" : `${winner} Wins!`}
                        </div>
                        <p className="text-lg">Thank you for watching!</p>
                    </CardContent>
                </Card>
            </div>
            {confetti.map((c) => (
                <div
                    key={c.id}
                    className="confetti"
                    style={{
                        left: `${c.x}%`,
                        backgroundColor: c.color,
                        animation: `confetti-fall ${Math.random() * 2 + 2}s linear forwards`
                    }}
                />
            ))}
        </div>
    );
}; 
