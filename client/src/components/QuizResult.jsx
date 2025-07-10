import React, { useEffect, useState } from "react";
import { updateUserXP } from "../api/userApi.js";

const QuizResult = ({ userId, xpGained }) => {
  const [xpInfo, setXpInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alreadyUpdated = sessionStorage.getItem(`xpUpdated-${userId}`);
    if (alreadyUpdated) {
      console.log("XP already updated for this session");
      setLoading(false);
      return;
    }

    const updateXp = async () => {
      try {
        const updated = await updateUserXP(userId, xpGained);
        console.log("Updated XP info:", updated);
        setXpInfo(updated);
        sessionStorage.setItem(`xpUpdated-${userId}`, true);
      } catch (err) {
        console.error("Failed to update XP:", err);
      } finally {
        setLoading(false);
      }
    };

    updateXp();
  }, [userId, xpGained]);

  if (loading) return <p className="text-white">Updating your XP...</p>;

  return (
    <div className="bg-gray-900 text-white p-4 rounded shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-2">Quiz Complete!</h2>
      <p>You gained {xpGained} XP.</p>
      {xpInfo && (
        <>
          <p className="mt-2">🎖️ Your total XP: {xpInfo.xp}</p>
          <p className="mt-1">🏆 Your current level: {xpInfo.level}</p>
        </>
      )}
    </div>
  );
};

export default QuizResult;
