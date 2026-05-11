"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import ThemeContext from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import Select from 'react-select';


const CreateSchoolFees = () => {
  const [feeType, setFeeType] = useState('')
  const [student, setStudent] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [reciept, setReciept] = useState<File | null>(null)



  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { theme } = useContext(ThemeContext)!;

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
    StudentClassFunction,

    TermFunction,


    SessionFunction,

    schoolFeesData,
    paymentMethodData,
    PaymentMethodFunction,
    studentData,
    StudentFunction,
    SchoolFeesFunction
  } = useContext(AllDataContext)!;




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();


  const studentOptions = studentData.map((data: any) => ({
    value: data.id,
    label: `${data.first_name} ${data.last_name}`
  }));

  const feeTypeOptions = schoolFeesData.map((data: any) => ({
    value: data.id,
    label: `${data.student_class_name.name} -   ${data.fee_choice} ${data.term_name.name} ${data.session_name.name}`
  }));

  const handleImgFile = (files: File[]) => {
    if (files.length > 0) {
      setReciept(files[0]);
    } else {
      setReciept(null);
    }
  };


  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImgFile,
    accept: {
      'image/*': []
    }
  });

  const onSubmit = (data: FormData, e: any) => {
    CreatBill(e)
  }


  const CreatBill = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('fee_choice', feeType)
    formData.append('student', student)
    formData.append('payment_method', paymentMethod)
    // formData.append('reciept', reciept)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/school-fees/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('School fees bill created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setFeeType('')
        setPaymentMethod('')
        setStudent('')


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
    PaymentMethodFunction()
    StudentFunction()
    SchoolFeesFunction()
  }, [])




  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Pay school fees bill</p>
              </div>

              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Select Student </label>
                      {isClient && (
                        <Select
                          options={studentOptions}
                          value={studentOptions.find((opt: { value: string; label: string }) => opt.value === student)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setStudent(selectedOption?.value || '')}
                          placeholder="Select fee type"
                          classNamePrefix="site-select"
                          styles={customStyles}
                          isSearchable
                          isClearable
                        />
                      )}
                    </div>

                    {isClient && (
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Select Fee Type </label>
                        <Select
                          options={feeTypeOptions}
                          value={feeTypeOptions.find((opt: { value: string; label: string }) => opt.value === feeType)}
                          onChange={(selectedOption: { value: string; label: string } | null) => setFeeType(selectedOption?.value || '')}
                          placeholder="Select fee type"
                          classNamePrefix="site-select"
                          styles={customStyles}  // ✅ Add this
                          isSearchable
                          isClearable
                        />
                      </div>
                    )}





                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">Payment Method <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.paymentMethod ? 'error-input' : ''}`} {...register('paymentMethod', { required: true })} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="">Select</option>
                        {paymentMethodData?.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      {errors.paymentMethod && <p className="error-text">This field is required</p>}
                    </div>


                    <div className="col-md-3">
                      <label className="form-label">Reciept <span className="text-danger">*</span></label>

                      <div {...getRootProps({ className: 'dropzone-box' })}>
                        <input {...getInputProps()} />

                        {reciept ? (
                          <div className="preview-box">
                            <img
                              src={URL.createObjectURL(reciept)}
                              alt="Selected Passport"
                              className="preview-image"
                            />
                            <p className="file-name">{reciept.name}</p>
                          </div>
                        ) : (
                          <p className="m-0">Drag & drop passport here, or click to select file</p>
                        )}
                      </div>

                      {errors.passport && <p className="error-text">Passport is required</p>}
                    </div>


                    <div className="col-12">
                      <div className='mb-3'>
                        <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                          <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                          <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill me-2"></i> Submit</span>
                        </button>
                      </div>

                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateSchoolFees