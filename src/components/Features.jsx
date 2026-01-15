import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaClock, FaShieldAlt, FaLeaf, FaHeart } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';
import { BiDish } from 'react-icons/bi';

const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <MdDeliveryDining className="text-5xl" />,
      title: t('home.fastDelivery'),
      description: t('home.fastDeliveryDesc'),
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <FaLeaf className="text-5xl" />,
      title: t('home.freshIngredients'),
      description: t('home.freshIngredientsDesc'),
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <BiDish className="text-5xl" />,
      title: t('home.authenticRecipes'),
      description: t('home.authenticRecipesDesc'),
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaShieldAlt className="text-5xl" />,
      title: t('home.qualityGuaranteed'),
      description: t('home.qualityGuaranteedDesc'),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaClock className="text-5xl" />,
      title: t('home.open247'),
      description: t('home.open247Desc'),
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      icon: <FaHeart className="text-5xl" />,
      title: t('home.madeWithLove'),
      description: t('home.madeWithLoveDesc'),
      gradient: "from-red-500 to-pink-500"
    }
  ];

  return (
    <div className="w-full bg-white py-24 px-6 md:px-14 font-[var(--font-khmer)]">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="mb-20" data-aos="fade-right">
          <span className="inline-block text-orange-600 font-bold text-sm uppercase tracking-[0.3em] mb-4">
            ✨ {t('home.whyChooseUs')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a3a32] uppercase tracking-tighter mb-4">
            {t('home.whatMakesUsSpecial')}
          </h2>
          <div className="w-20 h-1.5 bg-[#1a3a32]"></div>
        </div>

        {/* Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative h-auto md:h-[300px] bg-gray-50 overflow-hidden cursor-pointer transition-all duration-500 rounded-2xl md:hover:rounded-none border border-gray-100 shadow-sm md:shadow-none"
            >
              {/* បន្ទះពណ៌ Gradient ឆ្វេងដៃ */}
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${feature.gradient} transform translate-x-0 md:-translate-x-full md:group-hover:translate-x-0 transition-transform duration-500`}></div>

              <div className="p-10 h-full flex flex-col justify-center">
                {/* Icon Section */}
                <div className={`mb-6 transform transition-all duration-500 text-orange-500 md:text-[#1a3a32] md:group-hover:-translate-y-3 md:group-hover:text-orange-500`}>
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-black text-[#1a3a32] mb-2 md:group-hover:text-orange-600 transition-colors duration-300 uppercase tracking-tighter">
                  {feature.title}
                </h3>

                {/* Description - បង្ហាញជានិច្ចលើ Mobile (opacity-100) និង លាក់លើ Desktop (md:opacity-0) */}
                <div className="opacity-100 max-h-[500px] md:opacity-0 md:max-h-0 md:group-hover:max-h-32 md:group-hover:opacity-100 transition-all duration-700 ease-in-out">
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* សញ្ញា + */}
              <div className="absolute bottom-6 right-6 text-orange-500 md:text-gray-200 md:group-hover:text-orange-500 transition-colors font-light text-4xl">
                 +
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <button className="relative group px-12 py-5 bg-[#1a3a32] overflow-hidden transition-all duration-500 shadow-xl">
            <span className="relative z-10 text-white font-black uppercase tracking-widest text-sm flex items-center gap-3">
              {t('home.readyToOrder')} <span>🍽️</span>
            </span>
            <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;