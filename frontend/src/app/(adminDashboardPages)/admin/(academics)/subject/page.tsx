
"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";
const Subjects = () => {

  const {
    subjectCount,
    subjectGroupData,
    subjectData,
    subjectLoader,

    subjectSearch,
    setSubjectSearch,
    SubjectFunction,
    FilterSubject,
    sectionLabels,
  } = useContext(AllDataContext)!;

  const {
    truncateText,
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
    if (!subjectSearch) {
      SubjectFunction()
    } else if (subjectSearch) {
      const debouncedSearch = debounce(() => {
        FilterSubject();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [subjectSearch])




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
      const allIDs = subjectData.map((data) => data.id);
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


  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-subjects/', {
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
        // setSubjectGroupData(subjectGroupData.filter(dat => dat.id !== selectedIDs))
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        SubjectFunction()
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
    <div>
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
      <div className="container-xl">
        <div className="d-flex justify-content-between">
          <div>
            <p className="md-text">Subject</p>
            <p className="light-text pb-3">Total of {subjectCount} subject avaliable</p>
          </div>

          <div className='d-flex mb-4'>
            <Link href='/admin/subject/add' className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i> Add subject</Link>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="f site-search-input" placeholder="Search" value={subjectSearch} onChange={(e) => setSubjectSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {subjectLoader ? (
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
            <div>
              <div className="pt-4 pb-2">
                <div className="d-flex justify-content-between align-items-center">
                  {selectedIDs.length > 0 ? (
                    <div>
                      <button onClick={handleShowDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line me-2"></i>Delete</button>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <label className="custom-checkbox cursor-pointer me-3">
                    <input
                      type="checkbox"
                      checked={selectedIDs.length === subjectData.length && subjectData.length > 0}
                      onChange={handleSelectAll}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>

              {subjectData.length > 0 ? (
                <div>
                  {Object.entries(subjectGroupData).map(([sectionKey, subjects]) => (
                    subjects.length > 0 && (
                      <div key={sectionKey} className='pb-4'>
                        <p className='pb-3'>{sectionLabels[sectionKey]}</p>
                        <div className="row g-4">
                          {subjects.map((data: any) => (
                            <div className="col-lg-3  col-md-6" key={data.id}>
                              <div className="site-boxes border-radius-10px p-3">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <Link href={`/admin/subject/individual/${data.id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
                                      <i className="ri-eye-line"></i>
                                    </Link>

                                  </div>
                                  <div>
                                    <div>
                                      <label className="custom-checkbox cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={selectedIDs.includes(data.id)}
                                          onChange={() => handleCheckboxChange(data.id)}
                                        />
                                        <span className="checkmark"></span>
                                      </label>

                                    </div>
                                  </div>
                                </div>

                                <div className="text-center">
                                  <h5 className="light-text">{formatName(data.name)}</h5>
                                </div>

                                <div className="wrap-text my-4 site-border border-radius-10px py-2 px-3 site-light-boxes ">
                                  <div className="light-text">
                                    <p className='sm-text'>Description:</p>
                                    <p>{truncateText(data.description, 5)}</p>

                                  </div>
                                </div>

                              </div>
                            </div>

                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className='site-boxes text-center pb-5 d-flex justify-content-center align-items-center  mt-5 pt-5'>
                  <div>
                    <Image src="/img/icon/thinking.png" alt="empty" width={100} height={100} />
                    <p className='light-text md-text'>No details available</p>
                    <p className="light-text">There is no details current right now. Check again later</p>
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

export default Subjects





