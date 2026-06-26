import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  discount: number;
  quantity: number;
  providerId: string
}

interface CartState {
 cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => { success: boolean; errorType?: 'DIFFERENT_PROVIDER' };
  replaceCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void; // 🔄 কার্ট ক্লিয়ার করে নতুন খাবার যোগ করার জন্য
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, action: 'increase' | 'decrease') => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (newItem, quantityToAdd) => {
        let result: { success: boolean; errorType?: 'DIFFERENT_PROVIDER' } = { success: true };

        set((state) => {
          // ১. চেক করছি কার্টে অলরেডি অন্য কোনো প্রোভাইডারের খাবার আছে কিনা
          const currentProviderId = state.cart[0]?.providerId;

          if (currentProviderId && currentProviderId !== newItem.providerId) {
            result = { success: false, errorType: 'DIFFERENT_PROVIDER' };
            return { cart: state.cart }; // কার্ট অপরিবর্তিত থাকবে
          }

          // ২. যদি প্রোভাইডার মিলে যায় বা কার্ট খালি থাকে, তবে নরমাল অ্যাড হবে
          const existingItem = state.cart.find((item) => item.id === newItem.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
              ),
            };
          }
          return { cart: [...state.cart, { ...newItem, quantity: quantityToAdd }] };
        });

        return result;
      },

      // 🔄 পুরানো কার্ট মুছে নতুন রেস্তোরাঁর খাবার এক ক্লিকে সেট করার ফাংশন
      replaceCart: (newItem, quantityToAdd) => set(() => ({
        cart: [{ ...newItem, quantity: quantityToAdd }]
      })),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
      })),

      updateQuantity: (id, action) => set((state) => ({
        cart: state.cart.map((item) => {
          if (item.id === id) {
            const nextQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: Math.max(1, nextQty) };
          }
          return item;
        })
      })),

      clearCart: () => set({ cart: [] }),
    }),
    { name: 'food-cart-storage' }
  )
);