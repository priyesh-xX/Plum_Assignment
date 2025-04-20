import React from 'react'
const About = () => {
    return (
      <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">About Us</h1>
  
        <div className="prose prose-invert max-w-none">
          <p>
            Welcome to Gnosis, the ultimate quiz practice platform designed for college students and quiz enthusiasts.
            Our mission is to help you enhance your knowledge, improve your quiz skills, and prepare for competitions.
          </p>
  
          <h2>Our Story</h2>
          <p>
            Gnosis was founded in 2020 by a group of passionate quiz club members who wanted to create a better way to
            practice and prepare for quizzes. What started as a small project has now grown into a comprehensive platform
            used by thousands of students across the country.
          </p>
  
          <h2>Our Team</h2>
          <p>
            Our team consists of quiz champions, developers, and educators who are dedicated to creating the best quiz
            experience for our users. We're constantly updating our question bank and adding new features to help you
            learn and grow.
          </p>
  
          <h2>Our Values</h2>
          <ul>
            <li>Knowledge is power</li>
            <li>Learning should be fun</li>
            <li>Community and collaboration</li>
            <li>Continuous improvement</li>
          </ul>
  
          <h2>Join Our Community</h2>
          <p>
            Join thousands of quiz enthusiasts on Gnosis and take your quiz skills to the next level. Whether you're
            preparing for a competition or just want to test your knowledge, we've got you covered.
          </p>
        </div>
      </div>
    )
  }
  
  export default About
  