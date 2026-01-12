import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { khmerSnacks } from '../data';
import { FaStar, FaShoppingCart, FaMinus, FaPlus, FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { BiTime, BiLeaf } from 'react-icons/bi';
import { MdDeliveryDining, MdVerified } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const DetailMenuSnack = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { t } = useTranslation();

  const snack = khmerSnacks.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (snack) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const isAlreadyFavorite = favorites.some(
        (item) => item.id === snack.id && item.type === 'snack'
      );
      setIsFavorite(isAlreadyFavorite);
    }
  }, [snack]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((item) => !(item.id === snack.id && item.type === 'snack'));
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push({
        id: snack.id,
        name: snack.name,
        price: snack.price,
        image: snack.image,
        category: snack.category,
        qty: snack.qty,
        type: 'snack',
        detailLink: `/MenuSnack/${snack.id}`,
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  if (!snack) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2D4A22] mb-4 uppercase tracking-widest">Snack Not Found</h2>
          <Link to="/MenuSnack" className="text-[#F58220] font-black text-xs uppercase tracking-widest underline">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === 'increase') setQuantity((prev) => prev + 1);
    else if (type === 'decrease' && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const totalPrice = (snack.price * quantity).toFixed(2);

  const addToCart = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      setToastMessage('Please login to continue');
      setShowToast(true);
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex((item) => item.id === snack.id && item.type === 'snack');

    if (index >= 0) {
      cart[index].quantity += quantity;
    } else {
      cart.push({
        id: snack.id,
        name: snack.name,
        price: snack.price,
        image: snack.image,
        category: snack.category,
        qty: snack.qty,
        type: 'snack',
        quantity,
        detailLink: `/MenuSnack/${snack.id}`,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setToastMessage(`${snack.name} added to cart!`);
    setShowToast(true);
  };

  return (
    <>
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}

      <div className="w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6 md:px-14">
        {/* --- Header Navigation --- */}
        <div className="max-w-7xl mx-auto mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#2D4A22] font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#F58220] transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            {t('button.back') || 'Go Back'}
          </button>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* --- Left Column: Image Section --- */}
          <div className="relative group">
            <div className="aspect-square rounded-sm overflow-hidden border border-gray-100 shadow-sm bg-white">
              <img
                src={snack.image}
                alt={snack.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            {/* Floating Heart */}
            <button
              onClick={handleFavoriteToggle}
              className="absolute top-6 right-6 w-12 h-12 bg-white flex items-center justify-center shadow-xl rounded-full hover:scale-110 transition-transform active:scale-95"
            >
              {isFavorite ? <FaHeart className="text-red-500" size={20} /> : <FaRegHeart className="text-gray-300" size={20} />}
            </button>
          </div>

          {/* --- Right Column: Info Section --- */}
          <div className="flex flex-col">
            {/* Product Header */}
            <div className="border-b border-gray-100 pb-8 mb-8">
              <div className="flex items-center gap-2 text-[#F58220] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <BiLeaf size={16} />
                <span>Original {snack.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2D4A22] uppercase tracking-tight mb-4">
                {snack.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex text-[#F58220]">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                </div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  (4.8 Rating / 89 Reviews)
                </span>
              </div>
            </div>

            {/* Description Area */}
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-xl italic">
              "{snack.description}"
            </p>

            {/* Price & Stock Display */}
            <div className="flex items-end gap-4 mb-10">
              <span className="text-4xl font-black text-[#2D4A22]">${totalPrice}</span>
              <span className="text-lg text-gray-300 line-through font-medium mb-1">${(snack.price * 1.5).toFixed(2)}</span>
              <div className="bg-[#2D4A22] text-white text-[9px] font-black px-2 py-1 rounded-sm mb-2 uppercase tracking-tighter">
                Quick Deal
              </div>
            </div>

            {/* Quantity Control */}
            <div className="mb-10">
              <p className="text-[11px] font-black text-[#2D4A22] uppercase tracking-widest mb-4">Adjust Quantity</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-200 rounded-sm">
                  <button onClick={() => handleQuantityChange('decrease')} className="px-4 py-3 hover:bg-gray-50 transition-colors border-r border-gray-200">
                    <FaMinus size={10} />
                  </button>
                  <span className="px-8 font-bold text-[#2D4A22]">{quantity}</span>
                  <button onClick={() => handleQuantityChange('increase')} className="px-4 py-3 hover:bg-gray-50 transition-colors border-l border-gray-200">
                    <FaPlus size={10} />
                  </button>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                   {snack.qty} Packs Available
                </span>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={addToCart}
                className="flex-[2] bg-[#2D4A22] text-white py-5 px-8 font-black text-xs uppercase tracking-[0.2em] hover:bg-[#1e3317] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#2D4A22]/20"
              >
                <FaShoppingCart /> Add To Cart
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="flex-1 border-2 border-[#2D4A22] text-[#2D4A22] py-5 px-8 font-black text-xs uppercase tracking-[0.2em] hover:bg-[#2D4A22] hover:text-white transition-all text-center"
              >
                Buy Now
              </button>
            </div>

            {/* Secondary Info Grid */}
            <div className="grid grid-cols-3 gap-1 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center p-4 border-r border-gray-100">
                <MdDeliveryDining className="text-[#F58220] mb-2" size={24} />
                <span className="text-[9px] font-black text-[#2D4A22] uppercase tracking-tighter text-center">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center p-4 border-r border-gray-100">
                <BiTime className="text-[#F58220] mb-2" size={24} />
                <span className="text-[9px] font-black text-[#2D4A22] uppercase tracking-tighter text-center">15-30 Mins</span>
              </div>
              <div className="flex flex-col items-center p-4">
                <MdVerified className="text-[#F58220] mb-2" size={24} />
                <span className="text-[9px] font-black text-[#2D4A22] uppercase tracking-tighter text-center">Quality Check</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMenuSnack;