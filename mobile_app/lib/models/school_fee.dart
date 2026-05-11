// import 'dart:io';
class SchoolFee {
  final int id;
  final Map<String, dynamic> studentDetails;
  final String transactionId;
  final Map<String, dynamic> feeTypeDetails;
  final Map<String, dynamic> paymentMethodDetails;
  final String feeReceipt;
  final String status;
  final String date;

  const SchoolFee({
    required this.id,
    required this.studentDetails,
    required this.transactionId,
    required this.feeTypeDetails,
    required this.paymentMethodDetails,
    required this.feeReceipt,
    required this.status,
    required this.date
  });


  factory SchoolFee.fromJson(Map<String, dynamic> json){
    return SchoolFee(
      id: json['id'],
      studentDetails: json['student_name'], 
      transactionId: json['transaction_id'], 
      feeTypeDetails: json['fee_type_name'], 
      paymentMethodDetails: json['payment_method_name'], 
      feeReceipt: json['fee_receipt'], 
      status: json['status'], 
      date: json['date']
    );
  }


}