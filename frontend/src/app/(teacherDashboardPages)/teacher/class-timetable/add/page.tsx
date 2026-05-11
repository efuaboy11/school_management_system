"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import ThemeContext from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import Select from 'react-select';

const CreateClassTImetable = () => {

  const [studentClass, setStudentClass] = useState('')
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
    StudentClassFunction,
  } = useContext(AllDataContext)!;

  const { theme } = useContext(ThemeContext)!;



  const {
    register,
    handleSubmit,

  } = useForm<any>();



  const handleFile = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    } else {
      setFile(null);
    }
  };





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
    CreatClassTimetable(e)
  }


  const CreatClassTimetable = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('teacher', `${authTokens?.user_id}`)
    formData.append('student_class', studentClass)
    if (file) {
      formData.append('class_timetable', file)
    }



    try {
      const response = await fetch(`https://school.amanilightequity.com/api/class-timetable/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Class timetable created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setStudentClass('')
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

  useEffect(() => {
    StudentClassFunction()
  }, [])







  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Create  class timetable</p>
              </div>

              <div className="p-3">
                {hasMounted && (
                  <form onSubmit={handleSubmit(onSubmit)}>
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



                      <div className="col-lg-3 col-md-6">
                        <label htmlFor="cv" className="form-label">Timetable File</label>

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
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateClassTImetable