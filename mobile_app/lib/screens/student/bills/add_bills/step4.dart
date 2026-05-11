import 'package:flutter/material.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:go_router/go_router.dart';
class BillsPaymentScreenFour extends StatelessWidget {
  const BillsPaymentScreenFour({
    super.key,
  });


  
  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        title: Text('Payment Successful', style: TextStyle(fontSize: 18)),
       

        // backgroundColor: Theme.of(context).colorScheme.primary , // 👈 fully transparent
        // 👈 removes shadow
      ),

      drawer: Drawer(child: MenuBarWidget()),

      body: Column(
        children: [
          SizedBox(height: 5),
          Expanded(
              child: Padding(
                padding: const EdgeInsets.only(left: 20, right: 20, top: 70),
                child: Column(
                  // mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Center(
                      child: Card(
                        child: Padding(
                          padding: const EdgeInsets.all(18.0),
                          child: Column(
                            children: [
                              Image.asset(
                                'assets/image/good-icon.png',
                                width: 200,
                                height: 200,
                              ),
                                      
                              Text("Success", textAlign: TextAlign.center, style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold)),

                              SizedBox(height: 10,),

                              Text("Your payment has been successfully recorded in our database. Our team will now verify the payment details. Once verification is complete and everything is in order, your bill status will be updated to Successful or Approved", 
                                textAlign: TextAlign.center, style: TextStyle(fontSize: 16)
                              ),
                              SizedBox(height: 10,),
                                      
                              Text("Note: Verification may take up to 24 hours. If your payment has not been verified after this period, please visit the school premises for further assistance or contact our support team.", 
                              textAlign: TextAlign.center, style: TextStyle(fontSize: 12)
                              ),

                              SizedBox(height: 30,),

                              SizedBox(
                                width: double.infinity,
                                height: 50,
                                child: ElevatedButton.icon(
                                  onPressed: () {
                                    context.go('/student/home');
                                  },
                                  icon: Icon(Icons.house_outlined, color: Colors.white,),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Theme.of(context).colorScheme.primary,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  ),
                                  label: Text(
                                    "Dashboard",
                                    style: TextStyle(
                                      fontSize: 16,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              ),

                              SizedBox(height: 15,),
                              
                                       
                            ],
                          ),
                        ),
                      )
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
