"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";
import Select from 'react-select';
import ThemeContext from '@/context/ThemeContext'
import { DownloadLink } from '@/components/downloadLink'

const EResultPage = () => {

  const { theme } = useContext(ThemeContext)!;
  const {
    eResultCount,
    eResultData,
    setEResultData,
    eResultLoader,

    eResultSearch,
    setEResultSearch,
    EResultFunction,
    FilterEResult,


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

    studentData,
    StudentFunction,
    studentQuery,
    setStudentQuery,



  } = useContext(AllDataContext)!;

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

  useEffect(() => {
    if (!eResultSearch) {
      EResultFunction()
    } else if (eResultSearch) {
      const debouncedSearch = debounce(() => {
        FilterEResult();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [eResultSearch])

  useEffect(() => {
    StudentClassFunction()
    TermFunction()
    SessionFunction()
    StudentFunction()
  }, [])

  useEffect(() => {
    EResultFunction()

  }, [studentClassQuery, sessionQuery, termQuery, studentQuery])


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
      const allIDs = eResultData.map((data) => data.id);
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

  // const eResultData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = eResultData.slice(startIndex, startIndex + itemsPerPage);


  const StudentOptions = studentData.map((data: any) => ({
    value: data.id,
    label: `${data.first_name} ${data.last_name}`
  }));


  const StudentClassOptions = studentClassData.map((data: any) => ({
    value: data.id,
    label: `${data.name}`
  }));



  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#0d0d0d' : '#fff',
      borderColor: state.isFocused ? '#783ebc' : theme === 'light' ? '#ccc' : '#333',
      boxShadow: state.isFocused ? '0 0 0 4px rgba(120, 62, 188, 0.2)' : 'none',
      color: theme === 'dark' ? '#fff' : '#000',
    }),

    menu: (provided: any) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#0d0d0d' : '#fff',
      border: '1px solid #ccc',
      zIndex: 999,
    }),

    option: (provided: any, state: any) => {
      const isDark = theme === 'dark';

      const backgroundColor = state.isSelected
        ? '#783ebc'
        : state.isFocused
          ? isDark
            ? '#1a1a1a' // hover in dark
            : '#f0f0f0' // hover in light
          : isDark
            ? '#0d0d0d'
            : '#fff';

      const color = state.isSelected
        ? '#fff'
        : state.isFocused
          ? isDark
            ? '#fff'
            : '#000'
          : isDark
            ? '#fff'
            : '#000';

      return {
        ...provided,
        backgroundColor,
        color,
        cursor: 'pointer',
      };
    },

    singleValue: (provided: any) => ({
      ...provided,
      color: theme === 'dark' ? '#fff' : '#000',
    }),

    placeholder: (provided: any) => ({
      ...provided,
      color: theme === 'dark' ? '#aaa' : '#666',
    }),

    input: (provided: any) => ({
      ...provided,
      color: theme === 'dark' ? '#fff' : '#000',
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: theme === 'dark' ? '#fff' : '#000',
    }),

    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#444' : '#ccc',
    }),
  };



  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-e-result/', {
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
        setEResultData(eResultData.filter(dat => dat.id !== selectedIDs))
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        EResultFunction()
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
            <p className="md-text">Student Result</p>
            <p className="light-text pb-3">Total of {eResultCount} student results available</p>
          </div>

          <div className='d-flex mb-4'>
            <Link href='/result-officer/upload-e-result' className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i>Upload Result</Link>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={eResultSearch} onChange={(e) => setEResultSearch(e.target.value)} />
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
                  <label htmlFor="lastName" className="form-label">Select Class <span className="text-danger">*</span></label>
                  <Select
                    options={StudentClassOptions}
                    value={StudentClassOptions.find((opt: { value: string; label: string }) => opt.value === studentClassQuery)}
                    onChange={(selectedOption: { value: string; label: string } | null) => setStudentClassQuery(selectedOption?.value || '')}
                    placeholder="Select Class"
                    classNamePrefix="site-select"
                    styles={customStyles}  // ✅ Add this
                    isSearchable
                    isClearable
                  />
                </div>

                <div className="me-3 mb-3">
                  <label htmlFor="lastName" className="form-label">Select Student <span className="text-danger">*</span></label>
                  <Select
                    options={StudentOptions}
                    value={StudentOptions.find((opt: { value: string; label: string }) => opt.value === studentQuery)}
                    onChange={(selectedOption: { value: string; label: string } | null) => setStudentQuery(selectedOption?.value || '')}
                    placeholder="Select Student"
                    classNamePrefix="site-select"
                    styles={customStyles}  // ✅ Add this
                    isSearchable
                    isClearable
                  />
                </div>

                <div className="me-3 mb-3">
                  <label htmlFor="" className='form-label light-text'>Filter by term</label>
                  <select className={`site-input`} value={termQuery} onChange={(e) => setTermQuery(e.target.value)}>
                    <option value="">Select Term</option>
                    {termData.map((data: any) => (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    ))}
                  </select>
                </div>

                <div className="me-3 mb-3">
                  <label htmlFor="" className='form-label light-text'>Filter by session</label>
                  <select className={`site-input`} value={sessionQuery} onChange={(e) => setSessionQuery(e.target.value)}>
                    <option value="">Select Session</option>
                    {sessionData.map((data: any) => (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
          )}

        </div>

        <div>
          {eResultLoader ? (
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
                                checked={selectedIDs.length === eResultData.length && eResultData.length > 0}
                                onChange={handleSelectAll}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </th>
                          <th>Student</th>
                          <th> Class</th>
                          <th>Term</th>
                          <th>Session</th>
                          <th>Result</th>
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
                                {formatName(data.student_name.first_name)}
                              </td>
                              <td>{formatName(data.student_class_name.name)}</td>
                              <td>{formatName(data.term_name.name)}</td>
                              <td>{formatName(data.session_name.name)}</td>
                              <td>
                                <DownloadLink
                                  url={data.result}
                                  fileName={`${data.student_name.first_name}__${data.student_name.last_name}__result.pdf`}
                                />
                              </td>
                              <td>
                                <Link href={`/result-officer/individual-e-result/${data.id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
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

                  {eResultData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(eResultData.length / itemsPerPage)}
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

export default EResultPage