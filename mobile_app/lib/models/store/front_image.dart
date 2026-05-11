class FrontImages {
  final int id;
  final String image;


  const FrontImages({
    required this.id,
    required this.image
  });


  factory FrontImages.fromJson(Map<String, dynamic> json){
    return FrontImages(
      id: json['id'], 
      image: json['image'], 
    );
  }
}