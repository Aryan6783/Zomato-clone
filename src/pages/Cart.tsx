import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Receipt, Clock, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router';

export default function Cart() {
  const cart = useAppStore((state) => state.cart);
  const navigate = useNavigate();

  // Group items by id to show quantities
  const groupedCart = cart.reduce((acc: any, item: any) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const items = Object.values(groupedCart) as any[];
  const itemTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxes = itemTotal * 0.05;
  const deliveryFee = itemTotal > 0 ? 3.50 : 0;
  const grandTotal = itemTotal + taxes + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="w-48 h-48 mb-8 relative"
        >
          <img src="https://illustrations.popsy.co/amber/shipped.svg" alt="Empty Cart" className="w-full h-full object-contain opacity-70" />
        </motion.div>
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-2 text-center">Your cart is empty</h2>
        <p className="text-gray-500 text-center mb-8">Looks like you haven't added anything to your cart yet.</p>
        <button onClick={() => navigate('/')} className="w-full max-w-[200px] bg-primary-600 font-bold text-white py-4 rounded-2xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 active:scale-95 transition">
          Browse items
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex-col font-sans bg-gray-50 min-h-full pb-32">
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-4 sticky top-0 z-40 flex items-center gap-4 bg-white/95 backdrop-blur-md shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-display font-bold text-xl text-gray-900">Checkout</h1>
      </div>

      <div className="p-5 space-y-6">
        {/* Delivery Location */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4 items-center cursor-pointer hover:border-primary-200 transition">
          <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
             <MapPin size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">Home</h3>
            <p className="text-xs text-gray-500 line-clamp-1">123 Street Name, New York, NY 10001</p>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        {/* Time */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4 items-center">
          <div className="bg-orange-50 p-3 rounded-2xl text-orange-600">
             <Clock size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Delivery in</span>
            <span className="font-bold text-gray-900">25 - 35 mins</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
           <h3 className="font-display font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
             <Receipt size={20} className="text-gray-400" /> Your Order
           </h3>
           <div className="space-y-4 border-b border-gray-100 pb-4 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-3">
                     <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 mt-1">
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h4>
                       <p className="text-xs text-gray-500 mt-0.5">${item.price.toFixed(2)}</p>
                     </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className="font-bold text-gray-900 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                     <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                       <button className="text-primary-600 px-1 font-bold text-xs" onClick={() => useAppStore.getState().removeFromCart(item.id)}>-</button>
                       <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
                       <button className="text-primary-600 px-1 font-bold text-xs" onClick={() => useAppStore.getState().addToCart(item)}>+</button>
                     </div>
                  </div>
                </div>
              ))}
           </div>

           {/* Bill Details */}
           <div className="space-y-2 text-sm">
             <div className="flex justify-between text-gray-600">
               <span>Item Total</span>
               <span className="font-medium text-gray-900">${itemTotal.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-gray-600">
               <span>Delivery Fee</span>
               <span className="font-medium text-gray-900">${deliveryFee.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-gray-600 border-b border-gray-100 pb-3">
               <span>Taxes</span>
               <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
             </div>
             <div className="flex justify-between py-2 items-center">
               <span className="font-bold text-gray-900 text-lg">Grand Total</span>
               <span className="font-display font-bold text-xl text-primary-600">${grandTotal.toFixed(2)}</span>
             </div>
           </div>
        </div>

        {/* Payment Buttons would go here */}
        <div className="fixed bottom-0 left-0 w-full p-5 bg-white border-t border-gray-100 pb-safe z-50">
          <div className="max-w-md mx-auto flex items-center justify-between gap-4">
             <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Total Pay</span>
                <span className="font-display font-bold text-2xl text-gray-900">${grandTotal.toFixed(2)}</span>
             </div>
             <button 
               onClick={() => {
                 useAppStore.getState().clearCart();
                 navigate('/tracking');
               }}
               className="flex-1 bg-gray-900 font-bold text-white py-4 rounded-2xl shadow-xl shadow-gray-900/20 hover:bg-black active:scale-95 transition flex items-center justify-center gap-2"
             >
               Place Order 
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
