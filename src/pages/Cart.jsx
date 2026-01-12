import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { MdDeliveryDining, MdOutlineReceiptLong } from 'react-icons/md';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Check authentication on mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    loadCart();
  }, [navigate]);

  const loadCart = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  };

  const toggleItemSelection = (itemId, itemType) => {
    const itemKey = `${itemId}-${itemType}`;
    setSelectedItems(prev => 
      prev.includes(itemKey) 
        ? prev.filter(key => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  const isItemSelected = (itemId, itemType) => {
    return selectedItems.includes(`${itemId}-${itemType}`);
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      const allItemKeys = cartItems.map(item => `${item.id}-${item.type}`);
      setSelectedItems(allItemKeys);
    }
  };

  const isAllSelected = () => {
    return cartItems.length > 0 && selectedItems.length === cartItems.length;
  };

  const updateQuantity = (itemId, itemType, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === itemId && item.type === itemType
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleQuantityInput = (itemId, itemType, value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateQuantity(itemId, itemType, numValue);
    } else if (value === '') {
      const updatedCart = cartItems.map(item => 
        item.id === itemId && item.type === itemType
          ? { ...item, quantity: '' }
          : item
      );
      setCartItems(updatedCart);
    }
  };

  const handleQuantityBlur = (itemId, itemType, currentQty) => {
    if (currentQty === '' || currentQty < 1) {
      updateQuantity(itemId, itemType, 1);
    }
  };

  const removeFromCart = (itemId, itemType) => {
    const updatedCart = cartItems.filter(item => !(item.id === itemId && item.type === itemType));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    if(window.confirm('Are you sure you want to clear your entire cart?')) {
        setCartItems([]);
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter(item => isItemSelected(item.id, item.type))
      .reduce((total, item) => total + (item.price * item.quantity), 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const delivery = subtotal > 0 && selectedItems.length > 0 ? 2.00 : 0;
    return (subtotal + delivery).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to proceed to checkout!');
      return;
    }
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    navigate('/checkout');
  };

  // --- EMPTY STATE UI ---
  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#FDFDFD] flex items-center justify-center pt-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 shadow-sm">
            <FaShoppingCart className="text-2xl text-gray-300" />
          </div>
          <h2 className="text-xl font-black text-[#2D4A22] uppercase tracking-widest mb-3">Your cart is empty</h2>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-8 leading-loose">
            It looks like you haven't added any delicious meals yet. Start exploring our menu today!
          </p>
          <Link to="/MenuFood" className="block w-full bg-[#2D4A22] text-white py-4 px-8 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#1e3317] transition-all shadow-lg shadow-[#2D4A22]/20 text-center">
             Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const deliveryFee = 2.00;
  const total = calculateTotal();

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-gray-100 pb-10 gap-6">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#2D4A22] font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#F58220] transition-colors mb-6 group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
            </button>
            <h1 className="text-4xl font-black text-[#2D4A22] uppercase tracking-tighter">My Shopping <span className="text-[#F58220]">Cart</span></h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">You have {cartItems.length} items in your list</p>
          </div>
          <button onClick={clearCart} className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 flex items-center gap-2 transition-colors">
            <FaTrash size={10}/> Clear All Items
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-4 py-2 border-b border-gray-50">
              <input
                type="checkbox"
                checked={isAllSelected()}
                onChange={toggleSelectAll}
                className="w-4 h-4 accent-[#2D4A22] cursor-pointer"
              />
              <span className="text-[10px] font-black text-[#2D4A22] uppercase tracking-widest">Select All Items ({selectedItems.length}/{cartItems.length})</span>
            </div>

            {cartItems.map((item) => (
              <div key={`${item.id}-${item.type}`} className={`group bg-white rounded-sm p-6 border transition-all duration-300 ${isItemSelected(item.id, item.type) ? 'border-[#2D4A22]/20 shadow-md' : 'border-gray-100'}`}>
                <div className="flex flex-col sm:flex-row gap-8">
                  
                  {/* Item Image & Checkbox */}
                  <div className="relative">
                    <div className="w-full sm:w-32 h-32 rounded-sm overflow-hidden bg-gray-50 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <input
                      type="checkbox"
                      checked={isItemSelected(item.id, item.type)}
                      onChange={() => toggleItemSelection(item.id, item.type)}
                      className="absolute -top-2 -left-2 w-5 h-5 accent-[#2D4A22] shadow-sm cursor-pointer"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] uppercase font-black tracking-[0.2em] text-[#F58220]">{item.category}</span>
                        <h3 className="text-lg font-black text-[#2D4A22] uppercase tracking-tight mt-1">{item.name}</h3>
                        <p className="text-xl font-black text-[#2D4A22] mt-2">${item.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.type)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <FaTrash size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      {/* Qty Controls */}
                      <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.type, (item.quantity || 1) - 1)}
                          className="px-3 py-2 hover:bg-gray-50 transition-colors border-r border-gray-200"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={8} />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => handleQuantityInput(item.id, item.type, e.target.value)}
                          onBlur={() => handleQuantityBlur(item.id, item.type, item.quantity)}
                          className="w-10 text-center text-[11px] font-black text-[#2D4A22] outline-none"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, item.type, (item.quantity || 0) + 1)}
                          className="px-3 py-2 hover:bg-gray-50 transition-colors border-l border-gray-200"
                        >
                          <FaPlus size={8} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">Subtotal</p>
                        <p className="text-lg font-black text-[#2D4A22]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-8 rounded-sm sticky top-32">
              <h2 className="text-xs font-black text-[#2D4A22] uppercase tracking-[0.3em] mb-10 border-b border-gray-200 pb-4 flex items-center gap-2">
                <MdOutlineReceiptLong size={16}/> Summary
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>Cart Subtotal</span>
                  <span className="text-[#2D4A22]">${subtotal}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <MdDeliveryDining size={16} className="text-[#F58220]" /> Delivery Fee
                  </span>
                  <span className="text-[#2D4A22]">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-6">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-[#2D4A22] uppercase tracking-[0.2em]">Grand Total</span>
                      <span className="text-3xl font-black text-[#2D4A22]">${total}</span>
                   </div>
                </div>
              </div>

              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-[#2D4A22] text-white py-5 px-8 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#1e3317] transition-all shadow-lg shadow-[#2D4A22]/20 mb-6"
              >
                Checkout Now
              </button>

              <Link to="/MenuFood" className="block text-center text-gray-400 hover:text-[#2D4A22] font-black text-[9px] uppercase tracking-widest transition-colors">
                ← Continue Shopping
              </Link>

              {/* Promo Banner */}
              <div className="mt-12 p-5 bg-white border border-gray-100 rounded-sm relative overflow-hidden group">
                <div className="relative z-10">
                    <p className="text-[10px] font-black text-[#2D4A22] uppercase tracking-widest mb-2">Special Offer</p>
                    <p className="text-[9px] text-gray-400 leading-relaxed font-bold uppercase tracking-tighter">Free delivery for orders over $20.00!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;