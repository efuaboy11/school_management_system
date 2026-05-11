import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const SchoolFessSuccess = () => {
  return (
    <div>
      <div className="container-lg py-5">
        <div className="row justify-content-center align-center">
          <div className="col-lg-10">
            <div className='site-boxes py-5 px-4 border-radius-5px'>
              <div className="d-flex justify-content-center">
                <div>


                  <div className="d-flex justify-content-center width-100">
                      <Image  src="/img/icon/good-icon.png" alt="Logo" width={130} height={120} />
                    {/* <img src="/img/icon/good-icon.png" alt='' width='150px'/> */}
                  </div>
                  
                  <div className="text-center">
                    <p className='lg-text font-bold auth-header  primary-text '>Payment Successful</p>
                    <p className="light-text">The payment have been saved in the database. Check your school fees payment page <br /> for confirmation</p>
                  </div>
                  <div className="row justify-content-center mt-3">
                    <div className="col-lg-6 col-md-9 col-sm-10">
                      <Link href='/admin/school-fees-payment/add/step-1' className="site-btn width-100 Link">Make another payment</Link>
                      <div className="text-center mt-2">
                        <Link href='/admin/home' className="light-link"><i className="ri-home-smile-line pe-1"></i>Home</Link>
                      </div>
                     
                    </div>
                  </div>
                </div>
                

              </div>
              
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default SchoolFessSuccess