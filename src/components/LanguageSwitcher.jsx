import React from 'react';
import { useTranslation } from 'react-i18next'; // ទាញយក Hook សម្រាប់ប្រើប្រាស់មុខងារប្តូរភាសា
import enFlag from '../assets/en.svg'; // រូបតំណាងទង់ជាតិអង់គ្លេស
import khFlag from '../assets/kh.svg'; // រូបតំណាងទង់ជាតិខ្មែរ

const LanguageSwitcher = () => {
  const { i18n } = useTranslation(); // បង្កើត Object i18n ដើម្បីគ្រប់គ្រងភាសាបច្ចុប្បន្ន

  // Function សម្រាប់ប្តូរភាសាចុះឡើង (Toggle) រវាង ខ្មែរ និង អង់គ្លេស
  const toggleLanguage = () => {
    // បើភាសាបច្ចុប្បន្នជា 'en' ឱ្យដូរទៅ 'kh' តែបើមិនមែនទេ ឱ្យដូរទៅ 'en' វិញ
    const newLang = i18n.language === 'en' ? 'kh' : 'en';
    i18n.changeLanguage(newLang); // បញ្ជាឱ្យបណ្ណាល័យ i18next ប្តូរភាសាពេញ Website តែម្តង
  };

  return (
    <button
      onClick={toggleLanguage} // ចុចលើរូបទង់ជាតិដើម្បីប្តូរភាសា
      className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border-2 border-gray-200 hover:border-orange-500 group overflow-hidden active:scale-95"
      title={i18n.language === 'en' ? 'Switch to Khmer' : 'Switch to English'} // បង្ហាញអត្ថបទប្រាប់ពេលយក Mouse ទៅដាក់ពីលើ
    >
      {/* បន្ថែមពណ៌ Gradient តិចៗនៅខាងក្រោយទង់ជាតិពេល Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      
      {/* បង្ហាញរូបទង់ជាតិ៖ បើភាសាជា English វាបង្ហាញទង់ជាតិខ្មែរ (សម្រាប់ចុចប្តូរ) និងផ្ទុយមកវិញ */}
      <img 
        src={i18n.language === 'en' ? khFlag : enFlag}
        alt={i18n.language === 'en' ? 'English Flag' : 'Khmer Flag'}
        className="w-full h-full object-cover rounded-full transition-all duration-300 group-hover:scale-105 relative z-10"
      />
    </button>
  );
};

export default LanguageSwitcher;