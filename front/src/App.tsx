import { Layout } from './components/Layout'
import { Login } from './pages/Auth/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Signup } from './pages/Auth/Signup'
import { useAuthStore } from './stores/auth'
import { Ideias } from './pages/ideias'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return children
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  return children
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Ideias />
          </ProtectedRoute>
        } />
      </Routes>
    </Layout>
  )
}

export default App
