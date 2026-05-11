"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'

import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const PayBills = () => {
  const [term, setTerm] = useState('')
  const [classID, setClassID] = useState('')

  const router = useRouter();





  const {
    authTokens,

    loader,
    setLoader,
    disableButton,

  } = useContext(AuthContext)!


  const {
    TermFunction,
    termData,




  } = useContext(AllDataContext)!;

  const UserDetails = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/students/${authTokens?.user_id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setClassID(data.student_class)
      }
    } catch {
      console.log('error')
    }

  }




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();










  const onSubmit = () => {
    setLoader(true)
    router.push(`/student/scheme-of-work/step-1/${term}/${classID}`)
  }



  useEffect(() => {
    TermFunction()
    UserDetails()
    setLoader(false)
  }, [])





  return (
    <div>

      <div className="container-lg  pt-5 mb-5 pb-4">
        <div className='row justify-content-center'>
          <div className="col-sm-6">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 p-3">
                <p className='text-center'>Step 1</p>
              </div>

              <div className='mt- p-3'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-4">
                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">Term <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.term ? 'error-input' : ''}`} {...register('term', { required: true })} value={term} onChange={(e) => setTerm(e.target.value)}>
                        <option value="">Select</option>
                        {termData?.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      <p className="pt-2 italic-text light-text sm-text">Select term you would like to see the scheme of work</p>
                      {errors.term && <p className="error-text">This field is required</p>}
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