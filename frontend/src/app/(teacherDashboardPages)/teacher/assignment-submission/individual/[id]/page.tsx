"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import Image from 'next/image'


const IndivivdualAssignment = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const {
    authTokens,

    formatDate,
    formatName,
    formateDateTime,


    loader,
    setLoader,
    disableButton,
    setDisableButton,
    handleDownload,

    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;





  const [Loading, setLoading] = useState(true)
  const [details, setDetails] = useState<any>(null)

  const [grade, setGrade] = useState('')
  const [feedback, setFeedback] = useState('')


  const [deleteModal, setDeleteModal] = useState(false)

  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const router = useRouter();



  const handleClosenModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
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
    if (grade && feedback) {
      GradeAssignment(e)
    } else {
      showAlert()
      setIsSuccess(false)
      setMessage('A feild is empty')
    }


  }

  const IndividualDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/assignment-submission/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setDetails(data)
        console.log('data', data)

        setGrade(data?.grade || '')
        setFeedback(data?.feedback || '')
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }

  const deleteUserFunction = async () => {

    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/assignment-submission/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        router.push('/teacher/assignment-submission')
        setDeleteModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Assignment  deleted')
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

  const GradeAssignment = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()
    formData.append('grade', grade)
    formData.append('feedback', feedback)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/assignment-submission/${id}/update/`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Grade updated successfully')
        setIsSuccess(true)
        setShowModal(false)
        IndividualDetailsFunction()
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
    if (showModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showModal]);

  useEffect(() => {
    IndividualDetailsFunction()
  }, [])

  useEffect(() => {
    if (deleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [deleteModal]);



  return (
    <div>
      <div>
        {showModal && (
          <section className={` ${showModal ? 'overlay-background' : ''}`}>
            <div className='container-lg'>

              <div className=" row justify-content-center align-center2 height-90vh">

                <div className="col-md-8 col-sm-10 col-12">
                  <div className="site-modal-conatiner">
                    <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                      <div>
                        <div className="d-flex justify-content-between pb-2">
                          <p className='font-size-20px '>Grade Assignment</p>
                          <div onClick={handleClosenModal} className='cursor-pointer'>
                            <i className="ri-close-line md-text"></i>
                          </div>
                        </div>


                        <div className='pt-4'>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row g-3">


                              <div className="col-md-6">
                                <label htmlFor="grade" className="form-label">Grade <span className="text-danger">*</span></label>
                                <input type="text" className={`site-input ${errors.grade ? 'error-input' : ''}`} {...register('grade', { required: true })} placeholder='grade' value={grade} onChange={(e) => setGrade(e.target.value)} />
                                {errors.grade && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="col-md-12">
                                <label htmlFor="feedback" className="form-label">Feedback</label>
                                <textarea rows={6} className={`site-input ${errors.feedback ? 'error-input' : ''}`} {...register('feedback', { required: true })} value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder='Instuctions'></textarea>
                                {errors.feedback && <p className="error-text">This field is required</p>}
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

        {deleteModal && (
          <section className={` ${deleteModal ? 'overlay-background' : ''}`}>
            <div className='container-lg'>

              <div className=" row justify-content-center align-center2 height-90vh">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                  <div className="site-modal-conatiner">
                    <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                      <div className="d-flex justify-content-center text-center">
                        <div>
                          <Image src="/img/icon/warning.png" alt="empty" width={100} height={100} />
                          <p className='md-text mt-3'>Are you sure?</p>
                          <p className="light-text">This action cannot be undone. This user  will be deleted from the database.</p>
                          <div className='pt-4'>
                            <button className="site-delete-btn px-3 me-2 width-100 mb-4" onClick={deleteUserFunction} disabled={disableButton}>
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

            <div className="container-lg mb-5">
              {details ? (
                <div className="row justify-content-center pt-5">
                  <div className="col-lg-9">
                    <div className="row g-3 justify-content-center">

                      <div className="col-sm-5">
                        <div className="site-boxes border-radius-10px py-3">
                          <div className="border-bottom1 p-3">
                            <p>Assignment File</p>
                          </div>

                          {details.submission_file ? (
                            <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer" onClick={() => handleDownload(details.assignment_file, `Assignment_${details.assignment_code}.pdf`)}>
                              <p className='light-text text-center'>Click here to download </p>
                            </div>
                          ) : (
                            <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer">
                              <p className='light-text text-center'>No file attached </p>
                            </div>
                          )}



                        </div>
                      </div>

                      <div className="col-sm-5">
                        <div className="site-boxes border-radius-10px py-3">
                          <div className="border-bottom1 p-3">
                            <p>Assignment Photo</p>
                          </div>

                          {details.submission_photo ? (
                            <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer" onClick={() => handleDownload(details.assignment_photo, `Assignment_${details.assignment_code}.jpg`)}>
                              <p className='light-text text-center'>Click here to download </p>
                            </div>
                          ) : (
                            <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer">
                              <p className='light-text text-center'>No image attached </p>
                            </div>
                          )}



                        </div>
                      </div>

                      <div className="col-md-11">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1  d-flex justify-content-end">
                            <div className="d-flex p-3">
                              <div className="me-3">
                                <button onClick={handleShowModal} className='site-inverse-btn px-3'><i className="ri-edit-line"></i><span className="ms-2 d-none d-md-inline">Grade</span></button>
                              </div>

                              <div>
                                <button onClick={handleShowDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line "></i><span className="ms-2 d-none d-md-inline">Delete</span></button>
                              </div>
                            </div>

                          </div>

                          <div className='light-text p-3'>
                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Student Name</p>
                              <p>{formatName(details.student_name.first_name)} {formatName(details.student_name.last_name)}</p>
                            </div>



                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Subject</p>
                              <p>{formatName(details.subject_name.name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Assignment Code</p>
                              <p>{details.assignment_code}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Grade</p>
                              <p>{details.grade ? details.grade : 'Not graded yet'}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Submission Date</p>
                              <p>{formatDate(formateDateTime(details.date_submitted))}</p>
                            </div>


                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1">
                            <div className="p-3">
                              <p>Assignment Submission feedback</p>
                            </div>

                          </div>
                          <div className='p-3'>
                            {details.assignment_feedback ? (
                              <p className='light-text'>{details.assignment_feedback}</p>
                            ) : (
                              <p className="light-text">No feedback Placed</p>
                            )}

                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1">
                            <div className="p-3">
                              <p>Assignment Submission Feedback</p>
                            </div>

                          </div>
                          <div className='p-3'>
                            {details.feedback ? (
                              <p className='light-text'>{details.feedback}</p>
                            ) : (
                              <p className="light-text">No  Feed back yet</p>
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
                    <p className="light-text">Details not avalaible. Check again later</p>
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

export default IndivivdualAssignment