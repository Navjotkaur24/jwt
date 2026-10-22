import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Protected from './pages/Protected'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const navigate = useNavigate()
  const loggedIn = !!localStorage.getItem('token')

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/protected">Protected</Link>
        {loggedIn && <button onClick={logout}>Logout</button>}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <Protected />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App