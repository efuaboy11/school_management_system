"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";

const StafflNotification = () => {



  const {
    staffNotificationCount,
    staffNotificationData,
    staffNotificationLoader,

    staffNotificationSearch,
    setStaffNotificationSearch,
    StaffNotificationFunction, 
    FilterStaffNotification,
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
  
  // const staffNotificationData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = staffNotificationData.slice(startIndex, startIndex + itemsPerPage);



  useEffect(() =>{
    if(!staffNotificationSearch){
      StaffNotificationFunction()
    }else if(staffNotificationSearch){
      const debouncedSearch = debounce(() => {
        FilterStaffNotification();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };
      
    }
    
  }, [staffNotificationSearch])







  return (
    <div className='mb-5 pb-5'>

      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">Staff Notiffications</p>
            <p className="light-text pb-3">Total of {staffNotificationCount} notification avaliable</p>
         </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={staffNotificationSearch} onChange={(e) => setStaffNotificationSearch(e.target.value)}/>
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {staffNotificationLoader ? (
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

                            <div className='d-flex justify-content-between flex-wrap pt-3 light-text font-bold'>
                              <p className='me-4 pb-2'>{formatDate(data.date)}</p>
                            </div>

                            <div className="">
                              <h6 className='py-2 font-bold me-3'>{formatName(data.subject)}</h6>

                            </div>
                            
                            <p>{data.text || 'No message.'}</p>
                          </div>
                        </div>
                      ))
                    }


                  </div>
                  

                  {staffNotificationData.length > 10 && (
                      <div className="col-12 mb-4 mt-3">
                        <Stack spacing={2} alignItems="center">
                          <Pagination
                            count={Math.ceil(staffNotificationData.length / itemsPerPage)}
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

              
              ): (
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

export default StafflNotification