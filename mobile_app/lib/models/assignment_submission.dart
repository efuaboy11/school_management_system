class AssignmentSubmission {
  final int id;
  final Map<String, dynamic> teacherDetails;
  final Map<String, dynamic> studentDetails;
  final String teacherID;
  final String subjectID;
  final String subjectName;
  final String assignmentNote;
  final String assignmentCode;
  final String grade;
  final String feedback;
  final dynamic submissionFile;
  final dynamic submissionImage;
  final String dateSubmitted;

  AssignmentSubmission({
    required this.id,
    required this.teacherDetails,
    required this.studentDetails,
    required this.teacherID,
    required this.subjectID,
    required this.subjectName,
    required this.assignmentNote,
    required this.assignmentCode,
    required this.grade,
    required this.feedback,
    required this.submissionFile,
    required this.submissionImage,
    required this.dateSubmitted,
  });


  factory AssignmentSubmission.fromJson(Map<String, dynamic> json){
    return AssignmentSubmission(
      id: json['id'],
      teacherDetails: json['teacher_name'],
      studentDetails: json['student_name'],
      teacherID: json['teacher_assignment'].toString(),
      subjectID: json['subject'].toString(),
      subjectName: json['subject_name']['name'],
      assignmentNote: json['assignment_note'],
      assignmentCode: json['assignment_code'],
      grade: json['grade'],
      feedback: json['feedback'],
      submissionFile: json['submission_file'],
      submissionImage: json['submission_photo'],
      dateSubmitted: json['date_submitted'],
    );
  }

}