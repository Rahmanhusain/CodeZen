import React from 'react';


const ContactForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/3 p-4 sm:w-3/5 md:w-2/5 lg:w-2/5 xl:w-2/5 mt-6  bg-white box-shad rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-green-800 mb-4 text-center">Contact Us</h2>
        
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 mt-2 border border-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mt-2 border border-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-3 mt-2 border border-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Your Message">
              </textarea>
          </div>

          <div className="text-center ">
            <button
              type="submit"
              className="w-full py-3 mt-4 border text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 bg-green-800 " >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;