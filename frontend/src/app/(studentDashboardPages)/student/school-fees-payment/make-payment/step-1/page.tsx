"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


const VerifyDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [feeType, setFeeType] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [session, setSession] = useState('')
  const [term, setTerm] = useState('')

  const router = useRouter();


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
    StudentClassFunction,
    studentClassData,

    termData,
    TermFunction,

    sessionData,
    SessionFunction,


    paymentMethodData,
    PaymentMethodFunction,
  } = useContext(AllDataContext)!;




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();





  const onSubmit = (data: FormData, e: any) => {
    VerifyFeeDetails(e)
  }



  const VerifyFeeDetails = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('student_class', studentClass)
    formData.append('term', term)
    formData.append('session', session)
    formData.append('fee_type', feeType)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/get-school-fees-amount/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        const data = await response.json();
        showAlert()
        setMessage('Details verified')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setFeeType('')
        setTerm('')
        setSession('')
        setPaymentMethod('')
        setStudentClass('')
        localStorage.setItem('schoolFeesDetails', JSON.stringify(data))
        router.push(`/student/school-fees-payment/make-payment/step-2/${paymentMethod}`)


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




  useEffect(() => {
    StudentClassFunction()
    TermFunction()
    SessionFunction()
    PaymentMethodFunction()
  }, [])




  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-11">
            <div className="text-center pb-4">
              <p className="md-text">School Fees Payment</p>
              <p className="light-text">This step is to verify the fee details and ensure they are authentic.</p>
              <p className="sm-text light-text italic-text">Note: Please enter the verified details for the specific fee you intend to pay.</p>

            </div>
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>step 1</p>
              </div>

              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">

                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">Payment Method <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.paymentMethod ? 'error-input' : ''}`} {...register('paymentMethod', { required: true })} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="">Select</option>
                        {paymentMethodData?.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      <p className="light-text sm-text italic-text pt-2">Select the payment method you would like to use </p>
                      {errors.paymentMethod && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="phoneNumber" className="form-label">Fee Type <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.feeType ? 'error-input' : ''}`} {...register('feeType', { required: true })} value={feeType} onChange={(e) => setFeeType(e.target.value)}>
                        <option value="">Select</option>
                        <option value="school fees">School fees</option>
                        <option value="P.T.A">P.T.A</option>
                      </select>
                      <p className="light-text sm-text italic-text pt-2">Select the fee you wan to pay for </p>
                      {errors.feeType && <p className="error-text">This field is required</p>}
                    </div>





                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">Student Class <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.studentClass ? 'error-input' : ''}`} {...register('studentClass', { required: true })} value={studentClass} onChange={(e) => setStudentClass(e.target.value)}>
                        <option value="">Select</option>
                        {studentClassData.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      <p className="light-text sm-text italic-text pt-2">Select the class off which you want to pay for </p>
                      {errors.studentClass && <p className="error-text">This field is required</p>}
                    </div>



                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">Session <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.session ? 'error-input' : ''}`} {...register('session', { required: true })} value={session} onChange={(e) => setSession(e.target.value)}>
                        <option value="">Select</option>
                        {sessionData?.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      <p className="light-text sm-text italic-text pt-2">Select the session wich you want to pay for </p>
                      {errors.session && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">Term <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.term ? 'error-input' : ''}`} {...register('term', { required: true })} value={term} onChange={(e) => setTerm(e.target.value)}>
                        <option value="">Select</option>
                        {termData.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      <p className="light-text sm-text italic-text pt-2">Select Term which you want to pay for </p>
                      {errors.term && <p className="error-text">This field is required</p>}
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

export default VerifyDetails