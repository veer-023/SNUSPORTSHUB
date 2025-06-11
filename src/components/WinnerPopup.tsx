import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface WinnerPopupProps {
  winner: string;
  onClose: () => void;
}

export const WinnerPopup = ({ winner, onClose }: WinnerPopupProps) => {
    useEffect(() => {
        const confettiContainer = document.getElementById('confetti-container');
        if (confettiContainer) {
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animation = `confetti-fall ${1 + Math.random() * 2}s linear ${Math.random() * 2}s infinite`;
                confetti.style.backgroundColor = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'][Math.floor(Math.random() * 6)];
                confettiContainer.appendChild(confetti);
            }
        }
    }, []);

    return (
        <div id="confetti-container" className="modal">
            <div className="modal-content">
                <h2 className="text-3xl font-bold mb-4">🎉 WINNER! 🎉</h2>
                <p className="text-2xl text-gray-800">{winner} has won the game!</p>
                <Button onClick={onClose} className="mt-6">Close</Button>
            </div>
        </div>
    );
};