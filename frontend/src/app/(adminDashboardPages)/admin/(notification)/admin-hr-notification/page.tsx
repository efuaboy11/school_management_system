"use client"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";


const AdminHrNotificationPage = () => {



  const {
    adminHrNotificationCount,
    adminHrNotificationData,
    setAdminHrNotificationData,
    adminHrNotificationLoader,

    adminHrNotificationSearch,
    setAdminHrNotificationSearch,
    AdminHrNotificationFunction,
    FilteradminHrNotification,
    statusQuery,
    setStatusQuery,

  } = useContext(AllDataContext)!;

  const {
    authTokens,
    formatDate,



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

  const [filterOptions, setOptions] = useState(false)

  const toggleFilterOptions = () => {
    setOptions(!filterOptions)
  }

  const [statusLoader, setStatusLoader] = useState(false)
  const statusModal = useRef<any>(null)
  const [statusOverlay, setStatusOverlay] = useState(false)
  const [seen, setSeen] = useState(false)

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


  const showStatusModal = (id: any, status: boolean) => {
    setSeen(status)
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
      const allIDs = adminHrNotificationData.map((data) => data.id);
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

  // const adminHrNotificationData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = adminHrNotificationData.slice(startIndex, startIndex + itemsPerPage);


  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-admin-or-hr-notification/', {
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
        setAdminHrNotificationData(adminHrNotificationData.filter(dat => dat.id !== selectedIDs))
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        AdminHrNotificationFunction()
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


  const UpdateStatus = async () => {
    setStatusLoader(true)
    setDisableButton(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/admin-or-hr-notification/${selectedDataId}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          seen: !seen,
        }),
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        showAlert()
        setMessage("Status updated sucessfully")
        setDisableButton(false)
        setIsSuccess(true)
        setStatusLoader(false)
        hideStatusModal()
        AdminHrNotificationFunction()
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
    if (!adminHrNotificationSearch) {
      AdminHrNotificationFunction()
    } else if (adminHrNotificationSearch) {
      const debouncedSearch = debounce(() => {
        FilteradminHrNotification();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [adminHrNotificationSearch])

  useEffect(() => {
    AdminHrNotificationFunction()
  }, [statusQuery])




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
                {seen ? (
                  <div className="d-flex justify-content-center">
                    <div className="text-center">
                      <h5 className='pb-2'>This Notification has been <span className="success-text">Read</span></h5>
                      <p className="light-text">This notification is currently  saved as read, it shows the message has be readed by the intended user</p>
                      <p className="sm-text light-text italic-text">Note: This will make the text to be marked as unread.</p>

                      <button onClick={UpdateStatus} disabled={disableButton} type="submit" className={`mt-4 mb-3 Button width-100 site-btn px-3`}>
                        <span className={`${statusLoader ? 'site-submit-spinner' : ''}`}></span>
                        <span className={`${statusLoader ? 'site-submit-btn-visiblity' : ''}`}><i className="bi bi-ban me-2"></i>unread</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="text-center">
                      <h5 className='pb-2'>This Notification has not been <span className="error-text">unread</span></h5>
                      <p className="light-text">This notification is currently saved as unread, would you like to mark it to be read?</p>
                      <p className="sm-text light-text italic-text">Note: This will make the notifiaction to be marked as read</p>

                      <button onClick={UpdateStatus} disabled={disableButton} type="submit" className={`mt-4 mb-3 Button width-100 site-btn px-3`}>
                        <span className={`${statusLoader ? 'site-submit-spinner' : ''}`}></span>
                        <span className={`${statusLoader ? 'site-submit-btn-visiblity' : ''}`}><i className="bi bi-check2-circle me-2"></i>read</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>



      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">Admin / HR Notiffications</p>
            <p className="light-text pb-3">Total of {adminHrNotificationCount} notification avaliable</p>
          </div>

          {/* <div className='d-none d-sm-block'>
            <Link href='/admin/admin-or-hr-notification/add' className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i> Add notification</Link>
          </div> */}
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={adminHrNotificationSearch} onChange={(e) => setAdminHrNotificationSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div className='pt-5'>
          <div className='d-flex'>
            <p className='pe-2 light-text'>Filter</p>
            <label className="site-switch">
              <input type="checkbox" onChange={toggleFilterOptions} />
              <span className="site-switch-slider"></span>
            </label>

          </div>
          {filterOptions && (
            <div className="d-sm-flex justify-content-start pt-3">
              <div className="d-sm-flex">
                <div className="me-3 mb-3">
                  <label htmlFor="" className='form-label light-text'>Filter by status</label>
                  <select className={`site-search-input`} value={statusQuery} onChange={(e) => setStatusQuery(e.target.value)}>
                    <option value="">Select</option>
                    <option value="read">read</option>
                    <option value="unread">unread</option>
                  </select>
                </div>

              </div>
            </div>
          )}

        </div>

        <div>
          {adminHrNotificationLoader ? (
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
                        checked={selectedIDs.length === adminHrNotificationData.length && adminHrNotificationData.length > 0}
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

                              <div onClick={() => showStatusModal(data.id, data.seen)} className='ms-3 cursor-pointer'>
                                <i className="ri-edit-line font-size-20px"></i>
                              </div>
                            </div>

                            <div className='pt-3 pb-1 light-text font-bold'>
                              <p>{formatDate(data.date)} <i className="bi bi-dash-lg"></i> {data.seen ? 'read' : 'unread'}</p>
                            </div>

                            <p>{data.text || 'No message.'}</p>
                          </div>
                        </div>
                      ))
                    }


                  </div>


                  {adminHrNotificationData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="center">
                        <Pagination
                          count={Math.ceil(adminHrNotificationData.length / itemsPerPage)}
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

export default AdminHrNotificationPage