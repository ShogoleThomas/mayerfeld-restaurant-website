import { useState } from 'react'
import { menuItems } from '../data/menuData'
import MenuItem from './MenuItem'


const categories = ['All', 'Starters', 'Mains', 'Desserts']

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredItems = menuItems.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory
  })

  return (
    <section id="menu" className="bg-stone-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-3xl font-bold text-green-900 sm:text-4xl">
          Our Menu
        </h2>

        <div className="my-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`rounded-full px-5 py-2 font-medium transition ${
                selectedCategory === category
                  ? 'bg-green-900 text-white'
                  : 'bg-white text-green-900 hover:bg-green-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
        ))}
        </div>

      </div>
    </section>
  )
}

export default Menu