import React, { useState, useEffect } from 'react';
import TradeButton from './TradePanel';

function OrderBook() {
  const [buyOrders, setBuyOrders] = useState([
    { price: 0, amount: 0, total: 0, orderCount: 0 },
    { price: 0, amount: 0, total: 0, orderCount: 0 },
    { price: 0, amount: 0, total: 0, orderCount: 0 },
  ]);
  const [sellOrders, setSellOrders] = useState([
    { price: 0, amount: 0, total: 0, orderCount: 0 },
    { price: 0, amount: 0, total: 0, orderCount: 0 },
    { price: 0, amount: 0, total: 0, orderCount: 0 },
  ]);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.1.218:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.symbol === 'GDC') {
        updateOrders(data.bids, data.asks);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      ws.close();
    };
  }, []);

  const updateOrders = (bids, asks) => {
    setBuyOrders(prevOrders => {
      const newOrders = bids.map(bid => ({
        price: bid.price,
        amount: bid.size,
        total: bid.price * bid.size,
        orderCount: bid.order_count
      }));
      return [...newOrders, ...prevOrders.slice(newOrders.length)].slice(0, 3);
    });

    setSellOrders(prevOrders => {
      const newOrders = asks.map(ask => ({
        price: ask.price,
        amount: ask.size,
        total: ask.price * ask.size,
        orderCount: ask.order_count
      }));
      return [...newOrders, ...prevOrders.slice(newOrders.length)].slice(0, 3);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-10 w-full bg-black">
      <div className="bg-black shadow-lg rounded-lg p-4 sm:p-6 w-full sm:w-[90%] border border-[#00df9a]">
        <h2 className="text-3xl font-bold mb-6 text-center text-white font-rajdhani">Order Book</h2>
        <div className="flex flex-col sm:flex-row justify-between space-y-6 sm:space-y-0 sm:space-x-6">
          <div className="w-full sm:w-1/2 bg-black border border-[#00df9a] rounded-lg p-4">
            <h3 className="text-[#00df9a] font-semibold text-center text-2xl mb-4 font-rajdhani">Buy</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00df9a]">
                  <th className="py-2 px-4 text-white text-center">Price</th>
                  <th className="py-2 px-4 text-white text-center">Amount</th>
                  <th className="py-2 px-4 text-white text-center">Total</th>
                  <th className="py-2 px-4 text-white text-center">Orders</th>
                </tr>
              </thead>
              <tbody>
                {buyOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-900 transition duration-200">
                    <td className="py-1 px-4 text-white text-center">{order.price}</td>
                    <td className="py-1 px-4 text-white text-center">{order.amount}</td>
                    <td className="py-1 px-4 text-white text-center">{order.total}</td>
                    <td className="py-1 px-4 text-white text-center">{order.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full sm:w-1/2 bg-black border border-[#00df9a] rounded-lg p-4">
            <h3 className="text-[#00df9a] font-semibold text-center text-2xl mb-4 font-rajdhani">Sell</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00df9a]">
                  <th className="py-2 text-white px-4 text-center">Price</th>
                  <th className="py-2 text-white px-4 text-center">Amount</th>
                  <th className="py-2 text-white px-4 text-center">Total</th>
                  <th className="py-2 text-white px-4 text-center">Orders</th>
                </tr>
              </thead>
              <tbody>
                {sellOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-900 transition duration-200">
                    <td className="py-1 text-white px-4 text-center">{order.price}</td>
                    <td className="py-1 text-white px-4 text-center">{order.amount}</td>
                    <td className="py-1 text-white px-4 text-center">{order.total}</td>
                    <td className="py-1 text-white px-4 text-center">{order.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='flex justify-center py-4 items-center'>
          <TradeButton/>
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
