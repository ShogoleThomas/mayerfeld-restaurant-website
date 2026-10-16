function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav
        className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-5 sm:flex-row sm:justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="text-3xl font-bold tracking-widest text-green-900"
        >
          VER<span className="text-orange-600">DE</span>
        </a>

        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium text-stone-700 md:gap-8">
          <li><a href="#home" className="hover:text-green-800">Home</a></li>
          <li><a href="#about" className="hover:text-green-800">About</a></li>
          <li><a href="#menu" className="hover:text-green-800">Menu</a></li>
          <li><a href="#reservation" className="hover:text-green-800">Reservation</a></li>
          <li><a href="#contact" className="hover:text-green-800">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header