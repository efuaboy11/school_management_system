"use client"
import AuthContext from '@/context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const SendBulkEmailPage = () => {

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





  const [subject, setSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const [emailList, setEmailList] = useState<string[]>([])

  const [studentEmails, setStudentEmails] = useState<string[]>([])
  const [teacherEmails, setTeacherEmails] = useState<string[]>([])
  const [bursaryEmails, setBursaryEmails] = useState<string[]>([])
  const [resultOfficerEmails, setResultOfficerEmails] = useState<string[]>([])
  const [staffEmails, setStaffEmails] = useState<string[]>([])
  const [allUserEmails, setAllUserEmails] = useState<string[]>([])

  const [studentEmailChecked, setStudentEmailChecked] = useState(false)
  const [teacherEmailChecked, setTeacherEmailChecked] = useState(false)
  const [bursaryEmailChecked, setBursaryEmailChecked] = useState(false)
  const [resultOfficerEmailChecked, setResultOfficerEmailChecked] = useState(false)
  const [staffEmailChecked, setStaffEmailChecked] = useState(false)
  const [allUserEmailChecked, setAllUserEmailChecked] = useState(false)

  console.log('emailList:', emailList);

  const HandleStudentEmailCheck = (e: any) => {
    setStudentEmailChecked(e.target.checked)
    if (e.target.checked) {
      setEmailList((prev: any) => [...prev, ...studentEmails])
    } else {
      setEmailList((prev: any) => prev.filter((email: any) => !studentEmails.includes(email)))
    }
  }

  const HandleTeacherEmailCheck = (e: any) => {
    setTeacherEmailChecked(e.target.checked)
    if (e.target.checked) {
      setEmailList((prev: any) => [...prev, ...teacherEmails])
    } else {
      setEmailList((prev: any) => prev.filter((email: any) => !teacherEmails.includes(email)))
    }
  }

  const HandleBursaryEmailCheck = (e: any) => {
    setBursaryEmailChecked(e.target.checked)
    if (e.target.checked) {
      setEmailList((prev: any) => [...prev, ...bursaryEmails])
    } else {
      setEmailList((prev: any) => prev.filter((email: any) => !bursaryEmails.includes(email)))
    }
  }

  const HandleResultOfficerEmailCheck = (e: any) => {
    setResultOfficerEmailChecked(e.target.checked)
    if (e.target.checked) {
      setEmailList((prev: any) => [...prev, ...resultOfficerEmails])
    } else {
      setEmailList((prev: any) => prev.filter((email: any) => !resultOfficerEmails.includes(email)))
    }
  }

  const HandleStaffEmailCheck = (e: any) => {
    setStaffEmailChecked(e.target.checked)
    if (e.target.checked) {
      setEmailList((prev: any) => [...prev, ...staffEmails])
    } else {
      setEmailList((prev: any) => prev.filter((email: any) => !staffEmails.includes(email)))
    }
  }

  const HandleAllUserEmailCheck = (e: any) => {
    setAllUserEmailChecked(e.target.checked)
    if (e.target.checked) {
      setEmailList((prev: any) => [...prev, ...allUserEmails])
    } else {
      setEmailList((prev: any) => prev.filter((email: any) => !allUserEmails.includes(email)))
    }
  }

  const StudentEmailFuncton = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/list-emails/student/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      setStudentEmails(data.email_addresses)
    } else {
      console.log('Error fetching student emails:', data);
    }



  }


  const TeacherEmailFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/list-emails/teacher/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      setTeacherEmails(data.email_addresses)
    } else {
      console.log('Error fetching teacher emails:', data);
    }



  }


  const BursaryEmailFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/list-emails/bursary/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      setBursaryEmails(data.email_addresses)
    } else {
      console.log('Error fetching bursary emails:', data);
    }



  }

  const ResultOfficerEmailFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/list-emails/result-officer/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      setResultOfficerEmails(data.email_addresses)
    } else {
      console.log('Error fetching result officer emails:', data);
    }



  }

  const StaffEmailFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/list-emails/staff/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      setStaffEmails(data.email_addresses)
    } else {
      console.log('Error fetching staff emails:', data);
    }



  }

  const AllEmailFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/list-emails/all/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      setAllUserEmails(data.email_addresses)
    } else {
      console.log('Error fetching all user emails:', data);
    }



  }




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();




  const onSubmit = (data: FormData, e: any) => {
    if (emailList.length > 0) {
      SendBulkMail(e)
    } else {
      showAlert()
      setMessage('Email list is empty, please select at least one option')
      setIsSuccess(false)
    }

  }


  const SendBulkMail = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const uniqueEmailList = [...new Set(emailList)]
    console.log(`unquie email: ${uniqueEmailList}`)



    try {
      const response = await fetch(`https://school.amanilightequity.com/api/email/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          to: uniqueEmailList,
          subject: subject,
          body: emailMessage,
          is_bulk: "true"
        })
      })


      if (response.ok) {
        showAlert()
        setMessage('Email sent')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setEmailMessage('')
        setSubject('')
        setEmailList([]) // Clear the email list after sending
        setStudentEmailChecked(false)
        setTeacherEmailChecked(false)
        setBursaryEmailChecked(false)
        setResultOfficerEmailChecked(false)
        setStaffEmailChecked(false)
        setAllUserEmailChecked(false)

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
    StudentEmailFuncton()
    TeacherEmailFunction()
    BursaryEmailFunction()
    ResultOfficerEmailFunction()
    StaffEmailFunction()
    AllEmailFunction()
  }, [])





  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-md-11 col-xl-8">
            <div className="site-boxes border-radius-10px">
              <div className="p-3">
                <p className="light-text pb-3">Select Email Recipients:</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3 align-center">
                    <div className="col-12">
                      <div className="d-flex flex-wrap mb-2">
                        <div className="form-check me-3">
                          <input className="form-check-input cursor-pointer" type="checkbox" id="studentEmail" onChange={HandleStudentEmailCheck} checked={studentEmailChecked} />
                          <label className="form-check-label light-text" htmlFor="studentEmail">Students</label>
                        </div>
                        <div className="form-check me-3">
                          <input className="form-check-input cursor-pointer" type="checkbox" id="teacherEmail" onChange={HandleTeacherEmailCheck} checked={teacherEmailChecked} />
                          <label className="form-check-label light-text" htmlFor="teacherEmail">Teachers</label>
                        </div>
                        <div className="form-check me-3">
                          <input className="form-check-input cursor-pointer" type="checkbox" id="bursaryEmail" onChange={HandleBursaryEmailCheck} checked={bursaryEmailChecked} />
                          <label className="form-check-label light-text" htmlFor="bursaryEmail">Bursary</label>
                        </div>
                        <div className="form-check me-3">
                          <input className="form-check-input cursor-pointer" type="checkbox" id="resultOfficerEmail" onChange={HandleResultOfficerEmailCheck} checked={resultOfficerEmailChecked} />
                          <label className="form-check-label light-text" htmlFor="resultOfficerEmail">Result Officer</label>
                        </div>
                        <div className="form-check me-3">
                          <input className="form-check-input cursor-pointer" type="checkbox" id="staffEmail" onChange={HandleStaffEmailCheck} checked={staffEmailChecked} />
                          <label className="form-check-label light-text" htmlFor="staffEmail">Staff</label>
                        </div>
                        <div className="form-check me-3">
                          <input className="form-check-input cursor-pointer" type="checkbox" id="allUserEmail" onChange={HandleAllUserEmailCheck} checked={allUserEmailChecked} />
                          <label className="form-check-label light-text" htmlFor="allUserEmail">All Users</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-4">
                      <p className=''>Email Subject:</p>
                    </div>

                    <div className="col-lg-10 col-md-9 col-8">
                      <input type="text" className={`site-input ${errors.subject ? 'error-input' : ''}`} {...register('subject', { required: true })} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email Subject:" />
                      {errors.subject && <span style={{ color: 'red' }}>This Feild is required</span>}
                    </div>

                    <div className="col-12">
                      <textarea rows={9} className={`site-input ${errors.emailMessage ? 'error-input' : ''}`} {...register('emailMessage', { required: true })} value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} placeholder="Write Your Message"></textarea>
                      {errors.emailMessage && <span style={{ color: 'red' }}>This Feild is required</span>}
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

export default SendBulkEmailPage