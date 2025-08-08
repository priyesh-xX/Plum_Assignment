import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../api/userApi';

const FullLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    loadData();
  }, []);

  const medalIcons = ['🥇', '🥈', '🥉'];

  const filteredData = leaderboardData.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
        🏆LEADERBOARD🏆
      </h1>

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 rounded-md bg-gray-900 text-white border border-purple-700 focus:outline-none focus:ring focus:border-purple-500"
      />

      {filteredData.length === 0 ? (
        <p className="text-gray-400">No users found.</p>
      ) : (
        <div className="space-y-4">
          {filteredData.map((user, index) => {
            const rank = index + 1;
            const progress = Math.min(user.xp / (leaderboardData[0]?.xp || 1), 1) * 100;

            return (
              <div
                key={user.id}
                className="flex flex-col bg-gradient-to-r from-purple-900/40 to-purple-800/30 text-white px-5 py-4 rounded-xl shadow-md hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-extrabold w-7 text-center">
                      {medalIcons[index] || `#${rank}`}
                    </div>
                    <div className="flex items-center">
                      <div className="bg-purple-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm mr-3">
                        {user.username.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="font-semibold text-lg">{user.username}</h2>
                        <p className="text-xs text-gray-300">
                          {user.xp.toLocaleString()} XP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FullLeaderboard;
