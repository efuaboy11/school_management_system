class Assignment{
  final int id;
  final Map<String, dynamic> teacherDetails;
  final String studentClassName;
  final String subjectName;
  final String assignmentTitle;
  final String assignmentCode;
  final String assignmentInstructions;
  final String assignmentPoint;
  final dynamic assignmentFile;
  final dynamic assignmentImage;

  final String assignedDate;
  final String dueDate;

  Assignment({
    required this.id,
    required this.assignmentCode,
    required this.teacherDetails,
    required this.studentClassName,
    required this.subjectName,
    required this.assignmentTitle,
    required this.assignmentInstructions,
    required this.assignmentPoint,
    required this.assignmentFile,
    required this.assignmentImage,
    required this.assignedDate,
    required this.dueDate,
  });

  factory Assignment.fromJson(Map<String, dynamic> json){
    return Assignment(
      id: json['id'],
      assignmentCode: json['assignment_code'],
      teacherDetails: json['teacher_name'],
      studentClassName: json['student_class_name']['name'],
      subjectName: json['subject_name']['name'],
      assignmentTitle: json['assignment_name'],
      assignmentInstructions: json['instructions'],
      assignmentPoint: json['points'],
      assignmentFile: json['assignment_file'],
      assignmentImage: json['assignment_photo'],
      assignedDate: json['date'],
      dueDate: json['due_date'],
    );
  }
}