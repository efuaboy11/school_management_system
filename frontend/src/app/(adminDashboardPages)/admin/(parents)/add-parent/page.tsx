"use client"

import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import AllDataContext from '@/context/AllData';
import AuthContext from '@/context/AuthContext';
import "../../../../../css/authCss/auth.css"

import { useDropzone } from 'react-dropzone';
const AddParent = () => {

  const [fullName, setFullName] = useState('')
  const [childrenName, setChildrenName] = useState('')
  const [email, setEmail] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [passport, setPassport] = useState<File | null>(null)




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const {
    StudentClassFunction,

  } = useContext(AllDataContext)!;

  const {
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

  // const handleImgFile = (event:any) => {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     setPassport(file); 
  //   } else {
  //     setPassport(null); 
  //   }
  // };

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
    addParentFunction(e)
  }


  const addParentFunction = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('name', fullName)
    formData.append('children_name', childrenName)
    formData.append('email', email)
    formData.append('address', homeAddress)
    formData.append('phone_number', phoneNumber)
    if (passport) {
      formData.append('image', passport as any)
    }





    try {
      const response = await fetch(`https://school.amanilightequity.com/api/parents/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Parent added successfully')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setFullName('')
        setChildrenName('')
        setEmail('')
        setPhoneNumber('')
        setHomeAddress('')
        setPassport(null)


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
            <p className="md-text">Add Parent</p>
            <p className="light-text">Please ensure that all the required fields are filled</p>
            <p className="light-text xsm-text italic-text">Note: upon registering a parent it will refelect to the parent database. <br /> Navigate to view all parent to confirm</p>
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
                    <label htmlFor="fullName" className="form-label">Full Name <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.fullName ? 'error-input' : ''}`} {...register('fullName', { required: true })} placeholder='First Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    {errors.fullName && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="childrenName" className="form-label">Phone Number  <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.phoneNumber ? 'error-input' : ''}`} {...register('phoneNumber', { required: true })} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Phone Number' />
                    {errors.phoneNumber && <p className="error-text">This field is required</p>}
                  </div>


                  <div className="col-md-6">
                    <label htmlFor="childrenName" className="form-label">Home Address  <span className="text-danger">*</span></label>
                    <input type="text" className={`site-input ${errors.homeAddress ? 'error-input' : ''}`} {...register('homeAddress', { required: true })} value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} placeholder='Home Address' />
                    {errors.homeAddress && <p className="error-text">This field is required</p>}
                  </div>



                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                    <input type="email" className={`site-input ${errors.email ? 'error-input' : ''}`} {...register('email', { required: true })} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    {errors.email && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-12">
                    <label htmlFor="childrenName" className="form-label">Offspring Name<span className="text-danger">*</span></label>
                    <textarea rows={6} className={`site-input ${errors.childrenName ? 'error-input' : ''}`} {...register('childrenName', { required: true })} value={childrenName} onChange={(e) => setChildrenName(e.target.value)} placeholder='Offsprings' ></textarea>
                    {errors.childrenName && <p className="error-text">This field is required</p>}
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

                    {errors.passport && <p className="error-text">Passport is required</p>}
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

export default AddParent