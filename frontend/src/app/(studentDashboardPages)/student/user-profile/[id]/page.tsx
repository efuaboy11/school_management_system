"use client"
import React, { use, useContext, useEffect, useState } from 'react'
import Image from 'next/image'


import AuthContext from '@/context/AuthContext'
import { useForm } from 'react-hook-form'
import { Pagination, Stack } from '@mui/material';

import AllDataContext from '@/context/AllData'
import Link from 'next/link'
const IndivivdualStudent = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const [showPersonalInformationModal, setShowPersonalInformationModal] = useState(false);

  const [showContactInformationModal, setShowContactInformationModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [userData, setUserData] = useState<any>(null)





  const [schoolFeesPaymentData, setSchoolFeesPaymentData] = useState<any[]>([])
  const [schoolFeesPaymentLoader, setSchoolFeesPaymentLoader] = useState(true)

  const [billsPaymentData, setBillsPaymentData] = useState<any[]>([])
  const [billsPaymentLoader, setBillsPaymentLoader] = useState(true)



  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [motherName, setMotherName] = useState('')
  const [disability, setDisability] = useState('')
  const [disabilityNote, setDisabilityNote] = useState('')
  const [religion, setReligion] = useState('')
  const [gender, setGender] = useState('')
  const [stateOfOrigin, setStateOfOrigin] = useState('')
  const [cityOrTown, setCityOrTown] = useState('')
  const [homeAddress, setHomeAddress] = useState('')

  const [passport, setPassport] = useState(null)





  const [Loading, setLoading] = useState(true)

  const {
    truncateText,
    authTokens,

    formatDate,
    formatName,
    formatCurrency,


    loader,
    setLoader,

    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;

  const {
    StudentClassFunction,
    studentClassData,

  } = useContext(AllDataContext)!;


  const handleImgFile = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setPassport(file);
    } else {
      setPassport(null);
    }
  };

  const handleClosePersonalInformationModal = () => {
    setShowPersonalInformationModal(false);
  };
  const handleShowPersonalInformationModal = () => {
    setShowPersonalInformationModal(true);
  };




  const handleCloseContactInformationModal = () => {
    setShowContactInformationModal(false);
  }

  const handleShowContactInformationModal = () => {
    setShowContactInformationModal(true);
  }





  const itemsPerPage = 5;
  const [schoolFeesPage, setSchoolFeesPage] = useState(1);

  const handleSchoolFeesChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSchoolFeesPage(value);
  };

  const startIndexSchoolFees = (schoolFeesPage - 1) * itemsPerPage;
  const currentSchoolFees = schoolFeesPaymentData.slice(startIndexSchoolFees, startIndexSchoolFees + itemsPerPage);

  const itemsPerPageBills = 5;
  const [billsPage, setBillsPage] = useState(1);

  const handleBillsChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setBillsPage(value);
  };

  const startIndexBills = (billsPage - 1) * itemsPerPageBills;
  const currentBills = billsPaymentData.slice(startIndexBills, startIndexBills + itemsPerPageBills);

  const IndividualUserDataFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/students/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setUserData(data)
        console.log('data', data)

        setFirstName(data?.first_name || '')
        setLastName(data?.last_name || '')
        setEmail(data?.email || '')
        setPhoneNumber(data?.phone_number || '')
        setDateOfBirth(data?.date_of_birth?.split('T')[0] || '');
        setFatherName(data?.father_name || '')
        setMotherName(data?.mother_name || '')
        setDisability(data?.disability || '')
        setDisabilityNote(data?.disability_note || '')
        setReligion(data?.religion || '')
        setGender(data?.gender || '')
        setStateOfOrigin(data?.state_of_origin || '')
        setCityOrTown(data?.city_or_town || '')
        setHomeAddress(data?.home_address || '')


        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }


  const IndividualSchoolFeesPaymentFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/payment-school-fees/?student=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
        setSchoolFeesPaymentData(sortedData)

        setSchoolFeesPaymentLoader(false)
      } else {
        setSchoolFeesPaymentLoader(false)
      }
    } catch {
      console.log('error')
      setSchoolFeesPaymentLoader(false)
    }

  }

  const IndividualBillsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/bills-payment/?student=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
        setBillsPaymentData(sortedData)

        setBillsPaymentLoader(false)
      } else {
        setBillsPaymentLoader(false)
      }
    } catch {
      console.log('error')
      setBillsPaymentLoader(false)
    }

  }




  useEffect(() => {
    IndividualUserDataFunction()
    IndividualSchoolFeesPaymentFunction()
    IndividualBillsFunction()
    StudentClassFunction()

  }, [])

  console.log('student class data', studentClassData)

  useEffect(() => {
    if (showPersonalInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showPersonalInformationModal]);


  useEffect(() => {
    if (showContactInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showContactInformationModal]);







  const {
    register: registerPersonalInformation,
    handleSubmit: handleSubmitPersonalInformation,
    formState: { errors: errorsPersonalInformation, },
  } = useForm<any>();




  const {
    register: registerContactInformation,
    handleSubmit: handleSubmitContactInformation,
    formState: { errors: errorsContactInformation },
  } = useForm<any>();


  const onPersonalInformationSubmit = (data: any, e: any) => {
    EditPersonalInformation(e)

  }

  const onContactInformationSubmit = (data: any, e: any) => {
    EditContactInformation(e)

  }


  const EditPersonalInformation = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('email', email)
    formData.append('phone_number', phoneNumber)
    formData.append('date_of_birth', dateOfBirth)
    formData.append('father_name', fatherName)
    formData.append('gender', gender)
    formData.append('mother_name', motherName)
    formData.append('disability', disability)
    formData.append('disability_note', disabilityNote)
    formData.append('religion', religion)
    if (passport) {
      formData.append('passport', passport);
    }


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/students/${id}/`, {
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
        setShowPersonalInformationModal(false)
        IndividualUserDataFunction()
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



  const EditContactInformation = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('state_of_origin', stateOfOrigin)
    formData.append('city_or_town', cityOrTown)
    formData.append('home_address', homeAddress)
    formData.append('phone_number', phoneNumber)




    try {
      const response = await fetch(`https://school.amanilightequity.com/api/students/${id}/`, {
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
        setShowContactInformationModal(false)
        IndividualUserDataFunction()
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





  return (
    <div>


      {showPersonalInformationModal && (
        <section className={` ${showPersonalInformationModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div>
                      <div className="d-flex justify-content-between pb-2">
                        <p className='font-size-20px '>Edit Personal Profile</p>
                        <div onClick={handleClosePersonalInformationModal} className='cursor-pointer'>
                          <i className="ri-close-line md-text"></i>
                        </div>
                      </div>


                      <div className='pt-4'>
                        <form onSubmit={handleSubmitPersonalInformation(onPersonalInformationSubmit)}>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label htmlFor="firstName" className="form-label">First Name</label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.firstName ? 'error-input' : ''}`} {...registerPersonalInformation('firstName', { required: true })} placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                              {errorsPersonalInformation.firstName && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="lastName" className="form-label">Last Name</label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.lastName ? 'error-input' : ''}`} {...registerPersonalInformation('lastName', { required: true })} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                              {errorsPersonalInformation.lastName && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="email" className="form-label">Email</label>
                              <input type="email" className={`site-input ${errorsPersonalInformation.email ? 'error-input' : ''}`} {...registerPersonalInformation('email', { required: true })} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                              {errorsPersonalInformation.email && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">Date of Birth</label>
                              <input type="date" className={`site-input ${errorsPersonalInformation.dateOfBirth ? 'error-input' : ''}`} {...registerPersonalInformation('dateOfBirth', { required: true })} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder='Date of Birth' />
                              {errorsPersonalInformation.dateOfBirth && <p className="error-text">This field is required</p>}

                            </div>

                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">Gender <span className="text-danger">*</span></label>
                              <select className={`site-input ${errorsPersonalInformation.gender ? 'error-input' : ''}`} {...registerPersonalInformation('gender', { required: true })} value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                              {errorsPersonalInformation.gender && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">Father Name</label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.fatherName ? 'error-input' : ''}`} {...registerPersonalInformation('fatherName', { required: true })} value={fatherName} onChange={(e) => setFatherName(e.target.value)} placeholder='Father Name' />
                              {errorsPersonalInformation.fatherName && <p className="error-text">This field is required</p>}
                            </div>


                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">Mother Name</label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.motherName ? 'error-input' : ''}`} {...registerPersonalInformation('motherName', { required: true })} value={motherName} onChange={(e) => setMotherName(e.target.value)} placeholder='Mother Name' />
                              {errorsPersonalInformation.motherName && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">Disability</label>
                              <select className={`site-input ${errorsPersonalInformation.disability ? 'error-input' : ''}`} {...registerPersonalInformation('disability', { required: true })} value={disability} onChange={(e) => setDisability(e.target.value)}>
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                              {errorsPersonalInformation.disability && <p className="error-text">This field is required</p>}
                            </div>


                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">Religion</label>
                              <select className={`site-input ${errorsPersonalInformation.religion ? 'error-input' : ''}`} {...registerPersonalInformation('religion', { required: true })} value={religion} onChange={(e) => setReligion(e.target.value)}>
                                <option value="">Select</option>
                                <option value="muslim">Muslim</option>
                                <option value="christian">Christian</option>
                                <option value="others">Others</option>
                              </select>
                              {errorsPersonalInformation.religion && <p className="error-text">This field is required</p>}

                            </div>

                            <div className="col-12">
                              <label htmlFor="lastName" className="form-label">Diasbility Note </label>
                              <textarea rows={6} className={`site-input ${errorsPersonalInformation.disablityNote ? 'error-input' : ''}`} {...registerPersonalInformation('disablityNote')} value={disabilityNote} onChange={(e) => setDisabilityNote(e.target.value)} placeholder='...'></textarea>
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="" className="form-label">Passport</label>
                              <input type="file" className={`site-input ${errorsPersonalInformation.passport ? 'error-input' : ''}`} {...registerPersonalInformation('passport')} onChange={handleImgFile} />
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




      {showContactInformationModal && (
        <section className={` ${showContactInformationModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div>
                      <div className="d-flex justify-content-between pb-2">
                        <p className='font-size-20px '>Edit Contact Information</p>
                        <div onClick={handleCloseContactInformationModal} className='cursor-pointer'>
                          <i className="ri-close-line md-text"></i>
                        </div>
                      </div>


                      <div className='pt-4'>
                        <form onSubmit={handleSubmitContactInformation(onContactInformationSubmit)}>
                          <div className="row g-3">
                            <div className="col-md-12">
                              <label htmlFor="firstName" className="form-label">State Of Origin</label>
                              <input type="text" className={`site-input ${errorsContactInformation.stateOfOrigin ? 'error-input' : ''}`} {...registerContactInformation('stateOfOrigin', { required: true })} value={stateOfOrigin} onChange={(e) => setStateOfOrigin(e.target.value)} placeholder='State of Origin' />
                              {errorsContactInformation.stateOfOrigin && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">City / Town </label>
                              <input type="text" className={`site-input ${errorsContactInformation.cityOrTown ? 'error-input' : ''}`} {...registerContactInformation('cityOrTown', { required: true })} value={cityOrTown} onChange={(e) => setCityOrTown(e.target.value)} placeholder='City or Origin' />
                              {errorsContactInformation.cityOrTown && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">Home Address </label>
                              <input type="text" className={`site-input ${errorsContactInformation.homeAddress ? 'error-input' : ''}`} {...registerContactInformation('homeAddress', { required: true })} value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} placeholder='Home Address' />
                              {errorsContactInformation.homeAddress && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">Phone Number </label>
                              <input type="text" className={`site-input ${errorsContactInformation.phoneNumber ? 'error-input' : ''}`} {...registerContactInformation('phoneNumber', { required: true })} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Phone Number' />
                              {errorsContactInformation.phoneNumber && <p className="error-text">This field is required</p>}
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
        <div className="container-lg mb-5 pb-4">
          <section className='mt-4'>
            <div className="row g-4">
              <div className="col-12">
                {userData ? (
                  <div className="site-boxes border-radius-10px pt-4 pb-2 mt-4">
                    <div className="border-bottom1 pb-3 d-sm-flex justify-content-between align-items-center">
                      <div className="d-flex align-center ms-3">
                        <Image className='border-radius-50' src={userData.passport} alt="Logo" width={60} height={60} />
                        <div className='ms-3'>
                          <p className="font-size-20px">{formatName(userData.first_name)} {formatName(userData.last_name)}</p>
                          <p className="light-text sm-text">{userData.email}</p>
                        </div>
                      </div>

                      <div className="d-flex mx-3 pt-4">
                        <div className="me-3">
                          <button onClick={handleShowPersonalInformationModal} className='site-inverse-btn px-3'><i className="ri-edit-line"></i><span className="ms-2 d-none d-md-inline">Edit</span></button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="row  flex-wrap align-center">
                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <div>
                              <p className="light-text xsm-text">Student ID</p>
                              <p className='sm-text'>{userData.userID}</p>
                            </div>
                          </div>
                        </div>

                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <p className="light-text xsm-text">D.O.B</p>
                            <p className='sm-text'>{formatDate(userData.date_of_birth)}</p>
                          </div>
                        </div>


                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <p className="light-text xsm-text">Gender</p>
                            <p className='sm-text'>{formatName(userData.gender)}</p>
                          </div>
                        </div>

                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <p className="light-text xsm-text">Father Name</p>
                            <p className='sm-text'>{formatName(userData.father_name)}</p>
                          </div>
                        </div>

                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <p className="light-text xsm-text">Mother Name</p>
                            <p className='sm-text'>{formatName(userData.mother_name)}</p>
                          </div>
                        </div>

                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <p className="light-text xsm-text">Disability</p>
                            <p className='sm-text'>{formatName(userData.disability)}</p>
                          </div>
                        </div>


                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <p className="light-text xsm-text">Religion</p>
                            <p className='sm-text'>{formatName(userData.religion)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className='site-boxes border-radius-10px text-center pb-3 d-flex justify-content-center align-items-center  mt-4 pt-3'>
                    <div>
                      <Image src="/img/icon/thinking.png" alt="empty" width={70} height={70} />
                      <p className='light-text md-text'>No details available</p>
                      <p className="light-text">Student Personal details not avalaible. Check again later</p>
                    </div>

                  </div>
                )}

              </div>

              {userData ? (
                <div className="col-md-6">
                  <div className="site-boxes border-radius-10px">
                    <div className='p-3 border-bottom1 justify-content-between d-flex align-center'>
                      <p>School Information</p>


                    </div>

                    <div className='p-3'>
                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Account Username:</p>
                        <p>{formatName(userData.username)}</p>
                      </div>

                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Class:</p>
                        <p>{formatName(userData.student_class_name.name)}</p>
                      </div>

                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Admission Number:</p>
                        <p>{userData.admission_number}</p>
                      </div>


                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Account Status:</p>
                        <div className="d-flex">
                          <div>
                            <div className="d-flex align-center">
                              <div className={`${userData.account_status === 'active' ? 'site-successful-dot' : 'site-declined-dot'}`}></div>
                              <p className='ms-2'>{formatName(userData.account_status)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="col-md-6">
                  <div className="site-boxes border-radius-10px">
                    <div className='p-3 border-bottom1 justify-content-between d-flex align-center'>
                      <p>School Information</p>
                    </div>

                    <div className='d-flex justify-content-center text-center py-4 '>
                      <div className='py-2'>
                        <Image src="/img/icon/thinking.png" alt="empty" width={70} height={70} />
                        <p className='light-text md-text'>No details available</p>
                        <p className="light-text">Student Personal details not avalaible. Check again later</p>
                      </div>
                    </div>


                  </div>
                </div>
              )}



              {userData ? (
                <div className="col-md-6">
                  <div className="site-boxes border-radius-10px">
                    <div className='p-3 border-bottom1 justify-content-between d-flex align-center'>
                      <p>Contact Information</p>

                      <div>
                        <button onClick={handleShowContactInformationModal} className='site-inverse-btn px-3'><i className="ri-edit-line me-2"></i>Edit</button>
                      </div>
                    </div>

                    <div className='p-3'>
                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>State of Origin:</p>
                        <p>{formatName(userData.state_of_origin)}</p>
                      </div>

                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>City/town:</p>
                        <p>{formatName(userData.city_or_town)}</p>
                      </div>

                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Home Address:</p>
                        <p>{formatName(userData.home_address)}</p>
                      </div>


                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Phone Number:</p>
                        <p>{userData.phone_number}</p>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="col-md-6">
                  <div className="site-boxes border-radius-10px">
                    <div className='p-3 border-bottom1 justify-content-between d-flex align-center'>
                      <p>Contact Information</p>
                    </div>

                    <div className='d-flex justify-content-center text-center py-4 '>
                      <div className='py-2'>
                        <Image src="/img/icon/thinking.png" alt="empty" width={70} height={70} />
                        <p className='light-text md-text'>No details available</p>
                        <p className="light-text">Student Personal details not avalaible. Check again later</p>
                      </div>
                    </div>


                  </div>
                </div>
              )}

              {userData.disability_note && (
                <div className="col-12">
                  <div className="site-boxes  border-radius-10px">
                    <p className='p-3 border-bottom1'>Diability Note</p>
                    <p className="light-text p-3">{userData.disability_note}</p>
                  </div>
                </div>
              )}


              <div className="col-12">
                <div className="site-boxes border-radius-10px p-3">
                  <div className="d-flex justify-content-between">
                    <p className='pb-4'>School Fees Payment</p>

                  </div>

                  <div>

                    <div className="mb-4">
                      {schoolFeesPaymentLoader ? (
                        <div className="py-5 d-flex justify-content-center align-items-center">
                          <div className="site-content-loader"></div>
                        </div>

                      ) : (

                        <div>
                          <div className='light-text site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>
                            <table className='overflow-auto'>
                              <thead className='sm-text'>
                                <tr>

                                  <th className='py-2'>Transaction id</th>
                                  <th>Amount</th>
                                  <th>Payment Method</th>
                                  <th>Session/term</th>
                                  <th>Status</th>
                                  <th>Date</th>
                                  <th></th>
                                </tr>
                              </thead>

                              <tbody>
                                {currentSchoolFees.length > 0 ? (
                                  currentSchoolFees.map((data) => (
                                    <tr key={data.id}>

                                      <td className='py-3'>{data.transaction_id}</td>
                                      <td>{formatCurrency(data.fee_type_name.amount)} <span className="sm-text">NGN</span></td>
                                      <td>{formatName(data.payment_method_name.name)}</td>
                                      <td className='py-3'>
                                        {data.fee_type_name.session_name.name}
                                        <br />
                                        <span className='sm-text'>{formatName(data.fee_type_name.term_name.name)}</span>
                                      </td>
                                      <td><span className={` ${data.status === 'approved' && 'text-success'} ${data.status === 'declined' && 'text-danger'} ${data.status === 'pending' && 'text-warning'}  `}>{formatName(data.status)}</span></td>
                                      <td>{formatDate(data.date)}</td>
                                      <td>
                                        <Link href={`/student/school-fees-payment/individual/${data.id}/${data.transaction_id}`} className=" Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
                                          <i className="ri-eye-line"></i>
                                        </Link>
                                      </td>
                                    </tr>

                                  ))

                                ) : (
                                  <tr>
                                    <td className="py-4">No details available</td>
                                  </tr>
                                )}


                              </tbody>

                            </table>
                          </div>
                          {schoolFeesPaymentData.length > 5 && (
                            <div>
                              <div className="mt-4">
                                <Stack spacing={2} alignItems="end">
                                  <Pagination
                                    count={Math.ceil(schoolFeesPaymentData.length / itemsPerPage)}
                                    page={schoolFeesPage}
                                    onChange={handleSchoolFeesChange}
                                    sx={{
                                      '& .MuiPaginationItem-root': {
                                        color: '#737b7d', // color of all numbers
                                      },
                                      '& .MuiPaginationItem-root.Mui-selected': {
                                        backgroundColor: '#783ebc', // Your custom color
                                        color: '#fff',
                                      },
                                    }}
                                  />
                                </Stack>
                              </div>
                            </div>
                          )}
                        </div>

                      )}
                    </div>
                  </div>

                </div>
              </div>


              <div className="col-12">
                <div className="site-boxes border-radius-10px p-3">

                  <div className="d-flex justify-content-between">
                    <p className='pb-4'>Bills Payment</p>

                  </div>

                  <div>

                    <div className="mb-4">
                      {billsPaymentLoader ? (
                        <div className="py-5 d-flex justify-content-center align-items-center">
                          <div className="site-content-loader"></div>
                        </div>

                      ) : (

                        <div>
                          <div className='light-text site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>
                            <table className='overflow-auto'>
                              <thead className='sm-text'>
                                <tr>

                                  <th className='py-2'>Transaction id</th>
                                  <th>Amount</th>
                                  <th>Payment Method</th>
                                  <th>Bill Type</th>
                                  <th>Status</th>
                                  <th>Date</th>
                                  <th></th>
                                </tr>
                              </thead>

                              <tbody>
                                {currentBills.length > 0 ? (
                                  currentBills.map((data) => (
                                    <tr key={data.id}>

                                      <td className='py-3'>{data.transaction_id}</td>
                                      <td>{formatCurrency(data.bill_name.amount)} <span className="sm-text">NGN</span></td>
                                      <td>{formatName(data.payment_method_name.name)}</td>
                                      <td>{truncateText(data.bill_name.bill_name, 2)}</td>
                                      <td><span className={` ${data.status === 'approved' && 'text-success'} ${data.status === 'declined' && 'text-danger'} ${data.status === 'pending' && 'text-warning'}  `}>{formatName(data.status)}</span></td>
                                      <td>{formatDate(data.date)}</td>
                                      <td>
                                        <Link href={`/student/bills-payment/individual/${data.id}/${data.transaction_id}`} className=" Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
                                          <i className="ri-eye-line"></i>
                                        </Link>
                                      </td>
                                    </tr>

                                  ))

                                ) : (
                                  <tr>
                                    <td className="py-4">No details available</td>
                                  </tr>
                                )}


                              </tbody>

                            </table>
                          </div>
                          {billsPaymentData.length > 5 && (
                            <div>
                              <div className="mt-4">
                                <Stack spacing={2} alignItems="end">
                                  <Pagination
                                    count={Math.ceil(billsPaymentData.length / itemsPerPageBills)}
                                    page={billsPage}
                                    onChange={handleBillsChange}
                                    sx={{
                                      '& .MuiPaginationItem-root': {
                                        color: '#737b7d', // color of all numbers
                                      },
                                      '& .MuiPaginationItem-root.Mui-selected': {
                                        backgroundColor: '#783ebc', // Your custom color
                                        color: '#fff',
                                      },
                                    }}
                                  />
                                </Stack>
                              </div>
                            </div>
                          )}
                        </div>

                      )}
                    </div>
                  </div>

                </div>
              </div>



            </div>
          </section>
        </div>

      )}


    </div>
  )
}

export default IndivivdualStudent

