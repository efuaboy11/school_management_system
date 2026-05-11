import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_manager.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:flutter/cupertino.dart';
import 'dart:io' show Platform;

// import 'package:mobile_app/widgets/alert.dart'; // For platform check

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formkey = GlobalKey<FormState>();
  AuthManager? _authManager;
  bool hidePassword = true;
  final TextEditingController _passwordController = TextEditingController();

  var _enteredUsername = '';
  var _enteredPassword = '';


  void showLoadingDialog(BuildContext context) {
    showDialog(
      barrierDismissible: false, // prevent closing by tapping outside
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.5), // dim background
      builder: (context) => Center(
        child: Image.asset(
          'assets/image/loading.gif',
          width: 120,
          height: 120,
        ),
      ),
    );
  }

  void hideLoadingDialog(BuildContext context) {
    Navigator.of(context, rootNavigator: true).pop();
  }


  



  void showPlatformDialog(BuildContext context, String errorMessage) {
    if (Platform.isIOS) {
      showCupertinoDialog(
        context: context,
        builder: (context) {
          return CupertinoAlertDialog(
            title: Text('Login Error!'),
            content: Text(errorMessage),
            actions: [
              CupertinoDialogAction(
                child: Text('OK'),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          );
        },
      );
    } else {
      showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('Login Error!'),
            content: Text(errorMessage),
            actions: [
              TextButton(
                child: Text('OK'),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          );
        },
      );
    }
  }


  Future<void> _login() async{

    if(_formkey.currentState!.validate()){
      showLoadingDialog(context);
      
      _formkey.currentState!.save();
      
      final response = await AuthService.login(_enteredUsername, _enteredPassword);
      print(response);
      if(response == 'success'){
        final isExpired = await AuthService.isTokenExpired();
        final access = await AuthService.getAccessToken();
        final role = await AuthService.getRole();
        

        if (access != null && !isExpired) {
          if(!mounted) return;
          _authManager ??= AuthManager(context); // create it
          _authManager!.restart();               // restart monitoring
        }
        // if(!mounted) return;
        // showTopAlert(context, "Login successful");

        
        if(role == 'student'){
          if(!mounted) return;
          context.go('/student/home');
        }else if(role == 'teacher'){
          if(!mounted) return;
          context.go('/teacher/home');

        }
        if(!mounted) return;

        hideLoadingDialog(context);
      }else{
        if(!mounted) return;
        hideLoadingDialog(context);


        if(!mounted) return;
        showPlatformDialog(context, response);
      }
    }

  }

  void _togglePassword() {
    setState(() {
      hidePassword = !hidePassword;
      print(hidePassword);
    });
  }
  @override
  Widget build(BuildContext context) {

    return Scaffold(
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
                  child: Form(
                    key: _formkey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Image.asset(
                          'assets/image/logo.png',
                          width: 120,
                          height: 120,
                    
                        ),
                        SizedBox(height: 20,),
                        const Text("Let's Sign in", style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        const Text("Welcome Back,\nYou've been missed!", style: TextStyle(fontSize: 18)),
                        const SizedBox(height: 32),
                        
                          
                        // Student ID
                        TextFormField(
                          maxLength: 25,
                          decoration: InputDecoration(
                            hintText: 'Username',
                            // school_outlined
                            suffixIcon: const Icon(Icons.person),
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                          ),

                          validator: (value){
                            if(value == null || value.isEmpty || value.trim().length <= 1){
                              return 'Please enter username';
                            }
                            return null;
                          },

                          onSaved: (value){
                            _enteredUsername = value!;
                          },
                        ),
                        const SizedBox(height: 16),
                          
                        // Password
                        TextFormField(
                          obscureText: hidePassword,
                          maxLength: 25,
                          controller: _passwordController,
                          decoration: InputDecoration(
                            hintText: 'Password',
                            suffixIcon:  GestureDetector(
                              onTap: _togglePassword,
                              child: Icon(Icons.lock_outline)
                            ),
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                          ),

                          validator: (value){
                            if(value == null || value.isEmpty || value.trim().length <= 1){
                              return 'Please enter password';
                            }
                            return null;
                          },

                          onSaved: (value) {
                            _enteredPassword = value!;
                          },
                        ),
                        const SizedBox(height: 8),
                          
                        // Reset password
                        Align(
                          alignment: Alignment.centerRight,
                          child: TextButton(
                            onPressed: () => context.go('/forgot-password'),
                            child: const Text("Forgot password?", style: TextStyle(color: Colors.blue)),
                          ),
                        ),
                        const SizedBox(height: 16),
                          
                        // Sign in button
                        SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            onPressed: _login,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Theme.of(context).colorScheme.primary,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            child:Text(
                              "Sign in",
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                          
                        // Login as Parent
                        // Center(
                        //   child: RichText(
                        //     text: TextSpan(
                        //       text: 'Login as ',
                        //       style: TextStyle(color: Colors.black),
                        //       children: [
                        //         TextSpan(
                        //           text: 'Parent?',
                        //           style: TextStyle(color: Colors.blue.shade800, fontWeight: FontWeight.bold),
                        //         ),
                        //       ],
                        //     ),
                        //   ),
                        // ),
                        // const SizedBox(height: 16),
                          
                        // Terms & Privacy
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
            ),
           
        
            // Bottom green curve
              // ClipPath(
              //   clipper: BottomCurveClipper(),
              //   child: Container(
              //     height: 120,
              //     color: Colors.green.shade300,
              //   ),
              // ),
            
        
            // Login form content

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

// class BottomCurveClipper extends CustomClipper<Path> {
//   @override
//   Path getClip(Size size) {
//     Path path = Path();
//     path.moveTo(0, 20);
//     path.quadraticBezierTo(size.width * 0.25, 0, size.width * 0.5, 30);
//     path.quadraticBezierTo(size.width * 0.75, 60, size.width, 10);
//     path.lineTo(size.width, size.height);
//     path.lineTo(0, size.height);
//     path.close();
//     return path;
//   }

//   @override
//   bool shouldReclip(CustomClipper<Path> oldClipper) => false;
// }