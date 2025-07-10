import Footer from "./../components/Footer"
import WelcomeSection from "./WelcomSection"
import NewsCarousel from "./NewsCarousel"
import EventsSection from "./EventSection"
import QuizButtons from "./QuizButtons"
import ActivityCalendar from "./ActivityCalendar"
import Leaderboard from "./Leaderboard"
import PremiumTeaser from "./PremiumTeaser"
import About from "./About"
import Contact from "./Contact"

import QuizResult from "./QuizResult.jsx"

import React,{useEffect,useState} from 'react';
import { fetchUserById } from '../api/userApi.js';
import { fetchUserXP } from "../api/userApi.js"

const Dashboard = () => {


  const [user, setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  // const userId=1;//
  const userId=localStorage.getItem("userId");

  useEffect(()=>{
    const fetchUserData=async() =>{
      try{
        const basicData=await fetchUserById(userId);//gets user info
        const xpData=await fetchUserXP(userId);//get user XP

        // setUser(userData);//update local state with fetched data
        setUser({  //now user has both info
        ...basicData,
        xp: xpData.xp,
        level: xpData.level
      });
      }catch(error){
        console.error("Failed to fetch user:",error);
      }finally{
        setLoading(false);//stop loading
      }
    }
    fetchUserData()
  },[]);


  if (loading) return <div className="text-center pt-20 text-white">Loading...</div>//while loading
  if (!user) return <div className="text-center pt-20 text-red-500">User not found</div>


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-gray-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <WelcomeSection user={user} />
            <NewsCarousel />
            <EventsSection />
            <QuizButtons />

            
          {/* ✅ TEMP: Show Quiz Result */}
          <QuizResult userId={1} xpGained={50} />
          
            {!user.isPremium && <PremiumTeaser />}
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            <ActivityCalendar user={user} />
            <Leaderboard />
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="pt-16 mt-10">
          <About />
        </div>

        {/* Contact Section */}
        <div id="contact" className="pt-16 mt-10">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
