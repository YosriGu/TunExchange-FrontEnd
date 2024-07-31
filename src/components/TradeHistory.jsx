import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaSort } from 'react-icons/fa';
import { AuthContext } from './AuthContext';
import { format } from 'date-fns';

function TradeHistory() {
  const [tradeHistory, setTradeHistory] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/tokens/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTradeHistory(response.data);
        console.log('response.data ', response.data);
      } catch (error) {
        console.error('Error fetching trade history:', error);
      }
    };

    fetchTradeHistory();
  }, [token]);

  return (
    <div className="bg-black text-white shadow-lg rounded-lg p-2 sm:p-4 md:p-6 overflow-x-auto w-full sm:w-[95%] md:w-[90%] mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 font-rajdhani text-[#00df9a]">Trade History</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">
                Timestamp <FaSort className="inline ml-1 text-[#00df9a]" />
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-sm">
                Price <FaSort className="inline ml-1 text-[#00df9a]" />
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-right text-xs sm:text-sm">
                Amount <FaSort className="inline ml-1 text-[#00df9a]" />
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-center text-xs sm:text-sm">
                Type <FaSort className="inline ml-1 text-[#00df9a]" />
              </th>
            </tr>
          </thead>
          <tbody>
            {tradeHistory.map((trade, index) => (
              <tr key={index} className={`text-xs sm:text-sm ${index % 2 === 0 ? 'bg-black' : 'bg-gray-900'} hover:bg-gray-800 transition duration-150`}>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-left border-b border-gray-800">
                  {format(new Date(trade.timestamp), 'PPpp')}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-right border-b border-gray-800">
                  {trade.price/10000} TND
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-right border-b border-gray-800">
                  {trade.quantity}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-center border-b border-gray-800 text-[#00df9a]">
                  {trade.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradeHistory;
