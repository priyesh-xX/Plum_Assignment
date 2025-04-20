import React from 'react';
import { useState } from 'react';

import Dashboard from './components/Dashboard';
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import "./index.css"

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  // Dummy auth state - in a real app, this would come from context or Redux
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  // Function to handle page navigation
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  // Function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentPage("dashboard")
  }

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage("login")
  }

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    if (!isAuthenticated && currentPage !== "login") {
      return <Login onLogin={handleLogin} />
    }

    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "login":
        return <Login onLogin={handleLogin} />
      default:
        return <Dashboard />
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
      {isAuthenticated && <Navbar navigateTo={navigateTo} onLogout={handleLogout} currentPage={currentPage} />}
      {renderPage()}
    </div>
  )
}

export default App;
