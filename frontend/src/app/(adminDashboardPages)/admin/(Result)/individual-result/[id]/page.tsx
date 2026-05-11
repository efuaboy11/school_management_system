"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'




import AllDataContext from '@/context/AllData';


export default function IndividualResultPage({ params }: { params: Promise<any> }) {
  const { id } = use(params);




  const {
    authTokens,
    formatName,
    loader,
    setLoader,

    setDisableButton,


    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;


  const {
    StudentClassFunction,
    studentClassData,

    termData,
    TermFunction,

    sessionData,
    SessionFunction,

  } = useContext(AllDataContext)!;


  const [details, setDetails] = useState<any>(null)

  const [loading, setLoading] = useState(true)

  // const [studentLoader, setStudentLoader] = useState(true)
  // const [classLoader, setClassLoader] = useState(true)
  // const [sessionLoader, setSessionLoader] = useState(true)
  // const [termLoader, setTermLoader] = useState(true)



  const [subjectResults, setSubjectResults] = useState<any>([]);

  console.log('subjectResults', subjectResults)

  const [classValue, setClassValue] = useState("")
  const [termValue, setTermValue] = useState("")
  const [sessionValue, setSessionValue] = useState("")
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


  const [showSummaryInformationModal, setShowSummaryInformationModal] = useState(false);
  const [showAffectiveTraitInformationModal, setShowAffectiveTraitInformationModal] = useState(false);
  const [showPsychomotorInformationModal, setShowPsychomotorInformationModal] = useState(false);
  const [showScoreInformationModal, setShowScoreInformationModal] = useState(false);
  const [showRemarkInformationModal, setShowRemarkInformationModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const handleCloseSummaryInformationModal = () => {
    setShowSummaryInformationModal(false);
  };
  const handleShowSummaryInformationModal = () => {
    setShowSummaryInformationModal(true);
  };

  const handleCloseAffectiveTraitInformationModal = () => {
    setShowAffectiveTraitInformationModal(false);
  }

  const handleShowAffectiveTraitInformationModal = () => {
    setShowAffectiveTraitInformationModal(true);
  }


  const handleClosePsychomotorInformationModal = () => {
    setShowPsychomotorInformationModal(false);
  }

  const handleShowPsychomotorInformationModal = () => {
    setShowPsychomotorInformationModal(true);
  }


  const handleCloseScoreInformationModal = () => {
    setShowScoreInformationModal(false);
  }

  const handleShowScoreInformationModal = () => {
    setShowScoreInformationModal(true);
  }

  const handleCloseRemarkInformationModal = () => {
    setShowRemarkInformationModal(false);
  }

  const handleShowRemarkInformationModal = () => {
    setShowRemarkInformationModal(true);
  }


  const {
    register: registerSummaryInformation,
    handleSubmit: handleSubmitSummaryInformation,
    formState: { errors: errorsSummaryInformation, },
  } = useForm<any>();


  const {
    register: registerAffectiveTraitInformation,
    handleSubmit: handleSubmitAffectiveTraitInformation,
    formState: { errors: errorsAffectiveTraitInformation },
  } = useForm<any>();

  const {
    register: registerPsychomotorTraitInformation,
    handleSubmit: handleSubmitPsychomotorInformation,
    formState: { errors: errorsPsychomotorInformation },
  } = useForm<any>();

  const {
    handleSubmit: handleSubmitScoreInformation,
  } = useForm<any>();


  const {
    register: registerRemarkInformation,
    handleSubmit: handleSubmitRemarkInformation,
    formState: { errors: errorsRemarkInformation },
  } = useForm<any>();


  const onSummaryInformationSubmit = (data: any, e: any) => {
    EditSummaryInformationInformation(e)
  }

  const onAffectiveTraitInformationSubmit = (data: any, e: any) => {
    EditAffectiveTraitInformation(e)

  }
  // const onContactInformationSubmit = (data: any, e:any) => {
  //   // EditContactInformation(e)

  // }

  const onPsychomotorInformationSubmit = (data: any, e: any) => {
    EditPsychomotorInformation(e)

  }

  const onRemarkInformationSubmit = (data: any, e: any) => {
    EditRemarkInformation(e)

  }

  const onScoreInformationSubmit = (data: any, e: any) => {
    EditScoreInformation(e)

  }




  const EditSummaryInformationInformation = async (e: any) => {
    e.preventDefault();
    setLoader(true)



    const resultData = {
      student: details?.student,
      student_class: classValue,
      term: termValue,
      session: sessionValue,
      total_marks_obtain: totalMarkObtain,
      student_average: studentAverage,
      class_average: classAverage,
      total_students: totalStudents,
      position: position,
      decision: decision,
    }

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/student-result/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`
        },
        body: JSON.stringify(resultData)
      });

      if (response.ok) {
        showAlert()
        setMessage('Summary Details Edited')
        IndividualDetailsFunction()
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)


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

  const EditAffectiveTraitInformation = async (e: any) => {
    e.preventDefault();
    setLoader(true)



    const resultData = {
      agility: agility,
      caring: caring,
      communication: communication,
      loving: loving,
      puntuality: puntuality,
      seriousness: seriousness,
      socialization: socialization,
      honesty: honesty,
      leadership: leadership,
      music: music,
      perserverance: perserverance,
      politeness: politeness,
    }

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/student-result/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`
        },
        body: JSON.stringify(resultData)
      });

      if (response.ok) {
        showAlert()
        setMessage('Affective Trait Details Edited')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        IndividualDetailsFunction()


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

  const EditPsychomotorInformation = async (e: any) => {
    e.preventDefault();
    setLoader(true)



    const resultData = {
      attentiveness: attentiveness,
      handling_of_tools: handlingOfTools,
      neatness: neatness,
      tools: tools,
    }

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/student-result/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`
        },
        body: JSON.stringify(resultData)
      });

      if (response.ok) {
        showAlert()
        setMessage('Psychomotor Trait Details Edited')
        IndividualDetailsFunction()
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)


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


  const EditRemarkInformation = async (e: any) => {
    e.preventDefault();
    setLoader(true)



    const resultData = {
      teacher_comment: teacherComment,
      principal_comment: principalComment,
      next_term_begins: nextTermBegins,
    }

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/student-result/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`
        },
        body: JSON.stringify(resultData)
      });

      if (response.ok) {
        showAlert()
        setMessage('Remark Details Edited')
        IndividualDetailsFunction()
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)


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

  const EditScoreInformation = async (e: any) => {
    e.preventDefault();
    setLoader(true)

    const cleanedSubjectResults = subjectResults
      .filter((item: any) => {
        // Remove if all these are empty
        return !(
          item.total_ca === '' &&
          item.exam_score === '' &&
          item.total === '' &&
          item.grade === '' &&
          item.position === '' &&
          item.cgpa === ''
        );
      })
      .map((item: any) => {
        const { ...rest } = item; // Destructure to remove subject_name
        return {
          ...rest
        };
      });




    const resultData = {
      subject_result: cleanedSubjectResults,
    };

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/student-result/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`
        },
        body: JSON.stringify(resultData)
      });

      if (response.ok) {
        showAlert()
        setMessage('Remark Details Edited')
        setIsSuccess(true)
        setLoader(false)
        IndividualDetailsFunction()
        setDisableButton(false)


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

  const IndividualDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/student-result/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setDetails(data)
        console.log('data', data)
        setSubjectResults(
          data.subject_result.map((subject: any) => ({
            subject: subject.subject_name.id,
            subject_name: subject.subject_name.name,
            total_ca: subject.total_ca,
            exam: subject.exam,
            total: subject.total,
            grade: subject.grade,
            position: subject.position,
            cgpa: subject.cgpa
          }))
        )

        setClassValue(data?.student_class || "")
        setTermValue(data?.term || "")
        setSessionValue(data?.session || "")
        setTotalMarkObtain(data?.total_marks_obtain || "")
        setStudentAverage(data?.student_average || "")
        setClassAverage(data?.class_average || "")
        setTotalStudents(data?.total_students || "")
        setPosition(data?.position || "")
        setDecision(data?.decision || "")
        setAgility(data?.agility || "")
        setCaring(data?.caring || "")
        setCommunication(data?.communication || "")
        setLoving(data?.loving || "")
        setPuntuality(data?.puntuality || "")
        setSeriousness(data?.seriousness || "")
        setSocialization(data?.socialization || "")
        setAttentiveness(data?.attentiveness || "")
        setHandlingOfTools(data?.handling_of_tools || "")
        setHonesty(data?.honesty || "")
        setLeadership(data?.leadership || "")
        setMusic(data?.music || "")
        setNeatness(data?.neatness || "")
        setPerserverance(data?.perserverance || "")
        setPoliteness(data?.politeness || "")
        setTools(data?.tools || "")
        setTeacherComment(data?.teacher_comment || "")
        setPrincipalComment(data?.principal_comment || "")
        setNextTermBegins(data?.next_term_begins || "")

        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }



  const handleSubjectChange = (index: any, e: any) => {
    const values = [...subjectResults]
    values[index][e.target.name] = e.target.value;
    setSubjectResults(values)
  }






  useEffect(() => {
    StudentClassFunction()
    TermFunction()
    SessionFunction()
    IndividualDetailsFunction()
    setLoader(false)
  }, [])

  useEffect(() => {
    if (showSummaryInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showSummaryInformationModal]);


  useEffect(() => {
    if (showAffectiveTraitInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showAffectiveTraitInformationModal]);


  useEffect(() => {
    if (showPsychomotorInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showPsychomotorInformationModal]);



  useEffect(() => {
    if (showRemarkInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showRemarkInformationModal]);


  useEffect(() => {
    if (showScoreInformationModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showScoreInformationModal]);



  return (
    <div>

      {showSummaryInformationModal && (
        <section className={` ${showSummaryInformationModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div>
                      <div className="d-flex justify-content-between pb-2">
                        <p className='font-size-20px '>Edit Summary Details</p>
                        <div onClick={handleCloseSummaryInformationModal} className='cursor-pointer'>
                          <i className="ri-close-line md-text"></i>
                        </div>
                      </div>


                      <div className='pt-4'>
                        <form onSubmit={handleSubmitSummaryInformation(onSummaryInformationSubmit)}>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label htmlFor="firstName" className="form-label">Student Class</label>
                              <select className={`site-input ${errorsSummaryInformation.studentClass ? 'error-input' : ''}`} {...registerSummaryInformation('studentClass', { required: true })} value={classValue} onChange={(e) => setClassValue(e.target.value)}>
                                <option value="">Select</option>
                                {studentClassData.map((data: any) => (
                                  <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                              </select>
                              <p className="error-text">{errorsSummaryInformation.studentClass && 'This field is required'}</p>
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="firstName" className="form-label">Term</label>
                              <select className={`site-input ${errorsSummaryInformation.term ? 'error-input' : ''}`} {...registerSummaryInformation('term', { required: true })} value={termValue} onChange={(e) => setTermValue(e.target.value)}>
                                <option value="">Select</option>
                                {termData.map((data: any) => (
                                  <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                              </select>
                              <p className="error-text">{errorsSummaryInformation.term && 'This field is required'}</p>
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="firstName" className="form-label">Session</label>
                              <select className={`site-input ${errorsSummaryInformation.session ? 'error-input' : ''}`} {...registerSummaryInformation('session', { required: true })} value={sessionValue} onChange={(e) => setSessionValue(e.target.value)}>
                                <option value="">Select</option>
                                {sessionData.map((data: any) => (
                                  <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                              </select>
                              <p className="error-text">{errorsSummaryInformation.session && 'This field is required'}</p>
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="totalMarksObtained" className="form-label">Total Marks Obtained</label>
                              <input type="text" className={`site-input ${errorsSummaryInformation.totalMarksObtained ? 'error-input' : ''}`} {...registerSummaryInformation('totalMarksObtained', { required: true })} value={totalMarkObtain} onChange={(e) => setTotalMarkObtain(e.target.value)} placeholder='Total marks obtained' />
                              {errorsSummaryInformation.totalMarksObtained && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="studentAverage" className="form-label">Student Average</label>
                              <input type="text" className={`site-input ${errorsSummaryInformation.studentAverage ? 'error-input' : ''}`} {...registerSummaryInformation('studentAverage', { required: true })} value={studentAverage} onChange={(e) => setStudentAverage(e.target.value)} placeholder='Student Average' />
                              {errorsSummaryInformation.studentAverage && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="classAverage" className="form-label">Class Average</label>
                              <input type="text" className={`site-input ${errorsSummaryInformation.classAverage ? 'error-input' : ''}`} {...registerSummaryInformation('classAverage', { required: true })} value={classAverage} onChange={(e) => setClassAverage(e.target.value)} placeholder='Class Average' />
                              {errorsSummaryInformation.classAverage && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="totalStudents" className="form-label">Total Students</label>
                              <input type="text" className={`site-input ${errorsSummaryInformation.totalStudents ? 'error-input' : ''}`} {...registerSummaryInformation('totalStudents', { required: true })} value={totalStudents} onChange={(e) => setTotalStudents(e.target.value)} placeholder='Total Students' />
                              {errorsSummaryInformation.totalStudents && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="totalStudents" className="form-label">Position</label>
                              <input type="text" className={`site-input ${errorsSummaryInformation.position ? 'error-input' : ''}`} {...registerSummaryInformation('position', { required: true })} value={position} onChange={(e) => setPosition(e.target.value)} placeholder='Position' />
                              {errorsSummaryInformation.position && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="totalStudents" className="form-label">Decision</label>
                              <input type="text" className={`site-input ${errorsSummaryInformation.decision ? 'error-input' : ''}`} {...registerSummaryInformation('decision', { required: true })} value={decision} onChange={(e) => setDecision(e.target.value)} placeholder='Decision' />
                              {errorsSummaryInformation.decision && <p className="error-text">This field is required</p>}
                            </div>


                            <div className="col-12 mt-4">
                              <button type='submit' className='site-btn px-4'>
                                <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                                <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill pe-2"></i> Sumbit</span>
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

          </div>
        </section>
      )}


      {showAffectiveTraitInformationModal && (
        <section className={` ${showAffectiveTraitInformationModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div>
                      <div className="d-flex justify-content-between pb-2">
                        <p className='font-size-20px '>Edit AFFFECTIVE TRAIT</p>
                        <div onClick={handleCloseAffectiveTraitInformationModal} className='cursor-pointer'>
                          <i className="ri-close-line md-text"></i>
                        </div>
                      </div>


                      <div className='pt-4'>
                        <form onSubmit={handleSubmitAffectiveTraitInformation(onAffectiveTraitInformationSubmit)}>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label htmlFor="agility" className="form-label">Agility</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.agility ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('agility', { required: true })} value={agility} onChange={(e) => setAgility(e.target.value)} placeholder='Agility' />
                              {errorsAffectiveTraitInformation.agility && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="loving" className="form-label">Loving</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.loving ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('loving', { required: true })} value={loving} onChange={(e) => setLoving(e.target.value)} placeholder='Loving' />
                              {errorsAffectiveTraitInformation.loving && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="honesty" className="form-label">Honesty</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.honesty ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('honesty', { required: true })} value={honesty} onChange={(e) => setHonesty(e.target.value)} placeholder='Honesty' />
                              {errorsAffectiveTraitInformation.honesty && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="socialization" className="form-label">Socialization</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.socialization ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('socialization', { required: true })} value={socialization} onChange={(e) => setSocialization(e.target.value)} placeholder='Socialization' />
                              {errorsAffectiveTraitInformation.socialization && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="caring" className="form-label">Caring</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.caring ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('caring', { required: true })} value={caring} onChange={(e) => setCaring(e.target.value)} placeholder='Caring' />
                              {errorsAffectiveTraitInformation.caring && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="communication" className="form-label">Communication</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.communication ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('communication', { required: true })} value={communication} onChange={(e) => setCommunication(e.target.value)} placeholder='Communication' />
                              {errorsAffectiveTraitInformation.communication && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="puntuality" className="form-label">Puntuality</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.puntuality ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('puntuality', { required: true })} value={puntuality} onChange={(e) => setPuntuality(e.target.value)} placeholder='Puntuality' />
                              {errorsAffectiveTraitInformation.puntuality && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="seriousness" className="form-label">Seriousness</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.seriousness ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('seriousness', { required: true })} value={seriousness} onChange={(e) => setSeriousness(e.target.value)} placeholder='Seriousness' />
                              {errorsAffectiveTraitInformation.seriousness && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="attentiveness" className="form-label">Attentiveness</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.attentiveness ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('attentiveness', { required: true })} value={attentiveness} onChange={(e) => setAttentiveness(e.target.value)} placeholder='Attentiveness' />
                              {errorsAffectiveTraitInformation.attentiveness && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="leadership" className="form-label">Leadership</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.leadership ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('leadership', { required: true })} value={leadership} onChange={(e) => setLeadership(e.target.value)} placeholder='Leadership' />
                              {errorsAffectiveTraitInformation.leadership && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="perseverance" className="form-label">Perseverance</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.perseverance ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('perseverance', { required: true })} value={perserverance} onChange={(e) => setPerserverance(e.target.value)} placeholder='Perseverance' />
                              {errorsAffectiveTraitInformation.perseverance && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="music" className="form-label">Music</label>
                              <input type="text" className={`site-input ${errorsAffectiveTraitInformation.music ? 'error-input' : ''}`} {...registerAffectiveTraitInformation('music', { required: true })} value={music} onChange={(e) => setMusic(e.target.value)} placeholder='Music' />
                              {errorsAffectiveTraitInformation.music && <p className="error-text">This field is required</p>}
                            </div>



                            <div className="col-12 mt-4">
                              <button type='submit' className='site-btn px-4'>
                                <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                                <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill pe-2"></i> Sumbit</span>
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

          </div>
        </section>
      )}


      {showPsychomotorInformationModal && (
        <section className={` ${showPsychomotorInformationModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div>
                      <div className="d-flex justify-content-between pb-2">
                        <p className='font-size-20px '>Edit PSYCHOMOTOR TRAIT</p>
                        <div onClick={handleClosePsychomotorInformationModal} className='cursor-pointer'>
                          <i className="ri-close-line md-text"></i>
                        </div>
                      </div>


                      <div className='pt-4'>
                        <form onSubmit={handleSubmitPsychomotorInformation(onPsychomotorInformationSubmit)}>
                          <div className="row g-3">
                            <div className="col-md-12">
                              <label htmlFor="firstName" className="form-label">Attentiveness</label>
                              <input type="text" className={`site-input ${errorsPsychomotorInformation.attentiveness ? 'error-input' : ''}`} {...registerPsychomotorTraitInformation('attentiveness', { required: true })} value={attentiveness} onChange={(e) => setAttentiveness(e.target.value)} placeholder='Attentiveness' />
                              {errorsPsychomotorInformation.attentiveness && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">Handling of Tools </label>
                              <input type="text" className={`site-input ${errorsPsychomotorInformation.handlingOfTools ? 'error-input' : ''}`} {...registerPsychomotorTraitInformation('handlingOfTools', { required: true })} value={handlingOfTools} onChange={(e) => setHandlingOfTools(e.target.value)} placeholder='Handling of Tools' />
                              {errorsPsychomotorInformation.handlingOfTools && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">Neatness </label>
                              <input type="text" className={`site-input ${errorsPsychomotorInformation.neatness ? 'error-input' : ''}`} {...registerPsychomotorTraitInformation('neatness', { required: true })} value={neatness} onChange={(e) => setNeatness(e.target.value)} placeholder='Neatness' />
                              {errorsPsychomotorInformation.neatness && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">Tools </label>
                              <input type="text" className={`site-input ${errorsPsychomotorInformation.tools ? 'error-input' : ''}`} {...registerPsychomotorTraitInformation('tools', { required: true })} value={tools} onChange={(e) => setTools(e.target.value)} placeholder='Tools' />
                              {errorsPsychomotorInformation.tools && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-12 mt-4">
                              <button type='submit' className='site-btn px-4'>
                                <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                                <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill pe-2"></i> Sumbit</span>
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

          </div>
        </section>
      )}


      {showRemarkInformationModal && (
        <section className={` ${showRemarkInformationModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div>
                      <div className="d-flex justify-content-between pb-2">
                        <p className='font-size-20px '>Edit Remark</p>
                        <div onClick={handleCloseRemarkInformationModal} className='cursor-pointer'>
                          <i className="ri-close-line md-text"></i>
                        </div>
                      </div>


                      <div className='pt-4'>
                        <form onSubmit={handleSubmitRemarkInformation(onRemarkInformationSubmit)}>
                          <div className="row g-3">
                            <div className="col-md-12">
                              <label htmlFor="firstName" className="form-label">Teacher Comment</label>
                              <input type="text" className={`site-input ${errorsRemarkInformation.teacherComment ? 'error-input' : ''}`} {...registerRemarkInformation('teacherComment', { required: true })} value={teacherComment} onChange={(e) => setTeacherComment(e.target.value)} placeholder='Teacher Comment' />
                              {errorsRemarkInformation.teacherComment && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">Principal Comment </label>
                              <input type="text" className={`site-input ${errorsRemarkInformation.principalComment ? 'error-input' : ''}`} {...registerRemarkInformation('principalComment', { required: true })} value={principalComment} onChange={(e) => setPrincipalComment(e.target.value)} placeholder='Principal Comment' />
                              {errorsRemarkInformation.principalComment && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-md-12">
                              <label htmlFor="lastName" className="form-label">Next Term Begins</label>
                              <input type="text" className={`site-input ${errorsRemarkInformation.nextTermBegins ? 'error-input' : ''}`} {...registerRemarkInformation('nextTermBegins', { required: true })} value={nextTermBegins} onChange={(e) => setNextTermBegins(e.target.value)} placeholder='Next Term Begins' />
                              {errorsRemarkInformation.nextTermBegins && <p className="error-text">This field is required</p>}
                            </div>

                            <div className="col-12 mt-4">
                              <button type='submit' className='site-btn px-4'>
                                <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                                <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill pe-2"></i> Sumbit</span>
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

          </div>
        </section>
      )}

      {showScoreInformationModal && (
        <section className={` ${showScoreInformationModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-md-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div>
                      <div className="d-flex justify-content-between pb-2">
                        <p className='font-size-20px '>Edit Scores</p>
                        <div onClick={handleCloseScoreInformationModal} className='cursor-pointer'>
                          <i className="ri-close-line md-text"></i>
                        </div>
                      </div>


                      <div className='pt-4'>
                        <form onSubmit={handleSubmitScoreInformation(onScoreInformationSubmit)}>
                          <div className="row g-3">
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
                                        return (
                                          <tr key={index}>
                                            <td className='light-text'>{formatName(subject.subject_name)}</td>
                                            <td><input className={`site-search-input`} type="text" name="total_ca" value={subject.total_ca} onChange={(e) => handleSubjectChange(index, e)} /></td>
                                            <td><input className={`site-search-input`} type="text" name="exam" value={subject.exam} onChange={(e) => handleSubjectChange(index, e)} /></td>
                                            <td><input className={`site-search-input`} type="text" name="total" value={subject.total} onChange={(e) => handleSubjectChange(index, e)} /></td>
                                            <td><input className={`site-search-input`} type="text" name="grade" value={subject.grade} onChange={(e) => handleSubjectChange(index, e)} /></td>
                                            <td><input className={`site-search-input`} type="text" name="position" value={subject.position} onChange={(e) => handleSubjectChange(index, e)} /></td>
                                          </tr>
                                        );

                                      })}
                                    </tbody>
                                  </table>

                                </div>
                              </div>
                            </div>

                            <div className="col-12 mt-4">
                              <button type='submit' className='site-btn px-4'>
                                <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                                <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill pe-2"></i> Sumbit</span>
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

          </div>
        </section>
      )}

      <div className="container-lg pt-4 pb-5">
        {
          loading ? (
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
            <div>
              <div className="row align-center">
                <div className="col-md-2 d-none  d-md-flex justify-content-center">
                  {details && (
                    <div className="site-boxes border-radius-5px site-border p-2 d-flex justify-content-center">
                      {details.student_name.passport ? (
                        <img src={details.student_name.passport ? details.student_name.passport : ''} width='100%' alt="" />
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

              {(details) ? (
                <div>
                  <section className='mt-5'>
                    <div className="site-boxes border-radius-10px py-2 mb-4">
                      <div className="border-bottom1 px-3">
                        <div className="row align-center">
                          <div className="col-10">
                            <div className="row  flex-wrap align-center">
                              <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                                <div>
                                  <div>
                                    <p className="light-text xsm-text">Student ID</p>
                                    <p className='sm-text'>{details.student_name.userID}</p>
                                  </div>
                                </div>
                              </div>

                              <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                                <div>
                                  <p className="light-text xsm-text">Full Name</p>
                                  <p className='sm-text'>{formatName(details.student_name.first_name)} {formatName(details.student_name.last_name)}</p>
                                </div>
                              </div>


                              <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                                <div>
                                  <p className="light-text xsm-text">Class</p>
                                  <p className='sm-text'>{formatName(details.class_name.name)}</p>
                                </div>
                              </div>

                              <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                                <div>
                                  <p className="light-text xsm-text">Term</p>
                                  <p className='sm-text'>{formatName(details.term_name.name)}</p>
                                </div>
                              </div>

                              <div className='col-sm-3  col-lg-2 col-6 mb-3'>
                                <div>
                                  <p className="light-text xsm-text">Session</p>
                                  <p className='sm-text'>{formatName(details.session_name.name)}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-2'>
                            <button onClick={handleShowSummaryInformationModal} className='site-inverse-btn px-3'><i className="ri-edit-line me-2"></i>Edit</button>
                          </div>
                        </div>

                      </div>

                      <div className='row px-3 g-4 py-3'>
                        <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                          <p className=" pe-3">Total mark obtained:</p>
                          <p className='light-text'>{details.total_marks_obtain}</p>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                          <p className=" pe-3">Student average:</p>
                          <p className='light-text'>{details.student_average}</p>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                          <p className=" pe-3">Class average:</p>
                          <p className='light-text'>{details.class_average}</p>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                          <p className=" pe-3">Total student:</p>
                          <p className='light-text'>{details.total_students}</p>
                        </div>


                        <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                          <p className=" pe-3">Position:</p>
                          <p className='light-text'>{details.position}</p>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-center">
                          <p className=" pe-3">Decision:</p>
                          <p className='light-text'>{details.decision}</p>
                        </div>
                      </div>


                    </div>

                    <div className="row g-4">
                      <div className="col-12">
                        <div className="">
                          <div className="site-boxes  border-radius-10px result-table non-wrap-text scroll-bar ">
                            <div className="border-bottom1 px-3 py-2 d-flex justify-content-between align-center">
                              <p className='font-bold'>RESULTS SCORES</p>
                              <button onClick={handleShowScoreInformationModal} className='site-inverse-btn px-3'><i className="ri-edit-line me-2"></i>Edit</button>
                            </div>

                            <div className="p-3">
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
                                    return (
                                      <tr key={index}>
                                        <td className='light-text'>{formatName(subject.subject_name)}</td>
                                        <td><p className="light-text">{subject.total_ca}</p></td>
                                        <td><p className="light-text">{subject.exam}</p></td>
                                        <td><p className="light-text">{subject.total}</p></td>
                                        <td><p className="light-text">{subject.grade}</p></td>
                                        <td><p className="light-text">{subject.position}</p></td>
                                      </tr>
                                    );

                                  })}
                                </tbody>
                              </table>
                            </div>

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
                        <div className='site-boxes  border-radius-10px  non-wrap-text'>
                          <div className="border-bottom1 px-3 py-2 d-flex justify-content-between align-center">
                            <p>AFFECTIVE TRAIT</p>
                            <button onClick={handleShowAffectiveTraitInformationModal} className='site-inverse-btn px-3'><i className="ri-edit-line me-2"></i>Edit</button>

                          </div>

                          <div className="row g-4 p-3 light-text">
                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Agility:</p>
                                <p className="light-text">{details.agility}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Caring:</p>
                                <p className="light-text">{details.caring}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Communication:</p>
                                <p className="light-text">{details.communication}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Loving:</p>
                                <p className="light-text">{details.loving}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Punality:</p>
                                <p className="light-text">{details.puntuality}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Seriousness:</p>
                                <p className="light-text">{details.seriousness}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Honesty:</p>
                                <p className="light-text">{details.honesty}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Leadership:</p>
                                <p className="light-text">{details.leadership}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Perservance:</p>
                                <p className="light-text">{details.perserverance}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Socialization:</p>
                                <p className="light-text">{details.socialization}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Politness:</p>
                                <p className="light-text">{details.politeness}</p>
                              </div>
                            </div>

                            <div className="col-sm-6 col-xl-4">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Music:</p>
                                <p className="light-text">{details.music}</p>
                              </div>
                            </div>
                          </div>


                        </div>

                      </div>

                      <div className="col-md-6">
                        <div className='site-boxes  border-radius-10px  non-wrap-text  mb-4'>
                          <div className="border-bottom1 px-3 py-2 d-flex justify-content-between align-center">
                            <p>PSYCHOMOTOR  TRAIT</p>
                            <button onClick={handleShowPsychomotorInformationModal} className='site-inverse-btn px-3'><i className="ri-edit-line me-2"></i>Edit</button>
                          </div>

                          <div className="d-flex flex-wrap g-4 p-3 light-text">
                            <div className="me-4 mb-2">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Attentiveness:</p>
                                <p className="light-text">{details.attentiveness}</p>
                              </div>
                            </div>

                            <div className="me-4 mb-2">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Handling of tools:</p>
                                <p className="light-text">{details.handling_of_tools}</p>
                              </div>
                            </div>





                            <div className="me-4 mb-2">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Neatness:</p>
                                <p className="light-text">{details.neatness}</p>
                              </div>
                            </div>



                            <div className="me-4 mb-2">
                              <div className="d-flex align-center">
                                <p className='pe-2'>Tools:</p>
                                <p className="light-text">{details.tools}</p>
                              </div>
                            </div>
                          </div>


                        </div>

                        <div className='site-boxes  border-radius-10px  non-wrap-text py-3'>
                          <div className="border-bottom1 px-3 py-1">
                            <p>TRAIT SCALE</p>
                          </div>

                          <div className=" p-3 light-text row g-4">
                            <div className='col-6 col-xl-3'>
                              <p>A = EXCELLENT</p>
                            </div>

                            <div className='col-6 col-xl-3'>
                              <p>B = VERY GOOD</p>
                            </div>

                            <div className='col-6 col-xl-3'>
                              <p>C = GOOD</p>
                            </div>

                            <div className='col-6 col-xl-3'>
                              <p>D = FAIR</p>
                            </div>

                            <div className='col-6 col-xl-3'>
                              <p>E = POOR</p>
                            </div>

                          </div>
                        </div>

                      </div>

                      <div className="col-12">
                        <div className='site-boxes  border-radius-10px pb-4'>
                          <div className="border-bottom1 px-3 py-2 d-flex justify-content-between align-center">
                            <p>REMARKS</p>
                            <button onClick={handleShowRemarkInformationModal} className='site-inverse-btn px-3'><i className="ri-edit-line me-2"></i>Edit</button>
                          </div>

                          <div className="pt-3 light-text">
                            <div className="d-sm-flex non-wrap-text px-3 pb-3">
                              <p className="pe-3">Teacher comment</p>
                              <p className="light-text">{details.teacher_comment}</p>
                            </div>

                            <div className="d-sm-flex non-wrap-text px-3 pb-3">
                              <p className="pe-3">Principal Comment</p>
                              <p className="light-text">{details.principal_comment}</p>
                            </div>

                            <div className="d-sm-flex non-wrap-text px-3">
                              <p className="pe-3">Next term begins</p>
                              <p className="light-text">{details.next_term_begins}</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>


                  </section>
                </div>
              ) : (
                <div></div>
              )}

            </div>
          )
        }



      </div>
    </div>
  );
}
