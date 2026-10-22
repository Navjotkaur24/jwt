import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        return
      }

      // save the JWT in local storage
      localStorage.setItem('token', data.token)
      navigate('/protected')
    } catch (err) {
      setError('Could not reach the server')
    }
  }

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login