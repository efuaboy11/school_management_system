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
import { DownloadLink } from '@/components/downloadLink'

const CreateShemeOfWork2 = ({ params }: { params: Promise<any> }) => {

  const { termValue, studentClass } = use(params);


  const [teacherName, setTeacherName] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [file, setFile] = useState<File | null>(null)


  const [schemeOfWorkData, setSchemeOfWorkData] = useState<any>([])
  const [schemeOfWorkLoader, setSchemeOfWorkLoader] = useState(true)


  const [termDetails, setTermDetails] = useState<any>(null)
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
    teacherData,
    subjectData,

    TeacherFunction,
    SubjectFunction,
  } = useContext(AllDataContext)!;

  const { theme } = useContext(ThemeContext)!;



  const {
    register,
    handleSubmit,
  } = useForm<any>();

  console.log(termValue, subjectName, studentClass)



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
      const allIDs = schemeOfWorkData.map((data: any) => data.id);
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

  // const schemeOfWorkData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = schemeOfWorkData.slice(startIndex, startIndex + itemsPerPage);




  const handleFile = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    } else {
      setFile(null);
    }
  };



  const TeachersOptions = teacherData.map((data: any) => ({
    value: data.id,
    label: `${data.first_name} ${data.last_name}`
  }));



  const SubjectsOptions = subjectData.map((data: any) => ({
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
    if (teacherName && subjectName && file != null) {
      CreateScheme(e)
    } else {
      showAlert()
      setMessage('A field is empty')
      setIsSuccess(false)
    }

  }


  const CreateScheme = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('teacher', teacherName)
    formData.append('student_class', studentClass)
    formData.append('term', termValue)
    formData.append('subject', subjectName)
    if (file) {
      formData.append('scheme', file)
    }



    try {
      const response = await fetch(`https://school.amanilightequity.com/api/scheme-of-work/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Scheme of work created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setTeacherName('')
        setSubjectName('')
        SchemeOFWorkFunction()
        setFile(null)




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



  const SchemeOFWorkFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/scheme-of-work-filter/?student_class=${studentClass}&term=${termValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {


      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setSchemeOfWorkData(sortedData)
      setSchemeOfWorkLoader(false)


    } else {
      setSchemeOfWorkLoader(false)
    }



  }



  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-scheme-of-work/', {
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
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        SchemeOFWorkFunction()
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

  const IndividualTerm = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/term/${termValue}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setTermDetails(data)
        console.log('data', data)
      }
    } catch {
      console.log('error')
    }

  }

  const IndividualClass = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/student-class/${studentClass}/`, {
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
    TeacherFunction()
    SubjectFunction()
    IndividualClass()
    IndividualTerm()
    setLoader(false)
    SchemeOFWorkFunction()

  }, [])


  useEffect(() => {
    if (showDeleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showDeleteModal]);








  return (
    <div>
      <div className="container-lg my-5 pt-2">

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
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Create  scheme of work <i className="bi bi-dash-lg"></i> 2</p>
              </div>

              <div className="p-3">
                {hasMounted && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Select Teacher<span className="text-danger">*</span> </label>
                        <Select
                          options={TeachersOptions}
                          value={TeachersOptions.find((opt: { value: string; label: string }) => opt.value === teacherName)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setTeacherName(selectedOption?.value || '')}
                          placeholder="Select teacher"
                          classNamePrefix="site-select"
                          styles={customStyles}  // ✅ Add this
                          isSearchable
                          isClearable
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Select Subject <span className="text-danger">*</span></label>
                        <Select
                          options={SubjectsOptions}
                          value={SubjectsOptions.find((opt: { value: string; label: string }) => opt.value === subjectName)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setSubjectName(selectedOption?.value || '')}
                          placeholder="Select subject"
                          classNamePrefix="site-select"
                          styles={customStyles}  // ✅ Add this
                          isSearchable
                          isClearable
                        />
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <label htmlFor="cv" className="form-label">Scheme of work</label>

                        <input
                          type="file"
                          id="cv"
                          {...register('passport')}
                          onChange={handleFile}
                          className="d-none"
                        />

                        <label htmlFor="cv" className="dropzone-box">
                          {
                            file ? (
                              <p>{file.name}</p>
                            ) : (
                              <p> click to select file</p>
                            )
                          }
                        </label>
                      </div>

                      <div className="col-12">
                        <p className="light-text sm-text italic-text">Note: This scheme you are about to upload will go to Scheme of work for {studentClassDetails && formatName(studentClassDetails?.name)} <i className="bi bi-dash-lg"></i>  {termDetails && formatName(termDetails?.name)} database</p>
                      </div>



                      <div className="col-12 mt-4">
                        <button type='submit' className='site-btn px-4'>
                          <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                          <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill pe-2"></i> Sumbit</span>
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
          <p className='text-center light-text pb-3'>Scheme of work for {studentClassDetails && formatName(studentClassDetails?.name)} <i className="bi bi-dash-lg"></i>  {termDetails && formatName(termDetails?.name)}</p>
          {schemeOfWorkLoader ? (
            <div className="site-boxes border-radius-10px p-5 d-flex justify-content-center">
              <div className="site-content-loader"></div>
            </div>
          ) : (
            <div>
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
                  <div className='site-boxes  site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>
                    <table className='overflow-auto light-text'>
                      <thead className='sm-text'>
                        <tr>
                          <th className='py-2'>
                            <label className="custom-checkbox cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedIDs.length === schemeOfWorkData.length && schemeOfWorkData.length > 0}
                                onChange={handleSelectAll}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </th>
                          <th>Subject</th>
                          <th>Scheme</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((data: any) => (
                            <tr key={data.id}>
                              <td className='py-3'>
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
                                {formatName(data.subject_name.name)}
                              </td>
                              <td>
                                <DownloadLink
                                  url={data.scheme}
                                  fileName={`${data.subject_name.name}__scheme.pdf`}
                                />
                              </td>
                              <td>
                                <div className="d-flex justify-content-end">
                                  <Link href={`/admin/scheme-of-work/individual/${data.id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
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

                  {schemeOfWorkData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(schemeOfWorkData.length / itemsPerPage)}
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
                      <p className='light-text md-text'>No scheme upload yet</p>
                      <p className="light-text">There is no  scheme of work right now. Upload above</p>
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

export default CreateShemeOfWork2