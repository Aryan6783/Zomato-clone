import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ChevronLeft, Star, Clock, MapPin, Share2, Search, Plus } from 'lucide-react';
import { useAppStore } from '../store';
import { useState } from 'react';
import { cn } from '../lib/utils';

const RESTAURANTS_DATA = {
  '1': {
    name: 'Burger King',
    rating: 4.5,
    reviews: '1.2k',
    time: '20-30 min',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop',
    tags: ['Burger', 'American', 'Fast Food'],
    about: 'Home of the Whopper. Serving premium burgers and fast food since 1954.',
    menuCategories: [
      {
        id: 'c1', name: 'Recommended', items: [
          { id: 'm1', name: 'Whopper Meal', description: 'Classic Whopper with medium fries & drink', price: 12.99, isVeg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
          { id: 'm2', name: 'Impossible Whopper', description: 'Plant-based patty with classic toppings', price: 13.99, isVeg: true, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop' },
        ]
      },
      {
        id: 'c2', name: 'Value Meals', items: [
           { id: 'm3', name: 'Chicken Royale Meal', description: 'Crispy chicken sandwich combo', price: 10.99, isVeg: false, image: null },
        ]
      }
    ]
  },
  '2': {
    name: 'Sushi master',
    rating: 4.8,
    reviews: '850+',
    time: '30-40 min',
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1579871494447-0811cf80d49d?w=800&h=600&fit=crop',
    tags: ['Sushi', 'Japanese', 'Asian'],
    about: 'Authentic Japanese cuisine with freshly caught seafood.',
    menuCategories: [
      {
        id: 'c1', name: 'Sushi Rolls', items: [
          { id: 'm4', name: 'Dragon Roll', description: 'Eel, cucumber, avocado top', price: 18.50, isVeg: false, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&h=200&fit=crop' },
          { id: 'm5', name: 'Veggie Roll', description: 'Cucumber, avocado, asparagus', price: 10.00, isVeg: true, image: null },
        ]
      }
    ]
  }
};

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = (RESTAURANTS_DATA as any)[id || '1'] || RESTAURANTS_DATA['1'];
  
  const [activeCategory, setActiveCategory] = useState(restaurant.menuCategories[0].id);
  const addToCart = useAppStore((state) => state.addToCart);
  const cart = useAppStore((state) => state.cart);

  const handleAddToCart = (item: any) => {
    addToCart({ ...item, restaurantId: id });
  };

  return (
    <div className="w-full flex justify-center bg-gray-50 h-full overflow-y-auto pb-24">
      <div className="w-full font-sans max-w-md relative pb-10">
        {/* Header Image & Back Button */}
        <div className="relative h-64 sticky top-0 z-0">
          <img src={restaurant.image} className="w-full h-full object-cover" alt={restaurant.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30"></div>
          
          <div className="absolute top-safe pt-4 px-4 w-full flex justify-between items-center z-10">
            <button onClick={() => navigate(-1)} className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white cursor-pointer hover:bg-white/30 transition">
              <ChevronLeft size={24} />
            </button>
            <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white cursor-pointer hover:bg-white/30 transition">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Restaurant Info Panel */}
        <div className="bg-gray-50 relative z-20 -mt-8 rounded-t-[32px] px-5 pt-8 pb-4">
          <div className="flex justify-between items-start mb-2">
            <h1 className="font-display font-bold text-3xl text-gray-900 tracking-tight">{restaurant.name}</h1>
            <div className="bg-green-100 px-2 py-1 rounded-lg flex items-center gap-1 text-green-700">
               <span className="font-bold text-sm tracking-tight">{restaurant.rating}</span>
               <Star size={14} className="fill-green-700" />
            </div>
          </div>
          
          <p className="text-gray-500 text-sm font-medium mb-4">{restaurant.tags.join(' • ')}</p>

          <div className="flex gap-4 border-y border-gray-100 py-4 mb-4">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-gray-100 p-2 rounded-full"><Clock size={16} className="text-gray-600" /></div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Delivery</span>
                <span className="text-sm font-bold text-gray-900">{restaurant.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="bg-gray-100 p-2 rounded-full"><MapPin size={16} className="text-gray-600" /></div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Distance</span>
                <span className="text-sm font-bold text-gray-900">{restaurant.distance}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {restaurant.about}
          </p>
        </div>

        {/* Menu Section */}
        <div className="bg-white mt-2 px-5 py-6 rounded-t-3xl min-h-screen">
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-white/95 backdrop-blur-md py-3 z-30">
            <h2 className="font-display font-bold text-xl text-gray-900">Menu</h2>
            <button className="p-2 border border-gray-200 rounded-full text-gray-500"><Search size={18} /></button>
          </div>

          {/* Categories Tab */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6">
            {restaurant.menuCategories.map((cat: any) => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
                  activeCategory === cat.id ? "bg-gray-900 text-white shadow-md shadow-gray-900/20" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
             {restaurant.menuCategories.find((c: any) => c.id === activeCategory)?.items.map((item: any, idx: number) => {
               const countInCart = cart.filter(i => i.id === item.id).length;
               
               return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id} 
                  className="flex gap-4 py-4 border-b border-gray-50 last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={cn("h-3 w-3 rounded-sm border flex items-center justify-center p-[1px]", item.isVeg ? "border-green-600" : "border-red-600")}>
                        <div className={cn("h-1.5 w-1.5 rounded-full", item.isVeg ? "bg-green-600" : "bg-red-600")}></div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base">{item.name}</h4>
                    </div>
                    <div className="font-semibold text-gray-900 mb-1">${item.price.toFixed(2)}</div>
                    <p className="text-xs text-gray-500 leading-snug line-clamp-2">{item.description}</p>
                  </div>
                  
                  <div className="relative w-28 h-28 bg-gray-100 rounded-2xl flex-shrink-0">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-2xl" />}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20">
                      {countInCart > 0 ? (
                        <div className="bg-white border border-primary-200 rounded-xl shadow-md text-primary-600 flex justify-between items-center px-2 py-1.5 font-bold h-9">
                          <button className="text-primary-600 px-1 hover:bg-primary-50 rounded" onClick={() => useAppStore.getState().removeFromCart(item.id)}>-</button>
                          <span>{countInCart}</span>
                          <button className="text-primary-600 px-1 hover:bg-primary-50 rounded" onClick={() => handleAddToCart(item)}>+</button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-white border border-primary-200 text-primary-600 hover:bg-primary-50 active:scale-95 font-bold uppercase text-xs py-1.5 h-9 rounded-xl shadow-md transition outline-none flex items-center justify-center gap-1 overflow-hidden"
                        >
                          ADD <Plus size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
             )})}
          </div>
        </div>
      </div>
    </div>
  );
}
