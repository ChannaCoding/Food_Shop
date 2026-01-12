import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaMapMarkerAlt, FaPhone, FaUser, FaCreditCard, FaMoneyBillWave, FaHome, FaList, FaArrowRight } from 'react-icons/fa';
import { MdDeliveryDining, MdOutlineReceiptLong } from 'react-icons/md';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  // 🔸 រក្សា Logic ដើមរបស់បងទាំងស្រុង
  useEffect(() => {
    if (location.state?.order) {
      setOrderData(location.state.order);
    } else {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (orders.length > 0) {
        setOrderData(orders[orders.length - 1]);
      } else {
        navigate('/');
      }
    }
  }, [location, navigate]);

  if (!orderData) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#2D4A22] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.3em]">Loading Order...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6 md:px-14">
      <div className="max-w-4xl mx-auto">
        
        {/* --- ក្បាលទំព័រអបអរសាទរ (Premium Header) --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#2D4A22] rounded-full mb-8 shadow-2xl shadow-[#2D4A22]/20 animate-bounce">
            <FaCheckCircle className="text-5xl text-[#F58220]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#2D4A22] uppercase tracking-tighter mb-4">
            Success<span className="text-[#F58220]">!</span>
          </h1>
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.4em]">
            Your order has been received and is being prepared
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-10">
          
          {/* ផ្នែកខាងឆ្វេង: បញ្ជីមុខម្ហូប (Order Summary) */}
          <div className="md:col-span-7 space-y-8">
            <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm">
              <h2 className="text-[11px] font-black text-[#2D4A22] uppercase tracking-[0.3em] mb-8 flex items-center gap-3 border-b border-gray-50 pb-4">
                <MdOutlineReceiptLong className="text-[#F58220]" size={18} /> Receipt Details
              </h2>
              
              <div className="space-y-6 mb-10">
                {orderData.items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 p-1 border border-gray-100 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-[#2D4A22] uppercase tracking-tight">{item.name}</h3>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                          {item.quantity} Unit{item.quantity > 1 ? 's' : ''} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-[#2D4A22]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* តារាងតម្លៃ */}
              <div className="bg-gray-50 p-6 space-y-4">
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-[#2D4A22]">${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Delivery Service</span>
                  <span className="text-[#2D4A22]">${orderData.delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-gray-200">
                  <span className="text-[11px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Total Amount</span>
                  <span className="text-3xl font-black text-[#F58220] tracking-tighter">${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ផ្នែកខាងស្តាំ: ស្ថានភាព និងព័ត៌មានដឹកជញ្ជូន */}
          <div className="md:col-span-5 space-y-8">
            {/* កាតស្ថានភាពការដឹកជញ្ជូន */}
            <div className="bg-[#2D4A22] p-8 rounded-sm text-white shadow-xl">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F58220] mb-2">Estimated Arrival</p>
              <h3 className="text-4xl font-black tracking-tighter mb-4">30-45 MIN</h3>
              <div className="w-full bg-white/10 h-[2px] mb-6 overflow-hidden">
                <div className="bg-[#F58220] h-full w-1/2 animate-pulse"></div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest">Order ID: #{orderData.id}</p>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{formatDate(orderData.date)}</p>
              </div>
            </div>

            {/* ព័ត៌មានអតិថិជន */}
            <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm">
              <h2 className="text-[11px] font-black text-[#2D4A22] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <MdDeliveryDining className="text-[#F58220]" size={18} /> Delivery to
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaUser className="text-[#F58220] mt-1" size={12} />
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Full Name</p>
                    <p className="text-[11px] font-black text-[#2D4A22] uppercase">{orderData.customerInfo.fullName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaPhone className="text-[#F58220] mt-1" size={12} />
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Contact</p>
                    <p className="text-[11px] font-black text-[#2D4A22] uppercase">{orderData.customerInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-[#F58220] mt-1" size={12} />
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                    <p className="text-[11px] font-black text-[#2D4A22] uppercase leading-relaxed">{orderData.customerInfo.address}, {orderData.customerInfo.city}</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-50 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 flex items-center justify-center rounded-full text-[#2D4A22]">
                    {orderData.customerInfo.paymentMethod === 'cash' ? <FaMoneyBillWave size={16} /> : <FaCreditCard size={16} />}
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Method</p>
                    <p className="text-[11px] font-black text-[#2D4A22] uppercase">{orderData.customerInfo.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Digital Payment'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ប៊ូតុងត្រឡប់ក្រោយ --- */}
        <div className="mt-20 flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => navigate('/')} 
            className="px-12 py-5 bg-[#2D4A22] text-white font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#1e3317] transition-all flex items-center justify-center gap-4 group"
          >
            <FaHome size={14} /> Back to Home
          </button>
          <button 
            onClick={() => navigate('/order-history')} 
            className="px-12 py-5 border-2 border-[#2D4A22] text-[#2D4A22] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#2D4A22] hover:text-white transition-all flex items-center justify-center gap-4 group"
          >
            <FaList size={14} /> My History <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;