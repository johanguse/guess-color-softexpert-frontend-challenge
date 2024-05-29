import React from "react";

interface ResetButtonProps {
  onReset: () => void;
}

export function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      type="button"
      className="rounded-md bottom-2 bg-gray-400 text-white p-2 w-full text-base"
      aria-label="Reset all settings to default"
    >
      Reset all settings and erase the score
    </button>
  );
}
