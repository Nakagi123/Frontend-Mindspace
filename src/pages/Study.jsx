import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useMood } from "../context/MoodContext";

const PACE_OPTIONS = ["Slow", "Normal", "Fast"];
const DIFFICULTY_LABELS = ["Easy", "Medium", "Hard"];

export default function FocusedStudy() {
    const [material, setMaterial] = useState("");
    const [pace, setPace] = useState("Normal");
    const [difficulty, setDifficulty] = useState(0); // 0=Easy, 1=Medium, 2=Hard
    const navigate = useNavigate();
    const { selectedMood } = useMood();

  const TITLES = {
    focused:   "Ready to go.",
    normal:    "Keep it steddy",
    lowEnergy: "Take it slow.",
    tired:     "Keep it simple.",
};

  const TEXT = {
    focused:   "We'll adjust your study experience based on your choice.",
    normal:    "Take your time and stay consistent.",
    lowEnergy: "We'll make things easier to follow.",
    tired:     "We'll simplify everything for you.",
  }

  const handleSummarize = () => {
    // TODO: handle summarize logic
    console.log({ material, pace, difficulty: DIFFICULTY_LABELS[difficulty] });
  };

  return (
    <div>
        <Navbar />
        <section className="min-h-screen bg-white px-6 py-16">
        <div className="max-w-xl mx-auto flex flex-col gap-8">

            {/* Header */}
            <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
                {TITLES[selectedMood] ?? "Ready to go."}
            </h1>
            <p className="text-gray-500 text-base">
                {TEXT[selectedMood] ?? "We'll adjust your study experience based on your choice."}
            </p>
            </div>

            {/* Material input */}
            <textarea
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            placeholder="Paste your material..."
            rows={5}
            className="w-full bg-gray-100 rounded-2xl px-5 py-4 text-sm text-gray-700
                        placeholder-gray-400 resize-none outline-none border-2 border-transparent
                        focus:border-gray-300 focus:bg-white transition-all duration-200"
            />

            {/* Pace selector */}
            <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-gray-900">Pace</span>
            <div className="flex gap-2">
                {PACE_OPTIONS.map((option) => (
                <button
                    key={option}
                    onClick={() => setPace(option)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                    ${pace === option
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                    }`}
                >
                    {option}
                </button>
                ))}
            </div>
            </div>

            {/* Difficulty slider */}
            <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-12">Easy</span>
                <div className="relative flex-1">
                <input
                    type="range"
                    min={0}
                    max={2}
                    step={1}
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                            bg-gray-200 accent-gray-900"
                />
                {/* Snap point dots */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-0 pointer-events-none">
                    {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-200
                        ${difficulty >= i
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white border-gray-300"
                        }`}
                    />
                    ))}
                </div>
                </div>
                <span className="text-sm text-gray-500 w-12 text-right">Hard</span>
            </div>
            {/* Current difficulty label */}
            <p className="text-xs text-gray-400 text-center">
                {DIFFICULTY_LABELS[difficulty]}
            </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2">
            <button
                onClick={handleSummarize}
                className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full
                        hover:bg-gray-700 active:scale-95 transition-all duration-200 shadow-md"
            >
                Summarize
            </button>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-200"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Change Mood
            </button>
            </div>

        </div>
        </section>
    </div>
  );
}