import React from "react";

const About = () => {
  return (
    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-purple-800/40 shadow-xl text-gray-200 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-purple-300 mb-8 text-center">
        About Gnosis
      </h1>

      <section className="mb-6">
        <p className="text-lg leading-relaxed">
          Welcome to <span className="text-purple-400 font-semibold">Gnosis</span>, the ultimate quiz practice platform
          for college students and quiz enthusiasts. Our mission is to help you enhance your knowledge, improve your quiz skills,
          and prepare for competitions in a fun and effective way.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">Our Story</h2>
        <p className="leading-relaxed">
          Gnosis was founded in 2002 by a group of passionate quiz club members who wanted to create a better way to
          practice and prepare for quizzes. What started as a small project has now grown into a comprehensive platform
          used by thousands of students across the country.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">Our Team</h2>
        <p className="leading-relaxed">
          Our team consists of quiz champions, developers, and educators who are dedicated to creating the best quiz
          experience for our users. We're constantly updating our question bank and adding new features to help you
          learn and grow.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">Our Values</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          <li>Knowledge is power</li>
          <li>Learning should be fun</li>
          <li>Community and collaboration</li>
          <li>Continuous improvement</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-purple-400 mb-2">Join Our Community</h2>
        <p className="leading-relaxed">
          Join thousands of quiz enthusiasts on Gnosis and take your quiz skills to the next level. Whether you're
          preparing for a competition or just want to test your knowledge, we've got you covered.
        </p>
      </section>
    </div>
  );
};

export default About;
