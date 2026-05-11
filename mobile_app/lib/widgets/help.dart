
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/session_active.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:http/http.dart' as http;


class HelpWidget extends StatefulWidget{
  const HelpWidget({super.key});

  @override
  State<HelpWidget> createState() => _HelpWidgetState();
}

class _HelpWidgetState extends State<HelpWidget> {
  final _formkey = GlobalKey<FormState>();
  String? _email;
  String? _fullName;
  String? _subject;
  String? _message;


  Future<void> _sendMessage() async {
    print('clicked');

    if (_formkey.currentState!.validate()) {
      showLoadingDialog(context);
      print('validated');

      _formkey.currentState!.save();

      final token = await AuthService.getAccessToken();

      Map<String, dynamic> body = {
        'email': _email!,
        'name': _fullName!,
        'subject': _subject!,
        'message': _message!,
      };
      try {
        final response = await http.post(
          Uri.parse(
            'https://school.amanilightequity.com/api/contact-us/',
          ),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },

          body: jsonEncode(body),
          
        );

        if(!mounted) return;
        bool sessionActive = await SessionActive.handleSession(context, response);
        if(!sessionActive) return;




        if (response.statusCode == 200 || response.statusCode == 201) {
          if (!mounted) return;
          hideLoadingDialog(context);

          if (!mounted) return;
          showPlatformDialog(context, 'Message sent', 'Your message have been succefully sent. We will get back to you. Thanks for reaching out', (){
            context.pop();
          });

          // _email = null;
          // _fullName = null;
          // _subject = null;
          // _message = null;
          _formkey.currentState!.reset();
        } else {
          final errorData = jsonDecode(response.body);
          final errorMessages = errorData.values.join(", ");

          if (!mounted) return;
          hideLoadingDialog(context);

          if (!mounted) return;
          showPlatformDialog(context, 'Message Failed', errorMessages, (){
            context.pop();
          });
        }
      } catch (e) {
        if (!mounted) return;
        hideLoadingDialog(context);

        if (!mounted) return;
        showPlatformDialog(context, 'Message failed', 'Unexpected Error occured', (){
          context.pop();
        });
      }
    }
  }




  @override
  Widget build(BuildContext context) {
    final customColors = Theme.of(context).extension<CustomColors>()!;
    return 
      Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 15),
                child: SizedBox(
                  width: double.infinity,
                  child: Column(
                    children: [
                      Align(
                        alignment: Alignment.center,
                        child: Column(  
                          children: [
                            Text('Support Center', style: Theme.of(context).textTheme.titleLarge!.copyWith(
                              fontWeight: FontWeight.bold
                            ), textAlign: TextAlign.center,),
                            SizedBox(height: 5,),
                            Text('Send us a direct mail and our support team will get back to you shortly', style: TextStyle(color: customColors.lightText), textAlign: TextAlign.center,),
                            SizedBox(height: 20,),
                
                          ],
                
                        )
                      ),
                      Card(
                        child: Padding(
                          padding: EdgeInsetsGeometry.all(18),
                          
                          child: Form(
                            key: _formkey,
                            child: Column(
                              spacing: 20,
                              children: [

                                Row(
                                  children: [
                                    Text('Your email'),
                                    SizedBox(width: 15,),
                                    Expanded(
                                      child: TextFormField(
                                        decoration: InputDecoration(
                                          hintText: 'Enter email', 
                                          contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                                          border: OutlineInputBorder(
                                            borderRadius: BorderRadius.circular(12.0),
                                          ),
                                        ),
                                        validator: (value) {
                                          if (value == null || value.isEmpty) {
                                            return 'Please enter email';
                                          }
                                          return null;
                                        },

                                        initialValue: _email,

                                        onSaved: (newValue) {
                                          _email = newValue;
                                        },
                                        
                                      ),
                                    ),
                                  ],
                                ),

                                Row(
                                  children: [
                                    Text('Full name'),
                                    SizedBox(width: 15,),
                                    Expanded(
                                      child: TextFormField(
                                        decoration: InputDecoration(
                                          hintText: 'Enter full name', 
                                          contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                                          border: OutlineInputBorder(
                                            borderRadius: BorderRadius.circular(12.0),
                                          ),
                                        ),
                                        validator: (value) {
                                          if (value == null || value.isEmpty) {
                                            return 'Please enter full name';
                                          }
                                          return null;
                                        },

                                        initialValue: _fullName,
                                        onSaved: (newValue) {
                                          _fullName = newValue;
                                        },
                                        
                                      ),
                                    ),
                                  ],
                                ),

                                Row(
                                  children: [
                                    Text('Subject'),
                                    SizedBox(width: 15,),
                                    Expanded(
                                      child: TextFormField(
                                        decoration: InputDecoration(
                                          hintText: 'Enter Subject', 
                                          contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                                          border: OutlineInputBorder(
                                            borderRadius: BorderRadius.circular(12.0),
                                          ),
                                        ),
                                        validator: (value) {
                                          if (value == null || value.isEmpty) {
                                            return 'Please enter subject';
                                          }
                                          return null;
                                        },

                                        initialValue: _subject,
                                        onSaved: (newValue) {
                                          _subject = newValue;
                                        },
                                        
                                      ),
                                    ),
                                  ],
                                ),

                                TextFormField(
                                  textAlignVertical: TextAlignVertical.top,
                                  maxLines: 10, // Makes it a text area with 5 lines height
                                  keyboardType: TextInputType.multiline,
                                  decoration: InputDecoration(
                                    hintText: 'Write your message',
                                    contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                  ),

                                  initialValue: _message,
                                  onSaved: (newValue) {
                                    _message = newValue;
                                  },

                                  // No validator since it's optional
                                ),





                                    
                                SizedBox(
                                  width: double.infinity,
                                  height: 50,
                                  child: ElevatedButton(
                                    onPressed: _sendMessage,
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Theme.of(context).colorScheme.primary,
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                    ),
                                    child: Text(
                                      "Submit",
                                      style: TextStyle(
                                        fontSize: 16,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            )
                          )
                            
                          
                        ),
                        
                      ),
                    ],
                  ),
                ),
              ),
            ),
          )

          

          
      
        ],
      );
      
   
  }
}