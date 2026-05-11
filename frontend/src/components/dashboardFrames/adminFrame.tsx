"use client"

import { faAngleDown, faArrowLeft, faBars, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { usePathname} from 'next/navigation'
import AuthContext from '@/context/AuthContext'
import '../../css/component/dashFrames.css'

const AdminFrame = () => {
  const {
    toggleShowSidebar,
    toggleCloseSidebar,
    OnbodyClick,
    showSidebar,
    LogoutUser,


  } = useContext(AuthContext)!



  const [studentDropdown, setStudentDropdown] = useState(false)
  const [staffDropdown, setStaffDropdown] = useState(false)
  const [parentDropdown, setParentDropdown] = useState(false)
  const [schoolFeesDropdown, setSchoolFeesDropdown] = useState(false)
  const [billsDropdown, setBillsDropdown] = useState(false)
  const [storeDropdown, setstoreDropdown] = useState(false)
  const [paymentMethodDropdown, setPaymentMethodDropdown] = useState(false)
  const [academicsDropdown, setAcademicsDropdown] = useState(false)
  const [classActivityDropdown, setClassActivityDropdown] = useState(false)
  const [notificationDropdown, setNotificationDropdown] = useState(false)
  const [resultDropdown, setResultDropdown] = useState(false)
  const [EResultDropdown, setEResultDropdown] = useState(false)
  const [emailDropdown, setEmailDropdown] = useState(false)

  const [navDropdown, setNavDropdown] = useState(false)
  const pathname = usePathname()
  const isActiveDashLink = (path: string) => {
    return pathname === path
  }


  const toggleStudent = () => {
    setStudentDropdown(!studentDropdown)
    setStaffDropdown(false)
    setParentDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
    setEmailDropdown(false)
  }
  const toggleStaff = () => {
    setStaffDropdown(!staffDropdown)
    setStudentDropdown(false)
    setParentDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
    setEmailDropdown(false)
  }

  const toggleParent = () => {
    setParentDropdown(!parentDropdown)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
    setEmailDropdown(false)
  }

  const toggleSchooolFess = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(!schoolFeesDropdown)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
  }

  const toggleBills = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(!billsDropdown)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
    setEmailDropdown(false)
  }

  const toggleStore = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(!storeDropdown)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
    setEmailDropdown(false)
  }


  const togglePaymentMethod = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(!paymentMethodDropdown)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
    setEmailDropdown(false)
  }

  const toggleAcademics = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(!academicsDropdown)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
  }



  const toggleClassActivity = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(!classActivityDropdown)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
  }


  const toggleNotiffcation = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(!notificationDropdown)
    setResultDropdown(false)
    setEResultDropdown(false)
  }

  const toggleResult = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(!resultDropdown)
    setEResultDropdown(false)
  }

  const toggleEResult = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(!EResultDropdown)
    setEmailDropdown(false)
  }

  const toggleEmail = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setSchoolFeesDropdown(false)
    setBillsDropdown(false)
    setstoreDropdown(false)
    setPaymentMethodDropdown(false)
    setAcademicsDropdown(false)
    setClassActivityDropdown(false)
    setNotificationDropdown(false)
    setResultDropdown(false)
    setEResultDropdown(false)
    setEmailDropdown(!emailDropdown)
  }


  const toggleNavDropdown = () => {
    setNavDropdown(!navDropdown)
  }

  
  // useEffect(() =>{
  //   currentUser()
  // }, [])


  return (
    <div>
      <div>
        <div className={`dashboard-sidebar site-boxes border-radius-10px ${showSidebar ? 'show-sidebar' : 'close-sidebar'}`}>
          <div className="dashboard-sidebar-head stylish-text pt-3 mx-4 ">
            <h4>ADMIN PANEL</h4><FontAwesomeIcon icon={faArrowLeft} onClick={toggleCloseSidebar} className="close-sidebar-btn pt-1 sm-text cursor-pointer" /></div>
          <hr />
          <ul className='scroll-bar-y dashboard-sidebar-height'>
            <li className="mt-3 py-3">
              <Link href='/admin/home' className='dashboard-link' onClick={OnbodyClick}>
                <div className="d-flex ps-3">
                  <i className="ri-home-smile-line sm-text me-3"></i>
                  <p>Home</p>
                </div>
              </Link>
            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleStudent}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-group-line  me-3 "></i>
                    <p>Students</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${studentDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${studentDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/all-student") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/all-student" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Students</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/add-student") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/add-student" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Add Students</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/disable-student-account") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/disable-student-account" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Disable Student Account</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/update-student-current-class/change") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/update-student-current-class/change" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Update Student Class</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/update-student-current-class/check") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/update-student-current-class/check" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Check Students in Class</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleStaff}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">

                    <i className="ri-group-2-fill  me-3 "></i>
                    <p>Staffs</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${staffDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${staffDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/teachers") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/teachers" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Teachers Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/bursary-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/bursary-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Bursary Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/staffs") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/staffs" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Staff</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/hr-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/hr-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>HR Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/store-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/store-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>STORE Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/result-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/result-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Result Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/academic-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/academic-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Academic Dept</p>
                      </div>
                    </Link>
                  </li>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/other-staff") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/other-staff" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Other Staff</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleParent}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-parent-line  me-3 "></i>
                    <p>Parents</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${parentDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${parentDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/all-parents/") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/all-parents/" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Parent</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/add-parent") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/add-parent" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Add Parents</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleSchooolFess}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">

                    <i className="ri-secure-payment-fill  me-3 "></i>
                    <p>School Fees</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${schoolFeesDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${schoolFeesDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/school-fees-bill/school-fees") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/school-fees-bill/school-fees" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Create School Fees</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/school-fees-payment/add/step-1") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/school-fees-payment/add/step-1" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Pay Fees</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/school-fees-payment/all") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/school-fees-payment/all" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Fees</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/school-fees-payment/pending") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/school-fees-payment/pending" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Pending</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/school-fees-payment/approved") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/school-fees-payment/approved" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Approved</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/school-fees-payment/declined") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/school-fees-payment/declined" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Declined</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleBills}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-wallet-3-line  me-3 "></i>
                    <p>Bills</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${billsDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${billsDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/create-bills") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/create-bills" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Create Bills </p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/bills-payment/add") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/bills-payment/add" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Pay Bills</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/bills-payment/all") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/bills-payment/all" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Fees</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/bills-payment/pending") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/bills-payment/pending" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Pending</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/bills-payment/approved") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/bills-payment/approved" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Approved</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/bills-payment/declined") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/bills-payment/declined" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Declined</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>


            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleStore}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-store-fill  me-3 "></i>
                    <p>Store</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${storeDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${storeDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/product-categories") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/product-categories" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Product Categories </p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/product") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/product" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Product</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/dashboard/investment/plan/") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/dashboard/investment/plan/" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Order</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={togglePaymentMethod}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-mastercard-line  me-3 "></i>
                    <p>Payment Method</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${paymentMethodDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${paymentMethodDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/payment-method") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/payment-method" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Payment Method</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/payment-method/add") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/payment-method/add" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Add Payment Method</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/bank-account") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/bank-account" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Bank Account</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleAcademics}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-school-line  me-3 "></i>
                    <p>Academics</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${academicsDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${academicsDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/student-class") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/student-class" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Student Class</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/subject") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/subject" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Subjects</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/term") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/term" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Term</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/session") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/session" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Session</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleClassActivity}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-book-open-line  me-3 "></i>
                    <p>Classroom Activity</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${classActivityDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${classActivityDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/assignment") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/assignment" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Assignment</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/class-timetable") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/class-timetable" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Class Timetable</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/scheme-of-work") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/scheme-of-work" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Scheme of work</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleNotiffcation}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-notification-line  me-3 "></i>
                    <p>Notification</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${notificationDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${notificationDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/admin-hr-notification") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/admin-hr-notification" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Admin</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/school-notification") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/school-notification" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>General</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/staff-notification") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/staff-notification" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Staff </p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/class-notification") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/class-notification" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>classrom </p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/school-event") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/school-event" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>School Event </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleResult}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-booklet-line  me-3 "></i>
                    <p>Result</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${resultDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${resultDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/check-result") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/check-result" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Check Result</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/upload-result") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/upload-result" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Upload</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/scratch-card") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/scratch-card" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Scratch Card </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleEResult}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-macbook-fill  me-3 "></i>
                    <p>E-Result</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${EResultDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${EResultDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/e-result") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/e-result" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Check E-Result</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/upload-e-result") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/upload-e-result" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Upload</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>


            <li className={`pb-2 cursor-pointer`}>
              <div className="row mb-2 dashboard-sidebar-list dashboard-link" onClick={toggleEmail}>
                <div className='col-8 ps-4 y'>
                  <div className="d-flex ">
                    <i className="ri-mail-send-fill  me-3 "></i>
                    <p>Email</p>
                  </div>
                </div>

                <div className="col-4 ">
                  <div className="d-flex me-2 justify-content-end mt-1" >
                    <p className={`${emailDropdown ? 'rotate-90deg' : ''}`}><i className="ri-arrow-right-s-line"></i></p>
                  </div>
                </div>
              </div>

              <div>
                <ul className={`dashboard-dropdown-bg ${emailDropdown ? "slide-in" : "slide-out"}`}>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/send-email") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/send-email" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>send mail</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/send-bulk-email") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/send-bulk-email" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Send Bulk Mail</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/admin/all-email") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/admin/all-email" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Mail</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>




          </ul>
        </div>

        <div className={`dashboard-nav`}>
          <div className="site-boxes border-bottom-dark border-radius-10px nav-box-shadow">
            <nav className="text-light d-flex align-items-center justify-content-between position-sticky">
              <div className="mx-3 text-light"><FontAwesomeIcon icon={faBars} onClick={toggleShowSidebar} className=" dashboard-menu-bar cursor-pointer" /></div>
              <div className="d-flex align-items-center">

                <div className="d-none d-md-block">
                  <Link href='/' className='site-link dashboard-content-site-link'>
                    <div className='d-flex pe-5 me-5'>
                      <div>
                        <FontAwesomeIcon icon={faLock} />
                      </div>
                      <p className='mx-2'>Visit website</p>
                      <i className="bi bi-box-arrow-in-up-right"></i>
                    </div>
                  </Link>
                </div>
                <div className="dashboard-content-user-link cursor-pointer">
                  <div className="d-flex dashboard-content-user-link-hover" onClick={toggleNavDropdown}>
                    <img width='35px' src="/img/icon/user-icon.png" alt="border-radius-50" />
                    <p className='px-2 pt-1'>School Management</p>
                    <p className='pt-1'><FontAwesomeIcon className='xsm-text' icon={faAngleDown} /></p>
                  </div>
                  {navDropdown &&
                    <div className="border-bottom-dark dashboard-content-user-drop-down  site-boxes">
                      <ul className=''>
                        <li className='pb-3'>
                          <Link href='/admin/change-password' className='light-link'>
                            <div className="d-flex">
                              <i className="bi bi-gear pe-2"></i>
                              <p className=''>Settings </p>
                            </div>
                          </Link>
                        </li>

                        <li className='pb-2'>
                          <button className='light-link Button' onClick={LogoutUser}>
                            <div className="d-flex">
                              <i className="bi bi-box-arrow-in-up-right pe-2"></i>
                              <p className=''>Logout</p>
                            </div>
                          </button>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminFrame