"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'


export default function UploadResultPage({ params }: { params: Promise<any> }) {
  const param = use(params);
  const [studentID, classID, termID, sessionID] = param.params || [];
  const router = useRouter()
  const {

    authTokens,


    formatName,


    loader,
    setLoader,
    disableButton,
    setDisableButton,


    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;

  const [studentDetails, setStudentDetails] = useState<any>(null)
  const [classDetails, setClassDetails] = useState<any>(null)
  const [sessionDetails, setSessionDetails] = useState<any>(null)
  const [termDetails, setTermDetails] = useState<any>(null)



  const [subjectData, setSubjectData] = useState<any>([])
  const [subjectResults, setSubjectResults] = useState<any>([]);



  const [totalMarkObtain, setTotalMarkObtain] = useState("")
  const [studentAverage, setStudentAverage] = useState("")
  const [classAverage, setClassAverage] = useState("")
  const [totalStudents, setTotalStudents] = useState("")
  const [position, setPosition] = useState("")
  const [decision, setDecision] = useState("")
  const [agility, setAgility] = useState("")
  const [caring, setCaring] = useState("")
  const [communication, setCommunication] = useState("")
  const [loving, setLoving] = useState("")
  const [puntuality, setPuntuality] = useState("")
  const [seriousness, setSeriousness] = useState("")
  const [socialization, setSocialization] = useState("")
  const [attentiveness, setAttentiveness] = useState("")
  const [handlingOfTools, setHandlingOfTools] = useState("")
  const [honesty, setHonesty] = useState("")
  const [leadership, setLeadership] = useState("")
  const [music, setMusic] = useState("")
  const [neatness, setNeatness] = useState("")
  const [perserverance, setPerserverance] = useState("")
  const [politeness, setPoliteness] = useState("")
  const [tools, setTools] = useState("")
  const [teacherComment, setTeacherComment] = useState("")
  const [principalComment, setPrincipalComment] = useState("")
  const [nextTermBegins, setNextTermBegins] = useState("")




  const IndividualStudentFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/students/${studentID}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setStudentDetails(data)

      }
    } catch {
      console.log('error')

    }

  }

  const IndividualClassFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/student-class/${classID}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setClassDetails(data)
        setSubjectData(data.subject_name)
        setSubjectResults(
          data.subject_name.map((subject: any) => ({
            subject: subject.id,
            total_ca: "",
            exam_score: "",
            total: "",
            grade: "",
            position: "",
            cgpa: ""

          }))
        )

      }
    } catch {
      console.log('error')

    }

  }

  const IndividualTermFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/term/${termID}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setTermDetails(data)

      }
    } catch {
      console.log('error')

    }

  }


  const IndividualSessionFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/session/${sessionID}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setSessionDetails(data)

      }
    } catch {
      console.log('error')

    }

  }

  const handleSubjectChange = (index: any, e: any) => {
    const values = [...subjectResults]
    values[index][e.target.name] = e.target.value;
    setSubjectResults(values)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: FormData, e: any) => {
    handleSubmitResult(e)
  }

  const handleSubmitResult = async (e: any) => {
    e.preventDefault();
    setLoader(true)

    const cleanedSubjectResults = subjectResults.filter((item: any) => {
      // Remove if all these are empty
      return !(
        item.total_ca === '' &&
        item.exam_score === '' &&
        item.total === '' &&
        item.grade === '' &&
        item.position === '' &&
        item.cgpa === ''
      );
    });

    const resultData = {
      student: studentID,
      student_class: classID,
      term: termID,
      session: sessionID,
      total_marks_obtain: totalMarkObtain,
      student_average: studentAverage,
      class_average: classAverage,
      total_students: totalStudents,
      position: position,
      decision: decision,
      agility: agility,
      caring: caring,
      communication: communication,
      loving: loving,
      puntuality: puntuality,
      seriousness: seriousness,
      socialization: socialization,
      attentiveness: attentiveness,
      handling_of_tools: handlingOfTools,
      honesty: honesty,
      leadership: leadership,
      music: music,
      neatness: neatness,
      perserverance: perserverance,
      politeness: politeness,
      tools: tools,
      teacher_comment: teacherComment,
      principal_comment: principalComment,
      next_term_begins: nextTermBegins,
      subject_result: cleanedSubjectResults,
    }

    try {
      const response = await fetch('https://school.amanilightequity.com/api/student-result/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`
        },
        body: JSON.stringify(resultData)
      });

      if (response.ok) {
        showAlert()
        setMessage('Result uploaded')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        router.push('/admin/upload-result/')


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
    IndividualStudentFunction()
    IndividualClassFunction()
    IndividualTermFunction()
    IndividualSessionFunction()
    setLoader(false)
  }, [])




  return (
    <div>
      <div className="container-lg pt-4 mb-5">
        <div className="row align-center">
          <div className="col-md-2 d-none  d-md-flex justify-content-center">
            {studentDetails && (
              <div className="site-boxes border-radius-5px site-border p-2 d-flex justify-content-center">
                {studentDetails.passport ? (
                  <img src={studentDetails.passport ? studentDetails.passport : ''} width='100%' alt="" />
                ) : (
                  <div className="p-5">
                    <p className='light-text'>No Image</p>
                  </div>
                )}

              </div>
            )}


          </div>

          <div className="col-md-8 col-12 text-center">
            <h2 className="font-bold text-xl d-none d-md-block">School Management System</h2>
            <h4 className="font-bold text-lg d-block d-md-none">School Management System</h4>
            <h5 className="light-text text-sm d-none d-md-block">Powered by E-Result Technology</h5>
            <p className="light-text d-block d-md-none">Powered by E-Result Technology</p>
          </div>

          <div className="col-md-2 d-none d-md-flex justify-content-center">
            <img src="/img/logo.png" width='60%' alt="" />
          </div>
        </div>

        {(studentDetails && termDetails && sessionDetails && classDetails) ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className='mt-5'>
              <div className="site-boxes border-radius-10px py-2 mb-4">
                <div className="border-bottom1 px-3">
                  <div className="row  flex-wrap align-center">
                    <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                      <div>
                        <div>
                          <p className="light-text xsm-text">Student ID</p>
                          <p className='sm-text'>{studentDetails.userID}</p>
                        </div>
                      </div>
                    </div>

                    <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                      <div>
                        <p className="light-text xsm-text">Full Name</p>
                        <p className='sm-text'>{formatName(studentDetails.first_name)} {formatName(studentDetails.last_name)}</p>
                      </div>
                    </div>


                    <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                      <div>
                        <p className="light-text xsm-text">Gender</p>
                        <p className='sm-text'>{formatName(studentDetails.gender)}</p>
                      </div>
                    </div>

                    <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                      <div>
                        <p className="light-text xsm-text">Class</p>
                        <p className='sm-text'>{formatName(classDetails.name)}</p>
                      </div>
                    </div>

                    <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                      <div>
                        <p className="light-text xsm-text">Term</p>
                        <p className='sm-text'>{formatName(termDetails.name)}</p>
                      </div>
                    </div>

                    <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                      <div>
                        <p className="light-text xsm-text">Session</p>
                        <p className='sm-text'>{formatName(sessionDetails.name)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row px-3 g-4 py-3'>
                  <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                    <label htmlFor="totalMarkObtain" className="form-label non-wrap-text pe-3">Total mark obtained:</label>
                    <input type="text" className={`site-search-input ${errors.totalMarkObtain ? 'error-input' : ''}`} {...register('totalMarkObtain', { required: true })} placeholder='e.g 234' value={totalMarkObtain} onChange={(e) => setTotalMarkObtain(e.target.value)} />
                    {errors.totalMarkObtain && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                    <label htmlFor="studentAverage" className="form-label non-wrap-text pe-3">Student average:</label>
                    <input type="text" className={`site-search-input ${errors.studentAverage ? 'error-input' : ''}`} {...register('studentAverage', { required: true })} placeholder='e.g 90.2' value={studentAverage} onChange={(e) => setStudentAverage(e.target.value)} />
                    {errors.studentAverage && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                    <label htmlFor="classAverage" className="form-label non-wrap-text pe-3">Class average:</label>
                    <input type="text" className={`site-search-input ${errors.classAverage ? 'error-input' : ''}`} {...register('classAverage', { required: true })} placeholder='e.g 82.4' value={classAverage} onChange={(e) => setClassAverage(e.target.value)} />
                    {errors.classAverage && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                    <label htmlFor="totalStduent" className="form-label non-wrap-text pe-3">Total student:</label>
                    <input type="text" className={`site-search-input ${errors.totalStudents ? 'error-input' : ''}`} {...register('totalStudents', { required: true })} placeholder='e.g 78' value={totalStudents} onChange={(e) => setTotalStudents(e.target.value)} />
                    {errors.totalStudents && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                    <label htmlFor="position" className="form-label non-wrap-text pe-3">Position:</label>
                    <input type="text" className={`site-search-input ${errors.position ? 'error-input' : ''}`} {...register('position', { required: true })} placeholder='position' value={position} onChange={(e) => setPosition(e.target.value)} />
                    {errors.position && <p className="error-text">This field is required</p>}
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                    <label htmlFor="decison" className="form-label non-wrap-text pe-3">Decision:</label>
                    <input type="text" className={`site-search-input ${errors.decision ? 'error-input' : ''}`} {...register('decision', { required: true })} placeholder='Decision' value={decision} onChange={(e) => setDecision(e.target.value)} />
                    {errors.decision && <p className="error-text">This field is required</p>}
                  </div>
                </div>


              </div>

              <div className="row g-4">
                <div className="col-12">
                  <div className="">
                    <div className="site-boxes  border-radius-10px result-table non-wrap-text scroll-bar p-3">
                      <table className='overflow-auto'>
                        <thead>
                          <tr>
                            <th>SUBJECT</th>
                            <th>TOTAL C.A <br />(40%)</th>
                            <th>EXAM<br />(60%)</th>
                            <th>TOTAL<br />(100%)</th>
                            <th>GRADE</th>
                            <th>POSITION</th>
                          </tr>
                        </thead>

                        <tbody>
                          {subjectResults.map((subject: any, index: any) => {
                            const subjectn = subjectData.find((s: any) => s.id === subject.subject)
                            console.log(subjectn)
                            console.log(subjectData)
                            const subjectName = subjectn ? subjectn.name : ''
                            return (
                              <tr key={index}>
                                <td className='light-text'>{formatName(subjectName)}</td>
                                <td><input className={`site-search-input`} type="text" name="total_ca" value={subject.total_ca || ''} onChange={(e) => handleSubjectChange(index, e)} /></td>
                                <td><input className={`site-search-input`} type="text" name="exam" value={subject.exam || ''} onChange={(e) => handleSubjectChange(index, e)} /></td>
                                <td><input className={`site-search-input`} type="text" name="total" value={subject.total || ''} onChange={(e) => handleSubjectChange(index, e)} /></td>
                                <td><input className={`site-search-input`} type="text" name="grade" value={subject.grade || ''} onChange={(e) => handleSubjectChange(index, e)} /></td>
                                <td><input className={`site-search-input`} type="text" name="position" value={subject.position || ''} onChange={(e) => handleSubjectChange(index, e)} /></td>
                              </tr>
                            );

                          })}
                        </tbody>
                      </table>

                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className='site-boxes  border-radius-10px   py-3'>
                    <div className="border-bottom1 px-3 py-2">
                      <p>GRADE INTERPRETATION</p>
                    </div>

                    <div className="row  flex-wrap align-center p-3">
                      <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                        <div>
                          <div>
                            <p className="light-text xsm-text">A1 = 80 - 100</p>
                            <p className='sm-text'>EXCELLENT</p>
                          </div>
                        </div>
                      </div>

                      <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                        <div>
                          <p className="light-text xsm-text">B2 = 70 - 79</p>
                          <p className='sm-text'>VERY GOOD</p>
                        </div>
                      </div>


                      <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                        <div>
                          <p className="light-text xsm-text">B2 = 65 - 69</p>
                          <p className='sm-text'>GOOD</p>
                        </div>
                      </div>

                      <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                        <div>
                          <p className="light-text xsm-text">C4 = G9 - 64</p>
                          <p className='sm-text'>CREDIT</p>
                        </div>
                      </div>

                      <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                        <div>
                          <p className="light-text xsm-text">C5 = 55 - 59</p>
                          <p className='sm-text'>CREDIT</p>
                        </div>
                      </div>

                      <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                        <div>
                          <p className="light-text xsm-text">C6 = 59 - 54</p>
                          <p className='sm-text'>CREDIT</p>
                        </div>
                      </div>

                      <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                        <div>
                          <p className="light-text xsm-text">D7 = 45 - 49</p>
                          <p className='sm-text'>PASS</p>
                        </div>
                      </div>

                      <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                        <div>
                          <p className="light-text xsm-text">E8 = 40 -44</p>
                          <p className='sm-text'>PASS</p>
                        </div>
                      </div>

                      <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                        <div>
                          <p className="light-text xsm-text">F9 = 1 -39</p>
                          <p className='sm-text'>FAIL</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className='site-boxes  border-radius-10px  non-wrap-text py-3'>
                    <div className="border-bottom1 px-3 py-1">
                      <p>AFFFECTIVE TRAIT</p>
                    </div>

                    <div className="row g-4 p-3 light-text">
                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Agility:</p>
                          <input className={`site-search-input ${errors.agility ? 'error-input' : ''}`}  {...register('agility', { required: true })} type="text" value={agility} onChange={(e) => setAgility(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Caring:</p>
                          <input className={`site-search-input ${errors.caring ? 'error-input' : ''}`}  {...register('caring', { required: true })} type="text" value={caring} onChange={(e) => setCaring(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Communication:</p>
                          <input className={`site-search-input ${errors.communication ? 'error-input' : ''}`}  {...register('communication', { required: true })} type="text" value={communication} onChange={(e) => setCommunication(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Loving:</p>
                          <input className={`site-search-input ${errors.loving ? 'error-input' : ''}`}  {...register('loving', { required: true })} type="text" value={loving} onChange={(e) => setLoving(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Punality:</p>
                          <input className={`site-search-input ${errors.puntuality ? 'error-input' : ''}`}  {...register('puntuality', { required: true })} type="text" value={puntuality} onChange={(e) => setPuntuality(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Seriousness:</p>
                          <input className={`site-search-input ${errors.seriousness ? 'error-input' : ''}`}  {...register('seriousness', { required: true })} type="text" value={seriousness} onChange={(e) => setSeriousness(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Honesty:</p>
                          <input className={`site-search-input ${errors.honesty ? 'error-input' : ''}`}  {...register('honesty', { required: true })} type="text" value={honesty} onChange={(e) => setHonesty(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Leadership:</p>
                          <input className={`site-search-input ${errors.leadership ? 'error-input' : ''}`}  {...register('leadership', { required: true })} type="text" value={leadership} onChange={(e) => setLeadership(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Perservance:</p>
                          <input className={`site-search-input ${errors.perserverance ? 'error-input' : ''}`}  {...register('perserverance', { required: true })} type="text" value={perserverance} onChange={(e) => setPerserverance(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Socialization:</p>
                          <input className={`site-search-input ${errors.socialization ? 'error-input' : ''}`}  {...register('socialization', { required: true })} type="text" value={socialization} onChange={(e) => setSocialization(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Politeness:</p>
                          <input className={`site-search-input ${errors.politeness ? 'error-input' : ''}`}  {...register('politeness', { required: true })} type="text" value={politeness} onChange={(e) => setPoliteness(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Music:</p>
                          <input className={`site-search-input ${errors.music ? 'error-input' : ''}`}  {...register('music', { required: true })} type="text" value={music} onChange={(e) => setMusic(e.target.value)} />
                        </div>
                      </div>
                    </div>


                  </div>

                </div>

                <div className="col-md-6">
                  <div className='site-boxes  border-radius-10px  non-wrap-text py-3 mb-4'>
                    <div className="border-bottom1 px-3 py-1">
                      <p>PSYCHOMOTOR  TRAIT</p>
                    </div>

                    <div className="row g-4 p-3 light-text">
                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Attentiveness:</p>
                          <input className={`site-search-input ${errors.attentiveness ? 'error-input' : ''}`}  {...register('attentiveness', { required: true })} type="text" value={attentiveness} onChange={(e) => setAttentiveness(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Handling of tools:</p>
                          <input className={`site-search-input ${errors.handlingOfTools ? 'error-input' : ''}`}  {...register('handlingOfTools', { required: true })} type="text" value={handlingOfTools} onChange={(e) => setHandlingOfTools(e.target.value)} />
                        </div>
                      </div>





                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Neatness:</p>
                          <input className={`site-search-input ${errors.neatness ? 'error-input' : ''}`}  {...register('neatness', { required: true })} type="text" value={neatness} onChange={(e) => setNeatness(e.target.value)} />
                        </div>
                      </div>



                      <div className="col-sm-6">
                        <div className="d-flex align-center">
                          <p className='pe-2'>Tools:</p>
                          <input className={`site-search-input ${errors.tools ? 'error-input' : ''}`}  {...register('tools', { required: true })} type="text" value={tools} onChange={(e) => setTools(e.target.value)} />
                        </div>
                      </div>
                    </div>


                  </div>

                  <div className='site-boxes  border-radius-10px  non-wrap-text py-3'>
                    <div className="border-bottom1 px-3 py-1">
                      <p>TRAIT SCALE</p>
                    </div>

                    <div className=" p-3 light-text row g-4">
                      <div className='col-6'>
                        <p>A = EXCELLENT</p>
                      </div>

                      <div className='col-6'>
                        <p>B = VERY GOOD</p>
                      </div>

                      <div className='col-6'>
                        <p>C = GOOD</p>
                      </div>

                      <div className='col-6'>
                        <p>D = FAIR</p>
                      </div>

                      <div className='col-6'>
                        <p>E = POOR</p>
                      </div>

                    </div>
                  </div>

                </div>

                <div className="col-12">
                  <div className='site-boxes  border-radius-10px   py-3'>
                    <div className="border-bottom1 px-3 py-2">
                      <p>REMARKS</p>
                    </div>

                    <div className="pt-3 light-text">
                      <div className="d-flex non-wrap-text px-3 pb-3">
                        <p className="pe-3">Teacher comment</p>
                        <input type="text" className={`site-search-input ${errors.teacherComment ? 'error-input' : ''}`}  {...register('teacherComment', { required: true })} value={teacherComment} onChange={(e) => setTeacherComment(e.target.value)} />
                      </div>

                      <div className="d-flex non-wrap-text px-3 pb-3">
                        <p className="pe-3">Principal Comment</p>
                        <input type="text" className={`site-search-input ${errors.principalComment ? 'error-input' : ''}`}  {...register('principalComment', { required: true })} value={principalComment} onChange={(e) => setPrincipalComment(e.target.value)} />
                      </div>

                      <div className="d-flex non-wrap-text px-3">
                        <p className="pe-3">Next term begins</p>
                        <input type="text" className={`site-search-input ${errors.nextTermBegins ? 'error-input' : ''}`}  {...register('nextTermBegins', { required: true })} value={nextTermBegins} onChange={(e) => setNextTermBegins(e.target.value)} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className='mt-4'>
                <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                  <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                  <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill me-2"></i> Submit</span>
                </button>
              </div>


            </section>
          </form>
        ) : (
          <div className="mt-5 pt-5">
            <div className="d-flex justify-content-center align-items-center">
              <div className="book-loader">
                <div className="book red"></div>
                <div className="book blue"></div>
                <div className="book green"></div>
              </div>
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
