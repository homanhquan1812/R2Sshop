import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AddCourses from './pages/AddCourses'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Show_Products from './pages/Courses'
import About from './pages/About'
import Cart from './pages/Cart'
import CourseDetails from './pages/CourseDetails'
import Transactions from './pages/Transactions'
import EditCourses from './pages/EditCourses'
import Info from './pages/Info'
import Success from './pages/Success'

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
        <Route path="/courses" element={<Show_Products></Show_Products>}></Route>
        <Route path="/courses/:id" element={<CourseDetails></CourseDetails>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    )
  }
  else {
    return (
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/courses" element={<Show_Products></Show_Products>}></Route>
        <Route path="/courses/:id" element={<CourseDetails></CourseDetails>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/transactions" element={<Transactions></Transactions>}></Route>
        <Route path="/courses/add" element={<AddCourses></AddCourses>}></Route>
        <Route path="/courses/edit/:id" element={<EditCourses></EditCourses>}></Route>
        <Route path="/info/:id" element={<Info></Info>}></Route>
        <Route path="/success" element={<Success></Success>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    )
  }
}

export default App
