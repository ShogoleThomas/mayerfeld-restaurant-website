
function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <nav
        className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-5 md:flex-row md:justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="shrink-0 text-3xl font-bold tracking-widest text-green-900"
        >
          VER<span className="text-orange-600">DE</span>
        </a>

        <ul className="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm font-medium text-stone-700 md:w-auto md:gap-6">
          <li>
            <a href="#home" className="hover:text-green-800">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-green-800">
              About
            </a>
          </li>
          <li>
            <a href="#menu" className="hover:text-green-800">
              Menu
            </a>
          </li>
          <li>
            <a href="#reservation" className="hover:text-green-800">
              Reservation
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-green-800">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
