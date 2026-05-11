import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/store/product.dart';
import 'package:mobile_app/providers/store/favourite_product.dart';
import 'package:mobile_app/providers/store/front_images.dart';
import 'package:mobile_app/providers/store/product.dart';
import 'package:mobile_app/providers/store/product_catogries.dart';
import 'package:mobile_app/providers/store/special_provider.dart';
import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/providers/store/popular_product.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/custom_container.dart';
import 'package:mobile_app/widgets/store/tabs.dart';
import 'package:mobile_app/widgets/fade_images.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'package:mobile_app/screens/store/cart/add_to_cart.dart';
import 'package:mobile_app/screens/store/producr_search_deligate.dart';
import 'package:mobile_app/screens/store/products/all_product.dart';
import 'package:mobile_app/screens/store/products/Individual_product.dart'; 

class StoreHomeScreen extends ConsumerStatefulWidget {
  const StoreHomeScreen({super.key});

  @override
  ConsumerState<StoreHomeScreen> createState() => _StoreHomeScreenState();
}

class _StoreHomeScreenState extends ConsumerState<StoreHomeScreen> {

  bool _loading = true;
  String? _error;

  bool _favouriteLoader = false;
  int? _selectedItemId;

  int activeIndex = 0;
  final controller = CarouselSliderController();
  List<Product>? uniformList;
  List<Product>? productList;
  List<Product>? recentProduct;

  final recentSearches = ['Shoes', 'Phone', 'Laptop'];




  Future<void> _loadStudentDetails() async{

    final respose = await ref.read(studentDetailsProvider.notifier).fetchStudentDetails(context);
    if(respose != 'success'){
      _error = respose;
    }
    
  }

  Future<void> _loadProductCategories() async{
    final response = await ref.read(productCategoriesProvider.notifier).fetchProductCategories('', context);

    if(response != 'success'){
      if(!mounted) return;
      showSnackbar(context, response);
    }
  }


  Future<void> _uniformProduct() async{
    final response = await ref.read(productProvider.notifier).fetchProduct('', '2', context,);
    uniformList = ref.read(productProvider);
    
    

    if(response != 'success'){
      if(!mounted) return;
      showSnackbar(context, 'respose');
    }
  }
  

  Future<void> _loadProduct() async{
    final response = await ref.read(productProvider.notifier).fetchProduct('', '', context,);
    productList = ref.read(productProvider);
    recentProduct = productList!.take(30).toList();
    if(response != 'success'){
      if(!mounted) return;
      showSnackbar(context, 'respose');
    }
  }

  Future<void> _loadPopularProduct() async{
    final response = await ref.read(popularProductProvider.notifier).fetchPopularProduct('', context);
    if(response != 'success'){
      if(!mounted) return;
      showSnackbar(context, response);
    }
  }


  Future<void> _loadSpecialProduct() async{
    final response = await ref.read(specialProductProvider.notifier).fetchSpecialProduct('', context);

    if(response != 'success'){
      if(!mounted) return;
      showSnackbar(context, response);
    }
  }

  Future<void> _loadFrontImage() async{
    final response = await ref.read(frontImagesProvider.notifier).fetchFrontImages('', context);

    if(response != 'success'){
      if(!mounted) return;
      showSnackbar(context, response);
    }
  }

  Future<void> _loadSpecialData() async{

    await _loadSpecialProduct();
    await _loadPopularProduct();
    await _loadFrontImage();
    await _uniformProduct();

    setState(() {
      _loading = false;
    });
    
  }

