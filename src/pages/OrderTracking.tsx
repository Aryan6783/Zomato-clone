import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Search, ShoppingBag, User, Activity, MapPin, CheckCircle2, ChevronRight, Navigation, MessageCircle, Phone } from 'lucide-react';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router';

// This is a fake tracking component for the demo
export default function OrderTracking() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center bg-gray-50 h-screen overflow-hidden">
      <div className="w-full font-sans max-w-md relative flex flex-col h-full bg-white">
        
        {/* Fake Map Background */}
        <div className="absolute inset-0 z-0 bg-amber-50">
          <img src="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b680c1df07fcf8de_Map%20Snazzy%20Light.png" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
          
          {/* Animated Route Line */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            <motion.path
               d="M 100 600 Q 200 400 300 200"
               fill="transparent"
               stroke="#f43f5e"
               strokeWidth="4"
               strokeDasharray="10 10"
               initial={{ strokeDashoffset: 1000 }}
               animate={{ strokeDashoffset: 0 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </svg>
          
          {/* Rider Marker */}
          <motion.div 
            className="absolute z-10 w-12 h-12 bg-white rounded-full p-1 shadow-xl flex items-center justify-center border-2 border-primary-500"
            initial={{ x: 100, y: 600 }}
            animate={{ x: 150, y: 500 }}
            transition={{ duration: 5, ease: "easeInOut" }}
          >
            <Navigation size={24} className="text-primary-600 -rotate-45" />
          </motion.div>
          
          {/* Destination Marker */}
          <div className="absolute z-10 left-[280px] top-[180px] w-10 h-10 bg-gray-900 rounded-full p-2 shadow-xl flex items-center justify-center">
            <Home size={20} className="text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 bg-white/80 backdrop-blur-xl px-5 pt-safe-top pb-4 shadow-sm">
           <div className="flex items-center justify-between">
              <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 bg-white/50">
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600">Arriving in</span>
                <span className="font-display font-bold text-xl text-gray-900">15 mins</span>
              </div>
              <div className="w-10"></div>
           </div>
        </div>

        <div className="flex-1"></div>

        {/* Tracking Card */}
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="relative z-20 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-6 pt-8 pb-10"
        >
           <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full"></div>

           {/* Status */}
           <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                 <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <div>
                 <h2 className="font-display font-bold text-2xl text-gray-900 leading-none mb-1">On the way</h2>
                 <p className="text-gray-500 font-medium">Your rider has picked up the order</p>
              </div>
           </div>

           {/* Rider Details */}
           <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 flex items-center gap-4 mb-6 relative overflow-hidden">
             <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
               <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop" className="w-full h-full object-cover" />
             </div>
             <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">Alex Johnson</h3>
                <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                   <Star size={14} className="fill-amber-400 text-amber-400" /> 4.9 • 1.2k deliveries
                </p>
             </div>
             
             {/* Action Buttons */}
             <div className="flex flex-col gap-2">
                <button className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center hover:bg-primary-200 transition">
                  <Phone size={18} />
                </button>
             </div>
           </div>

           {/* Order Summary */}
           <div className="space-y-4">
             <h4 className="font-display font-bold text-lg text-gray-900">Order Details</h4>
             <div className="flex justify-between items-center text-sm font-medium text-gray-600">
               <span>Order #489201</span>
               <button className="text-primary-600 font-bold hover:underline">View Receipt</button>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
