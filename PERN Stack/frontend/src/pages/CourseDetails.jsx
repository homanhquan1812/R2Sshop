import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const CourseDetails = () => {
    const { id } = useParams()
    const [courseId, setCourseId] = useState([])
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [cart, setCart] = useState({
      items: [],
      totalPrice: 0
    })
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')
    const navigateTo = useNavigate()

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

    const handleAddProduct = () => {
      navigateTo('/courses')
    }

    const loginDirect = () => {
      navigateTo('/login')
    }

    const addCourse = async() => {
      try {
        const token = localStorage.getItem('token')

        let decodedToken

        if (token) {
            decodedToken = jwtDecode(token)

            setUserId(decodedToken.id)
        }

        const response = await axios.post(`http://localhost:5000/updateinfo/addcourse`, {
          id: decodedToken.id,
          name: courseId.name,
          price: courseId.price,
          photo: courseId.photo,
          courseId: courseId._id
        })

        if (response.status == 201) {
          console.log('Course added to cart successfully.')
          navigateTo('/cart')
        }
      } catch (error) {
        console.error(error)
      }
    }

    const fetchProductsAPI = async () => {
      try {
        const response = await fetch(`http://localhost:5000/course/edit/${id}`)

        if (response.status == 200) {
          console.log('Data fetched successfully.')
          const data = await response.json()
          setCourseId(data.course)
        }
      } catch (error) {
        console.error("Error: ", error)
      }
    }

    const checkLoginStatus = () => {
      const token = localStorage.getItem('token')
      if (token && !isJwtExpired(token)) {
          setIsLoggedIn(true)
      } else {
          setIsLoggedIn(false)
          localStorage.removeItem('token')
      }
    }

    useEffect(() => {
      fetchProductsAPI()
      checkLoginStatus()
    
        // Fetch data every 2 seconds
        const intervalId = setInterval(() => {
          fetchProductsAPI()
          checkLoginStatus()
        }, 2000)
    
        return () => clearInterval(intervalId)
      }, [])

  return (
    <div>
        <Heads></Heads>
        <Headers></Headers>
        <div class="container">
            <main role="main" class="pb-3">
              <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Tìm khoá học khác</button>
            </main>
        </div>
        <div className="text-center" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {
            courseId && (
                <div className="col-sm-6 col-lg-9">
                      <div className="card" style={{marginTop: '16px'}}>
                        <div className="card-body">
                        <h1 className="card-title">{courseId.name}</h1>
                        <br></br>
                        <img style={{width: '750px'}} className="card-img-top" src={courseId.photo} />
                        <br></br>
                        <br></br>
                        <br></br>
                          <p className="card-text">{courseId.description}</p>
                          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gridTemplateRows: 'repeat(2, auto)',
                            gap: '10px'
                            }}>
                            {
                              isLoggedIn ? (
                                <button type='button' onClick={addCourse} className="btn btn-danger">Đăng ký khóa học ngay</button>
                              ) : (
                                <button type='button' onClick={loginDirect} className="btn btn-danger">Đăng ký khóa học ngay</button>
                              )
                            }
                            <a href="#" className="btn btn-warning">{courseId.price} VND</a>
                            <a href="#" className="btn btn-dark">{courseId.number_of_students} học viên đã đăng ký</a>
                            <a href="#" className="btn btn-success">{courseId.type} - {courseId.duration} tháng học</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>   
            )
        }
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footers></Footers>
    </div>
  )
}

export default CourseDetails