import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateUserXP } from "../api/userApi";

function ChallengeQuizPage({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const questions = location.state?.questions || [];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [evaluationResults, setEvaluationResults] = useState([]);

  if (!questions.length) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl">No challenge questions found!</h1>
        <button
          className="mt-4 bg-purple-700 px-4 py-2 rounded"
          onClick={() => navigate("/dashboard")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleOptionChange = (option) => {
    const updated = [...userAnswers];
    updated[currentQIndex] = option;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (!userAnswers[currentQIndex]) {
      alert("Please select an option to continue.");
      return;
    }
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    let correct = 0;
    const results = [];

    questions.forEach((q, i) => {
      // Extract first letter of user's answer (A/B/C/D)
      const userLetter = userAnswers[i]?.trim().charAt(0).toUpperCase();
      const correctLetter = q.answer.trim().toUpperCase();

      const isCorrect = userLetter === correctLetter;
      if (isCorrect) correct++;

      results.push({
        question: q.question,
        options: q.options || [],
        userAnswer: userAnswers[i],
        correctAnswer: q.answer,
        isCorrect,
      });
    });

    const earnedXp = correct * 10;
    setEvaluationResults(results);
    setCorrectCount(correct);
    setXp(earnedXp);
    setSubmitted(true);

    // Update XP in backend
    try {
      await updateUserXP(user.id, earnedXp);
    } catch (err) {
      console.error("❌ Failed to update XP:", err);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">✅ Quiz Completed!</h1>
        <p className="text-green-400 text-lg mb-2 text-center">
          Correct Answers: {correctCount} / {questions.length}
        </p>
        <p className="text-purple-400 text-lg mb-6 text-center">
          XP Earned: {xp} 🧠
        </p>

        <div className="space-y-6">
          {evaluationResults.map((res, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg ${
                res.isCorrect ? "bg-green-900/30" : "bg-red-900/30"
              }`}
            >
              <p className="font-semibold mb-1 text-white">
                Q{i + 1}: {res.question}
              </p>
              <p className="text-sm text-gray-300 mb-1">
                <span className="font-medium">Your Answer:</span> {res.userAnswer}
              </p>
              <p className="text-sm text-gray-300 mb-1">
                <span className="font-medium">Correct Answer:</span> {res.correctAnswer}
              </p>
              <p
                className={`text-sm font-bold ${
                  res.isCorrect ? "text-green-400" : "text-red-400"
                }`}
              >
                {res.isCorrect ? "✅ Correct" : "❌ Incorrect"}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            className="px-6 py-2 bg-purple-700 hover:bg-purple-800 rounded text-white font-semibold"
            onClick={() => navigate("/dashboard")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Render current question with options
  const currentQuestion = questions[currentQIndex];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">⚡ Challenge Mode</h1>
      <p className="mb-4">
        Question {currentQIndex + 1} / {questions.length}
      </p>

      <div className="bg-gray-900 p-6 rounded-lg border border-purple-700 shadow-xl mb-4">
        <p className="mb-4 whitespace-pre-line font-medium">{currentQuestion.question}</p>
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((opt, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`q-${currentQIndex}`}
                value={opt}
                checked={userAnswers[currentQIndex] === opt}
                onChange={() => handleOptionChange(opt)}
                className="accent-purple-600"
                required
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
      >
        {currentQIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
      </button>
    </div>
  );
}

export default ChallengeQuizPage;
