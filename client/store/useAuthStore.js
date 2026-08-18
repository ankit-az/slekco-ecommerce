import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user, token) => {
        if (token && typeof window !== 'undefined') {
          localStorage.setItem('slekco_token', token);
        }
        set({ user, token, isAuthenticated: !!user });
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('slekco_token');
        }
        set({ user: null, token: null, isAuthenticated: false });
      }
    }),
    {
      name: 'slekco_auth',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
