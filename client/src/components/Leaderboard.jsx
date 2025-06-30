import React,{useEffect,useState} from 'react';
import { fetchLeaderboard } from '../api/userApi.js';


const Leaderboard = () => {
    // Dummy leaderboard data
    // const leaderboardData = [
    //   { id: 1, name: "Alex Johnson", score: 9850, avatar: "AJ" },
    //   { id: 2, name: "Sarah Williams", score: 8720, avatar: "SW" },
    //   { id: 3, name: "John Smith", score: 7650, avatar: "JS" },
    //   { id: 4, name: "Emily Davis", score: 6540, avatar: "ED" },
    //   { id: 5, name: "Michael Brown", score: 5980, avatar: "MB" },
    // ]

    const [leaderboardData,setLeaderboardData]=useState([]);

     useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard()
        setLeaderboardData(data)
      } catch (error) {
        console.error("Error loading leaderboard:", error)
      }
    }

    loadLeaderboard()
  }, [])
  
    return (
    <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Leaderboard</h2>

      {leaderboardData.length === 0 ? (
        <p className="text-gray-400">No leaderboard data available.</p>
      ) : (
        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center p-3 rounded-lg bg-gradient-to-r from-gray-800/50 to-purple-900/30 border border-purple-800/30"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 text-white font-bold text-sm mr-3">
                {index + 1}
              </div>

              <div className="flex items-center flex-1">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold mr-3">
                  {user.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-medium text-white">{user.username}</h3>
                  <p className="text-sm text-gray-400">{user.xp.toLocaleString()} XP</p>
                </div>
              </div>

              {index === 0 && (
                <div className="ml-2 flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500 text-yellow-900">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="w-full mt-4 py-2 bg-purple-700/50 hover:bg-purple-600/50 text-white text-sm font-medium rounded-md transition-colors">
        View Full Leaderboard
      </button>
    </div>
  );
  }
  
  export default Leaderboard
  