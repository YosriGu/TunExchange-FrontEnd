import React from 'react';

function Footer() {
  return (
    <footer className="bg-black py-6 mt-12">
      <div className="container mx-auto text-center text-white">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="/about" className="hover:text-[#00df9a] transition-colors duration-300">About Us</a>
          <a href="/contact" className="hover:text-[#00df9a] transition-colors duration-300">Contact Us</a>
          <a href="#" className="hover:text-[#00df9a] transition-colors duration-300">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
