
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [authError, setAuthError] = useState('')

  const { count, setCartOpen } = useCart()
  const { user, loading, signOut } = useAuth()

  const links = [
    ['#home', 'Home'],
    ['#menu', 'Our Menu'],
    ['#about', 'Our Story'],
    ['#reservation', 'Book a Table'],
    ['#contact', 'Contact'],
  ]

  async function handleLogout() {
    setSigningOut(true)
    setAuthError('')

    try {
      await signOut()
    } catch (error) {
      setAuthError(error.message || 'Could not log out')
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-green-950/10 bg-[#fffdf8]/95 backdrop-blur-md">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            className="font-serif text-3xl font-black tracking-tight text-green-950"
          >
            VER<span className="text-orange-700">DE</span>

            <span className="ml-2 hidden text-[10px] font-semibold uppercase tracking-[.24em] text-stone-500 sm:inline">
              Italian Kitchen
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold text-stone-700 hover:text-orange-700"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!loading && (
              user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden max-w-32 truncate text-sm font-semibold text-green-950 sm:inline">
                    Hi, {user.name.split(' ')[0]}
                  </span>

                  <button
                    onClick={handleLogout}
                    disabled={signingOut}
                    className="rounded-full border border-green-950 px-3 py-2.5 text-xs font-bold text-green-950 transition hover:bg-green-50 disabled:opacity-50 sm:px-4 sm:text-sm"
                  >
                    {signingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="rounded-full border border-green-950 px-3 py-2.5 text-xs font-bold text-green-950 transition hover:bg-green-50 sm:px-4 sm:text-sm"
                >
                  Login / Sign Up
                </button>
              )
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="rounded-full bg-green-950 px-3 py-2.5 text-xs font-bold text-white hover:bg-green-800 sm:px-4 sm:text-sm"
              aria-label={`Open basket with ${count} items`}
            >
              Basket
              <span className="ml-1 rounded-full bg-orange-600 px-2 py-0.5">
                {count}
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
              className="rounded-full border border-stone-300 px-3 py-2 lg:hidden"
            >
              ☰
            </button>
          </div>
        </nav>

        {authError && (
          <p role="alert" className="px-5 pb-2 text-center text-sm text-red-700">
            {authError}
          </p>
        )}

        {mobileOpen && (
          <div className="flex flex-col gap-1 border-t border-stone-200 bg-[#fffdf8] px-5 pb-4 lg:hidden">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="py-2 font-semibold text-green-950"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {authOpen && (
        <AuthModal onClose={() => setAuthOpen(false)} />
      )}
    </>
  )
}
