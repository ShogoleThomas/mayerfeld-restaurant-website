function Hero() {
  return (
    <section id="home" className="bg-stone-50 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <article className="text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight text-green-900 sm:text-5xl lg:text-6xl">
            Fresh Italian Food, Made with Care.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-stone-600">
            Welcome to VERDE Italian Kitchen. Enjoy fresh pasta,
            classic pizza and good food shared with good company.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#reservation"
              className="rounded-md bg-green-900 px-6 py-3 font-medium text-white transition hover:bg-green-800"
            >
              Reserve a Table
            </a>

            <a
              href="#menu"
              className="rounded-md border border-green-900 px-6 py-3 font-medium text-green-900 transition hover:bg-green-900 hover:text-white"
            >
              View Menu
            </a>
          </div>
        </article>

        
        <img
        src={`${import.meta.env.BASE_URL}images/hero.png`}
        alt="Italian food"
        className="block h-auto w-full max-w-full rounded-xl object-cover shadow-lg"
        />

      </div>
    </section>
  )
}

export default Hero