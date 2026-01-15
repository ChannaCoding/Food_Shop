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
                            {/* រូបភាព Background */}
                            <img 
                                src={s.imageUrl} 
                                className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 md:opacity-100 md:group-hover:opacity-40' 
                                alt={s.name} 
                            />

                            {/* ខ្លឹមសារ */}
                            <div className='absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500'>
                                
                                <h3 className='text-2xl font-black text-white uppercase tracking-tighter mb-2 transform md:group-hover:-translate-y-2 transition-transform duration-500'>
                                    {s.name}
                                </h3>

                                {/* បន្ទាត់លម្អ - ឱ្យវារត់ពេញតែម្តងលើ Mobile */}
                                <div className='h-1 bg-orange-500 mb-4 transition-all duration-500 w-full md:w-10 md:group-hover:w-full'></div>

                                {/* ផ្នែកព័ត៌មាន និងប៊ូតុង */}
                                {/* ចំណុចកែប្រែ៖ ប្រើ opacity-100 លើ mobile និង md:opacity-0 លើ desktop */}
                                <div className='opacity-100 max-h-[200px] md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-[200px] transition-all duration-700 ease-in-out overflow-hidden'>
                                    <p className='text-gray-300 text-sm leading-relaxed mb-6 font-medium'>
                                        {s.description}
                                    </p>
                                    
                                    <Link
                                        to={s.linkUrl}
                                        className='inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-[0.2em] bg-orange-600 hover:bg-orange-700 px-6 py-3 transition-colors shadow-lg'
                                    >
                                        Explore Menu <IoArrowForward size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Border លម្អ - បង្ហាញតែលើ Desktop */}
                            <div className='hidden md:block absolute inset-0 border-0 group-hover:border-[10px] border-white/10 transition-all duration-500 pointer-events-none'></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;