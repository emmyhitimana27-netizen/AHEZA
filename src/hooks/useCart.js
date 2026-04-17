import { useCartStore } from '@store/useStore'

export const useCart = () => {
  const {
    items, addItem, removeItem,
    updateQuantity, clearCart,
    isOpen, openCart, closeCart, toggleCart,
  } = useCartStore()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal   = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const isEmpty    = items.length === 0

  const isInCart = (id) => items.some((item) => item.id === id)
  const getItem  = (id) => items.find((item) => item.id === id)

  return {
    items, addItem, removeItem, updateQuantity,
    clearCart, totalItems, subtotal, isEmpty,
    isInCart, getItem, isOpen, openCart, closeCart, toggleCart,
  }
}