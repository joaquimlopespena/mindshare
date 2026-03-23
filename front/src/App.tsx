import { Layout } from './components/Layout'
import { Login } from './pages/Auth/Login'
import { Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Auth/Signup'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Layout>
  )
}

export default App
