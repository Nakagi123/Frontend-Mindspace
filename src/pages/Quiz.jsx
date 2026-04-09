import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useMood } from "../context/MoodContext";
import { quizData } from "../data/quizData";
import QuizResult from "./QuizResult";

const moodKeyMap = {
  focused: "focused",
  normal: "normal",
  lowEnergy: "lowEnergy",
  tired: "tired",
};

export default function Quiz() {
  const navigate = useNavigate();
  const { selectedMood } = useMood();

  const moodKey = moodKeyMap[selectedMood] || "focused";
  const quiz = quizData[moodKey];
  const questions = quiz.questions;
  const total = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];
  const isCorrect = selectedIndex === current.correctIndex;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelectedIndex(idx);
    setAnswered(true);
    if (idx === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setUserAnswers((prev) => [...prev, selectedIndex]);

    if (currentIndex + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setAnswered(false);
    }
  };

  const getOptionStyle = (idx) => {
    if (!answered) {
      return "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 cursor-pointer";
    }
    if (idx === current.correctIndex) {
      return "bg-green-100 border border-green-200 text-green-800";
    }
    if (idx === selectedIndex && idx !== current.correctIndex) {
      return "bg-red-100 border border-red-200 text-red-800";
    }
    return "bg-white border border-gray-200 text-gray-400";
  };

  if (finished) {
    return (
      <QuizResult
        score={score}
        total={total}
        questions={questions}
        userAnswers={[...userAnswers, selectedIndex]} 
      />
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-8 py-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">QUIZ</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Pertanyaan {currentIndex + 1} dari {total}
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-7 mb-5">
          <p className="text-base font-bold text-gray-900 mb-5">
            {currentIndex + 1}. {current.question}
          </p>
          <div className="flex flex-col gap-3">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`text-left px-5 py-3 rounded-xl text-sm transition ${getOptionStyle(idx)}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {answered && (
          <div
            className={`px-5 py-3.5 rounded-xl text-sm mb-5 ${
              isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isCorrect ? (
              <>
                <span className="font-bold">Correct!</span> The answer is{" "}
                <span className="font-bold">{current.options[current.correctIndex].charAt(0)}</span>
              </>
            ) : (
              <>
                <span className="font-bold">X That is not correct.</span> The correct answer is{" "}
                <span className="font-bold">{current.options[current.correctIndex].charAt(0)}</span>.
              </>
            )}
          </div>
        )}

        {/* Next Button */}
        {answered && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 text-sm font-semibold text-gray-800 border border-gray-300 px-5 py-2.5 rounded-xl hover:bg-gray-50 active:scale-95 transition"
          >
            Next Questions <span className="text-base">→</span>
          </button>
        )}
      </div>
    </>
  );
}