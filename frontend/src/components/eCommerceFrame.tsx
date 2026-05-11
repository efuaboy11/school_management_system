import React from 'react'
import '../css/component/authNavbar.css'
import Image from 'next/image'
import Link from 'next/link'
const EcommercePage = () => {
  return (
    <div>
      <nav className="auth-nav site-boxes">
        <div className="container-lg">
          <div className="d-flex align-center justify-content-between width-100">
            <div className='pt-1'>
              <Image className='logo' src="/img/logo.png" alt="Logo" width={50} height={50} />
            </div>

            <div className="d-flex">
              <div className="me-4">
                <Link href='' className='light-link'><i className="ri-home-line pe-2"></i>Home</Link>
              </div>

              <div className="me-4">
                <Link href='' className='light-link'><i className="bi bi-bag pe-2"></i>Product</Link>
              </div>

              <div className="me-4">
                <Link href='' className='light-link'><i className="bi bi-cart4 pe-2"></i>Cart</Link>
              </div>

              <div className="me-4">
                <Link href='' className='light-link'><i className="bi bi-heart pe-2"></i>Favourite</Link>
              </div>

              <div className="me-4">
                <Link href='' className='light-link'><i className="bi bi-journal pe-2"></i>Order History</Link>
              </div>
            </div>
           
            
            
           
          </div>
        </div>
      </nav>
    </div>
  )
}

export default EcommercePage