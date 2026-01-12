import React, { useEffect } from 'react';
import { khmerFoodCategories } from '../data';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoArrowForward } from 'react-icons/io5';

const Category = () => {
    const { t } = useTranslation();

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className="bg-white py-24">
            <div className="container mx-auto px-6 md:px-14">
                {/* Header Section */}
                <div className="mb-20" data-aos="fade-right">
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a3a32] uppercase tracking-tighter">
                        Browse by <span className="text-orange-500">Category</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-[#1a3a32] mt-4"></div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {khmerFoodCategories.map((s, index) => (
                        <div
                            key={s.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className='group relative w-full h-[450px] bg-gray-900 overflow-hidden cursor-pointer shadow-xl'
                        >
                            {/* 1. រូបភាព Background - រាងជ្រុងដាច់ */}
                            <img 
                                src={s.imageUrl} 
                                className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-40' 
                                alt={s.name} 
                            />

                            {/* 2. ខ្លឹមសារដែលនឹងអណ្តែតចេញពីក្រោមឡើងលើ */}
                            <div className='absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500'>
                                
                                {/* ចំណងជើង - បង្ហាញជានិច្ច */}
                                <h3 className='text-2xl font-black text-white uppercase tracking-tighter mb-2 transform group-hover:-translate-y-2 transition-transform duration-500'>
                                    {s.name}
                                </h3>

                                {/* បន្ទាត់លម្អ */}
                                <div className='w-10 h-1 bg-orange-500 mb-4 transition-all duration-500 group-hover:w-full'></div>

                                {/* ផ្នែកដែលលាក់ រួចអណ្តែតឡើងលើពេល Hover */}
                                <div className='max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden'>
                                    <p className='text-gray-300 text-sm leading-relaxed mb-6 font-medium'>
                                        {s.description}
                                    </p>
                                    
                                    <Link
                                        to={s.linkUrl}
                                        className='inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-[0.2em] bg-orange-600 hover:bg-orange-700 px-6 py-3 transition-colors'
                                    >
                                        Explore Menu <IoArrowForward size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* លម្អជ្រុង Card ពេល Hover (Optional: បន្ថែម Border ជ្រុងពណ៌ទឹកក្រូច) */}
                            <div className='absolute inset-0 border-0 group-hover:border-[10px] border-white/10 transition-all duration-500 pointer-events-none'></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;