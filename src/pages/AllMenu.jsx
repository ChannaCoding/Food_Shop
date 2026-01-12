import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { khmerFoods, khmerSnacks, khmerDessert, MenuSoup } from '../data';
import { FaHeart, FaRegHeart, FaShoppingCart, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import Toast from '../components/Toast';

const AllMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Data Logic (Keep Original)
  const allMenuItems = [
    ...khmerFoods.map(item => ({ ...item, type: 'food' })),
    ...khmerSnacks.map(item => ({ ...item, type: 'snack' })),
    ...khmerDessert.map(item => ({ ...item, type: 'dessert' })),
    ...MenuSoup.map(item => ({ ...item, type: 'soup' }))
  ];

  // State Management (Keep Original)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const itemsPerPage = 12;

  // Favorites Logic (Keep Original)
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
    const handleFavoritesUpdate = () => {
      setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    };
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
  }, []);

  // Filter Logic (Keep Original)
  const filteredItems = allMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    let matchesPrice = true;
    if (priceRange === 'low') matchesPrice = item.price < 1.5;
    else if (priceRange === 'medium') matchesPrice = item.price >= 1.5 && item.price <= 3.0;
    else if (priceRange === 'high') matchesPrice = item.price > 3.0;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort Logic (Keep Original)
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  // Pagination Logic (Keep Original)
  const currentItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  // Handlers (Keep Original)
  const toggleFavorite = (item) => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) { navigate('/login'); return; }
    let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFav = favs.some(f => f.id === item.id && f.type === item.type);
    favs = isFav ? favs.filter(f => !(f.id === item.id && f.type === item.type)) : [...favs, item];
    localStorage.setItem('favorites', JSON.stringify(favs));
    setFavorites(favs);
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const addToCart = (item) => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) { navigate('/login'); return; }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex(i => i.id === item.id && i.type === item.type);
    if (idx > -1) cart[idx].quantity += 1;
    else cart.push({ ...item, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    setToastMessage(`${item.name} added to cart!`);
    setShowToast(true);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-28">
      {/* Title Section */}
      <div className="mb-10 border-l-4 border-[#2D4A22] pl-4">
        <h1 className="text-3xl font-bold text-[#2D4A22]">
          OUR <span className="text-[#F58220]">MENU</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium">{t('menu.subtitle') || 'Fresh and Organic Products'}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white border border-gray-100 shadow-sm p-6 sticky top-28 rounded-none">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <FaFilter className="text-[#F58220]" /> FILTERS
              </h2>
              <button onClick={() => {setSelectedCategory('all'); setPriceRange('all');}} className="text-xs text-[#F58220] font-bold hover:underline">RESET</button>
            </div>

            {/* Category */}
            <div className="mb-8">
              <h3 className="font-bold text-xs mb-4 text-gray-400 uppercase tracking-widest">Category</h3>
              <div className="space-y-1">
                {['all', 'Main Dish', 'Khmer Snacks', 'Khmer Desserts', 'Khmer Soups'].map(cat => (
                  <label key={cat} className={`flex items-center gap-3 p-3 cursor-pointer border transition-all rounded-none ${selectedCategory === cat ? 'border-[#F58220] bg-[#FFF8F2]' : 'border-transparent hover:bg-gray-50'}`}>
                    <input type="radio" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="w-4 h-4 accent-[#F58220]" />
                    <span className="text-sm font-bold text-gray-700">{cat === 'all' ? 'All Items' : cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-bold text-xs mb-4 text-gray-400 uppercase tracking-widest">Price Range</h3>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'low', label: 'Under $1.50' },
                  { id: 'medium', label: '$1.50 - $3.00' },
                  { id: 'high', label: 'Over $3.00' }
                ].map(range => (
                  <label key={range.id} className={`flex items-center gap-3 p-3 cursor-pointer border transition-all rounded-none ${priceRange === range.id ? 'border-[#F58220] bg-[#FFF8F2]' : 'border-transparent hover:bg-gray-50'}`}>
                    <input type="radio" checked={priceRange === range.id} onChange={() => setPriceRange(range.id)} className="w-4 h-4 accent-[#F58220]" />
                    <span className="text-sm font-bold text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search menu..." 
                className="w-full pl-12 pr-4 py-3 border border-gray-200 outline-none focus:border-[#2D4A22] rounded-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-3 border border-gray-200 outline-none font-bold text-sm text-[#2D4A22] bg-white rounded-none cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentItems.map(item => (
              <div key={`${item.id}-${item.type}`} className="group bg-white border border-gray-100 hover:border-[#2D4A22] transition-all duration-300 rounded-none shadow-sm">
                <div className="relative h-48 overflow-hidden bg-gray-50">
                  <Link to={`/${item.type === 'food' ? 'MenuFood' : item.type === 'snack' ? 'MenuSnack' : item.type === 'dessert' ? 'MenuDessert' : 'MenuSoup'}/${item.id}`}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <button 
                    onClick={() => toggleFavorite(item)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#2D4A22] transition-colors shadow-sm"
                  >
                    {favorites.some(f => f.id === item.id) ? <FaHeart className="text-red-500 " /> : <FaRegHeart />}
                  </button>
                </div>
                
                <div className="p-5">
                  <Link to={`/${item.type === 'food' ? 'MenuFood' : item.type === 'snack' ? 'MenuSnack' : item.type === 'dessert' ? 'MenuDessert' : 'MenuSoup'}/${item.id}`}>
                    <h3 className="font-bold text-[#2D4A22] text-lg uppercase truncate  transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-gray-400 text-xs mt-2 line-clamp-2 h-8 group-hover:text-[#F58220] transition-colors">
                    {item.description || "Authentic taste, high quality, providing a healthy lifestyle..."}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-xl font-black text-[#2D4A22] tracking-tighter">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-[#2D4A22] text-white px-5 py-2.5 text-xs font-bold flex items-center gap-2 hover:bg-[#F58220] transition-colors rounded-none shadow-sm uppercase"
                    >
                      <FaShoppingCart /> {t('menu.add') || 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-1">
              <button 
                disabled={currentPage === 1}
                onClick={() => {setCurrentPage(p => p - 1); window.scrollTo(0,0);}}
                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-20 transition-all rounded-none"
              >
                <FaChevronLeft size={12} />
              </button>
              <div className="flex items-center px-4">
                <span className="text-xs font-black text-gray-400 tracking-widest uppercase">Page {currentPage} of {totalPages}</span>
              </div>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => {setCurrentPage(p => p + 1); window.scrollTo(0,0);}}
                className="w-10 h-10 bg-[#2D4A22] text-white flex items-center justify-center hover:bg-[#F58220] disabled:opacity-20 transition-all rounded-none"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default AllMenu;