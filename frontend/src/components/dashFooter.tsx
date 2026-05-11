import React from 'react'
import Image from 'next/image'

export const DashboardFooter = () => {
  return (
    <div className='mt-5 container-xl'>
      <div className="site-boxes width-100  border-top-dark border-raidus-top-10px px-3 py-3  sm-text ">
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-none d-md-flex align-items-center">
              <Image className='logo' src="/img/logo.png" alt="Logo" width={50} height={50} />
              <span className=" light-text">Dashboard</span>
            </div>
            <div className="d-flex align-items-center">
              <span className='light-text'>Copyright© 2023 My Company</span>
            </div>
            <div className="d-none d-md-flex align-items-center">
              <span className='light-text'>Privacy Policy</span>
              <span className="mx-2">|</span>
              <span className='light-text'>Terms of Service</span>
        </div>  
        </div>
      </div>
    </div>
  )
}
