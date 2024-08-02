import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Show_Products = () => {
  const [products, setProducts] = useState([])
  const navigateTo = useNavigate()

  const handleAddProduct = () => {
      navigateTo('/products/add')
  }

  const deleteProduct = async (id, e) => {
    e.preventDefault()

    try {
      const response = await axios.delete(`http://localhost:5000/products/${id}`)
      
      if (response.status == 200) {
        console.log('Deleted this product successfully.')
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  useEffect(() => {
    const fetchProductsAPI = async () => {
      try {
        const response = await fetch('http://localhost:5000/products')
        const data = await response.json()
        setProducts(data.products)
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
              <h2>List of Products</h2>
              <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Add new product</button>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th style={{width: '30%'}}>Description</th>
                    <th>Price</th>
                    <th style={{width: '20%'}}>Created at</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{product.csw_products}</td>
                        <td>{product.type}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.createdAt}</td>
                        <td>
                          <a className="btn btn-warning" href={`/products/edit/${product.id}`}>Edit</a>
                          <form method="POST" style={{display: 'inline', marginLeft: '5px'}}>
                            <button className="btn btn-danger" onClick={(e) => deleteProduct(product.id, e)}>Delete</button>
                          </form>
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
              </table>
              <br /><br />
            </div>
            </main>
        </div>
        <Footers></Footers>
    </div>
  )
}

export default Show_Products