class StudentDetails {
  
  final String userID;
  final String userName;
  final String firstName;
  final String lastName;
  final String dateOfBirth;
  final String email;
  final String fatherName;
  final String motherName;
  final String stateOfOrigin;
  final String religion;
  final String gender;
  final String phoneNumber;
  final String disability;
  final String disabilityNote;
  final String cityOrTown;
  final String homeAddres;
  final String role;
  final String admissionNumber;
  final String studentClass;
  final String studentClassID;
  final String passport;
  final String accountStatus;

  const StudentDetails({
    required this.userID,
    required this.userName,
    required this.firstName,
    required this.lastName,
    required this.dateOfBirth,
    required this.email,
    required this.fatherName,
    required this.motherName,
    required this.stateOfOrigin,
    required this.religion,
    required this.gender,
    required this.phoneNumber,
    required this.disability,
    required this.disabilityNote,
    required this.cityOrTown,
    required this.homeAddres,
    required this.role,
    required this.admissionNumber,
    required this.studentClass,
    required this.studentClassID,
    required this.passport,
    required this.accountStatus

  });

  factory StudentDetails.fromJson(Map<String, dynamic> json){
    return StudentDetails(
      userID: json['userID'], 
      userName: json['username'], 
      firstName: json['first_name'], 
      lastName: json['last_name'], 
      dateOfBirth: json['date_of_birth'], 
      email: json['email'], 
      fatherName: json['father_name'], 
      motherName: json['mother_name'], 
      stateOfOrigin: json['state_of_origin'], 
      religion: json['religion'], 
      gender: json['gender'], 
      phoneNumber: json['phone_number'], 
      disability: json['disability'], 
      disabilityNote: json['disability_note'], 
      cityOrTown: json['city_or_town'], 
      homeAddres: json['home_address'], 
      role: json['role'], 
      admissionNumber: json['admission_number'], 
      studentClass: json['student_class_name']['name'], 
      studentClassID: json['student_class'].toString(),
      passport: json['passport'], 
      accountStatus: json['account_status']
    );
    
  }

  factory StudentDetails.empty(){
    return StudentDetails(
      userID: '', 
      userName: '', 
      firstName: '', 
      lastName: '', 
      dateOfBirth: '', 
      email: '', 
      fatherName: '', 
      motherName: '', 
      stateOfOrigin: '', 
      religion: '', 
      gender: '', 
      phoneNumber: '', 
      disability: '', 
      disabilityNote: '', 
      cityOrTown: '', 
      homeAddres: '', 
      role: '', 
      admissionNumber: '', 
      studentClass: '', passport: '', 
      studentClassID: '',
      accountStatus: ''
    );

  }

}