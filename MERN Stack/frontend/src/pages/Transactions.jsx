import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Transactions = () => {
  const { id } = useParams()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState([])
  const [userOrders, setUserOrders] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      const decodedToken = jwtDecode(token)

      setRole(decodedToken.role)
      setUserId(decodedToken.id)
      setName(decodedToken.name)
      setPhoneNumber(decodedToken.phonenumber)
      setEmail(decodedToken.email)
      setUsername(decodedToken.username)
    }

    if (role === 'Admin') {
      // For Admin's transactions
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/order')
  
          if (response.status === 200) {
            const data = await response.json()
            setOrders(data.orders)
            console.log('Got all orders successfully.')
          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchData()

      const intervalId = setInterval(() => {
        fetchData()
      }, 6000) // 60 seconds
  
      return () => clearInterval(intervalId)
    } else {
      // For specific user's transactions
      const fetchData2 = async () => {
        try {
          const response = await fetch('http://localhost:5000/order')
          if (response.status === 200) {
            const data = await response.json()
            const userOrders = data.orders.filter(order => order.userId === userId)
            setUserOrders(userOrders)
            console.log("Got user's orders successfully.")
          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchData2()

      const intervalId = setInterval(() => {
        fetchData2()
      }, 6000) // 60 seconds
  
      return () => clearInterval(intervalId)
    }
  }, [userId])

  return (
    <div>
      <Heads></Heads>
      <Headers></Headers>
      <div class="container">
        <main role="main" class="pb-3">
          <div>
            <br></br>
            {
              role == 'User' ? (
                <>
                <h2>Lịch sử giao dịch:</h2>
                  <div id="container" style={{marginTop: '50px'}}>
                    <div className="printing-history-box">
                    <div className="table-container">
                        <table className="content-table">
                        <thead>
                            <tr>
                            <th>Ngày đặt</th>
                            <th>Khoá học</th>
                            <th>Tổng giá tiền</th>
                            <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            userOrders.map((order, index) => (
                              (order.cart.items.length > 0) ? (
                                <tr key={index}>
                                <td>{order.createdAt}</td>
                                {
                                  order.cart.items.map((item, index) => (
                                    <div key={index} style={{marginTop: '20px', marginBottom: '20px'}}>
                                      {item.name}
                                    </div>
                                  ))
                                }
                                <td>{order.cart.totalPrice}</td>
                                <td>
                                  {order.status ? (
                                    <button type="button" className="btn btn-success">Thành công</button>
                                  ) : (
                                    <button type="button" className="btn btn-danger">Thất bại</button>
                                  )}
                                </td>
                              </tr>
                              ) : (
                                <td colSpan={4}>Bạn chưa đăng kí khóa nào</td>
                              )
                            ))
                          }
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </>
              ) : (
                <>
                <h2>Tất cả đơn hàng:</h2>
                <div id="container" style={{marginTop: '50px'}}>
                    <div className="printing-history-box">
                    <div className="table-container">
                        <table className="content-table">
                        <thead>
                            <tr>
                            <th>Tên học viên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Ngày đặt</th>
                            <th>Khoá học</th>
                            <th>Tổng giá tiền</th>
                            <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            orders.map((order, index) => (
                              (order.cart.items.length > 0) && (
                                <tr key={index}>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.phonenumber}</td>
                                <td>{order.createdAt}</td>
                                {
                                  order.cart.items.map((item, index) => (
                                    <div key={index} style={{marginTop: '20px', marginBottom: '20px'}}>
                                      {item.name}
                                    </div>
                                  ))
                                }
                                <td>{order.cart.totalPrice}</td>
                                <td>
                                  {order.status ? (
                                    <button type="button" className="btn btn-success">Thành công</button>
                                  ) : (
                                    <button type="button" className="btn btn-danger">Thất bại</button>
                                  )}
                                </td>
                              </tr>
                              )
                            ))
                          }
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </>
              )
            }
          </div>
        </main>
      </div>
      <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footers></Footers>
    </div>
  )
}

export default Transactions