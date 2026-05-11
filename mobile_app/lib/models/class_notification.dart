class ClassNotification {
  final int id;
  final Map<String, dynamic> teacherDetails;
  final String studentClassName;
  final String subject;
  final String text;
  final String status;
  final String date;

  const ClassNotification({
    required this.id,
    required this.teacherDetails,
    required this.studentClassName,
    required this.subject,
    required this.text,
    required this.status,
    required this.date
  });


  factory ClassNotification.fromJson(Map<String, dynamic> json){
    return ClassNotification(
      id: json['id'], 
      teacherDetails: json['teacher_name'], 
      studentClassName: json['student_class_name']['name'], 
      subject: json['subject'], 
      text: json['text'],
      status: json['status'], 
      date: json['date']
    );
  }

}