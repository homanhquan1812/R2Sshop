import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const EditCourses = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [photo, setPhoto] = useState('')
  const navigateTo = useNavigate()

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/courses/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data!')
        }
        const data = await response.json()
        setCourseData(data)
        setName(data.name || '')
        setType(data.variant_courses?.[0]?.type || '')
        setPrice(data.variant_courses?.[0]?.price || '')
        setDescription(data.category?.description || '')
        setDuration(data.variant_courses?.[0]?.duration || '')
        setPhoto(data.variant_courses?.[0]?.photo || '')
      } catch (error) {
        console.error("Error: ", error)
      }
    }

    fetchCourseData()
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:8080/courses/${id}`, {
        name,
        variant_courses: [{ id: courseData.variant_courses[0].id, type, price, duration, photo, courseId: id }],
        category: { id: courseData.category.id, name: courseData.category.name, description }
      })
      if (response.status === 200) {
        console.log('Updated course successfully!', response.data)
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
            <h2>Chỉnh sửa khóa học:</h2>
            <br></br>
            <form onSubmit={submit}>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Tên khoá học</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Loại khóa học</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="type" value={type} onChange={(e) => setType(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Mô tả</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Giá tiền</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Thời lượng học</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Link ảnh minh họa</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
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

export default EditCourses
