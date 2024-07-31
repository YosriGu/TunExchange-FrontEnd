import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const About = () => {
  return (
    <div className='bg-black'>
      <Navbar />
      <div className="bg-black h-full text-white pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#00df9a] mb-10 font-rajdhani">
            About TunExchange
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-semibold mb-4 text-[#00df9a] font-rajdhani">Our Mission</h3>
              <p className="mb-6 text-xl font-rajdhani">
                TunExchange is dedicated to revolutionizing the cryptocurrency landscape in Tunisia.
                We aim to provide a secure, user-friendly, and innovative platform for Tunisians to
                trade and invest in digital assets, fostering financial inclusion and technological advancement.
              </p>

              <h3 className="text-3xl font-semibold mb-4 text-[#00df9a] font-rajdhani">Why Choose Us</h3>
              <ul className="list-disc text-xl list-inside mb-6 font-rajdhani">
                <li>Tailored for the Tunisian market</li>
                <li>Robust security measures</li>
                <li>Competitive fees</li>
                <li>User-friendly interface</li>
                <li>Dedicated customer support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-semibold mb-4 text-[#00df9a] font-rajdhani">Our Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-2xl font-rajdhani">
              Join us in shaping the future of finance in Tunisia!
            </p>
            <Link to="/" className="mt-6 inline-block bg-[#00df9a] text-xl text-black font-bold py-2 px-6 rounded-full hover:bg-[#00af76] transition duration-300 font-rajdhani">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="text-[#00df9a] text-4xl mb-2">{icon}</div>
      <h4 className="text-2xl font-semibold mb-2 font-rajdhani">{title}</h4>
      <p className="text-gray-400 text-lg font-rajdhani">{description}</p>
    </div>
  );
};

const features = [
  {
    icon: "💱",
    title: "Multi-Currency Support",
    description: "Trade a variety of cryptocurrencies and tokens."
  },
  {
    icon: "🔒",
    title: "Advanced Security",
    description: "State-of-the-art encryption and two-factor authentication."
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    description: "Access to live market data and trading charts."
  },
  {
    icon: "📱",
    title: "Mobile Trading",
    description: "Trade on-the-go with our mobile app."
  }
];

export default About;
