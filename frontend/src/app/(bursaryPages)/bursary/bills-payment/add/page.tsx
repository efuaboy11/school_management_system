"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import ThemeContext from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select';
import { useDropzone } from 'react-dropzone'

const PayBills = () => {
  const [bills, setBills] = useState('')
  const [student, setStudent] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [reciept, setReciept] = useState<File | null>(null)
  const [status, setStatus] = useState('')


  const [isClient, setIsClient] = useState(false);
  const { theme } = useContext(ThemeContext)!;
  useEffect(() => {
    setIsClient(true);
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
    PaymentMethodFunction,
    paymentMethodData,

    billsData,
    BillsFunction,

    studentData,
    StudentFunction

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
    PayFeeDeyails(e)
  }

  const PayFeeDeyails = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('student', student)
    formData.append('payment_method', paymentMethod)
    formData.append('bill', bills)
    formData.append('payment_method', paymentMethod)
    formData.append('status', status)
    if (reciept) {
      formData.append('bill_receipt', reciept as any)
    }



    try {
      const response = await fetch(`https://school.amanilightequity.com/api/bills-payment/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Payment sucessful')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setPaymentMethod('')
        setReciept(null)
        setPaymentMethod('')
        setStatus('')
        setStudent('')
        setBills('')


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
    PaymentMethodFunction()
    StudentFunction()
    BillsFunction()
  }, [])





  return (
    <div>

      <div className="container-lg  pt-5 mb-5 pb-4">
        <div className='row justify-content-center'>
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 p-3">
                <p className='text-center'>Bils Payment</p>
              </div>

              <div className='mt- p-3'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-4">

                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Select Student <span className="text-danger">*</span></label>
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

                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">Bill Type <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.bills ? 'error-input' : ''}`} {...register('bills', { required: true })} value={bills} onChange={(e) => setBills(e.target.value)}>
                        <option value="">Select</option>
                        {billsData?.map((data: any) => (
                          <option key={data.id} value={data.id}>{data.bill_name}</option>
                        ))}
                      </select>
                      {errors.bills && <p className="error-text">This field is required</p>}
                    </div>


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

                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">Status <span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.status ? 'error-input' : ''}`} {...register('status', { required: true })} value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approve</option>
                        <option value="declined">Declined</option>
                      </select>
                      {errors.status && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-xxl-5">
                      <label className="form-label">Reciept <span className="text-danger">*</span></label>

                      <div {...getRootProps({ className: 'dropzone-box' })}>
                        <input {...getInputProps()} />

                        {reciept ? (
                          <div className="preview-box">
                            <img
                              src={URL.createObjectURL(reciept)}
                              alt="Selected reciept"
                              className="preview-image"
                            />
                            <p className="file-name">{reciept.name}</p>
                          </div>
                        ) : (
                          <p className="m-0">Drag & drop reciept here, or click to select file</p>
                        )}
                      </div>

                      {errors.reciept && <p className="error-text">Passport is required</p>}
                    </div>

                    <div className="col-12">
                      <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                        <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                        <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill me-2"></i> Submit</span>
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
  )
}

export default PayBills