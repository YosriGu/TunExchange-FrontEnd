import React from 'react';
import { FaChartLine, FaLock, FaExchangeAlt } from 'react-icons/fa';

function InfoCards() {
  const cards = [
    {
      icon: <FaChartLine className="text-[#00df9a] text-4xl mb-4" />,
      title: 'Real-Time Analytics',
      description: 'Stay updated with live market trends and data.',
    },
    {
      icon: <FaLock className="text-[#00df9a] text-4xl mb-4" />,
      title: 'Secure Transactions',
      description: 'Your assets are protected with advanced encryption.',
    },
    {
      icon: <FaExchangeAlt className="text-[#00df9a] text-4xl mb-4" />,
      title: 'Easy Trading',
      description: 'Intuitive interface for seamless cryptocurrency exchange.',
    },
  ];

  return (
    <div className="w-full bg-black py-16 px-4">
      <div className="max-w-[90%] mx-auto grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div key={index} className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-black border border-[#00df9a]">
            <div className="text-center">
              <div className='w-full flex justify-center'>{card.icon}</div>
              <h2 className="text-2xl font-bold text-white py-2 font-rajdhani">{card.title}</h2>
              <p className="text-white text-center py-4 font-rajdhani">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoCards;
