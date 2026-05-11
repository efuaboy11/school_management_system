class FavouriteProduct {
  final int id;
  final Map<String, dynamic> productDetails;


  const FavouriteProduct({
    required this.id,
    required this.productDetails
  });


  factory FavouriteProduct.fromJson(Map<String, dynamic> json){
    return FavouriteProduct(
      id: json['id'], 
      productDetails: json['product_name'], 
    );
  }
}