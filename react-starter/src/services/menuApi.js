const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function getMenuItems() {
  const response = await fetch(`${API_URL}/api/menu`)

  if (!response.ok) {
    throw new Error('Failed to load menu items')
  }

  const items = await response.json()

  return items.map((item) => ({
    ...item,
    price: Number(item.price),
    image: item.image_url,
  }))
}