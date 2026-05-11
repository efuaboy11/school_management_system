class AddToCart {
  final int id;
  final String user;
  final Map<String, dynamic> productDetails;
  final Map<String, dynamic> measurementDetails;
  final int quantity;
  final String totalPrice;

  AddToCart({
    required this.id,
    required this.productDetails,
    required this.measurementDetails,
    required this.quantity,
    required this.totalPrice,
    required this.user,
  });


  factory AddToCart.fromJson(Map<String, dynamic> json){
    return AddToCart(
      id: json['id'],
      productDetails: json['product_name'],
      measurementDetails: json['measurement_name'],
      quantity: json['quantity'],
      totalPrice: json['total_price'].toString(),
      user: json['user'],
    );
  }

}