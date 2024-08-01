import React, { useState,useContext } from 'react';
import axios from 'axios';
import Modal from './Modal';
import BetaAccess, { BetaAccessModal } from './BetaAccess ';
import { AuthContext } from './AuthContext';
import { SiTether } from 'react-icons/si';  // Import the USDT icon


axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (error.response.data.message === 'Invalid token') {
            console.error('Invalid token');
          } else if (error.response.data.message === 'Please authenticate') {
            console.error('Authentication required');
          }
          break;
        case 403:
          if (error.response.data.message === 'Access code usage limit reached') {
            console.error('Access code usage limit reached');
          }
          break;
      }
    }
    return Promise.reject(error);
  }
);


function TradePanel() {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [orderType, setOrderType] = useState('buy');
  const [stopPrice, setStopPrice] = useState('');
  const [error, setError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // New state for loading


  const handleCryptoSelection = (crypto) => {
    setSelectedCrypto(crypto);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!amount || !price || !selectedCrypto || !stopPrice) {
      setError('Please fill out all fields and select a cryptocurrency.');
      return;
    }
    setError('');
    setGlobalError('');
    setIsLoading(true);  // Set loading to true when submitting

    try {

      const response = await axios.post('https://tunexchange-backend-production.up.railway.app/v1/trade/order', {
        is_buy_order: orderType === 'buy',
        symbol: selectedCrypto,
        quantity: parseInt(amount),
        price: parseInt(parseFloat(price)*100),
        stop_price: parseInt(parseFloat(price)*100),
      });
      console.log('Order placed successfully:', response.data);
      setAmount('');
      setPrice('');
      setSelectedCrypto(null);
      setStopPrice('');
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            if (error.response.data.message === 'Invalid token') {
              setGlobalError('Your session has expired. Please log in again.');
            } else if (error.response.data.message === 'Please authenticate') {
              setGlobalError('Authentication required. Please log in to place an order.');
            }
            break;
          case 403:
            if (error.response.data.message === 'Access code usage limit reached') {
              setGlobalError('Thank you for your interest in our platform! You\'ve reached the current usage limit for beta testers. We appreciate your participation and look forward to welcoming you to our official release soon. Stay tuned for updates!');
            }
            break;
          case 400:
            if (error.response.data.message === 'Insufficient balance to create order') {
              setGlobalError('Insufficient balance to create order');
            }
            break;
          default:
            setError('Error placing order. Please try again.');
        }
      } else {
        setError('Error placing order. Please try again.');
      }
    }finally {
      setIsLoading(false);  // Set loading back to false when done
    }
  };

  const cryptoIcons = [
    { name: 'GDC', icon:<SiTether size={26} color='#00df9a' /> },
  ];



  return (
    <div className="rounded-lg shadow-md mx-4 p-6 backdrop-filter backdrop-blur-md h-full">
      {globalError && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">

          <span className="block sm:inline text-lg">{globalError}</span>
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4">
          <label htmlFor="amount" className="w-1/3 text-white">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-2/3 border-gray-700 rounded-md px-3 py-2 bg-gray-800 text-white focus:outline-none focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="price" className="w-1/3 text-white">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-2/3 border-gray-700 rounded-md px-3 py-2 bg-gray-800 text-white focus:outline-none focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="stopPrice" className="w-1/3 text-white">Stop Price:</label>
          <input
            type="number"
            id="stopPrice"
            name="stopPrice"
            placeholder="Enter stop price"
            value={stopPrice}
            onChange={(e) => setStopPrice(e.target.value)}
            className="w-2/3 border-gray-700 rounded-md px-3 py-2 bg-gray-800 text-white focus:outline-none focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-white">Select Cryptocurrency:</label>
          <div className="flex space-x-2">
            {cryptoIcons.map((crypto, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleCryptoSelection(crypto.name)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                  selectedCrypto === crypto.name ? 'border-green-400' : 'border-gray-700'
                } hover:border-green-400 focus:outline-none focus:border-green-400`}
              >
                <span className="text-white">{crypto.icon}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/3 text-white">Order Type:</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                orderType === 'buy' ? 'bg-green-400 text-white' : 'bg-gray-700 text-gray-300'
              } hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50`}
              onClick={() => setOrderType('buy')}
            >
              Buy
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                orderType === 'sell' ? 'bg-red-400 text-white' : 'bg-gray-700 text-gray-300'
              } hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50`}
              onClick={() => setOrderType('sell')}
            >
              Sell
            </button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end">
        <button
            type="submit"
            className={`bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Place ${orderType === 'buy' ? 'Buy' : 'Sell'} Order`
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const TradeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(AuthContext);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="w-[15rem] text-2xl mt-8 font-rajdhani hover:bg-[#71e6c1] bg-[#00df9a] font-semibold py-3 px-3 rounded-full transition duration-300"
      >
        Make a Trade
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Make a Trade"
        theme="dark"
      >
        {token ?<TradePanel />:<BetaAccessModal/>}
      </Modal>
    </div>
  );
};

export default TradeButton;
