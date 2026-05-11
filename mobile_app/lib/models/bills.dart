
class Bills{
  final int id;
  final Map<String, dynamic> studentDetails;
  final String transactionId;
  final Map<String, dynamic> billTypeDetails;
  final Map<String, dynamic> paymentMethodDetails;
  final String billReceipt;
  final String status;
  final String date;

  const Bills({
    required this.id,
    required this.studentDetails,
    required this.transactionId,
    required this.billTypeDetails,
    required this.paymentMethodDetails,
    required this.billReceipt,
    required this.status,
    required this.date
  });

  factory Bills.fromJson(Map<String, dynamic> json){
    return Bills(
      id: json['id'],
      studentDetails: json['student_name'], 
      transactionId: json['transaction_id'], 
      billTypeDetails: json['bill_name'], 
      paymentMethodDetails: json['payment_method_name'], 
      billReceipt: json['bill_receipt'], 
      status: json['status'], 
      date: json['date']
    );
  }

}