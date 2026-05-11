"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone';

const IndivivdualParent = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const {
    authTokens,

    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;

  const [Loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)

  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [childrenName, setChildrenName] = useState('')
  const [passport, setPassport] = useState<File | null>(null)
  const [userDeleteModal, setUserDeleteModal] = useState(false)

  const [showPersonalInformationModal, setShowPersonalInformationModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const router = useRouter();

  const handleClosePersonalInformationModal = () => {
    setShowPersonalInformationModal(false);
  };
  const handleShowPersonalInformationModal = () => {
    setShowPersonalInformationModal(true);
  };

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



  const {
    register: registerPersonalInformation,
    handleSubmit: handleSubmitPersonalInformation,
    formState: { errors: errorsPersonalInformation },
  } = useForm<any>();

  const onPersonalInformationSubmit = (data: any, e: any) => {
    EditPersonalInformation(e)

  }

  const IndividualUserDataFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/parents/${id}/`, {
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

        setFullName(data?.name || '')
        setChildrenName(data?.children_name || '')
        setEmail(data?.email || '')
        setPhoneNumber(data?.phone_number || '')
        setHomeAddress(data?.address || '')
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
      const response = await fetch(`https://school.amanilightequity.com/api/parents/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        router.push('/hr/all-parents')
        setUserDeleteModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Parent  deleted')
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

  const EditPersonalInformation = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('name', fullName)
    formData.append('children_name', childrenName)
    formData.append('email', email)
    formData.append('phone_number', phoneNumber)
    formData.append('address', homeAddress)
    if (passport) {
      formData.append('passport', passport);
    }


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/parents/${id}/`, {
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


  useEffect(() => {
    if (showPersonalInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showPersonalInformationModal]);

  useEffect(() => {
    IndividualUserDataFunction()
  }, [])

  useEffect(() => {
    if (userDeleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [userDeleteModal]);



  return (
    <div>
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
                          <p className='font-size-20px '>Edit Parent Profile</p>
                          <div onClick={handleClosePersonalInformationModal} className='cursor-pointer'>
                            <i className="ri-close-line md-text"></i>
                          </div>
                        </div>


                        <div className='pt-4'>
                          <form onSubmit={handleSubmitPersonalInformation(onPersonalInformationSubmit)}>
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" className={`site-input ${errorsPersonalInformation.firstName ? 'error-input' : ''}`} {...registerPersonalInformation('fullName', { required: true })} placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                {errorsPersonalInformation.fullName && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className={`site-input ${errorsPersonalInformation.email ? 'error-input' : ''}`} {...registerPersonalInformation('email', { required: true })} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                                {errorsPersonalInformation.email && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Phone Number</label>
                                <input type="text" className={`site-input ${errorsPersonalInformation.phoneNumber ? 'error-input' : ''}`} {...registerPersonalInformation('phoneNumber', { required: true })} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='phone number' />
                                {errorsPersonalInformation.phoneNumber && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Home Address</label>
                                <input type="text" className={`site-input ${errorsPersonalInformation.homeAddress ? 'error-input' : ''}`} {...registerPersonalInformation('homeAddress', { required: true })} value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} placeholder='Home address' />
                                {errorsPersonalInformation.homeAddress && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="col-md-12">
                                <label htmlFor="lastName" className="form-label">Offsprings</label>
                                <textarea rows={6} className={`site-input ${errorsPersonalInformation.lastName ? 'error-input' : ''}`} {...registerPersonalInformation('childrenName', { required: true })} value={childrenName} onChange={(e) => setChildrenName(e.target.value)} placeholder='Offspring name'></textarea>
                                {errorsPersonalInformation.childrenName && <p className="error-text">This field is required</p>}
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

        <div>

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

            <div className="container-lg">
              {userData ? (
                <div className="row justify-content-center pt-5">
                  <div className="col-sm-9">
                    <div className="row g-3">
                      <div className="col-lg-5">
                        <div className="site-boxes border-radius-10px p-3">
                          <img className='width-100 border-radius-5px' src={userData.image} alt="" />
                        </div>
                      </div>

                      <div className="col-lg-7">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1  d-flex justify-content-end">
                            <div className="d-flex p-3">
                              <div className="me-3">
                                <button onClick={handleShowPersonalInformationModal} className='site-inverse-btn px-3'><i className="ri-edit-line"></i><span className="ms-2 d-none d-md-inline">Edit</span></button>
                              </div>

                              <div>
                                <button onClick={handleShowUserDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line "></i><span className="ms-2 d-none d-md-inline">Delete</span></button>
                              </div>
                            </div>

                          </div>

                          <div className='light-text p-3'>
                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Full name</p>
                              <p>{userData.name}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Phone number</p>
                              <p>{userData.phone_number}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Email</p>
                              <p>{userData.email}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Address</p>
                              <p>{userData.address}</p>
                            </div>

                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1">
                            <div className="p-3">
                              <p>Parent Offspring</p>
                            </div>

                          </div>
                          <div className='p-3'>
                            <p className='light-text'>{userData.children_name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='mt-5 site-boxes border-radius-10px text-center pb-3 d-flex justify-content-center align-items-center  mt-4 pt-3'>
                  <div>
                    <Image src="/img/icon/thinking.png" alt="empty" width={70} height={70} />
                    <p className='light-text md-text'>No details available</p>
                    <p className="light-text">User Personal details not avalaible. Check again later</p>
                  </div>

                </div>
              )}


            </div>
          )}


        </div>
      </div>
    </div>

  )
}

export default IndivivdualParent