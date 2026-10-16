function QuantityStepper({ quantity, onQuantityChange }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
        disabled={quantity === 0}
        aria-label="Decrease quantity"
        className="rounded-md bg-stone-200 px-3 py-1 font-bold text-green-900 hover:bg-stone-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span className="min-w-6 text-center font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => onQuantityChange(quantity + 1)}
        aria-label="Increase quantity"
        className="rounded-md bg-green-900 px-3 py-1 font-bold text-white hover:bg-green-800"
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper