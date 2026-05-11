import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';


class ForgotPasswordSuccessScreen extends StatelessWidget {
  const ForgotPasswordSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
   final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

    return Scaffold(
      key: scaffoldKey,
      body: Column(
          children: [
            // Top green curve
            Stack(
              children: [
                ClipPath(
                  clipper: TopCurveClipper(),
                  child: Container(
                    height: 140,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                ),
              ],
            ),


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

                              Text("We have received your request to change your password. Please visit the HR office at our school or contact the HR department to be granted access to update your password.", 
                                textAlign: TextAlign.center, style: TextStyle(fontSize: 16)
                              ),
                              SizedBox(height: 10,),
                                      
                              Text("Note: Upon approval, you will receive a password reset link at your registered Gmail address.", 
                              textAlign: TextAlign.center, style: TextStyle(fontSize: 12)
                              ),

                              SizedBox(height: 30,),

                              SizedBox(
                                width: double.infinity,
                                height: 50,
                                child: ElevatedButton.icon(
                                  onPressed: () {
                                    context.go('/login');
                                  },
                                  icon: Icon(Icons.house_outlined, color: Colors.white,),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Theme.of(context).colorScheme.primary,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  ),
                                  label: Text(
                                    "Home",
                                    style: TextStyle(
                                      fontSize: 16,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              ),

                              SizedBox(height: 20,)
                                      
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

class TopCurveClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    Path path = Path();
    path.lineTo(0, size.height - 40);
    path.quadraticBezierTo(size.width * 0.25, size.height, size.width * 0.5, size.height - 30);
    path.quadraticBezierTo(size.width * 0.75, size.height - 60, size.width, size.height - 20);
    path.lineTo(size.width, 0);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
}
