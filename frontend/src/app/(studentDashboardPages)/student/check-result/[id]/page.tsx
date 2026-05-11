"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

export default function IndividualResultPage({ params }: { params: Promise<any> }) {
  const { id } = use(params);


  const {
    authTokens,
    formatName,

  } = useContext(AuthContext)!;



  const router = useRouter();
  const [allowAccess, setAllowAccess] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const flag = sessionStorage.getItem('canAccessFinalPage');

    if (flag === 'true') {
      setAllowAccess(true);
    } else {
      setAllowAccess(false);
      router.replace('/404');
    }

    // Handle page refresh: do NOT clear flag
    const handleBeforeUnload = () => {
      sessionStorage.setItem('canAccessFinalPage', 'true');
    };


    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);


  const [details, setDetails] = useState<any>(null)

  const [loading, setLoading] = useState(true)

  const [subjectResults, setSubjectResults] = useState<any>([]);

  console.log('subjectResults', subjectResults)



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

        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }



  useEffect(() => {
    IndividualDetailsFunction()
  }, [])






  return (
    <div>

      {allowAccess && (
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
      )}
    </div>
  );
}
