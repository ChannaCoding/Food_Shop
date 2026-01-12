import React from 'react'
import { useTranslation } from 'react-i18next'
import Amok from '../assets/image/benner2.png'
import 'animate.css';

const Benner = () => {
  const { t } = useTranslation();
  
  return (
    <div className='w-full min-h-[500px] lg:h-[80vh] bg-white px-6 md:px-10 lg:px-22 flex items-center font-sans'>
      <div className='max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-30'>
        
        {/* --- LEFT SIDE: IMAGE (Simple & Clean) --- */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end animate__animated animate__fadeIn">
          <div className="relative w-full max-w-[500px] overflow-hidden rounded-3xl transition-transform duration-500 hover:scale-[1.02]">
            <img
              className="w-full h-auto object-cover"
              src={Amok}
              alt="Authentic Khmer Food"
            />
          </div>
        </div>

        {/* --- RIGHT SIDE: CONTENT (Matches Groco Style) --- */}
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-6 animate__animated animate__fadeInRight">
          
          <div className="space-y-2">
            <p className="text-[#2d5a27] text-lg md:text-xl font-bold tracking-wide">
              Fresh And Organic
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a2e35] leading-[1.1]">
              Your Daily Need <br />
              <span className="text-[#2d5a27]">Khmer Products</span>
            </h1>
          </div>

          <p className="text-gray-500 text-lg md:text-xl max-w-md leading-relaxed">
            Experience the true essence of Cambodia with our authentic recipes, 
            crafted from local organic ingredients for your healthy lifestyle.
          </p>

          <div className="pt-4">
            <button className="px-10 py-3.5 bg-[#2d5a27] text-white rounded-md font-bold text-xl hover:bg-[#1a2e35] transition-all duration-300 shadow-lg active:scale-95">
              Get Started
            </button>
          </div>
          
        </div>

      </div>
    </div>
  )
}

export default Benner;