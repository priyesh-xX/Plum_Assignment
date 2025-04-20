const PremiumTeaser = () => {
    return (
      <div className="backdrop-blur-md bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-500/50 shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-yellow-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
  
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Upgrade to Premium</h3>
            <p className="text-gray-300 mb-4">
              Get access to exclusive quizzes, advanced analytics, and ad-free experience.
            </p>
            <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default PremiumTeaser
  