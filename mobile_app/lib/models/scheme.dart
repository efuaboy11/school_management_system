class Scheme {
  final int id;
  final Map<String, dynamic> teacherDetails;
  final String subjectName;
  final String termName;
  final String studentClassName;
  final String scheme;
  final String date;


  const Scheme({
    required this.id,
    required this.teacherDetails,
    required this.subjectName,
    required this.termName,
    required this.studentClassName,
    required this.scheme,
    required this.date
  });

  factory Scheme.fromJson(Map<String, dynamic> json){
    return Scheme(
      id: json['id'],
      teacherDetails: json['teacher_name'], 
      subjectName: json['subject_name']['name'], 
      termName: json['term_name']['name'], 
      studentClassName: json['student_class_name']['name'], 
      scheme: json['scheme'], 
      date: json['date']
    );
  }


  factory Scheme.empty() {
    return Scheme(
      id: 0,
      teacherDetails: {},
      subjectName: '',
      termName: '',
      studentClassName: '',
      scheme: '',
      date: ''
    );
  }
  
}