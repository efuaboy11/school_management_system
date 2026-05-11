class OrderHistory {
  final int id;
  final String user;
  final Map<String, dynamic> userDetails;
  final List<dynamic> products;
  final String status;
  final String reference;
  final String createdAt;


  const OrderHistory({
    required this.id,
    required this.user,
    required this.userDetails,
    required this.products,
    required this.status,
    required this.reference,
    required this.createdAt,
  });


  factory OrderHistory.fromJson(Map<String, dynamic> json){
    return OrderHistory(
      id: json['id'], 
      user: json['user'], 
      userDetails: json['user_details'],
      products: json['products'], 
      status: json['status'],
      reference: json['reference'],
      createdAt: json['created_at']
    );
  }
}