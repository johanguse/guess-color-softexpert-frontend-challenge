import React from "react";

interface ColorBoxProps {
  color: string;
  options: string[];
  onAnswer: (option: string) => void;
}

export function ColorBox({ color, options, onAnswer }: ColorBoxProps) {
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="w-full h-full bg-white rounded-md shadow-lg">
        <div
          className="w-full h-[300px] rounded-md"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <div className="flex w-full mt-4 gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="w-full border border-black font-semibold rounded-md py-3 px-4"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
