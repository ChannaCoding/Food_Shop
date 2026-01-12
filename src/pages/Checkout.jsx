import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaUser, FaCreditCard, FaMoneyBillWave, FaArrowLeft } from 'react-icons/fa';
import { MdDeliveryDining, MdOutlineReceiptLong } from 'react-icons/md';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); 
  const [selectedItems, setSelectedItems] = useState([]); 
  
  // 🔸 State ដើមរបស់បង
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    paymentMethod: 'cash' 
  });

  const [errors, setErrors] = useState({});

  // 🔸 Logic ឆែក Login និង Cart (ដើមរបស់បង)
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const storedCart = localStorage.getItem('cart');
    const storedSelected = localStorage.getItem('selectedItems');
    
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      const selected = storedSelected ? JSON.parse(storedSelected) : [];
      
      const itemsToCheckout = cart.filter(item => 
        selected.includes(`${item.id}-${item.type}`)
      );
      
      if (itemsToCheckout.length === 0) {
        navigate('/cart');
        return;
      }
      
      setCartItems(itemsToCheckout);
      setSelectedItems(selected);
    } else {
      navigate('/cart');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{9,10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔸 ការគណនាតម្លៃ (Logic ដើមរបស់បង)
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const delivery = subtotal > 0 ? 2.00 : 0;
    return subtotal + delivery;
  };

  const subtotal = calculateSubtotal();
  const delivery = subtotal > 0 ? 2.00 : 0;
  const total = calculateTotal();

  // 🔸 មុខងារ Place Order (Logic ដើមរបស់បង)
  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cartItems,
      customerInfo: formData,
      subtotal: subtotal,
      delivery: delivery,
      total: total,
      status: 'pending'
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    const remainingCart = JSON.parse(localStorage.getItem('cart') || '[]').filter(
      item => !selectedItems.includes(`${item.id}-${item.type}`)
    );
    localStorage.setItem('cart', JSON.stringify(remainingCart));
    localStorage.removeItem('selectedItems');
    
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/order-success', { state: { order } });
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-100 pb-10">
          <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-[#2D4A22] font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#F58220] transition-colors mb-6 group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
          </button>
          <h1 className="text-4xl font-black text-[#2D4A22] uppercase tracking-tighter">
            Final <span className="text-[#F58220]">Checkout</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2 italic">Secure your transaction</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: DELIVERY & PAYMENT FORM */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Delivery Info */}
            <section>
              <h2 className="text-[11px] font-black text-[#2D4A22] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#F58220]"></span> 01. Shipping Details
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="E.g. John Doe" className={`w-full py-3 bg-transparent border-b-2 outline-none text-sm font-bold text-[#2D4A22] transition-colors ${errors.fullName ? 'border-red-400' : 'border-gray-100 focus:border-[#2D4A22]'}`} />
                  {errors.fullName && <p className="text-red-400 text-[9px] font-bold mt-1 uppercase italic">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="012345678" className={`w-full py-3 bg-transparent border-b-2 outline-none text-sm font-bold text-[#2D4A22] transition-colors ${errors.phone ? 'border-red-400' : 'border-gray-100 focus:border-[#2D4A22]'}`} />
                  {errors.phone && <p className="text-red-400 text-[9px] font-bold mt-1 uppercase italic">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Phnom Penh" className={`w-full py-3 bg-transparent border-b-2 outline-none text-sm font-bold text-[#2D4A22] transition-colors ${errors.city ? 'border-red-400' : 'border-gray-100 focus:border-[#2D4A22]'}`} />
                  {errors.city && <p className="text-red-400 text-[9px] font-bold mt-1 uppercase italic">{errors.city}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street, Building, Room Number" className={`w-full py-3 bg-transparent border-b-2 outline-none text-sm font-bold text-[#2D4A22] transition-colors ${errors.address ? 'border-red-400' : 'border-gray-100 focus:border-[#2D4A22]'}`} />
                  {errors.address && <p className="text-red-400 text-[9px] font-bold mt-1 uppercase italic">{errors.address}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Delivery Notes (Optional)</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="2" placeholder="Special instructions..." className="w-full py-3 bg-transparent border-b-2 border-gray-100 outline-none text-sm font-bold text-[#2D4A22] focus:border-[#2D4A22] resize-none transition-colors" />
                </div>
              </div>
            </section>

            {/* Payment Selection */}
            <section>
              <h2 className="text-[11px] font-black text-[#2D4A22] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#F58220]"></span> 02. Payment Method
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className={`cursor-pointer p-6 border-2 flex items-center gap-4 transition-all ${formData.paymentMethod === 'cash' ? 'border-[#2D4A22] bg-gray-50' : 'border-gray-100'}`}>
                  <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleInputChange} className="hidden" />
                  <FaMoneyBillWave className={formData.paymentMethod === 'cash' ? 'text-[#F58220]' : 'text-gray-300'} size={24} />
                  <div>
                    <p className="text-[10px] font-black text-[#2D4A22] uppercase tracking-widest">Cash on Delivery</p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">Pay at your door</p>
                  </div>
                </label>
                <label className={`cursor-pointer p-6 border-2 flex items-center gap-4 transition-all ${formData.paymentMethod === 'card' ? 'border-[#2D4A22] bg-gray-50' : 'border-gray-100'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="hidden" />
                  <FaCreditCard className={formData.paymentMethod === 'card' ? 'text-[#F58220]' : 'text-gray-300'} size={24} />
                  <div>
                    <p className="text-[10px] font-black text-[#2D4A22] uppercase tracking-widest">Online Payment</p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">Visa / Mastercard</p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 p-8 sticky top-32 border border-gray-100 rounded-sm">
              <h2 className="text-xs font-black text-[#2D4A22] uppercase tracking-[0.3em] mb-8 border-b border-gray-200 pb-4 flex items-center gap-2">
                <MdOutlineReceiptLong size={16}/> Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4 mb-8 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.type}`} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white p-1 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#2D4A22] uppercase tracking-tighter">{item.name}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#2D4A22]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-[#2D4A22]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2 italic text-[#F58220]">Delivery Fee</span>
                  <span className="text-[#2D4A22]">${delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-6">
                  <span className="text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Total Amount</span>
                  <span className="text-3xl font-black text-[#2D4A22]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handlePlaceOrder} className="w-full bg-[#2D4A22] text-white py-5 mt-10 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#1e3317] transition-all shadow-lg shadow-[#2D4A22]/20">
                Place Order Now
              </button>

              <button onClick={() => navigate('/cart')} className="w-full mt-6 text-center text-gray-400 hover:text-[#2D4A22] font-black text-[9px] uppercase tracking-[0.2em] transition-colors italic">
                ← Return to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;