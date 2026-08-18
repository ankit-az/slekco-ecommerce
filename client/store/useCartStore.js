import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        let maxReached = false;
        const availableStock = product.stock !== undefined ? product.stock : 999;

        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item._id === product._id
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            const currentQty = updatedItems[existingItemIndex].quantity;
            const newQty = currentQty + quantity;

            if (newQty > availableStock) {
              maxReached = true;
              updatedItems[existingItemIndex].quantity = availableStock;
            } else {
              updatedItems[existingItemIndex].quantity = newQty;
            }

            return { items: updatedItems };
          } else {
            const initialQty = Math.min(quantity, availableStock);
            if (initialQty < quantity) maxReached = true;
            return {
              items: [...state.items, { ...product, quantity: initialQty }]
            };
          }
        });

        return { maxReached, availableStock };
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId)
        }));
      },

      increaseQuantity: (productId) => {
        let maxReached = false;
        set((state) => ({
          items: state.items.map((item) => {
            if (item._id === productId) {
              const maxStock = item.stock !== undefined ? item.stock : 999;
              if (item.quantity >= maxStock) {
                maxReached = true;
                return item;
              }
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          })
        }));
        return { maxReached };
      },

      decreaseQuantity: (productId) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item._id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    }),
    {
      name: 'slekco_cart',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
