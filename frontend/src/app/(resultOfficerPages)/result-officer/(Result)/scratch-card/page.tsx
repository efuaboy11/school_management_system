"use client"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";
import { useForm } from 'react-hook-form'

const ScratchCardPage = () => {



  const {
    scratchCardCount,
    scratchCardData,
    setScratchCardData,
    scratchCardLoader,

    scratchCardSearch,
    setScratchCardSearch,
    ScratchCardFunction,
    FilterScratchCard,


    statusQuery,
    setStatusQuery,


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


  } = useContext(AuthContext)!;

  useEffect(() => {
    if (!scratchCardSearch) {
      ScratchCardFunction()
    } else if (scratchCardSearch) {
      const debouncedSearch = debounce(() => {
        FilterScratchCard();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [scratchCardSearch])


  useEffect(() => {
    ScratchCardFunction()
  }, [statusQuery])

  const [cardAmount, setCardAmount] = useState('')

  const [copied, setCopied] = useState(false)
  const [selectedID, setSelectedID] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true)
        setSelectedID(id)
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };


  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 1000); // Reset after 1 second

      return () => clearTimeout(timer); // Cleanup the timer to avoid memory leaks
    }
  }, [copied]);


  const [filterOptions, setOptions] = useState(false)

  const toggleFilterOptions = () => {
    setOptions(!filterOptions)
  }


  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const statusModal = useRef<any>(null)
  const [statusOverlay, setStatusOverlay] = useState(false)
  const [modalNavigator, setModalNavigator] = useState<any>(false);


  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIDs = scratchCardData.map((data) => data.id);
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

  const showStatusModal = () => {
    if (statusModal.current) {
      statusModal.current.style.transform = `translateY(${0}px)`
      statusModal.current.style.transition = `all ${1.5}s ease`
    }
    setStatusOverlay(true);
    setModalNavigator(false);
  }

  const hideStatusModal = () => {
    if (statusModal.current) {
      statusModal.current.style.transform = `translateY(${-650}%)`
      statusModal.current.style.transition = `all ${5}s ease`
    }
    setModalNavigator(true)

  }


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = scratchCardData.slice(startIndex, startIndex + itemsPerPage);


  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-scratch-cards/', {
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
        setScratchCardData(scratchCardData.filter(dat => dat.id !== selectedIDs))
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        ScratchCardFunction()
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();


  const onSubmit = (data: FormData, e: any) => {
    GenerateCardNumber(e)
  }

  const GenerateCardNumber = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/generate-scratch-cards/`, {
        method: 'POST',
        body: JSON.stringify({
          amount: cardAmount,
        }),
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        showAlert()
        setMessage("Card generated successfully")
        setDisableButton(false)
        setIsSuccess(true)
        setLoader(false)
        hideStatusModal()
        ScratchCardFunction()
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setLoader(false)
        setIsSuccess(false)
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
    if (showDeleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showDeleteModal]);


  useEffect(() => {
    let timer: any;
    if (modalNavigator) {
      timer = setTimeout(() => {
        setStatusOverlay(false);
      }, 1000);
    }


    return () => clearTimeout(timer);
  }, [modalNavigator]);



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
                <h5 className='pb-4'>Generate Card Number</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">

                    <div className="col-12">
                      <label htmlFor="cardAmount" className="form-label">Card Amount <span className="text-danger">*</span></label>
                      <input className={`site-input ${errors.cardAmount ? 'error-input' : ''}`} {...register('cardAmount', { required: true })} value={cardAmount} onChange={(e) => setCardAmount(e.target.value)} />
                      {errors.cardAmount && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-12">
                      <div className='mb-3'>
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


      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">Scratch Card Numbers</p>
            <p className="light-text pb-3">Total of {scratchCardCount} cards avaliable</p>
          </div>

          <div className='d-flex mb-4'>
            <button onClick={showStatusModal} className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i>Generate number</button>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={scratchCardSearch} onChange={(e) => setScratchCardSearch(e.target.value)} />
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
                    <option value="active">Active</option>
                    <option value="used">Used</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>

              </div>
            </div>
          )}

        </div>

        <div>
          {scratchCardLoader ? (
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
                                checked={selectedIDs.length === scratchCardData.length && scratchCardData.length > 0}
                                onChange={handleSelectAll}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </th>
                          <th>Pin</th>
                          <th>Trials Left</th>
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
                              <td>
                                <div className="d-flex">
                                  <p>{data.pin}</p>

                                  <div className="ms-4 col-2  cursor-pointer" onClick={() => handleCopy(data.pin, data.id)}>
                                    <div className="d-flex align-items-center height-100">
                                      {(copied && (selectedID === data.id)) ? (
                                        <p className='success-text'><i className="bi bi-clipboard-check"></i></p>
                                      ) : (
                                        <p><i className="bi bi-clipboard pe-1"></i></p>
                                      )}

                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <p className={`${data.status === 'expired' && 'site-declined'}     ${data.status === "used" && "site-pending"} ${data.status === "active" && "site-successful"} px-3 py-1 text-center border-radius-5px`}>{data.trials_left} trial</p>
                                </div>
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

                  {scratchCardData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(scratchCardData.length / itemsPerPage)}
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

export default ScratchCardPage