export const getInitialHistory = (
  historyKey: string
): {
  color: string;
  correct: boolean;
  time: number;
}[] => {
  if (typeof localStorage === "undefined") {
    console.error("localStorage is not available.");
    return [];
  }

  try {
    const storedHistory = localStorage.getItem(historyKey);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error("Error while accessing localStorage:", error);
    return [];
  }
};

export function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const shuffleArray = (array: string[]): string[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
