import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CircleProgress({ score, total }) {
  const percent = Math.round((score / total) * 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute top-0 left-0 -rotate-90" width="144" height="144">
        {/* Track */}
        <circle cx="72" cy="72" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />
        {/* Progress */}
        <circle
          cx="72" cy="72" r={radius}
          stroke="url(#quizGradient)"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="quizGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center z-10">
        <p className="text-2xl font-bold text-gray-900 leading-none">
          {score}/{total}
        </p>
        <p className="text-xs text-gray-400 mt-1 tracking-wide">SKOR</p>
      </div>
    </div>
  );
}

function Recommendations({ percent }) {
  const recs = [];

  if (percent < 60) {
    recs.push({
      title: "Repeat this material",
      desc: "Score below 60: Failed — please try again.",
      color: "bg-red-50",
    });
    recs.push({
      title: "Use slow mode",
      desc: "Read the material more slowly to understand it better",
      color: "bg-cyan-50",
    });
  } else if (percent < 80) {
    recs.push({
      title: "Review key points",
      desc: "You're almost there! Re-read the parts you got wrong.",
      color: "bg-yellow-50",
    });
    recs.push({
      title: "Try again for a perfect score",
      desc: "A little more practice and you'll nail it.",
      color: "bg-cyan-50",
    });
  } else {
    recs.push({
      title: "Great job! 🎉",
      desc: "You scored above 80%. Keep up the good work!",
      color: "bg-green-50",
    });
    recs.push({
      title: "Challenge yourself",
      desc: "Try a harder difficulty to level up your skills.",
      color: "bg-cyan-50",
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {recs.map((r, i) => (
        <div key={i} className={`${r.color} rounded-2xl px-5 py-4`}>
          <p className="text-sm font-semibold text-gray-800">{r.title}</p>
          <p className="text-sm text-gray-500 mt-0.5">{r.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function QuizResult({ score, total, questions, userAnswers }) {
  const navigate = useNavigate();
  const percent = Math.round((score / total) * 100);
  const incorrect = total - score;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-5 py-8 max-w-xl mx-auto flex flex-col gap-5">

        {/* ── Card 1: Score ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-6 flex flex-col items-center gap-4">
          <p className="text-lg font-bold text-gray-900">
            🎉 Quiz Completed!
          </p>
          <p className="text-sm text-gray-500 -mt-2">
            You have answered <span className="font-semibold text-gray-800">{score}</span> out of{" "}
            <span className="font-semibold text-gray-800">{total}</span> questions correctly
          </p>

          <CircleProgress score={score} total={total} />

          {/* Progress bar */}
          <div className="w-full">
            <p className="text-xs text-gray-400 text-right mb-1">{percent}%</p>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-700"
                style={{
                  width: `${percent}%`,
                  background: "linear-gradient(to right, #a855f7, #ec4899)",
                }}
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 text-sm mt-1">
            <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
              ✅ {score} Correct
            </span>
            <span className="flex items-center gap-1 bg-red-50 text-red-500 px-3 py-1 rounded-full font-medium">
              ❌ {incorrect} Incorrect
            </span>
            <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
              🏆 {percent}%
            </span>
          </div>
        </div>

        {/* ── Card 2: Riwayat Sesi ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">🗒️ Riwayat Sesi</h2>
          <p className="text-sm text-gray-500 text-right mb-1">{percent}%</p>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-700"
              style={{
                width: `${percent}%`,
                background: "linear-gradient(to right, #ec4899, #f43f5e)",
              }}
            />
          </div>
        </div>

        {/* ── Card 3: Detail Jawaban ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">🔍 Detail Jawaban</h2>
          <div className="flex flex-col gap-3">
            {questions.map((q, i) => {
              const userIdx = userAnswers[i];
              const correct = userIdx === q.correctIndex;
              return (
                <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    {i + 1}. {q.question}
                  </p>
                  {!correct && userIdx !== null && userIdx !== undefined && (
                    <p className="text-sm text-red-500">
                      ✗ Your answer: {q.options[userIdx]}
                    </p>
                  )}
                  <p className="text-sm text-green-600">
                    ✓ Correct answer: {q.options[q.correctIndex]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Card 4: Recommendation ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">💡 Recommendation</h2>
          <Recommendations percent={percent} />
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-3 pb-6">
          <button
            onClick={() => navigate("/notes")}
            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 active:scale-95 transition"
          >
            Catat Pelajaran Ini
          </button>
          <button
            onClick={() => navigate("/learn")}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 active:scale-95 transition"
          >
            Belajar Lagi
          </button>
        </div>

      </div>
    </>
  );
}