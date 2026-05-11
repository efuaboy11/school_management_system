'use client';
import { useForm } from "react-hook-form";
import React, { useContext} from 'react'
import Image from 'next/image';
import "../../../css/authCss/auth.css"
import Link from 'next/link';
import AuthContext from "@/context/AuthContext";


const ForgetPassword = () => {
  
  const { 
    username,
    disableButton,
  
    loader,


    forgotPasswordSuccess,

    forgotPassword,

    usernameValidation,
    handleUsernameChange,

  } = useContext(AuthContext)!


  type FormData = {
    username: string;
  }


  const {register, handleSubmit, formState: { errors }} = useForm<FormData>();

  const onSubmit = (data: FormData, e:any) => {
    forgotPassword(e)
  }

  return (
    <div className='container-lg py-5'>
      <div className="row justify-content-center align-center">
        <div className="col-lg-10">
          <div className="site-boxes py-5 px-4 border-radius-5px">
            {forgotPasswordSuccess ? (
              <div>
                <div className="d-flex justify-content-center">
                  <div>


                    <div className="d-flex justify-content-center width-100">
                       <Image  src="/img/icon/good-icon.png" alt="Logo" width={130} height={120} />
                      {/* <img src="/img/icon/good-icon.png" alt='' width='150px'/> */}
                    </div>
                    
                    <div className="text-center">
                      <p className='lg-text font-bold auth-header pb-4 primary-text '>Successful</p>
                      <p className="light-text">We have received your request to change your password. Please visit the HR office at our school or contact the HR department to be granted access to update your password.</p>
                      <p className="light-text xsm-text italic-text">Note: Upon approval, you will receive a password reset link at your registered Gmail address.</p>
                    </div>
                     <div className="row justify-content-center">
                      <div className="col-lg-6 col-md-9 col-sm-10">
                        <Link href='/login' className="site-btn width-100 Link">Login</Link>
                      </div>
                     </div>
                  </div>
                 

                </div>
               
              </div>
            ): (
              <div className="row g-5 align-center">
                <div className="col-md-6">
                  <div className="d-none d-md-block">
                    <div className="d-flex align-center">
                      <div>
                        <Image  className='logo' src="/img/logo.png" alt="Logo" width={100} height={100} />
                        <p className='pt-4 lg-text font-bold auth-header'>Empowering Education with Smart Management</p>
                        <p className='light-text'>Simplify student enrollment, performance tracking, and communication in one powerful platform.</p>
                        <p className="light-text xsm-text italic-text">The function of education is to teach one to think intensively and to think critically. — Martin Luther King Jr.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="col-6 ">
                  <div style={{ position: 'relative', width: '100%', height: '580px' }}> 
                    <Image className='border-radius-5px' src="/img/auth/login.jpg" alt="Logo" fill priority style={{ objectFit: 'cover' }} />
                  </div>
                </div> */}

                <div className="col-md-6">
                  <div>
                    <div className="d-block d-md-none pb-3">
                      <div className="d-flex align-center">
                        <div>
                          <Image  className='logo' src="/img/logo.png" alt="Logo" width={100} height={100} />
                        </div>
                      </div>
                    </div>
                    <p className='lg-text font-bold auth-header pb-4 primary-text'>Forget Password</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label">Username</label>
                          <input 
                            type="text" className={`${errors.username ? 'error-input' : ''}  site-input`}
                            {...register("username", { required: true })}
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter your username"
    
                          />

                          {username &&(
                            <div>
                              <div>
                                <div className="d-flex">
                                  <i className={usernameValidation.minLength ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                                  <p className={`pt-1 ps-3 xsm-text ${usernameValidation.minLength ? 'success-text' : 'error-text'}`}>
                                    Username must be at least 8 characters
                                  </p>
                                </div>

                                <div className="d-flex">
                                  <i className={usernameValidation.hasUppercase ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                                  <p className={`pt-1 ps-3 xsm-text ${usernameValidation.hasUppercase ? 'success-text' : 'error-text'}`}>
                                    Username must contain at least one uppercase letter
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                          }

                          {errors.username && <p className="error-text">This field is required</p>}
                        </div>

                        <div className="col-12">
                        <button disabled={disableButton} type="submit" className={`Button site-btn width-100`}>
                          <span className={`${loader ? 'site-submit-spinner': ''}`}></span>
                          <span className={`${loader ? 'site-submit-btn-visiblity': ''}`}>Submit</span>
                        </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword