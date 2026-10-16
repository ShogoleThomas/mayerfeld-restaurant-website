import { useState } from 'react'
import QuantityStepper from './QuantityStepper'

function MenuItem({ item }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <article className="flex flex-col rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-green-900">
          {item.name}
        </h3>

        <span className="shrink-0 font-semibold text-orange-700">
          R{item.price}
        </span>
      </div>

      <p className="mt-3 flex-1 text-stone-600">
        {item.description}
      </p>

      <p className="mt-4 text-sm font-medium text-green-800">
        {item.category}
      </p>

      <div className="mt-5 border-t border-stone-200 pt-4">
        <p className="mb-2 text-sm font-medium text-stone-700">
          Quantity
        </p>

        <QuantityStepper
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      </div>
    </article>
  )
}

export default MenuItem