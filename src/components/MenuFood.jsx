import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import { khmerFoods } from '../data';
import { IoSearch } from 'react-icons/io5';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BiLeaf } from 'react-icons/bi';
import { useTranslation } from 'react-i18next'

const MenuFood = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState(khmerFoods);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    const filtered = khmerFoods.filter(food => 
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFoods(filtered);
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20'>
      <div className='max-w-7xl mx-auto px-6 md:px-14'>
        
        {/* --- Header Section (Minimal Style) --- */}
        <div data-aos="fade-down" className="mb-16 border-l-4 border-[#2D4A22] pl-6 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D4A22] uppercase tracking-tight">
             KHMER-FRESH <span className="text-[#F58220] font-light">/ {t('menu.title') || 'Our Menu'}</span>
          </h1>
          <p className="text-gray-400 font-medium mt-2 text-sm tracking-widest uppercase">
            {t('menu.subtitle') || 'Organic & Authentic Cambodian Taste'}
          </p>
          <BiLeaf className="absolute -top-10 right-0 text-[#2D4A22]/5" size={150} />
        </div>

        {/* --- Search Bar (Clean Style) --- */}
        <div className='max-w-xl mb-12' data-aos="fade-up">
          <div className='relative group'>
            <IoSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D4A22] transition-colors' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search your favorite dish...'
              className='w-full pl-12 pr-4 py-3 bg-white border-b-2 border-gray-100 focus:border-[#2D4A22] outline-none transition-all duration-300 font-medium text-gray-700'
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500'>✕</button>
            )}
          </div>
          <p className='text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-widest'>
            Showing {filteredFoods.length} Results
          </p>
        </div>

        {/* --- Food Grid --- */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {currentItems.length > 0 ? (
            currentItems.map((s, index) => (
              <div 
                data-aos="fade-up"
                data-aos-delay={index * 50}
                key={s.id} 
                className='group bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 rounded-sm'
              >
                {/* Image Area */}
                <div className='relative h-64 overflow-hidden'>
                  <img 
                    src={s.image} 
                    className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110' 
                    alt={s.name} 
                  />
                  <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[#2D4A22] font-black text-sm rounded-full shadow-sm'>
                    ${s.price}
                  </div>
                </div>

                {/* Content Area (អក្សរតូចល្មម ស្អាត) */}
                <div className='p-6 space-y-4'>
                  <div>
                    <h3 className='text-lg font-bold text-[#2D4A22] uppercase tracking-tight group-hover:text-[#F58220] transition-colors'>
                      {s.name}
                    </h3>
                    <p className='text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                      Authentic Recipe
                    </p>
                  </div>
                  
                  <Link 
                    to={`/MenuFood/${s.id}`} 
                    className='flex items-center justify-between w-full pt-4 border-t border-gray-50 text-[11px] font-black uppercase tracking-[0.2em] text-[#2D4A22] hover:text-[#F58220] transition-colors group/link'
                  >
                    View Details
                    <FaChevronRight className='group-hover/link:translate-x-1 transition-transform' size={10} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-full text-center py-20 border-2 border-dashed border-gray-100 rounded-xl'>
              <h3 className='text-xl font-bold text-gray-400 uppercase tracking-widest'>No dishes found</h3>
              <button onClick={() => setSearchQuery('')} className='mt-4 text-[#F58220] font-black text-xs uppercase tracking-widest underline'>Clear Search</button>
            </div>
          )}
        </div>

        {/* --- Pagination (Minimalist) --- */}
        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-4 mt-20'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-full border ${currentPage === 1 ? 'border-gray-100 text-gray-200' : 'border-[#2D4A22] text-[#2D4A22] hover:bg-[#2D4A22] hover:text-white'} transition-all`}
            >
              <FaChevronLeft size={12} />
            </button>

            <div className='flex gap-2'>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 rounded-full text-xs font-black transition-all ${currentPage === index + 1 ? 'bg-[#2D4A22] text-white' : 'text-gray-400 hover:text-[#2D4A22]'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-full border ${currentPage === totalPages ? 'border-gray-100 text-gray-200' : 'border-[#2D4A22] text-[#2D4A22] hover:bg-[#2D4A22] hover:text-white'} transition-all`}
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuFood