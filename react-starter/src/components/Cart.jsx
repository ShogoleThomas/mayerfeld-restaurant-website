import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import QuantityStepper from './QuantityStepper'

export default function Cart() {
  const { cart, cartOpen, setCartOpen, changeQuantity, count, subtotal } = useCart()
  useEffect(() => {
    if (!cartOpen) return
    function onKey(event) { if (event.key === 'Escape') setCartOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [cartOpen, setCartOpen])
  if (!cartOpen) return null
  return <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
    <button className="absolute inset-0 bg-black/55" aria-label="Close cart" onClick={() => setCartOpen(false)} />
    <aside role="dialog" aria-modal="true" aria-label="Your order" className="relative flex h-full w-full max-w-md flex-col bg-[#fffdf8] shadow-2xl">
      <div className="flex items-center justify-between border-b border-stone-200 p-6">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">Your selection</p><h2 className="font-serif text-3xl font-bold text-green-950">Your basket ({count})</h2></div>
        <button onClick={() => setCartOpen(false)} className="rounded-full bg-stone-100 px-3 py-2 text-xl" aria-label="Close cart">×</button>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-6">
        {cart.length === 0 ? <div className="py-20 text-center"><p className="text-5xl">🍝</p><p className="mt-4 font-serif text-2xl">Your basket is empty</p><p className="mt-2 text-stone-500">Add something delicious from the menu.</p><button onClick={() => setCartOpen(false)} className="mt-6 rounded-full bg-green-900 px-6 py-3 text-white">Explore menu</button></div> : cart.map(item => <div key={item.id} className="flex gap-4 border-b border-stone-200 pb-5">
          <img src={item.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
          <div className="min-w-0 flex-1"><h3 className="font-bold text-green-950">{item.name}</h3><p className="text-sm text-stone-500">R{item.price.toFixed(2)} each</p><div className="mt-2"><QuantityStepper quantity={item.quantity} onQuantityChange={value => changeQuantity(item.id, value)} /></div></div>
          <strong className="text-green-950">R{(item.price * item.quantity).toFixed(2)}</strong>
        </div>)}
      </div>
      <div className="border-t border-stone-200 bg-white p-6"><div className="mb-3 flex justify-between text-lg font-bold"><span>Subtotal</span><span>R{subtotal.toFixed(2)}</span></div><p className="mb-4 text-xs text-stone-500">Demo basket only. No payment or order is submitted yet.</p><button disabled={!count} onClick={() => window.alert('Order checkout will be connected to the backend in Assignment 3. No order has been placed.')} className="w-full rounded-full bg-orange-700 py-4 font-bold text-white hover:bg-orange-800 disabled:opacity-50">Checkout preview →</button></div>
    </aside>
  </div>
}
