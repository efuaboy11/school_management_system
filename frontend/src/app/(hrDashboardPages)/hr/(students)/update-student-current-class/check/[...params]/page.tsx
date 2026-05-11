"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import ThemeContext from '@/context/ThemeContext'
import Link from 'next/link'
import React, { use, useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import Select from 'react-select';
import Image from 'next/image'
import { Pagination, Stack } from '@mui/material';

const CheckStudentInClassPage2 = ({ params }: { params: Promise<any> }) => {

  const param = use(params);
  const [classID] = param.params || [];


  const [studentValue, setStudentValue] = useState('')
  const [classValue, setClassValue] = useState(classID)



  const [studentInClassData, setStudentInClassData] = useState<any>([])
  const [studentInClassLoader, setStudentInClassLoader] = useState(true)


  const [studentClassDetails, setStudentClassDetails] = useState<any>(null)

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const {
    authTokens,
    formatName,


    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,




  } = useContext(AuthContext)!


  const {
    studentData,
    StudentFunction,

    studentClassData,
    StudentClassFunction,
  } = useContext(AllDataContext)!;

  const { theme } = useContext(ThemeContext)!;



  const {
    handleSubmit,
  } = useForm<any>();





  const itemsPerPage = 10;
  const [page, setPage] = useState(1);






  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // const studentInClassData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = studentInClassData.slice(startIndex, startIndex + itemsPerPage);




  const [studentQuery, setStudentQuery] = useState('')
  const [filterOptions, setOptions] = useState(false)

  const toggleFilterOptions = () => {
    setOptions(!filterOptions)
  }



  const StudentsOptions = studentData.map((data: any) => ({
    value: data.id,
    label: `${data.first_name} ${data.last_name} - ${data.student_class_name.name}`
  }));

  const StudentClassOptions = studentClassData.map((data: any) => ({
    value: data.id,
    label: `${data.name}`
  }));




  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#0d0d0d' : '#fff',
      borderColor: state.isFocused ? '#783ebc' : theme === 'light' ? '#ccc' : '#333',
      boxShadow: state.isFocused ? '0 0 0 4px rgba(120, 62, 188, 0.2)' : 'none',
      color: theme === 'dark' ? '#fff' : '#000',
    }),

    menu: (provided: any) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#0d0d0d' : '#fff',
      border: '1px solid #ccc',
      zIndex: 999,
    }),

    option: (provided: any, state: any) => {
      const isDark = theme === 'dark';

      const backgroundColor = state.isSelected
        ? '#783ebc'
        : state.isFocused
          ? isDark
            ? '#1a1a1a' // hover in dark
            : '#f0f0f0' // hover in light
          : isDark
            ? '#0d0d0d'
            : '#fff';

      const color = state.isSelected
        ? '#fff'
        : state.isFocused
          ? isDark
            ? '#fff'
            : '#000'
          : isDark
            ? '#fff'
            : '#000';

      return {
        ...provided,
        backgroundColor,
        color,
        cursor: 'pointer',
      };
    },

    singleValue: (provided: any) => ({
      ...provided,
      color: theme === 'dark' ? '#fff' : '#000',
    }),

    placeholder: (provided: any) => ({
      ...provided,
      color: theme === 'dark' ? '#aaa' : '#666',
    }),

    input: (provided: any) => ({
      ...provided,
      color: theme === 'dark' ? '#fff' : '#000',
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: theme === 'dark' ? '#fff' : '#000',
    }),

    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#444' : '#ccc',
    }),
  };




  const onSubmit = (data: FormData, e: any) => {
    if (studentValue) {
      ChangeStudentCurrentClass(e)
    } else {
      showAlert()
      setMessage('A field is empty')
      setIsSuccess(false)
    }

  }


  const ChangeStudentCurrentClass = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('student', studentValue)
    formData.append('student_new_class', classValue)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/update-student-current-class/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Student class updated successfully')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setClassValue('')
        setStudentValue('')
        StudentInClassFunction()



      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setIsSuccess(false)
        setLoader(false)
        showAlert()
      }


    } catch (error) {
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)

    }
  }


  const StudentInClassFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/student-in-class/?student_class=${classID}&student=${studentQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {




      const sortedData = [...data].sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );

      setStudentInClassData(sortedData)
      setStudentInClassLoader(false)


    } else {
      setStudentInClassLoader(false)
      setStudentInClassData([])
    }



  }





  const IndividualClass = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/student-class/${classID}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setStudentClassDetails(data)
        console.log('data', data)
      }
    } catch {
      console.log('error')
    }

  }



  useEffect(() => {
    StudentFunction()
    IndividualClass()
    StudentClassFunction()
    setLoader(false)

  }, [])

  useEffect(() => {
    StudentInClassFunction()
  }, [studentQuery])









  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Upload Result <i className="bi bi-dash-lg"></i> 2</p>
              </div>

              <div className="p-3">
                {hasMounted && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">

                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Select Student<span className="text-danger">*</span> </label>
                        <Select
                          options={StudentsOptions}
                          value={StudentsOptions.find((opt: { value: string; label: string }) => opt.value === studentValue)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setStudentValue(selectedOption?.value || '')}
                          placeholder="Select"
                          classNamePrefix="site-select"
                          styles={customStyles}  // ✅ Add this
                          isSearchable
                          isClearable
                        />
                      </div>


                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Student New class <span className="text-danger">*</span></label>
                        <Select
                          options={StudentClassOptions}
                          value={StudentClassOptions.find((opt: { value: string; label: string }) => opt.value === classValue)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setClassValue(selectedOption?.value || '')}
                          placeholder="Select"
                          classNamePrefix="site-select"
                          styles={customStyles}  // ✅ Add this
                          isSearchable
                          isClearable
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className='pt-3'>
                        <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                          <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                          <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill me-2"></i>Submit</span>
                        </button>
                      </div>
                    </div>


                  </form>
                )}

              </div>
            </div>
          </div>
        </div>

        <div className='mt-5'>


          <div className='pt-5'>
            <div className='row'>
              <div className="col-md-2 d-flex align-items-center pb-3">
                <p className='pe-2 light-text'>Filter</p>
                <label className="site-switch">
                  <input type="checkbox" onChange={toggleFilterOptions} />
                  <span className="site-switch-slider"></span>
                </label>
              </div>

              <div className="col-md-10">
                <p className='text-center light-text pt-2'>Students in  {studentClassDetails && formatName(studentClassDetails?.name)}</p>
              </div>


            </div>
            {filterOptions && (
              <div className="d-sm-flex justify-content-start pt-3">
                <div className="d-sm-flex">
                  <div className="me-3 mb-3">
                    <label htmlFor="lastName" className="form-label">Select Student</label>
                    <Select
                      options={StudentsOptions}
                      value={StudentsOptions.find((opt: { value: string; label: string }) => opt.value === studentQuery)}
                      onChange={(selectedOption: { value: string; label: string } | null) => setStudentQuery(selectedOption?.value || '')}
                      placeholder="Select Student"
                      classNamePrefix="site-select"
                      styles={customStyles}  // ✅ Add this
                      isSearchable
                      isClearable
                    />
                  </div>


                </div>
              </div>
            )}

          </div>
          {studentInClassLoader ? (
            <div className="site-boxes border-radius-10px p-5 d-flex justify-content-center">
              <div className="site-content-loader"></div>
            </div>
          ) : (
            <div>
              {currentItems.length > 0 ? (
                <div>

                  <div className='site-boxes  site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>
                    <table className='overflow-auto light-text'>
                      <thead className='sm-text'>
                        <tr>
                          <th className='py-2'>Student</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((data: any) => (
                            <tr key={data.id}>
                              <td className='py-3'>
                                {formatName(data.first_name)} {formatName(data.last_name)}
                              </td>
                              <td>
                                <div className="d-flex justify-content-end">
                                  <Link href={`/hr/all-student/${data.id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
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

                  {studentInClassData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(studentInClassData.length / itemsPerPage)}
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
                  <div className='site-boxes text-center pb-5 d-flex justify-content-center align-items-center   pt-5'>
                    <div>
                      <Image src="/img/icon/thinking.png" alt="empty" width={100} height={100} />
                      <p className='light-text md-text'>No Student Available</p>
                      <p className="light-text">There is no student available right now. Check again later</p>
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

export default CheckStudentInClassPage2