require('dotenv').config()

const pool = require('./db')

const menuItems = [
  {
    name: 'Bruschetta',
    category: 'Starters',
    price: 65,
    description: 'Toasted bread with tomatoes, basil and olive oil.',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Garlic Bread',
    category: 'Starters',
    price: 45,
    description: 'Fresh bread with garlic butter and herbs.',
    image: 'https://images.unsplash.com/photo-1619531040576-f9416740661b?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Caprese Salad',
    category: 'Starters',
    price: 85,
    description: 'Tomatoes, mozzarella and fresh basil.',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Margherita Pizza',
    category: 'Mains',
    price: 125,
    description: 'Tomato sauce, mozzarella and basil.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Alfredo Pasta',
    category: 'Mains',
    price: 145,
    description: 'Creamy pasta with parmesan cheese.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Mushroom Risotto',
    category: 'Mains',
    price: 155,
    description: 'Italian rice with mushrooms and herbs.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Tiramisu',
    category: 'Desserts',
    price: 75,
    description: 'Coffee-flavoured Italian layered dessert.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Panna Cotta',
    category: 'Desserts',
    price: 70,
    description: 'Vanilla cream dessert with berry sauce.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Gelato',
    category: 'Desserts',
    price: 55,
    description: 'Two scoops of Italian-style ice cream.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85',
  },
]

async function seedDatabase() {
  try {
    for (const item of menuItems) {
      await pool.query(
        `INSERT INTO menu_items
            (name, category, price, description, image_url)
        SELECT
            $1::VARCHAR(150),
            $2::VARCHAR(50),
            $3::NUMERIC(10,2),
            $4::TEXT,
            $5::TEXT
        WHERE NOT EXISTS (
            SELECT 1
            FROM menu_items
            WHERE name = $1::VARCHAR(150)
        )`,
        [
          item.name,
          item.category,
          item.price,
          item.description,
          item.image,
        ]
      )
    }

    console.log('VERDE menu database seeded successfully!')
  } catch (error) {
    console.error('Seeding failed:', error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

seedDatabase()