import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Cart = () => {
  const [user, setUser] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [cart, setCart] = useState([{
    items: [],
    totalPrice: 0
  }])
  const [role, setRole] = useState('')
  const [userId, setUserId] = useState('')
  const navigateTo = useNavigate()

  const deleteCourse = async (id) => {
    const response = await axios.delete(`http://localhost:5000/updateinfo/deletecourse/${userId}/${id}`)

    if (response.status == 200) {
      console.log("Course deleted from user's cart successfully!")
    }
  }

  const orderCourse = async (id) => {
    try {
      const response = await axios.post('http://localhost:5000/order', {
        name, email, phonenumber, cart, status: true, userId: id
      })

      if (response.status == 201) {
        console.log('Order added successfully.')
        navigateTo('/success')
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      const decodedToken = jwtDecode(token)

      setRole(decodedToken.role)
      setUserId(decodedToken.id)
      setUsername(decodedToken.username)
      setName(decodedToken.name)
      setPhoneNumber(decodedToken.phonenumber)
      setEmail(decodedToken.email)
    }

    const checkToken = () => {
      const token = localStorage.getItem('token')

      if (token) {
        try {
          const decodedToken = jwtDecode(token)
          setUser(decodedToken)
          setIsLoggedIn(true)
        } catch (error) {
          console.error('Invalid token:', error)
        }
      }
      else {
        setIsLoggedIn(false)
      }
    }

    const getCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/updateinfo/cart/${userId}`, {
          withCredentials: true // Ensure cookies are sent
        })
        
        if (response.status == 200) {
          console.log("User's cart fetched successfully.")
          const data = await response.json()
          setCart(data.cart.cart)
        }
      } catch (error) {
        console.error(error)
      }
    }

    const intervalId = setInterval(() => {
      checkToken()
      getCourse()
    }, 1000) // Check every second

    return () => clearInterval(intervalId)
  }, [userId])

  return (
    <div>
      <Heads></Heads>
      <Headers></Headers>
      <div class="container">
        <main role="main" class="pb-3">
          <br></br>
          <h2>Giỏ hàng của bạn:</h2>
        <div className="container cart" style={{marginTop: '-100px'}}>
        <div className="cart_menu">
        <p style={{fontSize: '20px'}} className="text sp">Số thứ tự</p>
        <p style={{fontSize: '20px', marginLeft: '-450px'}} className="text sp">Khóa học</p>
        <p style={{fontSize: '20px'}} className="text dg"></p>
        <p style={{fontSize: '20px'}} className="text st">Giá tiền</p>
        <p style={{fontSize: '20px'}} className="text tt">Điều chỉnh</p>
        </div>
        <section className="cart_content">
        <section className="cart_item" role="list">
            {
              cart.items && cart.items.map((item, index) => (
                <div>
                  <div className="product_name" role="listitem">
            <div className="sanPham">
              <div className="ten_hinh">
                <div className="ten_hinh_item">
                    <div className="ten_hinh_text">
                    <a className title="description_hinh ">{index + 1}</a>
                    </div>
                </div>
                </div>
                <div className="ten_hinh">
                <div className="ten_hinh_item"><a title="hinh_san_pham">
                  <img style={{height: '85px', width: '150px', marginLeft: '-260px'}} src={item.photo} /></a>
                    <div className="ten_hinh_text" style={{marginLeft: '-100px', marginTop: '20px'}}>
                    <a className title="description_hinh ">{item.name}</a>
                    </div>
                </div>
                </div>
                <div className="content_donGia">
                <div>
                    <span className="donGia_text"><a title="hinh_san_pham">
                    </a></span>
                </div>
                </div>
                <div className="content_soLuong">
                </div>
                <div className="content_soTien">
                <span style={{marginLeft: '-260px'}}>{item.price}</span>
                </div>
                <div className="content_thaoTac">
                    <button style={{ marginLeft: '-160px'}} onClick={() => deleteCourse(item._id)} className="fX1Y2g button-pink">Xóa</button>
                </div>
            </div>
            </div>
                </div>
              ))
            }
        </section>
        </section>
        <section className="cart_total">
        <div className="s1Gxkq">
            <div className="UQv8V6" role="region">
            <div className="fyYBP1" >
                <div className="aiyQAr">
                <div style={{marginLeft: '30px'}} className="total">Tổng giá tiền: {cart.totalPrice}</div>
                </div>
            </div>
            </div>
            <button className="button-pink" style={{marginLeft: '40px', marginRight: '50px'}} onClick={() => orderCourse(userId)}><span className="TTXpRG">Order</span></button>
        </div>
        </section>
    </div>
        </main>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <Footers></Footers>
    </div>
  )
}

export default Cart