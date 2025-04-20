const WelcomeSection = ({ user }) => {
    const progressPercentage = (user.xp / user.totalXp) * 100
  
    return (
      <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}!</h1>
            <p className="text-purple-300 mt-1">Ready to challenge your knowledge today?</p>
          </div>
  
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                {user.level}
              </div>
              <div>
                <p className="text-sm text-gray-300">Level {user.level}</p>
                <div className="w-32 h-2 bg-gray-700 rounded-full mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {user.xp} / {user.totalXp} XP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default WelcomeSection
  