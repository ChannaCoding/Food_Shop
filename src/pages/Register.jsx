import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaArrowLeft } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // 🔸 Logic ដើមរបស់បង (មិនកែប្រែ)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === formData.email)) {
      setError('This email is already registered!');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('currentUser', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }));

    window.dispatchEvent(new Event('authChanged'));
    navigate('/'); 
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full">
        
        {/* --- Back Button --- */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#2D4A22] font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#F58220] transition-colors mb-10 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>

        {/* --- Header --- */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-[#2D4A22] uppercase tracking-tighter mb-4">
            Join <span className="text-[#F58220]">Us</span>
          </h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            Create a premium account to start ordering
          </p>
        </div>

        {/* --- Form --- */}
        <div className="bg-white border border-gray-100 p-8 md:p-10 shadow-sm rounded-sm">
          <form onSubmit={handleSubmit} className="space-y-7">
            
            {error && (
              <div className="bg-red-50 p-4 border-l-4 border-red-500 text-red-700 text-[10px] font-black uppercase tracking-widest">
                {error}
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Full Name</label>
              <div className="relative group">
                <FaUser className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F58220] transition-colors" size={13} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-gray-100 py-2 pl-8 text-sm font-bold text-[#2D4A22] outline-none focus:border-[#2D4A22] transition-all"
                  placeholder="EX. JOHN DOE"
                  required
                />
              </div>
            </div>

            {/* Email & Phone (Grid) */}
            <div className="grid grid-cols-1 gap-7">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Email Address</label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F58220] transition-colors" size={13} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-gray-100 py-2 pl-8 text-sm font-bold text-[#2D4A22] outline-none focus:border-[#2D4A22] transition-all"
                    placeholder="NAME@EMAIL.COM"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Phone Number</label>
                <div className="relative group">
                  <FaPhone className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F58220] transition-colors" size={13} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-gray-100 py-2 pl-8 text-sm font-bold text-[#2D4A22] outline-none focus:border-[#2D4A22] transition-all"
                    placeholder="+855 00 000 000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Passwords (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Password</label>
                <div className="relative group">
                  <FaLock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F58220] transition-colors" size={13} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-gray-100 py-2 pl-8 pr-8 text-sm font-bold text-[#2D4A22] outline-none focus:border-[#2D4A22] transition-all"
                    placeholder="••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300">
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Confirm</label>
                <div className="relative group">
                  <FaLock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F58220] transition-colors" size={13} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-gray-100 py-2 pl-8 pr-8 text-sm font-bold text-[#2D4A22] outline-none focus:border-[#2D4A22] transition-all"
                    placeholder="••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300">
                    {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-center cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-[#2D4A22] border-gray-200 rounded" required />
              <span className="ml-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#2D4A22] transition-colors">
                I accept terms & conditions
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2D4A22] text-white py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#1e3317] transition-all shadow-xl shadow-[#2D4A22]/10 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Already have an account?{' '}
              <Link to="/login" className="text-[#F58220] font-black ml-2 underline underline-offset-4 hover:text-[#2D4A22] transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;