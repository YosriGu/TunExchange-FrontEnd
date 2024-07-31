import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import BetaAccess from '../components/BetaAccess ';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-1 justify-between items-center py-4">
          <div className="flex items-center self-start">
            <img className='w-16 h-16 rounded-full mr-2' src={logo} alt="Logo" />
            <div className="text-xl font-semibold">TunExchange</div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className="hover:text-gray-300"><FaHome className="inline mr-1" /> Home</NavLink>
            <NavLink to="/about" className="hover:text-gray-300"><FaInfoCircle className="inline mr-1" /> About</NavLink>
            <NavLink to="/contact" className="hover:text-gray-300"><FaEnvelope className="inline mr-1" /> Contact</NavLink>
            <BetaAccess />
          </div>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="focus:outline-none">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex justify-center items-center flex-col px-2 pt-2 pb-4 space-y-2">
            <NavLink to="/" className="block hover:bg-gray-700 px-3 py-2 rounded"><FaHome className="inline mr-2" /> Home</NavLink>
            <NavLink to="/about" className="block hover:bg-gray-700 px-3 py-2 rounded"><FaInfoCircle className="inline mr-2" /> About</NavLink>
            <NavLink to="/contact" className="block hover:bg-gray-700 px-3 py-2 rounded"><FaEnvelope className="inline mr-2" /> Contact</NavLink>
            <div className="px-3 py-2">
              <BetaAccess />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
