const EventsSection = () => {
    // Dummy events data
    const events = [
      {
        id: 1,
        title: "Weekly Quiz Challenge",
        date: "May 15, 2023",
        time: "7:00 PM",
        location: "Online",
        category: "General Knowledge",
      },
      {
        id: 2,
        title: "MELA Special Quiz",
        date: "May 20, 2023",
        time: "6:30 PM",
        location: "Room 101",
        category: "MELA",
      },
      {
        id: 3,
        title: "BizTech Quiz Competition",
        date: "May 25, 2023",
        time: "5:00 PM",
        location: "Auditorium",
        category: "BizTech",
      },
    ]
  
    return (
      <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gradient-to-br from-gray-800/50 to-purple-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-800/30 hover:border-purple-500/50 transition-colors shadow-md"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-800/50 text-purple-200">
                  {event.category}
                </span>
              </div>
  
              <div className="mt-3 space-y-1">
                <div className="flex items-center text-gray-300 text-sm">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {event.date}
                </div>
  
                <div className="flex items-center text-gray-300 text-sm">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {event.time}
                </div>
  
                <div className="flex items-center text-gray-300 text-sm">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  {event.location}
                </div>
              </div>
  
              <button className="mt-4 w-full py-2 bg-purple-700/50 hover:bg-purple-600/50 text-white text-sm font-medium rounded-md transition-colors">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default EventsSection
  