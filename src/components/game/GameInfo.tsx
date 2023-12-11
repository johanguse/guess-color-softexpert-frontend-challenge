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
    <div className="w-full h-auto rounded-md flex text-center border border-black text-sm font-medium">
      <div className="px-2 flex-1 w-[40%] items-center justify-center bg-[#dddee1] flex">
        Remaining Time: {gameTimeLeft} seconds
      </div>
      <div className="px-2 flex-1 w-[20%] items-center justify-center bg-[#bfc1c6] flex">
        <button onClick={startGame}>{gameStarted ? "Restart" : "Start"}</button>
      </div>
      <div className="flex-1 w-[40%] text-center items-center justify-center bg-[#dddee1] flex flex-col">
        <div className="px-2 text-center">High Score: {highScore}</div>
        <hr className="border border-black w-full my-4" />
        <div className="px-2 text-center">Score: {score}</div>
      </div>
    </div>
  );
};
