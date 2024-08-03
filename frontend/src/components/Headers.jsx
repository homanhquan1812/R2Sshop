import React, { useEffect, useState } from 'react'

const Headers = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const isJwtExpired = (token) => {
        if (!token) return true
        const parts = token.split('.')
        if (parts.length !== 3) return true
        try {
            const payload = JSON.parse(atob(parts[1]))
            if (!payload.exp) return false
            const currentTime = Math.floor(Date.now() / 1000)
            return payload.exp < currentTime
        } catch (error) {
            console.error('Error decoding token:', error)
            return true
        }
    }

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token')
            if (token && !isJwtExpired(token)) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
                localStorage.removeItem('token')
            }
        }

        checkLoginStatus()
        const intervalId = setInterval(checkLoginStatus, 1000) // Check every second

        return () => clearInterval(intervalId)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
    }

  return (
    <div>
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                <a className="navbar-brand" href="/"><img style={{width: '79px', height: '47.5px'}} src='/img/logo.png'></img></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="/">Trang chủ</a>
                    </li>     
                    {/*
{
                        isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/products">Products</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" onClick={handleLogout} href="/">Logout</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/register">Register</a>
                                </li>
                            </>
                        )
                    }
                    */}
                    <li className="nav-item">
                                    <a className="nav-link text-dark" href="/courses">Khoá học</a>
                                </li>
                                <li className="nav-item">
                        <a className="nav-link text-dark" href="/about">Giới thiệu</a>
                    </li>   
                                <li className="nav-item">
                                    <a className="nav-link text-dark" onClick={handleLogout} href="/">Đăng xuất</a>
                                </li>
                    
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="/cart">Giỏ hàng</a>
                    </li> 
                    </ul>
                </div>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Headers