import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import BetaFeatureButton from './BetaFeatureButton';
import { AuthContext } from './AuthContext'; // Import AuthContext for token

const Account = () => {
  const [openOrdersCount, setOpenOrdersCount] = useState(0);
  const [closedOrdersCount, setClosedOrdersCount] = useState(0);
  const [Balance, setBalance] = useState('N/A');
  const { token } = useContext(AuthContext); // Use context to get token

  useEffect(() => {
    const fetchOpenOrdersCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/tokens/state', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClosedOrdersCount(response.data.filledOrdersCount);
        setOpenOrdersCount(response.data.openOrdersCount);
        setBalance(response.data.balance)
      } catch (error) {
        console.error('Error fetching open orders count:', error);
      }
    };

    fetchOpenOrdersCount();
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
         {Balance} Dinar
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
        <InfoCard title="24h Change" value="+5.23%" isPositive={true} />
        <InfoCard title="Available USDT" value={Number(Balance/3.3).toFixed(2)} />
        <InfoCard title="Open Orders" value={openOrdersCount} />
        <InfoCard title="Account Level" value="Beta" />
        <InfoCard title="Trading Fee" value="0.0%" />
        <InfoCard title="Matched Orders" value={closedOrdersCount} />
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, isPositive }) => {
  return (
    <div className="bg-black border border-[#00df9a] rounded-lg p-4">
      <h3 className="text-[#00df9a] font-rajdhani">{title}</h3>
      <p className={`text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-white'}`}>
        {value}
      </p>
    </div>
  );
};

export default Account;
