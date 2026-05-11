"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateSchoolFees = () => {
  const [feeType, setFeeType] = useState('')
  const [amount, setAmount] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [session, setSession] = useState('')
  const [term, setTerm] = useState('')
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
    StudentClassFunction,
    studentClassData,

    termData,
    TermFunction,

    sessionData,
    SessionFunction
  } = useContext(AllDataContext)!;


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
    formData.append('fee_choice', feeType)
    formData.append('amount', amount)
    formData.append('student_class', studentClass)
    formData.append('session', session)
    formData.append('term', term)
    formData.append('description', description)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/school-fees/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('School fees bill created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setFeeType('')
        setAmount('')
        setTerm('')
        setStudentClass('')
        setSession('')
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



  useEffect(() => {
    StudentClassFunction()
    TermFunction()
    SessionFunction()
  }, [])




  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Create school fees bill</p>
              </div>

              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label htmlFor="phoneNumber" className="form-label">Fee Type <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.feeType ? 'error-input' : ''}`} {...register('feeType', { required: true })} value={feeType} onChange={(e) => setFeeType(e.target.value)}>
                        <option value="">Select</option>
                        <option value="school fees">School fees</option>
                        <option value="P.T.A">P.T.A</option>
                      </select>
                      {errors.feeType && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-md-6">
                      <label htmlFor="amount" className="form-label">Amount <span className="text-danger">*</span></label>
                      <input type="text" className={`site-input ${errors.amount ? 'error-input' : ''}`} {...register('amount', { required: true })} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='amount' />
                      {errors.amount && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">Student Class <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.studentClass ? 'error-input' : ''}`} {...register('studentClass', { required: true })} value={studentClass} onChange={(e) => setStudentClass(e.target.value)}>
                        <option value="">Select</option>
                        {studentClassData.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      {errors.studentClass && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">Session <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.session ? 'error-input' : ''}`} {...register('session', { required: true })} value={session} onChange={(e) => setSession(e.target.value)}>
                        <option value="">Select</option>
                        {sessionData?.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      {errors.session && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">Term <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.term ? 'error-input' : ''}`} {...register('term', { required: true })} value={term} onChange={(e) => setTerm(e.target.value)}>
                        <option value="">Select</option>
                        {termData.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      {errors.term && <p className="error-text">This field is required</p>}
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

export default CreateSchoolFees