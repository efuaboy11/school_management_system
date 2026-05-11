"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";


const AssignmentSubmissionPage = () => {



  const {
    assignmentSubmissionCount,
    assignmentSubmissionData,
    assignmentSubmissionLoader,

    assignmentSubmissionSearch,
    setAssignmentSubmissionSearch,
    AssignmentSubmissionFunction,
    FilterAssignmentSubmission,

  } = useContext(AllDataContext)!;

  const {

    formatName,

  } = useContext(AuthContext)!;

  useEffect(() => {
    if (!assignmentSubmissionSearch) {
      AssignmentSubmissionFunction()
    } else if (assignmentSubmissionSearch) {
      const debouncedSearch = debounce(() => {
        FilterAssignmentSubmission();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [assignmentSubmissionSearch])



  useEffect(() => {
    AssignmentSubmissionFunction()

  }, [])




  const itemsPerPage = 10;
  const [page, setPage] = useState(1);



  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // const assignmentSubmissionData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = assignmentSubmissionData.slice(startIndex, startIndex + itemsPerPage);







  return (
    <div className='mb-5 pb-5'>

      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">Assignment Submission</p>
            <p className="light-text pb-3">Total of {assignmentSubmissionCount} assignment given</p>
          </div>

          <div className='d-flex mb-4'>
            <Link href='/student/assignment-submission/upload' className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i> Submit</Link>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={assignmentSubmissionSearch} onChange={(e) => setAssignmentSubmissionSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {assignmentSubmissionLoader ? (
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
                          <th className='py-2'>Teacher Assignment</th>
                          <th>Assignment Code</th>
                          <th>Grade</th>
                          <th>Date Submitted</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((data) => (
                            <tr key={data.id}>
                              <td className='py-3'>
                                {formatName(data.teacher_name.first_name)}
                              </td>
                              <td>{data.assignment_code}</td>
                              <td>{data.grade ? data.grade : 'Not awarded yet'}</td>
                              <td>{(data.date_submitted)}</td>
                              <td>
                                <Link href={`/student/assignment-submission/individual/${data.id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
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

                  {assignmentSubmissionData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(assignmentSubmissionData.length / itemsPerPage)}
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

export default AssignmentSubmissionPage