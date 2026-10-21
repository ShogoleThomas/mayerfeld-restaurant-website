import { useState } from 'react'
import QuantityStepper from './QuantityStepper'
import { useCart } from '../context/CartContext'
export default function MenuItem({ item }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  return <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="relative overflow-hidden"><img src={item.image} alt={item.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-green-900 shadow">{item.category}</span>{item.featured && <span className="absolute right-4 top-4 rounded-full bg-orange-700 px-3 py-1.5 text-xs font-bold text-white">Popular</span>}</div>
    <div className="flex flex-1 flex-col p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-serif text-2xl font-bold text-green-950">{item.name}</h3><span className="shrink-0 text-lg font-extrabold text-orange-700">R{item.price}</span></div><p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.description}</p><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4"><QuantityStepper quantity={quantity} onQuantityChange={value => setQuantity(Math.max(1,value))}/><button onClick={() => {addItem(item,quantity);setQuantity(1)}} className="rounded-full bg-green-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700">+ Add to basket</button></div></div>
  </article>
}
