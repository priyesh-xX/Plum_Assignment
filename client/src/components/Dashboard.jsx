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

const Dashboard = () => {
  // Dummy user data
  const user = {
    name: "John Smith",
    level: 12,
    xp: 3450,
    totalXp: 4000,
    isPremium: false,
  }

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
