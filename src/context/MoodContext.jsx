import { createContext, useContext, useState } from "react";

const MoodContext = createContext(null);

export function MoodProvider({ children }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [pace, setPace] = useState("Normal");
  const [difficulty, setDifficulty] = useState(0);
  const [summary, setSummary] = useState(null); // 👈 for the summarized output

  return (
    <MoodContext.Provider value={{
      selectedMood, setSelectedMood,
      pace, setPace,
      difficulty, setDifficulty,
      summary, setSummary,
    }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  return useContext(MoodContext);
}