  Future<void> _addFavourite(String productID, int itemId) async{
    setState(() {
      _selectedItemId = itemId;
      _favouriteLoader = true;
    });

    try{
      final response = await ref.read(favouriteProductProvider.notifier).addFavouriteProduct(productID);
      if(!mounted) return;
      await _loadProduct();
      _uniformProduct();  
      _loadPopularProduct();
       _loadSpecialProduct();
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
      await ref.read(productProvider.notifier).fetchProduct('', '', context);
      await _loadProduct();
      _uniformProduct();  
      _loadPopularProduct();
      _loadSpecialProduct();
      

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
    _loadSpecialData();
    _loadStudentDetails();
    _loadProductCategories();
    _loadProduct();

    
    


  }


  

  @override
  Widget build(BuildContext context) {
    final customColors = Theme.of(context).extension<CustomColors>()!;
    final studentDetails = ref.watch(studentDetailsProvider);

    final productCategoriesList = ref.watch(productCategoriesProvider);
    final recentProductCategories = productCategoriesList.take(2).toList();

    
    

    final popularProductList = ref.watch(popularProductProvider);
    final recentPopularProductList = popularProductList.take(5).toList();
 
    final specialProductList = ref.watch(specialProductProvider);
    final specialProduct = specialProductList.isNotEmpty ? specialProductList[0] : null;

    final frontImagesList = ref.watch(frontImagesProvider);


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

      return InkWell(
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
                      onPressed: (){
                        
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
  
  
    if (_loading) {
      return Scaffold(
        body: Center(
          child: Image.asset(
            'assets/image/loading.gif',
            width: 120,
            height: 120,
          ),
        ),
      );
    }


    if (_error != null) {
      return Scaffold(
        body: Center(child: Column(
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
        )),
        bottomNavigationBar: StoreTab(),
      );
    }
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 15, // optional: removes default left padding
        title: Row(
          children: [
            CircleAvatar(
              backgroundImage: NetworkImage(studentDetails.passport),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Hello ${formatName(studentDetails.firstName)}',
                  style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                        color: customColors.lightText

                      ),
                ),
                Text(
                  'Good ${getTimeOfDayGreeting()}!',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ],
        ),
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
      ),

      body: Column(
        children: [
          
         Expanded(
           child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.only(left: 15, right: 15, top: 20),
                child: Column(
                  spacing: 10,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: GestureDetector(
                            onTap: () async {
                              final result = await showSearch(
                                context: context,
                                delegate: ProductSearchDelegate(         
                                  allProducts: productList! ,
                                ),
                              );

                              if (result != null && result.isNotEmpty) {
                                print("User selected: $result");
                              }
                            },
                            child: AbsorbPointer(
                              child: TextField(
                                readOnly: true,
                                decoration: InputDecoration(
                                  contentPadding: EdgeInsets.symmetric(vertical: 1.0, horizontal: 12.0),
                                  hintText: 'Search',
                                  prefixIcon: Icon(Icons.search),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(12.0),
                                  ),
                                ),
                                style: TextStyle(fontSize: 14.0),
                              ),
                            ),
                          )
                        ),

                        const SizedBox(width: 10,),

                        Container(
                          padding: EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: customColors.lightBg,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Icon(Icons.filter_list),
                        )


                      ],

                    ),

                    SizedBox(height: 5,),

                    Stack(
                      children: [
                        Container(
                          width: double.infinity,
                          height: 200,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                            image: DecorationImage(
                              image: AssetImage('assets/image/background4.png'), // Replace with your image
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),

                        Positioned(
                          right: 5,
                          
                          child: 
                            frontImagesList.isEmpty ?
                              Image.asset('assets/image/school_girl.png', width: 200, height: 200,)
                            :
                              FadeCarousel(width: 200, height: 200, duration: 5, images: frontImagesList,),
                        ),

                        Positioned(
                          left: 15,
                          
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(height: 25,),
                              Text(
                                'Get Your\nSpecial sale\nUp to 50%',
                                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                                
                              ),

                              SizedBox(height: 10,),
                              ElevatedButton(
                                onPressed: () {
                                  // Handle button press
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: customColors.lightBorder,
                                  foregroundColor: Theme.of(context).colorScheme.primary,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                ),
                                child: Text('Shop Now', style: TextStyle(fontWeight: FontWeight.bold),),
                              ),
                            ],
                          ),
                        )

                      ],
                    ),


                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Categories',
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 19
                            ),
                         
                        ),

