import React from 'react';
import Benner from '../components/Benner';
import Category from '../components/Category';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      {/* 🔸 ផ្នែកផ្ទាំងផ្សព្វផ្សាយខាងលើគេបង្អស់ (Hero Section / Banner) */}
      <Benner />

      {/* 🔸 ផ្នែកបង្ហាញប្រភេទមុខម្ហូបសំខាន់ៗ (Food Categories) */}
      <Category />

      {/* 🔸 ផ្នែកបង្ហាញពីចំណុចពិសេសរបស់ហាង ឬសេវាកម្ម (Features / Services) */}
      <Features />

      {/* 🔸 ផ្នែកខាងក្រោមបង្អស់នៃគេហទំព័រ (Footer Information) */}
      <Footer />
    </div>
  );
};

export default Home;