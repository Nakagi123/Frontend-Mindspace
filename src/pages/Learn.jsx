import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"

import moodImg      from "../assets/learn/mood.png";
import paceImg      from "../assets/learn/pace.png";
import lightModeImg from "../assets/learn/light-mode.png";
import quizImg      from "../assets/learn/quiz.png";
import focusImg     from "../assets/learn/focus.png";
import streakImg    from "../assets/learn/streak.png";
import notesImg     from "../assets/learn/notes.png";
import progressImg  from "../assets/learn/progress.png";

const features = [
  {
    image: moodImg,
    title: "Mood",
    description: "Adjust your study based on how you feel.",
    route: "/learn/mood",
  },
  {
    image: paceImg,
    title: "Pace",
    description: "Choose a learning speed that works for you.",
    route: "/pace",
  },
  {
    image: lightModeImg,
    title: "Light Mode",
    description: "Simplify materials when you feel tired.",
    route: "/light-mode",
  },
  {
    image: quizImg,
    title: "Quiz",
    description: "Generate simple questions from your notes.",
    route: "/quiz",
  },
  {
    image: focusImg,
    title: "Focus",
    description: "Stay focused with a clean study timer.",
    route: "/focus",
  },
  {
    image: streakImg,
    title: "Streak",
    description: "Build consistency with daily progress.",
    route: "/streak",
  },
  {
    image: notesImg,
    title: "Notes",
    description: "Keep everything in one place.",
    route: "/notes",
  },
  {
    image: progressImg,
    title: "Progress",
    description: "Track your learning over time.",
    route: "/progress",
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
      <span className="font-semibold text-gray-900 text-base">{title}</span>
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
        <div className="max-w-5xl mx-auto">

            {/* Section header */}
            <div className="mb-10">
            <h2 className="text-5xl font-bold text-gray-900 tracking-tight">
                Everything you need
            </h2>
            <p className="text-gray-500 mt-2 text-base">
                Tools designed to help you study smarter.
            </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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