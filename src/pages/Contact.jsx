import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTiktok, FaArrowRight } from "react-icons/fa";
import { BiLeaf } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* --- Header Section (អក្សរទំហំស្តង់ដារ ស្អាត) --- */}
        <div data-aos="fade-down" className="mb-16 border-l-4 border-[#2D4A22] pl-6 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D4A22] uppercase tracking-tight">
            {t('contact.title')} <span className="text-[#F58220] font-light">/ Contact</span>
          </h1>
          <p className="text-gray-400 font-medium mt-2 text-sm tracking-widest uppercase">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* --- ផ្នែកព័ត៌មានទំនាក់ទំនង (អក្សរតូចល្មម ងាយអាន) --- */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Phone */}
            <div data-aos="fade-right" className="space-y-1">
              <p className="text-[#F58220] font-bold text-[10px] uppercase tracking-widest">{t('contact.phone')}</p>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#2D4A22] text-sm" />
                <p className="text-[#2D4A22] font-semibold text-lg italic">012 345 678 / 098 765 432</p>
              </div>
            </div>

            {/* Email */}
            <div data-aos="fade-right" data-aos-delay="100" className="space-y-1">
              <p className="text-[#F58220] font-bold text-[10px] uppercase tracking-widest">{t('contact.email')}</p>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#2D4A22] text-sm" />
                <p className="text-[#2D4A22] font-semibold text-lg">support@khmerfresh.com</p>
              </div>
            </div>

            {/* Address */}
            <div data-aos="fade-right" data-aos-delay="200" className="space-y-1">
              <p className="text-[#F58220] font-bold text-[10px] uppercase tracking-widest">{t('contact.address')}</p>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#2D4A22] text-sm mt-1" />
                <p className="text-[#2D4A22] font-semibold text-lg leading-snug">
                  #123 Phnom Penh, Cambodia
                </p>
              </div>
            </div>

            {/* Social Media (Icon តូចល្មម) */}
            <div data-aos="zoom-in" data-aos-delay="300" className="pt-4 flex gap-6">
              <FaFacebook className="text-[#2D4A22] text-2xl cursor-pointer hover:text-[#F58220] transition-colors" />
              <FaInstagram className="text-[#2D4A22] text-2xl cursor-pointer hover:text-[#F58220] transition-colors" />
              <FaTiktok className="text-[#2D4A22] text-2xl cursor-pointer hover:text-[#F58220] transition-colors" />
            </div>
          </div>

          {/* --- ផ្នែក Contact Form (ស្ទីល Modern & Thin) --- */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-lg">
            <form className="space-y-8">
              {/* Full Name */}
              <div className="space-y-2 group">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 group-focus-within:text-[#2D4A22] transition-colors">
                  {t('contact.fullName')}
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-[#2D4A22] outline-none transition-all font-medium text-base text-gray-700 placeholder:text-gray-300 placeholder:font-light"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2 group">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 group-focus-within:text-[#2D4A22] transition-colors">
                  {t('contact.emailAddress')}
                </label>
                <input
                  type="email"
                  placeholder="Email@example.com"
                  className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-[#2D4A22] outline-none transition-all font-medium text-base text-gray-700 placeholder:text-gray-300 placeholder:font-light"
                />
              </div>

              {/* Message */}
              <div className="space-y-2 group">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 group-focus-within:text-[#2D4A22] transition-colors">
                  {t('contact.yourMessage')}
                </label>
                <textarea
                  rows="3"
                  placeholder="Write your message..."
                  className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-[#2D4A22] outline-none transition-all font-medium text-base text-gray-700 resize-none placeholder:text-gray-300 placeholder:font-light"
                ></textarea>
              </div>

              {/* Submit Button (តូចល្មម ស្អាត) */}
              <div className="pt-4">
                <button
                  type="button"
                  className="flex items-center gap-3 px-10 py-3 bg-[#2D4A22] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#F58220] transition-all duration-300 shadow-lg rounded-full"
                >
                  {t('contact.sendMessage')}
                  <FaArrowRight size={12} />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* --- Footer Simple --- */}
        <div data-aos="fade-up" className="mt-20 pt-8 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">
             <span>Khmer-Fresh Organic Store</span>
             <BiLeaf size={20} className="opacity-20"/>
             <span>Established 2018</span>
        </div>

      </div>
    </div>
  );
};

export default Contact;