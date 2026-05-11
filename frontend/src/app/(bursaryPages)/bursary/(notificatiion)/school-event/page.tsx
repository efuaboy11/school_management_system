"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";

const SchoolEventPage = () => {



  const {
    schoolEventCount,
    schoolEventData,
    schoolEventLoader,

    schoolEventSearch,
    setSchoolEventSearch,
    SchoolEventFunction,
    FilterSchoolEvent,

  } = useContext(AllDataContext)!;

  const {
    truncateText,
    formatDate,
    formatName,

  } = useContext(AuthContext)!;

  useEffect(() => {
    if (!schoolEventSearch) {
      SchoolEventFunction()
    } else if (schoolEventSearch) {
      const debouncedSearch = debounce(() => {
        FilterSchoolEvent();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [schoolEventSearch])



  useEffect(() => {
    SchoolEventFunction()

  }, [])




  const itemsPerPage = 10;
  const [page, setPage] = useState(1);



  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // const schoolEventData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = schoolEventData.slice(startIndex, startIndex + itemsPerPage);





  return (
    <div className='mb-5 pb-5'>

      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">School Events</p>
            <p className="light-text pb-3">Total of {schoolEventCount} school event scheduled</p>
          </div>

        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={schoolEventSearch} onChange={(e) => setSchoolEventSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {schoolEventLoader ? (
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

                  <div className='site-boxes  site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>
                    <table className='overflow-auto light-text'>
                      <thead className='sm-text'>
                        <tr>
                          <th className='py-2'>Title</th>
                          <th>Description</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((data) => (
                            <tr key={data.id}>
                              <td className='py-3'>
                                {formatName(data.title)}
                              </td>
                              <td>{truncateText(data.description, 3)}</td>
                              <td>{formatDate(data.start_date)}</td>
                              <td>{formatDate(data.end_date)}</td>
                              <td>
                                <Link href={`/bursary/school-event/individual/${data.id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
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

                  {schoolEventData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(schoolEventData.length / itemsPerPage)}
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

export default SchoolEventPage