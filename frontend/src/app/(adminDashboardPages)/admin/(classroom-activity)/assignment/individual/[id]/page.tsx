"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone';
import AllDataContext from '@/context/AllData';
import ThemeContext from '@/context/ThemeContext';
import Select from 'react-select';


const IndivivdualAssignment = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const {

    authTokens,
    formatDate,
    formatName,
    formateDateTime,


    loader,
    setLoader,
    disableButton,
    setDisableButton,
    handleDownload,

    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;

  const {
    teacherData,
    studentClassData,
    subjectData,

    TeacherFunction,
    StudentClassFunction,
    SubjectFunction
  } = useContext(AllDataContext)!;

  const { theme } = useContext(ThemeContext)!;

  const [Loading, setLoading] = useState(true)
  const [details, setDetails] = useState<any>(null)

  const [teacherName, setTeacherName] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [assignmentCode, setAssignmentCode] = useState('')
  const [assignmentName, setAssignmentName] = useState('')
  const [points, setPoints] = useState('')
  const [dueDate, setDuedate] = useState('')
  const [instructions, setInstructions] = useState('')
  const [img, setImg] = useState<File | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const [deleteModal, setDeleteModal] = useState(false)

  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const router = useRouter();

  const handleImgFile = (files: File[]) => {
    if (files.length > 0) {
      setImg(files[0]);
    } else {
      setImg(null);
    }
  };

  const handleFile = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    } else {
      setFile(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImgFile,
    accept: {
      'image/*': []
    }
  });

  const handleClosenModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleShowDeleteModal = () => {
    setDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false)
  }


  const TeachersOptions = teacherData.map((data: any) => ({
    value: data.id,
    label: `${data.first_name} ${data.last_name}`
  }));


  const SubjectsOptions = subjectData.map((data: any) => ({
    value: data.id,
    label: `${data.name}`
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





  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: any, e: any) => {
    if (studentClass && subjectName && teacherName) {
      EditDetails(e)
    } else {
      showAlert()
      setIsSuccess(false)
      setMessage('A feild is empty')
    }


  }

  const IndividualDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/assignment/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setDetails(data)
        console.log('data', data)

        setTeacherName(data?.teacher || '')
        setSubjectName(data?.subject || '')
        setStudentClass(data?.student_class || '')
        setAssignmentCode(data?.assignment_code || '')
        setAssignmentName(data?.assignment_name || '')
        setInstructions(data?.instructions)
        setPoints(data?.points || '')
        setDuedate(data?.due_date.split('T')[0] || '')
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }

  const deleteUserFunction = async () => {

    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/assignment/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        router.push('/admin/assignment')
        setDeleteModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Assignment  deleted')
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

  const EditDetails = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('teacher', teacherName)
    formData.append('student_class', studentClass)
    formData.append('subject', subjectName)
    formData.append('assignment_code', assignmentCode)
    formData.append('assignment_name', assignmentName)
    formData.append('points', points)
    formData.append('due_date', dueDate)
    formData.append('instructions', instructions)
    if (file) {
      formData.append('assignment_file', file)
    }
    if (img) {
      formData.append('assignment_photo', img)
    }



    try {
      const response = await fetch(`https://school.amanilightequity.com/api/assignment/${id}/`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Details updated successfully')
        setIsSuccess(true)
        setShowModal(false)
        IndividualDetailsFunction()
        setLoader(false)
        setDisableButton(false)

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


  useEffect(() => {
    if (showModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showModal]);

  useEffect(() => {
    TeacherFunction()
    StudentClassFunction()
    SubjectFunction()
    IndividualDetailsFunction()
  }, [])

  useEffect(() => {
    if (deleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [deleteModal]);



  return (
    <div>
      <div>
        {showModal && (
          <section className={` ${showModal ? 'overlay-background' : ''}`}>
            <div className='container-lg'>

              <div className=" row justify-content-center align-center2 height-90vh">

                <div className="col-md-8 col-sm-10 col-12">
                  <div className="site-modal-conatiner">
                    <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                      <div>
                        <div className="d-flex justify-content-between pb-2">
                          <p className='font-size-20px '>Edit Assignment</p>
                          <div onClick={handleClosenModal} className='cursor-pointer'>
                            <i className="ri-close-line md-text"></i>
                          </div>
                        </div>


                        <div className='pt-4'>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">Select Teacher<span className="text-danger">*</span> </label>
                                <Select
                                  options={TeachersOptions}
                                  value={TeachersOptions.find((opt: { value: string; label: string }) => opt.value === teacherName)}
                                  onChange={(selectedOption: { value: string; label: string } | null) => setTeacherName(selectedOption?.value || '')}
                                  placeholder="Select Student"
                                  classNamePrefix="site-select"
                                  styles={customStyles}  // ✅ Add this
                                  isSearchable
                                  isClearable
                                />
                              </div>


                              <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">Select Class <span className="text-danger">*</span></label>
                                <Select
                                  options={StudentClassOptions}
                                  value={StudentClassOptions.find((opt: { value: string; label: string }) => opt.value === studentClass)}
                                  onChange={(selectedOption: { value: string; label: string } | null) => setStudentClass(selectedOption?.value || '')}
                                  placeholder="Select Student"
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
                                  placeholder="Select Student"
                                  classNamePrefix="site-select"
                                  styles={customStyles}  // ✅ Add this
                                  isSearchable
                                  isClearable
                                />
                              </div>

                              <div className="col-md-6">
                                <label htmlFor="assignmentCode" className="form-label">Assignment Code <span className="text-danger">*</span></label>
                                <input type="text" className={`site-input ${errors.assignmentCode ? 'error-input' : ''}`} {...register('assignmentCode', { required: true })} placeholder='assignmentCode' value={assignmentCode} onChange={(e) => setAssignmentCode(e.target.value)} />
                                {errors.assignmentCode && <p className="error-text">This field is required</p>}
                              </div>


                              <div className="col-md-6">
                                <label htmlFor="assignmentName" className="form-label">Assignment Name<span className="text-danger">*</span></label>
                                <input type="text" className={`site-input ${errors.assignmentName ? 'error-input' : ''}`} {...register('assignmentName', { required: true })} placeholder='assignmentName' value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} />
                                {errors.assignmentName && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="col-md-6">
                                <label htmlFor="points" className="form-label">Points <span className="text-danger">*</span></label>
                                <input type="text" className={`site-input ${errors.points ? 'error-input' : ''}`} {...register('points', { required: true, })} placeholder='points' value={points} onChange={(e) => setPoints(e.target.value)} />
                                {errors.points && <p className="error-text">This field is required</p>}
                              </div>


                              <div className="col-md-6">
                                <label htmlFor="points" className="form-label">Due Date <span className="text-danger">*</span></label>
                                <input type="date" className={`site-input ${errors.dueDate ? 'error-input' : ''}`} {...register('dueDate', { required: true, })} placeholder='dueDate' value={dueDate} onChange={(e) => setDuedate(e.target.value)} />
                                {errors.dueDate && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="col-md-12">
                                <label htmlFor="instructions" className="form-label">instructions</label>
                                <textarea rows={6} className={`site-input ${errors.instructions ? 'error-input' : ''}`} {...register('instructions', { required: true })} value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder='Instuctions'></textarea>
                                {errors.instructions && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="col-md-3">
                                <label className="form-label">Assignment Image</label>

                                <div {...getRootProps({ className: 'dropzone-box' })}>
                                  <input {...getInputProps()} />

                                  {img ? (
                                    <div className="preview-box">
                                      <img
                                        src={URL.createObjectURL(img)}
                                        alt="Selected img"
                                        className="preview-image"
                                      />
                                      <p className="file-name">{img.name}</p>
                                    </div>
                                  ) : (
                                    <p className="m-0">Drag & drop img here, or click to select file</p>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-3 col-md-6">
                                <label htmlFor="cv" className="form-label">Assignment File</label>

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
                          <Image src="/img/icon/warning.png" alt="empty" width={100} height={100} />
                          <p className='md-text mt-3'>Are you sure?</p>
                          <p className="light-text">This action cannot be undone. This user  will be deleted from the database.</p>
                          <div className='pt-4'>
                            <button className="site-delete-btn px-3 me-2 width-100 mb-4" onClick={deleteUserFunction} disabled={disableButton}>
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

        <div>

          {Loading ? (
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

            <div className="container-lg mb-5">
              {details ? (
                <div className="row justify-content-center pt-5">
                  <div className="col-lg-9">
                    <div className="row g-3 justify-content-center">

                      <div className="col-sm-5">
                        <div className="site-boxes border-radius-10px py-3">
                          <div className="border-bottom1 p-3">
                            <p>Assignment File</p>
                          </div>

                          {details.assignment_file ? (
                            <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer" onClick={() => handleDownload(details.assignment_file, `Assignment_${details.assignment_code}.pdf`)}>
                              <p className='light-text text-center'>Click here to download </p>
                            </div>
                          ) : (
                            <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer">
                              <p className='light-text text-center'>No file attached </p>
                            </div>
                          )}



                        </div>
                      </div>

                      <div className="col-sm-5">
                        <div className="site-boxes border-radius-10px py-3">
                          <div className="border-bottom1 p-3">
                            <p>Assignment Photo</p>
                          </div>

                          {details.assignment_photo ? (
                            <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer" onClick={() => handleDownload(details.assignment_photo, `Assignment_${details.assignment_code}.jpg`)}>
                              <p className='light-text text-center'>Click here to download </p>
                            </div>
                          ) : (
                            <div className="site-light-boxes px-3 py-4 m-3 cursor-pointer">
                              <p className='light-text text-center'>No image attached </p>
                            </div>
                          )}



                        </div>
                      </div>

                      <div className="col-md-11">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1  d-flex justify-content-end">
                            <div className="d-flex p-3">
                              <div className="me-3">
                                <button onClick={handleShowModal} className='site-inverse-btn px-3'><i className="ri-edit-line"></i><span className="ms-2 d-none d-md-inline">Edit</span></button>
                              </div>

                              <div>
                                <button onClick={handleShowDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line "></i><span className="ms-2 d-none d-md-inline">Delete</span></button>
                              </div>
                            </div>

                          </div>

                          <div className='light-text p-3'>
                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Teachers Name</p>
                              <p>{formatName(details.teacher_name.first_name)} {formatName(details.teacher_name.last_name)}</p>
                            </div>


                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Class</p>
                              <p>{formatName(details.student_class_name.name)}</p>
                            </div>


                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Subject</p>
                              <p>{formatName(details.subject_name.name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Assignment Name</p>
                              <p>{formatName(details.assignment_name)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Assignment Code</p>
                              <p>{details.assignment_code}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Due Date</p>
                              <p>{formatDate(details.due_date)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Date given</p>
                              <p>{formateDateTime(formateDateTime(details.date))}</p>
                            </div>


                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1">
                            <div className="p-3">
                              <p>instructions</p>
                            </div>

                          </div>
                          <div className='p-3'>
                            {details.instructions ? (
                              <p className='light-text'>{details.instructions}</p>
                            ) : (
                              <p className="light-text">No instructions Placed</p>
                            )}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='mt-5 site-boxes border-radius-10px text-center pb-3 d-flex justify-content-center align-items-center  mt-4 pt-3'>
                  <div>
                    <Image src="/img/icon/thinking.png" alt="empty" width={70} height={70} />
                    <p className='light-text md-text'>No details available</p>
                    <p className="light-text">Details not avalaible. Check again later</p>
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

export default IndivivdualAssignment