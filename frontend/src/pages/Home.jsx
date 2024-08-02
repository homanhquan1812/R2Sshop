import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Home = () => {
  const [user, setUser] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token')

      if (token) {
        try {
          const decodedToken = jwtDecode(token)
          setUser(decodedToken)
          setIsLoggedIn(true)
        } catch (error) {
          console.error('Invalid token:', error)
        }
      }
      else {
        setIsLoggedIn(false)
      }
    }

    checkToken()

    const intervalId = setInterval(checkToken, 1000) // Check every second

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <Heads></Heads>
      <Headers></Headers>
      <div className="text-center">
        {
          isLoggedIn ? (     
            <h1 className="display-4">Welcome back, {user.name}!</h1>
          ) : (
            <h1 className="display-4">Welcome</h1>
          )
        }
        <p>Let's study building Web apps with Spring Boot & ReactJS.</p>
      </div>
      <Footers></Footers>
    </div>
  )
}

export default Home