const Contact = () => {
    return (
      <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4 text-gray-300">
              Have questions, feedback, or need support? We'd love to hear from you! Fill out the form and we'll get back
              to you as soon as possible.
            </p>
  
            <div className="space-y-4 mt-8">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="text-gray-300">support@gnosisquizmaster.com</p>
                </div>
              </div>
  
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-white">Location</h3>
                  <p className="text-gray-300">123 Quiz Street, Knowledge City</p>
                </div>
              </div>
  
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-purple-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-white">Office Hours</h3>
                  <p className="text-gray-300">Monday - Friday: 9AM - 5PM</p>
                </div>
              </div>
            </div>
          </div>
  
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-900/70 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Your name"
                />
              </div>
  
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-900/70 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="your.email@example.com"
                />
              </div>
  
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-900/70 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="How can we help?"
                />
              </div>
  
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-900/70 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Your message..."
                ></textarea>
              </div>
  
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  
  export default Contact
  