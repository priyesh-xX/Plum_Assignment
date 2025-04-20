const ActivityCalendar = ({ user }) => {
    // Generate dummy activity data for the last 30 days
    const generateActivityData = () => {
      const data = []
      const today = new Date()
  
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
  
        // Random activity level: 0 = none, 1 = low, 2 = medium, 3 = high
        const activityLevel = Math.floor(Math.random() * 4)
  
        data.push({
          date: date.toISOString().split("T")[0],
          count: activityLevel,
        })
      }
  
      return data
    }
  
    const activityData = generateActivityData()
  
    // Get day name from date
    const getDayName = (dateStr) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString("en-US", { weekday: "short" })
    }
  
    return (
      <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Your Quiz Activity</h2>
  
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-30 gap-1">
              {activityData.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`h-6 w-6 rounded-sm ${
                      day.count === 0
                        ? "bg-gray-800"
                        : day.count === 1
                          ? "bg-purple-900"
                          : day.count === 2
                            ? "bg-purple-700"
                            : "bg-purple-500"
                    }`}
                    title={`${day.date}: ${day.count} quizzes`}
                  ></div>
                  {index % 5 === 0 && <span className="text-xs text-gray-500 mt-1">{getDayName(day.date)}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="flex items-center justify-end mt-3">
          <span className="text-xs text-gray-400 mr-2">Less</span>
          <div className="flex space-x-1">
            <div className="h-3 w-3 rounded-sm bg-gray-800"></div>
            <div className="h-3 w-3 rounded-sm bg-purple-900"></div>
            <div className="h-3 w-3 rounded-sm bg-purple-700"></div>
            <div className="h-3 w-3 rounded-sm bg-purple-500"></div>
          </div>
          <span className="text-xs text-gray-400 ml-2">More</span>
        </div>
      </div>
    )
  }
  
  export default ActivityCalendar
  