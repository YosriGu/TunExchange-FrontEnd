import React from 'react'
import { AdvancedChart, SymbolInfo } from 'react-tradingview-embed'

const Charts = () => {
  return (
    <div className="mb-24 flex flex-1 items-center justify-center md:mb-20 ">
      <div className="w-[90%] ">
        <AdvancedChart
          widgetProps={{
            symbol: 'BINANCE:BTCUSDT', // Example real-time symbol (Bitcoin/USDT on Binance)
            interval: '1', // 1 minute interval (for real-time updates)
            theme: 'dark',
            details: true // Enable symbol information
          }}
        />
      </div>
    </div>
  )
}

export default Charts
