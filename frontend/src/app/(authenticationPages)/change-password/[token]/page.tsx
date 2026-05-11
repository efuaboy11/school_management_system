'use client';
import { useForm } from "react-hook-form";
import { use } from 'react';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import "../../../../css/authCss/auth.css"
import Link from 'next/link';
import AuthContext from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = use(params);
  
  const { 
    username,
    password,
    setChangePasswordToken,


    disableButton,

    loader,

    usernameValidation,
    passwordValidation,

    ChangePassword,
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


  const {register, handleSubmit, formState: { errors}} = useForm<FormData>();

  const onSubmit = (data: FormData, e:any) => {
    ChangePassword(e)
  }

  useEffect(() =>{
    setChangePasswordToken(token)
    console.log(token)
  }, [])

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
                      <p className='pt-4 lg-text font-bold auth-header'>Modern Tools for Modern Schools</p>
                      <p className='light-text'>Bring teachers, students, and parents together with seamless digital solutions.</p>
                      <p className="light-text xsm-text italic-text">Intelligence plus character — that is the goal of true education. — Martin Luther King Jr.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <div className="d-block d-md-none pb-3">
                    <div className="d-flex align-center">
                      <div>
                        <Image  className='logo' src="/img/logo.png" alt="Logo" width={100} height={100} />
                      </div>
                    </div>
                  </div>
                  <p className='lg-text font-bold auth-header pb-4 primary-text'>Change  Details</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">New Username</label>
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
                          autoComplete="off"
                          autoCorrect="off"
                          
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
                        <label className="form-label">New Password</label>
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
                            autoComplete="off"
                            autoCorrect="off"
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

export default ChangePassword