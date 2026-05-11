"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import AllDataContext from '@/context/AllData';


const IndivivdualFees = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const {
    authTokens,
    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,
    formatCurrency,

    formatName,


  } = useContext(AuthContext)!;

  const {
    StudentClassFunction,
    studentClassData,

    termData,
    TermFunction,

    sessionData,
    SessionFunction
  } = useContext(AllDataContext)!;

  const [Loading, setLoading] = useState(true)
  const [datas, setDatas] = useState<any>(null)

  const [feeType, setFeeType] = useState('')
  const [amount, setAmount] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [session, setSession] = useState('')
  const [term, setTerm] = useState('')
  const [description, setDescription] = useState('')
  const [DeleteModal, setDeleteModal] = useState(false)

  const [showEditModal, setShowEditModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const router = useRouter();

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleShowDeleteModal = () => {
    setDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false)
  }





  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: any, e: any) => {
    EditDetails(e)

  }

  const IndividualDataFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/school-fees/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setDatas(data)
        console.log('data', data)

        setFeeType(data?.fee_choice || '')
        setDescription(data?.description || '')
        setStudentClass(data?.student_class || '')
        setAmount(data?.amount || '')
        setSession(data?.session || '')
        setTerm(data?.term || '')
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }

  const deleteFunction = async () => {

    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/school-fees/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        router.push('/admin/school-fees-bill/school-fees')
        setDeleteModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Parent  deleted')
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setLoader(false)
        setDisableButton(false)
        showAlert()
        setIsSuccess(false)
        setIsSuccess(true)
        setDisableButton(false)
      }

    } catch {
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)
      setLoader(false)

    }
  }

  const EditDetails = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('fee_choice', feeType)
    if (description) {
      formData.append('description', description)
    }
    formData.append('student_class', studentClass)
    formData.append('amount', amount)
    formData.append('session', session)
    formData.append('term', term)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/school-fees/${id}/`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Details updated successfully')
        setIsSuccess(true)
        setShowEditModal(false)
        IndividualDataFunction()
        setLoader(false)
        setDisableButton(false)

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
    if (showEditModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showEditModal]);

  useEffect(() => {
    IndividualDataFunction()
  }, [])

  useEffect(() => {
    if (DeleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [DeleteModal]);

  useEffect(() => {
    StudentClassFunction()
    TermFunction()
    SessionFunction()
  }, [])



  return (
    <div>
      <div>
        {showEditModal && (
          <section className={` ${showEditModal ? 'overlay-background' : ''}`}>
            <div className='container-lg'>

              <div className=" row justify-content-center align-center2 height-90vh">

                <div className="col-md-8 col-sm-10 col-12">
                  <div className="site-modal-conatiner">
                    <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                      <div>
                        <div className="d-flex justify-content-between pb-2">
                          <p className='font-size-20px '>Edit Details</p>
                          <div onClick={handleCloseEditModal} className='cursor-pointer'>
                            <i className="ri-close-line md-text"></i>
                          </div>
                        </div>


                        <div className='pt-4'>
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

            </div>
          </section>
        )}

        {DeleteModal && (
          <section className={` ${DeleteModal ? 'overlay-background' : ''}`}>
            <div className='container-lg'>

              <div className=" row justify-content-center align-center2 height-90vh">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                  <div className="site-modal-conatiner">
                    <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                      <div className="d-flex justify-content-center text-center">
                        <div>
                          <Image src="/img/icon/warning.png" alt="empty" width={100} height={100} />
                          <p className='md-text mt-3'>Are you sure?</p>
                          <p className="light-text">This action cannot be undone. This details  will be deleted from the database.</p>
                          <div className='pt-4'>
                            <button className="site-delete-btn px-3 me-2 width-100 mb-4" onClick={deleteFunction} disabled={disableButton}>
                              <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                              <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-delete-bin-line pe-2"></i> Delete</span>
                            </button>
                            <button onClick={handleCloseDeleteModal} className="site-btn site-cancel-btn px-3 width-100"><i className="ri-close-circle-line pe-2"></i>Cancel</button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        <div>

          {Loading ? (
            <div>
              <div className="mt-5 pt-5">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="book-loader">
                    <div className="book red"></div>
                    <div className="book blue"></div>
                    <div className="book green"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (

            <div className="container-lg">
              {datas ? (
                <div className="row justify-content-center pt-5">
                  <div className="col-sm-8">
                    <div className="row g-3">

                      <div className="col-12">
                        <div className="site-boxes border-radius-10px">
                          <div className="ps-3 border-bottom1 align-center  d-flex justify-content-between">
                            <div>
                              <p>Fee details</p>
                            </div>
                            <div className="d-flex p-3">
                              <div className="me-3">
                                <button onClick={handleShowEditModal} className='site-inverse-btn px-3'><i className="ri-edit-line"></i><span className="ms-2 d-none d-md-inline">Edit</span></button>
                              </div>

                              <div>
                                <button onClick={handleShowDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line "></i><span className="ms-2 d-none d-md-inline">Delete</span></button>
                              </div>
                            </div>

                          </div>

                          <div className='light-text p-3'>
                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Fee Type</p>
                              <p>{formatName(datas.fee_choice)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Amount</p>
                              <p>{formatCurrency(datas.amount)}NGN</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Class</p>
                              <p>{formatName(datas.student_class_name.name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Session</p>
                              <p>{formatName(datas.session_name.name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Term</p>
                              <p>{formatName(datas.term_name.name)}</p>
                            </div>

                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1">
                            <div className="p-3">
                              <p>Description</p>
                            </div>

                          </div>
                          <div className='p-3'>
                            {description ? (
                              <p className='light-text'>{datas.description}</p>
                            ) : (
                              <p className='light-text'>No specified description</p>
                            )}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='mt-5 site-boxes border-radius-10px text-center pb-3 d-flex justify-content-center align-items-center  mt-4 pt-3'>
                  <div>
                    <Image src="/img/icon/thinking.png" alt="empty" width={70} height={70} />
                    <p className='light-text md-text'>No details available</p>
                    <p className="light-text">Details not avalaible at this time. Check again later</p>
                  </div>

                </div>
              )}


            </div>
          )}


        </div>
      </div>
    </div>

  )
}

export default IndivivdualFees