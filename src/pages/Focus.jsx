import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const CircularTimer = ({ seconds, totalTime, isBreak }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - seconds / totalTime);

  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      <svg width="176" height="176" className="absolute top-0 left-0 -rotate-90">
        <circle
          cx="88" cy="88" r={radius}
          fill="none" stroke="#e5e7eb" strokeWidth="6"
        />
        <circle
          cx="88" cy="88" r={radius}
          fill="none"
          stroke={isBreak ? "#f97316" : "#111827"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <span className="text-4xl font-bold text-gray-900 tracking-tight z-10">
        {Math.floor(seconds / 60).toString().padStart(2, "0")}:
        {(seconds % 60).toString().padStart(2, "0")}
      </span>
    </div>
  );
};

export default function Focus() {
  const { user } = useAuth();
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState(0);
  const [isBreak, setIsBreak] = useState(false);

  const totalTime = isBreak
    ? session === 0 ? LONG_BREAK_TIME : BREAK_TIME
    : WORK_TIME;

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setSeconds(WORK_TIME);
    setSession(0);
    setIsBreak(false);
  };

  const handleSkip = () => {
    setRunning(false);
    if (isBreak) {
      setIsBreak(false);
      setSeconds(WORK_TIME);
    } else {
      const nextSession = session + 1;
      if (nextSession >= 4) {
        setSession(0);
        setSeconds(LONG_BREAK_TIME);
      } else {
        setSession(nextSession);
        setSeconds(BREAK_TIME);
      }
      setIsBreak(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="px-6 py-10">
        <div className="max-w-sm mx-auto flex flex-col gap-6">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Focus Timer</h1>
            <p className="text-sm text-gray-400 mt-1">Keep track of your tasks and deadlines.</p>
          </div>

          {/* Streak card */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl px-6 py-5 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-orange-400">Daily streak</span>
              <span className="text-4xl font-bold text-orange-500">{user?.streak ?? 0}</span>
              <span className="text-xs text-orange-300">days in a row</span>
              <span className="text-xs text-gray-500 mt-2">Small steps every day add up.</span>
            </div>
            <span className="text-5xl">🔥</span>
          </div>

          {/* Timer card */}
          <div className="bg-white border border-gray-100 rounded-2xl px-6 py-8 flex flex-col items-center gap-6 shadow-sm">
            <p className="text-sm text-gray-400">
              {isBreak ? "Break time! 😮‍💨" : "Today's Session"}
            </p>

            {/* Session dots */}
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i <= session ? "bg-gray-900" : "bg-gray-200"}`}
                />
              ))}
            </div>

            <CircularTimer seconds={seconds} totalTime={totalTime} isBreak={isBreak} />

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setRunning(!running)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full"
              >
                {running ? "⏸ PAUSE" : "▶ START"}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                ↺ Reset
              </button>
              <button
                onClick={handleSkip}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                ▶ Skip
              </button>
            </div>
          </div>

          {/* Pomodoro guide */}
          <div className="bg-blue-50 rounded-2xl px-6 py-5 text-center">
            <p className="text-sm font-semibold text-blue-700 mb-1">Pomodoro Guide</p>
            <p className="text-xs text-blue-500 leading-relaxed">
              Focus for 25 minutes without distractions → take a 5-minute break → repeat.<br />
              After 4 sessions, take a longer break (15–20 minutes).
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}