
import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/assignment_submission.dart';
import 'package:mobile_app/session_active.dart';
import 'package:mobile_app/theme.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_app/utils.dart';
import 'dart:io';
import 'package:path/path.dart' as path;
import 'package:http/http.dart' as http;

class EditAssignmentSubmissionScreen extends ConsumerStatefulWidget{
  const EditAssignmentSubmissionScreen({super.key,
    required this.id,
    required this.teacher,
    required this.subject,
    required this.assignmentCode,
    required this.assignmenNote,
  });

  final int id;
  final String teacher;
  final String subject;
  final String assignmentCode;
  final String assignmenNote;

  @override
  ConsumerState<EditAssignmentSubmissionScreen> createState() => _EditAssignmentSubmissionScreenState();
}

class _EditAssignmentSubmissionScreenState extends ConsumerState<EditAssignmentSubmissionScreen> {
  final _formkey = GlobalKey<FormState>();
  String? _selectedTeacher;
  String? _selectedSubject;
  String? _assignemtCode;
  String? _submissionNote;
  File? _selectedImage;
  File? _selectedFile;

  List<dynamic>? _teachersList;
  List<dynamic>? _subjectList;


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


  void _pickFile() async {
    final result = await FilePicker.platform.pickFiles();

    if(result == null && result!.files.single.path == null){
      return;
    }
    setState(() {
      _selectedFile = File(result.files.single.path!);
    });
    
  }

  Future<void> loadDetails(String type) async {
    final token = await AuthService.getAccessToken();
    try {
      final response = await http.get(
        Uri.parse('https://school.amanilightequity.com/api/$type/'),
        headers: {'Authorization': 'Bearer $token'},
      );

      if(!mounted) return;
      bool sessionActive = await SessionActive.handleSession(context, response);
      if(!sessionActive) return;

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          if (type == 'teachers') {
            _teachersList = data;
          } else if (type == 'subjects') {
            _subjectList = data;
          }
        });

        print('success');
      } else {
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        if (!mounted) return;
        showSnackbar(context, errorMessages);
      }
    } catch (e) {
      if (!mounted) return;
      showSnackbar(context, 'Failed to load term');
      print(e);
    }
  }

  void _loadAllDetails() async {
    await Future.wait([
      loadDetails('teachers'),
      loadDetails('subjects'),
    ]);
  }


  Future<void> editAssignment() async {
    print('clicked');
    if (_formkey.currentState!.validate()) {
      showLoadingDialog(context);
      print('validated');

      _formkey.currentState!.save();

      

      if(!mounted) return;
      final response =await ref.read(assignmentSubmissionProvider.notifier).updateAssignmentSubmission(
        _selectedTeacher!, _selectedSubject!, 
        _submissionNote!, _assignemtCode!, 
        _selectedImage, _selectedFile, 
        widget.id, context
      );

      if(!mounted) return;
      hideLoadingDialog(context);

      if (response == 'success') {
        if (!mounted) return;
        showSnackbar(context, 'Assignment edited successfully');

        context.pop();
      }else {
        if (!mounted) return;
        showSnackbar(context, response);
      }

      
    }
  }



  @override
  void initState() {
    super.initState();
    _loadAllDetails();

    AuthService.isTokenExpired().then((isExpired){
      if(isExpired) {
        if(!mounted) return;
        context.go('/login');
        AuthService.logout();
      }
    });

  }




  @override
  Widget build(BuildContext context) {
    final customColors = Theme.of(context).extension<CustomColors>()!;
    _selectedTeacher = widget.teacher;  
    _selectedSubject = widget.subject;
    _assignemtCode = widget.assignmentCode;
    _submissionNote = widget.assignmenNote;

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



    Widget fileContent = Row(
      mainAxisAlignment: MainAxisAlignment.center,
      spacing: 10,
      children: [
        Icon(Icons.insert_drive_file),
        Text('Select File')
      ],
    );

    if(_selectedFile != null){
      fileContent = Row(
      mainAxisAlignment: MainAxisAlignment.center,
      spacing: 10,
      children: [
        Icon(Icons.insert_drive_file),
        Text(path.basename(_selectedFile!.path),)
      ],
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
                      DropdownButtonFormField(
                        hint: Text("Select Teacher"),
                        decoration: InputDecoration(
                          contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                          
                          prefixIcon: Icon(Icons.person),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12.0),
                          ),
                          
                          
                        ),
                        
                        validator: (value){
                          if(value == null){
                            return 'Please select a teacher';
                          }
                          return null;
                        },
                        value: _selectedTeacher,
                        items: 
                          _teachersList 
                           ?.map<DropdownMenuItem<String>>(
                              (data) => DropdownMenuItem<String>(
                                value: data['id']?.toString() ?? '',
                                child: Text('${data['first_name']} ${data['first_name']}'),
                              ),
                            ).toList() ??
                          [],
                        
                          onChanged: (value){
                            setState(() {
                              _selectedTeacher = value as String;
                            });
                          }
                      ),
            
                      DropdownButtonFormField(
                        hint: Text("Select Subject"),
                        decoration: InputDecoration(
                          contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                          prefixIcon: Icon(Icons.book),
                          
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12.0),
                          ),
                          
                          
                        ),
                        
                        validator: (value){
                          if(value == null){
                            return 'Please select a fee type';
                          }
                          return null;
                        },
            
                        value: _selectedSubject,
                        items: 
                          _subjectList 
                           ?.map<DropdownMenuItem<String>>(
                              (data) => DropdownMenuItem<String>(
                                value: data['id']?.toString() ?? '',
                                child: Text(data['name']?.toString() ?? ''),
                              ),
                            ).toList() ??
                          [],
                        onChanged: (value){
                          setState(() {
                            _selectedSubject = value as String;
                          });
                        }
                      ),


                      TextFormField(
                        decoration: InputDecoration(
                          hintText: 'Assignment code',
                          prefixIcon: Icon(Icons.code), // You can change this icon
                          contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12.0),
                          ),
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter assignment code';
                          }
                          return null;
                        },

                        initialValue: widget.assignmentCode,

                        onSaved: (value){
                          _assignemtCode = value;
                        },
                        
                      ),

                      TextFormField(
                        textAlignVertical: TextAlignVertical.top,
                        maxLines: 5, // Makes it a text area with 5 lines height
                        keyboardType: TextInputType.multiline,
                        decoration: InputDecoration(
                          hintText: 'Submission note',
                          contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12.0),
                          ),
                        ),

                        initialValue: widget.assignmenNote,

                        onSaved: (value){
                          _submissionNote = value;
                        },
                        // No validator since it's optional
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

                      InkWell(
                        onTap: _pickFile,
                        child: Container(
                          width: double.infinity,
                          
                          decoration: BoxDecoration(
                            color: customColors.lightBorder
                          ),
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 50),
                            child: Align(
                              alignment: Alignment.center,
                              child: fileContent
                            ),
                          ),
                        ), 
                      ),            
                      
                      SizedBox(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: () {
                            editAssignment();
                          },
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

                      SizedBox(
                        height: 20,
                      )
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