"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'

import { useRouter } from 'next/navigation'
import React, { use, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone';
import Link from 'next/link'
import { ProcessingSpiner } from '@/components/spin'
import Image from 'next/image'

const PayFees = ({ params }: { params: Promise<any> }) => {
  const { id } = use(params);

  interface FeeDetailsType {
    id: number
    amount: number
    term: string
    session: string
    student_class: string
    fee_choice: string
  }
  interface StudentDataType {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    [key: string]: any;
  }




  const [paymentMethodDetails, setPaymentMethodDetails] = useState<any>(null)
  const [bankAcountdDetails, setBankAcountdDetails] = useState<any[]>([])
  const [bankAccountLoading, setBankAccountLoading] = useState(true)
  const [loading, setLoading] = useState(true)

  const [generateFeeLoader, setGenerateFeeLoader] = useState(false)
  const [processText, setProcessText] = useState('')

  const [reciept, setReciept] = useState<File | null>(null)
  const [feeDetails, setFeeDetails] = useState<FeeDetailsType | null>(null)


  const [studentData, setStudentData] = useState<StudentDataType | null>(null)
  const [studentLoader, setStudentLoader] = useState(true)
  const router = useRouter();



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


  } = useContext(AllDataContext)!;





  const {

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

  const handleCancel = () => {
    setProcessText('Canceling payment')
    setGenerateFeeLoader(true)
    const timer = setTimeout(() => {
      router.push('/student/school-fees-payment/make-payment/step-1/')
    }, 5000);
    return () => clearTimeout(timer);
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImgFile,
    accept: {
      'image/*': []
    }
  });


  const IndividualPaymentFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/payment-method/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setPaymentMethodDetails(data)

        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }

  const IndividualBankAccountFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/bank-account/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setBankAcountdDetails(data)

        setBankAccountLoading(false)
      } else {
        setBankAccountLoading(false)
      }
    } catch {
      console.log('error')
      setBankAccountLoading(false)
    }

  }

  const onSubmit = (data: FormData, e: any) => {
    PayFeeDeyails(e)
  }

  const PayFeeDeyails = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('student', `${studentData?.id}`)
    formData.append('fee_type', `${feeDetails?.id}`)
    formData.append('payment_method', paymentMethodDetails?.id)
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
        setReciept(null)
        router.push('/student/school-fees-payment/make-payment/step-3')
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


  const GeneratePayment = async (e: any) => {
    e.preventDefault()
    setProcessText('Generating payment gatway')
    setGenerateFeeLoader(true)
    setDisableButton(true)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/initialize-payment/`, {
        method: 'POST',
        body: JSON.stringify({
          email: studentData?.email,
          amount: feeDetails?.amount,
        }),
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          'Content-Type': 'application/json',
        }
      })


      if (response.ok) {
        const data = await response.json();
        setGenerateFeeLoader(false)
        setDisableButton(false)
        window.open(data.payment_url, '_blank');



      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setIsSuccess(false)
        setGenerateFeeLoader(false)
        showAlert()
      }


    } catch (error) {
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setGenerateFeeLoader(false)

    }
  }


  const IndividualStudentFunction = async () => {

    const response = await fetch(`https://school.amanilightequity.com/api/students/${authTokens?.user_id}`, {
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
    IndividualPaymentFunction()
    IndividualBankAccountFunction()
  }, [])

  useEffect(() => {
    const storedFeeDetails = localStorage.getItem('schoolFeesDetails');
    setFeeDetails(storedFeeDetails ? JSON.parse(storedFeeDetails) : null);
    setGenerateFeeLoader(false)
  }, []);


  console.log(paymentMethodDetails?.name)

  return (
    <div>

      {(studentLoader || feeDetails === null || loading) ? (
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
            <Link href='/student/school-fees-payment/make-payment/step-1' className='site-link'><i className="ri-arrow-left-line me-2"></i>Previous page</Link>
          </div>

          {paymentMethodDetails.name === 'online payment' && (
            <div>
              {generateFeeLoader ? (
                <ProcessingSpiner text={processText} />
              ) : (
                <div className="row g-3 justify-content-center">
                  <div className="col-md-6">
                    <div className="site-boxes border-radius-10px">
                      <div className="border-bottom1 p-3">
                        <p className='text-center'>Fee payment summary</p>
                      </div>

                      <div className="px-3 py-4 light-text">
                        <div className="d-sm-flex justify-content-between pb-3 align-center">
                          <p className='sm-text'>Student name:</p>
                          <p className=''>{formatName(studentData?.first_name || '')} {formatName(studentData?.last_name || '')}</p>
                        </div>

                        <div className="d-sm-flex justify-content-between pb-3 align-center">
                          <p className='sm-text'>Email:</p>
                          <p>{studentData?.email}</p>
                        </div>


                        <div className="d-sm-flex justify-content-between pb-3 align-center">
                          <p className='sm-text'>Fee Type:</p>
                          <p>{formatName(feeDetails?.fee_choice || '')}</p>
                        </div>

                        <div className="d-sm-flex justify-content-between pb-3 align-center">
                          <p className='sm-text'>Class being paid for:</p>
                          <p>{formatName(feeDetails?.student_class || '')}</p>
                        </div>

                        <div className="d-sm-flex justify-content-between pb-3 align-center">
                          <p className='sm-text'>Term:</p>
                          <p>{formatName(feeDetails?.term || '')}</p>
                        </div>

                        <div className="d-sm-flex justify-content-between pb-3 align-center">
                          <p className='sm-text'>Session:</p>
                          <p>{feeDetails?.session}</p>
                        </div>
                      </div>

                    </div>



                  </div>

                  <div className="col-md-5">

                    <div className=" mb-4 site-boxes border-radius-10px p-3">
                      <div className="d-flex justify-content-between ">
                        <p className="sm-text">Amount to be paid</p>
                        <p>{formatCurrency(feeDetails.amount)} NGN</p>
                      </div>
                    </div>


                    <div className="site-boxes border-radius-10px mb-4" >
                      <div className="border-bottom1 p-3">
                        <p className='text-center'>Make Payment</p>
                      </div>


                      <div className="p-3">
                        <p className="light-text">If you have read, understood, and agreed to the terms, please proceed to make your payment by clicking the link below.</p>
                        <p className="light-text italic-text">Note: Once your payment is complete, return to this page and upload your payment receipt in the Finalize Payment section.</p>
                      </div>

                      <div className="px-3 pb-4 pt-2">

                        <button onClick={GeneratePayment} className="site-btn width-100">Pay now</button>
                      </div>
                    </div>

                  </div>

                  <div className="col-md-11">
                    <div className="site-boxes border-radius-10px">
                      <div className="border-bottom1 p-3">
                        <p className='text-center'>Finalize Payment</p>
                      </div>

                      <div className='mt- p-3'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="row g-4">
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
                              <p className="light-text italic-text sm-text pt-2">You will upload the reciept u get after making payment in the make payment box</p>
                              {errors.reciept && <p className="error-text">Passport is required</p>}
                            </div>

                            <div className="col-12 d-flex">
                              <div className='me-4'>
                                <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                                  <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                                  <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill me-2"></i> Submit</span>
                                </button>
                              </div>

                              <div>
                                <button onClick={handleCancel} className="site-delete-btn px-3 width-100"><i className="ri-close-circle-line pe-2"></i>Cancel</button>
                              </div>
                            </div>


                          </div>

                        </form>
                      </div>
                    </div>
                  </div>


                </div>
              )}
            </div>
          )}

          {paymentMethodDetails.name === 'bank transfer' && (

            <div>
              {bankAccountLoading ? (
                <div className="mt-5 pt-5">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="book-loader">
                      <div className="book red"></div>
                      <div className="book blue"></div>
                      <div className="book green"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>

                  <div className="row mt-4 mb-5 justify-content-center">
                    <div className="col-md-6">
                      <div className="site-boxes border-radius-10px">
                        <div className="border-bottom1 p-3">
                          <p className='text-center'>Fee payment summary</p>
                        </div>

                        <div className="px-3 py-4 light-text">
                          <div className="d-sm-flex justify-content-between pb-3 align-center">
                            <p className='sm-text'>Student name:</p>
                            <p className=''>{formatName(studentData?.first_name || '')} {formatName(studentData?.last_name || '')}</p>
                          </div>

                          <div className="d-sm-flex justify-content-between pb-3 align-center">
                            <p className='sm-text'>Email:</p>
                            <p>{studentData?.email}</p>
                          </div>


                          <div className="d-sm-flex justify-content-between pb-3 align-center">
                            <p className='sm-text'>Fee Type:</p>
                            <p>{formatName(feeDetails?.fee_choice || '')}</p>
                          </div>

                          <div className="d-sm-flex justify-content-between pb-3 align-center">
                            <p className='sm-text'>Class being paid for:</p>
                            <p>{formatName(feeDetails?.student_class || '')}</p>
                          </div>

                          <div className="d-sm-flex justify-content-between pb-3 align-center">
                            <p className='sm-text'>Term:</p>
                            <p>{formatName(feeDetails?.term || '')}</p>
                          </div>

                          <div className="d-sm-flex justify-content-between pb-3 align-center">
                            <p className='sm-text'>Session:</p>
                            <p>{feeDetails?.session}</p>
                          </div>

                          <div className="d-sm-flex justify-content-between pb-3 align-center">
                            <p className='sm-text'>Amount to be paid:</p>
                            <p className='white-text font-bold'>{formatCurrency(feeDetails.amount)} NGN</p>
                          </div>
                        </div>

                      </div>



                    </div>
                  </div>

                  <div className='text-center pt-4'>
                    <h4>School Bank Account</h4>
                    <p className='light-text'>Below are various school account where payment can be made </p>
                    <p className="light-text sm-text italic-text">Note: After transfer or paying in bank you will bring the reciept to the bursary department so it can be uploaded in our database</p>
                  </div>




                  <div className='mt-5'>
                    <div className="row g-3">
                      {bankAcountdDetails.length > 0 ? (
                        bankAcountdDetails.map((data: any) => (
                          <div className="col-md-6" key={data.id}>
                            <div className="site-boxes border-radius-10px">
                              <div className="row p-4">
                                <div className="cursor-pointer col-11">
                                  <div className="d-flex align-center">
                                    <div className="pe-4 border-right-dotted">
                                      <img className='border-radius-50' width='70px' src={data.bank_img} alt="" />
                                    </div>

                                    <h5 className="ps-4">{data.bank_name}</h5>
                                  </div>

                                </div>

                                <div className={`col-12 p-3 `}>
                                  <div className="d-flex flex-wrap">
                                    <div className='me-4'>
                                      <p><span className="light-text">Account Name:</span> {data.account_name}</p>
                                    </div>

                                    <div>
                                      <p><span className="light-text">Account Number:</span> {data.account_number}</p>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 ">
                          <div className='site-boxes text-center pb-5 d-flex justify-content-center align-items-center  mt-5 pt-5'>
                            <div>
                              <Image src="/img/icon/thinking.png" alt="empty" width={100} height={100} />
                              <p className='light-text md-text'>No details available</p>
                              <p className="light-text">There is no  details right now. Check again later</p>
                            </div>

                          </div>

                        </div>
                      )}

                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {paymentMethodDetails.name === 'cash payment' && (
            <div className='row g-3 justify-content-center'>
              <div className="col-md-6">
                <div className="site-boxes border-radius-10px">
                  <div className="border-bottom1 p-3">
                    <p className='text-center'>Fee payment summary</p>
                  </div>

                  <div className="px-3 py-4 light-text">
                    <div className="d-sm-flex justify-content-between pb-3 align-center">
                      <p className='sm-text'>Student name:</p>
                      <p className=''>{formatName(studentData?.first_name || '')} {formatName(studentData?.last_name || '')}</p>
                    </div>

                    <div className="d-sm-flex justify-content-between pb-3 align-center">
                      <p className='sm-text'>Email:</p>
                      <p>{studentData?.email}</p>
                    </div>


                    <div className="d-sm-flex justify-content-between pb-3 align-center">
                      <p className='sm-text'>Fee Type:</p>
                      <p>{formatName(feeDetails?.fee_choice || '')}</p>
                    </div>

                    <div className="d-sm-flex justify-content-between pb-3 align-center">
                      <p className='sm-text'>Class being paid for:</p>
                      <p>{formatName(feeDetails?.student_class || '')}</p>
                    </div>

                    <div className="d-sm-flex justify-content-between pb-3 align-center">
                      <p className='sm-text'>Term:</p>
                      <p>{formatName(feeDetails?.term || '')}</p>
                    </div>

                    <div className="d-sm-flex justify-content-between pb-3 align-center">
                      <p className='sm-text'>Session:</p>
                      <p>{feeDetails?.session}</p>
                    </div>

                    <div className="d-sm-flex justify-content-between pb-3 align-center">
                      <p className='sm-text'>Amount to be paid:</p>
                      <p className='white-text font-bold'>{formatCurrency(feeDetails.amount)} NGN</p>
                    </div>
                  </div>

                </div>



              </div>

              <div className="col-md-6">
                <div className="site-boxes border-radius-10px">
                  <div className="border-bottom1 p-3">
                    <p className='text-center'>Instructions</p>
                  </div>

                  <div className="px-3 py-4 light-text">
                    <p className="font-bold pb-2">You have selected the Cash Payment option.</p>
                    <p className='pb-2'>To proceed with this method, you are required to visit the school premises in person. Kindly report to the Bursary Department, where you will be guided through the next steps to complete your payment.</p>
                    <p className='pb-2'>Please ensure you come along with any necessary identification or documentation related to your payment.</p>
                    <p className='pb-2'>For further inquiries, assistance, or clarification, feel free to contact our support team. We’re here to help and ensure a smooth payment experience for you.</p>
                    <p className="pb-2">Thanks For Understanding!!!</p>
                  </div>

                </div>



              </div>


            </div>
          )}



        </div>
      )}

    </div>
  )
}

export default PayFees