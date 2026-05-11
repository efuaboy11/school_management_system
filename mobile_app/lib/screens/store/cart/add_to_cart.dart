import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/providers/store/add_to_cart.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/custom_container.dart';
import 'package:mobile_app/widgets/liquid_display.dart';

class AddtoCart extends ConsumerStatefulWidget{
  const AddtoCart({super.key,
    required this.productId,
    required this.productName,
    required this.description,
    required this.price,
    required this.discountPrice,
    required this.rating,
    required this.measurementDetails,
    required this.image,
    required this.imageTwo,
    required this.imageThree,

  });

  final int productId;
  final String productName;
  final String description;
  final String price;
  final dynamic discountPrice;
  final double rating;
  final List<dynamic> measurementDetails;
  final dynamic image;
  final dynamic imageTwo;
  final dynamic imageThree;

  @override
  ConsumerState<AddtoCart> createState() => _AddtoCartState();
}

class _AddtoCartState extends ConsumerState<AddtoCart> {
  
  int _quantity = 1;

  int? _sizeId;
  String? _sizeName;

  void _increaseQuantity(){
    setState(() {
      _quantity += 1;
    });
  }


  void _decreaseQuantity(){
    setState(() {
      _quantity -= 1;
    });
  }

  void _selectSize(int id, String name){
    setState(() {
      _sizeId = id;
      _sizeName = name;   
    });
  }

  void _addtoCart() async{


    if(_sizeId == null && widget.measurementDetails.isNotEmpty){
      showPlatformDialog(
        context, 
        'Error', 
        'Please select size', 
        (){
          context.pop();
        }
      );
      print('Please select size');
    }else{
      showLoadingDialog(context);

      final response = await ref.read(addToCartProvider.notifier).addAddToCart(
        widget.productId.toString(), 
        _sizeId.toString(), 
        _quantity.toString(), context
      );
      if(!mounted) return;
      hideLoadingDialog(context);

      if(response == 'success'){
        if(!mounted) return;
        showPlatformDialog(
          context, 
          'Sucess', 
          'Prduct added to cart successfully.', 
          (){
            context.pop();
            context.pop();
          }
        );
      }else{
        if(!mounted) return;
        showPlatformDialog(
          context, 
          'Error', 
          response, 
          (){
            context.pop();
          }
        );
      }
    }
    

  }


  @override
  Widget build(BuildContext context) {
        final customColors = Theme.of(context).extension<CustomColors>()!;
    return DraggableScrollableSheet(
      expand: false,
      builder: (context, scrollController){
        return Container(
          padding: EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Theme.of(context).canvasColor,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),

          ),
          child: SingleChildScrollView(
            controller: scrollController,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      color: Colors.grey[400],
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),

                SizedBox(height: 12,),


                SingleChildScrollView(
                  scrollDirection: Axis.horizontal, // ✅ makes it scroll sideways
                  child: Row(
                    children: [
                      CustomContainer(
                        height: 250,
                        width: 200,
                        child: Image.network(
                          widget.image,
                          fit: BoxFit.contain,
                        
                        ),
                      ),

                      SizedBox(width: 20,),

                      (widget.imageTwo != null) ?
                        CustomContainer(
                          height: 250,
                          width: 200,
                          child: Image.network(
                            widget.imageTwo,
                            fit: BoxFit.contain,
                          
                          ),
                        )
                      : 
                      SizedBox(),

                      SizedBox(width: 20,),




                      (widget.imageThree != null) ?
                        CustomContainer(
                          height: 250,
                          width: 200,
                          child: Image.network(
                            widget.imageThree,
                            fit: BoxFit.contain,
                          
                          ),
                        )
                      : 
                      SizedBox()
                    
                    ],
                  ),
                ),

                SizedBox(height: 30,),

                Text(widget.productName, style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold
                ),), 

                SizedBox(height: 10,),


                (widget.discountPrice != null) ?
                  Wrap(
                    children: [
                      Text('₦${formatMoney(widget.price)}', style: TextStyle(
                        decoration: TextDecoration.lineThrough,
                        color: customColors.lightText,
                        fontSize: 13,
                      ),),

                      SizedBox(width: 10,),

                      Text('₦${formatMoney(widget.discountPrice)}', style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),),
                    ],
                  )
                  
                :
                
                  Text('₦${formatMoney(widget.price)}', style: TextStyle(
                    fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),),
               
                SizedBox(height: 5,),
                Row(
                  children: [
                    Icon(Icons.star, size: 14, color: Colors.amber,),
                    Text(
                      '${widget.rating} [star rating]',
                      style: TextStyle(
                        
                        fontSize: 14,
                      ),
                    )
                  ],
                ),

                SizedBox(height: 15,),


                CustomContainer(
                  width: double.infinity,
                  child: Text(widget.description, style: TextStyle(
                    color: customColors.lightText
                  ),),
                ),

                SizedBox(height: 15,),

                Row(
                  children: [

                    Text('Qty', style: TextStyle(
                      fontWeight: FontWeight.bold
                    ),),

                    SizedBox(width: 10,), 


                    LiquidDisplay(
                      width: 130,
                      
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          InkWell(
                            onTap: _decreaseQuantity,
                            child: Icon(Icons.remove_circle_outline, size: 20,)
                          ),
                          
                          SizedBox(width: 8,),
                          Text('$_quantity', style: TextStyle(fontSize: 16),),
                          SizedBox(width: 8,),

                          InkWell(
                            onTap: _increaseQuantity,
                            child: Icon(Icons.add_circle_outline, size: 20,)
                          ),
                        ],
                      ),
                    )
                  ],
                ),

                SizedBox(height: 10,),

                if(widget.measurementDetails.isNotEmpty)
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Size', style: TextStyle(
                        fontWeight: FontWeight.bold
                      ),),

                      SizedBox(height: 10,),

                      Row(
                        children: widget.measurementDetails.map((size) {
                          return Padding(
                            padding: const EdgeInsets.only(right: 15),
                            child: InkWell(
                              onTap: (){
                                _selectSize(size['id'], size['measurement']);
                              },
                              child: LiquidDisplay(
                                width: 50,
                                child: Text(
                                  formatName(size['measurement']), 
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                  textAlign: TextAlign.center,
                                ),
                              
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                      SizedBox(height: 10,),
                      if(_sizeName != null)                  
                        Text('selected size: ${formatName(_sizeName!)}'),

                      SizedBox(height: 30,),
                    ],
                  ),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    onPressed: _addtoCart,
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
        );
      }
    );
  }
}