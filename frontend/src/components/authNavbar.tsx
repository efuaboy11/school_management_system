import React from 'react'
import '../css/component/authNavbar.css'
import Image from 'next/image'
import Link from 'next/link'
const AuthNavbar = () => {
  return (
    <div>
      <nav className="auth-nav site-boxes">
        <div className="container-lg">
          <div className="d-flex align-center justify-content-between width-100">
            <div className='pt-1'>
              <Image className='logo' src="/img/logo.png" alt="Logo" width={50} height={50} />
            </div>

            <div className="d-flex">
              <div className="me-3">
                <Link href='' className='light-link'><i className="ri-whatsapp-line font-size-20px"></i></Link>
              </div>

              <div className="me-3">
                <Link href='' className='light-link'><i className="ri-facebook-circle-fill font-size-20px"></i></Link>
              </div>

              <div className="me-3">
                <Link href='' className='light-link'><i className="ri-instagram-line font-size-20px"></i></Link>
              </div>

              <div className="me-3">
                <Link href='' className='light-link'><i className="ri-twitter-x-line font-size-20px"></i></Link>
              </div>
            </div>
           
            
            
           
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AuthNavbar