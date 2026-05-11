
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/store/product.dart';
import 'package:mobile_app/screens/store/cart/add_to_cart.dart';
import 'package:mobile_app/providers/store/favourite_product.dart';
import 'package:mobile_app/screens/store/products/Individual_product.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/custom_container.dart';
import 'package:mobile_app/widgets/store/tabs.dart';
import 'dart:async';


class FavouriteProductScreen extends ConsumerStatefulWidget{
  const FavouriteProductScreen({super.key});

  @override
  ConsumerState<FavouriteProductScreen> createState() => _FavouriteProductScreenState();
}

class _FavouriteProductScreenState extends ConsumerState<FavouriteProductScreen> {
  bool _loading = true;
  String? _error;
  final _searchController = TextEditingController();
  Timer? _debounce;
  bool _favouriteLoader = false;
  int? _selectedItemId;



  @override
  void initState() {
    super.initState();
    AuthService.isTokenExpired().then((isExpired){
      if(isExpired) {
        if(!mounted) return;
        context.go('/login');
        AuthService.logout();
      }
    });

    _loadDetails('', context);
  }

  @override
  void dispose() {
    _searchController.dispose();
    _debounce?.cancel();
    super.dispose();
  }


  Future<void> _loadDetails(String query, context) async{
    try{
      final respose = await ref.read(favouriteProductProvider.notifier).fetchFavouriteProduct(query, context,);
      if(respose != 'success'){
        _error = respose;
      }
    }finally{
      if(_loading){
        setState(() {
          _loading = false;
        });
      }
      
    }
  }



  Future<void> _addFavourite(String productID, int itemId) async{
    setState(() {
      _selectedItemId = itemId;
      _favouriteLoader = true;
    });

    try{
      final response = await ref.read(favouriteProductProvider.notifier).addFavouriteProduct(productID);
      if(!mounted) return;
      await _loadDetails('', context);
      print('add');

      if(response != 'success'){
        if(!mounted) return;
        showSnackbar(context, response);
      }
    }finally{
      if(_favouriteLoader){
        setState(() {
          _favouriteLoader = false;
        });
      }
    }



  }


  Future<void> _removeFavourite(String productID, int itemId) async{
    setState(() {
      _selectedItemId = itemId;
      _favouriteLoader = true;
    });

    try{
      final response = await ref.read(favouriteProductProvider.notifier).removeFavouriteProduct(productID);
      if(!mounted) return;
      await _loadDetails('', context);

      

      if(response != 'success'){
        if(!mounted) return;
        showSnackbar(context, response);
      }

    }finally{
      if(_favouriteLoader){
        setState(() {
          _favouriteLoader = false;
        });
      }
    }
  }

  Future<void> _toggleFavouriteProduct(bool status, String productID, int itemId) async{
    if(status){
      _removeFavourite(productID, itemId);
    }else{
      _addFavourite(productID, itemId);
    }  
  }


  void openDetailsOverlay(
    int productId, 
    String productName, 
    String description, 
    String price,
    dynamic discountPrice,
    double rating,
    List<dynamic> measurementDetails,
    dynamic image,
    dynamic imageTwo,
    dynamic imageThree,

  ){
    showModalBottomSheet(
      useSafeArea: true, 
      isScrollControlled: true, 
      context: context, 
      builder: (ctx) => 

      AddtoCart(
        productId: productId, 
        productName: productName, 
        description: description, 
        price: price, 
        discountPrice: 
        discountPrice, 
        rating: rating, 
        measurementDetails: 
        measurementDetails, 
        image: image, 
        imageTwo: imageTwo, 
        imageThree: imageThree
      )
    );
  }



