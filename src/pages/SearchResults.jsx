import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { khmerFoods, khmerSnacks, MenuSoup, khmerDessert } from '../data';
import { IoSearch } from 'react-icons/io5';
import { FaArrowLeft } from 'react-icons/fa';
import { BiLeaf } from 'react-icons/bi';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; 
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setSearchQuery(query);
    performSearch(query);
  }, [query]);

  const performSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    
    // Combine all data sources
    const allItems = [
      ...khmerFoods.map(item => ({ ...item, type: 'food', detailLink: `/MenuFood/${item.id}` })),
      ...khmerSnacks.map(item => ({ ...item, type: 'snack', detailLink: `/MenuSnack/${item.id}` })),
      ...MenuSoup.map(item => ({ ...item, type: 'soup', detailLink: `/MenuSoup/${item.id}` })),
      ...khmerDessert.map(item => ({ ...item, type: 'dessert', detailLink: `/MenuDessert/${item.id}` }))
    ];

    const filtered = allItems.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      (item.description && item.description.toLowerCase().includes(term))
    );

    setResults(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Navigation --- */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#2D4A22] font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#F58220] transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>
        </div>

        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-[#F58220] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <BiLeaf size={16} />
            <span>Discover Our Menu</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#2D4A22] uppercase tracking-tighter mb-4">
            Search <span className="text-[#F58220]">Results</span>
          </h1>
          {query && (
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Filtered by keyword: <span className="text-[#2D4A22]">"{query}"</span>
            </p>
          )}
        </div>

        {/* --- Search Input Box --- */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative group">
            <IoSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D4A22] transition-colors text-xl" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you craving today?"
              className="w-full pl-16 pr-12 py-5 rounded-sm border border-gray-100 bg-white focus:border-[#2D4A22] focus:ring-0 outline-none shadow-sm text-sm uppercase font-bold tracking-widest transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setResults([]); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500 transition-colors"
              >✕</button>
            )}
          </form>
          <p className="text-center mt-6 text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
            Found {results.length} exquisite matches
          </p>
        </div>

        {/* --- Results Grid --- */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {results.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                to={item.detailLink}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 mb-6 border border-gray-100 rounded-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute bottom-4 right-4 bg-white px-3 py-1 font-black text-[11px] text-[#2D4A22] shadow-sm">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-[9px] font-black text-[#F58220] uppercase tracking-[0.2em] mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-black text-[#2D4A22] uppercase tracking-widest group-hover:text-[#F58220] transition-colors">
                    {item.name}
                  </h3>
                  <div className="mt-4 w-10 h-[1px] bg-gray-200 group-hover:w-20 group-hover:bg-[#2D4A22] transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        ) : query ? (
          /* Empty Search Results */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <IoSearch size={30} className="text-gray-200" />
            </div>
            <h3 className="text-lg font-black text-[#2D4A22] uppercase tracking-widest">No Matches Found</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Try a different keyword or category</p>
          </div>
        ) : (
          /* Initial State */
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <BiLeaf size={50} className="text-gray-200 mb-6" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Awaiting Search Input</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;