import { useNavigate } from "react-router-dom"

const UserDropdown = ({ user }) => {
  const navigate = useNavigate()
  console.log("Dropdown received userId:", user);

  const handleLogout=()=>{
    //clear saved data
    localStorage.clear();
    //redirect to login page
    navigate("/login");
  };

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg backdrop-blur-md bg-black/60 border border-purple-900/50 ring-1 ring-black ring-opacity-5 py-1">
      <button
        onClick={() => navigate(`/profile/${user.id}`)}
        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-purple-800/50 transition-colors"
      
      >
        
        Your Profile
      </button>
      <button
        onClick={() => navigate("/settings")}
        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-purple-800/50 transition-colors"
      >
        Settings
      </button>

      {/*  Show only if user is admin */}
      {user.role === "admin" && (
        <button
          onClick={() => navigate("/admin/news")}
          className="block w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-purple-800/50"
        >
          Post News
        </button>
      )}

      <div className="border-t border-gray-700 my-1"></div>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-purple-800/50 transition-colors"
      >
        Sign out
      </button>
    </div>
  )
}

export default UserDropdown
