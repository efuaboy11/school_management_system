
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/models/student_details.dart';
import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/theme.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/utils.dart';
import 'package:flutter/cupertino.dart';

class EditUserPersonalInformation extends ConsumerStatefulWidget{
  const EditUserPersonalInformation({super.key, required this.studentDetails});
  final StudentDetails studentDetails;

  @override
  ConsumerState<EditUserPersonalInformation> createState() => _EditUserPersonalInformationState();
}

class _EditUserPersonalInformationState extends ConsumerState<EditUserPersonalInformation> {
  final _formkey = GlobalKey<FormState>();

  String? _firstName;
  String? _lastName;
  String? _email;
  String? _gender;
  String? _fatherName;
  String? _motherName;
  String? _religion;
  String? _disabilityNote;
  String? _selectedDisability;
  File? _selectedImage;
  DateTime? _selectedDate;

  void _updateDetails() async{
    if(_formkey.currentState!.validate()){
      showLoadingDialog(context);

      _formkey.currentState!.save();

      Map<String, dynamic> data = {
        'first_name': _firstName,
        'last_name': _lastName,
        'date_of_birth': _selectedDate != null
          ? DateFormat('yyyy-MM-dd').format(_selectedDate!)
          : null,
        'email': _email,
        'father_name': _fatherName,
        'mother_name': _motherName,
        'religion': _religion,
        'gender': _gender,
        'disability': _selectedDisability,
        'disability_note': _disabilityNote,
        if(_selectedImage != null) 'passport': _selectedImage,
      };

      try{
        print('executing');
        final response = await ref.read(studentDetailsProvider.notifier).updateStudentDetails(data, context);
        if(response == 'success'){
          if(!mounted) return;
          hideLoadingDialog(context);

          if(!mounted) return;
          showPlatformDialog(context, 'Success', 'Student personal information updated sucessfully');  
        }else{
          if(!mounted) return;
          hideLoadingDialog(context);
          showPlatformDialog(context, 'Error', response);
        }
      }finally{
        // hideLoadingDialog(context);
      }
    }
  }

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

  Future<void> _pickDateOfBirth() async {
    DateTime initialDate = DateTime(2000); // Default selection
    DateTime firstDate = DateTime(1900);   // Earliest date allowed
    DateTime lastDate = DateTime.now();    // Prevent selecting future dates

    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? initialDate,
      firstDate: firstDate,
      lastDate: lastDate,
    );

    if (picked != null) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  


  void _getPicture(String method) async{
    final imagePicker = ImagePicker();
    dynamic pickedImage;

    if(method == 'camera'){
      pickedImage = await imagePicker.pickImage(source: ImageSource.camera,);
    }else{
      pickedImage = await imagePicker.pickImage(source: ImageSource.gallery, maxHeight: 600);
    }

    if(pickedImage == null){
      return;
    }

    setState(() {
      _selectedImage = File(pickedImage.path);
    });
  }


  
  late final StudentDetails stud;
  @override
  void initState() {
    super.initState();
    stud = widget.studentDetails;
    _selectedDate =  DateTime.parse(stud.dateOfBirth);
    
    _selectedDisability = stud.disability;
  }

  

