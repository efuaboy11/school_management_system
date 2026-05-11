"use client"

import { createContext, useContext, useState } from "react";

import AuthContext from "./AuthContext";
import { ReactNode } from "react";

interface AllDataContextTye {

  sectionLabels: Record<string, string>;

  //queryset
  studentQuery: string
  setStudentQuery: (data: string) => void
  studentClassQuery: string
  setStudentClassQuery: (data: string) => void
  termQuery: string
  setTermQuery: (data: string) => void
  sessionQuery: string
  setSessionQuery: (data: string) => void
  feeTypeQuery: string
  setFeeTypeQuery: (data: string) => void
  productCategoriesQuery: string
  setProductCategoriesQuery: (data: string) => void
  statusQuery: string
  setStatusQuery: (data: string) => void
  subjectQuery: string
  setSubjectQuery: (data: string) => void

  //Student
  studentCount: number
  setStudentCount: (count: number) => void
  recentStudent: any[]
  setRecentStudent: (student: any[]) => void
  studentData: any[]
  setStudentData: (data: any[]) => void
  studentLoader: boolean
  setStudentLoader: (loader: boolean) => void
  studentSearch: string
  setStudentSearch: (loader: string) => void
  studentGroupData: any[]
  setStudentGroupData: (student: any[]) => void

  // teacher
  teacherCount: number
  setTeacherCount: (count: number) => void
  recentTeacher: any[]
  setRecentTeacher: (data: any[]) => void
  teacherData: any[]
  setTeacherData: (data: any[]) => void
  teacherLoader: boolean
  setTeacherLoader: (loader: boolean) => void
  teacherSearch: string
  setTeacherSearch: (loader: string) => void


  // parent
  parentCount: number
  setParentCount: (count: number) => void
  recentParent: any[]
  setRecentParent: (data: any[]) => void
  parentData: any[]
  setParentData: (data: any[]) => void
  parentLoader: boolean
  setParentLoader: (loader: boolean) => void
  parentSearch: string
  setParentSearch: (loader: string) => void


  // Staff
  staffCount: number
  setStaffCount: (count: number) => void
  recentStaff: any[]
  setRecentStaff: (data: any[]) => void
  staffData: any[]
  setStaffData: (data: any[]) => void
  staffLoader: boolean
  setStaffLoader: (loader: boolean) => void
  staffSearch: string
  setStaffSearch: (loader: string) => void


  //hr
  hrCount: number
  setHrCount: (count: number) => void
  hrData: any[]
  setHrData: (data: any[]) => void
  hrLoader: boolean
  setHrLoader: (loader: boolean) => void
  hrSearch: string
  setHrSearch: (loader: string) => void

  // bursary
  bursaryCount: number
  setBursaryCount: (count: number) => void
  bursaryData: any[]
  setBursaryData: (data: any[]) => void
  bursaryLoader: boolean
  setBursaryLoader: (loader: boolean) => void
  bursarySearch: string
  setBursarySearch: (loader: string) => void

  // store Keeper
  storeKeeperCount: number
  setStoreKeeperCount: (count: number) => void
  storeKeeperData: any[]
  setStoreKeeperData: (data: any[]) => void
  storeKeeperLoader: boolean
  setStoreKeeperLoader: (loader: boolean) => void
  storeKeeperSearch: string
  setStoreKeeperSearch: (loader: string) => void

  // result officer
  resultOfficerCount: number
  setResultOfficerCount: (count: number) => void
  resultOfficerData: any[]
  setResultOfficerData: (data: any[]) => void
  resultOfficerLoader: boolean
  setResultOfficerLoader: (loader: boolean) => void
  resultOfficerSearch: string
  setResultOfficerSearch: (loader: string) => void

  // academic officer
  academicOfficerCount: number
  setAcademicOfficerCount: (count: number) => void
  academicOfficerData: any[]
  setAcademicOfficerData: (data: any[]) => void
  academicOfficerLoader: boolean
  setAcademicOfficerLoader: (loader: boolean) => void
  academicOfficerSearch: string
  setAcademicOfficerSearch: (loader: string) => void


  // other Staff
  otherStaffCount: number
  setOtherStaffCount: (count: number) => void
  otherStaffData: any[]
  setOtherStaffData: (data: any[]) => void
  otherStaffLoader: boolean
  setOtherStaffLoader: (loader: boolean) => void
  otherStaffSearch: string
  setOtherStaffSearch: (loader: string) => void

  // email
  emailCount: number
  setEmailCount: (count: number) => void
  recentEmail: any[]
  setRecentEmail: (data: any[]) => void
  emailData: any[]
  setEmailData: (data: any[]) => void
  emailLoader: boolean
  setEmailLoader: (loader: boolean) => void
  emailSearch: string
  setEmailSearch: (loader: string) => void


  // subject
  subjectCount: number
  setSubjectCount: (count: number) => void
  recentSubject: any[]
  setRecentSubject: (data: any[]) => void
  subjectData: any[]
  setSubjectData: (data: any[]) => void
  subjectLoader: boolean
  setSubjectLoader: (loader: boolean) => void
  subjectSearch: string
  setSubjectSearch: (loader: string) => void
  subjectGroupData: any[]
  setSubjectGroupData: (data: any[]) => void

  termCount: number
  setTermCount: (count: number) => void
  termData: any[]
  setTermData: (data: any[]) => void
  termLoader: boolean
  setTermLoader: (loader: boolean) => void
  termSearch: string
  setTermSearch: (loader: string) => void

  // session
  sessionCount: number
  setSessionCount: (count: number) => void
  currentsession: any
  setCurentSession: (data: any) => void
  sessionData: any[]
  setSessionData: (data: any[]) => void
  sessionLoader: boolean
  setSessionLoader: (loader: boolean) => void
  sessionSearch: string
  setSessionSearch: (loader: string) => void

  // student class
  studentClassCount: number
  setStudentClassCount: (count: number) => void
  recentStudentClass: any[]
  setRecentStudentClass: (data: any[]) => void
  studentClassData: any[]
  setStudentClassData: (data: any[]) => void
  studentClassLoader: boolean
  setStudentClassLoader: (loader: boolean) => void
  studentClassSearch: string
  setStudentClassSearch: (loader: string) => void


  // admin or hr notifcation
  adminHrNotificationCount: number
  setAdminHrNotificationCount: (count: number) => void
  recentAdminHrNotification: any[]
  setRecentAdminHrNotification: (data: any[]) => void
  adminHrNotificationData: any[]
  setAdminHrNotificationData: (data: any[]) => void
  adminHrNotificationLoader: boolean
  setAdminHrNotificationLoader: (loader: boolean) => void
  adminHrNotificationSearch: string
  setAdminHrNotificationSearch: (loader: string) => void

  // school notification
  schoolNotificationCount: number
  setSchoolNotificationCount: (count: number) => void
  recentSchoolNotification: any[]
  setRecentSchoolNotification: (data: any[]) => void
  schoolNotificationData: any[]
  setSchoolNotificationData: (data: any[]) => void
  schoolNotificationLoader: boolean
  setSchoolNotificationLoader: (loader: boolean) => void
  schoolNotificationSearch: string
  setSchoolNotificationSearch: (loader: string) => void

  // class notification
  classNotificationCount: number
  setClassNotificationCount: (count: number) => void
  recentClassNotification: any[]
  setRecentClassNotification: (data: any[]) => void
  classNotificationData: any[]
  setClassNotificationData: (data: any[]) => void
  classNotificationLoader: boolean
  setClassNotificationLoader: (loader: boolean) => void
  classNotificationSearch: string
  setClassNotificationSearch: (loader: string) => void


  // staff notification
  staffNotificationCount: number
  setStaffNotificationCount: (count: number) => void
  recentStaffNotification: any[]
  setRecentStaffNotification: (data: any[]) => void
  staffNotificationData: any[]
  setStaffNotificationData: (data: any[]) => void
  staffNotificationLoader: boolean
  setStaffNotificationLoader: (loader: boolean) => void
  staffNotificationSearch: string
  setStaffNotificationSearch: (loader: string) => void

  // school event
  schoolEventCount: number
  setSchoolEventCount: (count: number) => void
  recentSchoolEvent: any[]
  setRecentSchoolEvent: (data: any[]) => void
  schoolEventData: any[]
  setSchoolEventData: (data: any[]) => void
  schoolEventLoader: boolean
  setSchoolEventLoader: (loader: boolean) => void
  schoolEventSearch: string
  setSchoolEventSearch: (loader: string) => void


  // asignment
  assignmentCount: number
  setAssignmentCount: (count: number) => void
  recentAssignment: any[]
  setRecentAssignment: (data: any[]) => void
  assignmentData: any[]
  setAssignmentData: (data: any[]) => void
  assignmentLoader: boolean
  setAssignmentLoader: (loader: boolean) => void
  assignmentSearch: string
  setAssignmentSearch: (loader: string) => void

  // assignment Submission
  assignmentSubmissionCount: number
  setAssignmentSubmissionCount: (count: number) => void
  recentAssignmentSubmission: any[]
  setRecentAssignmentSubmission: (data: any[]) => void
  assignmentSubmissionData: any[]
  setAssignmentSubmissionData: (data: any[]) => void
  assignmentSubmissionLoader: boolean
  setAssignmentSubmissionLoader: (loader: boolean) => void
  assignmentSubmissionSearch: string
  setAssignmentSubmissionSearch: (loader: string) => void

  // class Timetable
  classTimetableCount: number
  setClassTimetableCount: (count: number) => void
  recentClassTimetable: any[]
  setRecentClassTimetable: (data: any[]) => void
  classTimetableData: any[]
  setClassTimetableData: (data: any[]) => void
  classTimetableLoader: boolean
  setClassTimetableLoader: (loader: boolean) => void
  classTimetableSearch: string
  setClassTimetableSearch: (loader: string) => void

  // Scheme of work
  schemeOfWorkCount: number
  setSchemeOfWorkCount: (count: number) => void
  schemeOfWorkData: any[]
  setSchemeOfWorkData: (data: any[]) => void
  schemeOfWorkLoader: boolean
  setSchemeOfWorkLoader: (loader: boolean) => void
  schemeOfWorkSearch: string
  setSchemeOfWorkSearch: (loader: string) => void

