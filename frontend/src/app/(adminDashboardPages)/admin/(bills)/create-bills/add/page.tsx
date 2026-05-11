"use client"

import AuthContext from '@/context/AuthContext'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateBills = () => {
  const [billName, setBillName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

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
    CreatBill(e)
  }


  const CreatBill = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('bill_name', billName)
    formData.append('amount', amount)
    formData.append('description', description)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/bills/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('bill created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setBillName('')
        setAmount('')
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
                <p>Create  bill</p>
              </div>

              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label htmlFor="phoneNumber" className="form-label">Bill Name <span className="text-danger">*</span></label>
                      <input className={`site-input ${errors.billName ? 'error-input' : ''}`} {...register('billName', { required: true })} value={billName} onChange={(e) => setBillName(e.target.value)} />
                      {errors.billName && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-md-6">
                      <label htmlFor="amount" className="form-label">Amount <span className="text-danger">*</span></label>
                      <input type="text" className={`site-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', { required: true })} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='amount' />
                      {errors.amount && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-12">
                      <label htmlFor="" className='form-label'>Description</label>
                      <textarea rows={6} className={`site-input ${errors.description ? 'error-input' : ''}`} {...register('description')} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
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

export default CreateBills