"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const PayBills = () => {
  const [bills, setBills] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const router = useRouter();




  const {


    loader,
    setLoader,
    disableButton,
    setDisableButton,

  } = useContext(AuthContext)!


  const {
    PaymentMethodFunction,
    paymentMethodData,

    billsData,
    BillsFunction,



  } = useContext(AllDataContext)!;




  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<any>();


  const onSubmit = () => {
    setLoader(true)
    setDisableButton(true)
    router.push(`/student/bills-payment/make-payment/step-2/${bills}/${paymentMethod}`)
  }



  useEffect(() => {
    PaymentMethodFunction()
    BillsFunction()
    setLoader(false)
  }, [])





  return (
    <div>

      <div className="container-lg  pt-5 mb-5 pb-4">
        <div className='row justify-content-center'>
          <div className="col-sm-6">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 p-3">
                <p className='text-center'>Bills Payment</p>
              </div>

              <div className='mt- p-3'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-4">


                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">Bill Type <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.bills ? 'error-input' : ''}`} {...register('bills', { required: true })} value={bills} onChange={(e) => setBills(e.target.value)}>
                        <option value="">Select</option>
                        {billsData?.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.bill_name}</option>
                        ))}
                      </select>
                      <p className="pt-2 italic-text light-text sm-text">Select the bill you want to pay for</p>
                      {errors.bills && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">Payment Method <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.paymentMethod ? 'error-input' : ''}`} {...register('paymentMethod', { required: true })} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="">Select</option>
                        {paymentMethodData?.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      <p className="pt-2 italic-text light-text sm-text">Select payment method you would like to use</p>
                      {errors.paymentMethod && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-12">
                      <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                        <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                        <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill me-2"></i> Submit</span>
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

export default PayBills