"use client"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";
import { useForm } from 'react-hook-form'

const StaffNotification = () => {

  const {
    staffNotificationCount,
    staffNotificationData,
    setStaffNotificationData,
    staffNotificationLoader,

    staffNotificationSearch,
    setStaffNotificationSearch,
    StaffNotificationFunction,
    FilterStaffNotification,

  } = useContext(AllDataContext)!;

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






  const itemsPerPage = 10;
  const [page, setPage] = useState(1);



  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationSubject, setNotificationSubject] = useState('')
  const [statusLoader, setStatusLoader] = useState(false)
  const statusModal = useRef<any>(null)
  const [statusOverlay, setStatusOverlay] = useState(false)

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);



  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };


  const showStatusModal = (id: any, text: string, subject: string) => {
    setNotificationMessage(text)
    setNotificationSubject(subject)
    if (statusModal.current) {
      statusModal.current.style.transform = `translateY(${0}px)`
      statusModal.current.style.transition = `all ${1.5}s ease`
    }
    setStatusOverlay(true)
    setSelectedDataId(id)
  }

  const hideStatusModal = () => {
    if (statusModal.current) {
      statusModal.current.style.transform = `translateY(${-650}%)`
      statusModal.current.style.transition = `all ${5}s ease`
    }
    setSelectedDataId(null)

  }


  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIDs = staffNotificationData.map((data) => data.id);
      setSelectedIDs(allIDs);
    } else {
      setSelectedIDs([]);
    }
  };
  const handleCheckboxChange = (id: number) => {
    if (selectedIDs.includes(id)) {
      setSelectedIDs(selectedIDs.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIDs([...selectedIDs, id]);
    }
  }


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (e: any) => {
    UpdateDetails(e)

  }
  // const staffNotificationData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = staffNotificationData.slice(startIndex, startIndex + itemsPerPage);


  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-staff-notification/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({
          ids: selectedIDs,
        }),

      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        setStaffNotificationData(staffNotificationData.filter(dat => dat.id !== selectedIDs))
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        StaffNotificationFunction()
        showAlert()
        setIsSuccess(true)


      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');

        setLoader(false)
        setDisableButton(false)
        setMessage(errorMessages)
        showAlert()
        setIsSuccess(false)

      }
    } catch {
      setLoader(false)
      setDisableButton(false)
      setMessage("An error occurred. Please try again.")
      showAlert()
      setIsSuccess(false)
    }
  }


  const UpdateDetails = async (e: any) => {
    e.preventDefault()
    setStatusLoader(true)
    setDisableButton(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/staff-notification/${selectedDataId}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          text: notificationMessage,
          subject: notificationSubject,
        }),
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        showAlert()
        setMessage("message updated sucessfully")
        setDisableButton(false)
        setNotificationMessage('')
        setIsSuccess(true)
        setStatusLoader(false)
        hideStatusModal()
        StaffNotificationFunction()
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setStatusLoader(false)
        setIsSuccess(false)
        showAlert()

      }
    } catch (error) {
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setStatusLoader(false)

    }
  }




  useEffect(() => {
    if (showDeleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showDeleteModal]);

  useEffect(() => {
    let timer: any;
    if (selectedDataId == null) {
      timer = setTimeout(() => {
        setStatusOverlay(false);
      }, 1000);
    }


    return () => clearTimeout(timer);
  }, [selectedDataId]);

  useEffect(() => {
    if (!staffNotificationSearch) {
      StaffNotificationFunction()
    } else if (staffNotificationSearch) {
      const debouncedSearch = debounce(() => {
        FilterStaffNotification();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [staffNotificationSearch])






  return (
    <div className='mb-5 pb-5'>
      {showDeleteModal && (
        <section className={` ${showDeleteModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div className="d-flex justify-content-center text-center">
                      <div>
                        <Image src="/img/icon/warning.png" alt="empty" width={100} height={100} />
                        <p className='md-text mt-3'>Are you sure?</p>
                        <p className="light-text">This action cannot be undone. {selectedIDs.length} selected {selectedIDs.length === 1 ? 'data entry' : 'data entries'} will be deleted.</p>
                        <div className='pt-4'>
                          <button className="site-delete-btn px-3 me-2 width-100 mb-4" onClick={deleteFunction} disabled={disableButton}>
                            <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                            <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-delete-bin-line pe-2"></i> Delete</span>
                          </button>
                          <button onClick={handleCloseDeleteModal} className="site-btn site-cancel-btn px-3 width-100"><i className="ri-close-circle-line pe-2"></i>Cancel</button>
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


      <div className={`${statusOverlay ? 'overlay-background pt-5 ' : ''}`}>
        <div className="dashboard-update-status-container" ref={statusModal}>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 col-sm-9 col-11">
              <div className="site-boxes px-4 py-3 border-radius-10px">
                <div className="d-flex justify-content-end">
                  <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={hideStatusModal} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="phoneNumber" className="form-label">Subject<span className="text-danger">*</span></label>
                      <input className={`site-input ${errors.billName ? 'error-input' : ''}`} {...register('subject', { required: true })} value={notificationSubject} onChange={(e) => setNotificationSubject(e.target.value)} />
                      {errors.subject && <p className="error-text">This field is required</p>}
                    </div>

                    <div className='col-12'>
                      <label htmlFor="" className="p-2 d-block form-label">Message</label>
                      <textarea rows={6} className={`${errors.status ? 'error-input' : ''} d-block site-search-input`} {...register('notificationMessage', { required: true })} value={notificationMessage} onChange={(e) => setNotificationMessage(e.target.value)}>
                      </textarea>
                      {errors.notificationMessage && <span style={{ color: 'red' }}>This Feild is required</span>}
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <div className='pt-3'>
                      <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                        <span className={`${statusLoader ? 'site-submit-spinner' : ''}`}></span>
                        <span className={`${statusLoader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-upload-line me-2"></i>Update</span>
                      </button>
                    </div>
                  </div>


                </form>

              </div>
            </div>
          </div>

        </div>
      </div>



      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">Statff Notifications</p>
            <p className="light-text pb-3">Total of {staffNotificationCount} notification avaliable</p>
          </div>

          <div className='d-flex mb-4'>
            <Link href='/hr/staff-notification/add' className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i> Add notification</Link>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={staffNotificationSearch} onChange={(e) => setStaffNotificationSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {staffNotificationLoader ? (
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
            <div className='mt-5'>
              {currentItems.length > 0 ? (
                <div>
                  {selectedIDs.length > 0 ? (
                    <div className='pb-2'>
                      <button onClick={handleShowDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line me-2"></i>Delete</button>
                    </div>
                  ) : (
                    <div></div>
                  )
                  }
                  <div>
                    <label className="custom-checkbox cursor-pointer ms-2 mt-4">
                      <input
                        type="checkbox"
                        checked={selectedIDs.length === staffNotificationData.length && staffNotificationData.length > 0}
                        onChange={handleSelectAll}
                      />
                      <span className="checkmark"></span>
                    </label>


                    {
                      currentItems.map((data, index) => (
                        <div className='d-flex mb-3' key={data.id}>
                          <div className={`site-notification-boxes ${index % 2 !== 0 ? 'sent' : ''}`}>
                            <div className="d-flex justify-content-between">
                              <label className="custom-checkbox cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedIDs.includes(data.id)}
                                  onChange={() => handleCheckboxChange(data.id)}
                                />
                                <span className="checkmark"></span>
                              </label>

                              <div onClick={() => showStatusModal(data.id, data.text, data.subject)} className='ms-3 cursor-pointer'>
                                <i className="ri-edit-line font-size-20px"></i>
                              </div>
                            </div>

                            <div className='pt-3 pb-1 light-text font-bold'>
                              <p>{formatDate(data.date)}</p>
                            </div>
                            <h6 className='py-2 font-bold'>{formatName(data.subject)}</h6>
                            <p>{data.text || 'No message.'}</p>
                          </div>
                        </div>
                      ))
                    }


                  </div>


                  {staffNotificationData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="center">
                        <Pagination
                          count={Math.ceil(staffNotificationData.length / itemsPerPage)}
                          page={page}
                          onChange={handleChange}
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
                  )}
                </div>


              ) : (
                <div className="col-12 ">
                  <div className='site-boxes text-center pb-5 d-flex justify-content-center align-items-center  mt-5 pt-5'>
                    <div>
                      <Image src="/img/icon/thinking.png" alt="empty" width={100} height={100} />
                      <p className='light-text md-text'>No details available</p>
                      <p className="light-text">There is no  details right now. Check again later</p>
                    </div>

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

export default StaffNotification