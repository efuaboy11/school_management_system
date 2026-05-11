"use client"
import React, { use, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import AuthContext from '@/context/AuthContext'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import AllDataContext from '@/context/AllData'

import Link from 'next/link'
import { useDropzone } from 'react-dropzone'


const IndivivdualStaff = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const [showPersonalInformationModal, setShowPersonalInformationModal] = useState(false);
  const [showSchoolInformationModal, setShowSchoolInformationModal] = useState(false);
  const [showContactInformationModal, setShowContactInformationModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [userData, setUserData] = useState<any>(null)
  const [userDeleteModal, setUserDeleteModal] = useState(false)


  const router = useRouter();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [maritalStatus, setMaritialStatus] = useState('')
  const [department, setDepartment] = useState('')
  const [employmentStatus, setEmploymentStatus] = useState('')
  const [disability, setDisability] = useState('')
  const [disabilityNote, setDisabilityNote] = useState('')
  const [religion, setReligion] = useState('')
  const [stateOfOrigin, setStateOfOrigin] = useState('')
  const [cityOrTown, setCityOrTown] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [computerSkills, setComputerSkills] = useState('')

  const [passport, setPassport] = useState<File | null>(null)
  const [studentClass, setStudentClass] = useState('')

  const [Loading, setLoading] = useState(true)

  const {
    authTokens,

    formatDate,
    formatName,


    loader,
    setLoader,
    disableButton,
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

  const handleCloseStudentInformationModal = () => {
    setShowSchoolInformationModal(false);
  }

  const handleShowStudentInformationModal = () => {
    setShowSchoolInformationModal(true);
  }


  const handleCloseContactInformationModal = () => {
    setShowContactInformationModal(false);
  }

  const handleShowContactInformationModal = () => {
    setShowContactInformationModal(true);
  }

  const handleShowUserDeleteModal = () => {
    setUserDeleteModal(true)
  }

  const handleCloseUserDeleteModal = () => {
    setUserDeleteModal(false)
  }





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
      const response = await fetch(`https://school.amanilightequity.com/api/staff/${id}/`, {
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
        setGender(data?.gender || '')
        setDateOfBirth(data?.date_of_birth?.split('T')[0] || '');
        setMaritialStatus(data?.maritial_status || '')
        setDepartment(data?.department || '')
        setDisability(data?.disability || '')
        setDisabilityNote(data?.disability_note || '')
        setReligion(data?.religion || '')
        setStateOfOrigin(data?.state_of_origin || '')
        setCityOrTown(data?.city_or_town || '')
        setHomeAddress(data?.home_address || '')
        setYearsOfExperience(data?.years_of_experience || '')
        setStudentClass(data?.assigned_class || '')
        setComputerSkills(data?.computer_skills)
        setEmploymentStatus(data?.employment_type)

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
      const response = await fetch(`https://school.amanilightequity.com/api/staff/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        router.push('/hr/staffs/all')
        setUserDeleteModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Staff  deleted')
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


  useEffect(() => {
    if (showSchoolInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showSchoolInformationModal]);


  useEffect(() => {
    if (showContactInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showContactInformationModal]);



  useEffect(() => {
    if (userDeleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [userDeleteModal]);


  const {
    register: registerPersonalInformation,
    handleSubmit: handleSubmitPersonalInformation,
    formState: { errors: errorsPersonalInformation, },
  } = useForm<any>();


  const {
    register: registerSchoolInformation,
    handleSubmit: handleSubmitSchoolInformation,
    formState: { errors: errorsSchoolInformation, },
  } = useForm<any>();

  const {
    register: registerContactInformation,
    handleSubmit: handleSubmitContactInformation,
    formState: { errors: errorsContactInformation },
  } = useForm<any>();


  const onPersonalInformationSubmit = (data: any, e: any) => {
    EditPersonalInformation(e)

  }

  const onSchoolInformationSubmit = (data: any, e: any) => {
    EditSchoolInformation(e)

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
    formData.append('gender', gender)
    formData.append('maritial_status', maritalStatus)
    formData.append('years_of_experience', yearsOfExperience)
    formData.append('disability', disability)
    formData.append('disability_note', disabilityNote)
    formData.append('religion', religion)
    if (passport) {
      formData.append('passport', passport);
    }


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/staff/${id}/`, {
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

  const EditSchoolInformation = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('assigned_class', studentClass)
    formData.append('employment_type', employmentStatus)
    formData.append('department', department)
    formData.append('computer_skills', computerSkills)



    try {
      const response = await fetch(`https://school.amanilightequity.com/api/staff/${id}/`, {
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
        setShowSchoolInformationModal(false)
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
      const response = await fetch(`https://school.amanilightequity.com/api/staff/${id}/`, {
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
                              <label htmlFor="phoneNumber" className="form-label">Marital status</label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.maritalStatus ? 'error-input' : ''}`} {...registerPersonalInformation('maritalStatus', { required: true })} value={maritalStatus} onChange={(e) => setMaritialStatus(e.target.value)} placeholder='Marital status' />
                              {errorsPersonalInformation.maritalStatus && <p className="error-text">This field is required</p>}
                            </div>


                            <div className="col-md-6">
                              <label htmlFor="phoneNumber" className="form-label">Years Of experience</label>
                              <input type="text" className={`site-input ${errorsPersonalInformation.yearsOfExperience ? 'error-input' : ''}`} {...registerPersonalInformation('yearsOfExperience', { required: true })} value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} placeholder='Years of Experience' />
                              {errorsPersonalInformation.yearsOfExperience && <p className="error-text">This field is required</p>}
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


      {showSchoolInformationModal && (
        <section className={` ${showSchoolInformationModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div>
                      <div className="d-flex justify-content-between pb-2">
                        <p className='font-size-20px '>Edit School Profile</p>
                        <div onClick={handleCloseStudentInformationModal} className='cursor-pointer'>
                          <i className="ri-close-line md-text"></i>
                        </div>
                      </div>


                      <div className='pt-4'>
                        <form onSubmit={handleSubmitSchoolInformation(onSchoolInformationSubmit)}>
                          <div className="row g-3">
                            <div className="col-md-12">
                              <label htmlFor="firstName" className="form-label">Assigned Class</label>
                              <select className={`site-input ${errorsSchoolInformation.studentClass ? 'error-input' : ''}`} {...registerSchoolInformation('studentClass', { required: true })} value={studentClass} onChange={(e) => setStudentClass(e.target.value)}>
                                <option value="">Select</option>
                                {studentClassData.map((data: any) => (
                                  <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                              </select>
                              {/* <input type="text" className={`site-input ${errorsSchoolInformation.studentClass ? 'error-input' : ''}`} {...registerSchoolInformation('studentClass', {required: true})}  value={studentClass}  onChange={(e) => setStudentClass(e.target.value)}  placeholder='Class' />
                                {errorsSchoolInformation.studentClass && <p className="error-text">This field is required</p>} */}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="employmentStatus" className="form-label">Employment Status </label>
                              <select className={`site-input ${errorsSchoolInformation.employmentStatus ? 'error-input' : ''}`} {...registerSchoolInformation('employmentStatus', { required: true })} value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)}>
                                <option value="">Select</option>
                                <option value="full_time">Full Time</option>
                                <option value="part_time">Part Time</option>
                              </select>
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="computerSkill" className="form-label">Computer Skills</label>
                              <select className={`site-input ${errorsPersonalInformation.religion ? 'error-input' : ''}`} {...registerPersonalInformation('computerSkills', { required: true })} value={computerSkills} onChange={(e) => setComputerSkills(e.target.value)}>
                                <option value="">Select</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                              </select>
                              {errorsPersonalInformation.computerSkills && <p className="error-text">This field is required</p>}

                            </div>

                            <div className="col-md-12">
                              <label htmlFor="employmentStatus" className="form-label">Department </label>
                              <input type="text" className={`site-input ${errorsSchoolInformation.department ? 'error-input' : ''}`} {...registerSchoolInformation('department', { required: true })} value={department} onChange={(e) => setDepartment(e.target.value)} placeholder='Department' />
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



      {userDeleteModal && (
        <section className={` ${userDeleteModal ? 'overlay-background' : ''}`}>
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
                          <button onClick={handleCloseUserDeleteModal} className="site-btn site-cancel-btn px-3 width-100"><i className="ri-close-circle-line pe-2"></i>Cancel</button>
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

                        <div className="me-3">
                          <button onClick={handleShowUserDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line "></i><span className="ms-2 d-none d-md-inline">Delete</span></button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="row  flex-wrap align-center">
                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <div>
                              <p className="light-text xsm-text">Teacher ID</p>
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
                            <p className="light-text xsm-text">Years of Experience</p>
                            <p className='sm-text'>{userData.years_of_experience}</p>
                          </div>
                        </div>

                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <p className="light-text xsm-text">Maritial status</p>
                            <p className='sm-text'>{formatName(userData.maritial_status)}</p>
                          </div>
                        </div>

                        <div className='col-sm-3  col-lg-2 mb-3'>
                          <div>
                            <p className="light-text xsm-text">Religion</p>
                            <p className='sm-text'>{formatName(userData.religion)}</p>
                          </div>
                        </div>

                        <div className='col-sm-3  col-lg-1 mb-3'>
                          <div>
                            <p className="light-text xsm-text">Disability</p>
                            <p className='sm-text'>{formatName(userData.disability)}</p>
                          </div>
                        </div>

                        <div className='col-sm-3  col-lg-1 mb-3'>
                          <div>
                            <p className="light-text xsm-text">Gender</p>
                            <p className='sm-text'>{formatName(userData.gender)}</p>
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
                      <p className="light-text">User Personal details not avalaible. Check again later</p>
                    </div>

                  </div>
                )}

              </div>

              {userData ? (
                <div className="col-md-6">
                  <div className="site-boxes border-radius-10px">
                    <div className='p-3 border-bottom1 justify-content-between d-flex align-center'>
                      <p>School Information</p>

                      <div>
                        <button onClick={handleShowStudentInformationModal} className='site-inverse-btn px-3'><i className="ri-edit-line me-2"></i>Edit</button>
                      </div>
                    </div>

                    <div className='p-3'>

                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Class Assigned:</p>
                        <p>{formatName(userData.assigend_class_name.name || 'not assigned')}</p>
                      </div>

                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Employment Status:</p>
                        <p>{userData.employment_type}</p>
                      </div>

                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Department:</p>
                        <p>{userData.department}</p>
                      </div>


                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Computer Skills:</p>
                        <p>{formatName(userData.computer_skills)}</p>
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
                        <p className="light-text">User Personal details not avalaible. Check again later</p>
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

                      <div className="d-flex justify-content-between light-text mb-3">
                        <p>Date Joined:</p>
                        <p>{formatDate(userData.date_joined)}</p>
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
                        <p className="light-text">User Personal details not avalaible. Check again later</p>
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
                  <p className='pb-4'>Staff Qualififcatons</p>
                  <div className="row g-4 light-text">
                    <div className="col-md-3 col-sm-6">
                      <div>
                        <p className="sm-text pb-1 ">First leaving schoool cert</p>
                        <div className='site-border border-radius-10px'>
                          <Link target="_blank" rel="noopener noreferrer" href={`${userData.flsc ? userData.flsc : ''}`} className="Link  p-4 text-center">
                            {userData.flsc ? (
                              <p className="light-text">View cert.</p>
                            ) : (
                              <p className="light-text">No cert avaliable</p>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div>
                        <p className="sm-text pb-1">Secondary schoool cert</p>
                        <div className='site-border border-radius-10px'>
                          <Link target="_blank" rel="noopener noreferrer" href={`${userData.waec_neco_nabteb_gce ? userData.waec_neco_nabteb_gce : ''}`} className="Link  p-4 text-center">
                            {userData.waec_neco_nabteb_gce ? (
                              <p className="light-text">View cert.</p>
                            ) : (
                              <p className="light-text">No cert avaliable</p>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div>
                        <p className="sm-text pb-1">Bsc / dipolma degree</p>
                        <div className='site-border border-radius-10px'>
                          <Link target="_blank" rel="noopener noreferrer" href={`${userData.waec_neco_nabteb_gce ? userData.waec_neco_nabteb_gce : ''}`} className="Link  p-4 text-center">
                            {userData.degree ? (
                              <p className="light-text">View cert.</p>
                            ) : (
                              <p className="light-text">No cert avaliable</p>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>


                    <div className="col-md-3 col-sm-6">
                      <div>
                        <p className="sm-text pb-1">CV</p>
                        <div className='site-border border-radius-10px'>
                          <Link target="_blank" rel="noopener noreferrer" href={`${userData.cv ? userData.cv : ''}`} className="Link  p-4 text-center">
                            {userData.degree ? (
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

export default IndivivdualStaff

