import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHistory, FaCalendar, FaMapMarkerAlt, FaPhone, FaCreditCard, FaMoneyBillWave, FaChevronDown, FaChevronUp, FaShoppingBag, FaArrowLeft, FaUser } from 'react-icons/fa';
import { MdDeliveryDining, MdOutlineReceiptLong } from 'react-icons/md';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); 
  const [expandedOrders, setExpandedOrders] = useState([]); 
  const [filterStatus, setFilterStatus] = useState('all'); 

  // 🔸 Logic ទាញទិន្នន័យដើម (មិនកែប្រែ)
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const sortedOrders = storedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    setOrders(sortedOrders);
  }, [navigate]);

  // 🔸 Logic បើក/បិទ ដើម (មិនកែប្រែ)
  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // 🔸 កែសម្រួលពណ៌ Status ឱ្យមើលទៅ Premium ជាងមុន
  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'delivered': return 'text-green-600 bg-green-50 border-green-100';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  if (orders.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#FDFDFD] pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gray-50 border border-gray-100 flex items-center justify-center mb-8">
          <FaHistory className="text-3xl text-gray-200" />
        </div>
        <h2 className="text-2xl font-black text-[#2D4A22] uppercase tracking-tighter mb-4">No History Yet</h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-10 max-w-xs leading-loose">
          You haven't placed any orders. Start exploring our premium menu today.
        </p>
        <button onClick={() => navigate('/MenuFood')} className="px-10 py-4 bg-[#2D4A22] text-white font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#1e3317] transition-all">
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6 md:px-14">
      <div className="max-w-5xl mx-auto">
        
        {/* --- Header ថ្មីបែប Minimal --- */}
        <div className="mb-12 border-b border-gray-100 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#2D4A22] font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#F58220] transition-colors mb-6 group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </button>
            <h1 className="text-4xl font-black text-[#2D4A22] uppercase tracking-tighter">
              Order <span className="text-[#F58220]">History</span>
            </h1>
          </div>

          {/* Filter Tabs ដូច Logic ដើមបង */}
          <div className="flex gap-2 p-1 bg-gray-50 border border-gray-100 rounded-sm">
            {['all', 'pending', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
                  filterStatus === status ? 'bg-white text-[#2D4A22] shadow-sm' : 'text-gray-400 hover:text-[#2D4A22]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* --- List Orders --- */}
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrders.includes(order.id);
            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                
                {/* ក្បាល Order (Summary) */}
                <div 
                  className={`p-6 cursor-pointer flex flex-wrap items-center justify-between gap-6 transition-colors ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                  onClick={() => toggleOrderExpand(order.id)}
                >
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex w-14 h-14 bg-white border border-gray-100 items-center justify-center text-[#2D4A22]">
                      <FaShoppingBag size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#F58220] uppercase tracking-widest mb-1">#{order.id}</p>
                      <h3 className="text-sm font-black text-[#2D4A22] uppercase tracking-tight">{formatDate(order.date)}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 ml-auto sm:ml-0">
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
                      <p className="text-sm font-black text-[#2D4A22]">${order.total.toFixed(2)}</p>
                    </div>
                    <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                    {isExpanded ? <FaChevronUp className="text-gray-300" /> : <FaChevronDown className="text-gray-300" />}
                  </div>
                </div>

                {/* ព័ត៌មានលម្អិត (Expanded) */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-8 grid lg:grid-cols-2 gap-12 animate-fadeIn">
                    
                    {/* បញ្ជីម្ហូប */}
                    <div>
                      <h4 className="text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                        <MdOutlineReceiptLong className="text-[#F58220]" /> Items
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover border border-gray-100" />
                              <div>
                                <p className="text-[10px] font-black text-[#2D4A22] uppercase">{item.name}</p>
                                <p className="text-[9px] font-bold text-gray-400">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-[#2D4A22]">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ព័ត៌មានដឹកជញ្ជូន និងប៊ូតុង Reorder */}
                    <div className="space-y-8">
                      <div className="bg-gray-50 p-5 space-y-3">
                        <div className="flex gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          <FaUser size={10} className="mt-0.5" /> <span>{order.customerInfo.fullName}</span>
                        </div>
                        <div className="flex gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          <FaMapMarkerAlt size={10} className="mt-0.5" /> <span>{order.customerInfo.address}</span>
                        </div>
                        <div className="flex gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest pt-3 border-t border-gray-200">
                          <FaCreditCard size={10} className="mt-0.5" /> <span>{order.customerInfo.paymentMethod}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
                          localStorage.setItem('cart', JSON.stringify([...currentCart, ...order.items]));
                          window.dispatchEvent(new Event('cartUpdated'));
                          navigate('/cart');
                        }}
                        className="w-full py-4 bg-[#2D4A22] text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#F58220] transition-colors shadow-lg"
                      >
                        Reorder These Items
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;