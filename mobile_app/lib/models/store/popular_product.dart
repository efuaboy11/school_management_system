


class PopularProduct {
  final int id;
  final Map<String, dynamic> productDetails;


  const PopularProduct({
    required this.id,
    required this.productDetails
  });


  factory PopularProduct.fromJson(Map<String, dynamic> json){
    return PopularProduct(
      id: json['id'], 
      productDetails: json['product_name'], 
    );
  }
}