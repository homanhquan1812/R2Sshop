import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [key, setKey] = useState('')
  const [registerError, setRegisterError] = useState(false)
  const [registerSuccessful, setRegisterSuccessful] = useState(false)
  const navigateTo = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username, password, name, key
      })

      if (response.status == 201) {
        // console.log('Added a new user successfully!')
        setRegisterError(false)
        setRegisterSuccessful(true)
          
        setTimeout(() => {
          navigateTo('/login');
        }, 3000); // 3 seconds
      } 
    } catch (error) {
      setRegisterError(true)
      setRegisterSuccessful(false)
      console.error("Error: ", error)
    }
  }

  return (
    <div>
      <Heads></Heads>
      <Headers></Headers>
      <div class="container">
            <main role="main" class="pb-3">
            <div>
              <br />
              <h2>Đăng ký tài khoản</h2>
              <br></br>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Tên đầy đủ</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Tài khoản</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Mật khẩu</label>
                  <div className="col-sm-6">
                    <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Mã Key</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" placeholder='Chỉ dành cho nhân viên R2Sshop, vui lòng để trống.' name="key" id="key" value={key} onChange={(e) => setKey(e.target.value)} />
                  </div>
                </div>
                {
                  registerSuccessful && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <strong>Tạo tài khoản thành công. Đang điều hướng đến trang đăng nhập!</strong>
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    </div>
                  )
                }
                {
                  registerError && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                      <strong>Tên tài khoản này đã tồn tại, vui lòng chọn tên khác.</strong>
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    </div>
                  )
                }
                <div className="row mb-3">
                  <div className="offset-sm-3 col-sm-3 d-grid">
                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                  </div>
                  <div className="col-sm-3 d-grid">
                    <a className="btn btn-outline-primary" href="/" role="button">Hủy</a>
                  </div>
                </div>
              </form>
            </div>
            </main>
        </div>
        <Footers></Footers>
    </div>
  )
}

export default Register