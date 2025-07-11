import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import TimeMe from "timeme.js";

import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";
import ChallengeQuizPage from "./components/ChallengeQuizPage";
import Subscriptions from "./components/Subscription";
import NewsAdmin from "./components/NewsAdmin";
import SuccessPage from "./components/SuccessPage";
import CancelPage from "./components/CancelPage";
import Page from "./components/Page";

import "./index.css";

function AuthenticatedLayout({ children, user, onLogout, currentPage, navigateTo }) {
  return (
    <>
      <Navbar
        user={user}
        onLogout={onLogout} 
        navigateTo={navigateTo}
        currentPage={currentPage}
      />
      {children}
    </>
  );
}


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const navigateTo = (page) => setCurrentPage(page);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // ✅ Check login status on initial app load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setIsAuthenticated(true);
        setCurrentPage("dashboard");
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true); // ✅ finished checking
      }
    };

    checkLoginStatus();
  }, []);

  // ✅ TimeMe.js setup for tracking
  useEffect(() => {
    TimeMe.initialize({
      currentPageName: "overall",
      idleTimeoutInSeconds: 30,
    });

    TimeMe.startTimer("overall");

    const saveTimeOnExit = () => {
      const seconds = Math.floor(TimeMe.getTimeOnCurrentPageInSeconds());
      const today = new Date().toISOString().split("T")[0];
      const data = JSON.parse(localStorage.getItem("activity-log") || "{}");
      data[today] = (data[today] || 0) + seconds;
      localStorage.setItem("activity-log", JSON.stringify(data));
    };

    window.addEventListener("beforeunload", saveTimeOnExit);
    return () => {
      saveTimeOnExit();
      window.removeEventListener("beforeunload", saveTimeOnExit);
    };
  }, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
        {authChecked ? (
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Page />} />
            <Route
              path="/signup"
              element={
                <SignUp
                  setUser={(userData) => {
                    setUser(userData);
                    setIsAuthenticated(true);
                    setCurrentPage("dashboard");
                  }}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="/login"
              element={<Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />

            {/* Protected Routes */}
            {isAuthenticated && (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <AuthenticatedLayout
                      user={user}
                      onLogout={handleLogout}
                      currentPage={currentPage}
                      navigateTo={navigateTo}
                    >
                      <Dashboard />
                    </AuthenticatedLayout>
                  }
                />
                <Route
                  path="/profile/:id"
                  element={
                    <AuthenticatedLayout
                      user={user}
                      onLogout={handleLogout}
                      currentPage={currentPage}
                      navigateTo={navigateTo}
                    >
                      <UserProfile editable={false} />
                    </AuthenticatedLayout>
                  }
                />
                <Route
                  path="/profile/:id/edit"
                  element={
                    <AuthenticatedLayout
                      user={user}
                      onLogout={handleLogout}
                      currentPage={currentPage}
                      navigateTo={navigateTo}
                    >
                      <UserProfile editable={true} />
                    </AuthenticatedLayout>
                  }
                />
                <Route
                  path="/challenge"
                  element={
                    <AuthenticatedLayout
                      user={user}
                      onLogout={handleLogout}
                      currentPage={currentPage}
                      navigateTo={navigateTo}
                    >
                      <ChallengeQuizPage />
                    </AuthenticatedLayout>
                  }
                />
                <Route
                  path="/upgrade"
                  element={
                    <AuthenticatedLayout
                      user={user}
                      onLogout={handleLogout}
                      currentPage={currentPage}
                      navigateTo={navigateTo}
                    >
                      <Subscriptions />
                    </AuthenticatedLayout>
                  }
                />
                <Route
                  path="/admin/news"
                  element={
                    <AuthenticatedLayout
                      user={user}
                      onLogout={handleLogout}
                      currentPage={currentPage}
                      navigateTo={navigateTo}
                    >
                      <NewsAdmin />
                    </AuthenticatedLayout>
                  }
                />
              </>
            )}

            {/* Fallback */}
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
            />
          </Routes>
        ) : (
          <div className="text-white text-center pt-40">Loading...</div>
        )}
      </div>
    </Router>
  );
}

export default App;
