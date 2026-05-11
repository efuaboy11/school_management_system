
class ProductCategories {
  final int id;
  final String categoryId;
  final String categoryName;
  final String description;
  final String createdAt;


  const ProductCategories({
    required this.id,
    required this.categoryId,
    required this.categoryName,
    required this.description,
    required this.createdAt
  });


  factory ProductCategories.fromJson(Map<String, dynamic> json){
    return ProductCategories(
      id: json['id'], 
      categoryId: json['category_id'], 
      categoryName: json['name'], 
      description: json['description'], 
      createdAt: json['created_at']
    );
  }
}