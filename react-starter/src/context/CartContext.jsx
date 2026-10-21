import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'verde-cart-v1'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      return Array.isArray(stored) ? stored.filter(item => item && Number.isFinite(item.price) && Number.isInteger(item.quantity) && item.quantity > 0) : []
    } catch { return [] }
  })
  const [cartOpen, setCartOpen] = useState(false)
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)) }, [cart])
  function addItem(item, quantity = 1) {
    setCart(previous => {
      const existing = previous.find(entry => entry.id === item.id)
      return existing
        ? previous.map(entry => entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry)
        : [...previous, { id: item.id, name: item.name, price: item.price, image: item.image, quantity }]
    })
    setCartOpen(true)
  }
  function changeQuantity(id, quantity) {
    setCart(previous => previous.map(item => item.id === id ? { ...item, quantity } : item).filter(item => item.quantity > 0))
  }
  const count = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  return <CartContext.Provider value={{ cart, cartOpen, setCartOpen, addItem, changeQuantity, count, subtotal }}>{children}</CartContext.Provider>
}
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
