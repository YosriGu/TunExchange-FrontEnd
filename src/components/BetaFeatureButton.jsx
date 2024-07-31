import React, { useState } from 'react';
import Modal from './Modal'; // Assuming this is the path to your Modal component

const BetaFeatureButton = ({ buttonText, feature }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className={buttonText==="Withdraw"?"w-[10rem] bg-black hover:bg-gray-900 text-[#00df9a] font-semibold py-2 px-4 rounded-full border border-[#00df9a] hover:text-white transition duration-300":"w-[10rem] bg-[#00df9a] hover:bg-[#00af76] text-black font-semibold py-2 px-4 rounded-full transition duration-300"}
      >
        {buttonText}
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${feature} Coming Soon`}
        theme="dark"
      >
        <BetaFeatureMessage feature={feature} />
      </Modal>
    </>
  );
};

const BetaFeatureMessage = ({ feature }) => {
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold text-[#00df9a] mb-4 font-rajdhani">
        {feature} Feature
      </h2>
      <p className="text-white mb-6 font-rajdhani">
        The {feature.toLowerCase()} feature is not available during the beta phase. It will be fully operational when TunExchange launches officially.
      </p>
      <p className="text-[#00df9a] font-semibold font-rajdhani">
        Thank you for your patience and for being a part of our beta testing!
      </p>
    </div>
  );
};

export default BetaFeatureButton;

