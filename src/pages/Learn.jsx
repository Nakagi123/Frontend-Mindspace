import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"

import moodImg  from "../assets/learn/mood.png";
import focusImg from "../assets/learn/focus.png";
import notesImg from "../assets/learn/notes.png";

const features = [
  {
    image: moodImg,
    title: "Mood",
    description: "Adjust your study based on how you feel.",
    route: "/learn/mood",
  },
  {
    image: focusImg,
    title: "Focus",
    description: "Stay focused with a clean study timer.",
    route: "/timer",
  },
  {
    image: notesImg,
    title: "Notes",
    description: "Keep everything in one place.",
    route: "/notes",
  },
];

const FeatureCard = ({ image, title, description, onClick, index }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-left
               hover:shadow-lg hover:-translate-y-1.5 hover:border-gray-200
               active:scale-95 active:shadow-sm
               transition-all duration-200 cursor-pointer w-full"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <div className="flex items-center gap-3 mb-3">
      <img src={image} alt={title} className="w-20 h-20 object-contain" />
      <span className="font-semibold text-gray-900 text-xl">{title}</span>
    </div>
    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
  </button>
);

export default function FeatureCards() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <section className="bg-gray-50 min-h-screen px-6 py-16">
        <div className="max-w-3xl mx-auto">

          {/* Section header */}
          <div className="mb-10">
            <h2 className="text-5xl font-bold text-gray-900 tracking-tight">
              Everything you need
            </h2>
            <p className="text-gray-500 mt-2 text-base">
              Tools designed to help you study smarter.
            </p>
          </div>

          {/* Cards grid — 3 cols, centered */}
          <div className="grid grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                index={index}
                image={feature.image}
                title={feature.title}
                description={feature.description}
                onClick={() => navigate(feature.route)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}