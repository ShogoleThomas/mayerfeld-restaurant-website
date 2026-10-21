
import { useEffect, useMemo, useState } from 'react'
import { getMenuItems } from '../services/menuApi'
import MenuItem from './MenuItem'

const categories = ['All', 'Starters', 'Mains', 'Desserts']

export default function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')

  useEffect(() => {
    let active = true

    async function loadMenu() {
      try {
        const items = await getMenuItems()

        if (active) {
          setMenuItems(items)
          setError('')
        }
      } catch (err) {
        console.error('Error loading menu:', err)

        if (active) {
          setError('Unable to load our menu. Please try again.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadMenu()

    return () => {
      active = false
    }
  }, [])

  const filteredItems = useMemo(() => {
    const result = menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory

      const matchesSearch =
        `${item.name} ${item.description ?? ''}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())

      return matchesCategory && matchesSearch
    })

    if (sort === 'low') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sort === 'high') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [menuItems, selectedCategory, search, sort])

  return (
    <section id="menu" className="bg-[#faf8f3] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.3em] text-orange-700">
            Made to be enjoyed
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold text-green-950 sm:text-5xl">
            Explore our menu
          </h2>

          <p className="mt-4 text-stone-600">
            Fresh ingredients, familiar favourites, and something delicious
            for everyone.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                    selectedCategory === category
                      ? 'bg-green-950 text-white'
                      : 'bg-stone-100 text-green-950 hover:bg-green-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="text-sm text-stone-500">
              {loading ? 'Loading dishes...' : `${filteredItems.length} dishes`}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-2">
              <span aria-hidden="true">⌕</span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search pizza, pasta, desserts..."
                aria-label="Search menu"
                className="w-full bg-transparent py-1 outline-none"
              />
            </label>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort menu"
              className="rounded-xl border border-stone-200 bg-white px-4 py-3"
            >
              <option value="featured">Recommended</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 rounded-2xl bg-white py-16 text-center">
            <p className="text-lg text-stone-600">
              Loading our delicious Italian menu...
            </p>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-red-200 bg-white py-16 text-center"
          >
            <p className="text-lg text-red-700">{error}</p>
            <p className="mt-2 text-sm text-stone-500">
              Please check that the VERDE backend is running.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 font-bold text-orange-700 underline"
            >
              Try again
            </button>
          </div>
        ) : filteredItems.length ? (
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center">
            <p className="text-4xl">🍽️</p>

            <h3 className="mt-3 font-serif text-2xl">
              No dishes found
            </h3>

            <p className="mt-2 text-stone-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch('')
                setSelectedCategory('All')
              }}
              className="mt-5 font-bold text-orange-700 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
