import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const styles = {
    title: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: '700', // Bold
      color: 'rgb(243,189,80)',
      fontSize: '30px',
    },
    subtitle: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: '700', // Regular
      color: '#000',
      fontSize: '25px',
    },
  };

  const submit = () => {
    navigate('/courses')
  }

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
        <h1 className="display-4" style={styles.title}>Nhiệm vụ đào tạo của R2S
        </h1>
        <p style={styles.subtitle}>Học KHOẺ, Giá RẺ</p>
        <img style={{height: '500px', width: '70%'}}src='/img/homepage.png'></img>
        <br></br>
        <br></br>
        <button onClick={submit} type="button" class="btn btn-warning">Đăng kí khóa học ngay</button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <Footers></Footers>
    </div>
  )
}

export default Home