import React from "react";

interface ResetButtonProps {
  onReset: () => void;
}

export function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      type="button"
      className="rounded-md text-gray-700 font-semibold bottom-2"
      aria-label="Reset all settings to default"
    >
      Reset All
    </button>
  );
}
