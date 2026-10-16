
import { useState } from 'react'

function Reservation() {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '',
  })

  const [showReview, setShowReview] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setDetails((previous) => ({
      ...previous,
      [name]: value,
    }))

    setShowReview(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setShowReview(true)
  }

  const inputStyle =
    'w-full rounded-lg border border-stone-300 bg-white px-4 py-3 focus:border-green-800 focus:outline-none'

  return (
    <section id="reservation" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="text-center text-3xl font-bold text-green-900 sm:text-4xl">
          Reserve a Table
        </h2>

        <p className="mt-4 text-center text-stone-600">
          Planning a visit? Fill in the details below.
          This is a demonstration form and does not send a booking.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl bg-stone-50 p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block font-medium">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={details.name}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={details.email}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="date" className="mb-2 block font-medium">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={details.date}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="time" className="mb-2 block font-medium">
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                required
                value={details.time}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="guests" className="mb-2 block font-medium">
                Guests
              </label>
              <select
                id="guests"
                name="guests"
                required
                value={details.guests}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">Choose number</option>
                {[1, 2, 3, 4, 5, 6].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-md bg-green-900 px-6 py-3 font-medium text-white hover:bg-green-800"
          >
            Review Reservation Details
          </button>

          <p className="mt-3 text-sm text-stone-500">
            Demo only — no reservation is created.
          </p>

          {showReview && (
            <div
              role="status"
              className="mt-6 rounded-lg border border-green-200 bg-green-50 p-5 text-stone-700"
            >
              <h3 className="font-bold text-green-900">
                Reservation Details Preview
              </h3>
              <p className="mt-2">Name: {details.name}</p>
              <p>Email: {details.email}</p>
              <p>Date: {details.date}</p>
              <p>Time: {details.time}</p>
              <p>Guests: {details.guests}</p>
              <p className="mt-3 font-medium">
                This is a preview only. No booking has been submitted.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default Reservation