  //Scratch card
  scratchCardCount: number
  setScratchCardCount: (count: number) => void
  scratchCardData: any[]
  setScratchCardData: (data: any[]) => void
  scratchCardLoader: boolean
  setScratchCardLoader: (loader: boolean) => void
  scratchCardSearch: string
  setScratchCardSearch: (search: string) => void

  // E Result
  eResultCount: number
  setEResultCount: (count: number) => void
  eResultData: any[]
  setEResultData: (data: any[]) => void
  recentEResultData: any[]
  setRecentEResultData: (data: any[]) => void
  eResultLoader: boolean
  setEResultLoader: (loader: boolean) => void
  eResultSearch: string
  setEResultSearch: (search: string) => void

  // payment Method
  paymentMethodCount: number
  setPaymentMethodCount: (count: number) => void
  paymentMethodData: any[]
  setPaymentMethodData: (data: any[]) => void
  paymentMethodLoader: boolean
  setPaymentMethodLoader: (loader: boolean) => void
  paymentMethodSearch: string
  setPaymentMethodSearch: (loader: string) => void


  // school Fees
  schoolFeesCount: number
  setSchoolFeesCount: (count: number) => void
  schoolFeesData: any[]
  setSchoolFeesData: (data: any[]) => void
  schoolFeesLoader: boolean
  setSchoolFeesLoader: (loader: boolean) => void
  schoolFeesSearch: string
  setSchoolFeesSearch: (loader: string) => void

  // all school fees payment
  allSchoolFeesPaymentCount: number
  setAllSchoolFeesPaymentCount: (count: number) => void
  totalAllSchoolFeesPayment: number
  setTotalAllSchoolFeesPayment: (total: number) => void
  recentAllSchoolFeesPayment: any[]
  setRecentAllSchoolFeesPayment: (data: any[]) => void
  allSchoolFeesPaymentData: any[]
  setAllSchoolFeesPaymentData: (data: any[]) => void
  allSchoolFeesPaymentLoader: boolean
  setAllSchoolFeesPaymentLoader: (loader: boolean) => void
  allSchoolFeesPaymentSearch: string
  setAllSchoolFeesPaymentSearch: (loader: string) => void


  // pending school fees payment
  pendingSchoolFeesPaymentCount: number
  setPendingSchoolFeesPaymentCount: (count: number) => void
  totalPendingSchoolFeesPayment: number
  setTotalPendingSchoolFeesPayment: (total: number) => void
  recentPendingSchoolFeesPayment: any[]
  setRecentPendingSchoolFeesPayment: (data: any[]) => void
  pendingSchoolFeesPaymentData: any[]
  setPendingSchoolFeesPaymentData: (data: any[]) => void
  pendingSchoolFeesPaymentLoader: boolean
  setPendingSchoolFeesPaymentLoader: (loader: boolean) => void
  pendingSchoolFeesPaymentSearch: string
  setPendingSchoolFeesPaymentSearch: (loader: string) => void

  // sucess school fees payment
  sucessSchoolFeesPaymentCount: number
  setSucessSchoolFeesPaymentCount: (count: number) => void
  totalSucessSchoolFeesPayment: number
  setTotalSucessSchoolFeesPayment: (total: number) => void
  recentSucessSchoolFeesPayment: any[]
  setRecentSucessSchoolFeesPayment: (data: any[]) => void
  sucessSchoolFeesPaymentData: any[]
  setSucessSchoolFeesPaymentData: (data: any[]) => void
  sucessSchoolFeesPaymentLoader: boolean
  setSucessSchoolFeesPaymentLoader: (loader: boolean) => void
  sucessSchoolFeesPaymentSearch: string
  setSucessSchoolFeesPaymentSearch: (loader: string) => void

  // declined school fees payment
  declinedSchoolFeesPaymentCount: number
  setDeclinedSchoolFeesPaymentCount: (count: number) => void
  totalDeclinedSchoolFeesPayment: number
  setTotalDeclinedSchoolFeesPayment: (total: number) => void
  recentDeclinedSchoolFeesPayment: any[]
  setRecentDeclinedSchoolFeesPayment: (data: any[]) => void
  declinedSchoolFeesPaymentData: any[]
  setDeclinedSchoolFeesPaymentData: (data: any[]) => void
  declinedSchoolFeesPaymentLoader: boolean
  setDeclinedSchoolFeesPaymentLoader: (loader: boolean) => void
  declinedSchoolFeesPaymentSearch: string
  setDeclinedSchoolFeesPaymentSearch: (loader: string) => void


  // bills
  billsCount: number
  setBillsCount: (count: number) => void
  recentBills: any[]
  setRecentBills: (data: any[]) => void
  billsData: any[]
  setBillsData: (data: any[]) => void
  billsLoader: boolean
  setBillsLoader: (loader: boolean) => void
  billsSearch: string
  setBillsSearch: (loader: string) => void

  // bills payment
  billsPaymentCount: number
  setBillsPaymentCount: (count: number) => void
  totalBillsPayment: number
  setTotalBillsPayment: (total: number) => void
  recentBillsPayment: any[]
  setRecentBillsPayment: (data: any[]) => void
  billsPaymentData: any[]
  setBillsPaymentData: (data: any[]) => void
  billsPaymentLoader: boolean
  setBillsPaymentLoader: (loader: boolean) => void
  billsPaymentSearch: string
  setBillsPaymentSearch: (loader: string) => void


  // pending bills
  pendingBillsPaymentCount: number
  setPendingBillsPaymentCount: (count: number) => void
  totalPendingBillsPayment: number
  setTotalPendingBillsPayment: (total: number) => void
  recentPendingBillsPayment: any[]
  setRecentPendingBillsPayment: (data: any[]) => void
  pendingBillsPaymentData: any[]
  setPendingBillsPaymentData: (data: any[]) => void
  pendingBillsPaymentLoader: boolean
  setPendingBillsPaymentLoader: (loader: boolean) => void
  pendingBillsPaymentSearch: string
  setPendingBillsPaymentSearch: (loader: string) => void

  // sucess bills
  sucessBillsPaymentCount: number
  setSucessBillsPaymentCount: (count: number) => void
  totalSucessBillsPayment: number
  setTotalSucessBillsPayment: (count: number) => void
  recentSucessBillsPayment: any[]
  setRecentSucessBillsPayment: (data: any[]) => void
  sucessBillsPaymentData: any[]
  setSucessBillsPaymentData: (data: any[]) => void
  sucessBillsPaymentLoader: boolean
  setSucessBillsPaymentLoader: (loader: boolean) => void
  sucessBillsPaymentSearch: string
  setSucessBillsPaymentSearch: (loader: string) => void

  // declned bills
  declinedBillsPaymentCount: number
  setDeclinedBillsPaymentCount: (count: number) => void
  totalDeclinedBillsPayment: number
  setTotalDeclinedBillsPayment: (total: number) => void
  recentDeclinedBillsPayment: any[]
  setRecentDeclinedBillsPayment: (data: any[]) => void
  declinedBillsPaymentData: any[]
  setDeclinedBillsPaymentData: (data: any[]) => void
  declinedBillsPaymentLoader: boolean
  setDeclinedBillsPaymentLoader: (loader: boolean) => void
  declinedBillsPaymentSearch: string
  setDeclinedBillsPaymentSearch: (search: string) => void


  // Bank Account
  bankAccountCount: number
  setBankAccountCount: (count: number) => void
  bankAccountData: any[]
  setBankAccountData: (data: any[]) => void
  bankAccountLoader: boolean
  setBankAccountLoader: (loader: boolean) => void
  bankAccountSearch: string
  setBankAccountSearch: (search: string) => void


  // product categories
  productCatergoriesCount: number
  setProductCatergoriesCount: (count: number) => void
  productCatergoriesData: any[]
  setProductCatergoriesData: (data: any[]) => void
  productCatergoriesLoader: boolean
  setProductCatergoriesLoader: (loader: boolean) => void
  productCatergoriesSearch: string
  setProductCatergoriesSearch: (search: string) => void


  //product
  productCount: number
  setProductCount: (count: number) => void
  recentProduct: any[]
  setRecentProduct: (data: any[]) => void
  productData: any[]
  setProductData: (data: any[]) => void
  productLoader: boolean
  setProductLoader: (loader: boolean) => void
  productSearch: string
  setProductSearch: (search: string) => void

  // favourite product
  favouriteProductCount: number
  setFavouriteProductCount: (count: number) => void
  recentFavouriteProduct: any[]
  setRecentFavouriteProduct: (data: any[]) => void
  favouriteProductData: any[]
  setFavouriteProductData: (data: any[]) => void
  favouriteProductLoader: boolean
  setFavouriteProductLoader: (loader: boolean) => void
  favouriteProductSearch: string
  setFavouriteProductSearch: (loader: string) => void


  // order product
  orderProductCount: number
  setOrderProductCount: (count: number) => void
  recentOrderProduct: any[]
  setRecentOrderProduct: (data: any[]) => void
  orderProductData: any[]
  setOrderProductData: (data: any[]) => void
  orderProductLoader: boolean
  setOrderProductLoader: (loader: boolean) => void
  orderProductSearch: string
  setOrderProductSearch: (loader: string) => void

  // --------------------------------------- Function -------------------------------

  // student
  StudentFunction: () => Promise<void>;
  FilterStudent: () => Promise<void>;

  // teacher
  TeacherFunction: () => Promise<void>;
  FilterTeacher: () => Promise<void>;

  // parent
  ParentFunction: () => Promise<void>;
  FilterParent: () => Promise<void>;

  // staff
  StaffFunction: () => Promise<void>;
  FilterStaff: () => Promise<void>;

  // Hr
  HrFunction: () => Promise<void>;
  FilterHr: () => Promise<void>;

  // Bursary
  BursaryFunction: () => Promise<void>;
  FilterBursary: () => Promise<void>;

  //store keeper #
  StoreKeeperFunction: () => Promise<void>;
  FilterStoreKeeper: () => Promise<void>;

