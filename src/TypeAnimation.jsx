import React from 'react';
import Typewriter from 'typewriter-effect';
import { useTranslation } from 'react-i18next';

const TypeAnimation = () => {
  const { t, i18n } = useTranslation();
  
  // ឆែកមើលថា តើបច្ចុប្បន្នជាភាសាខ្មែរមែនដែរឬទេ?
  const isKhmer = i18n.language === "kh";

  return (
    /* 🔸 ការប្រើប្រាស់ Dynamic Class: 
       បើជាភាសាអង់គ្លេស យើងឱ្យវាចេញអក្សរធំទាំងអស់ (uppercase) 
       តែបើភាសាខ្មែរ យើងមិនប្រើ uppercase ទេ ដើម្បីកុំឱ្យខូចទម្រង់អក្សរ
    */
    <h1 className={`text-5xl lg:text-7xl pb-5 font-bold bg-white bg-clip-text text-transparent ${isKhmer ? '' : 'uppercase'}`}>
      <Typewriter
        /* 💡 គន្លឹះសំខាន់: key={i18n.language} 
           ជួយឱ្យ Typewriter ចាប់ផ្តើមវាយអក្សរឡើងវិញភ្លាមៗ នៅពេលអ្នកប្រើប្រាស់ប្តូរភាសា។ 
           បើគ្មាន Key នេះទេ វានឹងនៅវាយភាសាចាស់ទាល់តែចប់ Loop ទើបប្តូរ។
        */
        key={i18n.language}
        options={{ 
          loop: true,     // ឱ្យវាវាយហើយ វាយទៀតមិនចេះចប់
          delay: 75       // ល្បឿននៃការវាយអក្សរ (75ms ក្នុងមួយតួ)
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(t("typeAnimation.text1")) // វាយឃ្លាទី ១ ពី file translation.json
            .pauseFor(1500)                       // ឈប់សម្រាក ១.៥ វិនាទី
            .deleteAll()                          // លុបចេញវិញទាំងអស់
            .typeString(t("typeAnimation.text2")) // វាយឃ្លាទី ២
            .pauseFor(1500)                       // ឈប់សម្រាក ១.៥ វិនាទី
            .start();                             // ចាប់ផ្តើមដំណើរការ
        }}
      />
    </h1>
  );
};

export default TypeAnimation;