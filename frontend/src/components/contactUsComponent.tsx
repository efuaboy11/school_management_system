"use client"

import AuthContext from '@/context/AuthContext'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

const ContactUsComponent = () => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [subject, setSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const {

    authTokens,

    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,




  } = useContext(AuthContext)!



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: FormData, e: any) => {
    SendEmail(e)
  }


  const SendEmail = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('email', email)
    formData.append('name', userName)
    formData.append('subject', subject)
    formData.append('message', emailMessage)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/contact-us/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Email sent')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setEmailMessage('')
        setEmail('')
        setUserName('')
        setSubject('')



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







  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-md-11 col-xl-7">

            <div className="text-center mb-4">
              <p className='md-text'>Support Center</p>
              <p className='light-text'>Send us a direct email and our support team will get back to you <br /> shortly.</p>
            </div>
            <div className="site-boxes border-radius-10px">
              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3 align-center">
                    <div className="col-md-3 col-12">
                      <p className=''>Your Email Address:</p>
                    </div>

                    <div className="col-md-9 col-12">
                      <input type="text" className={`site-input ${errors.email ? 'error-input' : ''}`} {...register('email', { required: true })} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email:" />
                      {errors.email && <span style={{ color: 'red' }}>This Feild is required</span>}
                    </div>


                    <div className="col-md-3 col-12">
                      <p className=''>Your FullName:</p>
                    </div>

                    <div className="col-md-9 col-12">
                      <input type="text" className={`site-input ${errors.userName ? 'error-input' : ''}`} {...register('userName', { required: true })} value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="userName:" />
                      {errors.userName && <span style={{ color: 'red' }}>This Feild is required</span>}
                    </div>

                    <div className="col-md-3 col-12">
                      <p className=''>Email Subject:</p>
                    </div>

                    <div className="col-md-9 col-12">
                      <input type="text" className={`site-input ${errors.subject ? 'error-input' : ''}`} {...register('subject', { required: true })} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email Subject:" />
                      {errors.subject && <span style={{ color: 'red' }}>This Feild is required</span>}
                    </div>

                    <div className="col-12">
                      <textarea rows={9} className={`site-input ${errors.emailMessage ? 'error-input' : ''}`} {...register('emailMessage', { required: true })} value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} placeholder="Write Your Message"></textarea>
                      {errors.emailMessage && <span style={{ color: 'red' }}>This Feild is required</span>}
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
        </div>
      </div>
    </div>
  )
}

export default ContactUsComponent