  // result officer
  ResultOfficerFunction: () => Promise<void>;
  FilterResultOfficer: () => Promise<void>;

  // academic officer
  AcademicOfficerFunction: () => Promise<void>;
  FilterAcademicOfficer: () => Promise<void>;

  // other staff
  OtherStaffFunction: () => Promise<void>;
  FilterOtherStaff: () => Promise<void>;

  // email
  EmailFunction: () => Promise<void>;
  FilterEmail: () => Promise<void>;

  //subject
  SubjectFunction: () => Promise<void>;
  FilterSubject: () => Promise<void>;

  // Terms
  TermFunction: () => Promise<void>;
  FilterTerm: () => Promise<void>;

  // Session
  SessionFunction: () => Promise<void>;
  FilterSession: () => Promise<void>;

  // Student Class
  StudentClassFunction: () => Promise<void>;
  FilterStudentClass: () => Promise<void>;

  // Admin or hr Notification
  AdminHrNotificationFunction: () => Promise<void>;
  FilteradminHrNotification: () => Promise<void>;

  // School Notification
  SchoolNotificationFunction: () => Promise<void>;
  FilterSchoolNotification: () => Promise<void>;

  // class Notification
  ClassNotificationFunction: () => Promise<void>;
  FilterClassNotification: () => Promise<void>;

  // staff Notification
  StaffNotificationFunction: () => Promise<void>;
  FilterStaffNotification: () => Promise<void>;

  //school event
  SchoolEventFunction: () => Promise<void>;
  FilterSchoolEvent: () => Promise<void>;

  // Assignment 
  AssignmentFunction: () => Promise<void>;
  FilterAssignment: () => Promise<void>;

  // Assignment Submission
  AssignmentSubmissionFunction: () => Promise<void>;
  FilterAssignmentSubmission: () => Promise<void>;

  // Class Timetable
  ClassTimetableFunction: () => Promise<void>;
  FilterSchemeOFWork: () => Promise<void>;

  // Scheme of work
  SchemeOFWorkFunction: () => Promise<void>;
  FilterClassTimetable: () => Promise<void>;

  // Scratch Card
  ScratchCardFunction: () => Promise<void>;
  FilterScratchCard: () => Promise<void>;

  // E Result
  EResultFunction: () => Promise<void>;
  FilterEResult: () => Promise<void>;

  // Payment Method
  PaymentMethodFunction: () => Promise<void>
  FilterPaymentMethod: () => Promise<void>

  // School Fees
  SchoolFeesFunction: () => Promise<void>
  FilterSchoolFees: () => Promise<void>

  //All  School Fees Payment
  AllSchoolFeesPaymentFunction: () => Promise<void>
  FilterAllSchoolFeesPayment: () => Promise<void>

  //pending  School Fees Payment
  PendingSchoolFeesPaymentFunction: () => Promise<void>
  FilterPendingSchoolFeesPayment: () => Promise<void>

  // success school Fees payment
  SucessSchoolFeesPaymentFunction: () => Promise<void>
  FilterSucessSchoolFeesPayment: () => Promise<void>

  //declined school fees payment
  DeclinedSchoolFeesPaymentFunction: () => Promise<void>
  FilterDeclinedSchoolFeesPayment: () => Promise<void>

  // bills
  BillsFunction: () => Promise<void>
  FilterBills: () => Promise<void>

  // bill payment
  BillsPaymentFunction: () => Promise<void>
  FilterBillsPayment: () => Promise<void>


  // pending Bills
  PendingBillsPaymentFunction: () => Promise<void>
  FilterPendingBillsPayment: () => Promise<void>

  // success Bills
  SucessBillsPaymentFunction: () => Promise<void>
  FilterSucessBillsPayment: () => Promise<void>

  // declined Bills'
  DeclinedBillsPaymentFunction: () => Promise<void>
  FilterDeclinedBillsPayment: () => Promise<void>

  // Bank Acount'
  BankAccountFunction: () => Promise<void>
  FilterBankAccount: () => Promise<void>

  //product categories
  ProductCatergoriesFunction: () => Promise<void>
  FilterProductCatergories: () => Promise<void>

  // product
  ProductFunction: () => Promise<void>
  FilterProduct: () => Promise<void>

  // favourite product
  FavouriteProductFunction: () => Promise<void>
  FilterFavouriteProduct: () => Promise<void>

  // order product
  OrderProductFunction: () => Promise<void>
  FilterOrderProduct: () => Promise<void>



}


const AllDataContext = createContext<AllDataContextTye | undefined>(undefined)
export default AllDataContext

