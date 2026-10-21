
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  getCurrentUser,
  login,
  signup,
  logout,
} from '../services/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function restoreSession() {
      try {
        const data = await getCurrentUser()

        if (active) {
          setUser(data.user)
        }
      } catch (error) {
        console.error('Could not restore session:', error)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    restoreSession()

    return () => {
      active = false
    }
  }, [])

  async function signUp(name, email, password) {
    const data = await signup(name, email, password)
    setUser(data.user)
    return data
  }

  async function signIn(email, password) {
    const data = await login(email, password)
    setUser(data.user)
    return data
  }

  async function signOut() {
    await logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
