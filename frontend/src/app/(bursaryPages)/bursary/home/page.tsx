"use client"
import { SchoolFeesBarChart, } from '@/components/chatFrames'
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
    recentStaffNotification,
    staffNotificationLoader,



    recentBillsPayment,
    recentPendingBillsPayment,
    recentSucessBillsPayment,
    recentDeclinedBillsPayment,

    // BillsPaymentFunction,
    // PendingBillsPaymentFunction,
    // SucessBillsPaymentFunction,
    DeclinedBillsPaymentFunction,


    totalAllSchoolFeesPayment,
    totalPendingSchoolFeesPayment,
    totalDeclinedSchoolFeesPayment,
    totalSucessSchoolFeesPayment,



    recentAllSchoolFeesPayment,
    recentSucessSchoolFeesPayment,
    recentDeclinedSchoolFeesPayment,
    recentPendingSchoolFeesPayment,


    AllSchoolFeesPaymentFunction,
    PendingSchoolFeesPaymentFunction,
    SucessSchoolFeesPaymentFunction,
    DeclinedSchoolFeesPaymentFunction,


    StaffNotificationFunction,

  } = useContext(AllDataContext)!;

  const {
    truncateText,
    authTokens,

    formatDate,
    formatName,
    formatCurrency,

  } = useContext(AuthContext)!;


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


  const UserDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/staff/${authTokens?.user_id}/`, {
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
    StaffNotificationFunction()
    UserDetailsFunction()

    AllSchoolFeesPaymentFunction()
    PendingSchoolFeesPaymentFunction()
    SucessSchoolFeesPaymentFunction()
    DeclinedSchoolFeesPaymentFunction()

    // BillsPaymentFunction(),
    // PendingBillsPaymentFunction(),
    // SucessBillsPaymentFunction(),
    DeclinedBillsPaymentFunction()

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
              <Image className='logo' src="/img/icon/bursar.png" alt="Logo" width={190} height={190} />
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
                          <p className='light-text'>User ID</p>
                        </div>

                        <h5 className="pb-2">{userDetails.userID} </h5>
                        <p className="light-text xsm-text">User given ID by the school</p>
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

                        <h5 className="pb-2">{formatName(userDetails.department)}</h5>
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

                        <h5 className="pb-3">{formatName(userDetails.employment_type)}</h5>
                        <p className="light-text xsm-text">Your Employment Status</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden">
                  <div className="site-boxes border-radius-10px p-4">
                    <div className='pb-4'>
                      <h6>School Fees</h6>
                      <p className="pt-2 pb-2 sm-text light-text">School fees payment chart</p>
                    </div>
                    <div className="d-flex flex-wrap light-text">
                      <div className='pe-5'>
                        <h3 className="pb-1 ">{totalAllSchoolFeesPayment}</h3>
                        <p className="sm-text">All Fees</p>
                      </div>

                      <div className='pe-5'>
                        <h3 className="pb-1 ">{totalPendingSchoolFeesPayment}</h3>
                        <p className="sm-text">Pending</p>
                      </div>

                      <div className='pe-5'>
                        <h3 className="pb-1">{totalSucessSchoolFeesPayment}</h3>
                        <p className="sm-text">Success</p>
                      </div>

                      <div className='pe-5'>
                        <h3 className="pb-1">{totalDeclinedSchoolFeesPayment}</h3>
                        <p className="sm-text">Declined</p>
                      </div>

                      <h3>(NGN)</h3>
                    </div>

                    <div className="py-3">
                      <SchoolFeesBarChart
                        allCount={totalAllSchoolFeesPayment}
                        pendingCount={totalPendingSchoolFeesPayment}
                        successfulCount={totalSucessSchoolFeesPayment}
                        declinedCount={totalDeclinedSchoolFeesPayment}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="site-boxes position-relative1 recent-notification-box border-radius-10px p-3">
                  <div className='pb-4'>
                    <h6>Recent Staff Notifications</h6>
                  </div>
                  {staffNotificationLoader ? (
                    <div className="recent-notification-spinner">
                      <div className="site-content-loader"></div>
                    </div>
                  ) : (
                    <div>

                      {recentStaffNotification.length > 0 ? (
                        <div>
                          {recentStaffNotification.map((data) => (
                            <div key={data.id}>
                              <div>
                                <p className="pb-3 sm-text d-flex justify-content-end support-text">{(data.date)}</p>

                                <p className='sm-text'><span className="light-text">Subject:</span> {formatName(data.subject)}</p>
                                <p className='light-text sm-text'>{truncateText(data.text, 15)}</p>
                              </div>
                              <hr />
                            </div>
                          ))}

                          <div>
                            <Link href='/bursary/staff-notification' className='site-btn width-100 Link'>View All</Link>
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
                      <Link href='/bursary/bills-payment/all' className='site-btn Link width-120px'>View all</Link>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-md-6">
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
                      <Link href='/bursary/school-fees-payment/all' className='site-btn Link width-120px'>View all</Link>
                    </div>
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
                        <Link href='/bursary/contact-us' className="site-inverse-btn px-4 py-2 Link">Get Support Now</Link>
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