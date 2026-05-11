"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";
import { DownloadLink } from '@/components/downloadLink'


const ClassTimetablePage = () => {



  const {
    classTimetableCount,
    classTimetableData,
    classTimetableLoader,

    classTimetableSearch,
    setClassTimetableSearch,
    ClassTimetableFunction,
    FilterClassTimetable,

  } = useContext(AllDataContext)!;

  const {
    formatDate,
    formatName,



  } = useContext(AuthContext)!;

  useEffect(() => {
    if (!classTimetableSearch) {
      ClassTimetableFunction()
    } else if (classTimetableSearch) {
      const debouncedSearch = debounce(() => {
        FilterClassTimetable();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [classTimetableSearch])



  useEffect(() => {
    ClassTimetableFunction()

  }, [])




  const itemsPerPage = 10;
  const [page, setPage] = useState(1);





  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // const classTimetableData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = classTimetableData.slice(startIndex, startIndex + itemsPerPage);






  return (
    <div className='mb-5 pb-5'>

      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">Class TImetable</p>
            <p className="light-text pb-3">Total of {classTimetableCount} class timetable avalaible</p>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={classTimetableSearch} onChange={(e) => setClassTimetableSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {classTimetableLoader ? (
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
                          <th className='py-2'>Teacher</th>
                          <th>Student Class</th>
                          <th>Timetable download</th>
                          <th>Date Added</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((data) => (
                            <tr key={data.id}>
                              <td className='py-3'>
                                {formatName(data.teacher_name.first_name)}
                              </td>
                              <td>{formatName(data.student_class_name.name)}</td>
                              <td>
                                <DownloadLink
                                  url={data.class_timetable}
                                  fileName={`${data.student_class_name.name}__timetable.pdf`}
                                />
                              </td>

                              <td>{formatDate(data.created_at)}</td>
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

                  {classTimetableData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(classTimetableData.length / itemsPerPage)}
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

export default ClassTimetablePage