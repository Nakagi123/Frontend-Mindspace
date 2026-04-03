import { createContext, useContext, useState } from "react";

const MoodContext = createContext(null);

export function MoodProvider({ children }) {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <MoodContext.Provider value={{ selectedMood, setSelectedMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  return useContext(MoodContext);
}