
import 'package:flutter/material.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/student_details.dart';
import 'package:mobile_app/screens/student/bills/add_bills/step3.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class BillPaymentScreenTwo extends StatelessWidget{
  const BillPaymentScreenTwo({super.key, required this.paymentDetails, required this.userDetails, required this.paymentMethod, required this.paymentMethodId});

  final Map<String, dynamic> paymentDetails;
  final StudentDetails userDetails;
  final String paymentMethod;
  final String paymentMethodId;



  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    final customColors = Theme.of(context).extension<CustomColors>()!;
 
    Widget content = Center(child: Text('wait a moment...'),);

    void onPaymentSuccessful(BuildContext context)async{
      print('yes');
      final userId = await AuthService.getUserId();
      Navigator.of(context).push(
        MaterialPageRoute(builder: (ctx) => 
          BillsPaymentScreenThree(
            userId: userId!, 
            billType: paymentDetails['id'], 
            paymentMethod: paymentMethodId,
          )
        )
      );
    }


    void onPaymentCancel(BuildContext context)async{
      Navigator.of(context).pop();
    }

    if(paymentMethod == 'cash_payment'){
      content = Column(
        children: [
          Card(
            child: Column(
              children: [
                Card(
                  child: Column(
                    children: [
                      Container(
                        width: double.infinity,
                        padding: EdgeInsets.all(15),
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: BorderSide(
                              color: customColors.lightBorder,
                              width: 1.0
                            )
                          )
                          
                        ),

                        child: Text('Instructions', textAlign: TextAlign.center,),
                      ),

                      SizedBox(height: 10,),

                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Text('You have selected the Cash Payment option.', style: TextStyle(color: customColors.lightText, fontSize: 18, fontWeight: FontWeight.bold), textAlign: TextAlign.center,),
                      ),
                      SizedBox(height: 15,),

                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Text('To proceed with this method, you are required to visit the school premises in person. Kindly report to the Bursary Department, where you will be guided through the next steps to complete your payment.', style: TextStyle(color: customColors.lightText, fontSize: 15), textAlign: TextAlign.center,),
                      ),
                      SizedBox(height: 10,),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Text('Please ensure you come along with any necessary identification or documentation related to your payment.', style: TextStyle(color: customColors.lightText, fontSize: 15), textAlign: TextAlign.center,),
                      ),

                      SizedBox(height: 10,),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Text('For further inquiries, assistance, or clarification, feel free to contact our support team. We’re here to help and ensure a smooth payment experience for you.', style: TextStyle(color: customColors.lightText, fontSize: 15), textAlign: TextAlign.center,),
                      ),

                      SizedBox(height: 10,),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Text('Thanks For Understanding!!!', style: TextStyle(color: customColors.lightText, fontSize: 15), textAlign: TextAlign.center,),
                      ),

                      SizedBox(height: 15,),

                    ],
                  ),
                ),
              ],
            ),
          )
        ],
      );
    }else if(paymentMethod == 'bank_payment'){
      content = Column(
        children: [
          SizedBox(height: 10,),
          Text('School Bank Account', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),),
          SizedBox(height: 10,),
          Text('Below are various school account where payment can be made', style: TextStyle(fontSize: 18), textAlign: TextAlign.center,),
          SizedBox(height: 5,),
          Text('Note: After transfer or paying in bank you will bring the reciept to the bursary department so it can be uploaded in our database', style: TextStyle(color: customColors.lightText), textAlign: TextAlign.center,),
          SizedBox(height: 20,),
          SizedBox(
            width: double.infinity,
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(15),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      spacing: 20,
                      children: [
                        CircleAvatar(
                          radius: 30, // adjust as needed
                          backgroundImage: AssetImage('assets/image/uba.jpeg'),
                          backgroundColor: Colors.transparent, // optional
                        ),
                    
                        Text('UBA', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),)
                      ],
                    ),
                          
                    SizedBox(height: 19,),
            
                    Text.rich(
                      TextSpan(
                        text: 'Account Name:',
                        style: TextStyle(fontSize: 15),
                        children: [
                          TextSpan(
                            text: ' Iseghohimhen Ehiz',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17)
                          )
                        ]
                      )
                    ),


                    Text.rich(
                      TextSpan(
                        text: 'Account Number:',
                        style: TextStyle(fontSize: 15),
                        children: [
                          TextSpan(
                            text: '2119788000',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17)
                          )
                        ]
                      )
                    ),
                
                  ],
                ),
              ),
            ),
          )
        ],
      );
    }else if(paymentMethod == 'online_payment'){
      content = Column(
        children: [
          Card(
            child: Column(
              children: [
                Card(
                  child: Column(
                    children: [
                      Container(
                        width: double.infinity,
                        padding: EdgeInsets.all(15),
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: BorderSide(
                              color: customColors.lightBorder,
                              width: 1.0
                            )
                          )
                          
                        ),

                        child: Text('Make Payement', textAlign: TextAlign.center,),
                      ),

                      SizedBox(height: 10,),

                      

                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Text('If you have read, understood, and agreed to the terms, please proceed to make your payment by clicking the link below.', style: TextStyle(color: customColors.lightText, fontSize: 15), textAlign: TextAlign.center,),
                      ),
                      

                      SizedBox(height: 20,),

                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            onPressed: () {
                              makePayement(context,  userDetails.email, paymentDetails['amount'].toString(), onPaymentSuccessful, onPaymentCancel);
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Theme.of(context).colorScheme.primary,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            child: Text(
                              "Pay now",
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),

                      SizedBox(height: 20,),

                    ],
                  ),
                ),
              ],
            ),
          )
        ],
      );
    }

    

    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: () {
            Navigator.of(context).pop();
          }
        ),
        title: Text('Verification', style: TextStyle(fontSize: 18)),
        actions: [
          IconButton(
            icon: Icon(Icons.menu),
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

      body:
        Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 15),
                  child: SizedBox(
                    width: double.infinity,
                    child: Column(
                      spacing: 15,
                      children: [
                        Card(
                          child: Column(
                            children: [
                              Container(
                                width: double.infinity,
                                padding: EdgeInsets.all(15),
                                decoration: BoxDecoration(
                                  border: Border(
                                    bottom: BorderSide(
                                      color: customColors.lightBorder,
                                      width: 1.0
                                    )
                                  )
                                  
                                ),
                  
                                child: Text('Bill Payment Summary', textAlign: TextAlign.center,),
                              ),
                  
                              ListTile(
                                title: Text('Student Name'),
                                trailing: Text('${formatName(userDetails.firstName)} ${userDetails.lastName}'),
                              ),
                  
                              ListTile(
                                title: Text('Email'),
                                trailing: Text(userDetails.email),
                              ),
                  
                              ListTile(
                                title: Text('Bill Type'),
                                trailing: Text(formatName(paymentDetails['bill_name'])),
                              ),
                                             
                  
                              ListTile(
                                title: Text('Amount to be paid'),
                                trailing: Text('${formatMoney(paymentDetails['amount'].toString())} NGN', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),),
                              ),       
                  
                  
                            ],
                          ),
                        ),
                  
                        content,
                  
                        SizedBox(height: 20,)
                      ],
                  
                    )
                      
                    
                  ),
                ),
              ),
            )

            

            
        
          ],
        ),
      

      // bottomNavigationBar: StudentTab(),
      
    );
  }
}