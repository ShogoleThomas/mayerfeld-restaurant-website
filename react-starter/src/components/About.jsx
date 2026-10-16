function About() {
  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <img
          src="/images/about.png"
          alt="Warm restaurant dining area"
          className="w-full rounded-xl object-cover shadow-lg"
        />

        <article>
          <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">
            About VERDE
          </h2>

          <p className="mt-6 leading-relaxed text-stone-600">
            At VERDE, we believe Italian food should be simple, fresh and
            full of flavour. We prepare familiar favourites using quality
            ingredients.
          </p>

          <p className="mt-4 leading-relaxed text-stone-600">
            Whether you are meeting friends or enjoying a family meal,
            there is always a place for you at our table.
          </p>
        </article>
      </div>
    </section>
  )
}

export default About