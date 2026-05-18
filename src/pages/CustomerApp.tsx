import { motion } from 'motion/react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';
import { useState } from 'react';
import CustomerHome from './CustomerHome';

export default function CustomerApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'orders' | 'profile'>('home');
  const cart = useAppStore((state) => state.cart);

  return (
    <div className="relative h-screen w-full bg-gray-50 flex justify-center overflow-hidden">
      {/* Mobile container - restricts width on desktop to simulate mobile */}
      <div className="w-full h-full max-w-md bg-white shadow-2xl relative flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' && <CustomerHome />}
          {activeTab === 'search' && <div className="p-4 pt-12 text-center text-gray-500">Search Page</div>}
          {activeTab === 'orders' && <div className="p-4 pt-12 text-center text-gray-500">Orders Page</div>}
          {activeTab === 'profile' && <div className="p-4 pt-12 text-center text-gray-500">Profile Page</div>}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 pb-safe px-6 py-3 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
          <NavItem 
            icon={<Home size={24} />} 
            label="Home" 
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <NavItem 
            icon={<Search size={24} />} 
            label="Search" 
            isActive={activeTab === 'search'} 
            onClick={() => setActiveTab('search')} 
          />
          <div className="relative">
             <NavItem 
              icon={<ShoppingBag size={24} />} 
              label="Cart" 
              isActive={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')} 
            />
            {cart.length > 0 && (
              <span className="absolute top-0 right-1 bg-primary-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                {cart.length}
              </span>
            )}
          </div>
          <NavItem 
            icon={<User size={24} />} 
            label="Profile" 
            isActive={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
          />
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-colors duration-200",
        isActive ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <motion.div
        animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {icon}
      </motion.div>
      <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>
        {label}
      </span>
    </button>
  );
}
