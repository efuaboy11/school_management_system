"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'

import Image from 'next/image'



interface DetailsInterface {
  student_name: { userID: string, first_name: string, last_name: string, email: string }
  payment_method_name: { name: string }
  bill_name: { bill_name: string, amount: number, description: string }
  bill_receipt: File
  date: string;
  status: string;


}


const IndividualBills = ({ params }: { params: Promise<any> }) => {

  const {
    authTokens,
    formatDate,
    formatName,
    formatCurrency,
    formateDateTime,

  } = useContext(AuthContext)!;


  const { id, transactionId } = use(params);

  const [details, setDetails] = useState<DetailsInterface | null>(null)
  const [Loading, setLoading] = useState(true)

  const IndividualDataFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/bills-payment/${id}/`, {
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
    IndividualDataFunction()
  }, [])

  return (
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
        <div className="container-xl pb-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-11 col-xl-10">
              <div className="pt-4 pb-2">
                <div>
                  <p className='md-text'>Payment Receipt</p>
                </div>
              </div>
              <div className="py-4">
                <section className='py-2 px-3 site-boxes border-radius-10px'>

                  {details !== null ?
                    (
                      <div>
                        <div className='border-bottom1 pb-3'>
                          <p className=' pb-5'><span className="font-size-20px font-bold">Transaction</span> <span className='support-text'>#{transactionId}</span></p>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center height-100">
                              <div className='dahboard-table-arrow-icon'>
                                <i className="bi bi-arrow-down-left sm-text-3"></i>
                              </div>
                              <div>
                                <p className='sm-text'>{formatCurrency(details.bill_name.amount)} <span className='sm-text-3'>USD</span></p>
                                <p className='sm-text-2'>{formatDate(formateDateTime(details.date))}</p>
                              </div>

                            </div>

                            <div>
                              <p className={`${details.status === 'declined' && 'site-declined'}     ${details.status === "pending" && "site-pending"} ${details.status === "approved" && "site-successful"} py-2 px-3 border-radius-5px`}>{formatName(details.status)}</p>
                            </div>
                          </div>
                        </div>

                        <div className='pt-5 pb-3 border-bottom1'>
                          <p className='font-bold sm-text-2 pb-4'>IN TRANSACTION</p>

                          <div className="row">
                            <div className="col-sm-6 col-md-4">
                              <div className='pb-3'>
                                <p className="sm-text-2 light-text">Transaction ID</p>
                                <p>{transactionId}</p>
                              </div>

                              <div className='pb-3'>
                                <p className="sm-text-2 light-text">Amount</p>
                                <p>{formatCurrency(details.bill_name.amount)}USD</p>
                              </div>

                              <div className='pb-3'>
                                <p className="sm-text-2 light-text">Payment Method</p>
                                <p>{formatName(details.payment_method_name.name)}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-md-4">
                              <div className='pb-3'>
                                <p className="sm-text-2 light-text">Bill Type</p>
                                <p>{formatName(details.bill_name.bill_name)}</p>
                              </div>


                            </div>

                            <div className="col-sm-6 col-md-4">

                              <div className='pb-3'>
                                <p className="sm-text-2 light-text">Bill Payment Description</p>
                                {details.bill_name.description ? (
                                  <p>{details.bill_name.description}</p>
                                ) : (
                                  <p>None given</p>
                                )}

                              </div>
                            </div>


                          </div>
                        </div>

                        <div className='pt-5 pb-3 border-bottom1'>
                          <p className='font-bold sm-text-2 pb-4'>IN ACCOUNT</p>

                          <div className="row">
                            <div className="col-sm-6 col-md-4">
                              <div className='pb-3'>
                                <p className="sm-text-2 light-text">User ID</p>
                                <p>{details.student_name.userID}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-md-4">
                              <div className='pb-3'>
                                <p className="sm-text-2 light-text">User Account</p>
                                <p>{formatName(details.student_name.first_name)} {formatName(details.student_name.last_name)}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-md-4">
                              <div className='pb-3'>
                                <p className="sm-text-2 light-text">Email</p>
                                <p>{formatName(details.student_name.email)}</p>
                              </div>
                            </div>


                          </div>
                        </div>

                        <div className='pt-5 pb-3'>
                          <p className='font-bold sm-text-2 pb-4'>TRANSACTION PROOF</p>

                          <div className="row">
                            <div className="col-lg-6 col-md-8 col-sm-12">
                              <img src={details.bill_receipt} alt="" width='100%' />
                            </div>
                          </div>

                        </div>
                      </div>
                    ) :
                    (
                      <div className='mt-5 site-boxes border-radius-10px text-center pb-3 d-flex justify-content-center align-items-center  mt-4 pt-3'>
                        <div>
                          <Image src="/img/icon/thinking.png" alt="empty" width={70} height={70} />
                          <p className='light-text md-text'>No reciept details available</p>
                          <p className="light-text">Reciept details not avalaible. Check again later</p>
                        </div>

                      </div>
                    )
                  }

                </section>
              </div>
            </div>
          </div>

        </div>
      )}





    </div>
  )
}

export default IndividualBills