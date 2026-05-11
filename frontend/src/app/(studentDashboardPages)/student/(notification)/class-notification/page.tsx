"use client"
import React, { useContext, useEffect,  useState } from 'react'
import Image from 'next/image'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";

const ClassNotification = () => {



  const {
    classNotificationCount,
    classNotificationData,
    classNotificationLoader,

    classNotificationSearch,
    setClassNotificationSearch,
    ClassNotificationFunction,
    FilterClassNotification,
    StudentClassFunction,
    TeacherFunction
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


  // const classNotificationData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = classNotificationData.slice(startIndex, startIndex + itemsPerPage);


  useEffect(() => {
    if (!classNotificationSearch) {
      ClassNotificationFunction()
    } else if (classNotificationSearch) {
      const debouncedSearch = debounce(() => {
        FilterClassNotification();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [classNotificationSearch])

  useEffect(() => {
    StudentClassFunction()
    TeacherFunction()
  }, [])






  return (
    <div className='mb-5 pb-5'>

      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">Class Notiffications</p>
            <p className="light-text pb-3">Total of {classNotificationCount} notification avaliable</p>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={classNotificationSearch} onChange={(e) => setClassNotificationSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {classNotificationLoader ? (
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
                              <p className='me-4 pb-2'>Posted by: <span className='light-text'>{formatName(data.teacher_name.first_name)}</span></p>
                              <p className='me-4'>Class: <span className='light-text'>{formatName(data.student_class_name.name)}</span></p>

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


                  {classNotificationData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="center">
                        <Pagination
                          count={Math.ceil(classNotificationData.length / itemsPerPage)}
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

export default ClassNotification