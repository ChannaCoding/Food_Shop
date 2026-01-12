import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { menu } from '../data';
import { 
  IoSearch, IoCloseSharp, IoHomeOutline, 
  IoFastFoodOutline, IoInformationCircleOutline, IoCallOutline 
} from "react-icons/io5";
import { 
  FaRegHeart, FaRegUser, FaBars, FaLeaf, 
  FaSignOutAlt, FaChevronRight 
} from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  // --- Logic ជំនួយ ---
  const isActive = (path) => {
    const noHighlight = ['/favorites', '/cart', '/checkout', '/order-success', '/order-history'];
    if (noHighlight.includes(location.pathname)) return false;
    return location.pathname === path;
  };

  const getMenuIcon = (key) => {
    switch(key) {
      case 'nav.home': return <IoHomeOutline size={20} />;
      case 'nav.menu': return <IoFastFoodOutline size={20} />;
      case 'nav.about': return <IoInformationCircleOutline size={20} />;
      case 'nav.contact': return <IoCallOutline size={20} />;
      default: return <FaChevronRight size={12} />;
    }
  };

  // --- Auth & Storage Effects ---
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('currentUser');
      setCurrentUser(user ? JSON.parse(user) : null);
    };
    checkAuth();
    window.addEventListener('authChanged', checkAuth);
    return () => window.removeEventListener('authChanged', checkAuth);
  }, []);

  useEffect(() => {
    const updateCounts = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setFavoritesCount(favorites.length);
        setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
      } else {
        setFavoritesCount(0);
        setCartCount(0);
      }
    };
    updateCounts();
    window.addEventListener('storage', updateCounts);
    window.addEventListener('favoritesUpdated', updateCounts);
    window.addEventListener('cartUpdated', updateCounts);
    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('favoritesUpdated', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
    setCurrentUser(null);
    setCartCount(0);
    setFavoritesCount(0);
    window.dispatchEvent(new Event('authChanged'));
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('favoritesUpdated'));
    setOpenSidebar(false);
    navigate('/home');
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-sm font-sans">
      
      {/* --- DESKTOP TOP BAR --- */}
      <div className="hidden xl:block w-full bg-[#1a2e35] py-2 px-14">
        <div className="flex justify-between items-center text-white text-[12px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <p>Welcome to Khmer-Fresh Organic Store</p>
            <div className="h-3 w-[1px] bg-white/20"></div>
            <p className="text-orange-400">Call Us: +855 972325094</p>
          </div>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <div className="h-3 w-[1px] bg-white/20"></div>
            {currentUser ? (
              <div className="relative group cursor-pointer flex items-center gap-2">
                <span>Hello, {currentUser.name}</span>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white shadow-xl rounded-lg py-2 w-40 border border-gray-100 text-gray-800">
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-colors">{t('nav.logout')}</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-[#2d5a27] transition-colors">{t('nav.login')}</Link>
            )}
          </div>
        </div>
      </div>

      {/* --- MAIN BAR --- */}
      <div className="w-full h-[80px] px-5 lg:px-14 flex items-center justify-between border-b border-gray-100 bg-white">
        <Link to='/' className="flex items-center space-x-2 shrink-0">
          <div className="bg-[#2d5a27]/10 p-2 rounded-lg transition-transform hover:rotate-12">
            <FaLeaf className="text-[#2d5a27] md:text-2xl text-xl" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="md:text-2xl text-xl font-black text-[#1a2e35] tracking-tighter uppercase">
              KHMER<span className="text-[#2d5a27]">-FRESH</span>
            </span>
            <span className="text-[9px] font-bold text-orange-600 tracking-[0.25em] uppercase">Authentic Taste</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex items-center gap-8 mx-auto">
          {menu.map((u) => (
            <li key={u.id} className="relative group h-full flex items-center">
              <Link to={u.link} className={`text-[14px] font-bold uppercase tracking-widest transition-all duration-300 ${isActive(u.link) ? 'text-[#2d5a27]' : 'text-gray-500 hover:text-[#2d5a27]'}`}>
                {t(u.key)}
              </Link>
              <span className={`absolute -bottom-1 left-0 h-[3px] bg-[#2d5a27] rounded-full transition-all duration-300 ${isActive(u.link) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-1 md:gap-4">
          <button onClick={() => setOpenSearch(!openSearch)} className="p-2 text-gray-700 hover:text-[#2d5a27] transition-colors">
            <IoSearch size={25} />
          </button>
          <Link to="/favorites" className="hidden xl:block relative p-2 text-gray-700 hover:text-red-500 transition-colors">
            <FaRegHeart size={24} />
            {favoritesCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">{favoritesCount}</span>}
          </Link>
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-[#2d5a27] transition-colors">
            <HiOutlineShoppingCart size={26} />
            {cartCount > 0 && <span className="absolute top-1 right-1 bg-[#2d5a27] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">{cartCount}</span>}
          </Link>
          <button onClick={() => setOpenSidebar(true)} className="xl:hidden p-2 text-gray-700 hover:text-[#2d5a27]">
            <FaBars size={25} />
          </button>
        </div>
      </div>

      {/* --- SIDEBAR MOBILE --- */}
      <div className={`fixed inset-0 bg-[#1a2e35]/60 backdrop-blur-md z-[100] xl:hidden transition-opacity duration-500 ${openSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpenSidebar(false)}></div>
      <div className={`w-[300px] h-screen fixed z-[110] top-0 left-0 bg-white xl:hidden shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${openSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-full h-[180px] bg-gradient-to-br from-[#2d5a27] to-[#1a2e35] p-6 flex flex-col justify-between relative overflow-hidden text-white">
          <FaLeaf className="absolute -right-10 -bottom-10 text-white/10 text-[150px] rotate-12" />
          <div className="flex justify-between items-start relative z-10">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/20"><FaLeaf size={20} /></div>
            <button onClick={() => setOpenSidebar(false)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-all"><IoCloseSharp size={24} /></button>
          </div>
          <div className="relative z-10 uppercase">
            <h2 className="text-2xl font-black tracking-tighter">KHMER-FRESH</h2>
            <p className="text-white/60 text-[10px] font-bold mt-1">Authentic Traditional Food</p>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-180px)] justify-between">
          <div className="overflow-y-auto py-6 px-4">
            <ul className="space-y-2">
              {menu.map((u) => (
                <li key={u.id}>
                  <Link to={u.link} className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all ${isActive(u.link) ? 'bg-[#2d5a27] text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setOpenSidebar(false)}>
                    <div className="flex items-center gap-4">
                      {getMenuIcon(u.key)}
                      <span className="text-[15px] uppercase">{t(u.key)}</span>
                    </div>
                    <FaChevronRight size={10} className={isActive(u.link) ? 'rotate-90' : 'opacity-30'} />
                  </Link>
                </li>
              ))}

              {/* ប៊ូតុង Favorite ដែលប្រើ translation t('nav.favorites') */}
              <li className="mt-4 pt-4 border-t border-gray-100">
                <Link to="/favorites" className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all ${location.pathname === '/favorites' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-600 hover:bg-red-50 hover:text-white group'}`} onClick={() => setOpenSidebar(false)}>
                  <div className="flex items-center gap-4">
                    <FaRegHeart size={20} className={location.pathname === '/favorites' ? 'text-white' : 'text-red-500 group-hover:text-white'} />
                    <span className="text-[15px] uppercase">{t('nav.favorites')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {favoritesCount > 0 && <span className={`text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold ${location.pathname === '/favorites' ? 'bg-white text-red-500' : 'bg-red-500 text-white'}`}>{favoritesCount}</span>}
                    <FaChevronRight size={10} className="opacity-30" />
                  </div>
                </Link>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100 px-2 flex justify-between items-center">
               <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Language</span>
               <div className="scale-90"><LanguageSwitcher /></div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100">
            {currentUser ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-2 bg-white rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 bg-[#2d5a27] rounded-2xl flex items-center justify-center text-white font-black text-xl">{currentUser.name.charAt(0).toUpperCase()}</div>
                  <div className="overflow-hidden leading-tight text-gray-800">
                    <p className="text-sm font-black truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-gray-400 truncate font-bold">{currentUser.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="w-full py-4 bg-white text-red-500 border border-red-100 rounded-2xl font-black text-xs shadow-sm"><FaSignOutAlt className="inline mr-2" /> {t('nav.logout')}</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setOpenSidebar(false)} className="w-full py-4 bg-[#2d5a27] text-white rounded-2xl font-black text-sm flex justify-center items-center gap-2 shadow-lg"><FaRegUser /> {t('nav.login')}</Link>
            )}
          </div>
        </div>
      </div>

      {/* --- SEARCH OVERLAY --- */}
      <div className={`w-full z-[120] absolute top-0 left-0 bg-white border-b-2 border-[#2d5a27] transition-all duration-500 ${openSearch ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className="w-full px-6 py-12 flex flex-col items-center relative">
            <form onSubmit={(e) => { e.preventDefault(); if (searchInput.trim()) { navigate(`/search?q=${encodeURIComponent(searchInput)}`); setSearchInput(''); setOpenSearch(false); } }} className="relative w-full max-w-2xl">
              <IoSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-[#2d5a27]" />
              <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full h-14 border-2 border-gray-100 px-5 pl-14 rounded-full outline-none focus:border-[#2d5a27] shadow-xl text-lg font-bold" placeholder={t('nav.search')} autoFocus />
            </form>
            <IoCloseSharp onClick={() => setOpenSearch(false)} className="text-[#2d5a27] absolute text-3xl top-4 right-6 cursor-pointer hover:rotate-90 transition-transform duration-300" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;