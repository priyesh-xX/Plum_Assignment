import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// If you want to use icons (optional, but included here)
import { FaRegClock } from 'react-icons/fa'; // Install using: npm install react-icons

function ChallengeQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const questions = location.state?.questions || [];

  const QUIZ_DURATION_MINUTES = 20;
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_MINUTES * 60);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Timer effect
  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏰ Time's up! Submitting your quiz...");
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const handleChange = (index, value) => {
    const updated = [...userAnswers];
    updated[index] = value;
    setUserAnswers(updated);
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      const userAns = userAnswers[i]?.trim().toLowerCase();
      const correctAns = q.answer?.trim().toLowerCase();
      if (userAns === correctAns) correct++;
    });
    setCorrectCount(correct);
    setXp(correct * 10);
    setSubmitted(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!questions.length) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl">No challenge questions found!</h1>
        <button
          className="mt-4 bg-purple-700 px-4 py-2 rounded"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">⚡ Challenge Mode</h1>
        <div className="text-lg font-mono flex items-center gap-2">
          <FaRegClock className="text-yellow-300" />
          <span>Time Left:</span>
          <span className="text-yellow-400">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {submitted ? (
        <div className="bg-gray-900 p-6 rounded-lg border border-purple-700 shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">✅ Quiz Completed!</h2>
          <p className="text-green-400 text-xl mb-2">
            Correct Answers: {correctCount} / {questions.length}
          </p>
          <p className="text-purple-400 text-xl mb-6">XP Earned: {xp} 🧠</p>
          <button
            className="px-6 py-2 bg-purple-700 hover:bg-purple-800 rounded"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {questions.map((q, i) => (
            <div key={i} className="mb-6">
              <p className="mb-2 whitespace-pre-line font-medium">
                {i + 1}. {q.question}
              </p>
              <input
                type="text"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                value={userAnswers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="Type your answer..."
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold"
          >
            Submit Answers
          </button>
        </form>
      )}
    </div>
  );
}

export default ChallengeQuizPage;
