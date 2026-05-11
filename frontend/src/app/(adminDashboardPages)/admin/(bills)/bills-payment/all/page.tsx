"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";
import { BillsChart } from '@/components/chatFrames'

const AllSchoolFeesPayment = () => {

  const {
    billsPaymentCount,
    billsPaymentData,
    setBillsPaymentData,
    billsPaymentLoader,

    billsPaymentSearch,
    setBillsPaymentSearch,
    BillsPaymentFunction,
    FilterBillsPayment,

    totalPendingBillsPayment,
    totalDeclinedBillsPayment,
    totalSucessBillsPayment,
    totalBillsPayment,

    PendingBillsPaymentFunction,
    SucessBillsPaymentFunction,
    DeclinedBillsPaymentFunction,

  } = useContext(AllDataContext)!;

  const {
    truncateText,
    authTokens,
    formatName,
    loader,
    setLoader,
    disableButton,
    setDisableButton,
    formatCurrency,


    formatDate,

    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;

  useEffect(() => {
    if (!billsPaymentSearch) {
      BillsPaymentFunction()
    } else if (billsPaymentSearch) {
      const debouncedSearch = debounce(() => {
        FilterBillsPayment();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [billsPaymentSearch])

  useEffect(() => {
    PendingBillsPaymentFunction()
    SucessBillsPaymentFunction()
    DeclinedBillsPaymentFunction()
  }, [])

  console.log(billsPaymentSearch)
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
      const allIDs = billsPaymentData.map((data) => data.id);
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

  // const billsPaymentData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = billsPaymentData.slice(startIndex, startIndex + itemsPerPage);


  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-bills-payment/', {
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
        setBillsPaymentData(billsPaymentData.filter(dat => dat.id !== selectedIDs))
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        BillsPaymentFunction()
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
      <div className="container-xl pt-4 pb-5 mb-5">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">All Bills  Payment</p>
            <p className="light-text pb-3">Total of {billsPaymentCount}  payment avaliable</p>
          </div>

          <div className='d-flex mb-4'>
            <Link href='/admin/bills-payment/add' className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i>Pay Bills</Link>
          </div>
        </div>



        <div>
          {billsPaymentLoader ? (
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


              <div className="mb-5">
                <div className="site-boxes border-radius-10px p-3">
                  <div>
                    <h6>Bills Chart</h6>
                  </div>
                  <BillsChart
                    billsCount={totalBillsPayment}
                    pendingBillsCount={totalPendingBillsPayment}
                    declinedBillsCount={totalDeclinedBillsPayment}
                    successfulBillsCount={totalSucessBillsPayment}
                    label='Bills Chart'
                  />
                </div>
              </div>


              <div className="d-flex justify-content-end mb-4">

                <div>
                  <div className="d-flex align-items-center">
                    <input type="text" className="f site-search-input" placeholder="Search" value={billsPaymentSearch} onChange={(e) => setBillsPaymentSearch(e.target.value)} />
                    <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
                  </div>
                </div>
              </div>


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
                  <div className='site-boxes site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>
                    <table className='overflow-auto light-text'>
                      <thead className='sm-text'>
                        <tr>
                          <th className='py-2'>
                            <label className="custom-checkbox cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedIDs.length === billsPaymentData.length && billsPaymentData.length > 0}
                                onChange={handleSelectAll}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </th>
                          <th className=' py-2'>Student name</th>
                          <th>Bill type</th>
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

                              <td>
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
                                <div className="d-flex">
                                  <div className='dahboard-table-arrow-icon'>
                                    <i className="bi bi-arrow-down-left sm-text-3"></i>
                                  </div>


                                  <div>
                                    {formatName(data.student_name.first_name)} {formatName(data.student_name.last_name)} <br /> <span className="xsm-text">{data.student_name.email}</span>
                                  </div>

                                </div>


                              </td>

                              <td>{formatName(truncateText(data.bill_name.bill_name, 2))}</td>
                              <td>{formatCurrency(data.bill_name.amount)} USD</td>
                              <td>{formatDate(data.date)}</td>
                              <td><p className={`${data.status === 'declined' && 'site-declined'}     ${data.status === "pending" && "site-pending"} ${data.status === "approved" && "site-successful"} py-2 text-center border-radius-5px`}>{formatName(data.status)}</p></td>
                              <td>
                                <Link href={`/admin/bills-payment/individual/${data.id}/${data.transaction_id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
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

                  {billsPaymentData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(billsPaymentData.length / itemsPerPage)}
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

export default AllSchoolFeesPayment