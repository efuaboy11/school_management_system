"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";

const SchoolNotification = () => {



  const {
    schoolNotificationCount,
    schoolNotificationData,
    schoolNotificationLoader,

    schoolNotificationSearch,
    setSchoolNotificationSearch,
    SchoolNotificationFunction,
    FilterSchoolNotification,

  } = useContext(AllDataContext)!;

  const {
    formatDate,
    formatName,

  } = useContext(AuthContext)!;






  const itemsPerPage = 10;
  const [page, setPage] = useState(1);







  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };



  // const schoolNotificationData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = schoolNotificationData.slice(startIndex, startIndex + itemsPerPage);




  useEffect(() => {
    if (!schoolNotificationSearch) {
      SchoolNotificationFunction()
    } else if (schoolNotificationSearch) {
      const debouncedSearch = debounce(() => {
        FilterSchoolNotification();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [schoolNotificationSearch])






  return (
    <div className='mb-5 pb-5'>



      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">School Notiffications</p>
            <p className="light-text pb-3">Total of {schoolNotificationCount} notification avaliable</p>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={schoolNotificationSearch} onChange={(e) => setSchoolNotificationSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {schoolNotificationLoader ? (
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
                  <div>



                    {
                      currentItems.map((data, index) => (
                        <div className='d-flex mb-3' key={data.id}>
                          <div className={`site-notification-boxes ${index % 2 !== 0 ? 'sent' : ''}`}>

                            <div className='pt-3 pb-1 light-text font-bold'>
                              <p>{formatDate(data.date)}</p>
                            </div>
                            <h6 className='py-2 font-bold'>{formatName(data.subject)}</h6>
                            <p>{data.text || 'No message.'}</p>
                          </div>
                        </div>
                      ))
                    }


                  </div>


                  {schoolNotificationData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="center">
                        <Pagination
                          count={Math.ceil(schoolNotificationData.length / itemsPerPage)}
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

export default SchoolNotification