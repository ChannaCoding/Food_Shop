import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { FaBowlFood, FaMotorcycle, FaStar, FaHeadset } from "react-icons/fa6";
import { BiLeaf } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";

const Service = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const services = [
    {
      icon: <FaBowlFood />,
      title: t('service.freshFoods'),
      desc: t('service.freshFoodsDesc'),
      delay: "0"
    },
    {
      icon: <FaMotorcycle />,
      title: t('service.fastDelivery'),
      desc: t('service.fastDeliveryDesc'),
      delay: "150"
    },
    {
      icon: <FaStar />,
      title: t('service.topQuality'),
      desc: t('service.topQualityDesc'),
      delay: "300"
    },
    {
      icon: <FaHeadset />,
      title: t('service.support'),
      desc: t('service.supportDesc'),
      delay: "450"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        
        {/* --- Header Section (ស៊ីគ្នាជាមួយ About) --- */}
        <div data-aos="fade-down" className="mb-20 border-l-8 border-[#2D4A22] pl-6 relative">
          <h1 className="text-4xl md:text-5xl font-black text-[#2D4A22] uppercase tracking-tighter">
            {t('service.title')} <span className="text-[#F58220]">Solutions</span>
          </h1>
          <p className="text-gray-500 font-medium mt-2 uppercase text-xs tracking-[0.3em]">
            Professional • Healthy • Organic Service
          </p>
          <BiLeaf className="absolute -top-10 right-0 text-[#2D4A22]/5" size={200} />
        </div>

        {/* --- Services Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, index) => (
            <div 
              key={index}
              data-aos="fade-up" 
              data-aos-delay={item.delay}
              className="group bg-white p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#2D4A22] transition-all duration-500 text-center relative overflow-hidden"
            >
              {/* បន្ទះពណ៌លម្អនៅខាងក្រោម */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F58220] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="w-20 h-20 bg-[#F8F9F8] group-hover:bg-[#2D4A22] rounded-full flex items-center justify-center mx-auto mb-8 transition-colors duration-500">
                <span className="text-4xl text-[#2D4A22] group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </span>
              </div>

              <h3 className="text-xl font-black text-[#2D4A22] mb-4 uppercase tracking-tight group-hover:text-[#F58220] transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* លេខរៀងលម្អ (Watermark) */}
              <span className="absolute -top-2 -right-2 text-6xl font-black text-gray-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity italic">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* --- Trust Badge Section --- */}
        <div className="mt-24 py-12 border-t border-gray-100 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
             <div className="flex items-center gap-2 font-black text-[#2D4A22] uppercase tracking-widest text-xs">
                <BiLeaf size={24}/> Certified Organic
             </div>
             <div className="flex items-center gap-2 font-black text-[#2D4A22] uppercase tracking-widest text-xs">
                <FaStar size={20}/> 5-Star Service
             </div>
             <div className="flex items-center gap-2 font-black text-[#2D4A22] uppercase tracking-widest text-xs">
                <FaMotorcycle size={24}/> Real-time Tracking
             </div>
        </div>

      </div>
    </div>
  );
};

export default Service;