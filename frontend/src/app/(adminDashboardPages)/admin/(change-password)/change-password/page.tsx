"use client"
import AuthContext from '@/context/AuthContext'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image';
import Link from 'next/link'


const ChangePasswordPage = () => {
  const {
    authTokens,

    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,

    LogoutUser,

    username,
    setUsername,
    password,
    setPassword,

    usernameValidation,
    passwordValidation,

    handlePasswordChange,
    handleUsernameChange,




  } = useContext(AuthContext)!


  type FormData = {
    username: string;
    password: string;
  }


  const [userDetails, setUserDetails] = useState<any>(null)
  const [showPassword, setShowPassword] = useState(false)

  const [passwordChangeSuccess, setPasswordSuccess] = useState(false)

  const toogleShowPassword = () => {
    setShowPassword(!showPassword)
  }





  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData, e: any) => {
    ChangePassword(e)
  }


  const ChangePassword = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)




    try {
      const response = await fetch(`https://school.amanilightequity.com/api/change-admin-password/`, {
        method: 'POST',
        body: JSON.stringify({
          username: userDetails?.username,
          new_username: username,
          new_password: password
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        setPasswordSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setUsername('')
        setPassword('')

        setTimeout(() => {
          LogoutUser(e); // Or just LogoutUser() if no `e` is needed
        }, 2000);



      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setIsSuccess(false)
        setLoader(false)
        showAlert()
      }


    } catch (error) {
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)

    }
  }


  const UserDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/me/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setUserDetails(data)
        console.log('data', data)
      }
    } catch {
      console.log('error')
    }

  }

  useEffect(() => {
    UserDetailsFunction()
  }, [])




  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          {passwordChangeSuccess ? (
            <div className='col-lg-10'>
              <div className="site-boxes border-radius-10px p-4">
                <div className="d-flex justify-content-center">
                  <div>


                    <div className="d-flex justify-content-center width-100">
                      <Image src="/img/icon/good-icon.png" alt="Logo" width={130} height={120} />
                      {/* <img src="/img/icon/good-icon.png" alt='' width='150px'/> */}
                    </div>

                    <div className="text-center">
                      <p className='lg-text font-bold auth-header pb-4 primary-text '>Successful</p>
                      <p className="light-text">Hurrayy🥳🥳!!! Your username and password has be changed.</p>
                      <p className="light-text xsm-text italic-text">Note: Due to security measures you will be logged out shortly. You will be required to log in again.</p>
                    </div>
                    <div className="row justify-content-center pt-4">
                      <div className="col-lg-6 col-md-9 col-sm-10">
                        <Link href='/login' className="site-btn width-100 Link">Login</Link>
                      </div>
                    </div>
                  </div>


                </div>
              </div>

            </div>
          ) : (
            <div className="col-lg-6 col-sm-8">
              <div className="site-boxes border-radius-10px">
                <div className="border-bottom1 text-center p-3">
                  <p>Change Username and Password</p>
                </div>

                <div className="p-3">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">

                      <div className="col-12">
                        <label htmlFor="phoneNumber" className="form-label">Username <span className="text-danger">*</span></label>
                        <input type='text' className={`site-input`} disabled value={userDetails?.username || ''} />
                      </div>


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
                          placeholder="Enter your new username"
                        />
                        {username && (
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
                          />
                          <span className="password-icon">
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toogleShowPassword} />
                          </span>
                        </div>
                        {password && (
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
                        <div className='mb-3'>
                          <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                            <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                            <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill me-2"></i> Submit</span>
                          </button>
                        </div>

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
  )
}

export default ChangePasswordPage