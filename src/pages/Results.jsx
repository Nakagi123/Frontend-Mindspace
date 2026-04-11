import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "../context/MoodContext";
import Navbar from "../components/Navbar";
import { notesApi } from "../lib/api";

const DIFFICULTY_LABELS = ["Easy", "Medium", "Hard"];

export default function Results() {
  const navigate = useNavigate();
  const { pace, difficulty, summary } = useMood();
  const [relaxMode, setRelaxMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!summary) {
      navigate("/learn");
    }
  }, [summary, navigate]);

  if (!summary) return null;

  const {
    title,
    summary: content,
    metadata,
  } = summary;

  const keyPoints = content.split(". ").filter(Boolean);

  // 👇 Your teammate will replace this with actual extracted keywords
  const keywords = ["userflow", "explanation", "landing page", "website", "Lorem"];

  const relaxSummary = [
    `Title: ${title}`,
    `Mood: ${metadata.mood}`,
    `Key idea: ${content.slice(0, 120)}...`,
  ];

  const saveToNotes = async () => {
    setSaving(true);
    try {
      // Format konten untuk disimpan (title akan diambil dari baris pertama oleh backend)
      const noteContent = `${title}\n\nSummary:\n${content}\n\nKeywords:\n${keywords.join(", ")}`;
      
      console.log("Saving to notes:", noteContent);
      
      // ✅ Kirim hanya content
      const result = await notesApi.create(noteContent);
      
      console.log("Save result:", result);
      alert("✅ Summary saved to notes!");
      navigate("/notes");
    } catch (error) {
      console.error("Failed to save:", error);
      alert(`Failed to save: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="px-6 py-10">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          {/* Top bar */}
          <div className="flex items-center justify-between">

            {/* Left — relax mode badge OR pace/difficulty */}
            {relaxMode ? (
              <div className="flex flex-col gap-1">
                <div className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 w-fit">
                  Relax Mode
                </div>
                <p className="text-sm text-gray-400 ml-1">Content has been simplified to make it easier to follow.</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700">
                  <span>{pace}</span>
                  <span className="text-gray-300">•</span>
                  <span>{DIFFICULTY_LABELS[difficulty]}</span>
                </div>
                <span className="text-sm text-gray-400 ml-1">
                  {DIFFICULTY_LABELS[difficulty] === "Easy"
                    ? "Keypoints only"
                    : DIFFICULTY_LABELS[difficulty] === "Medium"
                    ? "With explanations"
                    : "Full detail"}
                </span>
              </div>
            )}

            {/* I'm Tired toggle button */}
            {!relaxMode && (
              <button
                onClick={() => setRelaxMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-full
                           hover:bg-gray-700 active:scale-95 transition-all duration-200"
              >
                <span>😮‍💨</span>
                I'm Tired
              </button>
            )}
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">

            {relaxMode ? (
              /* Relax Mode view */
              <div className="flex flex-col items-center gap-4">
                <div className="text-5xl">😌</div>
                <p className="text-base font-medium text-gray-700">Light Mode</p>

                <ul className="w-full flex flex-col gap-2 mt-2">
                  {relaxSummary.map((line, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                      <span className="text-gray-400">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                {/* Encouragement box */}
                <div className="w-full bg-blue-50 rounded-2xl px-6 py-4 text-center mt-2">
                  <p className="text-sm font-medium text-blue-700">It's okay to rest.</p>
                  <p className="text-xs text-blue-400 mt-1">Take it slow today. You're doing great.</p>
                </div>

                {/* Back to normal */}
                <button
                  onClick={() => setRelaxMode(false)}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 mt-1"
                >
                  ← Back to full view
                </button>
              </div>
            ) : (
              /* Normal view */
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-3">Key Points</h2>
                  <ul className="flex flex-col gap-2">
                    {keyPoints.map((point, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-100" />

                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-3">Keywords</h2>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((word, i) => (
                      <span key={i} className="px-4 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/learn/quiz")}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 text-sm font-semibold rounded-full
                         hover:bg-gray-300 active:scale-95 transition-all duration-200"
            >
              Generate Quiz →
            </button>
            <button
              onClick={saveToNotes}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600
                         hover:text-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              {saving ? "Saving..." : "Save to Notes"}
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}