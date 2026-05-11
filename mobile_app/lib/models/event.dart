class Event {
  final int id;
  final String title;
  final String description;
  final String startDate;
  final String endDate;
  final String createdAt;

  const Event({
    required this.id,
    required this.title,
    required this.description,
    required this.startDate,
    required this.endDate,
    required this.createdAt,
  });

  factory Event.fromJson(Map<String, dynamic> json){
    return Event(
      id: json['id'],
      title: json['title'], 
      description: json['description'], 
      startDate: json['start_date'], 
      endDate: json['end_date'], 
      createdAt: json['created_at']
    );
  }

}