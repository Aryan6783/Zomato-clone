import { create } from 'zustand';

interface AppState {
  role: 'customer' | 'restaurant' | 'rider' | 'admin';
  setRole: (role: 'customer' | 'restaurant' | 'rider' | 'admin') => void;
  cart: any[];
  addToCart: (item: any) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  role: 'customer',
  setRole: (role) => set({ role }),
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (itemId) => set((state) => ({ cart: state.cart.filter((i) => i.id !== itemId) })),
  clearCart: () => set({ cart: [] }),
}));
