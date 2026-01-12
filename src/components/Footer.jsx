import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    // ប្រើពណ៌ #1a3a32 ដូច Navbar ក្នុងរូបភាព
    <footer className="bg-[#1a3a32] text-white pt-20 pb-10 font-[var(--font-khmer)]">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        
        {/* --- Top Section: Newsletter --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center pb-16 border-b border-white/10 mb-16 gap-8">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
              Join Our <span className="text-orange-500">Green</span> List
            </h2>
            <p className="text-gray-400 text-sm font-medium">Get exclusive offers and fresh recipes delivered to your inbox.</p>
          </div>
          <div className="w-full lg:w-auto flex flex-col sm:flex-row">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/5 border border-white/10 px-6 py-4 outline-none focus:bg-white/10 transition-all sm:w-80 text-sm"
            />
            {/* ប៊ូតុងពណ៌បៃតងដូចក្នុង Theme */}
            <button className="bg-[#2d5a27] hover:bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all">
              Subscribe <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* --- Main Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Logo & Brand Info - ដូរតាមរូប Navbar ដែលបងផ្ញើមក */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               {/* រូប Logo ស្លឹកឈើ ដូចក្នុងរូបភាព Navbar */}
               <div className="bg-white p-1.5 rounded-lg">
                  <div className="bg-[#2d5a27] p-1 rounded-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 7 2 12 2C17 2 22 12 22 12C22 12 17 22 12 22C7 22 2 12 2 12Z" fill="white" fillOpacity="0.2"/>
                      <path d="M12 22C12 22 14.5 15.5 12 12C9.5 8.5 12 2 12 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M2 12C2 12 12 14 12 12C12 10 22 12 22 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
               </div>
              {/* ឈ្មោះ Brand: KHMER-FRESH */}
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter text-white uppercase">
                  KHMER-<span className="text-[#4a8c44]">FRESH</span>
                </span>
                <span className="text-[8px] font-bold tracking-[0.2em] text-orange-500 uppercase">
                  Authentic Taste
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Bringing the true essence of Cambodia with our authentic recipes, crafted from local organic ingredients for your healthy lifestyle.
            </p>
            <div className="flex space-x-3 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a key={index} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#4a8c44] hover:border-[#4a8c44] transition-all duration-300 transform hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-4 border-orange-500 pl-4">Discover</h3>
            <ul className="space-y-4">
              {['Home', 'Menu', 'About Us', 'Contact', 'Service', 'Reservation'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-orange-500 text-sm font-bold uppercase tracking-widest flex items-center group transition-all">
                    <span className="w-0 group-hover:w-4 h-[2px] bg-orange-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-4 border-orange-500 pl-4">Support</h3>
            <ul className="space-y-4">
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'FAQs', 'Delivery Info'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 text-sm font-bold uppercase tracking-widest flex items-center group transition-all">
                    <span className="w-0 group-hover:w-4 h-[2px] bg-orange-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - យកតាមលេខទូរស័ព្ទក្នុង Navbar */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-4 border-orange-500 pl-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 group cursor-pointer">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-gray-400 text-sm font-medium leading-tight group-hover:text-white transition-colors">
                  123 Street, Norodom Blvd,<br />Phnom Penh, Cambodia
                </span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">+855 12 345 678</span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">info@khmer-fresh.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* --- Bottom Bar --- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
            © 2026 KHMER-FRESH. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-8 text-[10px] font-black uppercase tracking-[0.2em]">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  