"use client"

import React, { useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import AllDataContext from '@/context/AllData';
import AuthContext from '@/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../../../../../../css/authCss/auth.css"

import { useDropzone } from 'react-dropzone';


const AddTeacher = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [maritalStatus, setMartialStatus] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [employmentStatus, setEmploymentStatus] = useState('')
  const [department, setDepartment] = useState('')
  const [computerSkills, setComputerSkills] = useState('')
  const [role, setRole] = useState('')
  const [stateOfOrigin, setStateOfOrigin] = useState('')
  const [religion, setReligion] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [disability, setDisability] = useState('')
  const [disabilityNote, setDisabilityNote] = useState('')
  const [cityOrTown, setCityOrTown] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [firstLeavingSchoolCert, setFirstLeavingSchoolCert] = useState<File | null>(null)
  const [secondarySchoolCert, setSecondarySchoolCert] = useState<File | null>(null)
  const [degreeCert, setDegreeCert] = useState<File | null>(null)
  const [CV, setCV] = useState<File | null>(null)
  const [passport, setPassport] = useState<File | null>(null)



  const [showPassword, setShowPassword] = useState(false)


  const toogleShowPassword = () => {
    setShowPassword(!showPassword)
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const {
    StudentClassFunction,
    studentClassData
  } = useContext(AllDataContext)!;

  const {
    username,
    password,
    setUsername,
    setPassword,

    usernameValidation,
    passwordValidation,
    handlePasswordChange,
    handleUsernameChange,


    authTokens,




    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,




  } = useContext(AuthContext)!

  useEffect(() => {
    StudentClassFunction()

  }, [])

  const handleflsc = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setFirstLeavingSchoolCert(file);
    } else {
      setFirstLeavingSchoolCert(null);
    }
  };

  const handleSsce = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSecondarySchoolCert(file);
    } else {
      setSecondarySchoolCert(null);
    }
  };

  const handleDegree = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setDegreeCert(file);
    } else {
      setDegreeCert(null);
    }
  };

  const handleCV = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setCV(file);
    } else {
      setCV(null);
    }
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

  const onSubmit = (data: FormData, e: any) => {
    addTeacher(e)
  }


  const addTeacher = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('email', email)
    formData.append('date_of_birth', dateOfBirth)
    formData.append('gender', gender)
    formData.append('maritial_status', maritalStatus)
    formData.append('years_of_experience', yearsOfExperience)
    formData.append('home_address', homeAddress)
    formData.append('employment_type', employmentStatus)
    formData.append('department', department)
    formData.append('computer_skills', computerSkills)
    formData.append('state_of_origin', stateOfOrigin)
    formData.append('religion', religion)
    formData.append('phone_number', phoneNumber)
    formData.append('disability', disability)
    formData.append('disability_note', disabilityNote)
    formData.append('city_or_town', cityOrTown)
    formData.append('student_class', studentClass)
    if (passport) {
      formData.append('passport', passport as any)
    }

    if (firstLeavingSchoolCert) {
      formData.append('flsc', firstLeavingSchoolCert as any)
    }

    if (secondarySchoolCert) {
      formData.append('waec_neco_nabteb_gce', secondarySchoolCert as any)
    }

    if (degreeCert) {
      formData.append('degree', degreeCert as any)
    }

    if (CV) {
      formData.append('cv', CV as any)
    }
    formData.append('username', username)
    formData.append('password', password)
    formData.append('role', role)





    try {
      const response = await fetch(`https://school.amanilightequity.com/api/staff/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Staff added successfully')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setFirstName('')
        setLastName('')
        setDateOfBirth('')
        setEmail('')
        setMartialStatus('')
        setYearsOfExperience('')
        setHomeAddress('')
        setEmploymentStatus('')
        setDepartment('')
        setComputerSkills('')
        setStateOfOrigin('')
        setReligion('')
        setPhoneNumber('')
        setDisability('')
        setDisabilityNote('')
        setCityOrTown('')
        setStudentClass('')
        setPassport(null)
        setFirstLeavingSchoolCert(null)
        setSecondarySchoolCert(null)
        setDegreeCert(null)
        setCV(null)
        setUsername('')
        setPassword('')



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
      <div className="container-lg mb-5 pb-5">
        <div className="d-flex justify-content-center mb-5 mt-5">
          <div className='text-center'>
            <p className="md-text">Add Staff</p>
            <p className="light-text">Please ensure that all the required fields are filled</p>
            <p className="light-text xsm-text italic-text">Note: upon registering a staff it will refelect to the staff database. <br /> Navigate to view all hr to confirm</p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="site-boxes py-4 border-radius-5px">
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className='border-bottom1 px-4 mb-4'>
                  <p className="stylish-text pb-3">1. Personal Information</p>
                </div>

                <div className="row g-4 px-4">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.firstName ? 'error-input' : ''}`} {...register('firstName', { required: true })} placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    {errors.firstName && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.lastName ? 'error-input' : ''}`} {...register('lastName', { required: true })} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                    {errors.lastName && <p className="error-text">This field is required</p>}
                  </div>


                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                    <input type="email" className={`site-input ${errors.email ? 'error-input' : ''}`} {...register('email', { required: true })} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    {errors.email && <p className="error-text">This field is required</p>}
                  </div>


                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                    <input type="date" className={`site-input ${errors.dateOfBirth ? 'error-input' : ''}`} {...register('dateOfBirth', { required: true })} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder='Date of Birth' />
                    {errors.dateOfBirth && <p className="error-text">This field is required</p>}

                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Gender <span className="text-danger">*</span></label>
                    <select className={`site-input ${errors.gender ? 'error-input' : ''}`} {...register('gender', { required: true })} value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Marital Status <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.maritalStatus ? 'error-input' : ''}`} {...register('maritalStatus', { required: true })} value={maritalStatus} onChange={(e) => setMartialStatus(e.target.value)} placeholder='Marital status' />
                    {errors.maritalStatus && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Years of Experience <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.yearsOfExperience ? 'error-input' : ''}`} {...register('yearsOfExperience', { required: true })} value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} placeholder='Years of Experience' />
                    {errors.yearsOfExperience && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Disability <span className="text-danger">*</span></label>
                    <select className={`site-input ${errors.disability ? 'error-input' : ''}`} {...register('disability', { required: true })} value={disability} onChange={(e) => setDisability(e.target.value)}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.disability && <p className="error-text">This field is required</p>}
                  </div>



                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Religion <span className="text-danger">*</span></label>
                    <select className={`site-input ${errors.religion ? 'error-input' : ''}`} {...register('religion', { required: true })} value={religion} onChange={(e) => setReligion(e.target.value)}>
                      <option value="">Select</option>
                      <option value="muslim">Muslim</option>
                      <option value="christian">Christian</option>
                      <option value="others">Others</option>
                    </select>
                    {errors.religion && <p className="error-text">This field is required</p>}

                  </div>

                  <div className="col-12">
                    <label htmlFor="" className='form-label'>Disability Note</label>
                    <textarea rows={6} className={`site-input ${errors.disabilityNote ? 'error-input' : ''}`} {...register('disabilityNote')} value={disabilityNote} onChange={(e) => setDisabilityNote(e.target.value)} placeholder='Disability Note' />
                  </div>


                  {/* <div className="col-md-3">
                    <label htmlFor="passport-upload" className="form-label">First leaving school cert</label>
                    
                    <input
                      type="file"
                      id="passport-upload"
                      {...register('passport')}
                      onChange={handleflsc}
                      className="d-none"
                    />

                    <label htmlFor="passport-upload" className="dropzone-box">
                      {
                        firstLeavingSchoolCert ? (
                          <p>{firstLeavingSchoolCert.name}</p>
                        ) : (
                          <p>Drag & drop passport here, or click to select file</p>
                        )
                      }
                    </label>
                  </div> */}

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

                    {errors.passport && <p className="error-text">Passport is required</p>}
                  </div>

                </div>

                <div className='border-y px-4 mb-4 mt-5'>
                  <p className="stylish-text py-3">2. School Information</p>
                </div>

                <div className="row g-4 px-4">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label"> Class Assigned</label>
                    <select className={`site-input ${errors.studentClass ? 'error-input' : ''}`} {...register('studentClass')} value={studentClass} onChange={(e) => setStudentClass(e.target.value)}>
                      <option value="">Select</option>
                      {studentClassData.map((data: any) => (
                        <option key={data.id} value={data.id}>{data.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Employment Status  <span className="text-danger">*</span></label>
                    <select className={`site-input ${errors.employmentStatus ? 'error-input' : ''}`} {...register('employmentStatus', { required: true })} value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)}>
                      <option value="">Select</option>
                      <option value="full_time">Full Time</option>
                      <option value="part_time">Part time</option>
                    </select>
                    {errors.employmentStatus && <p className="error-text">This field is required</p>}
                  </div>


                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Department <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.cityOrTown ? 'error-input' : ''}`} {...register('department', { required: true })} value={department} onChange={(e) => setDepartment(e.target.value)} placeholder='City or Origin' />
                    {errors.department && <p className="error-text">This field is required</p>}
                  </div>



                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Computer Skills <span className="text-danger">*</span></label>
                    <select className={`site-input ${errors.computerSkills ? 'error-input' : ''}`} {...register('computerSkills', { required: true })} value={computerSkills} onChange={(e) => setComputerSkills(e.target.value)}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.computerSkills && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Role <span className="text-danger">*</span></label>
                    <select className={`site-input ${errors.role ? 'error-input' : ''}`} {...register('role', { required: true })} value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="">Select</option>
                      <option value="teacher">Teacher</option>
                      <option value="bursary">Bursary</option>
                      <option value="store_keeper">Store Keeper</option>
                      <option value="result_officer">Result officer</option>
                      <option value="academic_officer">Academic Officer</option>
                      <option value="other_staff">Other Staff</option>
                    </select>
                    {errors.role && <p className="error-text">This field is required</p>}
                  </div>


                </div>


                <div className='border-y px-4 mb-4 mt-5'>
                  <p className="stylish-text py-3">3. Contact Information</p>
                </div>


                <div className="row g-4 px-4">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">State Of Origin <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.stateOfOrigin ? 'error-input' : ''}`} {...register('stateOfOrigin', { required: true })} value={stateOfOrigin} onChange={(e) => setStateOfOrigin(e.target.value)} placeholder='State of Origin' />
                    {errors.stateOfOrigin && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">City / Town  <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.cityOrTown ? 'error-input' : ''}`} {...register('cityOrTown', { required: true })} value={cityOrTown} onChange={(e) => setCityOrTown(e.target.value)} placeholder='City or Origin' />
                    {errors.cityOrTown && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Home Address  <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.homeAddress ? 'error-input' : ''}`} {...register('homeAddress', { required: true })} value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} placeholder='Home Address' />
                    {errors.homeAddress && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Phone Number  <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.phoneNumber ? 'error-input' : ''}`} {...register('phoneNumber', { required: true })} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Phone Number' />
                    {errors.phoneNumber && <p className="error-text">This field is required</p>}
                  </div>


                </div>

                <div className='border-y px-4 mb-4 mt-5'>
                  <p className="stylish-text py-3">6. Qualififcations</p>
                </div>

                <div className="row g-4 px-4">
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="flsc-upload" className="form-label">First leaving school cert</label>

                    <input
                      type="file"
                      id="flsc-upload"
                      {...register('passport')}
                      onChange={handleflsc}
                      className="d-none"
                    />

                    <label htmlFor="flsc-upload" className="dropzone-box">
                      {
                        firstLeavingSchoolCert ? (
                          <p>{firstLeavingSchoolCert.name}</p>
                        ) : (
                          <p> click to select file</p>
                        )
                      }
                    </label>
                  </div>


                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="ssce-upload" className="form-label">Secondary school cert</label>

                    <input
                      type="file"
                      id="ssce-upload"
                      {...register('passport')}
                      onChange={handleSsce}
                      className="d-none"
                    />

                    <label htmlFor="ssce-upload" className="dropzone-box">
                      {
                        secondarySchoolCert ? (
                          <p>{secondarySchoolCert.name}</p>
                        ) : (
                          <p> click to select file</p>
                        )
                      }
                    </label>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="degree-upload" className="form-label">Secondary school cert</label>

                    <input
                      type="file"
                      id="degree-upload"
                      {...register('passport')}
                      onChange={handleDegree}
                      className="d-none"
                    />

                    <label htmlFor="degree-upload" className="dropzone-box">
                      {
                        degreeCert ? (
                          <p>{degreeCert.name}</p>
                        ) : (
                          <p> click to select file</p>
                        )
                      }
                    </label>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="cv" className="form-label">CV</label>

                    <input
                      type="file"
                      id="cv"
                      {...register('passport')}
                      onChange={handleCV}
                      className="d-none"
                    />

                    <label htmlFor="cv" className="dropzone-box">
                      {
                        CV ? (
                          <p>{CV.name}</p>
                        ) : (
                          <p> click to select file</p>
                        )
                      }
                    </label>
                  </div>
                </div>

                <div className='border-y px-4 mb-4 mt-5'>
                  <p className="stylish-text py-3">5. Account Information </p>
                </div>

                <div className="row g-4 px-4">
                  <div className="col-md-6">
                    <label className="form-label">Username <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`${errors.username ? 'error-input' : ''} site-input`}
                      {...register("username", {
                        required: "Username is required",
                        minLength: {
                          value: 8,
                          message: "Username must be at least 8 characters"
                        },
                        pattern: {
                          value: /^(?=.*[A-Z]).{8,}$/,
                          message: "Username must contain at least one uppercase letter"
                        }
                      })}
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Enter your username"
                    />
                    {username && (
                      <div>
                        <div>
                          <div className="d-flex">
                            <i className={usernameValidation.minLength ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                            <p className={`pt-1 ps-3 xsm-text ${usernameValidation.minLength ? 'success-text' : 'error-text'}`}>
                              Username must be at least 8 characters
                            </p>
                          </div>

                          <div className="d-flex">
                            <i className={usernameValidation.hasUppercase ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                            <p className={`pt-1 ps-3 xsm-text ${usernameValidation.hasUppercase ? 'success-text' : 'error-text'}`}>
                              Username must contain at least one uppercase letter
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                    }
                    {errors.username && <p className="error-text xsm-text">{String(errors.username.message)}</p>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Password <span className="text-danger">*</span></label>
                    <div className="password-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`site-input password-input ${errors.password ? 'error-input' : ''}`}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                          },
                          pattern: {
                            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                            message: "Password must contain at least one uppercase letter and one special character"
                          }
                        })}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                      />
                      <span className="password-icon">
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toogleShowPassword} />
                      </span>
                    </div>
                    {password && (
                      <div>
                        <div className="d-flex">
                          <i className={passwordValidation.minLength ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                          <p className={`pt-1 ps-3 xsm-text ${passwordValidation.minLength ? 'success-text' : 'error-text'}`}>
                            Password must be at least 8 characters
                          </p>
                        </div>

                        <div className="d-flex">
                          <i className={passwordValidation.hasUppercase ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                          <p className={`pt-1 ps-3 xsm-text ${passwordValidation.hasUppercase ? 'success-text' : 'error-text'}`}>
                            Password must contain at least one uppercase letter
                          </p>
                        </div>

                        <div className="d-flex">
                          <i className={passwordValidation.hasSpecialChar ? 'ri-check-fill success-text' : 'ri-close-line error-text'}></i>
                          <p className={`pt-1 ps-3 xsm-text ${passwordValidation.hasSpecialChar ? 'success-text' : 'error-text'}`}>
                            Password must contain at least one special character
                          </p>
                        </div>
                      </div>
                    )}


                    {errors.password && <p className="error-text xsm-text">{String(errors.password.message)}</p>}
                  </div>

                  <div className="col-12">
                    <div>
                      <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                        <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                        <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill me-2"></i> Submit</span>
                      </button>
                    </div>

                  </div>


                </div>



              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTeacher