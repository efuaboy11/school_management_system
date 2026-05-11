import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
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
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 10.0),
                child: SafeArea(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Image.asset(
                        'assets/image/logo.png',
                        width: 120,
                        height: 120,

                      ),
                      SizedBox(height: 20,),
                      const Text("Forgot Password", style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      const Text("Enter your school username \nYou will recieve a change password mail", style: TextStyle(fontSize: 18)),
                      const SizedBox(height: 32),
                      
                        
                      // Student ID
                      TextField(
                        decoration: InputDecoration(
                          hintText: 'Username',
                          suffixIcon: const Icon(Icons.person),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                      ),
                      const SizedBox(height: 16),
                        
                      // Reset password
                      Align(
                        alignment: Alignment.centerRight,
                        child: TextButton(
                          onPressed: () => context.go('/login'),
                          child: const Text("Sign In?", style: TextStyle(color: Colors.blue)),
                        ),
                      ),
                      const SizedBox(height: 16),
                        
                      // Sign in button
                      SizedBox(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton.icon(
                          icon: Icon(Icons.send, color: Colors.white,),
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Theme.of(context).colorScheme.primary,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          label: Text(
                            "Submit",
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      
                      Center(
                        child: Wrap(
                          alignment: WrapAlignment.center,
                          children: [
                            Text("By logging in, you agree to our ", style: TextStyle(color: Colors.grey[700])),
                            Text("Terms & Condition", style: TextStyle(color: Colors.blue)),
                            Text(" & ", style: TextStyle(color: Colors.grey[700])),
                            Text("Privacy Policy", style: TextStyle(color: Colors.blue)),
                          ],
                        ),
                      ),
                      SizedBox(height: 40,)
                    ],
                  ),
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
