"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";

const SchoolFees = () => {

  const {
    schoolFeesCount,
    schoolFeesData,
    setSchoolFeesData,
    schoolFeesLoader,


    schoolFeesSearch,
    setSchoolFeesSearch,
    SchoolFeesFunction,
    FilterSchoolFees,


    StudentClassFunction,
    studentClassData,
    studentClassQuery,
    setStudentClassQuery,

    termData,
    TermFunction,
    termQuery,
    setTermQuery,

    sessionData,
    SessionFunction,
    sessionQuery,
    setSessionQuery,

    feeTypeQuery,
    setFeeTypeQuery,

  } = useContext(AllDataContext)!;

  const {
    truncateText,
    authTokens,
    formatCurrency,
    formatName,


    loader,
    setLoader,
    disableButton,
    setDisableButton,


    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;

  useEffect(() => {
    if (!schoolFeesSearch) {
      SchoolFeesFunction()
    } else if (schoolFeesSearch) {
      const debouncedSearch = debounce(() => {
        FilterSchoolFees();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [schoolFeesSearch])

  useEffect(() => {
    StudentClassFunction()
    TermFunction()
    SessionFunction()
  }, [])

  useEffect(() => {
    SchoolFeesFunction()

  }, [studentClassQuery, sessionQuery, termQuery, feeTypeQuery])


  const [filterOptions, setOptions] = useState(false)

  const toggleFilterOptions = () => {
    setOptions(!filterOptions)
  }


  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIDs = schoolFeesData.map((data) => data.id);
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

  // const schoolFeesData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = schoolFeesData.slice(startIndex, startIndex + itemsPerPage);


  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-school-fees/', {
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
        setSchoolFeesData(schoolFeesData.filter(dat => dat.id !== selectedIDs))
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        SchoolFeesFunction()
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



  useEffect(() => {
    if (showDeleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showDeleteModal]);



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
      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">School Fees Bills</p>
            <p className="light-text pb-3">Total of {schoolFeesCount} bills avaliable</p>
          </div>

          <div className='d-flex mb-4'>
            <Link href='/admin/school-fees-bill/create' className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i> Create fee</Link>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={schoolFeesSearch} onChange={(e) => setSchoolFeesSearch(e.target.value)} />
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
                  <label htmlFor="" className='form-label light-text'>Filter by class</label>
                  <select className={`site-search-input`} value={studentClassQuery} onChange={(e) => setStudentClassQuery(e.target.value)}>
                    <option value="">Select</option>
                    {studentClassData.map((data: any) => (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    ))}
                  </select>
                </div>

                <div className="me-3 mb-3">
                  <label htmlFor="" className='form-label light-text'>Filter by session</label>
                  <select className={`site-search-input`} value={sessionQuery} onChange={(e) => setSessionQuery(e.target.value)}>
                    <option value="">Select</option>
                    {sessionData.map((data: any) => (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    ))}
                  </select>
                </div>

                <div className="me-3 mb-3">
                  <label htmlFor="" className='form-label light-text'>Filter by term</label>
                  <select className={`site-search-input`} value={termQuery} onChange={(e) => setTermQuery(e.target.value)}>
                    <option value="">Select</option>
                    {termData.map((data: any) => (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    ))}
                  </select>
                </div>

                <div className="me-3">
                  <label htmlFor="" className='form-label light-text'>Filter by fee-type</label>
                  <select className={`site-search-input `} value={feeTypeQuery} onChange={(e) => setFeeTypeQuery(e.target.value)}>
                    <option value="">Select</option>
                    <option value="school fees">School fees</option>
                    <option value="P.T.A">P.T.A</option>
                  </select>
                </div>

              </div>
            </div>
          )}

        </div>

        <div>
          {schoolFeesLoader ? (
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
                                checked={selectedIDs.length === schoolFeesData.length && schoolFeesData.length > 0}
                                onChange={handleSelectAll}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </th>
                          <th>Fee Type</th>
                          <th>Amount</th>
                          <th> Class</th>
                          <th>Session</th>
                          <th>Term</th>
                          <th>Description</th>
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
                              <td className='py-3'>
                                {formatName(data.fee_choice)}
                              </td>
                              <td>{formatCurrency(data.amount)}</td>
                              <td>{formatName(data.student_class_name.name)}</td>
                              <td>{data.session_name.name}</td>
                              <td>{formatName(data.term_name.name)}</td>
                              <td>{truncateText(data.description, 2)}</td>
                              <td>
                                <Link href={`/admin/school-fees-bill/school-fees/${data.id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
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

                  {schoolFeesData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(schoolFeesData.length / itemsPerPage)}
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

export default SchoolFees