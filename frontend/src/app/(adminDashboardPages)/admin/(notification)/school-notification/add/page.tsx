"use client"
import AuthContext from '@/context/AuthContext'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

const UploadSchoolNotificationPage = () => {
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationSubject, setNotificationSubject] = useState('')

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
    UploadNotification(e)
  }


  const UploadNotification = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('text', notificationMessage)
    formData.append('subject', notificationSubject)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/school-notification/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('notification created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setNotificationMessage('')
        setNotificationSubject('')



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
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Upload Notiffications</p>
              </div>

              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="phoneNumber" className="form-label">Subject<span className="text-danger">*</span></label>
                      <input className={`site-input ${errors.billName ? 'error-input' : ''}`} {...register('subject', { required: true })} value={notificationSubject} onChange={(e) => setNotificationSubject(e.target.value)} />
                      {errors.subject && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="" className='form-label'>Message<span className="text-danger">*</span></label>
                      <textarea rows={6} className={`site-input ${errors.message ? 'error-input' : ''}`} {...register('message', { required: true })} value={notificationMessage} onChange={(e) => setNotificationMessage(e.target.value)} placeholder='...' />
                      {errors.message && <p className="error-text">This field is required</p>}
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

export default UploadSchoolNotificationPage