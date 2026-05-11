
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'dart:io';
import 'package:flutter/cupertino.dart';
import 'package:mobile_app/models/student_details.dart';

import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/theme.dart';

class EditUserContactInformation extends ConsumerStatefulWidget{
  const EditUserContactInformation({super.key, required this.studentDetails});
  final StudentDetails studentDetails;

  @override
  ConsumerState<EditUserContactInformation> createState() => _EditUserContactInformationState();
}

class _EditUserContactInformationState extends ConsumerState<EditUserContactInformation> {
  final _formkey = GlobalKey<FormState>();
  String? _stateOfOrgin;
  String? _cityOrTown;
  String? _houseAddress;
  String? _phoneNumber;



     void showPlatformDialog(BuildContext context, String title, String errorMessage) {
    if (Platform.isIOS) {
      showCupertinoDialog(
        context: context,
        builder: (context) {
          return CupertinoAlertDialog(
            title: Text(title),
            content: Text(errorMessage),
            actions: [
              CupertinoDialogAction(
                child: Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                  context.pop();
                }
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
            title: Text(title),
            content: Text(errorMessage),
            actions: [
              TextButton(
                child: Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                  context.pop();
                }
              ),
            ],
          );
        },
      );
    }
  }


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


  void _updateDetails() async{
    if(_formkey.currentState!.validate()){
      showLoadingDialog(context);

      _formkey.currentState!.save();

      Map<String, dynamic> data = {
        'state_of_origin': _stateOfOrgin,
        'phone_number':_phoneNumber,
        'city_or_town' : _cityOrTown,
        'home_address' : _houseAddress
      };

      final response = await ref.read(studentDetailsProvider.notifier).updateStudentDetails(data, context);
      if(response == 'success'){
        if(!mounted) return;
        
        hideLoadingDialog(context);

        if(!mounted) return;
        showPlatformDialog(context, 'Success', 'Student contact information  updated sucessfully');  
      }else{
        if(!mounted) return;
          hideLoadingDialog(context);
          showPlatformDialog(context, 'Error', response);
      }
    }
  }



  @override
  Widget build(BuildContext context) {

    final customColors = Theme.of(context).extension<CustomColors>()!;
    final student = widget.studentDetails;

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 5),
        child: SizedBox(
          width: double.infinity,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Align(
                alignment: Alignment.bottomRight,
                child: IconButton(onPressed: (){
                  context.pop();
                }, icon: Icon(Icons.arrow_downward)),
              ),

              SizedBox(height: 5,),
              Padding(
                padding: EdgeInsetsGeometry.all(10),
                
                child: Form(
                  key: _formkey,
                  child: Column(
                    spacing: 20,
                    children: [

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'State of origin',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.stateOfOrigin,
                            decoration: InputDecoration(
                              hintText: 'Enter state of origin', 
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter state of origin';
                              }
                              return null;
                            },
                          
                            onSaved: (newValue) {
                              _stateOfOrgin = newValue;
                            },
                            
                          ),
                        ],
                      ),


                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'City / Town',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.cityOrTown,
                            decoration: InputDecoration(
                              hintText: 'Enter city or town', 
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter last city or town';
                              }
                              return null;
                            },
                          
                            onSaved: (newValue) {
                              _cityOrTown = newValue;
                            },
                            
                          ),
                        ],
                      ),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'House address',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.homeAddres,
                            decoration: InputDecoration(
                              hintText: 'Enter house address', 
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter house address';
                              }
                              return null;
                            },
                            
                            onSaved: (newValue) {
                              _houseAddress = newValue;
                            },
                          ),
                        ],
                      ),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Phone number',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.phoneNumber,
                            decoration: InputDecoration(
                              hintText: 'Enter phone number', 
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter phone number';
                              }
                              return null;
                            },
                          
                            onSaved: (newValue) {
                              _phoneNumber = newValue;
                            },
                            
                          ),
                        ],
                      ),
                      


            
                      
                      SizedBox(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: _updateDetails,
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
                      
                      SizedBox(height: 20,),
                    ],
                  )
                )
                  
                
              ),
                
              
            ],
          ),
        ),
      ),
    );

      
      
    
  }
}