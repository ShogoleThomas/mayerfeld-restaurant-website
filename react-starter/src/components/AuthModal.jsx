
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ onClose }) {
  const { signIn, signUp } = useAuth()

  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  function changeMode(nextMode) {
    setMode(nextMode)
    setError('')
    setPassword('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (submitting) return

    setSubmitting(true)
    setError('')

    try {
      if (mode === 'signup') {
        await signUp(name, email, password)
      } else {
        await signIn(email, password)
      }

      onClose()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-green-950/70 px-4 py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="w-full max-w-md rounded-3xl bg-[#fffdf8] p-7 shadow-2xl sm:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-orange-700">
              Welcome to VERDE
            </p>

            <h2
              id="auth-title"
              className="mt-3 font-serif text-3xl font-bold text-green-950"
            >
              {mode === 'login' ? 'Welcome back' : 'Join the VERDE family'}
            </h2>

            <p className="mt-2 text-sm text-stone-600">
              {mode === 'login'
                ? 'Sign in to your restaurant account.'
                : 'Create your account to get started.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close login form"
            className="rounded-full border border-stone-200 px-3 py-1.5 text-xl text-stone-600 hover:bg-stone-100"
          >
            ×
          </button>
        </div>

        <div className="mt-7 grid grid-cols-2 rounded-full bg-stone-100 p-1">
          <button
            type="button"
            onClick={() => changeMode('login')}
            className={`rounded-full py-2.5 text-sm font-bold transition ${
              mode === 'login'
                ? 'bg-green-950 text-white'
                : 'text-stone-600'
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => changeMode('signup')}
            className={`rounded-full py-2.5 text-sm font-bold transition ${
              mode === 'signup'
                ? 'bg-green-950 text-white'
                : 'text-stone-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-green-950">
                Full name
              </span>

              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={100}
                placeholder="Your full name"
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-green-800"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-green-950">
              Email address
            </span>

            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-green-800"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-green-950">
              Password
            </span>

            <input
              type="password"
              autoComplete={
                mode === 'signup' ? 'new-password' : 'current-password'
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={mode === 'signup' ? 8 : undefined}
              placeholder={
                mode === 'signup'
                  ? 'At least 8 characters'
                  : 'Enter your password'
              }
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-green-800"
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-green-950 px-5 py-3.5 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? 'Please wait...'
              : mode === 'login'
                ? 'Login to VERDE'
                : 'Create my account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}

          <button
            type="button"
            onClick={() =>
              changeMode(mode === 'login' ? 'signup' : 'login')
            }
            className="font-bold text-orange-700 underline"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}
