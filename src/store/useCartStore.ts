import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  discount: number;
  quantity: number;
}

interface CartState {
 cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeFromCart: (id: string) => void; // 🎯 ১. আইটেম রিমুভ করা
  updateQuantity: (id: string, action: 'increase' | 'decrease') => void; // 🎯 ২. প্লাস/মাইনাস করা
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
 persist(
    (set) => ({
      cart: [],

      addToCart: (newItem, quantityToAdd) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === newItem.id);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === newItem.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
            ),
          };
        }
        return { cart: [...state.cart, { ...newItem, quantity: quantityToAdd }] };
      }),

      // 🗑️ কার্ট থেকে একটি খাবার সম্পূর্ণ ডিলেট করার লজিক
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
      })),

      // 🔄 কোয়ান্টিটি বাড়ানো বা কমানোর লজিক
      updateQuantity: (id, action) => set((state) => ({
        cart: state.cart.map((item) => {
          if (item.id === id) {
            const nextQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
            // কোয়ান্টিটি ১ এর নিচে নামতে পারবে না
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