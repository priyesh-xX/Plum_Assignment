import { useEffect, useMemo, useState } from "react"
import TimeMe from "timeme.js"

const ActivityCalendar = () => {
  const [activityData, setActivityData] = useState([])

  // Initialize TimeMe and save time on unload
  useEffect(() => {
    TimeMe.initialize({
      currentPageName: "app", // you can customize per route if needed
      idleTimeoutInSeconds: 30,
    })
    TimeMe.startTimer("app")

    const saveTimeOnUnload = () => {
      const seconds = Math.floor(TimeMe.getTimeOnCurrentPageInSeconds())
      const today = new Date().toISOString().split("T")[0]

      const storedData = JSON.parse(localStorage.getItem("activity-log") || "{}")
      storedData[today] = (storedData[today] || 0) + seconds
      localStorage.setItem("activity-log", JSON.stringify(storedData))
    }

    window.addEventListener("beforeunload", saveTimeOnUnload)

    return () => {
      saveTimeOnUnload()
      window.removeEventListener("beforeunload", saveTimeOnUnload)
    }
  }, [])

  // Load and generate 30-day data
  useEffect(() => {
    const today = new Date()
    const storedData = JSON.parse(localStorage.getItem("activity-log") || "{}")
    const data = []

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const key = date.toISOString().split("T")[0]
      const seconds = storedData[key] || 0

      // Map seconds to activity level
      let level = 0
      if (seconds >= 900) level = 3        // 15+ mins
      else if (seconds >= 300) level = 2   // 5–15 mins
      else if (seconds >= 60) level = 1    // 1–5 mins
      // else 0 = < 1 min or none

      data.push({ date: key, seconds, count: level })
    }

    setActivityData(data)
  }, [])

  const getDayName = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  return (
    <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Your Quiz Activity</h2>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${activityData.length}, minmax(0, 1fr))` }}>
            {activityData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`h-6 w-6 rounded-sm transition-colors duration-300 ${
                    day.count === 0
                      ? "bg-gray-800"
                      : day.count === 1
                      ? "bg-purple-900"
                      : day.count === 2
                      ? "bg-purple-700"
                      : "bg-purple-500"
                  }`}
                  title={`${day.date}: ${Math.floor(day.seconds / 60)} min`}
                ></div>
                {index % 5 === 0 && (
                  <span className="text-xs text-gray-500 mt-1">
                    {getDayName(day.date)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-4">
        <span className="text-xs text-gray-400 mr-2">Less</span>
        <div className="flex space-x-1">
          <div className="h-3 w-3 rounded-sm bg-gray-800" title="0–1 min"></div>
          <div className="h-3 w-3 rounded-sm bg-purple-900" title="1–5 min"></div>
          <div className="h-3 w-3 rounded-sm bg-purple-700" title="5–15 min"></div>
          <div className="h-3 w-3 rounded-sm bg-purple-500" title="15+ min"></div>
        </div>
        <span className="text-xs text-gray-400 ml-2">More</span>
      </div>
    </div>
  )
}

export default ActivityCalendar
