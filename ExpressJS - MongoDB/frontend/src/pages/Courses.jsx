import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Courses = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [role, setRole] = useState([])
  const productsPerPage = 6

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage)

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const navigateTo = useNavigate()

  const handleAddProduct = () => {
      navigateTo('/courses/add')
  }

  const deleteProduct = async (id, e) => {
    e.preventDefault()

    try {
      const response = await axios.delete(`http://localhost:5000/course/${id}`)
      
      if (response.status == 200) {
        console.log('Deleted this product successfully.')
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  useEffect(() => {
    // Token information
    const token = localStorage.getItem('token')

    if (token) {
      const decodedToken = jwtDecode(token)
      console.log('Decoded Token:', decodedToken)

      const userId = decodedToken.id
      const username = decodedToken.username
      const name = decodedToken.name
      const role = decodedToken.role

      console.log('User ID:', userId)
      console.log('Username:', username)
      console.log('Name:', name)
      console.log('Role:', role)

      setRole(decodedToken.role)
    }
    
    const fetchProductsAPI = async () => {
      try {
        const response = await fetch('http://localhost:5000/course', {
          withCredentials: true // Ensure cookies are sent
        })
        const data = await response.json()
        setProducts(data.course)
      } catch (error) {
        console.error("Error: ", error)
      }
    }

    fetchProductsAPI()

    const intervalId = setInterval(() => {
      fetchProductsAPI()
    }, 2000) // 2 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <Heads></Heads>
      <Headers></Headers>
      <div class="container">
            <main role="main" class="pb-3">
            <div>
              <br />
              <h2>Tất cả khóa học tại R2S:</h2>
              {
                role == 'Admin' && (
                  <>
                  <br></br>
                  <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Thêm khoá học mới</button>
                  </>
                )
              }
              <div className='mt-4'>
                <div className='row'>
                  {currentProducts.map((product, index) => (
                    <div className="col-sm-6 col-lg-4" key={index}>
                      <div className="card" style={{marginTop: '16px', width: '100%', height: '410px'}}>
                        <img className="card-img-top" src={product.photo} style={{height: '200px', objectFit: 'cover'}} />
                        <div className="card-body" style={{height: '200px', overflow: 'auto'}}>
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{product.description}</p>
                          {/*
                          <div style={{position: 'absolute', bottom: '25px', left: 0, right: 0, textAlign: 'center'}}>
                            <a href={`/courses/${product.id}`} className="btn btn-primary">Chi tiết khóa học</a>
                          </div>
                          */}
                          {
                            role == 'Admin' ? (
                                <div style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(2, 1fr)',
                                  gridTemplateRows: 'repeat(2, auto)',
                                  gap: '10px',
                                  position: 'absolute', bottom: '10px', left: '25px', right: '25px'}}>
                                  <a href={`/courses/${product._id}`} className="btn btn-primary">Chi tiết khóa học</a>
                                  <a href={`/courses/edit/${product._id}`} className="btn btn-danger">Chỉnh sửa khóa học</a>
                                </div>
                            ) : (
                              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: '20px', left: '25px', right: '25px'}}>
                                <a href={`/courses/${product._id}`} className="btn btn-primary">Chi tiết khóa học</a>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>                  
                  ))}
                </div>
              </div>
              <br></br>
              <div className="pagination" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <div>
                    <button key={index} style={{ margin: '0 3px' }} onClick={() => paginate(index + 1)} className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}>
                      {index + 1}
                    </button>
                  </div>
                ))}
              </div>
              <br /><br />
              <br /><br />
            </div>
            </main>
        </div>
        <Footers></Footers>
    </div>
  )
}

export default Courses