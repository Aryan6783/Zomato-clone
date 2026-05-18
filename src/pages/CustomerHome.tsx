import { motion } from 'motion/react';
import { MapPin, Bell, Star, Clock, ChevronRight, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const CATEGORIES = [
  { id: 1, name: 'Pizza', emoji: '🍕', color: 'bg-orange-100' },
  { id: 2, name: 'Burger', emoji: '🍔', color: 'bg-amber-100' },
  { id: 3, name: 'Sushi', emoji: '🍣', color: 'bg-rose-100' },
  { id: 4, name: 'Healthy', emoji: '🥗', color: 'bg-green-100' },
  { id: 5, name: 'Dessert', emoji: '🍩', color: 'bg-pink-100' },
];

const RESTAURANTS = [
  {
    id: '1',
    name: 'Burger King',
    rating: 4.5,
    time: '20-30 min',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop',
    tags: ['Burger', 'American', 'Fast Food'],
    discount: '40% OFF',
    featured: true
  },
  {
    id: '2',
    name: 'Sushi master',
    rating: 4.8,
    time: '30-40 min',
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1579871494447-0811cf80d49d?w=500&h=300&fit=crop',
    tags: ['Sushi', 'Japanese', 'Asian'],
    discount: 'Free Delivery',
    featured: false
  },
  {
    id: '3',
    name: 'Pizza Hut',
    rating: 4.2,
    time: '25-35 min',
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1604381538336-11f8e12d5cd5?w=500&h=300&fit=crop',
    tags: ['Pizza', 'Italian'],
    discount: '20% OFF',
    featured: false
  }
];

export default function CustomerHome() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Header section */}
      <div className="bg-white px-5 pt-8 pb-4 sticky top-0 z-40 bg-opacity-95 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-primary-600 font-bold uppercase tracking-wider flex items-center gap-1">
              <MapPin size={12} strokeWidth={3} /> Delivering to
            </span>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="font-display font-semibold text-gray-900 text-lg">Home - New York</span>
              <ChevronRight size={18} className="text-gray-400 mt-0.5" />
            </div>
          </div>
          <button className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center relative overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=User&background=f43f5e&color=fff" className="h-full w-full object-cover" />
          </button>
        </div>

        {/* Search Bar - Fake */}
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="w-full bg-gray-100 text-gray-900 text-sm font-medium rounded-2xl pl-11 pr-4 py-3.5 shadow-sm border border-transparent focus:border-primary-200 outline-none transition-all flex items-center text-gray-500 cursor-text">
            Search for restaurant, cuisine or a dish
          </div>
          <div className="absolute inset-y-0 right-3 flex items-center">
             <div className="h-7 w-px bg-gray-200 mx-2"></div>
             <button className="p-1.5 text-primary-600 font-bold text-sm">
                Voice
             </button>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-8 pb-6">
        {/* Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full aspect-[21/9] rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 mt-2 p-5 flex flex-col justify-center text-white relative overflow-hidden shadow-lg shadow-primary-500/20"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="absolute left-10 bottom-0 w-24 h-24 bg-white/10 rounded-full blur-xl mb-[-20px]"></div>
          
          <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-max mb-2">
            Limited Time
          </span>
          <h2 className="font-display font-bold text-2xl leading-tight mb-1">Get 50% OFF<br/>on first order</h2>
          <span className="text-xs text-white/80 font-medium">Use code: WELCOME50</span>
          
          <img 
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&auto=format" 
            className="absolute -right-4 -bottom-4 w-36 h-36 object-cover rounded-full border-4 border-white/10 shadow-2xl z-10"
            alt="Burger"
          />
        </motion.div>

        {/* Categories Carousel */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="font-display font-bold text-lg text-gray-900">What's on your mind?</h3>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2 -mx-5 px-5">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className="flex flex-col items-center gap-2 shrink-0 group"
              >
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-sm transition-all duration-300",
                  cat.color,
                  activeCategory === cat.id ? "ring-2 ring-offset-2 ring-primary-500 scale-105" : "group-hover:scale-105"
                )}>
                  {cat.emoji}
                </div>
                <span className={cn(
                  "text-xs font-semibold text-gray-700",
                  activeCategory === cat.id && "text-primary-600"
                )}>{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured / Trending */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 p-1.5 rounded-full text-orange-600">
               <TrendingUp size={16} strokeWidth={3} />
            </div>
            <h3 className="font-display font-bold text-xl text-gray-900 tracking-tight">Trending this week</h3>
          </div>
          
          <div className="flex flex-col gap-5">
            {RESTAURANTS.map((restaurant, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                key={restaurant.id} 
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] cursor-pointer group hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-44 w-full relative overflow-hidden">
                  <img src={restaurant.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={restaurant.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-gray-900 shadow-sm">
                    {restaurant.time}
                  </div>
                  
                  {restaurant.discount && (
                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-md flex items-center gap-1">
                      <span className="drop-shadow-sm">{restaurant.discount}</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-900 flex items-center gap-1 shadow-md">
                    <span>{restaurant.rating}</span>
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-display font-bold text-lg text-gray-900">{restaurant.name}</h4>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs font-medium mb-3">
                    <span className="truncate">{restaurant.tags.join(' • ')}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-gray-400" />
                      {restaurant.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-gray-400" />
                      {restaurant.distance}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
