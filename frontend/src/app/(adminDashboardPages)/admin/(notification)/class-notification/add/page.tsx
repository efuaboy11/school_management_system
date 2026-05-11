"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import ThemeContext from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select';

const UploadSchoolNotificationPage = () => {
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationSubject, setNotificationSubject] = useState('')
  const [teacherValue, setTeacherValue] = useState('')
  const [studentClassValue, setStudentClassValue] = useState('')



  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  const {

    authTokens,

    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,




  } = useContext(AuthContext)!


  const {
    studentClassData,
    StudentClassFunction,

    teacherData,
    TeacherFunction
  } = useContext(AllDataContext)!;

  const { theme } = useContext(ThemeContext)!;



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: FormData, e: any) => {
    UploadNotification(e)
  }

  const TeachersOptions = teacherData.map((data: any) => ({
    value: data.id,
    label: `${data.first_name} ${data.last_name}`
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


  const UploadNotification = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('text', notificationMessage)
    formData.append('subject', notificationSubject)
    formData.append('teacher', teacherValue)
    formData.append('student_class', studentClassValue)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/class-notification/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('notification created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setNotificationMessage('')
        setNotificationSubject('')



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
    TeacherFunction()
  }, [])




  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Upload class Notifications</p>
              </div>

              <div className="p-3">
                {hasMounted && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">

                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Select Teacher<span className="text-danger">*</span> </label>
                        <Select
                          options={TeachersOptions}
                          value={TeachersOptions.find((opt: { value: string; label: string }) => opt.value === teacherValue)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setTeacherValue(selectedOption?.value || '')}
                          placeholder="Select"
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
                          value={StudentClassOptions.find((opt: { value: string; label: string }) => opt.value === studentClassValue)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setStudentClassValue(selectedOption?.value || '')}
                          placeholder="Select"
                          classNamePrefix="site-select"
                          styles={customStyles}  // ✅ Add this
                          isSearchable
                          isClearable
                        />
                      </div>



                      <div className="col-md-6">
                        <label htmlFor="phoneNumber" className="form-label">Subject<span className="text-danger">*</span></label>
                        <input className={`site-input ${errors.billName ? 'error-input' : ''}`} {...register('subject', { required: true })} value={notificationSubject} onChange={(e) => setNotificationSubject(e.target.value)} />
                        {errors.subject && <p className="error-text">This field is required</p>}
                      </div>

                      <div className='col-12'>
                        <label htmlFor="" className="p-2 d-block form-label">Message</label>
                        <textarea rows={6} className={`${errors.status ? 'error-input' : ''} d-block site-search-input`} {...register('notificationMessage', { required: true })} value={notificationMessage} onChange={(e) => setNotificationMessage(e.target.value)}>
                        </textarea>
                        {errors.notificationMessage && <span style={{ color: 'red' }}>This Feild is required</span>}
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className='pt-3'>
                        <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                          <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                          <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-upload-line me-2"></i>Add</span>
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

export default UploadSchoolNotificationPage