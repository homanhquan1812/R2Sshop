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
  const [courseData, setCourseData] = useState([])
  const [name, setName] = useState(courseData.name)
  const [type, setType] = useState(courseData.type)
  const [price, setPrice] = useState(courseData.price)
  const [description, setDescription] = useState(courseData.description)
  const [duration, setDuration] = useState(courseData.duration)
  const [photo, setPhoto] = useState(courseData.photo)
  const navigateTo = useNavigate()

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/course/edit/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data!')
        }
        const data = await response.json()
        setCourseData(data.courseID)
      } catch (error) {
        console.error("Error: ", error)
      }
    }

    fetchCourseData()
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:5000/course/edit/${id}`, {
        name, description, type, price, duration, photo
      })
      if (response.status === 200) {
        console.log('Updated course successfully!', response.data)
        navigateTo('/courses')
      }
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  const deleteProduct = async (id, e) => {
    e.preventDefault()

    try {
      const response = await axios.delete(`http://localhost:5000/course/edit/${id}`)
      
      if (response.status == 200) {
        navigateTo('/courses')
        console.log('Course deleted successfully.')
      }
    } catch (error) {
      console.error("Error deleting product:", error)
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
            {
              courseData && (
                <div>
                  <form onSubmit={submit}>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Tên khoá học</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="name" defaultValue={courseData.name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Loại khóa học</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="type" defaultValue={courseData.type} onChange={(e) => setType(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Mô tả</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="description" defaultValue={courseData.description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Giá tiền</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="price" defaultValue={courseData.price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Thời lượng học</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="duration" defaultValue={courseData.duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Link ảnh minh họa</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="photo" defaultValue={courseData.photo} onChange={(e) => setPhoto(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="offset-sm-3 col-sm-2 d-grid">
                  <button type="submit" className="btn btn-primary">Cập nhật ngay</button>
                </div>
                <div className="col-sm-2 d-grid">
                  <a className="btn btn-danger" onClick={(e) => deleteProduct(courseData._id, e)} role="button">Xoá khóa học này</a>
                </div>
                <div className="col-sm-2 d-grid">
                  <a className="btn btn-outline-primary" href="/courses" role="button">Thoát</a>
                </div>
              </div>
            </form>
                </div>
              )
            }
          </div>
        </main>
      </div>
      <Footers />
    </div>
  )
}

export default EditCourses
