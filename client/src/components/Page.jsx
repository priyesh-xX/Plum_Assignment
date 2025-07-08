import {
  Users,
  Trophy,
  Quote,
  ArrowRight,
  Github,
  Twitter,
  Mail,
  Award,
  Star,
  Target,
  Instagram
} from "lucide-react";
import { User } from "lucide-react";


import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/Card";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

export default function LandingPage() {
  const testimonials = [
    {
      name: "Naman Verma",
      role: "Former Club President, 2024",
      content:
        "Gnosis taught me that knowledge isn't just about facts—it's about connecting dots across disciplines. The thrill of a perfectly crafted question is unmatched.",
      image: null, // will trigger User icon
    },
    {
      name: "Ishaan Sharma",
      role: "Quiz Master, 2021-23",
      content:
        "The community at Gnosis is incredible. Every session challenges you to think beyond textbooks and explore the fascinating connections in our world.",
      image: null, // will trigger User icon
    },
    {
      name: "Piyush Patel",
      role: "Former Club President, 2023",
      content:
        "Being part of Gnosis means being part of a legacy. We don't just ask questions—we inspire curiosity and celebrate the joy of learning.",
      image: null, // will trigger User icon
    },
  ];


  // const quotes = [
  //   {
  //     text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
  //     author: "Albert Einstein",
  //   },
  //   {
  //     text: "Knowledge is power, but enthusiasm pulls the switch.",
  //     author: "Ivern Ball",
  //   },
  //   {
  //     text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  //     author: "Dr. Seuss",
  //   },
  // ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-l from-purple-900  to-gray-900">
      {/* Navigation */}
      <div className="relative mt-16">
        <nav className=" fixed top-0 left-0 w-full z-50  border-b border-purple-700/40 bg-gradient-to-l from-purple-900/30 via-red-950/20 to-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div
                onClick={() =>
                  scroll.scrollToTop({ duration: 600, smooth: true })
                }
                className="flex items-center space-x-2 cursor-pointer"
              >
                <img src="/logo.png" alt="Logo" className="w-10 h-10 object-cover scale-150 translate-y-1.5" />
                <span className="text-2xl font-bold text-white">Gnosis</span>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={600}
                  offset={-80} // adjust for fixed navbar height
                  className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors"
                >
                  About Us
                </ScrollLink>
                <ScrollLink
                  to="testimonials"
                  smooth={true}
                  duration={600}
                  offset={-80}
                  className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Testimonials
                </ScrollLink>
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={600}
                  offset={-80} // adjust for fixed navbar height
                  className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Contact Us
                </ScrollLink>
                <RouterLink to="/login">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-purple-400"
                  >
                    Login
                  </Button>
                </RouterLink>
                <RouterLink to="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Sign Up
                  </Button>
                </RouterLink>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="h-[calc(100vh-64px)] pt-16 flex items-center justify-center px-4 animated-gradient">
        <div className="w-full h-full flex items-center justify-center">
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Welcome To <span className="text-purple-400">Gnosis</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Where curiosity meets competition. Join our community of knowledge
              seekers, quiz enthusiasts, and intellectual explorers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/signup">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                >
                  Join Gnosis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </RouterLink>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 bg-transparent"
              >
                Learn More
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="about"
        className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-20"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Why Choose Gnosis?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-purple-800/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Intellectual Growth
                </h3>
                <p className="text-gray-400">
                  Challenge your mind with diverse topics spanning science,
                  arts, history, and beyond.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-purple-800/30">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  Community
                </h3>
                <p className="text-gray-400">
                  Connect with like-minded individuals who share your passion
                  for knowledge and learning.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-purple-800/30">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  Competition
                </h3>
                <p className="text-gray-400">
                  Test your skills in exciting quiz competitions and climb the
                  leaderboards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Our Achievements
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-l from-purple-900/40 via-red-900/30 to-purple-800/20 border-purple-700/40 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <Trophy className="h-16 w-16 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-center text-white mb-4">
                  Spring Fest IIT-KGP 2024
                </h3>
                <p className="text-center text-gray-300 text-lg mb-6">
                  Gnosis made history by securing{" "}
                  <span className="text-yellow-400 font-bold">
                    3 podium finishes
                  </span>{" "}
                  at one of India's most prestigious college festivals
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Award className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-yellow-400 font-semibold">1st Place</p>
                    <p className="text-gray-400 text-sm">General Quiz</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 font-semibold">2nd Place</p>
                    <p className="text-gray-400 text-sm">Science & Tech Quiz</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-amber-600 font-semibold">3rd Place</p>
                    <p className="text-gray-400 text-sm">Literature Quiz</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-700/30">
                <CardContent className="p-6 text-center">
                  <Star className="h-10 w-10 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">
                    50+ Quizzes Conducted per year
                  </h4>
                  <p className="text-gray-400">
                    Flagship events include Quiz-League, Antardwand and
                    Inquisition
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700/30">
                <CardContent className="p-6 text-center">
                  <Target className="h-10 w-10 text-red-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">
                    75% Win Rate
                  </h4>
                  <p className="text-gray-400">
                    Consistent performance in inter-college competitions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Words of Wisdom</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {quotes.map((quote, index) => (
              <Card key={index} className="bg-purple-900/20 border-purple-700/30">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-purple-400 mb-4" />
                  <blockquote className="text-gray-300 text-lg mb-4 italic">"{quote.text}"</blockquote>
                  <cite className="text-purple-400 font-semibold">— {quote.author}</cite>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
     <section
  id="testimonials"
  className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-20 bg-gray-800/30"
>
  <div className="container mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
      What Our Seniors Say
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="bg-gray-800/50 border-purple-800/30">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {testimonial.image ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                  <User className="text-white w-6 h-6" />
                </div>
              )}

              <div>
                <h4 className="text-white font-semibold">
                  {testimonial.name}
                </h4>
                <p className="text-purple-400 text-sm">{testimonial.role}</p>
              </div>
            </div>

            <p className="text-gray-300 italic">"{testimonial.content}"</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Expand Your Mind?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Gnosis today and become part of a community that celebrates
            knowledge, curiosity, and the joy of learning.
          </p>
          <RouterLink to ="/signup">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            >
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </RouterLink>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-purple-800/30 bg-gray-900/50 py-12 px-4"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
             <img src="/logo.png" alt="Logo" className="w-10 h-10 object-cover scale-100 translate-y-1"/>
                <span className="text-xl font-bold text-white">Gnosis</span>
              </div>
              <p className="text-gray-400">
               Join us in exploring the world of knowledge, one quiz at a time.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <ScrollLink
                    to="about"
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                  >
                    About Us
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="testimonials"
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                  >
                    Testimonials
                  </ScrollLink>
                </li>
                <li>
                  <RouterLink
                    to="/signup"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Join Now
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  gnosis@college.edu
                </li>
                <li>Student Activity Center</li>
                <li>Room 204, Main Campus</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/gnosis_mnnit/" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-purple-400"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                </a> 
                <a href="https://github.com/dhruvm911/Gnosis" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-purple-400"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-800/30 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Gnosis Quizzing Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
