"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import ThemeContext from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import Select from 'react-select';
import { useRouter } from 'next/navigation';

const CreateShemeOfWork1 = () => {
  const router = useRouter();
  const [studentClass, setStudentClass] = useState('')
  const [termValue, setTermValue] = useState('')

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const {

    loader,
    setLoader,


  } = useContext(AuthContext)!


  const {
    studentClassData,
    termData,


    StudentClassFunction,
    TermFunction,
  } = useContext(AllDataContext)!;

  const { theme } = useContext(ThemeContext)!;



  const {
    handleSubmit,
  } = useForm<any>();








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




  const onSubmit = () => {
    setLoader(true)
    router.push(`/admin/scheme-of-work/add/${termValue}/${studentClass}`)

  }


  useEffect(() => {
    StudentClassFunction()
    TermFunction()
  }, [])







  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Create  Scheme <i className="bi bi-dash-lg"></i> 1</p>
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
                          placeholder="Select class"
                          classNamePrefix="site-select"
                          styles={customStyles}  // ✅ Add this
                          isSearchable
                          isClearable
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="" className='form-label'>Term</label>
                        <select className={`site-input`} value={termValue} onChange={(e) => setTermValue(e.target.value)}>
                          <option value="">Select</option>
                          {termData.map((data: any) => (
                            <option key={data.id} value={data.id}>{data.name}</option>
                          ))}
                        </select>
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

export default CreateShemeOfWork1