const UserDropdown = ({ navigateTo, onLogout }) => {
    return (
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg backdrop-blur-md bg-black/60 border border-purple-900/50 ring-1 ring-black ring-opacity-5 py-1">
        <button
          onClick={() => navigateTo("profile")}
          className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-purple-800/50 transition-colors"
        >
          Your Profile
        </button>
        <button
          onClick={() => navigateTo("settings")}
          className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-purple-800/50 transition-colors"
        >
          Settings
        </button>
        <div className="border-t border-gray-700 my-1"></div>
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-purple-800/50 transition-colors"
        >
          Sign out
        </button>
      </div>
    )
  }
  
  export default UserDropdown
  