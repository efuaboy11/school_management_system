"use client"
import AuthContext from '@/context/AuthContext'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateSchoolEventPage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const {

    authTokens,

    loader,
    setLoader,
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
    CreatBill(e)
  }


  const CreatBill = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('start_date', startDate)
    formData.append('end_date', endDate)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/school-event/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Event created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setTitle('')
        setStartDate('')
        setEndDate('')
        setDescription('')



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
                <p>Create  school event</p>
              </div>

              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="title" className="form-label">Title<span className="text-danger">*</span></label>
                      <input type="text" className={`site-input ${errors.title ? 'error-input' : ''}`} {...register('title', { required: true })} placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                      {errors.title && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Start Date<span className="text-danger">*</span></label>
                      <input type="datetime-local" className={`site-input ${errors.startDate ? 'error-input' : ''}`} {...register('startDate', { required: true })} value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder='Start Date' />
                      {errors.startDate && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">End Date<span className="text-danger">*</span></label>
                      <input type="datetime-local" className={`site-input ${errors.endDate ? 'error-input' : ''}`} {...register('endDate', { required: true })} value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder='Start Date' />
                      {errors.endDate && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-md-12">
                      <label htmlFor="description" className="form-label">Description<span className="text-danger">*</span></label>
                      <textarea rows={6} className={`site-input ${errors.description ? 'error-input' : ''}`} {...register('description', { required: true })} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='....'></textarea>
                      {errors.description && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-12 mt-4">
                      <button type='submit' className='site-btn px-4'>
                        <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                        <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill pe-2"></i> Sumbit</span>
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
  )
}

export default CreateSchoolEventPage