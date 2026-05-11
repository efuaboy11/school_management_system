"use client"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Pagination, Stack } from '@mui/material';
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";
import { useForm } from 'react-hook-form'

const Product = () => {



  const [changePasswordRequestCount, setChangePasswordRequest] = useState(0)
  const [changePasswordRequestData, setChangePasswordRequestData] = useState<any[]>([])
  const [changePasswordRequestLoader, setChangePasswordRequestLoader] = useState(true)
  const [changePasswordRequestSearch, setChangePasswordRequestSearch] = useState('')


  console.log(changePasswordRequestSearch)



  const {
    authTokens,
    formatName,


    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;




  const ChangePasswordRequestFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/request-to-change-password/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setChangePasswordRequest(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setChangePasswordRequestData(sortedData)
      setChangePasswordRequestLoader(false)


    } else {
      setChangePasswordRequestLoader(false)
    }



  }


  const FilterchangePasswordRequest = async () => {
    let url;

    if (changePasswordRequestSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/request-to-change-password/?search=${changePasswordRequestSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setChangePasswordRequestData(sortedData)
    }
  }

  useEffect(() => {
    if (!changePasswordRequestSearch) {
      ChangePasswordRequestFunction()
    } else if (changePasswordRequestSearch) {
      const debouncedSearch = debounce(() => {
        FilterchangePasswordRequest();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [changePasswordRequestSearch])



  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);


  const [statusLoader, setStatusLoader] = useState(false)
  const statusModal = useRef<any>(null)
  const [statusOverlay, setStatusOverlay] = useState(false)
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [requestStatus, setRequestStatus] = useState('')

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIDs = changePasswordRequestData.map((data) => data.id);
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

  const showStatusModal = (id: any) => {
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


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = changePasswordRequestData.slice(startIndex, startIndex + itemsPerPage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    UpdateStatus()

  }
  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-request-to-change-password/', {
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
        setChangePasswordRequestData(changePasswordRequestData.filter(dat => dat.id !== selectedIDs))
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        ChangePasswordRequestFunction()
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
      const response = await fetch(`https://school.amanilightequity.com/api/request-to-change-password/${selectedDataId}/update-status/`, {
        method: 'PUT',
        body: JSON.stringify({
          approved_status: requestStatus,
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
        ChangePasswordRequestFunction()
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
            <div className="col-xl-3 col-lg-5 col-md-6 col-sm-9 col-11">
              <div className="site-boxes px-4 py-3 border-radius-10px">
                <div className="d-flex justify-content-end">
                  <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={hideStatusModal} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="" className="p-2 d-block">Request Status</label>
                    <select className={`${errors.status ? 'error-input' : ''} d-block site-search-input`} {...register('status', { required: true })} value={requestStatus} onChange={(e) => setRequestStatus(e.target.value)}>
                      <option></option>
                      <option value='pending'>Pending</option>
                      <option value='declined'>Decline</option>
                      <option value='approved'>Approve</option>
                    </select>
                    {errors.status && <span style={{ color: 'red' }}>This Feild is required</span>}
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
            <p className="md-text">Change Password Request</p>
            <p className="light-text pb-3">Total of {changePasswordRequestCount} requests</p>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={changePasswordRequestSearch} onChange={(e) => setChangePasswordRequestSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {changePasswordRequestLoader ? (
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
                  <div className='site-boxes  site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>
                    <table className='overflow-auto light-text'>
                      <thead className='sm-text'>
                        <tr>
                          <th className='py-2'>
                            <label className="custom-checkbox cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedIDs.length === changePasswordRequestData.length && changePasswordRequestData.length > 0}
                                onChange={handleSelectAll}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </th>
                          <th>User Name</th>
                          <th>Request Date:</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((data) => (
                            <tr key={data.id}>
                              <td className='py-3'>
                                <label className="custom-checkbox cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={selectedIDs.includes(data.id)}
                                    onChange={() => handleCheckboxChange(data.id)}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </td>
                              <td>{formatName(data.user_details.first_name)} {formatName(data.user_details.last_name)}</td>
                              <td>{(data.request_date)}</td>
                              <td><p className={`${data.approved_status === 'declined' && 'site-declined'}     ${data.approved_status === "pending" && "site-pending"} ${data.approved_status === "approved" && "site-successful"} p-2 text-center border-radius-5px`}>{formatName(data.approved_status)}</p></td>

                              <td>
                                {data.approved_status === "pending" && (
                                  <div className="d-flex align-center">
                                    <div onClick={() => showStatusModal(data.id)} className='ms-3 cursor-pointer'>
                                      <i className="ri-edit-line"></i>
                                    </div>
                                  </div>
                                )}

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

                  {changePasswordRequestData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(changePasswordRequestData.length / itemsPerPage)}
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

export default Product