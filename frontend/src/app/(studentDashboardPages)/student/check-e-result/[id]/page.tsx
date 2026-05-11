"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'


const IndividualEResult = ({ params }: { params: Promise<any> }) => {
  const { id } = use(params)

  const {
    authTokens,
    formateDateTime,
    formatName,


    handleDownload,

  } = useContext(AuthContext)!;

  const router = useRouter();
  const [allowAccess, setAllowAccess] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const flag = sessionStorage.getItem('canAccessFinalPage');

    if (flag === 'true') {
      setAllowAccess(true);
    } else {
      setAllowAccess(false);
      router.replace('/404');
    }

    // Handle page refresh: do NOT clear flag
    const handleBeforeUnload = () => {
      sessionStorage.setItem('canAccessFinalPage', 'true');
    };


    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);


  const [Loading, setLoading] = useState(true)
  const [details, setDetails] = useState<any>(null)




  const IndividualDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/e-result/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setDetails(data)
        console.log('data', data)
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }




  useEffect(() => {
    IndividualDetailsFunction()

  }, [])




  return (
    <div>
      {allowAccess && (
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

            <div className="container-lg mb-5">
              {details ? (
                <div className="row justify-content-center pt-5">
                  <div className="col-lg-9">
                    <div className="row g-3 justify-content-center">


                      <div className="col-md-8">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1 p-3">
                            <p>Result Details</p>

                          </div>

                          <div className='light-text p-3'>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Student Name</p>
                              <p>{formatName(details.student_name.first_name)} {formatName(details.student_name.last_name)}</p>
                            </div>


                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Class</p>
                              <p>{formatName(details.student_class_name.name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Term</p>
                              <p>{formatName(details.term_name.name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Session</p>
                              <p>{formatName(details.session_name.name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Date created</p>
                              <p>{(formateDateTime(details.date))}</p>
                            </div>


                            <div className="site-border border-radius-10px py-3">
                              <div className="border-bottom1 p-3">
                                <p className='text-center'>Result File</p>
                              </div>

                              {details.result ? (
                                <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer" onClick={() => handleDownload(details.result, `${details.student_name.first_name}__${details.student_name.last_name}__result.pdf`)}>
                                  <p className='light-text text-center'>Click here to download </p>
                                </div>
                              ) : (
                                <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer">
                                  <p className='light-text text-center'>No file attached </p>
                                </div>
                              )}



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
      )}


    </div>
  )
}

export default IndividualEResult