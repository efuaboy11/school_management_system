class Timetable {
  final int id;
  final Map<String, dynamic> teacherDetails;
  final String studentClassName;
  final String classTimetable;

  const Timetable({
    required this.id,
    required this.teacherDetails,
    required this.studentClassName,
    required this.classTimetable,
  });


  factory Timetable.fromJson(Map<String, dynamic> json){
    return Timetable(
      id: json['id'],
      teacherDetails: json['teacher_name'], 
      studentClassName: json['student_class_name']['name'], 
      classTimetable: json['class_timetable'], 
    );
  }
}

