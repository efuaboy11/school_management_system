"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import ThemeContext from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import Select from 'react-select';

const UploadResultPage = () => {
  const [studentID, setStudentID] = useState('')
  const [classID, setClassID] = useState('')
  const [termID, setTermID] = useState('')
  const [sessionID, setSessionID] = useState('')
  const router = useRouter();


  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  const {



    loader,
    setLoader,
    disableButton,


    setMessage,
    showAlert,
    setIsSuccess,




  } = useContext(AuthContext)!


  const {
    studentClassData,
    StudentClassFunction,

    studentData,
    StudentFunction,

    termData,
    TermFunction,

    sessionData,
    SessionFunction,

  } = useContext(AllDataContext)!;

  const { theme } = useContext(ThemeContext)!;



  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<any>();

  const onSubmit = () => {
    setLoader(true)
    if (studentID && classID && termID && sessionID) {
      router.push(`/result-officer/upload-result/${studentID}/${classID}/${termID}/${sessionID}`)
    } else {
      showAlert()
      setIsSuccess(false)
      setMessage('A feild is empty')
    }

  }
  console.log()

  const StudentDataOptions = studentData.map((data: any) => ({
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




  useEffect(() => {
    StudentClassFunction()
    TermFunction()
    SessionFunction()
    StudentFunction()
  }, [])




  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Upload Result <i className="bi bi-dash-lg"></i> step 1</p>
              </div>

              <div className="p-3">
                {hasMounted && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">

                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Select Student<span className="text-danger">*</span> </label>
                        <Select
                          options={StudentDataOptions}
                          value={StudentDataOptions.find((opt: { value: string; label: string }) => opt.value === studentID)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setStudentID(selectedOption?.value || '')}
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
                          value={StudentClassOptions.find((opt: { value: string; label: string }) => opt.value === classID)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setClassID(selectedOption?.value || '')}
                          placeholder="Select"
                          classNamePrefix="site-select"
                          styles={customStyles}  // ✅ Add this
                          isSearchable
                          isClearable
                        />
                      </div>



                      <div className="col-md-6">
                        <label htmlFor="phoneNumber" className="form-label">Term<span className="text-danger">*</span></label>
                        <select className={`site-input ${errors.term ? 'error-input' : ''}`} {...register('term', { required: true })} value={termID} onChange={(e) => setTermID(e.target.value)}>
                          <option value=""></option>
                          {termData.map((term) => (
                            <option value={term.id} key={term.id}>{term.name}</option>
                          ))}
                        </select>
                        {errors.term && <p className="error-text">This field is required</p>}
                      </div>


                      <div className="col-md-6">
                        <label htmlFor="phoneNumber" className="form-label">session<span className="text-danger">*</span></label>
                        <select className={`site-input ${errors.session ? 'error-input' : ''}`} {...register('session', { required: true })} value={sessionID} onChange={(e) => setSessionID(e.target.value)}>
                          <option value=""></option>
                          {sessionData.map((session) => (
                            <option value={session.id} key={session.id}>{session.name}</option>
                          ))}
                        </select>
                        {errors.session && <p className="error-text">This field is required</p>}
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className='pt-3'>
                        <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                          <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                          <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-upload-line me-2"></i>Upload</span>
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

export default UploadResultPage