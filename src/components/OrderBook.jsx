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
    const ws = new WebSocket('wss://tunexchange-backend-production.up.railway.app/ws');

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
    <div className="flex flex-col justify-center items-center p-2 sm:p-4 md:p-6 lg:p-10 w-full bg-black">
      <div className="bg-black shadow-lg rounded-lg p-2 sm:p-4 md:p-6 w-full lg:w-[90%] border border-[#00df9a]">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-white font-rajdhani">Order Book</h2>
        <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-6">
          <OrderTable title="Buy" orders={buyOrders} />
          <OrderTable title="Sell" orders={sellOrders} />
        </div>
        <div className='flex justify-center py-4 items-center'>
          <TradeButton/>
        </div>
      </div>
    </div>
  );
}

function OrderTable({ title, orders }) {
  return (
    <div className="w-full lg:w-1/2 bg-black border border-[#00df9a] rounded-lg p-2 sm:p-4">
      <h3 className="text-[#00df9a] font-semibold text-center text-xl sm:text-2xl mb-2 sm:mb-4 font-rajdhani">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#00df9a]">
              <th className="py-2 px-2 sm:px-4 text-white text-center text-xs sm:text-sm">Price</th>
              <th className="py-2 px-2 sm:px-4 text-white text-center text-xs sm:text-sm">Amount</th>
              <th className="py-2 px-2 sm:px-4 text-white text-center text-xs sm:text-sm">Total</th>
              <th className="py-2 px-2 sm:px-4 text-white text-center text-xs sm:text-sm">Orders</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-900 transition duration-200">
                <td className="py-1 px-2 sm:px-4 text-white text-center text-xs sm:text-sm">{order.price/10000}</td>
                <td className="py-1 px-2 sm:px-4 text-white text-center text-xs sm:text-sm">{order.amount}</td>
                <td className="py-1 px-2 sm:px-4 text-white text-center text-xs sm:text-sm">{order.total/10000}</td>
                <td className="py-1 px-2 sm:px-4 text-white text-center text-xs sm:text-sm">{order.orderCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderBook;
