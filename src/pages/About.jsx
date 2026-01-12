import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaUtensils, FaHeart, FaFacebook, FaInstagram, FaLinkedin, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';
import { BiLeaf } from 'react-icons/bi';

// រក្សារូបភាពក្រុមការងារ
import senngImage from '../assets/image/sengsarina.jpg';
import vizaImage from '../assets/image/viza.jpg';
import channaImage from '../assets/image/channa.jpg';

import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // រក្សាទិន្នន័យក្រុមការងារ (keep all old data)
  const teamMembers = [
    { name: "CHANNA", role: "General Manager", image: channaImage, delay: "0" },
    { name: "Sarina", role: t('about.headChef'), image: senngImage, delay: "200" },
    { name: "VIZA", role: t('about.pastryChef'), image: vizaImage, delay: "400" }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        
        {/* --- Header Section (Old Data + New Style) --- */}
        <div data-aos="fade-down" className="mb-16 border-l-8 border-[#2D4A22] pl-6">
          <h1 className="text-4xl md:text-5xl font-black text-[#2D4A22] uppercase tracking-tighter">
            {t('about.title')} <span className="text-[#F58220]">History</span>
          </h1>
          <p className="text-gray-500 font-medium mt-2 uppercase text-xs tracking-[0.3em]">
            {t('about.subtitle')}
          </p>
        </div>

        {/* --- Section: Story (Typography Style - NO IMAGE) --- */}
        <div className="relative py-20 mb-28 border-y border-gray-100 overflow-hidden">
          <BiLeaf className="absolute -top-10 -right-10 text-[#2D4A22]/5" size={400} />
          
          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Side: Bold Text Heading */}
            <div className="lg:col-span-5" data-aos="fade-right">
              <span className="text-[#F58220] font-black text-sm uppercase tracking-[0.4em] mb-4 block">Since 2018</span>
              <h2 className="text-6xl md:text-7xl font-black text-[#2D4A22] uppercase leading-[0.9] tracking-tighter">
                {t('about.ourStory').split(' ')[0]} <br />
                <span className="text-gray-200 outline-text italic">Journey</span> <br />
                Story.
              </h2>
            </div>

            {/* Right Side: Narrative Content (Old Data) */}
            <div className="lg:col-span-7 space-y-8" data-aos="fade-left">
              <div className="relative">
                <FaQuoteLeft className="text-[#F58220] opacity-20 absolute -top-6 -left-8" size={60} />
                <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight italic">
                  {t('about.storyPara1')}
                </p>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <p className="text-gray-500 text-lg leading-relaxed">
                  {t('about.storyPara2')}
                </p>
              </div>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .outline-text {
              -webkit-text-stroke: 1px #2D4A22;
              color: transparent;
            }
          `}} />
        </div>

        {/* --- Values Section (Old Icons + Data) --- */}
        <div className="grid md:grid-cols-3 gap-8 mb-28">
          <div data-aos="zoom-in" className="bg-white p-10 border border-gray-50 text-center hover:shadow-2xl transition-all duration-500 group">
            <div className="w-16 h-16 bg-[#2D4A22] group-hover:bg-[#F58220] rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-500">
              <FaHeart className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-black text-[#2D4A22] mb-3 uppercase tracking-tight">{t('about.authenticRecipes')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{t('about.authenticRecipesDesc')}</p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="200" className="bg-white p-10 border border-gray-50 text-center hover:shadow-2xl transition-all duration-500 group">
            <div className="w-16 h-16 bg-[#2D4A22] group-hover:bg-[#F58220] rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-500">
              <FaUtensils className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-black text-[#2D4A22] mb-3 uppercase tracking-tight">{t('about.freshIngredients')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{t('about.freshIngredientsDesc')}</p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="400" className="bg-white p-10 border border-gray-50 text-center hover:shadow-2xl transition-all duration-500 group">
            <div className="w-16 h-16 bg-[#2D4A22] group-hover:bg-[#F58220] rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-500">
              <MdDeliveryDining className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-black text-[#2D4A22] mb-3 uppercase tracking-tight">{t('about.fastDelivery')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{t('about.fastDeliveryDesc')}</p>
          </div>
        </div>

        {/* --- Team Section (3 Column Layout) --- */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <h2 data-aos="fade-up" className="text-4xl font-black text-[#2D4A22] uppercase tracking-tighter">
              {t('about.meetOurTeam')}
            </h2>
            <div className="w-20 h-1 bg-[#F58220] mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={member.delay} className="group relative overflow-hidden bg-white">
                <div className="h-[500px] overflow-hidden">
                  <img src={member.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A22] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                  <h3 className="text-2xl font-black uppercase italic">{member.name}</h3>
                  <p className="text-[#F58220] text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                  <div className="flex gap-4">
                    <FaFacebook className="hover:text-[#F58220] cursor-pointer" />
                    <FaInstagram className="hover:text-[#F58220] cursor-pointer" />
                    <FaLinkedin className="hover:text-[#F58220] cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Stats Section (Old Data + Minimal Style) --- */}
        <div data-aos="zoom-in" className="bg-[#2D4A22] py-20 px-10 text-white rounded-3xl mb-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-5xl font-black text-[#F58220] mb-2 italic">5+</div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">{t('about.yearsOfService')}</p>
            </div>
            <div>
              <div className="text-5xl font-black text-[#F58220] mb-2 italic">50+</div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">{t('about.menuItems')}</p>
            </div>
            <div>
              <div className="text-5xl font-black text-[#F58220] mb-2 italic">10K+</div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">{t('about.happyCustomers')}</p>
            </div>
            <div>
              <div className="text-5xl font-black text-[#F58220] mb-2 italic">4.9</div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">{t('about.averageRating')}</p>
            </div>
          </div>
        </div>

        {/* --- Call to Action (Old Data + New Button) --- */}
        <div data-aos="fade-up" className="text-center py-20 border-[15px] border-gray-50 bg-white">
          <h2 className="text-5xl font-black text-[#2D4A22] mb-6 uppercase tracking-tighter leading-none">
            {t('about.ctaTitle')}
          </h2>
          <p className="text-gray-400 mb-12 text-lg max-w-2xl mx-auto italic">
            {t('about.ctaSubtitle')}
          </p>
          <Link
            to="/MenuFood"
            className="inline-flex items-center gap-4 px-12 py-5 bg-[#2D4A22] text-white font-black text-xs uppercase tracking-[0.4em] hover:bg-[#F58220] transition-all duration-300 shadow-2xl group"
          >
            {t('about.browseMenu')} <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;