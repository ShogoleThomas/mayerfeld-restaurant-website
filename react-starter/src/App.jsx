
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import Cart from './components/Cart'

import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />

        <main>
          <Hero />
          <Menu />
          <About />
          <Reservation />
        </main>

        <Footer />
        <Cart />
      </CartProvider>
    </AuthProvider>
  )
}
