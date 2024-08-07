import React, { useState, useContext } from 'react';
import { FaLock } from 'react-icons/fa';
import Modal from './Modal';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import Logout from './Logout';
import { NavLink } from 'react-router-dom';


export function BetaAccessModal({ onClose }) {
  const [accessCode, setAccessCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!accessCode) {
      setMessage('Please enter a valid access code.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://tunexchange-backend-production.up.railway.app/v1/auth/access', {
        accessCode: accessCode
      });

      if (response.data && response.data.token) {
        login(response.data.token);
        setMessage('Access granted! Welcome to the TunExchange Beta.');
        setAccessCode('');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage('Invalid access code. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-black px-4">
      <div className="max-w-[600px] mx-auto rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#00df9a] mb-6 font-rajdhani">
          Access TunExchange Beta
        </h2>
        <p className="text-white text-center mb-6 font-rajdhani">
          Enter your beta access code to experience the future of crypto trading in Tunisia.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex items-center border-b border-[#00df9a] py-2 w-full max-w-[400px]">
            <FaLock className="text-[#00df9a] mr-3" />
            <input
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none font-rajdhani"
              type="text"
              placeholder="Enter your beta access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            className={`bg-[#00df9a] hover:bg-[#00af76] text-black font-bold py-2 px-6 rounded-full mt-6 transition duration-300 font-rajdhani ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Access Beta'}
          </button>
        </form>
        {message && (
          <p className={`text-center mt-4 ${message.includes('granted') ? 'text-green-400' : 'text-red-400'} font-rajdhani`}>
            {message}
          </p>
        )}
        <p className="text-gray-400 text-sm text-center mt-6 font-rajdhani">
          Don't have a beta access code? <NavLink to="/contact" className="text-[#00df9a] hover:underline">Request one here</NavLink>.
        </p>
      </div>
    </div>
  );
}

const BetaAccess = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(AuthContext);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  if (token) {
    return <Logout />;
  }
  return (
    <>
      <button
        className="w-[6rem] bg-[#02cc8c] text-xl font-rajdhani rounded-full hover:bg-[#71e6c1] text-white font-bold py-1 px-2"
        onClick={openModal}
      >
        Join Us
      </button>
      <Modal theme="dark" isOpen={isModalOpen} onClose={closeModal} title="Join Us !">
        <BetaAccessModal onClose={closeModal} />
      </Modal>
    </>
  );
}

export default BetaAccess;
