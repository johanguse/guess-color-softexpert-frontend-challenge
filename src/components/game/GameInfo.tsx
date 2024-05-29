import React from "react";

interface GameInfoProps {
  highScore: number;
  score: number;
  gameTimeLeft: number;
  gameStarted: boolean;
  startGame: () => void;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  highScore,
  score,
  gameTimeLeft,
  gameStarted,
  startGame,
}) => {
  return (
    <div className="w-full h-auto rounded-md flex text-center border border-black">
      <div className="px-2 flex-1 w-[40%] items-center justify-center bg-[#dddee1] flex">
        Remaining Time: {gameTimeLeft} seconds
      </div>
      <div className="px-2 flex-1 w-[20%] items-center justify-center bg-[#bfc1c6] flex">
        <button
          className="min-w-auto text-sm rotate-6 w-16 h-16 bg-[#dddee1] p-2 rounded-full hover:bg-[#bfc1c6] font-semibold transition-rotation duration-300 hover:rotate-0 ease-in-out clicked:rotate-180"
          onClick={startGame}
        >
          {gameStarted ? "Restart" : "Start"}
        </button>
      </div>

      <div className="flex w-[40%] text-center items-center justify-center bg-[#dddee1] flex-col gap-4">
        <div className="px-2 text-center">High Score: {highScore}</div>
        <hr className="border border-black w-full" />
        <div className="px-2 text-center">Score: {score}</div>
      </div>
    </div>
  );
};
