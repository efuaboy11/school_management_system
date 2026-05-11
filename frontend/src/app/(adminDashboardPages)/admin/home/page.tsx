"use client"
import { BillsChart, SchoolFeesChart, UsersChart } from '@/components/chatFrames'
import AllDataContext from '@/context/AllData'
import Link from 'next/link'
import '../../../../css/adminCss/adminHome.css'
import Image from 'next/image'

import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'

const AdminHome = () => {

  const [timeofDay, setTimeOfDay] = useState('')

  const [showSchoolFees, setShowSchoolFees] = useState(true)
  const [showPendingSchoolFees, setShowPendingSchoolFees] = useState(false)
  const [showDeclinedSchoolFees, setShowDeclinedSchoolFees] = useState(false)
  const [showSuccessfulSchoolFees, setShowSuccessfulSchoolFees] = useState(false)


  const [showBills, setShowBills] = useState(true)
  const [showPendingBills, setShowPendingBills] = useState(false)
  const [showDeclinedBills, setShowDeclinedBills] = useState(false)
  const [showSuccessfulBills, setShowSuccessfulBills] = useState(false)



  const toggleShowSchoolFees = () => {
    if (!showSchoolFees) {
      setShowSchoolFees(!showSchoolFees)
    }
    setShowPendingSchoolFees(false)
    setShowDeclinedSchoolFees(false)
    setShowSuccessfulSchoolFees(false)


  }

  const toggleShowPendingSchoolFees = () => {
    if (!showPendingSchoolFees) {
      setShowPendingSchoolFees(!showPendingSchoolFees)
    }
    setShowSchoolFees(false)
    setShowDeclinedSchoolFees(false)
    setShowSuccessfulSchoolFees(false)


  }

  const toggleShowDeclinedSchoolFees = () => {
    if (!showDeclinedSchoolFees) {
      setShowDeclinedSchoolFees(!showDeclinedSchoolFees)
    }
    setShowSchoolFees(false)
    setShowPendingSchoolFees(false)
    setShowSuccessfulSchoolFees(false)


  }

  const toggleShowSuccessfulSchoolFees = () => {
    if (!showSuccessfulSchoolFees) {
      setShowSuccessfulSchoolFees(!showSuccessfulSchoolFees)
    }
    setShowSchoolFees(false)
    setShowPendingSchoolFees(false)
    setShowDeclinedSchoolFees(false)


  }




  const toggleShowBills = () => {
    if (!showBills) {
      setShowBills(!showBills)
    }
    setShowPendingBills(false)
    setShowDeclinedBills(false)
    setShowSuccessfulBills(false)


  }

  const toggleShowPendingBills = () => {
    if (!showPendingBills) {
      setShowPendingBills(!showPendingBills)
    }
    setShowBills(false)
    setShowDeclinedBills(false)
    setShowSuccessfulBills(false)


  }

  const toggleShowDeclinedBills = () => {
    if (!showDeclinedBills) {
      setShowDeclinedBills(!showDeclinedBills)
    }
    setShowBills(false)
    setShowPendingBills(false)
    setShowSuccessfulBills(false)


  }

  const toggleShowSuccessfulBills = () => {
    if (!showSuccessfulBills) {
      setShowSuccessfulBills(!showSuccessfulBills)
    }
    setShowBills(false)
    setShowPendingBills(false)
    setShowDeclinedBills(false)


  }
  const {
    studentCount,
    teacherCount,
    parentCount,
    staffCount,

    staffLoader,
    recentStaff,

    recentParent,
    parentLoader,

    totalAllSchoolFeesPayment,
    totalPendingSchoolFeesPayment,
    totalDeclinedSchoolFeesPayment,

    recentBillsPayment,
    recentPendingBillsPayment,
    recentSucessBillsPayment,
    recentDeclinedBillsPayment,

    totalPendingBillsPayment,
    totalDeclinedBillsPayment,
    totalSucessBillsPayment,
    totalBillsPayment,



    recentAllSchoolFeesPayment,
    recentSucessSchoolFeesPayment,
    recentDeclinedSchoolFeesPayment,
    recentPendingSchoolFeesPayment,
    totalSucessSchoolFeesPayment,

    currentsession,

    recentAdminHrNotification,
    adminHrNotificationLoader,

    AllSchoolFeesPaymentFunction,
    PendingSchoolFeesPaymentFunction,
    SucessSchoolFeesPaymentFunction,
    DeclinedSchoolFeesPaymentFunction,

    recentStudent,
    studentLoader,


    recentEmail,
    emailLoader,



    StudentFunction,
    TeacherFunction,
    ParentFunction,
    StaffFunction,
    AdminHrNotificationFunction,
    SessionFunction,
    // PendingBillsPaymentFunction,
    // SucessBillsPaymentFunction,
    DeclinedBillsPaymentFunction,
    EmailFunction,

  } = useContext(AllDataContext)!;

  const {
    truncateText,

    formatDate,
    formatName,

    formatCurrency,

  } = useContext(AuthContext)!;

  useEffect(() => {

    StudentFunction()
    TeacherFunction()
    ParentFunction()
    StaffFunction()
    AdminHrNotificationFunction()
    AllSchoolFeesPaymentFunction()
    PendingSchoolFeesPaymentFunction()
    SucessSchoolFeesPaymentFunction()
    DeclinedSchoolFeesPaymentFunction()
    SessionFunction()

    // BillsPaymentFunction(),
      // PendingBillsPaymentFunction(),
      // SucessBillsPaymentFunction(),
      DeclinedBillsPaymentFunction()
    EmailFunction()

    console.log(currentsession)


  }, [])

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours()
      console.log(currentHour)

      if (currentHour >= 0 && currentHour < 12) {
        setTimeOfDay('Bonjour')
      } else if (currentHour >= 12 && currentHour < 16) {
        setTimeOfDay('Bonjour')
      } else if (currentHour >= 16 && currentHour < 24) {
        setTimeOfDay('Bonsoir')
      }
    }

    updateGreeting()

    const interval = setInterval(updateGreeting, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className={`container-xl mb-5 pb-4`}>
      <p className='stylish-text md-text pb-4 mt-5'>{timeofDay} 👋</p>

      <section>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="row g-4">
              <div className="col-sm-4">
                <div className="site-boxes border-radius-10px p-3">
                  <div className=''>
                    <div className="d-flex align-center mb-3">
                      <div className='primary-bg site-small-icon border-radius-5px me-2'>
                        <i className="ri-group-line  white-text"></i>
                      </div>
                      <p className='light-text'>Total Students</p>
                    </div>

                    <p className="lg-text">{studentCount}</p>
                    <p className="light-text xsm-text">Students are present now</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="site-boxes border-radius-10px p-3">
                  <div className=''>
                    <div className="d-flex align-center mb-3">
                      <div className='secondary-bg site-small-icon border-radius-5px me-2'>
                        <i className="ri-group-2-fill  white-text"></i>
                      </div>
                      <p className='light-text'>Total Teachers</p>
                    </div>

                    <p className="lg-text">{teacherCount}</p>
                    <p className="light-text xsm-text">Teachers are present now</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="site-boxes border-radius-10px p-3">
                  <div className=''>
                    <div className="d-flex align-center mb-3">
                      <div className='support-bg site-small-icon border-radius-5px me-2'>
                        <i className="ri-parent-line  white-text"></i>
                      </div>
                      <p className='light-text'>Total Parents</p>
                    </div>

                    <p className="lg-text">{parentCount}</p>
                    <p className="light-text xsm-text">Parents are present now</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 overflow-hidden">
              <div className="site-boxes border-radius-10px p-4">
                <div className='pb-4'>
                  <h6>User Accounts</h6>
                  <p className="sm-text light-text">All users that have been registered</p>
                </div>
                <div className="d-flex light-text">
                  <div className='pe-5'>
                    <h3 className="pb-1 ">{studentCount}</h3>
                    <p className="sm-text">Students</p>
                  </div>

                  <div className='pe-5'>
                    <h3 className="pb-1 ">{teacherCount}</h3>
                    <p className="sm-text">Teachers</p>
                  </div>

                  <div className='pe-5'>
                    <h3 className="pb-1">{parentCount}</h3>
                    <p className="sm-text">Parents</p>
                  </div>

                  <div className='pe-5'>
                    <h3 className="pb-1">{staffCount}</h3>
                    <p className="sm-text">Staffs</p>
                  </div>
                </div>

                <div className="py-3">
                  <UsersChart
                    studentCount={studentCount}
                    teacherCount={teacherCount}
                    parentCount={parentCount}
                    staffCount={staffCount}
                    label='User count'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="site-boxes position-relative1 recent-notification-box border-radius-10px p-4">
              <div className='pb-4'>
                <h6>Recent Admin Notifications</h6>
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
                        <Link href='/admin/admin-hr-notification' className='site-btn width-100 Link'>View All</Link>
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

          <div className="col-md-6 col-lg-4">
            <div className="site-boxes border-radius-10px p-3">
              <div>
                <h6>School Fees Chart</h6>
              </div>
              <div className="py-3">
                <SchoolFeesChart
                  allCount={totalAllSchoolFeesPayment}
                  pendingCount={totalPendingSchoolFeesPayment}
                  successfulCount={totalSucessSchoolFeesPayment}
                  declinedCount={totalDeclinedSchoolFeesPayment}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="site-boxes recent-school-fees-box position-relative1 p-3 border-radius-10px">
              <div className='pb-4'>
                <p className='pb-4'>Recent School Fees</p>
                <div className="d-flex light-text flex-wrap">
                  <div onClick={toggleShowSchoolFees} className={`${showSchoolFees ? 'site-completed-border' : 'site-border '} me-3 mb-3 px-2 py-1 border-radius-10px cursor-pointer`}>
                    <div className="d-flex align-center">
                      <div className='site-completed-dot'></div>
                      <p className='ps-2'>All</p>
                    </div>
                  </div>


                  <div onClick={toggleShowPendingSchoolFees} className={`${showPendingSchoolFees ? 'site-pending-border' : 'site-border'} me-3 mb-3  px-2 py-1 border-radius-10px cursor-pointer`}>
                    <div className="d-flex align-center">
                      <div className='site-pending-dot'></div>
                      <p className='ms-2'>Pending</p>
                    </div>
                  </div>

                  <div onClick={toggleShowSuccessfulSchoolFees} className={`${showSuccessfulSchoolFees ? 'site-successful-border' : 'site-border'} me-3 mb-3  px-2 py-1 border-radius-10px cursor-pointer`}>
                    <div className="d-flex align-center">
                      <div className='site-successful-dot'></div>
                      <p className='ms-2'>Successful</p>
                    </div>
                  </div>

                  <div onClick={toggleShowDeclinedSchoolFees} className={`${showDeclinedSchoolFees ? 'site-declined-border' : 'site-border'} px-2 mb-3  py-1 border-radius-10px cursor-pointer`}>
                    <div className="d-flex align-center">
                      <div className='site-declined-dot'></div>
                      <p className='ps-2'>Declined</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='light-text dahboard-table non-wrap-text scroll-bar'>
                <table className='overflow-auto'>
                  <thead>
                    <tr className='sm-text'>
                      <th className="">User ID</th>
                      <th className="">Name</th>
                      <th className="">payment Method</th>
                      <th className="">Amount</th>
                      <th className="">Date</th>
                    </tr>
                  </thead>

                  {showSchoolFees && (
                    <tbody>
                      {recentAllSchoolFeesPayment.length > 0 ? (
                        recentAllSchoolFeesPayment.map((data) => (
                          <tr key={data.id}>
                            <td>{data.student_name.userID}</td>
                            <td className="ps-4 py-2">{formatName(data.student_name.first_name)}</td>
                            <td>{formatName(data.payment_method_name.name)}</td>
                            <td>{formatCurrency(data.fee_type_name.amount)}</td>
                            <td>{formatDate(data.date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="ps-4 py-2">No details available</td>
                        </tr>
                      )}


                    </tbody>
                  )
                  }


                  {showPendingSchoolFees && (
                    <tbody>
                      {recentPendingSchoolFeesPayment.length > 0 ? (
                        recentPendingSchoolFeesPayment.map((data) => (
                          <tr key={data.id}>
                            <td>{data.student_name.userID}</td>
                            <td className="ps-4 py-2">{formatName(data.student_name.first_name)}</td>
                            <td>{formatName(data.payment_method_name.name)}</td>
                            <td>{formatCurrency(data.fee_type_name.amount)}</td>
                            <td>{formatDate(data.date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="ps-4 py-2">No details available</td>
                        </tr>
                      )}

                    </tbody>
                  )
                  }

                  {showSuccessfulSchoolFees && (
                    <tbody>
                      {recentSucessSchoolFeesPayment.length > 0 ? (
                        recentSucessSchoolFeesPayment.map((data) => (
                          <tr key={data.id}>
                            <td>{data.student_name.userID}</td>
                            <td className="ps-4 py-2">{formatName(data.student_name.first_name)}</td>
                            <td>{formatName(data.payment_method_name.name)}</td>
                            <td>{formatCurrency(data.fee_type_name.amount)}</td>
                            <td>{formatDate(data.date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="ps-4 py-2">No details available</td>
                        </tr>
                      )}



                    </tbody>
                  )
                  }


                  {showDeclinedSchoolFees && (
                    <tbody>
                      {recentDeclinedSchoolFeesPayment.length > 0 ? (
                        recentDeclinedSchoolFeesPayment.map((data) => (
                          <tr key={data.id}>
                            <td>{data.student_name.userID}</td>
                            <td className="ps-4 py-2">{formatName(data.student_name.first_name)}</td>
                            <td>{formatName(data.payment_method_name.name)}</td>
                            <td>{formatCurrency(data.fee_type_name.amount)}</td>
                            <td>{formatDate(data.date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="ps-4 py-2">No details available</td>
                        </tr>
                      )}

                    </tbody>
                  )
                  }


                </table>


                <div className='pt-4 recent-school-fees-link'>
                  <Link href='/admin/school-fees-payment/all' className='site-btn Link width-120px'>View all</Link>
                </div>
              </div>
            </div>
          </div>



          <div className="col-md-6 col-lg-4 ">
            <div className="site-boxes position-relative1 recent-student-box border-radius-10px p-4">
              <div className='pb-5  d-flex justify-content-between'>
                <h6>Recent Students</h6>
                <Link href='/admin/all-student' className='light-link'>View all</Link>
              </div>
              {studentLoader ? (
                <div className="recent-notification-spinner">
                  <div className="site-content-loader"></div>
                </div>
              ) : (
                <div>

                  {recentStudent.length > 0 ? (
                    <div>
                      {recentStudent.map((data) => (
                        <div key={data.id}>
                          <div className="d-flex align-center">
                            <Image className='logo border-radius-50' src={data.passport} alt="Logo" width={50} height={50} />
                            <div className='ps-3'>
                              <p>{formatName(data.first_name)} {formatName(data.last_name)} </p>
                              <p className="light-text sm-text">A student from {formatName(data.state_of_origin)} State, currently in {formatName(data.student_class_name.name)}, has the user ID {formatName(data.userID)}.</p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                    </div>

                  ) : (
                    <div className='light-text recent-notification-spinner text-center'>
                      <i className="ri-error-warning-line"></i>
                      <p>No recent student.</p>
                    </div>
                  )}




                </div>
              )}


            </div>

            <div className="mt-4 d-block d-lg-none position-relative1 site-boxes border-radius-10px p-3 mt-4 recent-email-box">
              <div>
                <p className='pb-4'>Recent Email Sent</p>
                <div>
                  {emailLoader ? (
                    <div className="recent-notification-spinner">
                      <div className="site-content-loader"></div>
                    </div>
                  ) : (
                    <div>

                      {recentEmail.length > 0 ? (
                        <div>
                          {recentEmail.map((data) => (
                            <div key={data.id}>
                              <div className="pb-2 d-flex justify-content-between sm-text light-text">
                                <p>{data.to}</p>
                                <p>{formatDate(data.date)}</p>
                              </div>
                              <p className="light-text">{truncateText(data.body, 12)}</p>
                              <hr />
                            </div>
                          ))}
                        </div>

                      ) : (
                        <div className='light-text recent-notification-spinner text-center'>
                          <i className="ri-error-warning-line"></i>
                          <p>No recent email.</p>
                        </div>
                      )}




                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-6">
            <div className="row ">
              <div className="col-lg-4">
                <div className="site-boxes p-3 mb-4 border-radius-10px">
                  <div className='light-primary-bg site-small-icon border-radius-5px me-2'>
                    <i className="ri-secure-payment-fill  white-text"></i>
                  </div>

                  <p className="md-text pt-3">{formatCurrency(totalSucessSchoolFeesPayment)}<span className='font-size-20px'>NGN</span></p>
                  <p className="light-text">Total school fees paid</p>
                </div>

                <div className="site-boxes p-3 mb-4 border-radius-10px">
                  <div className='light-secondary-bg site-small-icon border-radius-5px me-2'>
                    <i className="ri-secure-payment-fill  white-text"></i>
                  </div>

                  <p className="md-text pt-3">{formatCurrency(totalSucessBillsPayment)}<span className='font-size-20px'>NGN</span></p>
                  <p className="light-text pb-3">Total bills paid</p>
                </div>
              </div>

              <div className="col-lg-8 mb-4">
                <div className="site-boxes border-radius-10px p-3">
                  <div>
                    <h6>Bills Chart</h6>
                  </div>
                  <BillsChart
                    billsCount={totalBillsPayment}
                    pendingBillsCount={totalPendingBillsPayment}
                    declinedBillsCount={totalDeclinedBillsPayment}
                    successfulBillsCount={totalSucessBillsPayment}
                    label='Bills Chart'
                  />
                </div>
              </div>

            </div>

            <div className=" site-boxes recent-school-fees-box position-relative1 p-3 border-radius-10px">
              <div className='pb-4'>
                <p className='pb-4'>Recent Bills</p>
                <div className="d-flex light-text flex-wrap">
                  <div onClick={toggleShowBills} className={`${showBills ? 'site-completed-border' : 'site-border '} me-3 mb-3 px-2 py-1 border-radius-10px cursor-pointer`}>
                    <div className="d-flex align-center">
                      <div className='site-completed-dot'></div>
                      <p className='ps-2'>All</p>
                    </div>
                  </div>


                  <div onClick={toggleShowPendingBills} className={`${showPendingBills ? 'site-pending-border' : 'site-border'} me-3 mb-3  px-2 py-1 border-radius-10px cursor-pointer`}>
                    <div className="d-flex align-center">
                      <div className='site-pending-dot'></div>
                      <p className='ms-2'>Pending</p>
                    </div>
                  </div>

                  <div onClick={toggleShowSuccessfulBills} className={`${showSuccessfulBills ? 'site-successful-border' : 'site-border'} me-3 mb-3  px-2 py-1 border-radius-10px cursor-pointer`}>
                    <div className="d-flex align-center">
                      <div className='site-successful-dot'></div>
                      <p className='ms-2'>Successful</p>
                    </div>
                  </div>

                  <div onClick={toggleShowDeclinedBills} className={`${showDeclinedBills ? 'site-declined-border' : 'site-border'} px-2 mb-3  py-1 border-radius-10px cursor-pointer`}>
                    <div className="d-flex align-center">
                      <div className='site-declined-dot'></div>
                      <p className='ps-2'>Declined</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='light-text dahboard-table non-wrap-text scroll-bar'>
                <table className='overflow-auto'>
                  <thead>
                    <tr className='sm-text'>
                      <th className="">User ID</th>
                      <th className="">Name</th>
                      <th className="">payment Method</th>
                      <th className="">Amount</th>
                      <th className="">Date</th>
                    </tr>
                  </thead>

                  {showBills && (
                    <tbody>
                      {recentBillsPayment.length > 0 ? (
                        recentBillsPayment.map((data) => (
                          <tr key={data.id}>
                            <td>{data.student_name.userID}</td>
                            <td className="ps-4 py-2">{formatName(data.student_name.first_name)}</td>
                            <td>{formatName(data.bill_name.bill_name)}</td>
                            <td>{formatCurrency(data.bill_name.amount)}</td>
                            <td>{formatDate(data.date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="ps-4 py-2">No details available</td>
                        </tr>
                      )}


                    </tbody>
                  )
                  }


                  {showPendingBills && (
                    <tbody>
                      {recentPendingBillsPayment.length > 0 ? (
                        recentPendingBillsPayment.map((data) => (
                          <tr key={data.id}>
                            <td>{data.student_name.userID}</td>
                            <td className="ps-4 py-2">{formatName(data.student_name.first_name)}</td>
                            <td>{formatName(data.bill_name.bill_name)}</td>
                            <td>{formatCurrency(data.bill_name.amount)}</td>
                            <td>{formatDate(data.date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="ps-4 py-2">No details available</td>
                        </tr>
                      )}

                    </tbody>
                  )
                  }

                  {showSuccessfulBills && (
                    <tbody>
                      {recentSucessBillsPayment.length > 0 ? (
                        recentSucessBillsPayment.map((data) => (
                          <tr key={data.id}>
                            <td>{data.student_name.userID}</td>
                            <td className="ps-4 py-2">{formatName(data.student_name.first_name)}</td>
                            <td>{formatName(data.bill_name.bill_name)}</td>
                            <td>{formatCurrency(data.bill_name.amount)}</td>
                            <td>{formatDate(data.date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="ps-4 py-2">No details available</td>
                        </tr>
                      )}



                    </tbody>
                  )
                  }


                  {showDeclinedBills && (
                    <tbody>
                      {recentDeclinedBillsPayment.length > 0 ? (
                        recentDeclinedBillsPayment.map((data) => (
                          <tr key={data.id}>
                            <td>{data.student_name.userID}</td>
                            <td className="ps-4 py-2">{formatName(data.student_name.first_name)}</td>
                            <td>{formatName(data.bill_name.bill_name)}</td>
                            <td>{formatCurrency(data.bill_name.amount)}</td>
                            <td>{formatDate(data.date)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="ps-4 py-2">No details available</td>
                        </tr>
                      )}

                    </tbody>
                  )
                  }


                </table>


                <div className='pt-4 recent-school-fees-link'>
                  <Link href='/admin/bills-payment/all' className='site-btn Link width-120px'>View all</Link>
                </div>
              </div>
            </div>

          </div>

          <div className="col-md-6">
            <div className="site-boxes position-relative p-3 border-radius-10px recent-staff-parent-box">
              <div>
                <div className="d-flex justify-content-between pb-4">
                  <p>Recent Staff</p>
                  <Link href='/admin/staffs' className='light-link'>View all</Link>
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
                  <Link href='/admin/all-parents' className='light-link'>View all</Link>
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





        </div>
      </section>
    </div>
  )
}

export default AdminHome