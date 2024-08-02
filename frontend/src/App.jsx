import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Add_A_Product from './pages/Add_A_Product'
import Edit_A_Product from './pages/Edit_A_Product'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Show_Products from './pages/Show_Products'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const isJwtExpired = (token) => {
    if (!token) return true
    const parts = token.split('.')
    if (parts.length !== 3) return true
    try {
        const payload = JSON.parse(atob(parts[1]))
        if (!payload.exp) return false
        const currentTime = Math.floor(Date.now() / 1000)
        return payload.exp < currentTime
    } catch (error) {
        console.error('Error decoding token:', error)
        return true
    }
  }

  useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token')
            if (token && !isJwtExpired(token)) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
                localStorage.removeItem('token')
            }
        }

        checkLoginStatus()
        const intervalId = setInterval(checkLoginStatus, 1000) // Check every second

        return () => clearInterval(intervalId)
    }, [])

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    )
  }
  else {
    return (
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/products" element={<Show_Products></Show_Products>}></Route>
        <Route path="/products/add" element={<Add_A_Product></Add_A_Product>}></Route>
        <Route path="/products/edit/:id" element={<Edit_A_Product></Edit_A_Product>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    )
  }
}

export default App