  @override
  Widget build(BuildContext context) {
    final customColors = Theme.of(context).extension<CustomColors>()!;
    final productList = ref.read(favouriteProductProvider);
    Widget buildGridItem(
      BuildContext context, 
      Product pro,
      String img,  
      String title,
      String description,
      String price,
      dynamic discountPrice,
      double rating,
      bool status,
      int itemId,
      double width,
      
      Function() onAddToCart,
    ){

      return  InkWell(
        onTap: (){
          Navigator.of(context).push(
            MaterialPageRoute(builder: (context) => IndividualProductScreen(product: pro)),
          );
        },
        child: SizedBox(
          width: width,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Stack(
                children: [
                  // Background container
                  CustomContainer(
                    height: 200,
                    width: double.infinity,
                    borderRadius: BorderRadius.circular(0),
                  ),
              
                  // Favorite icon at top-right
                  Positioned(
                    top: 0,
                    right: 0,
                    child: IconButton(
                      onPressed: () {
                        _toggleFavouriteProduct(status, pro.id.toString(), itemId);
                      },
                      icon: 
                        (_favouriteLoader && _selectedItemId == pro.id) ?
                            SizedBox(
                              width: 10,
                              height: 10,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: customColors.lightText,
                              ),
                            )
                          :
                        
                            !status ? 
                              const Icon(Icons.favorite_border_outlined)
                            : const Icon(
                                Icons.favorite,
                                color: Colors.red,
                              ),
                    ),
                  ),
              
                  // Image that adjusts automatically to container without cropping
                  Positioned.fill(
                    child: Padding(
                      padding: const EdgeInsets.only(right: 5, top: 30),
                      child: FittedBox(
                        fit: BoxFit.contain, // ✅ Show full image without cutting
                        child: Image.network(
                          img,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
        
              SizedBox(height: 10,),
        
              Text(formatName(title), style: TextStyle(fontWeight: FontWeight.bold), overflow: TextOverflow.ellipsis, maxLines: 1,),
              Text(formatName(description),
                overflow: TextOverflow.ellipsis, maxLines: 1,
                style: TextStyle(
                  color: customColors.lightText
                ),
              ),
        
              SizedBox(height: 5,),
        
              Row(
                children: [
                  Icon(Icons.star, size: 14, color: Colors.amber,),
                  Text(
                    '$rating [star rating]',
                    style: TextStyle(
                      
                      fontSize: 14,
                    ),
                  )
                ],
              ),
        
              SizedBox(height: 5,),

              (discountPrice != null) ?
                Wrap(
                  children: [
                    Text('₦${formatMoney(price)}', style: TextStyle(
                      decoration: TextDecoration.lineThrough,
                      color: customColors.lightText,
                      fontSize: 13,
                    ),),

                    SizedBox(width: 10,),

                    Text('₦${formatMoney(discountPrice)}', style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),),
                  ],
                )
                
              :
              
                Text('₦${formatMoney(price)}', style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),),
               
        
              SizedBox(height: 15,),
        
              SizedBox(
                width: double.infinity,
                height: 35,
                child: ElevatedButton.icon(
                  onPressed: onAddToCart,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Theme.of(context).colorScheme.primary,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
                  ),
                  icon: Icon(Icons.add_shopping_cart, color: Colors.white,),
                  label:Text(
                    "Add to cart",
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
        
        
        
              
        
        
            ],
          ),
        ),
      );

    }


    Widget content = Center(
      child: Text('Welcome'),
    );

    if(_loading){
      content = Center(
        child: Image.asset(
          'assets/image/loading.gif',
          width: 120,
          height: 120,
        )
      );
    }

    if(_error != null){
      content = Center(child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            'assets/image/error.png',
            width: 300,
            height: 300,
          ),
          Text("Error: $_error", textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodySmall,),
          SizedBox(height: 15,),
          ElevatedButton.icon(
            icon: Icon(Icons.dashboard),
            label: Text('Home'),
            onPressed: () {
              context.go('/student/home');
            },
          ),

        ],
      ));
    }

    if(!_loading && _error == null){
      content = SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(15),
          child: Column(
            children: [

              SizedBox(height: 10,),


              SizedBox(
                width: double.infinity,
                child: 
                  LayoutBuilder(
                    builder: (context, constraints) {
                      double totalWidth = constraints.maxWidth;
                      int itemsPerRow = 2; // responsive columns
                      double spacing = 15;
              
                      double itemWidth =
                          (totalWidth - (spacing * (itemsPerRow - 1))) / itemsPerRow;
                      double itemHeight = 360; // Approx height of each card (from your widget)
              
                      return GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: productList.length,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: itemsPerRow,
                          crossAxisSpacing: spacing,   // horizontal gap between items
                          mainAxisSpacing: spacing,    // ✅ vertical gap between rows
                          childAspectRatio: itemWidth / itemHeight, // controls shape
                        ),
                        itemBuilder: (ctx, index) {
                          final pro = productList[index];

                          final product =   Product(
                              id: pro.productDetails['id'], 
                              productId: pro.productDetails['product_id'], 
                              categoriesDetails: pro.productDetails['categories_name'], 
                              productName: pro.productDetails['name'], 
                              price: pro.productDetails['price'], 
                              discountPrice: pro.productDetails['discount_price'], 
                              rating: pro.productDetails['rating'], 
                              measurementDetails: pro.productDetails['measurement_name'], 
                              image: pro.productDetails['image'], 
                              imageThree: pro.productDetails['image_three'], 
                              imageTwo: pro.productDetails['image_two'], 
                              description: pro.productDetails['description'],
                              status: pro.productDetails['is_favourite']
                            );



                          return buildGridItem(
                            context,
                            product,
                            product.image, 
                            product.productName,
                            product.description,
                            product.price,
                            product.discountPrice,
                            product.rating,
                            product.status,
                            product.id,
                            itemWidth,
                            () {
                              openDetailsOverlay(
                                pro.id, 
                                product.productName, 
                                product.description, 
                                product.price, 
                                product.discountPrice, 
                                product.rating, 
                                product.measurementDetails, 
                                product.image, 
                                product.imageTwo, 
                                product.imageThree
                              );
                            },
                          );
                        },
                      );
                    },
                  )
              
              ),
            ],
          ),
        ),
      );
    }


    return Scaffold(
      appBar: AppBar(
        
        title: Text('Favourite Product',  style: TextStyle(fontSize: 18),),
        actions: [
          InkWell(
            onTap: () => context.push('/store/cart'),
            child: CustomContainer(
              child: Icon(Icons.shopping_cart_outlined),
            ),
          ),

          const SizedBox(width: 15),

          InkWell(
            onTap: () => context.pushReplacement('/student/home'),
            child: CustomContainer(
              child: Icon(Icons.logout),
            ),
          ),       

          const SizedBox(width: 15),
        ],
        // backgroundColor: Theme.of(context).colorScheme.primary , // 👈 fully transparent
         // 👈 removes shadow

      ),

      body: content,

      bottomNavigationBar: StoreTab(),
      
    );
  }
}