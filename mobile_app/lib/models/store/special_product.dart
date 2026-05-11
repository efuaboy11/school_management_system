class SpecialProduct {
  final int id;
  final Map<String, dynamic> productDetails;


  const SpecialProduct({
    required this.id,
    required this.productDetails
  });


  factory SpecialProduct.fromJson(Map<String, dynamic> json){
    return SpecialProduct(
      id: json['id'], 
      productDetails: json['product_name'], 
    );
  }
}