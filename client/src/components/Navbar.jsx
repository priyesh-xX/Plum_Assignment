"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import UserDropdown from "./UserDropdown"

const Navbar = ({ navigateTo, onLogout, currentPage, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (path) => {
    if (location.pathname === "/dashboard" && path.includes("#")) {
      window.location.hash = path.split("#")[1];
    } else {
      navigate(path);
    }
  };

  const forceDashboard = () => {
    window.location.href = "http://localhost:5173/dashboard";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-purple-900/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={forceDashboard} className="flex items-center">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-cover scale-100 translate-y-1" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Gnosis
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block ml-auto mr-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={forceDashboard}
                className={`${
                  currentPage === "dashboard"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("/dashboard#about")}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigation("/dashboard#contact")}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                JS
              </div>
            </button>
            {isDropdownOpen && (
              <UserDropdown
                user={user}
                onLogout={onLogout}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
