"use client"
import AuthContext from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react'
import { Pagination, Stack } from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import AllDataContext from '@/context/AllData';
import ThemeContext from '@/context/ThemeContext';

const DisableStudentAccount = () => {

  const [Loading, setLoading] = useState(true)
  const [datas, setDatas] = useState<any[]>([])
  const [dataCount, setDataCount] = useState(0)
  const [deleteModal, setDeleteModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);

  const [diactivateModal, setDiactivateModal] = useState(false)

  const [student, setStudent] = useState('')
  const [reason, setReason] = useState('')

  const [messageError, setMessageError] = useState(false)

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

  } = useContext(AuthContext)!;

  const { theme } = useContext(ThemeContext)!;

  const {
    studentData,
    StudentFunction

  } = useContext(AllDataContext)!




  const StudentDisableAccountList = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/disable-account/?=user_role=student`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setDatas(data)
        if (Array.isArray(data) && data.length > 0) {
          setDataCount(data.length)
        }
        console.log('data', data)

        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }

  const deleteFunction = async () => {

    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/disable-account/${selectedDataId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Account Activated')
        StudentDisableAccountList()
        setDeleteModal(false)
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setLoader(false)
        setDisableButton(false)
        showAlert()
        setIsSuccess(false)
        setIsSuccess(true)
        setDisableButton(false)
      }

    } catch {
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)
      setLoader(false)

    }
  }

  useEffect(() => {
    StudentDisableAccountList()
  }, [])

  useEffect(() => {
    if (deleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [deleteModal]);


  useEffect(() => {
    if (diactivateModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [diactivateModal]);

  useEffect(() => {
    StudentFunction()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();


  const itemsPerPage = 5;
  const [page, setPage] = useState(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const current = datas.slice(startIndex, startIndex + itemsPerPage);

  const handleShowDeleteModal = (id: any) => {
    setDeleteModal(true)
    setSelectedDataId(id)
  }
  const handleClosedeleteModal = () => {
    setDeleteModal(false)
  }


  const handlesShowDiactivateModal = () => {
    setDiactivateModal(true)
  }
  const handlesCloseDiactivateModal = () => {
    setDiactivateModal(false)
  }

  const options = studentData.map((student: any) => ({
    value: student.id,
    label: `${student.first_name} ${student.last_name}`
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



  const onSubmit = () => {
    if (student === '') {
      setMessageError(true)
    } else {
      DisableUserAccountFunction()
    }

  }

  console.log(student)

  const DisableUserAccountFunction = async () => {

    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/disable-account/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: student,
          reason: reason,
        })
      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Account Disabled')
        StudentDisableAccountList()
        setStudent('')
        setReason('')
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setLoader(false)
        setDisableButton(false)
        showAlert()
        setIsSuccess(false)
        setIsSuccess(true)
        setDisableButton(false)
      }

    } catch {
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)
      setLoader(false)

    }
  }

  return (
    <div>

      {diactivateModal && (
        <section className={` ${diactivateModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div>
                      <div className="d-flex justify-content-between pb-2">
                        <p className='font-size-20px '>Disable User Account</p>
                        <div onClick={handlesCloseDiactivateModal} className='cursor-pointer'>
                          <i className="ri-close-line md-text"></i>
                        </div>
                      </div>


                      <div className='pt-4'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="row g-3">
                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">Select Student </label>
                              <Select
                                options={options}
                                value={options.find((opt: { value: string; label: string }) => opt.value === student)}
                                onChange={(selectedOption: { value: string; label: string } | null) => setStudent(selectedOption?.value || '')}
                                placeholder="Select Student"
                                classNamePrefix="site-select"
                                styles={customStyles}  // ✅ Add this
                                isSearchable
                                isClearable
                              />

                              {messageError && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">Reason </label>
                              <textarea rows={6} className={`site-input ${errors.reason ? 'error-input' : ''}`} {...register('reason', { required: true })} value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
                              {errors.reason && <p className="error-text">This field is required</p>}

                            </div>

                            <div className="col-12 mt-4">
                              <button type='submit' className='site-btn px-4'>
                                <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                                <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill pe-2"></i> Sumbit</span>
                              </button>

                            </div>
                          </div>

                        </form>
                      </div>

                    </div>

                  </div>
                </div>
              </div>


            </div>

          </div>
        </section>
      )}

      {deleteModal && (
        <section className={` ${deleteModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div className="d-flex justify-content-center text-center">
                      <div>
                        <Image src="/img/icon/user.png" alt="empty" width={100} height={100} />
                        <p className='md-text mt-3'>Enable student account?</p>
                        <p className="light-text">This will enable the student account. The student will be able to login and access student dashboard</p>
                        <div className='pt-4'>
                          <button className="site-sucecssful-inverse-btn px-3 me-2 width-100 mb-4" onClick={deleteFunction} disabled={disableButton}>
                            <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                            <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-user-follow-line pe-2"></i> Activate</span>
                          </button>
                          <button onClick={handleClosedeleteModal} className="site-btn site-cancel-btn px-3 width-100"><i className="ri-close-circle-line pe-2"></i>Cancel</button>
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
      <div className="container-lg">
        <div className="d-sm-flex justify-content-between align-center">
          <div>
            <p className="md-text">Disabled Student Account</p>
            <p className='light-text sm-text mb-4'>Total of {dataCount} student account disabled</p>
          </div>

          <div>
            <button onClick={handlesShowDiactivateModal} className='site-btn px-3'><i className="ri-user-forbid-line pe-2"></i>Disable Account</button>
          </div>
        </div>

        <div className='mt-5 site-boxes site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>


          {Loading ? (
            <div className='d-flex justify-content-center py-5'>
              <div className="site-content-loader"></div>
            </div>
          ) : (
            <div>
              <table className="overflow-auto light-text">
                <thead className='sm-text'>
                  <tr>
                    <th className='py-1'>Name</th>
                    <th>Reason</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {current.length > 0 ? (
                    current.map((data) => (
                      <tr key={data.id}>
                        <td className='py-2'>{formatName(data.user_details.first_name)} {formatName(data.user_details.last_name)}   </td>
                        <th>{data.reason}</th>
                        <td className='cursor-pointer' onClick={() => handleShowDeleteModal(data.id)}><i className="ri-delete-bin-line"></i></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-4">No details available</td>
                    </tr>
                  )}

                </tbody>
              </table>

              {datas.length > 10 && (
                <div>
                  <div className="mt-4">
                    <Stack spacing={2} alignItems="end">
                      <Pagination
                        count={Math.ceil(datas.length / itemsPerPage)}
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
                </div>
              )}
            </div>
          )}
        </div>


      </div>
    </div>
  )
}

export default DisableStudentAccount