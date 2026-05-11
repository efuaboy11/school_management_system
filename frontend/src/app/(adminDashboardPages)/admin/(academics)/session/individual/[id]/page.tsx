"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import AllDataContext from '@/context/AllData';
import { debounce } from "lodash";

const IndivivdualSession = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

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


  const {
    termData,

    termSearch,
    setTermSearch,
    TermFunction,
    FilterTerm,
  } = useContext(AllDataContext)!;

  const [Loading, setLoading] = useState(true)
  const [details, setDetails] = useState<any>(null)

  const [sessionValue, setSessionValue] = useState('')
  const [termIDs, setTermIDs] = useState<number[]>([])
  const [deleteModal, setDeleteModal] = useState(false)

  const [showModal, setShowModal] = useState(false);

  const [animateModal, setAnimateModal] = useState(false);

  const router = useRouter();

  const handleClosenModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleShowDeleteModal = () => {
    setDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false)
  }


  const handleCheckboxChange = (id: number) => {
    setTermIDs(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };






  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: any, e: any) => {
    EditDetails(e)

  }

  const IndividualDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/session/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setDetails(data)

        setSessionValue(data?.name || '')

        const datas: [] = data?.term
        console.log(datas)
        setTermIDs(datas)



        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }
  console.log(termIDs)
  const deleteFunction = async () => {

    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/session/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        router.push('/admin/session')
        setDeleteModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Session  deleted')
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

  const EditDetails = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const payload = {
      name: sessionValue,
      term: termIDs, // ensure it's an array of integers
    };


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/session/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Details updated successfully')
        setIsSuccess(true)
        setShowModal(false)
        IndividualDetailsFunction()
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
    if (showModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showModal]);

  useEffect(() => {
    IndividualDetailsFunction()
  }, [])

  useEffect(() => {
    if (!termSearch) {
      TermFunction()
    } else if (termSearch) {
      const debouncedSearch = debounce(() => {
        FilterTerm();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [termSearch])

  useEffect(() => {
    if (deleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [deleteModal]);



  return (
    <div>
      <div>
        {showModal && (
          <section className={` ${showModal ? 'overlay-background' : ''}`}>
            <div className='container-lg'>

              <div className=" row justify-content-center align-center2 height-90vh">

                <div className="col-md-8 col-sm-10 col-12">
                  <div className="site-modal-conatiner">
                    <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                      <div>
                        <div className="d-flex justify-content-between pb-2">
                          <p className='font-size-20px '>Edit details</p>
                          <div onClick={handleClosenModal} className='cursor-pointer'>
                            <i className="ri-close-line md-text"></i>
                          </div>
                        </div>


                        <div className='pt-4'>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label htmlFor="sessionValue" className="form-label">Session Name</label>
                                <input type="text" className={`site-input ${errors.sessionValue ? 'error-input' : ''}`} {...register('sessionValue', { required: true })} placeholder='session Name' value={sessionValue} onChange={(e) => setSessionValue(e.target.value)} />
                                {errors.sessionValue && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="d-flex justify-content-end">

                                <div>
                                  <div className="d-flex align-items-center">
                                    <input type="text" className="f site-search-input" placeholder="Search" value={termSearch} onChange={(e) => setTermSearch(e.target.value)} />
                                    <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
                                  </div>
                                </div>
                              </div>

                              {termData.length > 0 ? (
                                <div className='p-3 site-light-boxes border-radius-10px'>

                                  <div className="d-flex flex-wrap">
                                    {termData.map((data: any) => (
                                      <div className="me-4 mb-4" key={data.id}>
                                        <div className="px-3 site-border border-radius-10px  p-2">
                                          <div>
                                            <label className="custom-checkbox cursor-pointer">
                                              <input
                                                type="checkbox"
                                                checked={termIDs.includes(data.id)}
                                                onChange={() => handleCheckboxChange(data.id)}
                                              />
                                              <span className="checkmark"></span>
                                            </label>

                                          </div>
                                          <p className="light-text">{formatName(data.name)}</p>
                                        </div>




                                      </div>

                                    ))}
                                  </div>
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

        {deleteModal && (
          <section className={` ${deleteModal ? 'overlay-background' : ''}`}>
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
              {details ? (
                <div className="row justify-content-center pt-5">
                  <div className="col-sm-10 col-lg-7">
                    <div className="row g-3">

                      <div className="col-12">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1  d-flex justify-content-end">
                            <div className="d-flex p-3">
                              <div className="me-3">
                                <button onClick={handleShowModal} className='site-inverse-btn px-3'><i className="ri-edit-line"></i><span className="ms-2 d-none d-md-inline">Edit</span></button>
                              </div>

                              <div>
                                <button onClick={handleShowDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line "></i><span className="ms-2 d-none d-md-inline">Delete</span></button>
                              </div>
                            </div>

                          </div>

                          <div className=' text-center p-3 border-bottom1'>
                            <h5>{formatName(details.name)}</h5>
                          </div>

                          <div className='light-text p-3'>
                            <p className='pb-3 sm-text'>Term attached to {formatName(details.name)}</p>
                            <div className="d-flex flex-wrap">
                              {details.term_name.map((dat: any) => (
                                <p key={dat.name} className='pe-4'>{formatName(dat.name)}</p>

                              ))}
                            </div>
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
                    <p className="light-text">Details not avalaible. Check again later</p>
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

export default IndivivdualSession