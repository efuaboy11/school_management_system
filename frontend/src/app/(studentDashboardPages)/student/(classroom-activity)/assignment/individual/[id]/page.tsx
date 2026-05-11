"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import AllDataContext from '@/context/AllData';



const IndivivdualAssignment = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const {
    authTokens,

    formatDate,
    formatName,
    formateDateTime,
    handleDownload,

  } = useContext(AuthContext)!;

  const {
    TeacherFunction,
    StudentClassFunction,
    SubjectFunction
  } = useContext(AllDataContext)!;


  const [Loading, setLoading] = useState(true)
  const [details, setDetails] = useState<any>(null)










  const IndividualDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/assignment/${id}/`, {
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

        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }





  useEffect(() => {
    TeacherFunction()
    StudentClassFunction()
    SubjectFunction()
    IndividualDetailsFunction()
  }, [])





  return (
    <div>
      <div>




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

                          {details.assignment_file ? (
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

                          {details.assignment_photo ? (
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
                          <div className="border-bottom1">
                            <div className="d-flex p-3">
                              <p>Assignment Details</p>
                            </div>

                          </div>

                          <div className='light-text p-3'>
                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Teachers Name</p>
                              <p>{formatName(details.teacher_name.first_name)} {formatName(details.teacher_name.last_name)}</p>
                            </div>


                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Class</p>
                              <p>{formatName(details.student_class_name.name)}</p>
                            </div>


                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Subject</p>
                              <p>{formatName(details.subject_name.name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Assignment Name</p>
                              <p>{formatName(details.assignment_name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Assignment Code</p>
                              <p>{details.assignment_code}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Due Date</p>
                              <p>{formatDate(details.due_date)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Date given</p>
                              <p>{(formateDateTime(details.date))}</p>
                            </div>


                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1">
                            <div className="p-3">
                              <p>instructions</p>
                            </div>

                          </div>
                          <div className='p-3'>
                            {details.instructions ? (
                              <p className='light-text'>{details.instructions}</p>
                            ) : (
                              <p className="light-text">No instructions Placed</p>
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