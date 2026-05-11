'use client';
import { useForm } from "react-hook-form";
import React, { useContext, useState } from 'react'
import Image from 'next/image';
import "../../../css/authCss/auth.css"
import Link from 'next/link';
import AuthContext from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
  
  const { 
    username,

    password,

    disableButton,
 
    loader,

    usernameValidation,
    passwordValidation,

    LoginUser,
    handlePasswordChange,
    handleUsernameChange,

  } = useContext(AuthContext)!

  const[ showPassword, setShowPassword] = useState(false)

  const toogleShowPassword = () =>{
    setShowPassword(!showPassword)
  }

  type FormData = {
    username: string;
    password: string;
  }


  const {register, handleSubmit, formState: { errors }} = useForm<FormData>();
  const onSubmit = (data: FormData, e:any) => {
    // if(isValid){
    //   console.log(data)
    //   LoginUser(e)
    // }else{
    //   console.log('error')
    //   setDisableButton(false)
    // }

    LoginUser(e)
  }

  return (
    <div className='container-lg py-5'>
      <div className="row justify-content-center align-center">
        <div className="col-lg-10">
          <div className="site-boxes py-5 px-4 border-radius-5px">
            <div className="row g-5 align-center">
              <div className="col-md-6">
                <div className="d-none d-md-block">
                  <div className="d-flex align-center">
                    <div>
                      <Image  className='logo' src="/img/logo.png" alt="Logo" width={100} height={100} />
                      <p className='pt-4 lg-text font-bold auth-header'>My School Management System</p>
                      <p className='light-text'>Easily manage student records, attendance, grades, and more — all in one place.</p>
                      <p className="light-text xsm-text italic-text">Education is the passport to the future, for tomorrow belongs to those who prepare for it today. — Malcolm X</p>
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
                  <p className='lg-text font-bold auth-header pb-4 primary-text'>Login</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Username</label>
                        <input 
                          type="text"
                          className={`${errors.username ? 'error-input' : ''} site-input`}
                          {...register("username", {
                            required: "Username is required",
                            minLength: {
                              value: 8,
                              message: "Username must be at least 8 characters"
                            },
                            pattern: {
                              value: /^(?=.*[A-Z]).{8,}$/,
                              message: "Username must contain at least one uppercase letter"
                            }
                          })}
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
                        {errors.username && <p className="error-text xsm-text">{errors.username.message}</p>}
                      </div>

                      <div className="col-12">
                        <label className="form-label">Password</label>
                        <div className="password-container">
                          <input 
                            type={showPassword ? "text" : "password"}
                            className={`site-input password-input ${errors.password ? 'error-input' : ''}`} 
                            {...register("password", {
                              required: "Password is required",
                              minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                              },
                              pattern: {
                                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                                message: "Password must contain at least one uppercase letter and one special character"
                              }
                            })}
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                          />
                          <span className="password-icon">
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toogleShowPassword} />
                          </span>
                        </div>
                        {password &&(
                          <div>
                            <div className="d-flex">
                              <i className={passwordValidation.minLength ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                              <p className={`pt-1 ps-3 xsm-text ${passwordValidation.minLength ? 'success-text' : 'error-text'}`}>
                                Password must be at least 8 characters
                              </p>
                            </div>

                            <div className="d-flex">
                              <i className={passwordValidation.hasUppercase ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                              <p className={`pt-1 ps-3 xsm-text ${passwordValidation.hasUppercase ? 'success-text' : 'error-text'}`}>
                                Password must contain at least one uppercase letter
                              </p>
                            </div>

                            <div className="d-flex">
                              <i className={passwordValidation.hasSpecialChar ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                              <p className={`pt-1 ps-3 xsm-text ${passwordValidation.hasSpecialChar ? 'success-text' : 'error-text'}`}>
                                Password must contain at least one special character
                              </p>
                            </div>
                          </div>
                        )}
                      

                        {errors.password && <p className="error-text xsm-text">{errors.password.message}</p>}
                      </div>

                      <div className="col-12">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-center ">
                            <input className="cursor-pointer" type="checkbox"/>
                            <label className="form-label ms-2 dark-blue-link">Remember me</label>
                          </div>
                          <div>
                            <p><Link className="blue-link form-label" href='/forgot-password'>Forgot password?</Link></p>
                          </div>
                        </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login