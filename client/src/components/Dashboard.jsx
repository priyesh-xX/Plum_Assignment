import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";


import Footer from "./../components/Footer";
import WelcomeSection from "./WelcomSection";
import NewsCarousel from "./NewsCarousel";
import EventsSection from "./EventSection";
import QuizButtons from "./QuizButtons";
import ActivityCalendar from "./ActivityCalendar";
import Leaderboard from "./Leaderboard";
import PremiumTeaser from "./PremiumTeaser";
import About from "./About";
import Contact from "./Contact";
import QuizResult from "./QuizResult.jsx";

import { fetchUserById, fetchUserXP } from '../api/userApi.js';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchUserData = async () => {
    try {
      //  Ask backend to decode token from HttpOnly cookie
      const res = await axios.get("http://localhost:3000/api/users/me", {
        withCredentials: true,
      });

      const user = res.data.user;

      //  Optional: Fetch XP details separately
      const xpData = await fetchUserXP(user.id);

      setUser({
        ...user,
        xp: xpData.xp,
        level: xpData.level,
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);


  if (loading) return <div className="text-center pt-20 text-white">Loading...</div>;
  if (!user) return <div className="text-center pt-20 text-red-500">User not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-gray-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
  <div className="animate-welcomeEntrance rounded-xl shadow-md bg-gradient-to-br from-purple-800 to-purple-950 p-6">
  <WelcomeSection user={user} />
</div>

  <div className="transition transform hover:scale-105 hover:-translate-y-1 duration-300">
    <NewsCarousel />
  </div>

  <div className="transition transform hover:scale-105 hover:-translate-y-1 duration-300">
    <EventsSection user={user} />
  </div>
    
  
    <QuizButtons />
  

  {!user.isPremium && (
    <div className="transition transform hover:scale-105 hover:-translate-y-1 duration-300">
      <PremiumTeaser />
    </div>
  )}
</div>
          <div className="space-y-6">
            <div className="transition transform hover:scale-105 hover:-translate-y-1 duration-300">
            <ActivityCalendar user={user} />
            </div>
            <Leaderboard user={user}/>
          </div>
        </div>

        <div id="about" className="pt-16 mt-10">
          <About />
        </div>

        <div id="contact" className="pt-16 mt-10">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