  @override
  Widget build(BuildContext context) {
    final customColors = Theme.of(context).extension<CustomColors>()!;
    final student = widget.studentDetails;
    
    Widget imgContent = Row(
      mainAxisAlignment: MainAxisAlignment.center,
      spacing: 10,
      children: [
        Icon(Icons.camera),
        Text('Select Image')
      ],
    );

    if(_selectedImage != null){
      imgContent = SizedBox(
        width: 100,
        height: 100,
        
        child: ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Image.file(
            _selectedImage!,
            fit: BoxFit.cover,
          ),
        ),
      );

    }



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
                            'First name',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),

                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.firstName,
                            decoration: InputDecoration(
                              hintText: 'Enter first name', 
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter first name';
                              }
                              return null;
                            },

                            onSaved:(newValue) {
                              _firstName = newValue;
                            },
                            
                          ),
                        ],
                      ),


                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Last name',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),

                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.lastName,
                            decoration: InputDecoration(
                              hintText: 'Enter last name', 
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter last name';
                              }
                              return null;
                            },

                            onSaved: (newValue) {
                              _lastName = newValue;
                            },
                            
                          ),
                        ],
                      ),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Email',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),

                          const SizedBox(height: 8),

                          TextFormField(
                            initialValue: student.email,
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

                            onSaved: (newValue) {
                              _email = newValue;
                            },
                            
                          ),
                        ],
                      ),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Date of birth',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 8),
                          GestureDetector(
                            onTap: _pickDateOfBirth,
                            child: InputDecorator(
                              decoration: InputDecoration(
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),     
                                contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                                suffixIcon: Icon(Icons.calendar_month),
                              ),
                              child: Text(
                                _selectedDate == null
                                    ? 'Select your date of birth'
                                    : formatDate(_selectedDate.toString()),
                                style: TextStyle(
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),

                      


                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Gender',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),

                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.gender,
                            decoration: InputDecoration(
                              hintText: 'Enter Gender', 
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter gender';
                              }
                              return null;
                            },

                            onSaved: (newValue) {
                              _gender = newValue;
                            },
                            
                          ),
                        ],
                      ),


                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Father name',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),

                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.fatherName,
                            decoration: InputDecoration(
                              hintText: 'Enter Father name', 
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter father name';
                              }
                              return null;
                            },

                            onSaved: (newValue) {
                              _fatherName = newValue;
                            },
                            
                          ),
                        ],
                      ),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Mother name',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),

                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.motherName,
                            decoration: InputDecoration(
                              hintText: 'Enter Mother name', 
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter mother name';
                              }
                              return null;
                            },

                            onSaved: (newValue) {
                              _motherName = newValue;
                            },
                            
                          ),
                        ],
                      ),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Religion',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),

                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.religion,
                            decoration: InputDecoration(
                              hintText: 'Enter Religion', 
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

                            onSaved: (newValue) {
                              _religion = newValue;
                            },
                            
                          ),
                        ],
                      ),


                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Disability',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),

                          const SizedBox(height: 8),
                          DropdownButtonFormField(
                            hint: Text("Any Disability"),
                            decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              
                              
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                                ),
                              
                              
                            ),
                            
                            validator: (value){
                              if(value == null){
                                return 'Please select session';
                              }
                              return null;
                            },
                                      
                            value: _selectedDisability,
                            items: [
                              DropdownMenuItem(
                                value: 'yes',
                                child: Text('Yes')
                              ),
                                      
                              DropdownMenuItem(
                                value: 'no',
                                child: Text('No'),
                              ),
                            ], 
                            onChanged: (value){
                              setState(() {
                                _selectedDisability = value;
                              });
                            }
                          ),
                        ],
                      ),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Diability note',
                            style: TextStyle(
                              fontSize: 16,
                              color: customColors.lightText,
                              fontWeight: FontWeight.w500,
                            ),
                          ),

                          const SizedBox(height: 8),
                          TextFormField(
                            initialValue: student.disability,
                            textAlignVertical: TextAlignVertical.top,
                            maxLines: 5, // Makes it a text area with 5 lines height
                            keyboardType: TextInputType.multiline,
                            decoration: InputDecoration(
                              hintText: 'Diability note',
                              contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12.0),
                              ),
                            ),

                            onSaved: (newValue) {
                              _disabilityNote = newValue;
                            },
                            // No validator since it's optional
                          ),
                        ],
                      ),


                      PopupMenuButton<String>(
                        onSelected: (value) {
                          _getPicture(value);
                        },
                        itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
                          const PopupMenuItem<String>(
                            value: 'gallery',
                            child: Text('Select Image from gallery'),
                          ),
                          const PopupMenuItem<String>(
                            value: 'camera',
                            child: Text('Take Picture'),
                          ),
                        ],
                        child: Container(
                          width: double.infinity,
                          
                          decoration: BoxDecoration(
                            color: customColors.lightBorder
                          ),
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 50),
                            child: Align(
                              alignment: Alignment.center,
                              child: imgContent
                            ),
                          ),
                        ), // or use any widget as the trigger
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
                      
                      SizedBox(height: 40,),
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