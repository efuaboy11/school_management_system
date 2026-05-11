
import 'package:flutter/material.dart';
import 'package:mobile_app/models/school_fee.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class SchoolFeesDetailScreen extends StatelessWidget{
  const SchoolFeesDetailScreen({super.key, required this.feeDetails});

  final SchoolFee feeDetails;

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
          Text(formatName(feeDetails.status), style: TextStyle(color: Colors.white),),
        ],
      ),
    );

    
    
    if(feeDetails.status == 'pending'){
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
            Text(formatName(feeDetails.status), style: TextStyle(color: Colors.white),),
          ],
        ),
      );
    }

    if(feeDetails.status == 'declined'){
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
            Text(formatName(feeDetails.status), style: TextStyle(color: Colors.white),),
          ],
        ),
      );
    }

    


    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text('Payment Details ', style: TextStyle(fontSize: 18)),
        actions: [
          IconButton(
            icon: Icon(Icons.menu,),
            onPressed: () {
              scaffoldKey.currentState?.openDrawer();
            },
          ),
        
        ],
        // backgroundColor: Theme.of(context).colorScheme.primary , // 👈 fully transparent
         // 👈 removes shadow

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
                                  text: ' #${feeDetails.transactionId}',
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
                              title: Text(formatName(feeDetails.feeTypeDetails['fee_choice'])),
                              subtitle: Text(formatDateTime(feeDetails.date)),

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
                                        Text(feeDetails.transactionId),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Payment Method', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(formatName(feeDetails.paymentMethodDetails['name'])),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Amount', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text('${formatMoney(feeDetails.feeTypeDetails['amount'].toString())} NGN'),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Fee type', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(formatName(feeDetails.feeTypeDetails['fee_choice'])),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Class paid for', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(formatName(feeDetails.feeTypeDetails['student_class_name']['name'])),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Term paid for', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(formatName(feeDetails.feeTypeDetails['term_name']['name'])),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Session paid for', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(feeDetails.feeTypeDetails['session_name']['name']),
                                      ],
                                    ),
                                
                                
                                  ],
                                ),
                                SizedBox(height: 20,),

                                Text('Fee payment Description', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                Text(formatName(feeDetails.feeTypeDetails['description'])),
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
                                        Text(feeDetails.studentDetails['userID']),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('User account', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text('${formatName(feeDetails.studentDetails['first_name'])} ${feeDetails.studentDetails['last_name']}'),
                                      ],
                                    ),
                                
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Email', style: TextStyle(color: customColors.lightText, fontSize: 15),),
                                        Text(feeDetails.studentDetails['email']),
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

                                Image.network(feeDetails.feeReceipt,
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