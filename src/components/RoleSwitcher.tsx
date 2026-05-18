import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function RoleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
           <motion.div 
             initial={{ opacity: 0, y: 20, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
             className="absolute bottom-14 right-0 bg-white shadow-2xl rounded-2xl p-2 w-48 border border-gray-100 flex flex-col gap-1"
           >
              <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-50 mb-1">
                Switch App
              </div>
              <RoleButton label="Customer App" onClick={() => { navigate('/'); setIsOpen(false); }} />
              <RoleButton label="Admin Dashboard" onClick={() => { navigate('/admin'); setIsOpen(false); }} />
              <RoleButton label="Restaurant Panel" onClick={() => { navigate('/restaurant'); setIsOpen(false); }} />
              <RoleButton label="Rider App" onClick={() => { navigate('/rider'); setIsOpen(false); }} />
           </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition"
      >
        {isOpen ? <X size={20} /> : <Settings size={20} />}
      </button>
    </div>
  );
}

function RoleButton({ label, onClick }: { label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
    >
      {label}
    </button>
  );
}
