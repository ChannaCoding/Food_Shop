import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // 🔸 Logic ដើមរបស់បង (រក្សាទុកឱ្យដូចមុនបេះបិទ)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
      }));
      window.dispatchEvent(new Event('authChanged'));
      navigate('/'); // រុញទៅ Home វិញ
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full">
        
        {/* --- Back to Home --- */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#2D4A22] font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#F58220] transition-colors mb-12 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>

        {/* --- Header --- */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-[#2D4A22] uppercase tracking-tighter mb-4">
            Sign <span className="text-[#F58220]">In</span>
          </h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            Enter your credentials to access your account
          </p>
        </div>

        {/* --- Login Form --- */}
        <div className="bg-white border border-gray-100 p-8 md:p-10 shadow-sm rounded-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 p-4 border-l-4 border-red-500 text-red-700 text-[10px] font-black uppercase tracking-widest">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F58220] transition-colors" size={14} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-gray-100 py-3 pl-8 text-sm font-bold text-[#2D4A22] outline-none focus:border-[#2D4A22] transition-all placeholder:text-gray-200"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Password</label>
                <a href="#" className="text-[9px] font-black text-gray-400 hover:text-[#2D4A22] uppercase tracking-widest transition-colors">Forgot?</a>
              </div>
              <div className="relative group">
                <FaLock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F58220] transition-colors" size={14} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-gray-100 py-3 pl-8 pr-10 text-sm font-bold text-[#2D4A22] outline-none focus:border-[#2D4A22] transition-all placeholder:text-gray-200"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#2D4A22]"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2D4A22] text-white py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#1e3317] transition-all shadow-xl shadow-[#2D4A22]/10 active:scale-[0.98]"
            >
              Sign In Now
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#F58220] hover:text-[#2D4A22] font-black ml-2 transition-colors underline underline-offset-4">
                Register Free
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials Hint */}
        <div className="mt-8 flex items-center justify-center gap-4 py-4 px-6 bg-gray-50 border border-gray-100">
           <div className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse"></div>
           <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
             Demo: demo@delish.com / demo123
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;