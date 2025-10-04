import { useState } from "react";
import { fetchPracticeQuizzesByTopic } from "../api/practiceApi.js";
import { useNavigate } from "react-router-dom";

function QuizButtons() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const quizTopics = [
    { id: 1, name: "MELA", description: "Music, Entertainment, Literature, and Arts" },
    { id: 2, name: "Sports", description: "All sports and sporting events" },
    { id: 3, name: "India", description: "History, geography, and culture of India" },
    { id: 4, name: "BizTech", description: "Business, technology, and innovation" },
    { id: 5, name: "General", description: "General knowledge and current affairs" },
  ];

  const handleChallengeClick = async () => {
    if (!selectedTopic) {
      alert("Please select a topic first!");
      return;
    }

    try {
      setLoading(true);

      // Call backend with topic query param
      const res = await fetch(`http://localhost:3000/api/quiz/challenge?topic=${encodeURIComponent(selectedTopic)}`);
      const data = await res.json();

      if (res.ok) {
        if (data.questions && data.questions.length > 0) {
          navigate("/challenge", { state: { questions: data.questions, topic: selectedTopic } });
        } else {
          alert("No challenge questions found. Try a different topic.");
        }
      } else {
        alert(data.message || "Failed to fetch challenge questions.");
      }
    } catch (err) {
      console.error(err);
      alert("Error reaching the server.");
    } finally {
      setLoading(false);
    }
  };

  // Practice Mode
  const handleStartQuiz = async () => {
    if (!selectedTopic) {
      alert("Please select a topic first.");
      return;
    }

    setIsLoading(true);
    try {
      const quizzes = await fetchPracticeQuizzesByTopic(selectedTopic);

      if (quizzes.length === 0) {
        alert("No quiz sets found for this topic.");
      } else {
        const quiz = quizzes[0];
        window.open(quiz.file_url, "_blank");
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      alert("Something went wrong fetching quizzes.");
    }
    setIsLoading(false);
    setShowPracticeModal(false);
  };

  return (
    <>
      {/* Topic Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {quizTopics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => setSelectedTopic(topic.name)}
            className={`cursor-pointer p-3 rounded-lg border transition-colors ${
              selectedTopic === topic.name
                ? "bg-purple-600/60 border-purple-400"
                : "bg-purple-900/30 hover:bg-purple-800/50 border-purple-700/50"
            }`}
          >
            <h4 className="font-medium text-white">{topic.name}</h4>
            <p className="text-sm text-gray-300 mt-1">{topic.description}</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center mt-6">
        {/* Practice Mode */}
        <div
          onClick={() => setShowPracticeModal(true)}
          className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg hover:bg-black/60 transition-colors cursor-pointer group"
        >
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-white mb-2">Practice Mode</h3>
            <p className="text-gray-300">
              {isLoading
                ? "Loading..."
                : "Practice quizzes on any topic without affecting your XP or level."}
            </p>
          </div>
        </div>

        {/* Challenge Mode */}
        <div
          onClick={handleChallengeClick}
          className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg hover:bg-black/60 transition-colors cursor-pointer group"
        >
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-white mb-2">Challenge Mode</h3>
            <p className="text-gray-300">
              {loading
                ? "Generating challenge questions..."
                : "Timed quizzes with XP rewards and streak bonuses. Test your limits!"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizButtons;
