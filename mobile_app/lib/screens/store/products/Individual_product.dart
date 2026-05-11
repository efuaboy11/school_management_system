import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/store/product.dart';
import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/screens/store/cart/add_to_cart.dart';
import 'package:mobile_app/screens/store/home.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/custom_container.dart';
import 'package:mobile_app/widgets/fade_image_two.dart';
// import 'package:mobile_app/widgets/fade_images.dart';
import 'package:mobile_app/widgets/liquid_display.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';
import 'package:mobile_app/widgets/store/tabs.dart';

class IndividualProductScreen extends ConsumerStatefulWidget {
  const IndividualProductScreen({super.key, required this.product});

  final Product product;

  @override
  ConsumerState<IndividualProductScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends ConsumerState<IndividualProductScreen> {
  bool _loading = true;
  String? _error;
  late List<String> _imgList;

  @override
  void initState() {
    super.initState();
    _imgList = [
      widget.product.image,
      if (widget.product.imageTwo != null && widget.product.imageTwo!.isNotEmpty)
        widget.product.imageTwo!,
      if (widget.product.imageThree != null && widget.product.imageThree!.isNotEmpty)
        widget.product.imageThree!,
    ];

    


    AuthService.isTokenExpired().then((isExpired){
      if(isExpired) {
        if(!mounted) return;
        context.go('/login');
        AuthService.logout();
      }
    });
    _loadStudentDetails();
  }

  Future<void> _loadStudentDetails() async{
    try{
      final respose = await ref.read(studentDetailsProvider.notifier).fetchStudentDetails(context);
      if(respose != 'success'){
        _error = respose;
      }
    }finally{
      setState(() {
        _loading = false;
      });
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
    // final studentDetails = ref.watch(studentDetailsProvider);
    // final customColors = Theme.of(context).extension<CustomColors>()!;

    
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
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => StoreHomeScreen()),
              );
              },
            ),

          ],
        )),
        bottomNavigationBar: StoreTab(),
      );
    }


    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Stack(
            clipBehavior: Clip.none, // Allows profile image to overflow
            children: [
              Container(
                width: double.infinity,
                height: 450,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/image/background5.jpg'), // Replace with your image
                    fit: BoxFit.cover,
                  ),
                ),
              ),


              Positioned(
                top: 80,
                left: 10,
                child: InkWell(
                  onTap: (){
                    Navigator.of(context).pop();
                  },
                  child: LiquidDisplay(
                    padding: EdgeInsets.all(8),
                    child: InkWell(
                      onTap: (){
                        Navigator.of(context).pop();
                      },
                      child: PlatformBackButton(),
                    )
                  ),
                ),
              ),

              Positioned(
                top: 80,
                right: 10,
                child: LiquidDisplay(
                  padding: EdgeInsets.all(8),
                  child: InkWell(
                    onTap: (){
                      Navigator.of(context).pop();
                    },
                    child: Icon(Icons.logout),
                  )
                ),
              ),


              Positioned.fill(
                top: 100,
                child: 
                  widget.product.imageTwo == null && widget.product.imageThree == null  
                  ?  
                  Image.network(
                    widget.product.image,
                    fit: BoxFit.contain,
                  )
                  :
                  FadeCarouselTwo(
                    duration: 15,
                    images: _imgList,
                  ),
              ),
            ],
          ), 


          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: EdgeInsets.all(15),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  spacing: 10,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(formatName(widget.product.productName), 
                          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)
                          
                        ),

                        IconButton(
                          onPressed: (){}, 
                          icon: Icon(Icons.favorite, color: const Color.fromARGB(255, 240, 32, 17),)
                        )
                      ],
                    ),
                    CustomContainer(    
                      width: 150,
                      child: Row(
                                  
                        children: [
                          Icon(Icons.star, size: 14, color: Colors.amber,),
                          Text(
                            '${widget.product.rating} [star rating]',
                            style: TextStyle(
                              
                              fontSize: 14,
                            ),
                          ),                    
                        ],
                      ),
                    ),

                    LiquidDisplay(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          (widget.product.discountPrice != null) ?
                            Wrap(
                              children: [
                                Text('₦${formatMoney(widget.product.price)}', style: TextStyle(
                                  decoration: TextDecoration.lineThrough,
                                  fontSize: 13,
                                ),),

                                SizedBox(width: 10,),

                                Text('₦${formatMoney(widget.product.discountPrice)}', style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                ),),
                              ],
                            )
                            
                          :
                          
                            Text('₦${formatMoney(widget.product.price)}', style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                ),),
               
        
                          Icon(Icons.monetization_on)

                        ],
                      ),
                    ),

                    SizedBox(height: 5,),

                    Text(formatName(widget.product.description)),

                    SizedBox(height: 10,),

                    SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            onPressed: () {
                              openDetailsOverlay(
                                widget.product.id, 
                                widget.product.productName, 
                                widget.product.description, 
                                widget.product.price, 
                                widget.product.discountPrice, 
                                widget.product.rating, 
                                widget.product.measurementDetails, 
                                widget.product.image, 
                                widget.product.imageTwo, 
                                widget.product.imageThree);
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Theme.of(context).colorScheme.primary,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            child:Text(
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
            )
          )
          
          
        ],
      ),

    );
  }
}