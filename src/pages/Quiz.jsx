import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useMood } from "../context/MoodContext";
import { quizApi } from "../lib/api";
import QuizResult from "./QuizResult";

export default function Quiz() {
  const navigate = useNavigate();
  const { summary } = useMood();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  // Generate quiz dari summary
  useEffect(() => {
    const generateQuiz = async () => {
      if (!summary) {
        setError("No study material found. Please summarize something first.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // ✅ Format yang benar: materialContent
        const response = await quizApi.generate({
          materialContent: summary.summary || summary.content || summary.text
        });
        
        console.log("Quiz response:", response);
        
        // Extract questions dari response (sesuaikan dengan struktur response)
        let quizQuestions = [];
        if (response.quiz && response.quiz.questions) {
          quizQuestions = response.quiz.questions;
        } else if (response.questions) {
          quizQuestions = response.questions;
        } else if (response.data && response.data.questions) {
          quizQuestions = response.data.questions;
        } else {
          // Fallback jika format berbeda
          quizQuestions = response.quiz || [];
        }
        
        setQuestions(quizQuestions);
      } catch (err) {
        console.error("Failed to generate quiz:", err);
        setError(err.message || "Failed to generate quiz");
      } finally {
        setLoading(false);
      }
    };

    generateQuiz();
  }, [summary]);

  const total = questions.length;
  const current = questions[currentIndex];

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

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white px-8 py-8 max-w-2xl mx-auto text-center">
          <div className="animate-pulse">
            <p className="text-gray-500">Generating quiz questions...</p>
            <p className="text-sm text-gray-400 mt-2">This may take a moment</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white px-8 py-8 max-w-2xl mx-auto text-center">
          <div className="bg-red-50 rounded-2xl p-6">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => navigate("/learn/results")}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-full text-sm"
            >
              Back to Results
            </button>
          </div>
        </div>
      </>
    );
  }

  // No questions
  if (questions.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white px-8 py-8 max-w-2xl mx-auto text-center">
          <p className="text-gray-500">No quiz questions available.</p>
          <button
            onClick={() => navigate("/learn/results")}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-full text-sm"
          >
            Back to Results
          </button>
        </div>
      </>
    );
  }

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
            Question {currentIndex + 1} of {total}
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
              selectedIndex === current.correctIndex 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}
          >
            {selectedIndex === current.correctIndex ? (
              <>
                <span className="font-bold">Correct!</span> The answer is{" "}
                <span className="font-bold">{current.options[current.correctIndex]}</span>
              </>
            ) : (
              <>
                <span className="font-bold">X That is not correct.</span> The correct answer is{" "}
                <span className="font-bold">{current.options[current.correctIndex]}</span>.
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
            Next Question <span className="text-base">→</span>
          </button>
        )}
      </div>
    </>
  );
}