import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Add_A_Product = () => {
  const [csw_products, setCswProducts] = useState([])
  const [type, setType] = useState([])
  const [price, setPrice] = useState([])
  const [description, setDescription] = useState([])
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/products/add', {
        csw_products, type, description, price
      })

      if (response.status == 201) {
        console.log('Added a new product successfully!')
        navigate('/products')
      }
    } catch (error) {
      console.error("Error adding a new product:", error)
    }
  }

  return (
    <div>
      <Heads></Heads>
      <Headers></Headers>
      <div class="container">
            <main role="main" class="pb-3">
            <form method="POST" onSubmit={submit}>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="csw_products" id="csw_products" value={csw_products} onChange={(e) => setCswProducts(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Type</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Description</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Price</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="offset-sm-3 col-sm-3 d-grid">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="col-sm-3 d-grid">
                  <a className="btn btn-outline-primary" href="/products" role="button">Cancel</a>
                </div>
              </div>
            </form>
            </main>
        </div>
        <Footers></Footers>
    </div>
  )
}

export default Add_A_Product