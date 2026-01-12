import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { FaCalendarCheck, FaUserFriends, FaClock, FaArrowRight } from "react-icons/fa";
import { BiLeaf } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";

const Reservation = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      easing: "ease-in-out", 
      once: true 
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* --- Header Section (ស៊ីគ្នាជាមួយ About/Service) --- */}
        <div data-aos="fade-down" className="mb-20 border-l-8 border-[#2D4A22] pl-6 relative">
          <h1 className="text-4xl md:text-5xl font-black text-[#2D4A22] uppercase tracking-tighter">
            {t('reservation.title')} <span className="text-[#F58220]">Book Table</span>
          </h1>
          <p className="text-gray-500 font-medium mt-2 uppercase text-xs tracking-[0.3em]">
            {t('reservation.subtitle')}
          </p>
          <BiLeaf className="absolute -top-10 right-0 text-[#2D4A22]/5" size={200} />
        </div>

        {/* --- Reservation Form Area (No Image - Pure Minimalist) --- */}
        <div className="bg-white border border-gray-100 p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
          
          {/* លម្អដោយ Watermark Text នៅ Background */}
          <div className="absolute top-10 right-[-5%] text-[150px] font-black text-gray-50 select-none pointer-events-none italic opacity-40">
            FRESH
          </div>

          <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            
            {/* Full Name */}
            <div className="space-y-3 group" data-aos="fade-up">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2D4A22] group-focus-within:text-[#F58220] transition-colors">
                {t('reservation.fullName')}
              </label>
              <input 
                type="text" 
                placeholder={t('reservation.enterName')} 
                className="w-full bg-transparent border-b-2 border-gray-100 py-3 focus:border-[#2D4A22] outline-none transition-all font-medium text-gray-800 placeholder:text-gray-300 placeholder:font-light"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-3 group" data-aos="fade-up" data-aos-delay="100">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2D4A22] group-focus-within:text-[#F58220] transition-colors">
                {t('reservation.phoneNumber')}
              </label>
              <input 
                type="tel" 
                placeholder="012 345 678" 
                className="w-full bg-transparent border-b-2 border-gray-100 py-3 focus:border-[#2D4A22] outline-none transition-all font-medium text-gray-800 placeholder:text-gray-300"
              />
            </div>

            {/* Date */}
            <div className="space-y-3 group" data-aos="fade-up" data-aos-delay="200">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2D4A22] flex items-center gap-2">
                <FaCalendarCheck className="text-[#F58220]" size={14} /> {t('reservation.date')}
              </label>
              <input 
                type="date" 
                className="w-full bg-transparent border-b-2 border-gray-100 py-3 focus:border-[#2D4A22] outline-none transition-all font-medium text-gray-800"
              />
            </div>

            {/* Time */}
            <div className="space-y-3 group" data-aos="fade-up" data-aos-delay="300">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2D4A22] flex items-center gap-2">
                <FaClock className="text-[#F58220]" size={14} /> {t('reservation.time')}
              </label>
              <input 
                type="time" 
                className="w-full bg-transparent border-b-2 border-gray-100 py-3 focus:border-[#2D4A22] outline-none transition-all font-medium text-gray-800"
              />
            </div>

            {/* Guests */}
            <div className="space-y-3 group md:col-span-2" data-aos="fade-up" data-aos-delay="400">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2D4A22] flex items-center gap-2">
                <FaUserFriends className="text-[#F58220]" size={14} /> {t('reservation.guests')}
              </label>
              <select className="w-full bg-transparent border-b-2 border-gray-100 py-3 focus:border-[#2D4A22] outline-none transition-all font-medium text-gray-800 cursor-pointer appearance-none">
                <option>{t('reservation.onePerson')}</option>
                <option>{t('reservation.twoPeople')}</option>
                <option>{t('reservation.threePeople')}</option>
                <option>{t('reservation.fourPeople')}</option>
                <option>{t('reservation.fivePlus')}</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-3 md:col-span-2" data-aos="fade-up" data-aos-delay="500">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2D4A22]">
                {t('reservation.message')}
              </label>
              <textarea 
                rows="2" 
                placeholder={t('reservation.specialRequests')} 
                className="w-full bg-transparent border-b-2 border-gray-100 py-3 focus:border-[#2D4A22] outline-none transition-all font-medium text-gray-800 resize-none placeholder:font-light"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-10" data-aos="zoom-in">
              <button
                type="button"
                className="group flex items-center justify-center gap-4 w-full md:w-max px-16 py-5 bg-[#2D4A22] text-white font-black text-xs uppercase tracking-[0.4em] hover:bg-[#F58220] transition-all duration-500 shadow-xl"
              >
                {t('reservation.reserveNow')}
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

          </form>
        </div>

        {/* --- Help Note --- */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 border-t border-gray-100 pt-10">
          <div className="text-center md:text-left">
            <p className="text-[#2D4A22] font-black text-[10px] uppercase tracking-widest mb-1">Direct Line</p>
            <p className="text-gray-500 font-bold">+855 23 945 878</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[#2D4A22] font-black text-[10px] uppercase tracking-widest mb-1">Location</p>
            <p className="text-gray-500 font-bold">Phnom Penh, Cambodia</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[#2D4A22] font-black text-[10px] uppercase tracking-widest mb-1">Service Hours</p>
            <p className="text-gray-500 font-bold">07:00 AM - 10:00 PM</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reservation;