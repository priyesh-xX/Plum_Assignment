import { useState } from "react"

const QuizButtons = () => {
  const [showPracticeModal, setShowPracticeModal] = useState(false)

  // Dummy quiz topics
  const quizTopics = [
    { id: 1, name: "MELA", description: "Music, Entertainment, Literature, and Arts" },
    { id: 2, name: "Sports", description: "All sports and sporting events" },
    { id: 3, name: "India", description: "History, geography, and culture of India" },
    { id: 4, name: "BizTech", description: "Business, technology, and innovation" },
    { id: 5, name: "General", description: "General knowledge and current affairs" },
  ]

  // Dummy difficulty levels
  const difficultyLevels = [
    { id: 1, name: "Easy", color: "green" },
    { id: 2, name: "Medium", color: "yellow" },
    { id: 3, name: "Hard", color: "red" },
  ]

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  justify-center items-center mt-6">
        {/* Practice Mode Button */}
        <div
          onClick={() => setShowPracticeModal(true)}
          className="backdrop-blur-md bg-black/50 rounded-xl  p-6 border border-purple-900/50 shadow-lg hover:bg-black/60 transition-colors cursor-pointer group"
        >
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Practice Mode</h3>
            <p className="text-gray-300">Practice quizzes on any topic without affecting your XP or level.</p>
          </div>
        </div>

        {/* Challenge Mode Button */}
        <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg hover:bg-black/60 transition-colors cursor-pointer group">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Challenge Mode</h3>
            <p className="text-gray-300">Timed quizzes with XP rewards and streak bonuses. Test your limits!</p>
          </div>
        </div>
      </div>

      {/* Practice Mode Modal */}
      {showPracticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="relative w-full max-w-2xl backdrop-blur-xl bg-gray-950/90 rounded-xl p-6 border border-purple-500/50 shadow-lg">
            <button
              onClick={() => setShowPracticeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Practice Mode</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Select Topic</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {quizTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-purple-900/30 hover:bg-purple-800/50 border border-purple-700/50 rounded-lg p-3 cursor-pointer transition-colors"
                  >
                    <h4 className="font-medium text-white">{topic.name}</h4>
                    <p className="text-sm text-gray-300 mt-1">{topic.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Select Difficulty</h3>
              <div className="flex flex-wrap gap-3">
                {difficultyLevels.map((level) => (
                  <div
                    key={level.id}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-colors border ${
                      level.color === "green"
                        ? "bg-green-900/30 hover:bg-green-800/50 border-green-700/50"
                        : level.color === "yellow"
                          ? "bg-yellow-900/30 hover:bg-yellow-800/50 border-yellow-700/50"
                          : "bg-red-900/30 hover:bg-red-800/50 border-red-700/50"
                    }`}
                  >
                    <span className="font-medium text-white">{level.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default QuizButtons
