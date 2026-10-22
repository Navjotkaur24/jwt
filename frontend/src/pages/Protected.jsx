import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Protected() {
  const [message, setMessage] = useState('Loading...')
  const navigate = useNavigate()

  useEffect(() => {
    async function loadProtected() {
      const token = localStorage.getItem('token')

      try {
        const res = await fetch(`${API}/protected`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()

        if (!res.ok) {
          // token is bad or expired: clear it and go to login
          localStorage.removeItem('token')
          navigate('/login')
          return
        }

        setMessage(data.message)
      } catch (err) {
        setMessage('Could not reach the server')
      }
    }
    loadProtected()
  }, [navigate])

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Protected Page</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Protected