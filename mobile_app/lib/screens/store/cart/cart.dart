
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/store/add_to_cart.dart';
import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/screens/store/cart/cart_success.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/custom_container.dart';
import 'package:mobile_app/widgets/store/tabs.dart';

class CartScreen extends ConsumerStatefulWidget{
  const CartScreen({super.key});

  @override
  ConsumerState<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends ConsumerState<CartScreen> {

  bool _loading = true;
  bool _quantityLoader = false;
  String? _error;
  int? _selectedItemId;
  double? _totalCartAmount;
    String selectedSize = 'M'; // default value
  final List<String> sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Future<void> _dropdownMewnu()async{
  //   final selected = await showMenu<String>(
  //     context: context,
  //     position: RelativeRect.fromLTRB(100, 400, 100, 100), // adjust for placement
  //     items: sizes
  //         .map(
  //           (size) => PopupMenuItem<String>(
  //             value: size,
  //             child: Text(size),
  //           ),
  //         )
  //         .toList(),
  //   );

  //   if (selected != null) {
  //       setState(() {
  //         selectedSize = selected;
  //       });
  //     }
  //   }



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
    _getTotalAmount(context);
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



  Future<void> _loadDetails(String query, context) async{
    try{
      final respose = await ref.read(addToCartProvider.notifier).fetchAddToCart(query, context);
      
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


  Future<void> _getTotalAmount(context) async{
    final response = await ref.read(addToCartProvider.notifier).getTotalCartAmount(context);
    _totalCartAmount = response;
  }


  Future<void> _increaseQuantity(int productId, int itemId) async{
    setState(() {
      _selectedItemId = itemId;
      _quantityLoader = true;
    });
    try{
      final response = await ref.read(addToCartProvider.notifier).increaseQuanity(productId.toString(), context);
      if(response == 'success'){
        if(!mounted) return;
        await _getTotalAmount(context);
        if(!mounted) return;
        showSnackbar(context, 'Quantity increased');
      }else{
        if(!mounted) return;
        showSnackbar(context, response);
      }
    }finally{
      if(_quantityLoader){
        setState(() {
          _quantityLoader = false;
        });
      }
      
    }
  }


  Future<void> _decreaseQuantity(int productId, int itemId) async{
    setState(() {
      _selectedItemId = itemId;
      _quantityLoader = true;
    });
    try{
      final response = await ref.read(addToCartProvider.notifier).decreaseQuanity(productId.toString(), context);
      if(response == 'success'){
        if(!mounted) return;
        await _getTotalAmount(context);
        if(!mounted) return;
        showSnackbar(context, 'Quantity decreased');
      }else{
        if(!mounted) return;
        showSnackbar(context, response);
      }
    }finally{
      if(_quantityLoader){
        setState(() {
          _quantityLoader = false;
        });
      }
      
    }
  }

  void _deleteItem(int id) async{
    showLoadingDialog(context);
    final response = await ref.read(addToCartProvider.notifier).deleteAddToCart(id, context);

    if(!mounted) return;
    hideLoadingDialog(context);

    if(response == 'success'){
      await _getTotalAmount(context);
      if(!mounted) return;
      showSnackbar(context, 'Cart Item removed');
      context.pop();

    }else{
      showSnackbar(context, response);
      if(!mounted) return;
      hideLoadingDialog(context);
    }
  }


  void onPaymentSuccessful(BuildContext context) async{
    setState(() {
        _loading = true;
      });
    final response = await ref.read(addToCartProvider.notifier).createOrder(context);
    if(response == 'success'){
      if(!mounted) return;
      
      showSnackbar(context, 'Order created sucessfully');
    }else{
      if(!mounted) return;
      showSnackbar(context, response);
    }


    Navigator.of(context).push(
      MaterialPageRoute(builder: (ctx) => 
        CartSuccessScreen()
      )
    );

    

  }

  void onPaymentCancel(BuildContext context)async{
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    final customColors = Theme.of(context).extension<CustomColors>()!;
    final cartList = ref.watch(addToCartProvider);
    final userDetails = ref.watch(studentDetailsProvider);
    
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
      content =  Column(
        children: [

          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 15),
                child: SizedBox(
                  width: double.infinity,
                  child: Column(
                    spacing: 15,
                    children: [
                      ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: cartList.length,
                        itemBuilder: (ctx, index){
                          final cart = cartList[index];

                          return Padding(
                            padding: const EdgeInsets.only(bottom: 15),
                            child: CustomContainer(
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(
                                    flex: 1,
                                    child: Image.network(
                                      cart.productDetails['image'],
                                      height: 120,
                                      fit: BoxFit.contain,
                                    )
                                  ),
                            
                                  SizedBox(width: 15,),
                            
                                  Expanded(
                                    flex: 2,
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(formatName(cart.productDetails['name']), style: TextStyle(fontWeight: FontWeight.bold),),
                                        SizedBox(height: 5,),
                                        Text(formatName(cart.productDetails['description']), overflow: TextOverflow.ellipsis, maxLines: 1,),
                                        
                            
                                        Row(
                                          
                                          children: [
                                            Icon(Icons.star, size: 14, color: Colors.amber,),
                                            Text(
                                              '${cart.productDetails['rating']}',
                                              style: TextStyle(
                                                
                                                fontSize: 14,
                                              ),
                                            ),                    
                                          ],
                                        ),
                                        
                                        SizedBox(height: 10,),                        
                            
                                        Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                          children: [
                            
                                            if(cart.productDetails['measurement'].isNotEmpty)
                                              Container(
                                                padding: EdgeInsets.all(5),
                                                decoration: BoxDecoration(
                                                  border: Border.all(color: customColors.lightBorder),
                                                  borderRadius: BorderRadius.circular(5)
                                                ),
                                                child: Row(
                                                  children: [
                                                    SizedBox(width: 10,),
                                                    Text('Size'),
                                                    SizedBox(width: 10,),
                                                
                                                    Text(formatName(cart.measurementDetails['measurement'])),
                                                    SizedBox(width: 10,),
                                                  ],
                                                
                                                ),
                                              ),
                            
                                            Row(
                                              children: [
                                                InkWell(
                                                  onTap:(){
                                                    _quantityLoader ? null :
                                                    _decreaseQuantity(cart.productDetails['id'], cart.id);
                                                  },
                                                  child: Icon(Icons.remove_circle_outline, size: 20,)
                                                ),


                                                SizedBox(width: 8,),
                                                (_quantityLoader && _selectedItemId == cart.id) ?
                                                  SizedBox(
                                                    width: 10,
                                                    height: 10,
                                                    child: CircularProgressIndicator(
                                                      strokeWidth: 2,
                                                      color: customColors.lightText,
                                                    ),
                                                  )

                                                :
                                                Text('${cart.quantity}', style: TextStyle(fontSize: 16),),

                                                SizedBox(width: 8,),

                                                InkWell(
                                                  onTap:(){
                                                    _quantityLoader ? null :
                                                      _increaseQuantity(cart.productDetails['id'], cart.id);
                                                  },
                                                  child: Icon(
                                                    Icons.add_circle_outline, size: 20,
                                                  ),
                                                ),
                                              ],
                                            )
                                          ],
                                        ),
                                        SizedBox(height: 10,),

                                        Text('Item: ₦${formatMoney(cart.productDetails['price'].toString())}'),
                                        Text('total: ₦${formatMoney(cart.totalPrice.toString())}'),
                                      ],
                                    )
                                  
                                  ),
                                  
                                  SizedBox(width: 10,),

                                  InkWell(
                                    onTap: (){
                                      showDeleteDialog(
                                        context, 
                                        'Remove item from cart', 
                                        'Are you sure you want to remove this item for cart?',
                                        (){
                                          _deleteItem(cart.id);
                                        },
                                        
                                      );
                                    },
                                    child: Icon(
                                      Icons.delete_outline
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        }
                      )
                      

                    ],
                  ),
                ),
              ),
            ),
          ),



          SizedBox(height: 20,),
          CustomContainer(
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(40),
              topRight: Radius.circular(40),
            ),

            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
            child: Column(
              // mainAxisSize: MainAxisSize.min,
              children: [
                Text("Subtotal: ₦${formatMoney(_totalCartAmount.toString())}", style: TextStyle(fontSize: 19),),
                SizedBox(height: 10,),
                const Divider(),
                const SizedBox(height: 15),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Theme.of(context).colorScheme.primary,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8)),
                    ),
                    onPressed: () {
                      makePayement(context,  userDetails.email, _totalCartAmount.toString(), onPaymentSuccessful, onPaymentCancel);
                    },
                    child: const Text(
                      "Proceed to Checkout",
                      style: TextStyle(fontSize: 16, color: Colors.white),
                    ),
                  ),
                )
              ],
            ),
          ),

          

          
      
        ],
      );
    }

    if(cartList.isEmpty && !_loading){
      content = Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.all(20),
            child: CustomContainer(
              height: 200,
              child: Center(child: Text('No Item found in cart')),
            ),
          )
        ],
      );
    }

    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        title: Text('My cart', style: TextStyle(fontSize: 18)),
        actions: [
          InkWell(
            onTap: () => context.pushReplacement('/student/home'),
            child: CustomContainer(
              child: Icon(Icons.logout),
            ),
          ),       

          const SizedBox(width: 15),
        ],


      ),

      body: content,
      

      bottomNavigationBar: StoreTab(),
      
    );
  }
}