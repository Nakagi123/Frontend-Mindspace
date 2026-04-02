import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"

// 👇 Replace with your actual image imports
const IMAGES = {
  focused:   "/assets/mood-focused.png",
  normal:    "/assets/mood-normal.png",
  lowEnergy: "/assets/mood-low-energy.png",
  tired:     "/assets/mood-tired.png",
};

const moods = [
  {
    key: "focused",
    label: "FOCUSED",
    image: IMAGES.focused,
    description: "Ready to study",
    route: "/mood/focused",
  },
  {
    key: "normal",
    label: "NORMAL",
    image: IMAGES.normal,
    description: "Steady and balanced",
    route: "/mood/normal",
  },
  {
    key: "lowEnergy",
    label: "LOW ENERGY",
    image: IMAGES.lowEnergy,
    description: "Take it a bit slower",
    route: "/mood/low-energy",
  },
  {
    key: "tired",
    label: "TIRED",
    image: IMAGES.tired,
    description: "Keep things simple",
    route: "/mood/tired",
  },
];

const MoodButton = ({ mood, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-4 group transition-all duration-200 cursor-pointer outline-none`}
  >
    {/* Label */}
    <span className={`text-xs font-semibold tracking-widest transition-colors duration-200
      ${selected ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"}`}>
      {mood.label}
    </span>

    {/* Face image */}
    <div className={`relative rounded-full transition-all duration-200
      ${selected
        ? "ring-4 ring-gray-900 ring-offset-4 scale-105"
        : "ring-2 ring-transparent group-hover:ring-gray-200 group-hover:ring-offset-2"
      }`}>
      <img
        src={mood.image}
        alt={mood.label}
        className={`w-28 h-28 object-cover rounded-full transition-all duration-200
          ${selected ? "opacity-100" : "opacity-80 group-hover:opacity-100"}
          active:scale-95`}
      />
    </div>

    {/* Description */}
    <span className={`text-sm transition-colors duration-200
      ${selected ? "text-gray-900 font-medium" : "text-gray-500 group-hover:text-gray-700"}`}>
      {mood.description}
    </span>
  </button>
);

export default function Mood() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (mood) => {
    setSelected(mood.key);
    // Navigate after a short delay so the selection is visible
    setTimeout(() => navigate(mood.route), 300);
  };

  return (
    <div>
      <Navbar />
      <section className="min-h-screen bg-white px-6 py-20">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
              Choose your study state
            </h1>
            <p className="text-gray-500 text-lg">
              We'll adjust your study experience based on your choice.
            </p>
          </div>

          {/* Mood buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {moods.map((mood) => (
              <MoodButton
                key={mood.key}
                mood={mood}
                selected={selected === mood.key}
                onClick={() => handleSelect(mood)}
              />
            ))}
          </div>

          {/* Continue button — shows after selection */}
          <div className={`mt-16 flex justify-center transition-all duration-300
            ${selected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
            <button
              onClick={() => selected && navigate(moods.find(m => m.key === selected)?.route)}
              className="px-8 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full
                        hover:bg-gray-700 active:scale-95 transition-all duration-200 shadow-md"
            >
              Continue →
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}