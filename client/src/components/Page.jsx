"use client"

import { Users, Trophy, Crown, ArrowRight, Github, Mail, Award, Star, Target, Instagram, Eye } from "lucide-react"
import { User } from "lucide-react"
import LocomotiveScroll from "locomotive-scroll"
import "locomotive-scroll/dist/locomotive-scroll.css"
import { useRef } from "react"
import { useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Link } from "react-router-dom"

export default function LandingPage() {
  const scrollRef = useRef(null)
  const locomotiveScrollRef = useRef(null)

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1.0,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    })

    locomotiveScrollRef.current = scroll

    return () => {
      if (scroll) scroll.destroy()
    }
  }, [])

  const scrollToSection = (target) => {
    if (locomotiveScrollRef.current) {
      const element = document.querySelector(`[data-scroll-id="${target}"]`)
      if (element) {
        locomotiveScrollRef.current.scrollTo(element, {
          offset: -80, // Account for fixed navbar
          duration: 1000,
        })
      }
    }
  }

  const scrollToTop = () => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(0, {
        duration: 600,
      })
    }
  }

  const testimonials = [
    {
      name: "Naman Verma",
      role: "Former Club President, 2024",
      content:
        "Gnosis taught me that knowledge isn't just about facts—it's about connecting dots across disciplines. The thrill of a perfectly crafted question is unmatched.",
      image: null,
    },
    {
      name: "Ishaan Sharma",
      role: "Quiz Master, 2021-23",
      content:
        "The community at Gnosis is incredible. Every session challenges you to think beyond textbooks and explore the fascinating connections in our world.",
      image: null,
    },
    {
      name: "Piyush Patel",
      role: "Former Club President, 2023",
      content:
        "Being part of Gnosis means being part of a legacy. We don't just ask questions—we inspire curiosity and celebrate the joy of learning.",
      image: null,
    },
  ]

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="min-h-screen overflow-hidden bg-gradient-to-l from-purple-900 to-gray-900"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-purple-700/40 bg-gradient-to-l from-purple-900/90 via-red-950/80 to-gray-900/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div onClick={scrollToTop} className="flex items-center space-x-2 cursor-pointer">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 object-cover scale-150 translate-y-1.5"
              />
              <span className="text-2xl font-bold text-white">Gnosis</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("about")}
                className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors"
              >
                Contact Us
              </button>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-purple-400">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section data-scroll-section className="h-screen flex items-center justify-center px-4">
        <div className="w-full h-full flex items-center justify-center">
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Welcome To <span className="text-purple-400">Gnosis</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Where curiosity meets competition. Join our community of knowledge seekers, quiz enthusiasts, and
              intellectual explorers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  Join Gnosis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        data-scroll-section
        data-scroll-id="about"
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-l from-purple-900 via-red-950 to-gray-900"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Why Choose Gnosis?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-purple-800/30">
              <CardContent className="p-6 text-center">
                <Eye className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Intellectual Growth</h3>
                <p className="text-gray-400">
                  Challenge your mind with diverse topics spanning science, arts, history, and beyond.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-purple-800/30">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Community</h3>
                <p className="text-gray-400">
                  Connect with like-minded individuals who share your passion for knowledge and learning.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-purple-800/30">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Competition</h3>
                <p className="text-gray-400">
                  Test your skills in exciting quiz competitions and climb the leaderboards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        data-scroll-section
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-l from-purple-900 via-red-950 to-gray-900"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Our Achievements</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-l from-purple-900/40 via-red-900/30 to-purple-800/20 border-purple-700/40 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <Trophy className="h-16 w-16 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-center text-white mb-4">Spring Fest IIT-KGP 2024</h3>
                <p className="text-center text-gray-300 text-lg mb-6">
                  Gnosis made history by securing <span className="text-yellow-400 font-bold">3 podium finishes</span>{" "}
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
                  <h4 className="text-lg font-semibold text-white mb-2">50+ Quizzes Conducted per year</h4>
                  <p className="text-gray-400">Flagship events include Quiz-League, Antardwand and Inquisition</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700/30">
                <CardContent className="p-6 text-center">
                  <Target className="h-10 w-10 text-red-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">75% Win Rate</h4>
                  <p className="text-gray-400">Consistent performance in inter-college competitions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hall of Fame Section */}
      <section data-scroll-section className="py-16 px-4 bg-gradient-to-l from-purple-900 via-red-950 to-gray-900">
        <div className="container mx-auto">
          <div className="flex justify-center mb-6">
            <Crown className="h-16 w-16 text-yellow-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Gnosis Hall of Fame</h2>
          <p className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
            Celebrating the legendary teams that have brought glory to Gnosis and made their mark in the quizzing world
          </p>
          {/* First Row (3 Cards) */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            <Card className="bg-gradient-to-br from-purple-900/30 to-red-900/20 border-purple-700/40">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Death Spiral</h3>
                <p className="text-gray-300 text-sm">
                  Masters of rapid-fire rounds and known for their lightning-fast buzzer skills
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-900/30 to-red-900/20 border-purple-700/40">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Alpha Q</h3>
                <p className="text-gray-300 text-sm">The strategic masterminds who revolutionized team quiz dynamics</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-900/30 to-red-900/20 border-purple-700/40">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pionel Pepsi</h3>
                <p className="text-gray-300 text-sm">
                  Pioneers in creative thinking and unconventional problem-solving approaches
                </p>
              </CardContent>
            </Card>
          </div>
          {/* Second Row (2 Cards, Centered) */}
          <div className="flex flex-wrap justify-center gap-8">
            <Card className="bg-gradient-to-br from-purple-900/30 to-red-900/20 border-purple-700/40 w-full sm:w-[300px]">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AVN</h3>
                <p className="text-gray-300 text-sm">
                  A fearless trio with a knack for cracking the toughest trivia under pressure
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-900/30 to-red-900/20 border-purple-700/40 w-full sm:w-[300px]">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Three Leaf Clover</h3>
                <p className="text-gray-300 text-sm">
                  The luckiest team of all — blending charm, wit, and quick thinking
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        data-scroll-section
        data-scroll-id="testimonials"
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-l from-purple-900 via-red-950 to-gray-900"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">What Our Seniors Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-purple-800/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                        <User className="text-white w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
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
      <section data-scroll-section className="py-16 px-4 bg-gradient-to-l from-purple-900 via-red-950 to-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Expand Your Mind?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Gnosis today and become part of a community that celebrates knowledge, curiosity, and the joy of
            learning.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        data-scroll-section
        data-scroll-id="contact"
        className="border-t border-purple-800/30 py-12 px-4 bg-gradient-to-l from-purple-900 via-red-950 to-gray-900"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-10 h-10 object-cover scale-100 translate-y-1"
                />
                <span className="text-xl font-bold text-white">Gnosis</span>
              </div>
              <p className="text-gray-400">Join us in exploring the world of knowledge, one quiz at a time.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-purple-400 transition-colors">
                    Join Now
                  </Link>
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
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-purple-400">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </a>
                <a href="https://github.com/dhruvm911/Gnosis" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-purple-400">
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
  )
}
