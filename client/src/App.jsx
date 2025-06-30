import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import UserProfile from './components/UserProfile'; 

import "./index.css";

import ChallengeQuizPage from "./components/ChallengeQuizPage";
import Subscriptions from "./components/Subscription";

import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({ id: 5, username: "testuser" }); // Dummy user
  const [currentPage, setCurrentPage] = useState("dashboard");

   // Function to handle page navigation
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  const handleLogin = () => {
  const loggedInUser = { id: 5, username: "testuser", email: "test@example.com", xp: 200, level: 3 };
  setUser(loggedInUser);
  setIsAuthenticated(true);
  setCurrentPage("dashboard");
};


  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

console.log("App rendering with user:", user);


  // const [isAuthenticated, setIsAuthenticated] = useState(true); // change to false in production

  return (
  <Router>
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
      {isAuthenticated && (
        <Navbar
          navigateTo={navigateTo}
          onLogout={handleLogout}
          currentPage={currentPage}
          userId={user?.id}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {isAuthenticated && (
          <>
            <Route path="/profile/:id" element={<UserProfile editable={false} />} />
            <Route path="/profile/:id/edit" element={<UserProfile editable={true} />} />
            <Route path="/challenge" element={<ChallengeQuizPage />} />
            <Route path="/upgrade" element={<Subscriptions />} />
          </>
        )}

        {/* Catch-all redirect to login if not authenticated */}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/login" replace />} />}
      </Routes>
    </div>
  </Router>
);
}

export default App;
