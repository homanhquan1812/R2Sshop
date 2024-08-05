import { React, useState, useEffect } from 'react'
import axios from 'axios'
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
    const [courseId, setCourseId] = useState({})
    const navigateTo = useNavigate()

    const handleAddProduct = () => {
      navigateTo('/courses')
    }

    useEffect(() => {
        const fetchProductsAPI = async () => {
          try {
            const response = await fetch(`http://localhost:8080/courses/${id}`)
    
            if (!response.ok) {
              console.error('Failed to fetch data!')
            }
    
            const data = await response.json()
            setCourseId(data)
          } catch (error) {
            console.error("Error: ", error)
          }
        }
    
        fetchProductsAPI()
    
        // Fetch data every 2 seconds
        const intervalId = setInterval(() => {
          fetchProductsAPI()
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
            courseId && courseId.category && courseId.variant_courses[0] && (
                <div className="col-sm-6 col-lg-9">
                      <div className="card" style={{marginTop: '16px'}}>
                        <div className="card-body">
                        <h1 className="card-title">{courseId.name}</h1>
                        <br></br>
                        <img style={{width: '750px'}} className="card-img-top" src={courseId.variant_courses[0].photo} />
                        <br></br>
                        <br></br>
                        <br></br>
                          <p className="card-text">{courseId.category.description}</p>
                          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gridTemplateRows: 'repeat(2, auto)',
                            gap: '10px'
                            }}>
                            <a href={`/courses/${courseId.id}`} className="btn btn-danger">Đăng ký khóa học ngay</a>
                            <a href="#" className="btn btn-warning">{courseId.variant_courses[0].price} VND</a>
                            <a href="#" className="btn btn-dark">{courseId.variant_courses[0].number_of_students} học viên đã đăng ký</a>
                            <a href="#" className="btn btn-success">{courseId.variant_courses[0].type} - {courseId.variant_courses[0].duration} tháng học</a>
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