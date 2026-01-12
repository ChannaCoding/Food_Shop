import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';

const Toast = ({ message, onClose, duration = 3000 }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-32 right-6 z-[200] animate-toast-slide-in">
      {/* --- Custom CSS for Smooth Animation --- */}
      <style>{`
        @keyframes toast-slide-in {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-toast-slide-in {
          animation: toast-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
      
      {/* --- Toast Container --- */}
      <div className="bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-sm p-4 flex items-center gap-4 min-w-[320px] max-w-[400px]">
        
        {/* Success Icon - Using Dark Green Accent */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <HiCheckCircle className="text-[#2D4A22] text-2xl" />
        </div>
        
        {/* Message Text */}
        <div className="flex-1">
          <p className="text-[11px] font-black text-[#2D4A22] uppercase tracking-[0.1em] leading-tight">
            Notification
          </p>
          <p className="text-[12px] text-gray-500 font-medium mt-0.5 tracking-wide">
            {message}
          </p>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-[#1A1A1A] transition-colors p-1"
        >
          <FaTimes size={10} />
        </button>

        {/* Bottom Progress Bar (Optional Luxury Touch) */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-[#2D4A22]/10 w-full overflow-hidden">
          <div 
            className="h-full bg-[#2D4A22] transition-all linear"
            style={{ 
              animation: `progress ${duration}ms linear forwards` 
            }}
          />
        </div>
        <style>{`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Toast;