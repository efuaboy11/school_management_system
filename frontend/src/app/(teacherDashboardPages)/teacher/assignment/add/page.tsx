"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import ThemeContext from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useForm } from 'react-hook-form'
import Select from 'react-select';

const CreateAssignment = () => {
  const [studentClass, setStudentClass] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [assignmentCode, setAssignmentCode] = useState('')
  const [assignmentName, setAssignmentName] = useState('')
  const [points, setPoints] = useState('')
  const [dueDate, setDuedate] = useState('')
  const [instructions, setInstructions] = useState('')
  const [img, setImg] = useState<File | null>(null)
  const [file, setFile] = useState<File | null>(null)


  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  const {

    authTokens,

    loader,
    setLoader,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,




  } = useContext(AuthContext)!


  const {

    studentClassData,
    subjectData,
    StudentClassFunction,
    SubjectFunction
  } = useContext(AllDataContext)!;

  const { theme } = useContext(ThemeContext)!;



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

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




  const onSubmit = (data: FormData, e: any) => {
    CreatAssignment(e)
  }


  const CreatAssignment = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('teacher', `${authTokens?.user_id}`)
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
      const response = await fetch(`https://school.amanilightequity.com/api/assignment/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Assignment created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setStudentClass('')
        setSubjectName('')
        setAssignmentCode('')
        setAssignmentName('')
        setPoints('')
        setDuedate('')
        setFile(null)
        setImg(null)
        setInstructions('')



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
    SubjectFunction()
    StudentClassFunction()

  }, [])







  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Create  assignment</p>
              </div>

              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {hasMounted && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Select Class <span className="text-danger">*</span></label>
                        <Select
                          options={StudentClassOptions}
                          value={StudentClassOptions.find((opt: { value: string; label: string }) => opt.value === studentClass)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setStudentClass(selectedOption?.value || '')}
                          placeholder="Select"
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
                          placeholder="Select"
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
                  )}


                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAssignment