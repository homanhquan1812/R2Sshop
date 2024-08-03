import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const EditCourses = () => {
  const { id } = useParams()
  const [productID, setProductID] = useState([])
  const [csw_products, setCswProducts] = useState(productID.csw_products)
  const [type, setType] = useState(productID.type)
  const [price, setPrice] = useState(productID.price)
  const [description, setDescription] = useState(productID.description)
  const navigateTo = useNavigate()

  useEffect(() => {
    const fetchProductsAPI = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/edit/${id}`)

        if (!response.ok) {
          console.error('Failed to fetch data!')
        }

        const data = await response.json()
        setProductID(data.productID)
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

  const submit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await axios.put(`http://localhost:5000/products/edit/${id}`, {
        csw_products: csw_products, 
        type: type, 
        description: description, 
        price: price
      })

      if (response.status == 200) {
        console.log('Updated product successfully!')
        navigateTo('/products')
      }
    } catch (error) {
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
              <h2>Chỉnh sửa khóa học:</h2>
              {/*
                <div class='alert alert-warning alert-dismissible fade show' role='alert'>
              <strong>@Model.failureMessage</strong>
              <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                </div>
            */}
              {
                productID && (
                  <form method="POST" onSubmit={submit}>
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label">Name</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control" name="csw_products" id="csw_products" defaultValue={productID.csw_products} onChange={(e) => setCswProducts(e.target.value)} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label">Type</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control" name="type" id="type" defaultValue={productID.type} onChange={(e) => setType(e.target.value)}/>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label">Description</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control" name="description" id="description" defaultValue={productID.description} onChange={(e) => setDescription(e.target.value)} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label">Price</label>
                      <div className="col-sm-6">
                        <input type="text" className="form-control" name="price" id="price" defaultValue={productID.price} onChange={(e) => setPrice(e.target.value)} />
                      </div>
                    </div>
                    {/*
                  <div class='alert alert-success alert-dismissible fade show' role='alert'>
                      <strong>@Model.successMessage</strong>
                      <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                  </div>
                    */}
                    <div className="row mb-3">
                      <div className="offset-sm-3 col-sm-3 d-grid">
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                      <div className="col-sm-3 d-grid">
                        <a className="btn btn-outline-primary" href="/products" role="button">Cancel</a>
                      </div>
                    </div>
                  </form>
                )
              }
            </div>
            </main>
        </div>
      <Footers></Footers>
    </div>
  )
}

export default EditCourses