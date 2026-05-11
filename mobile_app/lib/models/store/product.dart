
class Product {
  final int id;
  final String productId;
  final List<dynamic> categoriesDetails;
  final String productName;
  final String price;
  final dynamic discountPrice;
  final double rating;
  final List<dynamic> measurementDetails;
  final String image;
  final dynamic imageTwo;
  final dynamic imageThree;
  final String description;
  final bool status;


  const Product({
    required this.id,
    required this.productId,
    required this.categoriesDetails,
    required this.productName,
    required this.price,
    required this.discountPrice,
    required this.rating,
    required this.measurementDetails,
    required this.image,
    required this.imageThree,
    required this.imageTwo,
    required this.description,
    required this.status,
  });


  factory Product.fromJson(Map<String, dynamic> json){
    return Product(
      id: json['id'], 
      productId: json['product_id'], 
      categoriesDetails: json['categories_name'], 
      productName: json['name'],
      price: json['price'],
      discountPrice: json['discount_price'],
      rating: json['rating'],
      measurementDetails: json['measurement_name'],
      image: json['image'],
      imageTwo: json['image_two'],
      imageThree: json['image_three'],
      description: json['description'], 
      status: json['is_favourite']
    );
  }
}