import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const AddCourses = () => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [photo, setPhoto] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault();

    try {
      const number_of_students = 0
      const response = await axios.post('http://localhost:8080/courses', {
        name,
        category: { name, description },
        variant_courses: [{ type, price, number_of_students, duration, photo }]
      })

      if (response.status === 201) {
        console.log('Added a new course successfully!')
        navigate('/courses')
      }
    } catch (error) {
      console.error("Error adding a new course:", error)
    }
  }

  return (
    <div>
      <Heads />
      <Headers />
      <div className="container">
        <main role="main" className="pb-3">
          <br />
          <h2>Thêm khóa học mới:</h2>
          <br />
          <form method="POST" onSubmit={submit}>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Tên khoá học</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Loại khóa học</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Mô tả</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Giá tiền</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Thời lượng học</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Link ảnh minh họa</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="photo" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="offset-sm-3 col-sm-3 d-grid">
                <button type="submit" className="btn btn-primary">Tạo ngay</button>
              </div>
              <div className="col-sm-3 d-grid">
                <a className="btn btn-outline-primary" href="/courses" role="button">Thoát</a>
              </div>
            </div>
          </form>
        </main>
      </div>
      <Footers />
    </div>
  )
}

export default AddCourses