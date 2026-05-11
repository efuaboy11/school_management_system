"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { debounce } from "lodash";
import Image from 'next/image'

const AddSessionPage = () => {
  const [sessionValue, setSessionValue] = useState('')
  const [termIDs, setTermIDs] = useState<number[]>([])

  const {

    authTokens,

    loader,
    setLoader,

    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,
    formatName,




  } = useContext(AuthContext)!


  const {
    termData,

    termSearch,
    setTermSearch,
    TermFunction,
    FilterTerm,
  } = useContext(AllDataContext)!;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const handleCheckboxChange = (id: number) => {
    setTermIDs(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const onSubmit = (data: FormData, e: any) => {
    CreatBill(e)
  }


  const CreatBill = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const payload = {
      name: sessionValue,
      term: termIDs, // ensure it's an array of integers
    };


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/session/`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Session  created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setSessionValue('')
        setTermIDs([])



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




  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Create session</p>
              </div>

              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="sessionValue" className="form-label">Session</label>
                      <input type="text" className={`site-input ${errors.sessionValue ? 'error-input' : ''}`} {...register('sessionValue', { required: true })} placeholder='Session' value={sessionValue} onChange={(e) => setSessionValue(e.target.value)} />
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
  )
}

export default AddSessionPage