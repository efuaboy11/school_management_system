class SchoolNotification {
  final int id;
  final String subject;
  final String text;
  final String status;
  final String date;

  const SchoolNotification({
    required this.id,
    required this.subject,
    required this.text,
    required this.status,
    required this.date
  });

  factory SchoolNotification.fromJson(Map<String, dynamic> json){
    return SchoolNotification(
      id: json['id'], 
      subject: json['subject'], 
      text: json['text'],
      status: json['status'], 
      date: json['date']
    );
  }
}