
class Result {
  final String id;
  final Map<String, dynamic> studentDetails;
  final String studentClass;
  final String termName;
  final String sessionName;
  final String totalMarksObtain;
  final String studentAverage;
  final String classAverage;
  final String totalStudents;
  final String position;
  final String decision;
  final String agility;
  final String caring;
  final String communication;
  final String loving;
  final String puntality;
  final String seriousness;
  final String socialization;
  final String attentiveness;
  final String handlingOfTools;
  final String honest;
  final String leadership;
  final String music;
  final String neatness;
  final String perserverance;
  final String politeness;
  final String tools;
  final String teacherComment;
  final String principalComment;
  final String nextTermBegins;
  final List<Map<String, dynamic>> subjectResult;

  const Result({
    required this.id,
    required this.studentDetails,
    required this.studentClass,
    required this.termName,
    required this.sessionName,
    required this.totalMarksObtain,
    required this.studentAverage,
    required this.classAverage,
    required this.totalStudents,
    required this.position,
    required this.decision,
    required this.agility,
    required this.caring,
    required this.communication,
    required this.loving,
    required this.puntality,
    required this.seriousness,
    required this.socialization,
    required this.attentiveness,
    required this.handlingOfTools,
    required this.honest,
    required this.leadership,
    required this.music,
    required this.neatness,
    required this.perserverance,
    required this.politeness,
    required this.tools,
    required this.teacherComment,
    required this.principalComment,
    required this.nextTermBegins,
    required this.subjectResult,
  });


  factory Result.fromJson(Map<String, dynamic> json){
    return Result(
      id: json['id'],
      studentDetails: json['student_name'], 
      studentClass: json['class_name']['name'], 
      termName: json['term_name']['name'], 
      sessionName: json['session_name']['name'], 
      totalMarksObtain: json['total_marks_obtain'].toString(), 
      studentAverage: json['student_average'].toString(), 
      classAverage: json['class_average'].toString(), 
      totalStudents: json['total_students'].toString(), 
      position: json['position'].toString(), 
      decision: json['decision'], 
      agility: json['agility'].toString(), 
      caring: json['caring'].toString(), 
      communication: json['communication'].toString(), 
      loving: json['loving'].toString(), 
      puntality: json['puntuality'].toString(), 
      seriousness: json['seriousness'].toString(), 
      socialization: json['socialization'].toString(), 
      attentiveness: json['attentiveness'].toString(), 
      handlingOfTools: json['handling_of_tools'].toString(), 
      honest: json['honesty'].toString(), 
      leadership: json['leadership'].toString(), 
      music: json['music'].toString(), 
      neatness: json['neatness'].toString(), 
      perserverance: json['perserverance'].toString(), 
      politeness: json['politeness'].toString(), 
      tools: json['tools'].toString(), 
      teacherComment:  json['teacher_comment'], 
      principalComment: json['principal_comment'], 
      nextTermBegins: json['next_term_begins'], 
      subjectResult: List<Map<String, dynamic>>.from(json['subject_result']),
    );
  }

  factory Result.empty() {
    return Result(
      id: '',
      studentDetails: {},
      studentClass: '',
      termName: '',
      sessionName: '',
      totalMarksObtain: '',
      studentAverage: '',
      classAverage: '',
      totalStudents: '',
      position: '',
      decision: '',
      agility: '',
      caring: '',
      communication: '',
      loving: '',
      puntality: '',
      seriousness: '',
      socialization: '',
      attentiveness: '',
      handlingOfTools: '',
      honest: '',
      leadership: '',
      music: '',
      neatness: '',
      perserverance: '',
      politeness: '',
      tools: '',
      teacherComment: '',
      principalComment: '',
      nextTermBegins: '',
      subjectResult: [],
    );
  }


}