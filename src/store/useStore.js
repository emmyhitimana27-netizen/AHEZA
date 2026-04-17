import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import toast from 'react-hot-toast'

/* ─── Cart Store ─────────────────────────────────────────── */
export const useCartStore = create(
  persist(
    (set, get) => ({
      items:  [],
      isOpen: false,

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.id === product.id)
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          }))
          toast.success(`Updated ${product.name} quantity`)
        } else {
          set((s) => ({ items: [...s.items, { ...product, quantity }] }))
          toast.success(`${product.name} added to cart`)
        }
      },

      removeItem: (id) => {
        set((s) => ({ items: s.items.filter((i) => i.id !== id) }))
        toast.success('Item removed from cart')
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id)
          return
        }
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => {
        set({ items: [] })
        toast.success('Cart cleared')
      },
    }),
    {
      name:    'aheza-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

/* ─── Auth Store ─────────────────────────────────────────── */
export const useAuthStore = create(
  persist(
    (set) => ({
      user:     null,
      token:    null,
      isAuthed: false,

      setAuth: (user, token) => set({ user, token, isAuthed: true }),
      clearAuth: () => {
        localStorage.removeItem('aheza_token')
        set({ user: null, token: null, isAuthed: false })
      },
      updateUser: (updates) =>
        set((s) => ({ user: { ...s.user, ...updates } })),
    }),
    {
      name:    'aheza-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ user: s.user, token: s.token, isAuthed: s.isAuthed }),
    }
  )
)

/* ─── UI Store ───────────────────────────────────────────── */
export const useUIStore = create((set) => ({
  searchOpen:  false,
  mobileMenuOpen: false,
  activeFilter: 'all',
  sortBy:       'featured',

  toggleSearch:  () => set((s) => ({ searchOpen:  !s.searchOpen  })),
  toggleMobile:  () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobile:   () => set({ mobileMenuOpen: false }),
  setFilter:     (filter) => set({ activeFilter: filter }),
  setSort:       (sort) => set({ sortBy: sort }),
}))