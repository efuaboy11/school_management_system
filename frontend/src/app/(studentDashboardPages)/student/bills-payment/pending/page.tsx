"use client"
import React, { useContext, useEffect,  useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";

const PendingPayment = () => {

  const {
    pendingBillsPaymentCount,
    pendingBillsPaymentData,
    pendingBillsPaymentLoader,

    pendingBillsPaymentSearch,
    setPendingBillsPaymentSearch,
    PendingBillsPaymentFunction,
    FilterPendingBillsPayment,
  } = useContext(AllDataContext)!;

  const {
    truncateText,
    formatName,
    formatCurrency,


    formatDate,

  } = useContext(AuthContext)!;

  useEffect(() => {
    if (!pendingBillsPaymentSearch) {
      PendingBillsPaymentFunction()
    } else if (pendingBillsPaymentSearch) {
      const debouncedSearch = debounce(() => {
        FilterPendingBillsPayment();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [pendingBillsPaymentSearch])




  const itemsPerPage = 10;
  const [page, setPage] = useState(1);







  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // const pendingBillsPaymentData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = pendingBillsPaymentData.slice(startIndex, startIndex + itemsPerPage);





  return (
    <div>

      <div className="container-xl pt-4 pb-5 mb-5">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">Pending Payment</p>
            <p className="light-text pb-3">Total of {pendingBillsPaymentCount} pending payment avaliable</p>
          </div>

          <div className='d-flex mb-4'>
            <Link href='/student/bills-payment/make-payment' className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i>Pay Bills</Link>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="f site-search-input" placeholder="Search" value={pendingBillsPaymentSearch} onChange={(e) => setPendingBillsPaymentSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {pendingBillsPaymentLoader ? (
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
                  <div className='site-boxes site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>
                    <table className='overflow-auto light-text'>
                      <thead className='sm-text'>
                        <tr>
                          <th className=' py-2'>Bill type</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((data) => (
                            <tr key={data.id}>

                              <td className='py-3'>{formatName(truncateText(data.bill_name.bill_name, 2))}</td>
                              <td>{formatCurrency(data.bill_name.amount)} USD</td>
                              <td>{formatDate(data.date)}</td>
                              <td><p className={`${data.status === 'declined' && 'site-declined'}     ${data.status === "pending" && "site-pending"} ${data.status === "approved" && "site-successful"} py-2 text-center border-radius-5px`}>{formatName(data.status)}</p></td>
                              <td>
                                <div className="d-flex align-center">
                                  <Link href={`/student/bills-payment/individual/${data.id}/${data.transaction_id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
                                    <i className="ri-eye-line"></i>
                                  </Link>
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

                  {pendingBillsPaymentData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(pendingBillsPaymentData.length / itemsPerPage)}
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
                      <p className='light-text md-text'>No payment available</p>
                      <p className="light-text">There is no payment current right now. Check again later</p>
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

export default PendingPayment