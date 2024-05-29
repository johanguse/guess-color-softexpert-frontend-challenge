import React, { useState, useEffect, useRef } from "react";
import {
  ColorBox,
  GameInfo,
  ProgressBar,
  ResetButton,
} from "@/components/game";
import Sidebar from "@/components/game/Sidebar";
import { getInitialHistory, getRandomColor, shuffleArray } from "@/lib/utils";

const ANSWER_TIME = 10;
const GAME_TIME = 30;
const HIGH_SCORE_KEY = "High_Score";
const HISTORY_KEY = "Game_History";

interface HistoryEntry {
  color: string;
  correct: boolean;
  time: number;
}

const App = () => {
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [currentColor, setCurrentColor] = useState<string>("");
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameTimeLeft, setGameTimeLeft] = useState<number>(GAME_TIME);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [roundTimeLeft, setRoundTimeLeft] = useState<number>(ANSWER_TIME);
  const [colorShownTime, setColorShownTime] = useState<number | null>(null);
  const [timeInterval, setTimeInterval] = useState<number | null>(null);
  const [colorHistory, setColorHistory] = useState<HistoryEntry[]>(
    getInitialHistory(HISTORY_KEY)
  );
  const colorOptions = useRef<number>(0);

  useEffect(() => {
    try {
      const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
      if (storedHighScore) {
        setHighScore(parseInt(storedHighScore, 10));
      }
    } catch (error) {
      console.error("localStorage is not available:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setColorHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("localStorage is not available:", error);
    }
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const gameTimer = setInterval(() => {
        if (gameTimeLeft > 0) {
          setGameTimeLeft(gameTimeLeft - 1);
        } else {
          clearInterval(gameTimer);
          endGame();
        }
      }, 1000);

      return () => {
        clearInterval(gameTimer);
      };
    }
  }, [gameTimeLeft, gameStarted]);

  useEffect(() => {
    if (colorShownTime) {
      const timer = setTimeout(() => {
        const interval = (Date.now() - colorShownTime) / 1000;

        if (interval >= ANSWER_TIME) {
          setScore(Math.max(0, score - 2));
          nextRound();
        } else {
          setTimeInterval(interval);
        }
      }, ANSWER_TIME * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [colorShownTime, score]);

  const endGame = () => {
    try {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(HIGH_SCORE_KEY, score.toString());
      }
    } catch (error) {
      console.error("localStorage is not available:", error);
    }
    setGameOver(true);
    setGameStarted(false);
  };

  const handleAnswer = (option: string) => {
    try {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(HIGH_SCORE_KEY, score.toString());
      }
    } catch (error) {
      console.error("localStorage is not available:", error);
    }
    clearInterval(roundTimeLeft);

    const correct = option === currentColor;
    const timeTaken = ANSWER_TIME - roundTimeLeft;
    const historyItem: HistoryEntry = {
      color: option,
      correct,
      time: timeTaken,
    };

    setColorHistory([...colorHistory, historyItem]);

    if (correct) {
      setScore(Math.max(0, score + 5));
      nextRound();
    } else {
      setScore(Math.max(0, score - 1));
      // nextRound();
    }
  };

  const resetGame = () => {
    try {
      setHighScore(0);
      localStorage.setItem(HIGH_SCORE_KEY, "0");
      setScore(0);
    } catch (error) {
      console.error("localStorage is not available:", error);
    }
    setGameTimeLeft(GAME_TIME);
    setGameOver(true);
    setGameStarted(false);
    setColorHistory([]);
    setOptions(3);
    if (timeInterval) {
      clearInterval(timeInterval);
    }
  };

  const startGame = (option: number) => {
    setColorHistory([]);
    setGameOver(false);
    setScore(0);
    setOptions(option ? option : 3);
    setGameTimeLeft(GAME_TIME);
    setRoundTimeLeft(ANSWER_TIME);
    setGameStarted(true);
    nextRound();
  };

  const setOptions = (option: number) => {
    console.log(option);
    console.log(colorOptions);
    colorOptions.current = option;
    //startGame();
  };

  const nextRound = () => {
    if (gameTimeLeft <= 0) {
      endGame();
      return;
    }

    const options = [getRandomColor()];

    for (let i = 1; i < colorOptions.current; i++) {
      options.push(getRandomColor());
    }
    console.log(colorOptions);
    console.log(options);

    setAnswerOptions(shuffleArray(options));

    const randomIndex = Math.floor(Math.random() * 3);
    setCurrentColor(options[randomIndex]);

    setColorShownTime(Date.now());
    setTimeInterval(null);
    setRoundTimeLeft(ANSWER_TIME);

    const roundTimer = setInterval(() => {
      if (roundTimeLeft > 0) {
        setRoundTimeLeft(roundTimeLeft - 1);
      } else {
        clearInterval(roundTimer);
        handleAnswer("");
      }
    }, 1000);
  };

  const gameProgress = (gameTimeLeft / GAME_TIME) * 100;

  return (
    <div className="flex flex-col md:flex-row w-screen lg:max-w-7xl mx-auto h-screen bg-[#fdf8f8] text-black items-center justify-center">
      <div className="flex-1 flex p-8 bg-gray-300 w-full md:w-[20%] h-full">
        <div className="text-xl font-semibold">
          <Sidebar history={colorHistory} />
        </div>
      </div>
      <div className="flex-2 py-10 bg-[#fff5f5] flex flex-col w-full lg:w-[80%] items-center justify-center h-full">
        <div className="text-3xl font-bold">
          <h1>Guess the Color</h1>
        </div>
        <div className="w-full mx-4 lg:mx-24 md:w-11/12 lg:w-11/12 h-full py-10">
          <GameInfo
            highScore={highScore}
            score={score}
            gameTimeLeft={gameTimeLeft}
            gameStarted={gameStarted}
            startGame={() => startGame(colorOptions.current)}
          />
          <ProgressBar gameProgress={gameProgress} />
          {gameStarted && !gameOver && (
            <ColorBox
              color={currentColor}
              options={answerOptions}
              onAnswer={handleAnswer}
            />
          )}
          {(!gameStarted || gameOver) && (
            <div className="px-10 rounded-md w-full h-[300px] flex bg-[#dddee1] flex-col items-center justify-center">
              <div className="w-full items-center justify-center flex gap-2">
                <button
                  className="rounded-md bg-gray-500 text-white font-semibold p-3 w-full"
                  onClick={() => startGame(3)}
                >
                  Easy
                </button>
                <button
                  className="rounded-md bg-gray-500 text-white font-semibold p-3 w-full"
                  onClick={() => startGame(4)}
                >
                  Medium
                </button>
                <button
                  className="rounded-md bg-gray-500 text-white font-semibold p-3 w-full"
                  onClick={() => startGame(5)}
                >
                  Hard
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="block">
          <ResetButton onReset={resetGame} />
        </div>
      </div>
    </div>
  );
};

export default App;
