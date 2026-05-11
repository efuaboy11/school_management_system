"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import ThemeContext from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useForm } from 'react-hook-form'
import Select from 'react-select';

const CreateAssignmentSubmission = () => {
  const [teacherName, setTeacherName] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [assignmentCode, setAssignmentCode] = useState('')
  const [note, setNote] = useState('')
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
    teacherData,

    subjectData,

    TeacherFunction,
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

  const { getRootProps, getInputProps, } = useDropzone({
    onDrop: handleImgFile,
    accept: {
      'image/*': []
    }
  });

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
    CreatAssignment(e)
  }


  const CreatAssignment = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('student', `${authTokens?.user_id}`)
    formData.append('teacher_assignment', teacherName)
    formData.append('subject', subjectName)
    formData.append('assignment_code', assignmentCode)
    formData.append('assignment_note', note)

    if (file) {
      formData.append('submission_file', file)
    }
    if (img) {
      formData.append('submission_photo', img)
    }



    try {
      const response = await fetch(`https://school.amanilightequity.com/api/assignment-submission/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Assignment submitted')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setTeacherName('')
        setSubjectName('')
        setAssignmentCode('')
        setFile(null)
        setImg(null)
        setNote('')



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
    TeacherFunction()
    StudentClassFunction()

  }, [])







  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Submit  assignment</p>
              </div>

              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {hasMounted && (
                    <div className="row g-3">
                      <div className="col-12">
                        <label htmlFor="lastName" className="form-label">Select Teacher<span className="text-danger">*</span> </label>
                        <Select
                          options={TeachersOptions}
                          value={TeachersOptions.find((opt: { value: string; label: string }) => opt.value === teacherName)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setTeacherName(selectedOption?.value || '')}
                          placeholder="Select"
                          classNamePrefix="site-select"
                          styles={customStyles}  // ✅ Add this
                          isSearchable
                          isClearable
                        />
                        <p className="light-text sm-text italic-text pt-2">Select the teacher you want to submit this assignment to</p>
                      </div>





                      <div className="col-12">
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
                        <p className="light-text sm-text italic-text pt-2">Select the subject assignment you want to submit</p>
                      </div>

                      <div className="col-12">
                        <label htmlFor="assignmentCode" className="form-label">Assignment Code <span className="text-danger">*</span></label>
                        <input type="text" className={`site-input ${errors.assignmentCode ? 'error-input' : ''}`} {...register('assignmentCode', { required: true })} placeholder='assignmentCode' value={assignmentCode} onChange={(e) => setAssignmentCode(e.target.value)} />
                        <p className="light-text sm-text italic-text pt-2">Enter Assignment Code given by your teacher or check your assignment page for the asignment code</p>
                        {errors.assignmentCode && <p className="error-text">This field is required</p>}
                      </div>



                      <div className="col-md-12">
                        <label htmlFor="note" className="form-label">Submission Note</label>
                        <textarea rows={6} className={`site-input ${errors.note ? 'error-input' : ''}`} {...register('note')} value={note} onChange={(e) => setNote(e.target.value)} placeholder='Instuctions'></textarea>
                        <p className="light-text sm-text italic-text pt-2">Any note about the assignment</p>

                      </div>

                      <div className="col-md-4">
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

                      <div className="col-lg-3 col-12">
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

export default CreateAssignmentSubmission