import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'

const About = () => {
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
      <Heads
      additionalStylesheets={[
        "/css/bootstrap.min.css",
        "/css/site.css",
        "/css/style.css"
      ]}
      additionalTitle={[
        "Giới thiệu - R2Sshop"
      ]}></Heads>
      <Headers></Headers>
      <div className="text-center">
        <h1 className="display-4">Về R2S</h1>
        <br></br>
        <img style={{width: '40%'}} src='/img/image.png'></img>
        <br></br>
        <br></br>
        <p style={{fontSize: '20px'}}>Với định hướng giúp học viên chuyên sâu một mảng để có thể đi làm,</p>
        <p style={{fontSize: '20px'}}>R2S sau hơn 2 năm triển khai nhiều khoá học đã định hình lại nhiệm vụ đào tạo theo hướng chuyên sâu:</p>
        <p style={{fontSize: '17px'}}>1. Trang bị đủ kiến thức, kỹ năng chuyên môn cho sinh viên.</p>
        <p style={{fontSize: '17px'}}>2. Trang bị kỹ năng đi làm cho Intern/Fresher.</p>
        <br></br>
        <br></br>
        <h1 className="display-4">Credits</h1>
        <br></br>
        <p style={{fontSize: '17px'}}>R2Sshop website made by Hồ Mạnh Quân (Frontend + Backend).</p>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <Footers></Footers>
    </div>
  )
}

export default About