"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Link from 'next/link'
import { useDropzone } from 'react-dropzone'

const PayFees = () => {
  interface FeeDetailsType {
    id: number
    amount: number
    term: string
    session: string
    student_class: string
    fee_choice: string
  }
  interface StudentDataType {
    first_name: string;
    last_name: string;
    email: string;
    [key: string]: any;
  }

  const [paymentMethod, setPaymentMethod] = useState('')
  const [reciept, setReciept] = useState<File | null>(null)
  const [feeDetails, setFeeDetails] = useState<FeeDetailsType | null>(null)
  const [status, setStatus] = useState('')


  const [studentData, setStudentData] = useState<StudentDataType | null>(null)
  const [studentLoader, setStudentLoader] = useState(true)
  const router = useRouter();

  const storedStudent = typeof window !== "undefined" ? localStorage.getItem('student') : null
  // const parsedStudent = storedStudent ? JSON.parse(storedStudent) : null;




  const {
    authTokens,

    loader,
    setLoader,
    disableButton,
    setDisableButton,
    formatName,
    formatCurrency,


    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!


  const {
    PaymentMethodFunction,
    paymentMethodData,

  } = useContext(AllDataContext)!;




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

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
    PayFeeDeyails(e)
  }

  const PayFeeDeyails = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('student', `${storedStudent}`)
    formData.append('payment_method', paymentMethod)
    formData.append('fee_type', `${feeDetails?.id}`)
    formData.append('payment_method', paymentMethod)
    formData.append('status', status)
    if (reciept) {
      formData.append('fee_receipt', reciept as any)
    }



    try {
      const response = await fetch(`https://school.amanilightequity.com/api/payment-school-fees/`, {
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
        router.push('/bursary/school-fees-payment/add/step-3')
        localStorage.removeItem('schoolFeesDetails')
        localStorage.removeItem('student')


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

  const IndividualStudentFunction = async () => {

    const response = await fetch(`https://school.amanilightequity.com/api/students/${storedStudent}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    if (response.ok) {
      const data = await response.json()
      setStudentData(data as StudentDataType)
      setStudentLoader(false)


    } else {
      setStudentLoader(false)
    }



  }


  useEffect(() => {
    PaymentMethodFunction()
    IndividualStudentFunction()
  }, [])

  useEffect(() => {
    const storedFeeDetails = localStorage.getItem('schoolFeesDetails');
    setFeeDetails(storedFeeDetails ? JSON.parse(storedFeeDetails) : null);
  }, []);




  return (
    <div>

      {(studentLoader || feeDetails === null) ? (
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
        <div className="container-lg  pt-2 mb-5 pb-4">
          <div className='pb-4 '>
            <Link href='/admin/school-fees-payment/add/step-1' className='site-link'><i className="ri-arrow-left-line me-2"></i>Previous page</Link>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="site-boxes border-radius-10px">
                <div className="border-bottom1 p-3">
                  <p className='text-center'>Fee payment summary</p>
                </div>

                <div className="px-3 py-4 light-text">
                  <div className="d-sm-flex justify-content-between pb-3">
                    <p className='sm-text'>Student name:</p>
                    <p className=''>{formatName(studentData?.first_name || '')} {formatName(studentData?.last_name || '')}</p>
                  </div>

                  <div className="d-sm-flex justify-content-between pb-3">
                    <p className='sm-text'>Email:</p>
                    <p>{studentData?.email}</p>
                  </div>


                  <div className="d-sm-flex justify-content-between pb-3">
                    <p className='sm-text'>Fee Type:</p>
                    <p>{formatName(feeDetails?.fee_choice || '')}</p>
                  </div>

                  <div className="d-sm-flex justify-content-between pb-3">
                    <p className='sm-text'>Class being paid for:</p>
                    <p>{formatName(feeDetails?.student_class || '')}</p>
                  </div>

                  <div className="d-sm-flex justify-content-between pb-3">
                    <p className='sm-text'>Term:</p>
                    <p>{formatName(feeDetails?.term || '')}</p>
                  </div>

                  <div className="d-sm-flex justify-content-between pb-3">
                    <p className='sm-text'>Session:</p>
                    <p>{feeDetails?.session}</p>
                  </div>
                </div>

              </div>

              <div className=" mt-4 site-boxes border-radius-10px p-3">
                <div className="d-flex justify-content-between ">
                  <p className="sm-text">Amount to be paid</p>
                  <p>{formatCurrency(feeDetails.amount)} NGN</p>
                </div>
              </div>



            </div>

            <div className="col-md-5">
              <div className="site-boxes border-radius-10px">
                <div className="border-bottom1 p-3">
                  <p className='text-center'>Finalize Payment</p>
                </div>

                <div className='mt- p-3'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-4">
                      <div className="col-12">
                        <label htmlFor="firstName" className="form-label">Payment Method <span className="text-danger">*</span></label>
                        <select className={`site-input ${errors.paymentMethod ? 'error-input' : ''}`} {...register('paymentMethod', { required: true })} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                          <option value="">Select</option>
                          {paymentMethodData?.map((data: any) => (
                            <option key={data.id} value={data.id}>{data.name}</option>
                          ))}
                        </select>
                        {errors.paymentMethod && <p className="error-text">This field is required</p>}
                      </div>

                      <div className="col-12">
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
      )}

    </div>
  )
}

export default PayFees