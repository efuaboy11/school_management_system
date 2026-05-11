"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import Image from 'next/image'

const IndivivdualEvent = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const {
    authTokens,

    formatDate,
    formatName

  } = useContext(AuthContext)!;

  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState<any>(null)



  const IndividualDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/school-event/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setDetails(data)
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


      {loading ? (
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
              <div className="col-sm-7">
                <div className="row g-3">

                  <div className="col-12">
                    <div className="site-boxes border-radius-10px">
                      <div className="border-bottom1 p-3">
                        <p>Event Details</p>

                      </div>

                      <div className='light-text p-3'>
                        <div className="pb-3 d-sm-flex justify-content-between">
                          <p className="pb-2 sm-text">Title</p>
                          <p>{formatName(details.title)}</p>
                        </div>

                        <div className="pb-3 d-sm-flex justify-content-between">
                          <p className="pb-2 sm-text">Start Date</p>
                          <p>{formatDate(details.start_date)}</p>
                        </div>

                        <div className="pb-3 d-sm-flex justify-content-between">
                          <p className="pb-2 sm-text">End Date</p>
                          <p>{formatDate(details.end_date)}</p>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="site-boxes border-radius-10px">
                      <div className="border-bottom1">
                        <div className="p-3">
                          <p>Description</p>
                        </div>

                      </div>
                      <div className='p-3'>
                        {details.description ? (
                          <p className='light-text'>{details.description}</p>
                        ) : (
                          <p className="light-text">No description Placed</p>
                        )}

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


  )
}

export default IndivivdualEvent