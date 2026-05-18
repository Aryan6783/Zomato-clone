import { Outlet, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';

export default function MobileLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useAppStore((state) => state.cart);

  const getActiveTab = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.includes('/search')) return 'search';
    if (location.pathname.includes('/cart') || location.pathname.includes('/orders')) return 'orders';
    if (location.pathname.includes('/profile')) return 'profile';
    return null; // hide tabs on detail pages?
  };

  const activeTab = getActiveTab();
  const showNav = activeTab !== null && !location.pathname.includes('/restaurant/');

  return (
    <div className="relative h-screen w-full bg-gray-900 flex justify-center overflow-hidden">
      {/* Mobile Simulator Frame */}
      <div className="w-full h-full max-w-md bg-gray-50 shadow-2xl relative flex flex-col overflow-hidden sm:border-x sm:border-gray-200">
        
        {/* Screen Content Wrapper */}
        <div className="flex-1 overflow-y-auto relative bg-gray-50 hide-scrollbar" style={{ paddingBottom: showNav ? '80px' : '0' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <AnimatePresence>
          {showNav && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="absolute bottom-0 w-full bg-white border-t border-gray-100 pb-safe px-6 py-3 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]"
            >
              <NavItem 
                icon={<Home size={24} />} 
                label="Home" 
                isActive={activeTab === 'home'} 
                onClick={() => navigate('/')} 
              />
              <NavItem 
                icon={<Search size={24} />} 
                label="Search" 
                isActive={activeTab === 'search'} 
                onClick={() => navigate('/search')} 
              />
              <div className="relative">
                <NavItem 
                  icon={<ShoppingBag size={24} />} 
                  label="Cart" 
                  isActive={activeTab === 'orders'} 
                  onClick={() => navigate('/cart')} 
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
                onClick={() => navigate('/profile')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
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
