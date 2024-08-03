import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Cart = () => {
  const [user, setUser] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
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

    checkToken()

    const intervalId = setInterval(checkToken, 1000) // Check every second

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <Heads></Heads>
      <Headers></Headers>
      <div class="container">
        <main role="main" class="pb-3">
          <br></br>
          <h2>Giỏ hàng của bạn:</h2>
        <div className="container cart">
        <div className="cart_menu">
        <p className="text sp">Product Name</p>
        <p className="text dg">Price</p>
        <p className="text sl">Quantity</p>
        <p className="text st">Total Cost</p>
        <p className="text tt">Action</p>
        </div>
        {'{'}{'{'}#each info.csw_cart.items{'}'}{'}'}
        <section className="cart_content">
        <section className="cart_item" role="list">
            <div className="product_name" role="listitem">
            <div className="sanPham">
                <div className="ten_hinh">
                <div className="ten_hinh_item"><a title="hinh_san_pham"><img style={{height: '85px', width: '100px'}} src="{{this.photo}}" /></a>
                    <div className="ten_hinh_text">
                    <a className title="description_hinh ">{'{'}{'{'}this.name{'}'}{'}'}</a>
                    </div>
                </div>
                </div>
                <div className="content_donGia">
                <div>
                    <span className="donGia_text">{'{'}{'{'}this.price{'}'}{'}'}</span>
                </div>
                </div>
                <div className="content_soLuong">
                <form action="/shoppingcart/changeQuantity" method="POST">
                    <div className="add_minus">
                    <input className="EOdsa- v3H4Zf" type="text" role="spinbutton" aria-valuenow={1} name="quantity" defaultValue="{{this.qty}}" required />
                    <input type="hidden" name="id" defaultValue="{{this.productId}}" />
                    <input type="submit" hidden />
                    </div>
                </form>
                </div>
                <div className="content_soTien">
                <span>{'{'}{'{'}this.totalCost{'}'}{'}'}</span>
                </div>
                <div className="content_thaoTac">
                <form action="/shoppingcart/deleteFromCart" method="POST">
                    <input type="hidden" name="id" defaultValue="{{this.productId}}" />
                    <button className="fX1Y2g button-pink">Delete</button>
                </form>
                </div>
            </div>
            </div>
        </section>
        </section>
        {'{'}{'{'}/each{'}'}{'}'}
        <section className="cart_total">
        <div style={{margin: '10px 0 10px 10px', fontWeight: 700}}><u>Note</u>: Press Enter after you change the quantity of a product.</div>
        </section>
        <section className="cart_total">
        <div className="s1Gxkq">
            <div className="UQv8V6" role="region">
            <div className="fyYBP1">
                <div className="aiyQAr">
                <div className="A-CcKC">Total Cost:</div>
                <div className="total">{'{'}{'{'}info.csw_cart.totalPrice{'}'}{'}'}</div>
                </div>
            </div>
            </div>
            <form action="/shoppingcart/sendToOrder" method="POST">
            <input type="hidden" name="id" defaultValue="{{info.csw_cart}}" />
            <button className="button-pink"><span className="TTXpRG">Order</span></button>
            </form>
        </div>
        </section>
    </div>
        </main>
      </div>
      <Footers></Footers>
    </div>
  )
}

export default Cart