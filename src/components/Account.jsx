import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import BetaFeatureButton from './BetaFeatureButton';
import { AuthContext } from './AuthContext';

const Account = () => {
  const [openOrdersCount, setOpenOrdersCount] = useState(0);
  const [closedOrdersCount, setClosedOrdersCount] = useState(0);
  const [balance, setBalance] = useState('N/A');
  const [priceChange24h, setPriceChange24h] = useState('0.00');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get('https://tunexchange-backend-production.up.railway.app/v1/tokens/state', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClosedOrdersCount(response.data.filledOrdersCount);
        setOpenOrdersCount(response.data.openOrdersCount);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    const fetchBinanceData = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
        const change = parseFloat(response.data.priceChangePercent).toFixed(2);
        setPriceChange24h(change);
      } catch (error) {
        console.error('Error fetching Binance data:', error);
      }
    };

    fetchAccountData();
    fetchBinanceData();
  }, [token]);

  return (
    <div className="rounded-xl w-[90%] self-center flex flex-col bg-black py-[3rem] border border-[#00df9a]">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 mb-8">
        <h1 className="text-center text-[2rem] xl:text-[4rem] font-rajdhani text-[#00df9a]">
          Total Balance
        </h1>
        <div className="flex m-6 flex-col gap-4 md:flex-row">
          <BetaFeatureButton buttonText="Deposit" feature="Deposit" />
          <BetaFeatureButton buttonText="Withdraw" feature="Withdraw" />
        </div>
        <h1 className="text-[3rem] font-semibold font-rajdhani xl:text-[6rem] text-white">
         {balance} Dinar
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
        <InfoCard title="24h Change" value={`${priceChange24h}%`} isPositive={parseFloat(priceChange24h) >= 0} />
        <InfoCard title="Available USDT" value={Number(balance/3.3).toFixed(2)} />
        <InfoCard title="Open Orders" value={token?openOrdersCount:'N/A'} />
        <InfoCard title="Account Level" value={token?"Beta":'N/A'} />
        <InfoCard title="Trading Fee" value="0.0%" />
        <InfoCard title="Matched Orders" value={token?closedOrdersCount:'N/A'} />
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, isPositive=null }) => {
  return (
    <div className="bg-black border border-[#00df9a] rounded-lg p-4">
      <h3 className="text-[#00df9a] font-rajdhani">{title}</h3>
      <p className={`text-2xl font-bold ${isPositive ? 'text-green-500' : isPositive===null?'text-white': 'text-red-500'}`}>
        {value}
      </p>
    </div>
  );
};

export default Account;
