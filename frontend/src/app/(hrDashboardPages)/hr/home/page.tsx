"use client"
import AllDataContext from '@/context/AllData'
import Link from 'next/link'
import '../../../../css/adminCss/adminHome.css'
import Image from 'next/image'

import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'

const HrHome = () => {

  // const [timeofDay, setTimeOfDay] = useState('')
  const [userDetails, setUserDetails] = useState<any>(null)
  const {
    recentAdminHrNotification,
    adminHrNotificationLoader,

    recentStudent,
    studentLoader,

    recentParent,
    parentLoader,

    recentStaff,
    staffLoader,


    AdminHrNotificationFunction,
    StudentFunction,
    ParentFunction,
    StaffFunction

  } = useContext(AllDataContext)!;

  const {
    truncateText,
    authTokens,
    formatName,


  } = useContext(AuthContext)!;

  const UserDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/hr/${authTokens?.user_id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setUserDetails(data)
      }
    } catch {
      console.log('error')
    }

  }

  useEffect(() => {

    StudentFunction()
    AdminHrNotificationFunction()
    UserDetailsFunction()
    ParentFunction()
    StaffFunction()


  }, [])



  // useEffect(() => {
  //   const updateGreeting = () => {
  //     const currentHour = new Date().getHours()
  //     console.log(currentHour)

  //     if (currentHour >= 0 && currentHour < 12) {
  //       setTimeOfDay('Bonjour')
  //     } else if (currentHour >= 12 && currentHour < 16) {
  //       setTimeOfDay('Bonjour')
  //     } else if (currentHour >= 16 && currentHour < 24) {
  //       setTimeOfDay('Bonsoir')
  //     }
  //   }

  //   updateGreeting()

  //   const interval = setInterval(updateGreeting, 60 * 60 * 1000)

  //   return () => clearInterval(interval)
  // }, [])


  return (
    <div className={`container-xl mb-5 pb-4`}>
      {userDetails ? (
        <div>
          <div className="d-flex justify-content-between align-center pb-4 pt-3">
            <div>
              <p className='stylish-text md-text  mt-5'>Hi {formatName(userDetails.first_name)}</p>
              <p className="light-text italic-text">Education is the most powerful weapon which you can use to change the world.</p>
              <p className="italic-text light-text pb-4">— Nelson Mandela</p>
            </div>

            <div className='d-none d-md-block'>
              <Image className='logo' src="/img/icon/hr.png" alt="Logo" width={190} height={190} />
            </div>
          </div>
          <section>
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="row g-4">
                  <div className="col-sm-4">
                    <div className="site-boxes border-radius-10px p-3">
                      <div className=''>
                        <div className="d-flex align-center mb-3">
                          <div className='primary-bg site-small-icon border-radius-5px me-2'>
                            <i className="ri-book-line  white-text"></i>
                          </div>
                          <p className='light-text'>Office locatiob</p>
                        </div>

                        <h4 className="pb-2">{userDetails.office_location ? formatName(userDetails.office_location) : 'Not given'} </h4>
                        <p className="light-text xsm-text">Hr office location</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="site-boxes border-radius-10px p-3">
                      <div className=''>
                        <div className="d-flex align-center mb-3">
                          <div className='secondary-bg site-small-icon border-radius-5px me-2'>
                            <i className="ri-book-open-line  white-text"></i>
                          </div>
                          <p className='light-text'>Department</p>
                        </div>

                        <h4 className="md-text pb-2">HR</h4>
                        <p className="light-text xsm-text">The group Department you belomg to</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="site-boxes border-radius-10px p-3">
                      <div className=''>
                        <div className="d-flex align-center mb-3">
                          <div className='support-bg site-small-icon border-radius-5px me-2'>
                            <i className="ri-school-line  white-text"></i>
                          </div>
                          <p className='light-text'>Employment Type</p>
                        </div>

                        <h4 className="pb-3">Full_time</h4>
                        <p className="light-text xsm-text">Your Employment Status</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden">
                  <div className="site-boxes position-relative border-radius-10px recent-assignment-submission-box p-4">
                    <div>
                      <div className="d-flex justify-content-between pb-4">
                        <p>Recent Student</p>
                        <Link href='/hr/all-student' className='light-link'>View all</Link>
                      </div>

                      {studentLoader ? (
                        <div className="recent-assignment-submission-spinner">
                          <div className="site-content-loader"></div>
                        </div>
                      ) : (
                        <div>

                          {recentStudent.length > 0 ? (
                            <div className='light-text dahboard-table non-wrap-text scroll-bar'>
                              <table className='overflow-auto'>
                                <thead>
                                  <tr className='sm-text'>
                                    <th className="py-2">Student name</th>
                                    <th className="">Class</th>
                                    <th className="">Phone Number</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {recentStudent.map((data) => (
                                    <tr key={data.id}>
                                      <td className='py-2'>
                                        <div className="d-flex align-center">
                                          <Image className='border-radius-50' src={data.passport} alt="staff image" width={40} height={40} />
                                          <p className="ps-3">{formatName(data.first_name)}</p>
                                        </div>
                                      </td>
                                      <td>{formatName(data.student_class_name.name)}</td>
                                      <td>{data.phone_number}</td>
                                    </tr>
                                  ))}


                                </tbody>

                              </table>
                            </div>

                          ) : (
                            <div className='light-text recent-assignment-submission-spinner text-center'>
                              <i className="ri-error-warning-line"></i>
                              <p>No Student Yet.</p>
                            </div>
                          )}




                        </div>
                      )}




                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="site-boxes position-relative1 recent-notification-box border-radius-10px p-4">
                  <div className='pb-4'>
                    <h6>Recent Hr Notifications</h6>
                  </div>
                  {adminHrNotificationLoader ? (
                    <div className="recent-notification-spinner">
                      <div className="site-content-loader"></div>
                    </div>
                  ) : (
                    <div>

                      {recentAdminHrNotification.length > 0 ? (
                        <div>
                          {recentAdminHrNotification.map((data) => (
                            <div key={data.id}>
                              <div>
                                <p className="pb-3 sm-text d-flex justify-content-end support-text">{(data.date)}</p>
                                <p className='light-text sm-text'>{truncateText(data.text, 15)}</p>
                              </div>
                              <hr />
                            </div>
                          ))}

                          <div>
                            <Link href='/hr/admin-hr-notification' className='site-btn width-100 Link'>View All</Link>
                          </div>
                        </div>

                      ) : (
                        <div className='light-text recent-notification-spinner text-center'>
                          <i className="ri-error-warning-line"></i>
                          <p>No recent notificaton.</p>
                        </div>
                      )}




                    </div>
                  )}


                </div>
              </div>

              <div className="col-md-6">
                <div className="site-boxes position-relative p-3 border-radius-10px recent-staff-parent-box">
                  <div>
                    <div className="d-flex justify-content-between pb-4">
                      <p>Recent Staff</p>
                      <Link href='/hr/staffs' className='light-link'>View all</Link>
                    </div>

                    {staffLoader ? (
                      <div className="recent-notification-spinner">
                        <div className="site-content-loader"></div>
                      </div>
                    ) : (
                      <div>

                        {recentStaff.length > 0 ? (
                          <div className='light-text dahboard-table non-wrap-text scroll-bar'>
                            <table className='overflow-auto'>
                              <thead>
                                <tr className='sm-text'>
                                  <th></th>
                                  <th className="">User ID</th>
                                  <th className="">Name</th>
                                  <th className="">Phone Number</th>
                                </tr>
                              </thead>

                              <tbody>
                                {recentStaff.map((data) => (
                                  <tr key={data.id}>
                                    <td className='py-3'> <Image className='border-radius-50' src={data.passport} alt="staff image" width={40} height={40} /></td>
                                    <td>{data.userID}</td>
                                    <td>{data.first_name}</td>
                                    <td>{data.phone_number}</td>
                                  </tr>
                                ))}


                              </tbody>

                            </table>
                          </div>

                        ) : (
                          <div className='light-text recent-notification-spinner text-center'>
                            <i className="ri-error-warning-line"></i>
                            <p>No recent staff.</p>
                          </div>
                        )}




                      </div>
                    )}




                  </div>
                </div>
              </div>


              <div className="col-md-6">
                <div className="site-boxes position-relative p-3 border-radius-10px recent-staff-parent-box">
                  <div>
                    <div className="d-flex justify-content-between pb-4">
                      <p>Recent Parent</p>
                      <Link href='/hr/all-parents' className='light-link'>View all</Link>
                    </div>

                    {parentLoader ? (
                      <div className="recent-notification-spinner">
                        <div className="site-content-loader"></div>
                      </div>
                    ) : (
                      <div>

                        {recentParent.length > 0 ? (
                          <div className='light-text dahboard-table non-wrap-text scroll-bar'>
                            <table className='overflow-auto'>
                              <thead>
                                <tr className='sm-text'>
                                  <th></th>
                                  <th className="">Name</th>
                                  <th>Email</th>
                                  <th className="">Phone Number</th>
                                </tr>
                              </thead>

                              <tbody>
                                {recentParent.map((data) => (
                                  <tr key={data.id}>
                                    <td className='py-3'> <Image className='border-radius-50' src={data.image} alt="staff image" width={40} height={40} /></td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone_number}</td>
                                  </tr>
                                ))}


                              </tbody>

                            </table>
                          </div>

                        ) : (
                          <div className='light-text recent-notification-spinner text-center'>
                            <i className="ri-error-warning-line"></i>
                            <p>No recent parent.</p>
                          </div>
                        )}




                      </div>
                    )}




                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="site-boxes border-radius-10px p-3">
                  <div className="row g-3">
                    <div className="col-md-2">
                      <Image className='logo' src="/img/icon/support.png" alt="Logo" width={170} height={170} />
                    </div>
                    <div className='col-md-7'>
                      <div className="d-flex align-items-center height-100">
                        <div>
                          <h4>We’re here to help you!</h4>
                          <p className='light-text pt-3'>Ask a question or file a support ticket, manage request, report an issues. Our team support team will get back to you by email.</p>
                        </div>
                      </div>
                    </div>

                    <div className='col-md-3'>
                      <div className="d-flex align-items-center height-100">
                        <Link href='/hr/contact-us' className="site-inverse-btn px-4 py-2 Link">Get Support Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>








            </div>
          </section>
        </div>
      ) : (
        <div className="mt-5 pt-5">
          <div className="d-flex justify-content-center align-items-center">
            <div className="book-loader">
              <div className="book red"></div>
              <div className="book blue"></div>
              <div className="book green"></div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default HrHome