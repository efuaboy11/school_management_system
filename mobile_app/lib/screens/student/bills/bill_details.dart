
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/models/bills.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class BillsDetailScreen extends StatelessWidget{
  const BillsDetailScreen({super.key, required this.billDetails});

  final Bills billDetails;

  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    final customColors = Theme.of(context).extension<CustomColors>()!;

    Widget status = Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: customColors.successful,
        borderRadius: BorderRadius.circular(10)
      ),
      child:Row(
        mainAxisSize: MainAxisSize.min, // Wraps content instead of taking full width
        children: [
          Icon(Icons.check, color: Colors.white,), // Use any icon you want
          SizedBox(width: 8), // Spacing between icon and text
          Text(formatName(billDetails.status), style: TextStyle(color: Colors.white),),
        ],
      ),
    );


    if(billDetails.status == 'pending'){
      status = Container(
        padding: EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: customColors.pending,
          borderRadius: BorderRadius.circular(10)
        ),
        child:Row(
          mainAxisSize: MainAxisSize.min, // Wraps content instead of taking full width
          children: [
            Icon(Icons.hourglass_top, color: Colors.white,), // Use any icon you want
            SizedBox(width: 8), // Spacing between icon and text
            Text(formatName(billDetails.status), style: TextStyle(color: Colors.white),),
          ],
        ),
      );
    }

    if(billDetails.status == 'declined'){
      status =  Container(
        padding: EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: customColors.declined,
          borderRadius: BorderRadius.circular(10)
        ),
        child:Row(
          mainAxisSize: MainAxisSize.min, // Wraps content instead of taking full width
          children: [
            Icon(Icons.cancel, color: Colors.white,), // Use any icon you want
            SizedBox(width: 8), // Spacing between icon and text
            Text(formatName(billDetails.status), style: TextStyle(color: Colors.white),),
          ],
        ),
      );
    }

    

    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: () => context.pop(),
        ),
        title: Text('Payment Details ', style: TextStyle(fontSize: 18)),
        actions: [
          IconButton(
            icon: Icon(Icons.menu),
            onPressed: () {
              scaffoldKey.currentState?.openDrawer();
            },
          ),
        
        ],
      ),

      drawer: Drawer(
        child: MenuBarWidget()
      ),

      body:Padding(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 15),
        child: Column(
          children: [
            


            Align(
              alignment: Alignment.center,
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(10),
                  child: Text('Payment Receipt', style: TextStyle(fontSize: 20),),
                ),
              ),
            ),

            SizedBox(height: 15,),
            Expanded(
              child: SingleChildScrollView(
                child: SizedBox(
                  width: double.infinity,
                  child: Card(
                    child: Padding(
                      padding: EdgeInsetsGeometry.all(15),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text.rich(
                            TextSpan(
                              text: 'Transaction',
                              style: TextStyle(fontSize: 17),
                              children: [
                                TextSpan(
                                  text: ' #${billDetails.transactionId}',
                                  style: TextStyle(color: Theme.of(context).colorScheme.tertiary)
                                )
                              ]
                            )
                          ),

                          SizedBox(height: 20,), 

                          Container(
                            decoration: BoxDecoration(
                              border: Border(
                                bottom: BorderSide(
                                  color: customColors.lightBorder,
                                  width: 1.0
                                )
                              )
                              
                            ),
                            child: ListTile(
                              contentPadding: EdgeInsets.zero,
                              title: Text(formatName(billDetails.billTypeDetails['bill_name'])),
                              subtitle: Text(formatDateTime(billDetails.date).toString()),

                              trailing: status,
                            ),
                          ),

                          Container(
                            width: double.infinity,
                            padding: EdgeInsets.symmetric(vertical: 15),
                            decoration: BoxDecoration(
                              border: Border(
                                bottom: BorderSide(
                                  color: customColors.lightBorder,
                                  width: 1.0
                                )
                              )
                              
                            ),

                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [

                                Text('In Transaction', style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),),

                                SizedBox(height: 25,),

                                Wrap(
                                  spacing: 20,
                                  runSpacing: 20,
                                  // crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Transaction ID', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(billDetails.transactionId),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Bill Type', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(formatName(billDetails.billTypeDetails['bill_name'])),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Amount', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text('${formatMoney(billDetails.billTypeDetails['amount'].toString())} NGN'),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Payment Method', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(formatName(billDetails.paymentMethodDetails['name'])),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Bill Payment Description', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(formatName(billDetails.billTypeDetails['description'])),
                                      ],
                                    ),
                                                
                                
                                  ],
                                ),
                          ],
                            ),
                          ),

                          Container(
                            width: double.infinity,
                            padding: EdgeInsets.symmetric(vertical: 15),
                            decoration: BoxDecoration(
                              border: Border(
                                bottom: BorderSide(
                                  color: customColors.lightBorder,
                                  width: 1.0
                                )
                              )
                              
                            ),

                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [

                                Text('In Account', style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),),

                                SizedBox(height: 25,),

                                Wrap(
                                  spacing: 20,
                                  runSpacing: 20,
                                  // crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('User ID', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(billDetails.studentDetails['userID']),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('User account', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text('${formatName(billDetails.studentDetails['first_name'])} ${billDetails.studentDetails['last_name']}'),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Email', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(billDetails.studentDetails['email']),
                                      ],
                                    ),
                                
                                  
                                
                                  
                
                                
                                
                                  ],
                                ),
                                
                              ],
                            ),
                          ),


                          Container(
                            width: double.infinity,
                            padding: EdgeInsets.symmetric(vertical: 15),
                            

                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [

                                Text('Transaction Proof', style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),),

                                SizedBox(height: 25,),

                                Image.network(billDetails.billReceipt, 
                                  width: double.infinity,
                                  height: 300,
                                  
                                )

                                
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                    
                  ),
                ),
              ),
            )

            

            
        
          ],
        ),
      ),
      
    );
  }
}