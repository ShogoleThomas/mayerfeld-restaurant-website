const API_URL = 'http://localhost:5000'

async function authRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Authentication request failed')
  }

  return data
}

export function signup(name, email, password) {
  return authRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export function login(email, password) {
  return authRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function getCurrentUser() {
  return authRequest('/api/auth/me')
}

export function logout() {
  return authRequest('/api/auth/logout', {
    method: 'POST',
  })
}