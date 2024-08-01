import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import TradeButton from './TradePanel'
import OrderBook from './OrderBook'
import TradeHistory from './TradeHistory'
import Charts from './Charts'
import Footer from './Footer'
import Account from './Account'
import Typewriter from 'typewriter-effect'
import Typed from 'react-typed'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InfoCards from 'InfoCard'
import BetaFeatureButton from './BetaFeatureButton'
import About from './About'
import Contact from './Contact'

const Layout = () => (
  <div className="min-h-screen flex flex-col bg-black">
    <ToastContainer />
    <div className="flex-1 min-h-1/3 bg-black relative">
      <Navbar />
      <div className="mx-auto text-center m-8">
        <p className="text-[#00df9a] font-bold text-2xl md:text-3xl mb-12 mt- font-rajdhani">
          Welcome to TunExchange
        </p>
        <h1 className="text-white lg:mx-4 md:text-6xl font-ra sm:text-5xl text-3xl font-bold mb-10 mx-8 md:mx-2 font-rajdhani">
          The First Tunisian Crypto Exchange Platform
        </h1>
        <div className="flex flex-col gap-3 justify-center items-center m-3">
          <p className="text-white md:text-4xl sm:text-3xl text-lg font-medium pr-4 font-rajdhani">
            Fast and Secure
          </p>
          <h1 className="text-xl font-semibold mt-2 text-[#00df9a]">
            <Typewriter
              options={{
                strings: [
                  'Access Optimal Market Liquidity',
                  'Ensure Efficient and Reliable Transactions',
                  'Join Us Today!'
                ],
                cursor: '|',
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 50
              }}
            />
          </h1>
        </div>
        <p className="mx-2 md:text-xl text-md font-medium text-[#D5D5D5] my-[2rem]">
          Experience the Beta Version of Our Crypto Exchange - Test the
          Exchange with Simulated Orders.
        </p>
      </div>
      <InfoCards />
      <Charts />
    </div>
    <Account/>
    <div>
      
      <TradeHistory />
      <Footer />
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </Router>
  )
}

export default App
