import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ChallengeQuizPage from "./components/ChallengeQuizPage";
import Subscriptions from "./components/Subscription";

import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // change to false in production

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
        {isAuthenticated && <Navbar onLogout={() => setIsAuthenticated(false)} />}

        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                <Dashboard />
          
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/challenge" element={<ChallengeQuizPage />} />
          <Route path="/upgrade" element={<Subscriptions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
