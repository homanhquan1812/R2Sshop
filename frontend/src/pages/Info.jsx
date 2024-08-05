import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Info = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [full_name, setFull_name] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const navigateTo = useNavigate()

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data!')
        }
        const data = await response.json()
        setCourseData(data)
        setUsername(data.username || '')
        setFull_name(data.full_name || '')
        setEmail(data.email || '')
        setAddress(data.address || '')
        // Decode Base64 password
        const decodedPassword = atob(data.password || '')
        setPassword(decodedPassword)
      } catch (error) {
        console.error("Error: ", error)
      }
    }

    fetchCourseData()
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const encodedPassword = btoa(password) // Encode password before sending
      const response = await axios.put(`http://localhost:8080/user/${id}`, {
        id: courseData.id, username, password: encodedPassword, email, full_name
      })
      if (response.status === 200) {
        console.log('Updated user successfully!', response.data)
        navigateTo('/courses')
      }
    } catch (error) {
      console.error("Error: ", error)
      navigateTo('/courses') // Will fix later
    }
  }

  return (
    <div>
      <Heads />
      <Headers />
      <div className="container">
        <main role="main" className="pb-3">
          <div>
            <br />
            <h2>Chỉnh sửa người dùng:</h2>
            <br></br>
            <form onSubmit={submit}>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Tài khoản</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled/>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Mật khẩu</label>
                <div className="col-sm-6">
                  <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Tên đầy đủ</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="full_name" value={full_name} onChange={(e) => setFull_name(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Địa chỉ</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="offset-sm-3 col-sm-3 d-grid">
                  <button type="submit" className="btn btn-primary">Cập nhật ngay</button>
                </div>
                <div className="col-sm-3 d-grid">
                  <a className="btn btn-outline-primary" href="/courses" role="button">Thoát</a>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footers />
    </div>
  )
}

export default Info