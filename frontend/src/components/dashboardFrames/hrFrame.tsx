"use client"
import { faAngleDown, faArrowLeft, faBars, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import AuthContext from '@/context/AuthContext'
import '../../css/component/dashFrames.css'
import Image from 'next/image'

const HrFrame = () => {
  const {
    toggleShowSidebar,
    toggleCloseSidebar,
    OnbodyClick,
    showSidebar,
    LogoutUser,
    authTokens,
    formatName,


  } = useContext(AuthContext)!


  const [userDetails, setUserDetails] = useState<any>(null)


  const [studentDropdown, setStudentDropdown] = useState(false)
  const [staffDropdown, setStaffDropdown] = useState(false)
  const [parentDropdown, setParentDropdown] = useState(false)

  const [notificationDropdown, setNotificationDropdown] = useState(false)
  const [emailDropdown, setEmailDropdown] = useState(false)

  const [navDropdown, setNavDropdown] = useState(false)
  const pathname = usePathname()
  const isActiveDashLink = (path: string) => {
    return pathname === path
  }

  const router = useRouter()



  const toggleStudent = () => {
    setStudentDropdown(!studentDropdown)
    setStaffDropdown(false)
    setParentDropdown(false)
    setNotificationDropdown(false)
    setEmailDropdown(false)
  }
  const toggleStaff = () => {
    setStaffDropdown(!staffDropdown)
    setStudentDropdown(false)
    setParentDropdown(false)
    setNotificationDropdown(false)
    setEmailDropdown(false)
  }

  const toggleParent = () => {
    setParentDropdown(!parentDropdown)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setNotificationDropdown(false)
    setEmailDropdown(false)
  }












  const toggleNotiffcation = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setNotificationDropdown(!notificationDropdown)
  }




  const toggleEmail = () => {
    setParentDropdown(false)
    setStudentDropdown(false)
    setStaffDropdown(false)
    setNotificationDropdown(false)
    setEmailDropdown(!emailDropdown)
  }


  const toggleNavDropdown = () => {
    setNavDropdown(!navDropdown)
  }

  const UserDetails = async () => {
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
  console.log(authTokens)
  const currentUser = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/me/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        if (data.role !== 'hr') {
          router.push('/login')
        }
      }
    } catch {
      console.log('error')
    }

  }

  useEffect(() => {
    UserDetails()
    currentUser()
  }, [])



  return (
    <div>
      <div>
        <div className={`dashboard-sidebar site-boxes border-radius-10px ${showSidebar ? 'show-sidebar' : 'close-sidebar'}`}>
          <div className="dashboard-sidebar-head stylish-text pt-3 mx-4">
            <h4>HR PANEL</h4><FontAwesomeIcon icon={faArrowLeft} onClick={toggleCloseSidebar} className="close-sidebar-btn pt-1 sm-text cursor-pointer" /></div>
          <hr />


          <div className="pt-4 mt-4 mb-4">
            <div className="d-flex justify-content-center">
              <div className="site-border p-1 border-radius-50">
                {userDetails?.passport ? (
                  <Image className='border-radius-50' src={userDetails?.passport} alt="Logo" width={75} height={75} />
                ) : (
                  <Image className='border-radius-10px' src='/img/icon/user-icon.png' alt="Logo" width={75} height={75} />
                )}


              </div>
            </div>

            <div className="text-center pt-2">
              <p>{formatName(userDetails?.first_name || 'Hr name')} {formatName(userDetails?.last_name || '')}</p>
              <p className="light-text sm-text">{userDetails?.email}</p>
              <p className="light-text sm-text">HR</p>

            </div>
          </div>

          <ul className='scroll-bar-y student-sidebar-height'>
            <li className="mt-3 py-3">
              <Link href='/hr/home' className='dashboard-link' onClick={OnbodyClick}>
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
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/all-student") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/all-student" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Students</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/add-student") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/add-student" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Add Students</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/disable-student-account") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/disable-student-account" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Disable Student Account</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/update-student-current-class/change") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/update-student-current-class/change" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Update Student Class</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/update-student-current-class/check") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/update-student-current-class/check" onClick={OnbodyClick}>
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
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/hrs") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/teachers" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Teachers Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/bursary-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/bursary-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Bursary Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/staffs") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/staffs" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Staff</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/hr-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/hr-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>HR Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/store-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/store-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>STORE Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/result-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/result-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Result Dept</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/academic-dept") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/academic-dept" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Academic Dept</p>
                      </div>
                    </Link>
                  </li>
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/other-staff") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/other-staff" onClick={OnbodyClick}>
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
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/all-parents/") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/all-parents/" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Parent</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/add-parent") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/add-parent" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Add Parents</p>
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
                    <p>Notifice & Event</p>
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
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/hr-hr-notification") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/admin-hr-notification" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Admin</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/school-notification") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/school-notification" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>General</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/staff-notification") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/staff-notification" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Staff </p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/school-event") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/school-event" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>School Event </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>


            <li className=" pb-4">
              <div className="row">
                <div className="col-12 ps-4">
                  <div className="d-flex ">
                    <Link href='/hr/request-to-change-password' className='dashboard-link' onClick={OnbodyClick}>
                      <div className="d-flex">
                        <i className="bi bi-journal me-3"></i>
                        <p>Request to change Password</p>
                      </div>
                    </Link>
                  </div>
                </div>
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
                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/send-email") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/send-email" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>send mail</p>
                      </div>
                    </Link>
                  </li>


                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/send-bulk-email") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/send-bulk-email" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>Send Bulk Mail</p>
                      </div>
                    </Link>
                  </li>

                  <li className={`dashboard-sidebar-dropdown-link ${isActiveDashLink("/hr/all-email") ? "active-dash-link" : ""}`}>
                    <Link className='dashboard-link' href="/hr/all-email" onClick={OnbodyClick}>
                      <div className="d-flex ps-5 py-2">
                        <p>All Mail</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

            </li>

            <li className=" pb-4">
              <div className="row">
                <div className="col-8 ps-4">
                  <div className="d-flex ">
                    <Link href='/hr/home' className='dashboard-link' onClick={OnbodyClick}>
                      <div className="d-flex">
                        <i className="bi bi-cart4 me-3"></i>
                        <p>Store</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

            </li>

            <li className='mb-5 mx-3'>
              <Link href='/hr/contact-us' className="site-btn px-3 Link"><i className="ri-phone-line pe-2"></i>Contact Support</Link>
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
                  <div className="d-flex align-center dashboard-content-user-link-hover" onClick={toggleNavDropdown}>
                    {userDetails?.passport ? (
                      <Image className='border-radius-50' src={userDetails?.passport} alt="Logo" width={33} height={33} />
                    ) : (
                      <img width='35px' src="/img/icon/user-icon.png" alt="" />

                    )
                    }
                    <p className='px-2 pt-1'>{formatName(userDetails?.first_name || 'Hr name')} {formatName(userDetails?.last_name || '')}</p>
                    <p className='pt-1'><FontAwesomeIcon className='xsm-text' icon={faAngleDown} /></p>
                  </div>
                  {navDropdown &&
                    <div className="border-bottom-dark dashboard-content-user-drop-down  site-boxes">
                      <ul className=''>
                        <li className='pb-3'>
                          <Link href={`/hr/user-profile/${authTokens?.user_id}`} className='light-link'>
                            <div className="d-flex">
                              <i className="ri-user-3-line pe-2"></i>
                              <p className=''>My profile </p>
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

export default HrFrame