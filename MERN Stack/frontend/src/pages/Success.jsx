import React, { useEffect, useState } from 'react'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Success = () => {
  return (
    <div>
      <Heads></Heads>
        <Headers></Headers>
      <div className="success_detail">
          <h2>Đăng ký khóa học thành công!</h2>
          <i className="fa-solid fa-check" />
          <h3>R2Sshop sẽ liên hệ lại với bạn để tư vấn và xác nhận.</h3>
          <h3>Xin vui lòng giữ liên lạc!</h3>
      </div>
      <div className="success_button">
          <button className="button-pink "><a href="/courses">Đăng ký tiếp</a></button>
          <button className="button-pink "><a href="/home">Quay lại trang chủ</a></button>
      </div>
      <Footers></Footers>
        <a href="#" className="backtotop cd-top text-replace js-cd-top">
            <i className="fa fa-angle-up" />
        </a>
    </div>
  )
}

export default Success