import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaSort } from 'react-icons/fa';
import { AuthContext } from './AuthContext';

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
        console.log('response.data ',response.data )
      } catch (error) {
        console.error('Error fetching trade history:', error);
      }
    };

    fetchTradeHistory();
  }, [token]);

  return (
    <div className="bg-black text-white shadow-lg rounded-lg p-6 overflow-x-auto w-[90%] mx-auto">
      <h2 className="text-4xl font-bold mb-6 font-rajdhani text-[#00df9a]">Trade History</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="py-3 px-4 text-left">
              Timestamp <FaSort className="inline ml-1 text-[#00df9a]" />
            </th>
            <th className="py-3 px-4 text-right">
              Price <FaSort className="inline ml-1 text-[#00df9a]" />
            </th>
            <th className="py-3 px-4 text-right">
              Amount <FaSort className="inline ml-1 text-[#00df9a]" />
            </th>
            <th className="py-3 px-4 text-center">
              Type <FaSort className="inline ml-1 text-[#00df9a]" />
            </th>
          </tr>
        </thead>
        <tbody>
          {tradeHistory.map((trade, index) => (
            <tr key={index} className={`text-sm ${index % 2 === 0 ? 'bg-black' : 'bg-gray-900'} hover:bg-gray-800 transition duration-150`}>
              <td className="py-3 px-4 text-left border-b border-gray-800">{trade.timestamp}</td>
              <td className="py-3 px-4 text-right border-b border-gray-800">{trade.price} TND</td>
              <td className="py-3 px-4 text-right border-b border-gray-800">{trade.quantity}</td>
              <td className="py-3 px-4 text-center border-b border-gray-800 text-[#00df9a]">
                {trade.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeHistory;
