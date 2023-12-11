import React from "react";

interface ProgressBarProps {
  gameProgress: number;
}

export function ProgressBar({ gameProgress }: ProgressBarProps) {
  const safeProgress = Math.min(100, Math.max(0, gameProgress));

  return (
    <progress
      className="w-full rounded-lg h-2"
      max="100"
      value={safeProgress}
    />
  );
}
