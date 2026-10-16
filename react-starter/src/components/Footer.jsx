
function Footer() {
  return (
    <footer id="contact" className="bg-green-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-3xl font-bold tracking-widest">
            VER<span className="text-orange-400">DE</span>
          </h2>

          <p className="mt-4 leading-relaxed text-stone-300">
            Fresh Italian Kitchen.
            <br />
            Simple food, great company.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Opening Hours
          </h3>

          <div className="mt-4 space-y-2 text-stone-300">
            <p>Mon - Fri: 12:00 - 22:00</p>
            <p>Saturday: 12:00 - 23:00</p>
            <p>Sunday: 12:00 - 21:00</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Location
          </h3>

          <address className="mt-4 not-italic leading-relaxed text-stone-300">
            Pretoria, Gauteng
            <br />
            South Africa
          </address>

          <p className="mt-3 text-sm text-stone-400">
            Example location for this student project.
          </p>
        </div>
      </div>

      <div className="border-t border-green-900 px-5 py-5 text-center text-sm text-stone-400">
        © 2026 VERDE Italian Kitchen. Student project.
      </div>
    </footer>
  )
}

export default Footer
