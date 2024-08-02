import React, { useState } from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import Footer from './Footer';
import Navbar from './Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='bg-black min-h-screen '>
      <Navbar/>
      <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#00df9a] mb-8 font-rajdhani">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#00df9a] font-rajdhani">Get in Touch</h3>
              <p className="mb-6 font-rajdhani">
                We're here to help and answer any question you might have. We look forward to hearing from you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 font-rajdhani">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00df9a] focus:border-[#00df9a] font-rajdhani"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 font-rajdhani">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00df9a] focus:border-[#00df9a] font-rajdhani"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 font-rajdhani">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00df9a] focus:border-[#00df9a] font-rajdhani"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#00df9a] text-black font-bold py-2 px-4 rounded-md hover:bg-[#00af76] transition duration-300 font-rajdhani"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#00df9a] font-rajdhani">Contact Information</h3>
              <div className="space-y-4">
                <ContactInfo icon={<FaEnvelope />} text="info@tunexchange.co" />
                <ContactInfo icon={<FaTiktok />} text="https://www.tiktok.com/@tunexchange" />
              </div>


            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

const ContactInfo = ({ icon, text }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="text-[#00df9a] text-xl">{icon}</div>
      <p className="font-rajdhani">{text}</p>
    </div>
  );
};

export default Contact;
