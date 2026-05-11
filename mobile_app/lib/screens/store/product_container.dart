import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/store/product.dart';
import 'package:mobile_app/providers/store/product.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/custom_container.dart';
import 'package:carousel_slider/carousel_slider.dart';

class ProductContainer extends ConsumerStatefulWidget {
  const ProductContainer({super.key});

  @override
  ConsumerState<ProductContainer> createState() => _ProductContainerState();
}

class _ProductContainerState extends ConsumerState<ProductContainer> {

  bool _loading = true;
  String? _error;

  int activeIndex = 0;
  final controller = CarouselSliderController();
  List<Product>? uniformList;
  List<Product>? productList;
  List<Product>? recentProduct;

  final recentSearches = ['Shoes', 'Phone', 'Laptop'];






  

  Future<void> _loadProduct() async{
    final response = await ref.read(productProvider.notifier).fetchProduct('', '', context,);
    productList = ref.read(productProvider);
    recentProduct = productList!.take(30).toList();
    setState(() {
      _loading;
    });
    if(response != 'success'){
      if(!mounted) return;
      showSnackbar(context, 'respose');
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
    _loadProduct();

    
    


  }


  

  @override
  Widget build(BuildContext context) {
    final customColors = Theme.of(context).extension<CustomColors>()!;

    Widget buildGridItem(
      BuildContext context, 
      String img,  
      String title,
      String description,
      String price,
      dynamic discountPrice,
      double rating,
      double width,
      Function() onAddToCart,
    ){

      return InkWell(
        onTap: (){
          context.push('/store/product/individual');
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
                      onPressed: () {},
                      icon: const Icon(Icons.favorite_border_outlined),
                    ),
                  ),
              
                  // Image that adjusts automatically to container without cropping
                  Positioned.fill(
                    child: Padding(
                      padding: const EdgeInsets.only(right: 5, top: 10),
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
      return Center(
        child: Image.asset(
          'assets/image/loading.gif',
          width: 120,
          height: 120,
        ),
      );
    }


    if (_error != null) {
      return Center(child: Column(
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


    
    return SizedBox(
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
                  pro.image,
                  pro.productName,
                  pro.description,
                  pro.price,
                  pro.discountPrice,
                  pro.rating,
                  itemWidth,
                  () {
                    context.push('/eh/');
                  },
                );
              },
            );
          },
        )

    );
  }
}