                        TextButton(
                          onPressed: () {},
                          child: Text(  
                            'See All',
                            style: TextStyle(
                              color: Theme.of(context).colorScheme.primary,
                              fontWeight: FontWeight.bold,
                              fontSize: 16
                            ),
                          )
                        ),
                      ],
                    ),

                    Wrap(
                      spacing: 10,
                      runSpacing: 10, // if you're using Flutter 3.24+; otherwise use SizedBox(width: 10)
                      children: [
                        InkWell(
                          onTap: () {
                            print('Tapped on All');
                          },
                          child: CustomContainer(
                            color: Theme.of(context).colorScheme.primary,
                            child: const Text(
                              'All',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ),

                        
                        if (recentProductCategories.isNotEmpty)
                          ...recentProductCategories.map((cat) {
                            return InkWell(
                              onTap: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(builder: (context) => AllProductScreen(id: cat.id.toString(),)),
                                );

                              },
                              child: CustomContainer(
                                child: Text(cat.categoryName),
                              ),
                            );
                          }),
                      ],
                    ),


                    SizedBox(height: 5,),

                    Text(
                      'New Product',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 17
                        ),
                      
                    ),


                    recentProduct!.isEmpty ?
                      CustomContainer(
                        width: double.infinity,
                        height: 200,
                        child: Center(
                          child: Text('No product avalaible '),
                        ),
                      )
                    :

                      SizedBox(
                        width: double.infinity,
                        child: 
                          LayoutBuilder(
                            builder: (context, constraints) {
                              double totalWidth = constraints.maxWidth;
                              int itemsPerRow = 2; // responsive columns
                              double spacing = 15;

                              // Compute item width and height ratio for childAspectRatio
                              double itemWidth =
                                  (totalWidth - (spacing * (itemsPerRow - 1))) / itemsPerRow;
                              double itemHeight = 360; // Approx height of each card (from your widget)

                              return GridView.builder(
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(),
                                itemCount: recentProduct!.length,
                                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                                  crossAxisCount: itemsPerRow,
                                  crossAxisSpacing: spacing,   // horizontal gap between items
                                  mainAxisSpacing: spacing,    // ✅ vertical gap between rows
                                  childAspectRatio: itemWidth / itemHeight, // controls shape
                                ),
                                itemBuilder: (ctx, index) {
                                  final pro = recentProduct![index];
                                  return buildGridItem(
                                    context,
                                    pro,
                                    pro.image,
                                    pro.productName,
                                    pro.description,
                                    pro.price,
                                    pro.discountPrice,
                                    pro.rating,
                                    pro.status,
                                    pro.id,
                                    itemWidth,
                                    () {
                                      openDetailsOverlay(
                                        pro.id, 
                                        pro.productName, 
                                        pro.description, 
                                        pro.price, 
                                        pro.discountPrice, 
                                        pro.rating, 
                                        pro.measurementDetails, 
                                        pro.image, 
                                        pro.imageTwo, 
                                        pro.imageThree
                                      );
                                    },
                                  );
                                },
                              );
                            },
                          )
                
                      ),


                    SizedBox(height: 10,),

                    Text(
                      'Popular Product',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 17
                      ),
                      
                    ),

                    recentPopularProductList.isEmpty ?
                      CustomContainer(
                        width: double.infinity,
                        height: 200,
                        child: Center(
                          child: Text('No popular product avalaible '),
                        ),
                      )

                    :  Column(
                        children: [
                          CarouselSlider.builder(
                            carouselController: controller,
                            itemCount: recentPopularProductList.length, 
                            itemBuilder: (context, index, realIndex){
                              // return Image.asset(_product[index]['img'])
                              final pro = recentPopularProductList[index];
                              return CustomContainer(
                                child: Row(
                                  // crossAxisAlignment: CrossAxisAlignment.center,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Image.network(pro.productDetails['image'], height: 100, width: 100,),
                                    

                                    SizedBox(width: 20,),

                                    Expanded(
                                      
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(formatName(pro.productDetails['name']), style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16), overflow: TextOverflow.ellipsis, maxLines: 1,),
                                          SizedBox(height: 5,),
                                          

                                          Row(
                                            children: [
                                              Icon(Icons.star, size: 14, color: Colors.amber,),
                                              Text(
                                                '${pro.productDetails['rating']} [star rating]',
                                                style: TextStyle(
                                                  
                                                  fontSize: 14,
                                                ),
                                              )
                                            ],
                                          ),

                                          SizedBox(height: 10,),

                                          (pro.productDetails['discount_price'] != null) ?
                                            Wrap(
                                              children: [
                                                Text('₦${formatMoney(pro.productDetails['price'])}', style: TextStyle(
                                                  decoration: TextDecoration.lineThrough,
                                                  color: customColors.lightText,
                                                  fontSize: 13,
                                                ),),

                                                SizedBox(width: 10,),

                                                Text('₦${formatMoney(pro.productDetails['discount_price'])}', style: TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 15,
                                                ),),
                                              ],
                                            )
                                            
                                          :
                                          
                                            Text('₦${formatMoney(pro.productDetails['price'])}', style: TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 15,
                                            ),),


                                          SizedBox(height: 10,),

                                          Expanded(
                                            child: Row(
                                              spacing: 8,
                                              children: [
                                                InkWell(
                                                  onTap: 
                                                    () {
                                                    openDetailsOverlay(
                                                      pro.id, 
                                                      pro.productDetails['name'], 
                                                      pro.productDetails['description'], 
                                                      pro.productDetails['price'], 
                                                      pro.productDetails['discount_price'], 
                                                      pro.productDetails['rating'], 
                                                      pro.productDetails['measurement_name'], 
                                                      pro.productDetails['image'], 
                                                      pro.productDetails['image_two'], 
                                                      pro.productDetails['image_three']);
                                                  },
                                                  child: Icon(Icons.add_shopping_cart, size: 20,)
                                                ),
                                                InkWell(
                                                  onTap: (){
                                                    _toggleFavouriteProduct(pro.productDetails['is_favourite'], pro.productDetails['id'].toString(), pro.id);
                                                  },
                                                  child: 
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
                                                  
                                                      !pro.productDetails['is_favourite'] ? 
                                                        const Icon(Icons.favorite_border_outlined)
                                                      : const Icon(
                                                          Icons.favorite,
                                                          color: Colors.red,
                                                        ),
                                                ),
                                                
                                              ],
                                            ),
                                          )

                                        ],
                                      ),
                                    )
                                  ],
                                ),
                              );
                            }, 
                            options: CarouselOptions(
                              height: 130,
                              autoPlay: true,
                              enlargeCenterPage: true,
                              onPageChanged: (index, reason) => setState(() => activeIndex = index),
                            )
                          ),

                          const SizedBox(height: 12),

                          AnimatedSmoothIndicator(
                            activeIndex: activeIndex,
                            count: recentPopularProductList.length,
                            effect: ExpandingDotsEffect( // you can change style
                              dotHeight: 10,
                              dotWidth: 10,
                              activeDotColor: Theme.of(context).colorScheme.primary,
                              dotColor: Colors.grey,
                            ),
                            onDotClicked: (index) => controller.animateToPage(index),
                          ),
                        ],
                      ),

                    SizedBox(height: 10,),

                    Text(
                      'Special Offer',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 17
                      ),
                      
                    ),

                    specialProductList.isEmpty ?
                      CustomContainer(
                        width: double.infinity,
                        height: 200,
                        child: Center(
                          child: Text('No popular product avalaible '),
                        ),
                      )
                    :

                    CustomContainer(
                      padding: EdgeInsets.all(15),
                      child: Row(
                        children: [
                          Expanded(
                            flex: 6,
                            child: Column(                
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(formatName(specialProduct!.productDetails['name']), style: Theme.of(context).textTheme.titleLarge,),
                                SizedBox(height: 10,),
                                Text(formatName(specialProduct.productDetails['description']), overflow: TextOverflow.ellipsis, maxLines: 2,),
                                SizedBox(height: 5,),
                                Row(
                                  
                                  children: [
                                    Icon(Icons.star, size: 14, color: Colors.amber,),
                                    Text(
                                      '${specialProduct.productDetails['rating']} [star rating]',
                                      style: TextStyle(
                                        
                                        fontSize: 14,
                                      ),
                                    ),                    
                                  ],
                                ),
                                SizedBox(height: 10,),


                                (specialProduct.productDetails['discount_price'] != null) ?
                                  Wrap(
                                    children: [
                                      Text('₦${formatMoney(specialProduct.productDetails['price'])}', style: TextStyle(
                                        decoration: TextDecoration.lineThrough,
                                        color: customColors.lightText,
                                        fontSize: 13,
                                      ),),

                                      SizedBox(width: 10,),

                                      Text('₦${formatMoney(specialProduct.productDetails['discount_price'])}', style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 15,
                                      ),),
                                    ],
                                  )
                                  
                                :
                                
                                  Text('₦${formatMoney(specialProduct.productDetails['price'])}', style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                                  fontSize: 15,
                                            ),),
                            
                                SizedBox(height: 15,),
                            
                                SizedBox(
                                      height: 35,
                                      child: ElevatedButton.icon(
                                        onPressed: 
                                          () {
                                          openDetailsOverlay(
                                            specialProduct.id, 
                                            specialProduct.productDetails['name'], 
                                            specialProduct.productDetails['description'], 
                                            specialProduct.productDetails['price'], 
                                            specialProduct.productDetails['discount_price'], 
                                            specialProduct.productDetails['rating'], 
                                            specialProduct.productDetails['measurement_name'], 
                                            specialProduct.productDetails['image'], 
                                            specialProduct.productDetails['image_two'], 
                                            specialProduct.productDetails['image_three']);
                                        },
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

                          SizedBox(width: 20,),
                          

                          Expanded(
                            flex: 4,
                            child: Image.network(specialProduct.productDetails['image'])
                          )
                        ],
                      ),
                    ),

                    SizedBox(height: 15,),


                    Text(
                      'Uniform category',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 17
                        ),
                      
                    ),

                    uniformList!.isEmpty ?
                      CustomContainer(
                        width: double.infinity,
                        height: 200,
                        child: Center(
                          child: Text('No product avalaible '),
                        ),
                      )
                    :

                      SizedBox(
                        width: double.infinity,
                        child: 
                          LayoutBuilder(
                            builder: (context, constraints) {
                              double totalWidth = constraints.maxWidth;
                              int itemsPerRow = 2; // responsive columns
                              double spacing = 15;

                              // Compute item width and height ratio for childAspectRatio
                              double itemWidth =
                                  (totalWidth - (spacing * (itemsPerRow - 1))) / itemsPerRow;
                              double itemHeight = 360; // Approx height of each card (from your widget)

                              return GridView.builder(
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(),
                                itemCount: uniformList!.length,
                                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                                  crossAxisCount: itemsPerRow,
                                  crossAxisSpacing: spacing,   // horizontal gap between items
                                  mainAxisSpacing: spacing,    // ✅ vertical gap between rows
                                  childAspectRatio: itemWidth / itemHeight, // controls shape
                                ),
                                itemBuilder: (ctx, index) {
                                  final pro = uniformList![index];
                                  return buildGridItem(
                                    context,
                                    pro,
                                    pro.image,
                                    pro.productName,
                                    pro.description,
                                    pro.price,
                                    pro.discountPrice,
                                    pro.rating,
                                    pro.status,
                                    pro.id,
                                    itemWidth,
                                    () {
                                      openDetailsOverlay(
                                        pro.id, 
                                        pro.productName, 
                                        pro.description, 
                                        pro.price, 
                                        pro.discountPrice, 
                                        pro.rating, 
                                        pro.measurementDetails, 
                                        pro.image, 
                                        pro.imageTwo, 
                                        pro.imageThree
                                      );
                                    },
                                  );
                                },
                              );
                            },
                          )
                
                      ),


                      SizedBox(height: 50,)




                    

                  ],
                  

                ),
              ),
            ),
         ),
          
          
          


        ],
      ),

      bottomNavigationBar: StoreTab(),
      
    );
  }
}