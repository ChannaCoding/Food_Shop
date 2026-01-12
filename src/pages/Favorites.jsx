import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHeart, FaShoppingCart, FaTrash, FaArrowRight } from 'react-icons/fa';
import { VscHeartFilled } from "react-icons/vsc";
import Toast from '../components/Toast';

const Favorites = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) { navigate('/login'); return; }
    loadFavorites();
  }, [navigate]);

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  };

  const removeFromFavorites = (itemId) => {
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const addToCart = (item) => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      setToastMessage(t('auth.loginRequired'));
      setShowToast(true);
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex(c => c.id === item.id && c.type === item.type);
    if (existingItemIndex >= 0) { cart[existingItemIndex].quantity += 1; } 
    else { cart.push({ ...item, quantity: 1 }); }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setToastMessage(`${item.name} ${t('cart.addedSuccess')}`);
    setShowToast(true);
  };

  if (favorites.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-black text-gray-200 mb-2 uppercase tracking-widest italic">Empty</h2>
        <p className="text-gray-400 mb-8 text-[10px] font-black uppercase tracking-[0.3em]">{t('favorites.emptyDesc')}</p>
        <Link to="/MenuFood" className="px-8 py-3 bg-[#1a2e35] text-white font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all">
          {t('about.browseMenu')}
        </Link>
      </div>
    );
  }

  return (
    <>
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
      
      <div className="w-full min-h-screen bg-white pt-16 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-4 border-b border-gray-100 gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-black text-[#1a2e35] tracking-tighter uppercase leading-none">
                {t('nav.favorites')}
              </h1>
              <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
              <p className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.3em]">
                {favorites.length} {t('favorites.countSuffix')}
              </p>
            </div>
            
            <button 
              onClick={clearAllFavorites} 
              className="flex items-center gap-2 px-4 py-2 text-red-500 font-black text-[9px] uppercase tracking-widest transition-all hover:bg-red-50"
            >
              <FaTrash size={10} /> {t('favorites.clearAll')}
            </button>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-transparent hover:bg-orange-50/30 p-3 transition-all duration-300"
              >
                {/* Image Area */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={item.name} 
                  />
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromFavorites(item.id)}
                    className="absolute top-0 right-0 p-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <VscHeartFilled size={20} />
                  </button>

                  {/* Price Tag */}
                  <div className="absolute bottom-0 left-0 bg-[#1a2e35] group-hover:bg-orange-600 text-white px-3 py-1 font-black text-[10px] transition-colors">
                    ${item.price}
                  </div>
                </div>

                {/* Content Area */}
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-[8px] font-black text-orange-600 uppercase tracking-[0.2em] mb-1 opacity-80">{item.category}</p>
                    <h3 className="text-base font-black text-[#1a2e35] uppercase tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </div>

                  {/* Buttons - Hover changed to Orange */}
                  <div className="flex flex-col gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => addToCart(item)} 
                      className="w-full py-3 bg-[#1a2e35] text-white font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-600 transition-all"
                    >
                      <FaShoppingCart size={10} /> {t('nav.menu')}
                    </button>
                    
                    <Link 
                      to={item.detailLink} 
                      className="w-full py-3 text-[#1a2e35] font-black text-[9px] uppercase tracking-widest text-center flex items-center justify-center gap-2 border border-transparent hover:border-orange-200 hover:text-orange-600 transition-all"
                    >
                      {t('favorites.viewDetails')} <FaArrowRight size={8} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;