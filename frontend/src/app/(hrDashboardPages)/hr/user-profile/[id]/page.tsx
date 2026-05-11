"use client"
import React, { use, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import AuthContext from '@/context/AuthContext'
import { useForm } from 'react-hook-form'

import AllDataContext from '@/context/AllData'

import Link from 'next/link'
import { useDropzone } from 'react-dropzone'


const IndivivdualHr = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const [showPersonalInformationModal, setShowPersonalInformationModal] = useState(false);


  const [animateModal, setAnimateModal] = useState(false);
  const [userData, setUserData] = useState<any>(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [officeLocation, setOfficeLocation] = useState('')
  const [disability, setDisability] = useState('')
  const [disabilityNote, setDisabilityNote] = useState('')
  const [religion, setReligion] = useState('')
  const [stateOfOrigin, setStateOfOrigin] = useState('')
  const [cityOrTown, setCityOrTown] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [passport, setPassport] = useState<File | null>(null)

  const [Loading, setLoading] = useState(true)

  const {
    authTokens,

    formatDate,
    formatName,


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




  const handleClosePersonalInformationModal = () => {
    setShowPersonalInformationModal(false);
  };
  const handleShowPersonalInformationModal = () => {
    setShowPersonalInformationModal(true);
  };



  const handleImgFile = (files: File[]) => {
    if (files.length > 0) {
      setPassport(files[0]);
    } else {
      setPassport(null);
    }
  };


  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImgFile,
    accept: {
      'image/*': []
    }
  });


  const IndividualUserDataFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/hr/${id}/`, {
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
        setGender(data?.gender || '')
        setOfficeLocation(data?.office_location || '')
        setDisability(data?.disability || '')
        setDisabilityNote(data?.disability_note)
        setReligion(data?.religion || '')
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




  useEffect(() => {
    IndividualUserDataFunction()
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


  const {
    register: registerPersonalInformation,
    handleSubmit: handleSubmitPersonalInformation,
    formState: { errors: errorsPersonalInformation, },
  } = useForm<any>();





  const onPersonalInformationSubmit = (data: any, e: any) => {
    EditPersonalInformation(e)

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
    formData.append('gender', gender)
    formData.append('maritial_status', officeLocation)
    formData.append('disability', disability)
    formData.append('disability_note', disabilityNote)
    formData.append('religion', religion)
    if (passport) {
      formData.append('passport', passport);
    }


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/hr/${id}/`, {
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
                              <label htmlFor="phoneNumber" className="form-label">Marital status</label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.officeLocation ? 'error-input' : ''}`} {...registerPersonalInformation('officeLocation', { required: true })} value={officeLocation} onChange={(e) => setOfficeLocation(e.target.value)} placeholder='Marital status' />
                              {errorsPersonalInformation.officeLocation && <p className="error-text">This field is required</p>}
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

                            <div className="col-md-6">
                              <label htmlFor="firstName" className="form-label">State Of Origin</label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.stateOfOrigin ? 'error-input' : ''}`} {...registerPersonalInformation('stateOfOrigin', { required: true })} value={stateOfOrigin} onChange={(e) => setStateOfOrigin(e.target.value)} placeholder='State of Origin' />
                              {errorsPersonalInformation.stateOfOrigin && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="lastName" className="form-label">City / Town </label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.cityOrTown ? 'error-input' : ''}`} {...registerPersonalInformation('cityOrTown', { required: true })} value={cityOrTown} onChange={(e) => setCityOrTown(e.target.value)} placeholder='City or Origin' />
                              {errorsPersonalInformation.cityOrTown && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="lastName" className="form-label">Home Address </label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.homeAddress ? 'error-input' : ''}`} {...registerPersonalInformation('homeAddress', { required: true })} value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} placeholder='Home Address' />
                              {errorsPersonalInformation.homeAddress && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="lastName" className="form-label">Phone Number </label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.phoneNumber ? 'error-input' : ''}`} {...registerPersonalInformation('phoneNumber', { required: true })} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Phone Number' />
                              {errorsPersonalInformation.phoneNumber && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-12">
                              <label htmlFor="lastName" className="form-label">Diasbility Note </label>
                              <textarea rows={6} className={`site-input`} {...registerPersonalInformation('disablityNote')} value={disabilityNote} onChange={(e) => setDisabilityNote(e.target.value)} placeholder='...'></textarea>

                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Passport <span className="text-danger">*</span></label>

                              <div {...getRootProps({ className: 'dropzone-box' })}>
                                <input {...getInputProps()} />

                                {passport ? (
                                  <div className="preview-box">
                                    <img
                                      src={URL.createObjectURL(passport)}
                                      alt="Selected Passport"
                                      className="preview-image"
                                    />
                                    <p className="file-name">{passport.name}</p>
                                  </div>
                                ) : (
                                  <p className="m-0">Drag & drop passport here, or click to select file</p>
                                )}
                              </div>

                              {errorsPersonalInformation.passport && <p className="error-text">Passport is required</p>}
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

                    <div className="p-3 light-text">
                      <div className="row g-4  flex-wrap align-center">
                        <div className='col-md-6'>
                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">User ID:</p>
                            <p>{userData.userID}</p>
                          </div>


                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">Username:</p>
                            <p>{formatName(userData.username)}</p>
                          </div>


                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">DOB:</p>
                            <p>{formatDate(userData.date_of_birth)}</p>
                          </div>


                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">Religion:</p>
                            <p>{formatName(userData.religion)}</p>
                          </div>

                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">Disability:</p>
                            <p>{formatName(userData.disability)}</p>
                          </div>

                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">Gender:</p>
                            <p>{formatName(userData.gender)}</p>
                          </div>



                        </div>


                        <div className='col-md-6'>

                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">State of Origin:</p>
                            <p>{formatName(userData.state_of_origin)}</p>
                          </div>


                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">City / Town:</p>
                            <p>{formatName(userData.city_or_town)}</p>
                          </div>


                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">Home Address:</p>
                            <p>{formatName(userData.home_address)}</p>
                          </div>

                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">Phone Number:</p>
                            <p>{formatName(userData.phone_number)}</p>
                          </div>


                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">Date joined:</p>
                            <p>{formatDate(userData.date_joined)}</p>
                          </div>

                          <div className="pb-3 d-sm-flex justify-content-between">
                            <p className="pb-2 sm-text">Department:</p>
                            <p>{formatName(userData.role)}</p>
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
                      <p className="light-text">Hr Personal details not avalaible. Check again later</p>
                    </div>

                  </div>
                )}

              </div>

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
                  <p className='pb-4'>Hr Qualififcatons</p>
                  <div className="row g-4 light-text">
                    <div className="col-md-3 col-sm-6">
                      <div>
                        <p className="sm-text pb-1 ">Qualification</p>
                        <div className='site-border border-radius-10px'>
                          <Link target="_blank" rel="noopener noreferrer" href={`${userData.qualification ? userData.qualification : ''}`} className="Link  p-4 text-center">
                            {userData.qualification ? (
                              <p className="light-text">View cert.</p>
                            ) : (
                              <p className="light-text">No cert avaliable</p>
                            )}
                          </Link>
                        </div>
                      </div>
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

export default IndivivdualHr