export const AllDataProvider = ({ children }: { children: ReactNode }) => {
  const { authTokens } = useContext(AuthContext)!


  const sectionOrder = [
    'general',
    'pre_school',
    'nursery',
    'primary',
    'junior_secondary',
    'senior_secondary',
    'others',
  ];

  const sectionLabels: Record<string, string> = {
    general: 'General',
    pre_school: 'Pre School',
    nursery: 'Nursery',
    primary: 'Primary',
    junior_secondary: 'Junior Secondary',
    senior_secondary: 'Senior Secondary',
    others: 'Others',
  };

  const [studentQuery, setStudentQuery] = useState('')
  const [studentClassQuery, setStudentClassQuery] = useState('')
  const [termQuery, setTermQuery] = useState('')
  const [sessionQuery, setSessionQuery] = useState('')
  const [feeTypeQuery, setFeeTypeQuery] = useState('')
  const [productCategoriesQuery, setProductCategoriesQuery] = useState('')
  const [statusQuery, setStatusQuery] = useState('')
  const [subjectQuery, setSubjectQuery] = useState('')

  const [studentCount, setStudentCount] = useState(0)
  const [recentStudent, setRecentStudent] = useState<any[]>([])
  const [studentData, setStudentData] = useState<any[]>([])
  const [studentLoader, setStudentLoader] = useState(true)
  const [studentSearch, setStudentSearch] = useState('')
  const [studentGroupData, setStudentGroupData] = useState<any>([])


  const [teacherCount, setTeacherCount] = useState(0)
  const [recentTeacher, setRecentTeacher] = useState<any[]>([])
  const [teacherData, setTeacherData] = useState<any>([])
  const [teacherLoader, setTeacherLoader] = useState(true)
  const [teacherSearch, setTeacherSearch] = useState('')

  const [parentCount, setParentCount] = useState(0)
  const [recentParent, setRecentParent] = useState<any[]>([])
  const [parentData, setParentData] = useState<any>([])
  const [parentLoader, setParentLoader] = useState(true)
  const [parentSearch, setParentSearch] = useState('')

  const [staffCount, setStaffCount] = useState(0)
  const [recentStaff, setRecentStaff] = useState<any>([])
  const [staffData, setStaffData] = useState<any>([])
  const [staffLoader, setStaffLoader] = useState(true)
  const [staffSearch, setStaffSearch] = useState('')


  const [hrCount, setHrCount] = useState(0)
  const [hrData, setHrData] = useState<any>([])
  const [hrLoader, setHrLoader] = useState(true)
  const [hrSearch, setHrSearch] = useState('')


  const [bursaryCount, setBursaryCount] = useState(0)
  const [bursaryData, setBursaryData] = useState<any>([])
  const [bursaryLoader, setBursaryLoader] = useState(true)
  const [bursarySearch, setBursarySearch] = useState('')


  const [storeKeeperCount, setStoreKeeperCount] = useState(0)
  const [storeKeeperData, setStoreKeeperData] = useState<any>([])
  const [storeKeeperLoader, setStoreKeeperLoader] = useState(true)
  const [storeKeeperSearch, setStoreKeeperSearch] = useState('')


  const [resultOfficerCount, setResultOfficerCount] = useState(0)
  const [resultOfficerData, setResultOfficerData] = useState<any>([])
  const [resultOfficerLoader, setResultOfficerLoader] = useState(true)
  const [resultOfficerSearch, setResultOfficerSearch] = useState('')

  const [academicOfficerCount, setAcademicOfficerCount] = useState(0)
  const [academicOfficerData, setAcademicOfficerData] = useState<any>([])
  const [academicOfficerLoader, setAcademicOfficerLoader] = useState(true)
  const [academicOfficerSearch, setAcademicOfficerSearch] = useState('')


  const [otherStaffCount, setOtherStaffCount] = useState(0)
  const [otherStaffData, setOtherStaffData] = useState<any>([])
  const [otherStaffLoader, setOtherStaffLoader] = useState(true)
  const [otherStaffSearch, setOtherStaffSearch] = useState('')

  const [emailCount, setEmailCount] = useState(0)
  const [emailData, setEmailData] = useState<any>([])
  const [recentEmail, setRecentEmail] = useState<any>([])
  const [emailLoader, setEmailLoader] = useState(true)
  const [emailSearch, setEmailSearch] = useState('')

  const [subjectCount, setSubjectCount] = useState(0)
  const [subjectData, setSubjectData] = useState<any>([])
  const [recentSubject, setRecentSubject] = useState<any>([])
  const [subjectLoader, setSubjectLoader] = useState(true)
  const [subjectSearch, setSubjectSearch] = useState('')
  const [subjectGroupData, setSubjectGroupData] = useState<any>([])

  const [termCount, setTermCount] = useState(0)
  const [termData, setTermData] = useState<any>([])
  const [termLoader, setTermLoader] = useState(true)
  const [termSearch, setTermSearch] = useState('')

  const [sessionCount, setSessionCount] = useState(0)
  const [sessionData, setSessionData] = useState<any>([])
  const [currentsession, setCurentSession] = useState<any>([])
  const [sessionLoader, setSessionLoader] = useState(true)
  const [sessionSearch, setSessionSearch] = useState('')

  const [studentClassCount, setStudentClassCount] = useState(0)
  const [studentClassData, setStudentClassData] = useState<any>([])
  const [recentStudentClass, setRecentStudentClass] = useState<any>([])
  const [studentClassLoader, setStudentClassLoader] = useState(true)
  const [studentClassSearch, setStudentClassSearch] = useState('')

  const [adminHrNotificationCount, setAdminHrNotificationCount] = useState(0)
  const [adminHrNotificationData, setAdminHrNotificationData] = useState<any>([])
  const [recentAdminHrNotification, setRecentAdminHrNotification] = useState<any>([])
  const [adminHrNotificationLoader, setAdminHrNotificationLoader] = useState(true)
  const [adminHrNotificationSearch, setAdminHrNotificationSearch] = useState('')


  const [schoolNotificationCount, setSchoolNotificationCount] = useState(0)
  const [schoolNotificationData, setSchoolNotificationData] = useState<any>([])
  const [recentSchoolNotification, setRecentSchoolNotification] = useState<any>([])
  const [schoolNotificationLoader, setSchoolNotificationLoader] = useState(true)
  const [schoolNotificationSearch, setSchoolNotificationSearch] = useState('')

  const [classNotificationCount, setClassNotificationCount] = useState(0)
  const [classNotificationData, setClassNotificationData] = useState<any>([])
  const [recentClassNotification, setRecentClassNotification] = useState<any>([])
  const [classNotificationLoader, setClassNotificationLoader] = useState(true)
  const [classNotificationSearch, setClassNotificationSearch] = useState('')

  const [staffNotificationCount, setStaffNotificationCount] = useState(0)
  const [staffNotificationData, setStaffNotificationData] = useState<any>([])
  const [recentStaffNotification, setRecentStaffNotification] = useState<any>([])
  const [staffNotificationLoader, setStaffNotificationLoader] = useState(true)
  const [staffNotificationSearch, setStaffNotificationSearch] = useState('')

  const [schoolEventCount, setSchoolEventCount] = useState(0)
  const [schoolEventData, setSchoolEventData] = useState<any>([])
  const [recentSchoolEvent, setRecentSchoolEvent] = useState<any>([])
  const [schoolEventLoader, setSchoolEventLoader] = useState(true)
  const [schoolEventSearch, setSchoolEventSearch] = useState('')

  const [assignmentCount, setAssignmentCount] = useState(0)
  const [assignmentData, setAssignmentData] = useState<any>([])
  const [recentAssignment, setRecentAssignment] = useState<any>([])
  const [assignmentLoader, setAssignmentLoader] = useState(true)
  const [assignmentSearch, setAssignmentSearch] = useState('')


  const [assignmentSubmissionCount, setAssignmentSubmissionCount] = useState(0)
  const [assignmentSubmissionData, setAssignmentSubmissionData] = useState<any>([])
  const [recentAssignmentSubmission, setRecentAssignmentSubmission] = useState<any>([])
  const [assignmentSubmissionLoader, setAssignmentSubmissionLoader] = useState(true)
  const [assignmentSubmissionSearch, setAssignmentSubmissionSearch] = useState('')

  const [classTimetableCount, setClassTimetableCount] = useState(0)
  const [classTimetableData, setClassTimetableData] = useState<any>([])
  const [recentClassTimetable, setRecentClassTimetable] = useState<any>([])
  const [classTimetableLoader, setClassTimetableLoader] = useState(true)
  const [classTimetableSearch, setClassTimetableSearch] = useState('')


  const [schemeOfWorkCount, setSchemeOfWorkCount] = useState(0)
  const [schemeOfWorkData, setSchemeOfWorkData] = useState<any>([])
  const [schemeOfWorkLoader, setSchemeOfWorkLoader] = useState(true)
  const [schemeOfWorkSearch, setSchemeOfWorkSearch] = useState('')

  const [scratchCardCount, setScratchCardCount] = useState(0)
  const [scratchCardData, setScratchCardData] = useState<any>([])
  const [scratchCardLoader, setScratchCardLoader] = useState(true)
  const [scratchCardSearch, setScratchCardSearch] = useState('')

  const [eResultCount, setEResultCount] = useState(0)
  const [eResultData, setEResultData] = useState<any[]>([])
  const [recentEResultData, setRecentEResultData] = useState<any[]>([])
  const [eResultLoader, setEResultLoader] = useState(true)
  const [eResultSearch, setEResultSearch] = useState('')


  const [paymentMethodCount, setPaymentMethodCount] = useState(0)
  const [paymentMethodData, setPaymentMethodData] = useState<any>([])
  const [recentPaymentMethod, setRecentPaymentMethod] = useState<any>([])
  const [paymentMethodLoader, setPaymentMethodLoader] = useState(true)
  const [paymentMethodSearch, setPaymentMethodSearch] = useState('')


  const [schoolFeesCount, setSchoolFeesCount] = useState(0)
  const [schoolFeesData, setSchoolFeesData] = useState<any>([])
  const [schoolFeesLoader, setSchoolFeesLoader] = useState(true)
  const [schoolFeesSearch, setSchoolFeesSearch] = useState('')

  const [allSchoolFeesPaymentCount, setAllSchoolFeesPaymentCount] = useState(0)
  const [totalAllSchoolFeesPayment, setTotalAllSchoolFeesPayment] = useState(0)
  const [recentAllSchoolFeesPayment, setRecentAllSchoolFeesPayment] = useState<any>([])
  const [allSchoolFeesPaymentData, setAllSchoolFeesPaymentData] = useState<any>([])
  const [allSchoolFeesPaymentLoader, setAllSchoolFeesPaymentLoader] = useState(true)
  const [allSchoolFeesPaymentSearch, setAllSchoolFeesPaymentSearch] = useState('')

  const [pendingSchoolFeesPaymentCount, setPendingSchoolFeesPaymentCount] = useState(0)
  const [totalPendingSchoolFeesPayment, setTotalPendingSchoolFeesPayment] = useState(0)
  const [recentPendingSchoolFeesPayment, setRecentPendingSchoolFeesPayment] = useState<any>([])
  const [pendingSchoolFeesPaymentData, setPendingSchoolFeesPaymentData] = useState<any>([])
  const [pendingSchoolFeesPaymentLoader, setPendingSchoolFeesPaymentLoader] = useState(true)
  const [pendingSchoolFeesPaymentSearch, setPendingSchoolFeesPaymentSearch] = useState('')


  const [sucessSchoolFeesPaymentCount, setSucessSchoolFeesPaymentCount] = useState(0)
  const [totalSucessSchoolFeesPayment, setTotalSucessSchoolFeesPayment] = useState(0)
  const [recentSucessSchoolFeesPayment, setRecentSucessSchoolFeesPayment] = useState<any>([])
  const [sucessSchoolFeesPaymentData, setSucessSchoolFeesPaymentData] = useState<any>([])
  const [sucessSchoolFeesPaymentLoader, setSucessSchoolFeesPaymentLoader] = useState(true)
  const [sucessSchoolFeesPaymentSearch, setSucessSchoolFeesPaymentSearch] = useState('')

  const [declinedSchoolFeesPaymentCount, setDeclinedSchoolFeesPaymentCount] = useState(0)
  const [totalDeclinedSchoolFeesPayment, setTotalDeclinedSchoolFeesPayment] = useState(0)
  const [recentDeclinedSchoolFeesPayment, setRecentDeclinedSchoolFeesPayment] = useState<any>([])
  const [declinedSchoolFeesPaymentData, setDeclinedSchoolFeesPaymentData] = useState<any>([])
  const [declinedSchoolFeesPaymentLoader, setDeclinedSchoolFeesPaymentLoader] = useState(true)
  const [declinedSchoolFeesPaymentSearch, setDeclinedSchoolFeesPaymentSearch] = useState('')

  const [billsCount, setBillsCount] = useState(0)
  const [billsData, setBillsData] = useState<any>([])
  const [recentBills, setRecentBills] = useState<any[]>([])
  const [billsLoader, setBillsLoader] = useState(true)
  const [billsSearch, setBillsSearch] = useState('')

  const [billsPaymentCount, setBillsPaymentCount] = useState(0)
  const [totalBillsPayment, setTotalBillsPayment] = useState(0)
  const [recentBillsPayment, setRecentBillsPayment] = useState<any>([])
  const [billsPaymentData, setBillsPaymentData] = useState<any>([])
  const [billsPaymentLoader, setBillsPaymentLoader] = useState(true)
  const [billsPaymentSearch, setBillsPaymentSearch] = useState('')


  const [pendingBillsPaymentCount, setPendingBillsPaymentCount] = useState(0)
  const [totalPendingBillsPayment, setTotalPendingBillsPayment] = useState(0)
  const [recentPendingBillsPayment, setRecentPendingBillsPayment] = useState<any>([])
  const [pendingBillsPaymentData, setPendingBillsPaymentData] = useState<any>([])
  const [pendingBillsPaymentLoader, setPendingBillsPaymentLoader] = useState(true)
  const [pendingBillsPaymentSearch, setPendingBillsPaymentSearch] = useState('')


  const [sucessBillsPaymentCount, setSucessBillsPaymentCount] = useState(0)
  const [totalSucessBillsPayment, setTotalSucessBillsPayment] = useState(0)
  const [recentSucessBillsPayment, setRecentSucessBillsPayment] = useState<any>([])
  const [sucessBillsPaymentData, setSucessBillsPaymentData] = useState<any>([])
  const [sucessBillsPaymentLoader, setSucessBillsPaymentLoader] = useState(true)
  const [sucessBillsPaymentSearch, setSucessBillsPaymentSearch] = useState('')

  const [declinedBillsPaymentCount, setDeclinedBillsPaymentCount] = useState(0)
  const [totalDeclinedBillsPayment, setTotalDeclinedBillsPayment] = useState(0)
  const [recentDeclinedBillsPayment, setRecentDeclinedBillsPayment] = useState<any>([])
  const [declinedBillsPaymentData, setDeclinedBillsPaymentData] = useState<any>([])
  const [declinedBillsPaymentLoader, setDeclinedBillsPaymentLoader] = useState(true)
  const [declinedBillsPaymentSearch, setDeclinedBillsPaymentSearch] = useState('')


  const [bankAccountCount, setBankAccountCount] = useState(0)
  const [bankAccountData, setBankAccountData] = useState<any>([])
  const [bankAccountLoader, setBankAccountLoader] = useState(true)
  const [bankAccountSearch, setBankAccountSearch] = useState('')

  const [productCatergoriesCount, setProductCatergoriesCount] = useState(0)
  const [productCatergoriesData, setProductCatergoriesData] = useState<any>([])
  const [productCatergoriesLoader, setProductCatergoriesLoader] = useState(true)
  const [productCatergoriesSearch, setProductCatergoriesSearch] = useState('')


  const [productCount, setProductCount] = useState(0)
  const [productData, setProductData] = useState<any>([])
  const [recentProduct, setRecentProduct] = useState<any>([])
  const [productLoader, setProductLoader] = useState(true)
  const [productSearch, setProductSearch] = useState('')

  const [favouriteProductCount, setFavouriteProductCount] = useState(0)
  const [favouriteProductData, setFavouriteProductData] = useState<any>([])
  const [recentFavouriteProduct, setRecentFavouriteProduct] = useState<any>([])
  const [favouriteProductLoader, setFavouriteProductLoader] = useState(true)
  const [favouriteProductSearch, setFavouriteProductSearch] = useState("")

  const [orderProductCount, setOrderProductCount] = useState(0)
  const [orderProductData, setOrderProductData] = useState<any>([])
  const [recentOrderProduct, setRecentOrderProduct] = useState<any>([])
  const [orderProductLoader, setOrderProductLoader] = useState(true)
  const [orderProductSearch, setOrderProductSearch] = useState('')



  const StudentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/students/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setStudentCount(data.length)
      }
      const sortedData = [...data].sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );

      const RecentsortedData = [...data].sort((a, b) =>
        new Date(b.date_joined).getTime() - new Date(a.date_joined).getTime()
      );

      const recentData = RecentsortedData.slice(0, 7);


      // Group by first letter
      const groupedByLetter: Record<string, typeof data> = {};

      sortedData.forEach(student => {
        const firstLetter = student.first_name[0].toUpperCase();
        if (!groupedByLetter[firstLetter]) {
          groupedByLetter[firstLetter] = [];
        }
        groupedByLetter[firstLetter].push(student);
      });

      // Sort keys alphabetically
      const sortedGroupedData = Object.keys(groupedByLetter)
        .sort()
        .reduce((acc, key) => {
          acc[key] = groupedByLetter[key];
          return acc;
        }, {} as typeof groupedByLetter);

      setStudentGroupData(sortedGroupedData);
      setRecentStudent(recentData)
      setStudentData(sortedData)
      setStudentLoader(false)


    } else {
      setStudentLoader(false)
    }



  }


  const FilterStudent = async () => {
    let url;

    if (studentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/students/?search=${studentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setStudentData(sortedData)
    }
  }



  // Teacher
  const TeacherFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/teachers/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setTeacherCount(data.length)
      }
      const sortedData = [...data].sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );

      const RecentsortedData = [...data].sort((a, b) =>
        new Date(b.date_joined).getTime() - new Date(a.date_joined).getTime()
      );
      const recentData = RecentsortedData.slice(0, 4);
      setRecentTeacher(recentData)
      setTeacherData(sortedData)
      setTeacherLoader(false)


    } else {
      setTeacherLoader(false)
    }



  }


  const FilterTeacher = async () => {
    let url;

    if (teacherSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/teachers/?search=${teacherSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setTeacherData(sortedData)
    }
  }


  const ParentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/parents/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setParentCount(data.length)
      }
      const sortedData = [...data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      const RecentsortedData = [...data].sort((a, b) =>
        new Date(b.date_joined).getTime() - new Date(a.date_joined).getTime()
      );

      const recentData = RecentsortedData.slice(0, 4);
      setRecentParent(recentData)
      setParentData(sortedData)
      setParentLoader(false)


    } else {
      setParentLoader(false)
    }



  }


  const FilterParent = async () => {
    let url;

    if (parentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/parents/?search=${parentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
      setParentData(sortedData)
    }
  }


  // Staff
  const StaffFunction = async () => {
    console.log('lpadign')
    const response = await fetch('https://school.amanilightequity.com/api/staff/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setStaffCount(data.length)
      }
      const sortedData = [...data].sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );

      const RecentsortedData = [...data].sort((a, b) =>
        new Date(b.date_joined).getTime() - new Date(a.date_joined).getTime()
      );

      const recentData = RecentsortedData.slice(0, 4);
      setRecentStaff(recentData)
      setStaffData(sortedData)
      setStaffLoader(false)


    } else {
      setStaffLoader(false)
    }



  }


  const FilterStaff = async () => {
    let url;

    if (staffSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/staff/?search=${staffSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setStaffData(sortedData)
    }
  }


  // HR
  const HrFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/hr/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setHrCount(data.length)
      }
      const sortedData = [...data].sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );


      setHrData(sortedData)
      setHrLoader(false)


    } else {
      setHrLoader(false)
    }



  }


  const FilterHr = async () => {
    let url;

    if (hrSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/hr/?search=${hrSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setHrData(sortedData)
    }
  }


  // Bursary
  const BursaryFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/bursary/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setBursaryCount(data.length)
      }
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setBursaryData(sortedData)
      setBursaryLoader(false)


    } else {
      setBursaryLoader(false)
    }



  }


  const FilterBursary = async () => {
    let url;

    if (bursarySearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/bursary/?search=${bursarySearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setBursaryData(sortedData)
    }
  }

  // Store Keeper
  const StoreKeeperFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/store_keeper/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setStoreKeeperCount(data.length)
      }
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setStoreKeeperData(sortedData)
      setStoreKeeperLoader(false)


    } else {
      setStoreKeeperLoader(false)
    }



  }


  const FilterStoreKeeper = async () => {
    let url;

    if (storeKeeperSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/store_keeper/?search=${storeKeeperSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setStoreKeeperData(sortedData)
    }
  }

  // Exam Officer
  const ResultOfficerFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/result_officer/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setResultOfficerCount(data.length)
      }
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setResultOfficerData(sortedData)
      setResultOfficerLoader(false)


    } else {
      setResultOfficerLoader(false)
    }



  }


  const FilterResultOfficer = async () => {
    let url;

    if (resultOfficerSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/result_officer/?search=${resultOfficerSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setResultOfficerData(sortedData)
    }
  }

  // Academic Officer
  const AcademicOfficerFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/academic-officer/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setAcademicOfficerCount(data.length)
      }
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setAcademicOfficerData(sortedData)
      setAcademicOfficerLoader(false)


    } else {
      setAcademicOfficerLoader(false)
    }



  }


  const FilterAcademicOfficer = async () => {
    let url;

    if (academicOfficerSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/academic-officer/?search=${academicOfficerSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setAcademicOfficerData(sortedData)
    }
  }

  //  other Staff
  const OtherStaffFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/other-staff/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setOtherStaffCount(data.length)
      }
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setOtherStaffData(sortedData)
      setOtherStaffLoader(false)


    } else {
      setOtherStaffLoader(false)
    }



  }


  const FilterOtherStaff = async () => {
    let url;

    if (otherStaffSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/other-staff/?search=${otherStaffSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { first_name: string }, b: { first_name: string }) => a.first_name.localeCompare(b.first_name));
      setOtherStaffData(sortedData)
    }
  }

  // email
  const EmailFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/email/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setEmailCount(data.length)
      }


      // sort by latest 
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentEmail(recentData)
      setEmailData(sortedData)
      setEmailLoader(false)


    } else {
      setEmailLoader(false)
    }



  }


  const FilterEmail = async () => {
    let url;

    if (emailSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/email/?search=${emailSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setEmailData(sortedData)
    }
  }


  //subject
  const SubjectFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/subjects/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setSubjectCount(data.length)
      }



      const sortedData = [...data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      const RecentsortedData = [...data].sort((a, b) =>
        b.id - a.id
      );
      const recentData = RecentsortedData.slice(0, 4);

      const groupedBySection: Record<string, typeof data> = {};

      sectionOrder.forEach(section => {
        groupedBySection[section] = sortedData.filter(
          subject => subject.sections === section
        );
      });
      setSubjectGroupData(groupedBySection)
      setSubjectData(sortedData)
      setRecentSubject(recentData)
      setSubjectData(sortedData)
      setSubjectLoader(false)


    } else {
      setSubjectLoader(false)
    }



  }


  const FilterSubject = async () => {
    let url;

    if (subjectSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/subjects/?search=${subjectSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
      const groupedBySection: Record<string, typeof data> = {};

      sectionOrder.forEach(section => {
        groupedBySection[section] = sortedData.filter(
          (subject: { sections: string }) => subject.sections === section
        );
      });
      setSubjectGroupData(groupedBySection)
      setSubjectData(sortedData)
    }
  }

  // Term
  const TermFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/term/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setTermCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
      setTermData(sortedData)
      setTermLoader(false)


    } else {
      setTermLoader(false)
    }



  }


  const FilterTerm = async () => {
    let url;

    if (termSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/term/?search=${termSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setTermData(sortedData)
    }
  }

  // session
  const SessionFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/session/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setSessionCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData[0];
      setCurentSession(recentData)
      setSessionData(sortedData)
      setSessionLoader(false)


    } else {
      setSessionLoader(false)
    }



  }


  const FilterSession = async () => {
    let url;

    if (sessionSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/session/?search=${sessionSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setSessionData(sortedData)
    }
  }



  // Student Class
  const StudentClassFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/student-class/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setStudentClassCount(data.length)
      }



      const sortedData = [...data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      const RecentsortedData = [...data].sort((a, b) =>
        b.id - a.id
      );
      setRecentStudentClass(RecentsortedData)
      setStudentClassData(sortedData)
      setStudentClassLoader(false)


    } else {
      setStudentClassLoader(false)
    }



  }


  const FilterStudentClass = async () => {
    let url;

    if (studentClassSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/student-class/?search=${studentClassSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
      setStudentClassData(sortedData)
    }
  }


  // Admin or hr Notification
  const AdminHrNotificationFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/admin-or-hr-notification/?seen=${statusQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setAdminHrNotificationCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentAdminHrNotification(recentData)
      setAdminHrNotificationData(sortedData)
      setAdminHrNotificationLoader(false)


    } else {
      setAdminHrNotificationLoader(false)
    }



  }


  const FilteradminHrNotification = async () => {
    let url;

    if (adminHrNotificationSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/admin-or-hr-notification/?search=${adminHrNotificationSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setAdminHrNotificationData(sortedData)
    }
  }

  //School Notification
  const SchoolNotificationFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/school-notification/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setSchoolNotificationCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentSchoolNotification(recentData)
      setSchoolNotificationData(sortedData)
      setSchoolNotificationLoader(false)


    } else {
      setSchoolNotificationLoader(false)
    }



  }


  const FilterSchoolNotification = async () => {
    let url;

    if (schoolNotificationSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/school-notification/?search=${schoolNotificationSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setSchoolNotificationData(sortedData)
    }
  }

  // class Notififcatiion
  const ClassNotificationFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/class-notification/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setClassNotificationCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentClassNotification(recentData)
      setClassNotificationData(sortedData)
      setClassNotificationLoader(false)


    } else {
      setClassNotificationLoader(false)
    }



  }


  const FilterClassNotification = async () => {
    let url;

    if (classNotificationSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/class-notification/?search=${classNotificationSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setClassNotificationData(sortedData)
    }
  }


  // staff Notification
  const StaffNotificationFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/staff-notification/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setStaffNotificationCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentStaffNotification(recentData)
      setStaffNotificationData(sortedData)
      setStaffNotificationLoader(false)


    } else {
      setStaffNotificationLoader(false)
    }



  }


  const FilterStaffNotification = async () => {
    let url;

    if (staffNotificationSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/staff-notification/?search=${staffNotificationSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setStaffNotificationData(sortedData)
    }
  }


  // School Event
  const SchoolEventFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/school-event/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setSchoolEventCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentSchoolEvent(recentData)
      setSchoolEventData(sortedData)
      setSchoolEventLoader(false)


    } else {
      setSchoolEventLoader(false)
    }



  }


  const FilterSchoolEvent = async () => {
    let url;

    if (schoolEventSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/school-event/?search=${schoolEventSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setSchoolEventData(sortedData)
    }
  }


  // Assignment
  const AssignmentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/assignment/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setAssignmentCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentAssignment(recentData)
      setAssignmentData(sortedData)
      setAssignmentLoader(false)


    } else {
      setAssignmentLoader(false)
    }



  }


  const FilterAssignment = async () => {
    let url;

    if (assignmentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/assignment/?search=${assignmentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setAssignmentData(sortedData)
    }
  }


  // Asignment Submission
  const AssignmentSubmissionFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/assignment-submission/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setAssignmentSubmissionCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 5);
      setRecentAssignmentSubmission(recentData)
      setAssignmentSubmissionData(sortedData)
      setAssignmentSubmissionLoader(false)


    } else {
      setAssignmentSubmissionLoader(false)
    }



  }


  const FilterAssignmentSubmission = async () => {
    let url;

    if (assignmentSubmissionSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/assignment-submission/?search=${assignmentSubmissionSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setAssignmentSubmissionData(sortedData)
    }
  }


  // Class Timetable
  const ClassTimetableFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/class-timetable/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setClassTimetableCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { student_class_name: { name: string } }, b: { student_class_name: { name: string } }) => a.student_class_name.name.localeCompare(b.student_class_name.name));
      const recentData = sortedData.slice(0, 4);
      setRecentClassTimetable(recentData)
      setClassTimetableData(sortedData)
      setClassTimetableLoader(false)


    } else {
      setClassTimetableLoader(false)
    }



  }


  const FilterClassTimetable = async () => {
    let url;

    if (classTimetableSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/class-timetable/?search=${classTimetableSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { student_class_name: { name: string } }, b: { student_class_name: { name: string } }) => a.student_class_name.name.localeCompare(b.student_class_name.name));
      setClassTimetableData(sortedData)
    }
  }




  // Class Timetable
  const SchemeOFWorkFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/scheme-of-work/?student_class=${studentClassQuery}&term=${termQuery}&subject=${subjectQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setSchemeOfWorkCount(data.length)
      }


      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setSchemeOfWorkData(sortedData)
      setSchemeOfWorkLoader(false)


    } else {
      setSchemeOfWorkLoader(false)
    }



  }


  const FilterSchemeOFWork = async () => {
    let url;

    if (schemeOfWorkSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/scheme-of-work/?search=${schemeOfWorkSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setSchemeOfWorkData(sortedData)
    }
  }





  const ScratchCardFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/scratch-cards/?status=${statusQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setScratchCardCount(data.length)
      }


      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setScratchCardData(sortedData)
      setScratchCardLoader(false)


    } else {
      setScratchCardLoader(false)
    }



  }


  const FilterScratchCard = async () => {
    let url;

    if (scratchCardSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/scratch-cards/?search=${scratchCardSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setScratchCardData(sortedData)
    }
  }


  //E Result

  const EResultFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/e-result/?student=${studentQuery}&student_class=${studentClassQuery}&term=${termQuery}&session=${sessionQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setEResultCount(data.length)
      }


      const sortedData = [...data].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const recentData = sortedData.slice(0, 7);
      setEResultData(sortedData)
      setRecentEResultData(recentData)
      setEResultLoader(false)


    } else {
      setEResultLoader(false)
      setEResultData([])
    }



  }

  const FilterEResult = async () => {
    let url;

    if (eResultSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/e-result/?search=${eResultSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = [...data].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEResultData(sortedData)
    }
  }

  // Payment Mehthod
  const PaymentMethodFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/payment-method/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setPaymentMethodCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentPaymentMethod(recentData)
      setPaymentMethodData(sortedData)
      setPaymentMethodLoader(false)


    } else {
      setPaymentMethodLoader(false)
    }



  }


  const FilterPaymentMethod = async () => {
    let url;

    if (paymentMethodSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/payment-method/?search=${paymentMethodSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setPaymentMethodData(sortedData)
    }
  }


  // school fees
  const SchoolFeesFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/school-fees/?student_class=${studentClassQuery}&term=${termQuery}&session=${sessionQuery}&fee_type=${feeTypeQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setSchoolFeesCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { student_class_name: { name: string } }, b: { student_class_name: { name: string } }) => a.student_class_name.name.localeCompare(b.student_class_name.name));
      setSchoolFeesData(sortedData)
      setSchoolFeesLoader(false)


    } else {
      setSchoolFeesLoader(false)
    }



  }


  const FilterSchoolFees = async () => {
    let url;

    if (schoolFeesSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/school-fees/?search=${schoolFeesSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { student_class_name: { name: string } }, b: { student_class_name: { name: string } }) => a.student_class_name.name.localeCompare(b.student_class_name.name));
      setSchoolFeesData(sortedData)
    }
  }


  //All  School Fees Payment
  const AllSchoolFeesPaymentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/payment-school-fees/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setAllSchoolFeesPaymentCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      const totalAmount = data.reduce((acc: number, item: any) => acc + (item.fee_type_name?.amount || 0), 0);
      setTotalAllSchoolFeesPayment(totalAmount)
      setRecentAllSchoolFeesPayment(recentData)
      setAllSchoolFeesPaymentData(sortedData)
      setAllSchoolFeesPaymentLoader(false)


    } else {
      setAllSchoolFeesPaymentLoader(false)
    }



  }


  const FilterAllSchoolFeesPayment = async () => {
    let url;

    if (allSchoolFeesPaymentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/payment-school-fees/?search=${allSchoolFeesPaymentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setAllSchoolFeesPaymentData(sortedData)
    }
  }

  //pending  School Fees Payment
  const PendingSchoolFeesPaymentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/payment-school-fees/pending/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setPendingSchoolFeesPaymentCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      const totalAmount = data.reduce((acc: number, item: any) => acc + (item.fee_type_name?.amount || 0), 0);
      setTotalPendingSchoolFeesPayment(totalAmount)
      setRecentPendingSchoolFeesPayment(recentData)
      setPendingSchoolFeesPaymentData(sortedData)
      setPendingSchoolFeesPaymentLoader(false)


    } else {
      setPendingSchoolFeesPaymentLoader(false)
    }



  }


  const FilterPendingSchoolFeesPayment = async () => {
    let url;

    if (pendingSchoolFeesPaymentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/payment-school-fees/pending/?search=${pendingSchoolFeesPaymentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setPendingSchoolFeesPaymentData(sortedData)
    }
  }

  // success school Fees payment
  const SucessSchoolFeesPaymentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/payment-school-fees/approved/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setSucessSchoolFeesPaymentCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      const totalAmount = data.reduce((acc: number, item: any) => acc + (item.fee_type_name?.amount || 0), 0);
      setTotalSucessSchoolFeesPayment(totalAmount)
      setRecentSucessSchoolFeesPayment(recentData)
      setSucessSchoolFeesPaymentData(sortedData)
      setSucessSchoolFeesPaymentLoader(false)


    } else {
      setSucessSchoolFeesPaymentLoader(false)
    }



  }


  const FilterSucessSchoolFeesPayment = async () => {
    let url;

    if (sucessSchoolFeesPaymentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/payment-school-fees/approved/?search=${sucessSchoolFeesPaymentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setSucessSchoolFeesPaymentData(sortedData)
    }
  }

  // declined school Fees payment
  const DeclinedSchoolFeesPaymentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/payment-school-fees/declined/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setDeclinedSchoolFeesPaymentCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      const totalAmount = data.reduce((acc: number, item: any) => acc + (item.fee_type_name?.amount || 0), 0);
      setTotalDeclinedSchoolFeesPayment(totalAmount)
      setRecentDeclinedSchoolFeesPayment(recentData)
      setDeclinedSchoolFeesPaymentData(sortedData)
      setDeclinedSchoolFeesPaymentLoader(false)


    } else {
      setDeclinedSchoolFeesPaymentLoader(false)
    }



  }


  const FilterDeclinedSchoolFeesPayment = async () => {
    let url;

    if (declinedSchoolFeesPaymentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/payment-school-fees/declined/?search=${declinedSchoolFeesPaymentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setDeclinedSchoolFeesPaymentData(sortedData)
    }
  }


  // bills
  const BillsFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/bills/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setBillsCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentBills(recentData)
      setBillsData(sortedData)
      setBillsLoader(false)


    } else {
      setBillsLoader(false)
    }



  }


  const FilterBills = async () => {
    let url;

    if (billsSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/bills/?search=${billsSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setBillsData(sortedData)
    }
  }

  const BillsPaymentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/bills-payment/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setBillsPaymentCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      const totalAmount = data.reduce((acc: number, item: any) => acc + (item.bill_name?.amount || 0), 0);
      setTotalBillsPayment(totalAmount)
      setRecentBillsPayment(recentData)
      setBillsPaymentData(sortedData)
      setBillsPaymentLoader(false)

    }
  }

  const FilterBillsPayment = async () => {
    let url;

    if (billsPaymentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/bills-payment/?search=${billsPaymentSearch}`
    }

    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()
    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setBillsPaymentData(sortedData)
    }
  }


  // pending Bills
  const PendingBillsPaymentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/bills-payment/pending/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setPendingBillsPaymentCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      const totalAmount = data.reduce((acc: number, item: any) => acc + (item.bill_name?.amount || 0), 0);
      setTotalPendingBillsPayment(totalAmount)
      setRecentPendingBillsPayment(recentData)
      setPendingBillsPaymentData(sortedData)
      setPendingBillsPaymentLoader(false)


    } else {
      setPendingBillsPaymentLoader(false)
    }



  }


  const FilterPendingBillsPayment = async () => {
    let url;

    if (pendingBillsPaymentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/bills-payment/pending/?search=${pendingBillsPaymentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setPendingBillsPaymentData(sortedData)
    }
  }


  // success Bills
  const SucessBillsPaymentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/bills-payment/approved/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setSucessBillsPaymentCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      const totalAmount = data.reduce((acc: number, item: any) => acc + (item.bill_name?.amount || 0), 0);
      setTotalSucessBillsPayment(totalAmount)
      console.log('total amount', totalAmount)
      setRecentSucessBillsPayment(recentData)
      setSucessBillsPaymentData(sortedData)
      setSucessBillsPaymentLoader(false)


    } else {
      setSucessBillsPaymentLoader(false)
    }



  }


  const FilterSucessBillsPayment = async () => {
    let url;

    if (sucessBillsPaymentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/bills-payment/approved/?search=${sucessBillsPaymentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setSucessBillsPaymentData(sortedData)
    }
  }

  // declined Bills'
  const DeclinedBillsPaymentFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/bills-payment/declined/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setDeclinedBillsPaymentCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      const totalAmount = data.reduce((acc: number, item: any) => acc + (item.bill_name?.amount || 0), 0);
      setTotalDeclinedBillsPayment(totalAmount)
      setRecentDeclinedBillsPayment(recentData)
      setDeclinedBillsPaymentData(sortedData)
      setDeclinedBillsPaymentLoader(false)


    } else {
      setDeclinedBillsPaymentLoader(false)
    }



  }


  // Bank Account'
  const BankAccountFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/bank-account/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setBankAccountCount(data.length)
      }



      // sorting from A to Z
      const sortedData = [...data].sort((a, b) =>
        a.bank_name.localeCompare(b.bank_name)
      );
      setBankAccountData(sortedData)
      setBankAccountLoader(false)


    } else {
      setBankAccountLoader(false)
    }



  }


  const FilterBankAccount = async () => {
    let url;

    if (bankAccountSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/bank-account/?search=${bankAccountSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      const sortedData = [...data].sort((a, b) =>
        a.bank_name.localeCompare(b.bank_name)
      );
      setBankAccountData(sortedData)
    }
  }


  const FilterDeclinedBillsPayment = async () => {
    let url;

    if (declinedBillsPaymentSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/bills-payment/declined/?search=${declinedBillsPaymentSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setDeclinedBillsPaymentData(sortedData)
    }
  }


  //product categories
  const ProductCatergoriesFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/product-categories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setProductCatergoriesCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setProductCatergoriesData(sortedData)
      setProductCatergoriesLoader(false)


    } else {
      setProductCatergoriesLoader(false)
    }



  }


  const FilterProductCatergories = async () => {
    let url;

    if (productCatergoriesSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/product-categories/?search=${productCatergoriesSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setProductCatergoriesData(sortedData)
    }
  }


  // product
  const ProductFunction = async () => {
    const response = await fetch(`https://school.amanilightequity.com/api/product/?product_category=${productCategoriesQuery}&status=${statusQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setProductCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 8);
      setRecentProduct(recentData)
      setProductData(sortedData)
      setProductLoader(false)


    } else {
      setProductLoader(false)
    }



  }


  const FilterProduct = async () => {
    let url;

    if (productSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/product/?search=${productSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setProductData(sortedData)
    }
  }

  // favourite product
  const FavouriteProductFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/favorite-products/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setFavouriteProductCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentFavouriteProduct(recentData)
      setFavouriteProductData(sortedData)
      setFavouriteProductLoader(false)


    } else {
      setFavouriteProductLoader(false)
    }



  }


  const FilterFavouriteProduct = async () => {
    let url;

    if (favouriteProductSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/favorite-products/?search=${favouriteProductSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setFavouriteProductData(sortedData)
    }
  }

  // order product
  const OrderProductFunction = async () => {
    const response = await fetch('https://school.amanilightequity.com/api/order-products/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      },
    })

    const data = await response.json()
    if (response.ok) {
      if (Array.isArray(data) && data.length > 0) {
        setOrderProductCount(data.length)
      }



      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      const recentData = sortedData.slice(0, 4);
      setRecentOrderProduct(recentData)
      setOrderProductData(sortedData)
      setOrderProductLoader(false)


    } else {
      setOrderProductLoader(false)
    }



  }


  const FilterOrderProduct = async () => {
    let url;

    if (orderProductSearch.length !== 0) {
      url = `https://school.amanilightequity.com/api/order-products/?search=${orderProductSearch}`
    }


    if (!url) {
      console.error("URL is undefined");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`
      }
    });

    const data = await response.json()

    if (response.ok) {
      // sorting from A to Z
      const sortedData = data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
      setOrderProductData(sortedData)
    }
  }













  const contextData = {
    sectionLabels,

    studentQuery, setStudentQuery,
    studentClassQuery, setStudentClassQuery,
    termQuery, setTermQuery,
    sessionQuery, setSessionQuery,
    feeTypeQuery, setFeeTypeQuery,
    productCategoriesQuery, setProductCategoriesQuery,
    statusQuery, setStatusQuery,
    subjectQuery, setSubjectQuery,




    studentCount, setStudentCount,
    recentStudent, setRecentStudent,
    studentData, setStudentData,
    studentLoader, setStudentLoader,
    studentSearch, setStudentSearch,
    studentGroupData, setStudentGroupData,

    teacherCount, setTeacherCount,
    recentTeacher, setRecentTeacher,
    teacherData, setTeacherData,
    teacherLoader, setTeacherLoader,
    teacherSearch, setTeacherSearch,

    parentCount, setParentCount,
    recentParent, setRecentParent,
    parentData, setParentData,
    parentLoader, setParentLoader,
    parentSearch, setParentSearch,




    staffCount, setStaffCount,
    recentStaff, setRecentStaff,
    staffData, setStaffData,
    staffLoader, setStaffLoader,
    staffSearch, setStaffSearch,

    hrCount, setHrCount,
    hrData, setHrData,
    hrLoader, setHrLoader,
    hrSearch, setHrSearch,

    bursaryCount, setBursaryCount,
    bursaryData, setBursaryData,
    bursaryLoader, setBursaryLoader,
    bursarySearch, setBursarySearch,

    storeKeeperCount, setStoreKeeperCount,
    storeKeeperData, setStoreKeeperData,
    storeKeeperLoader, setStoreKeeperLoader,
    storeKeeperSearch, setStoreKeeperSearch,


    resultOfficerCount, setResultOfficerCount,
    resultOfficerData, setResultOfficerData,
    resultOfficerLoader, setResultOfficerLoader,
    resultOfficerSearch, setResultOfficerSearch,


    academicOfficerCount, setAcademicOfficerCount,
    academicOfficerData, setAcademicOfficerData,
    academicOfficerLoader, setAcademicOfficerLoader,
    academicOfficerSearch, setAcademicOfficerSearch,

    otherStaffCount, setOtherStaffCount,
    otherStaffData, setOtherStaffData,
    otherStaffLoader, setOtherStaffLoader,
    otherStaffSearch, setOtherStaffSearch,

    emailCount, setEmailCount,
    emailData, setEmailData,
    recentEmail, setRecentEmail,
    emailLoader, setEmailLoader,
    emailSearch, setEmailSearch,


    subjectCount, setSubjectCount,
    subjectData, setSubjectData,
    recentSubject, setRecentSubject,
    subjectLoader, setSubjectLoader,
    subjectSearch, setSubjectSearch,
    subjectGroupData, setSubjectGroupData,

    termCount, setTermCount,
    termData, setTermData,
    termLoader, setTermLoader,
    termSearch, setTermSearch,

    sessionCount, setSessionCount,
    sessionData, setSessionData,
    currentsession, setCurentSession,
    sessionLoader, setSessionLoader,
    sessionSearch, setSessionSearch,

    studentClassCount, setStudentClassCount,
    studentClassData, setStudentClassData,
    recentStudentClass, setRecentStudentClass,
    studentClassLoader, setStudentClassLoader,
    studentClassSearch, setStudentClassSearch,



    adminHrNotificationCount, setAdminHrNotificationCount,
    adminHrNotificationData, setAdminHrNotificationData,
    recentAdminHrNotification, setRecentAdminHrNotification,
    adminHrNotificationLoader, setAdminHrNotificationLoader,
    adminHrNotificationSearch, setAdminHrNotificationSearch,

    schoolNotificationCount, setSchoolNotificationCount,
    schoolNotificationData, setSchoolNotificationData,
    recentSchoolNotification, setRecentSchoolNotification,
    schoolNotificationLoader, setSchoolNotificationLoader,
    schoolNotificationSearch, setSchoolNotificationSearch,


    classNotificationCount, setClassNotificationCount,
    classNotificationData, setClassNotificationData,
    recentClassNotification, setRecentClassNotification,
    classNotificationLoader, setClassNotificationLoader,
    classNotificationSearch, setClassNotificationSearch,


    staffNotificationCount, setStaffNotificationCount,
    staffNotificationData, setStaffNotificationData,
    recentStaffNotification, setRecentStaffNotification,
    staffNotificationLoader, setStaffNotificationLoader,
    staffNotificationSearch, setStaffNotificationSearch,

    schoolEventCount, setSchoolEventCount,
    schoolEventData, setSchoolEventData,
    recentSchoolEvent, setRecentSchoolEvent,
    schoolEventLoader, setSchoolEventLoader,
    schoolEventSearch, setSchoolEventSearch,


    assignmentCount, setAssignmentCount,
    assignmentData, setAssignmentData,
    recentAssignment, setRecentAssignment,
    assignmentLoader, setAssignmentLoader,
    assignmentSearch, setAssignmentSearch,

    assignmentSubmissionCount, setAssignmentSubmissionCount,
    assignmentSubmissionData, setAssignmentSubmissionData,
    recentAssignmentSubmission, setRecentAssignmentSubmission,
    assignmentSubmissionLoader, setAssignmentSubmissionLoader,
    assignmentSubmissionSearch, setAssignmentSubmissionSearch,

    classTimetableCount, setClassTimetableCount,
    classTimetableData, setClassTimetableData,
    recentClassTimetable, setRecentClassTimetable,
    classTimetableLoader, setClassTimetableLoader,
    classTimetableSearch, setClassTimetableSearch,

    schemeOfWorkCount, setSchemeOfWorkCount,
    schemeOfWorkData, setSchemeOfWorkData,
    schemeOfWorkLoader, setSchemeOfWorkLoader,
    schemeOfWorkSearch, setSchemeOfWorkSearch,

    scratchCardCount, setScratchCardCount,
    scratchCardData, setScratchCardData,
    scratchCardLoader, setScratchCardLoader,
    scratchCardSearch, setScratchCardSearch,

    eResultCount, setEResultCount,
    recentEResultData, setRecentEResultData,
    eResultData, setEResultData,
    eResultLoader, setEResultLoader,
    eResultSearch, setEResultSearch,


    paymentMethodCount, setPaymentMethodCount,
    paymentMethodData, setPaymentMethodData,
    recentPaymentMethod, setRecentPaymentMethod,
    paymentMethodLoader, setPaymentMethodLoader,
    paymentMethodSearch, setPaymentMethodSearch,


    schoolFeesCount, setSchoolFeesCount,
    schoolFeesData, setSchoolFeesData,
    schoolFeesLoader, setSchoolFeesLoader,
    schoolFeesSearch, setSchoolFeesSearch,

    allSchoolFeesPaymentCount, setAllSchoolFeesPaymentCount,
    totalAllSchoolFeesPayment, setTotalAllSchoolFeesPayment,
    recentAllSchoolFeesPayment, setRecentAllSchoolFeesPayment,
    allSchoolFeesPaymentData, setAllSchoolFeesPaymentData,
    allSchoolFeesPaymentLoader, setAllSchoolFeesPaymentLoader,
    allSchoolFeesPaymentSearch, setAllSchoolFeesPaymentSearch,

    pendingSchoolFeesPaymentCount, setPendingSchoolFeesPaymentCount,
    recentPendingSchoolFeesPayment, setRecentPendingSchoolFeesPayment,
    totalPendingSchoolFeesPayment, setTotalPendingSchoolFeesPayment,
    pendingSchoolFeesPaymentData, setPendingSchoolFeesPaymentData,
    pendingSchoolFeesPaymentLoader, setPendingSchoolFeesPaymentLoader,
    pendingSchoolFeesPaymentSearch, setPendingSchoolFeesPaymentSearch,


    sucessSchoolFeesPaymentCount, setSucessSchoolFeesPaymentCount,
    recentSucessSchoolFeesPayment, setRecentSucessSchoolFeesPayment,
    totalSucessSchoolFeesPayment, setTotalSucessSchoolFeesPayment,
    sucessSchoolFeesPaymentData, setSucessSchoolFeesPaymentData,
    sucessSchoolFeesPaymentLoader, setSucessSchoolFeesPaymentLoader,
    sucessSchoolFeesPaymentSearch, setSucessSchoolFeesPaymentSearch,

    declinedSchoolFeesPaymentCount, setDeclinedSchoolFeesPaymentCount,
    totalDeclinedSchoolFeesPayment, setTotalDeclinedSchoolFeesPayment,
    recentDeclinedSchoolFeesPayment, setRecentDeclinedSchoolFeesPayment,
    declinedSchoolFeesPaymentData, setDeclinedSchoolFeesPaymentData,
    declinedSchoolFeesPaymentLoader, setDeclinedSchoolFeesPaymentLoader,
    declinedSchoolFeesPaymentSearch, setDeclinedSchoolFeesPaymentSearch,



    billsCount, setBillsCount,
    recentBills, setRecentBills,
    billsData, setBillsData,
    billsLoader, setBillsLoader,
    billsSearch, setBillsSearch,

    billsPaymentCount, setBillsPaymentCount,
    totalBillsPayment, setTotalBillsPayment,
    recentBillsPayment, setRecentBillsPayment,
    billsPaymentData, setBillsPaymentData,
    billsPaymentLoader, setBillsPaymentLoader,
    billsPaymentSearch, setBillsPaymentSearch,


    pendingBillsPaymentCount, setPendingBillsPaymentCount,
    totalPendingBillsPayment, setTotalPendingBillsPayment,
    recentPendingBillsPayment, setRecentPendingBillsPayment,
    pendingBillsPaymentData, setPendingBillsPaymentData,
    pendingBillsPaymentLoader, setPendingBillsPaymentLoader,
    pendingBillsPaymentSearch, setPendingBillsPaymentSearch,


    sucessBillsPaymentCount, setSucessBillsPaymentCount,
    totalSucessBillsPayment, setTotalSucessBillsPayment,
    recentSucessBillsPayment, setRecentSucessBillsPayment,
    sucessBillsPaymentData, setSucessBillsPaymentData,
    sucessBillsPaymentLoader, setSucessBillsPaymentLoader,
    sucessBillsPaymentSearch, setSucessBillsPaymentSearch,

    declinedBillsPaymentCount, setDeclinedBillsPaymentCount,
    totalDeclinedBillsPayment, setTotalDeclinedBillsPayment,
    recentDeclinedBillsPayment, setRecentDeclinedBillsPayment,
    declinedBillsPaymentData, setDeclinedBillsPaymentData,
    declinedBillsPaymentLoader, setDeclinedBillsPaymentLoader,
    declinedBillsPaymentSearch, setDeclinedBillsPaymentSearch,

    bankAccountCount, setBankAccountCount,
    bankAccountData, setBankAccountData,
    bankAccountLoader, setBankAccountLoader,
    bankAccountSearch, setBankAccountSearch,

    productCatergoriesCount, setProductCatergoriesCount,
    productCatergoriesData, setProductCatergoriesData,
    productCatergoriesLoader, setProductCatergoriesLoader,
    productCatergoriesSearch, setProductCatergoriesSearch,

    productCount, setProductCount,
    productData, setProductData,
    recentProduct, setRecentProduct,
    productLoader, setProductLoader,
    productSearch, setProductSearch,

    favouriteProductCount, setFavouriteProductCount,
    favouriteProductData, setFavouriteProductData,
    recentFavouriteProduct, setRecentFavouriteProduct,
    favouriteProductLoader, setFavouriteProductLoader,
    favouriteProductSearch, setFavouriteProductSearch,

    orderProductCount, setOrderProductCount,
    orderProductData, setOrderProductData,
    recentOrderProduct, setRecentOrderProduct,
    orderProductLoader, setOrderProductLoader,
    orderProductSearch, setOrderProductSearch,



    //  ----------------------------------------------- Function -----------------------------------------------//
    StudentFunction, FilterStudent,
    TeacherFunction, FilterTeacher,
    ParentFunction, FilterParent,
    StaffFunction, FilterStaff,
    HrFunction, FilterHr,
    BursaryFunction, FilterBursary,
    StoreKeeperFunction, FilterStoreKeeper,
    ResultOfficerFunction, FilterResultOfficer,
    AcademicOfficerFunction, FilterAcademicOfficer,
    OtherStaffFunction, FilterOtherStaff,
    EmailFunction, FilterEmail,
    SubjectFunction, FilterSubject,
    TermFunction, FilterTerm,
    SessionFunction, FilterSession,
    StudentClassFunction, FilterStudentClass,
    AdminHrNotificationFunction, FilteradminHrNotification,
    SchoolNotificationFunction, FilterSchoolNotification,
    ClassNotificationFunction, FilterClassNotification,
    SchemeOFWorkFunction, FilterSchemeOFWork,
    ScratchCardFunction, FilterScratchCard,
    EResultFunction, FilterEResult,
    StaffNotificationFunction, FilterStaffNotification,
    SchoolEventFunction, FilterSchoolEvent,
    AssignmentFunction, FilterAssignment,
    AssignmentSubmissionFunction, FilterAssignmentSubmission,
    ClassTimetableFunction, FilterClassTimetable,
    PaymentMethodFunction, FilterPaymentMethod,
    SchoolFeesFunction, FilterSchoolFees,

    AllSchoolFeesPaymentFunction, FilterAllSchoolFeesPayment,
    PendingSchoolFeesPaymentFunction, FilterPendingSchoolFeesPayment,
    SucessSchoolFeesPaymentFunction, FilterSucessSchoolFeesPayment,
    DeclinedSchoolFeesPaymentFunction, FilterDeclinedSchoolFeesPayment,

    BillsFunction, FilterBills,
    BillsPaymentFunction, FilterBillsPayment,
    PendingBillsPaymentFunction, FilterPendingBillsPayment,
    SucessBillsPaymentFunction, FilterSucessBillsPayment,
    DeclinedBillsPaymentFunction, FilterDeclinedBillsPayment,

    BankAccountFunction, FilterBankAccount,

    ProductCatergoriesFunction, FilterProductCatergories,
    ProductFunction, FilterProduct,
    FavouriteProductFunction, FilterFavouriteProduct,
    OrderProductFunction, FilterOrderProduct,










  }

  return (
    <AllDataContext.Provider value={contextData}>
      {children}
    </AllDataContext.Provider>
  )

}
